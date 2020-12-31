package cn.eurasia.oj.services;

import cn.eurasia.oj.entities.*;
import cn.eurasia.oj.entities.model.ClassCoursePageDto;
import cn.eurasia.oj.exceptions.BusinessException;
import cn.eurasia.oj.repositories.ClassCoursePaperRepository;
import cn.eurasia.oj.repositories.ClassCourseRepository;
import cn.eurasia.oj.repositories.PaperRepository;
import cn.eurasia.oj.repositories.ReviewQuizRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.groupingBy;
import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class ClassCourseService {
  private final ClassCourseRepository classCourseRepository;
  private final ReviewQuizRepository reviewQuizRepository;
  private final PaperRepository paperRepository;
  private final ClassCoursePaperRepository classCoursePaperRepository;

  public Page<ClassCoursePageDto> getClassCoursesPageable(Pageable pageable) {
    Page<ClassCourse> classCoursePage = classCourseRepository.findAll(pageable);
    List<ClassCourse> classCourses = classCoursePage.getContent();
    Map<Long, List<ClassCoursePaper>> classCoursePaperMap = getClassCoursePaperMap(classCourses);
    List<ClassCoursePageDto> classCoursePapers = classCourses.stream().map(classCourse ->
        ClassCoursePageDto.build(classCourse, classCoursePaperMap.get(classCourse.getId())))
        .collect(Collectors.toList());
    return new PageImpl<>(classCoursePapers, classCoursePage.getPageable(), classCoursePage.getTotalPages());
  }

  private Map<Long, List<ClassCoursePaper>> getClassCoursePaperMap(List<ClassCourse> classCourses) {
    List<Long> classCourseIds = classCourses.stream().map(ClassCourse::getId).collect(Collectors.toList());
    Map<Long, List<ClassCoursePaper>> classCoursePaperMap = classCoursePaperRepository.findByClassCourseIdIn(classCourseIds)
        .stream().collect(groupingBy(ClassCoursePaper::getClassCourseId));
    return classCoursePaperMap;
  }

  public ClassCourse addClassCourse(ClassCourse classCourse, User current) {
    classCourse.setUser(current);
    return classCourseRepository.save(classCourse);
  }

  @Transactional
  public ClassCourse editClassCourse(ClassCourse classCourse, List<ClassCoursePaper> classCoursePapers) throws BusinessException {
    ClassCourse course = classCourseRepository.findById(classCourse.getId()).orElseThrow(
        () -> new BusinessException("未找到当前班课"));
    course.update(classCourse);
    classCourseRepository.save(course);
    if (Objects.nonNull(classCoursePapers)) {
      classCoursePapers.forEach(item -> item.beforeSave(course.getId(), course.getUser()));
      classCoursePaperRepository.deleteClassCourseId(course.getId());
      classCoursePaperRepository.saveAll(classCoursePapers);
    }
    return classCourse;
  }

  public ClassCourse addMyClassCourse(String code, User current) throws BusinessException {
    ClassCourse classCourse = classCourseRepository.findByCode(code).orElseThrow(() -> new BusinessException("当前code无效"));
    List<User> users = classCourse.getUsers();
    if (isExist(users, current)) {
      throw new BusinessException("已经加入过该班课");
    }
    users.add(current);
    classCourse.setUsers(users);
    return classCourseRepository.save(classCourse);
  }

  private boolean isExist(List<User> users, User current) {
    return users.stream().anyMatch(user -> user.getId().equals(current.getId()));
  }

  public Page getMyClassCourses(Pageable pageable, User current) {
    List<Map> result = new ArrayList<>();

    Page<ClassCourse> classCoursePage = classCourseRepository.findByCoursesUserId(current.getId(), pageable);
    List<ClassCourse> classCourses = classCoursePage.getContent();
    Map<Long, List<Paper>> paperMapWithKeyCourseId = getPaperMapByCourses(classCourses);
    classCourses.forEach(classCourse -> {
      Map temp = new HashMap();
      List<Map> papers = new ArrayList<>();
      temp.put("id", classCourse.getId());
      temp.put("code", classCourse.getCode());
      temp.put("title", classCourse.getTitle());
      temp.put("endTime", classCourse.getEndTime());
      paperMapWithKeyCourseId.get(classCourse.getId()).forEach(paper -> {
        Map tempPaper = new HashMap();
        ReviewQuiz reviewQuiz = reviewQuizRepository
            .findByClassCourseIdAndPaperIdAndUserId(classCourse.getId(), paper.getId(), current.getId());

        tempPaper.put("id", paper.getId());
        tempPaper.put("title", paper.getTitle());
        tempPaper.put("count", paper.getQuizzes().size());
        tempPaper.put("score", Objects.isNull(reviewQuiz) ? 0 : reviewQuiz.getScore());
        tempPaper.put("quizzes", paper.getQuizzes());
        tempPaper.put("submissionStatus", Objects.nonNull(reviewQuiz) ? reviewQuiz.getSubmissionStatus() : "未开始");
        tempPaper.put("endTime", paper.getEndTime().getTime());
        tempPaper.put("timeOut", new Date().getTime() > paper.getEndTime().getTime());
        tempPaper.put("timeBox", paper.getTimeBox());
        papers.add(tempPaper);
      });
      temp.put("papers", papers);
      result.add(temp);
    });
    return new PageImpl<>(result, classCoursePage.getPageable(), classCoursePage.getTotalElements());
  }

  private Map<Long, List<Paper>> getPaperMapByCourses(List<ClassCourse> classCourses) {
    Map<Long, List<Paper>> result = new HashMap();
    List<Long> classCourseIds = classCourses.stream().map(ClassCourse::getId).collect(toList());
    List<ClassCoursePaper> classCoursePapers = classCoursePaperRepository.findByClassCourseIdIn(classCourseIds);
    List<Long> paperIds = classCoursePapers.stream().map(ClassCoursePaper::getPaperId).collect(toList());

    List<Paper> papers = paperRepository.findALlByIdIn(paperIds);
    classCourseIds.forEach(id -> {
      Map<Long, List<ClassCoursePaper>> classCoursePapersWithKeyPaperId = classCoursePapers.stream()
          .filter(classCoursePaper -> Objects.equals(classCoursePaper.getClassCourseId(), id))
          .collect(groupingBy(ClassCoursePaper::getPaperId));
      List<Paper> currentCoursePapers = papers.stream()
          .filter(paper -> classCoursePapersWithKeyPaperId.containsKey(paper.getId()))
          .peek(item -> {
            ClassCoursePaper found = classCoursePapersWithKeyPaperId.get(item.getId()).get(0);
            item.setEndTime(found.getEndTime());
            item.setTimeBox(found.getTimeBox());
          })
          .collect(toList());
      result.put(id, currentCoursePapers);
    });
    return result;
  }

  public Map statistic(Long classCourseId, Long paperId) throws BusinessException {
    Map result = new HashMap();
    List<Long> userIds = getBy(classCourseId).getUsers().stream().map(User::getId).collect(Collectors.toList());
    if (userIds.isEmpty()) {
      return result;
    }
    List<Map<String, Object>> stuTestInfo = paperRepository.findStuTestInfo(classCourseId, paperId, userIds);
    Long total = paperRepository.statisticTotalCount(classCourseId, paperId);
    long finishCount = reviewQuizRepository.findByClassCourseIdAndPaperIdAndUserIdIn(classCourseId, paperId, userIds)
        .stream().filter(reviewQuiz -> "已提交".equals(reviewQuiz.getSubmissionStatus()))
        .count();
    Map scoreStatistics = reviewQuizRepository.statisticScore(classCourseId, paperId, userIds);
    result.put("stuTestInfo", stuTestInfo);
    result.put("total", total);
    result.put("avg", scoreStatistics.get("avg"));
    result.put("highest", scoreStatistics.get("max"));
    result.put("lowest", scoreStatistics.get("min"));
    result.put("finish", finishCount);

    return result;
  }

  public void deleteClassCourse(Long id) throws BusinessException {
    ClassCourse classCourse = classCourseRepository.findById(id).orElseThrow(() -> new BusinessException("未找到该课程"));
    classCourseRepository.delete(classCourse);
    classCoursePaperRepository.deleteClassCourseId(classCourse.getId());
  }

  public ClassCourse getBy(Long classCourseId) throws BusinessException {
    return classCourseRepository.findById(classCourseId)
        .orElseThrow(() -> new BusinessException("不存在该课程"));
  }

  public List<ClassCoursePaper> getClassCoursePapersBy(Long classCourseId) {
    return classCoursePaperRepository.findByClassCourseId(classCourseId);
  }
}
