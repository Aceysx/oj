package cn.eurasia.oj.services;

import cn.eurasia.oj.entities.ClassCourse;
import cn.eurasia.oj.entities.Paper;
import cn.eurasia.oj.entities.Quiz;
import cn.eurasia.oj.entities.User;
import cn.eurasia.oj.exceptions.BusinessException;
import cn.eurasia.oj.repositories.ClassCourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClassCourseService {
  @Autowired
  private ClassCourseRepository classCourseRepository;


  public Page<ClassCourse> getClassCourses(Pageable pageable) {

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

  public Page<ClassCourse> getMyClassCourses(Pageable pageable, User current) {

    Page<ClassCourse> classCoursePage = classCourseRepository.findByUserId(current.getId(), pageable);

    List<ClassCourse> collect = classCoursePage.getContent().stream().map(classCourse -> {
      List<Paper> papers = classCourse.getPapers();
      papers = papers.stream().map(paper -> {
        List<Quiz> quizzes = paper.getQuizzes().stream().map(quiz -> {
          quiz.setAnswer(null);
          return quiz;
        }).collect(Collectors.toList());
        paper.setQuizzes(quizzes);
        return paper;
      }).collect(Collectors.toList());
      classCourse.setPapers(papers);
      return classCourse;
    }).collect(Collectors.toList());
    return new PageImpl<>(collect, classCoursePage.getPageable(), classCoursePage.getTotalElements());
  }
}
