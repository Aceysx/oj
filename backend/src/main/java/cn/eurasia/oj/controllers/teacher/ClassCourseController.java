package cn.eurasia.oj.controllers.teacher;

import cn.eurasia.oj.annotations.Auth;
import cn.eurasia.oj.entities.ClassCourse;
import cn.eurasia.oj.entities.User;
import cn.eurasia.oj.exceptions.BusinessException;
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
  public ResponseEntity addClassCourse(@RequestBody ClassCourse classCourse,
                                       @Auth User current) {

    classCourse = classCourseService.addClassCourse(classCourse,current);
    return ResponseEntity.created(URI.create("/api/classCourse/"+classCourse.getId())).build();
  }

  @PostMapping("my")
  public ResponseEntity addMyClassCourse(@RequestParam String code,
                                       @Auth User current) throws BusinessException {

    ClassCourse classCourse = classCourseService.addMyClassCourse(code, current);
    return ResponseEntity.created(URI.create("/api/classCourse/" + classCourse.getId())).build();
  }


  @GetMapping("my")
  public ResponseEntity getMyClassCourse(
    @PageableDefault(sort = {"id"},
      direction = Sort.Direction.DESC) Pageable pageable,
    @Auth User current) {
    return ResponseEntity.ok(classCourseService.getMyClassCourses(pageable, current));
  }
  @PutMapping("")
  public ResponseEntity editClassCourse(@RequestBody ClassCourse classCourse) throws BusinessException {
    classCourseService.editClassCourse(classCourse);
    return ResponseEntity.noContent().build();
  }

}
