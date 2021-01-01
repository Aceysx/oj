package cn.eurasia.oj.entities.model;

import cn.eurasia.oj.entities.ClassCourse;
import cn.eurasia.oj.entities.ClassCoursePaper;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.vavr.control.Option;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Builder
public class ClassCoursePageDto {
  private Long id;
  private String title;
  private String code;
  @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
  private Date endTime;
  private List<ClassCoursePaper> classCoursePapers;

  public static ClassCoursePageDto build(ClassCourse classCourse, List<ClassCoursePaper> classCoursePapers) {
    return ClassCoursePageDto.builder()
        .classCoursePapers(Option.of(classCoursePapers).getOrElse(new ArrayList<>()))
        .id(classCourse.getId())
        .title(classCourse.getTitle())
        .code(classCourse.getCode())
        .endTime(classCourse.getEndTime()).build();
  }
}
