package cn.eurasia.oj.controllers.teacher;

import cn.eurasia.oj.services.ClassCourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/classCourses")
public class ClassCourseController {

  @Autowired
  private ClassCourseService classCourseService;

  @GetMapping("")
  public ResponseEntity getUserById(
    @PageableDefault(sort = {"id"},
      direction = Sort.Direction.DESC) Pageable pageable) {
    return ResponseEntity.ok(classCourseService.getClassCourses(pageable));
  }

}
