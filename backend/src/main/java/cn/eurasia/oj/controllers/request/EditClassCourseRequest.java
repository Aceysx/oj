package cn.eurasia.oj.controllers.request;

import cn.eurasia.oj.entities.ClassCourse;
import cn.eurasia.oj.entities.ClassCoursePaper;
import lombok.Data;

import java.util.List;

@Data
public class EditClassCourseRequest {
  private ClassCourse classCourse;
  private List<ClassCoursePaper> classCoursePapers;
}
