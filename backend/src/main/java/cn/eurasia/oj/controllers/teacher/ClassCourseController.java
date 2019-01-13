package cn.eurasia.oj.controllers.teacher;

import cn.eurasia.oj.entities.ClassCourse;
import cn.eurasia.oj.services.ClassCourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping(value = "/api/classCourses")
public class ClassCourseController {

  @Autowired
  private ClassCourseService classCourseService;

  @GetMapping("")
  public ResponseEntity getClassCourse(
    @PageableDefault(sort = {"id"},
      direction = Sort.Direction.DESC) Pageable pageable) {
    return ResponseEntity.ok(classCourseService.getClassCourses(pageable));
  }

  @PostMapping("")
  public ResponseEntity addClassCourse(@RequestBody ClassCourse classCourse) {
    classCourse = classCourseService.addClassCourse(classCourse);
    return ResponseEntity.created(URI.create("/api/classCourse/"+classCourse.getId())).build();
  }

}
