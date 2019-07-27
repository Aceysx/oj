package cn.eurasia.oj.services;

import cn.eurasia.oj.entities.*;
import cn.eurasia.oj.exceptions.BusinessException;
import cn.eurasia.oj.repositories.ClassCourseRepository;
import cn.eurasia.oj.repositories.ReviewQuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ClassCourseService {
    @Autowired
    private ClassCourseRepository classCourseRepository;
    @Autowired
    private ReviewQuizRepository reviewQuizRepository;

    public Page<ClassCourse> getClassCoursesPageable(Pageable pageable) {

        return classCourseRepository.findAll(pageable);
    }

    public ClassCourse addClassCourse(ClassCourse classCourse, User current) {
        classCourse.setUser(current);
        return classCourseRepository.save(classCourse);
    }

    public ClassCourse editClassCourse(ClassCourse classCourse) throws BusinessException {
        ClassCourse course = classCourseRepository.findById(classCourse.getId()).orElseThrow(
            () -> new BusinessException("未找到当天班课"));
        course.update(classCourse);
        return classCourseRepository.save(course);
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
        Page<ClassCourse> classCoursePage = classCourseRepository.findByUserId(current.getId(), pageable);
        List<ClassCourse> classCourses = classCoursePage.getContent();
        classCourses.forEach(classCourse -> {
            Map temp = new HashMap();
            List<Map> papers = new ArrayList<>();
            temp.put("id", classCourse.getId());
            temp.put("code", classCourse.getCode());
            temp.put("title", classCourse.getTitle());
            temp.put("endTime", classCourse.getEndTime());
            temp.put("endTime", classCourse.getEndTime());
            classCourse.getPapers().forEach(paper -> {
                Map tempPaper = new HashMap();
                ReviewQuiz reviewQuiz = reviewQuizRepository.findByClassCourseIdAndPaperIdAndUserId(classCourse.getId(), paper.getId(), current.getId());

                tempPaper.put("id", paper.getId());
                tempPaper.put("title", paper.getTitle());
                tempPaper.put("count", paper.getQuizzes().size());
                tempPaper.put("score", Objects.isNull(reviewQuiz) ? 0 : reviewQuiz.getScore());
                tempPaper.put("quizzes", paper.getQuizzes());
                tempPaper.put("submissionStatus", Objects.nonNull(reviewQuiz) ? reviewQuiz.getSubmissionStatus() : "未开始");
                tempPaper.put("endTime", paper.getEndTime().getTime());
                tempPaper.put("timeOut", paper.getEndTime().getTime() > new Date().getTime());
                tempPaper.put("timeBox", paper.getTimeBox());
                papers.add(tempPaper);
            });
            temp.put("papers", papers);
            result.add(temp);
        });
        return new PageImpl(result, classCoursePage.getPageable(), classCoursePage.getTotalElements());
    }

    public void deleteClassCourse(Long id) throws BusinessException {
        ClassCourse classCourse = classCourseRepository.findById(id).orElseThrow(() -> new BusinessException("未找到该课程"));
        classCourseRepository.deleteClassCoursePaper(classCourse.getId());
        classCourseRepository.delete(classCourse);
    }
}
