package cn.eurasia.oj.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Setter
@Getter
@Entity
@Table(name = "label")
@NoArgsConstructor
public class Label {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private Long pictureId;
  private String fill;
  private String title;
  private String position;
  private Date createTime;

  public Label(Long pictureId, String fill, String title, String position) {
    this.pictureId = pictureId;
    this.fill = fill;
    this.title = title;
    this.position = position;
    this.createTime = new Date();
  }
}