package cn.eurasia.oj.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Setter
@Getter
@Entity
@Table(name = "classCoursePaper")
public class ClassCoursePaper {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private Long classCourseId;
  private Long paperId;
  @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "GMT+8")
  private Date endTime;
  private Integer timeBox;
  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
  private Date createTime;
  private Long createdBy;

  public void beforeSave(Long classCourseId, User user) {
    this.classCourseId = classCourseId;
    this.createdBy = user.getId();
    this.createTime = new Date();
  }
}