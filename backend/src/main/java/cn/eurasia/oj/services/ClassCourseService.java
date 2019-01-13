package cn.eurasia.oj.services;

import cn.eurasia.oj.entities.ClassCourse;
import cn.eurasia.oj.repositories.ClassCourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.net.URI;

@Service
public class ClassCourseService {
  @Autowired
  private ClassCourseRepository classCourseRepository;


  public Page<ClassCourse> getClassCourses(Pageable pageable) {

    return classCourseRepository.findAll(pageable);
  }

  public ClassCourse addClassCourse(ClassCourse classCourse) {
    return classCourseRepository.save(classCourse);
  }
}
