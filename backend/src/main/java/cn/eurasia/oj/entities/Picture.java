package cn.eurasia.oj.entities;

import cn.eurasia.oj.controllers.requestParams.CreatePictureParam;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Setter
@Getter
@Entity
@Table(name = "picture")
@NoArgsConstructor
public class Picture {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String description;
  private Long userId;
  private String title;
  private String url;
  private String chapter;
  @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
  private Date createTime;
  @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
  @JoinColumn(name = "pictureId")
  private List<Label> labels;

  public void update(CreatePictureParam createPictureParam) {
    this.description = createPictureParam.getDescription();
    this.title = createPictureParam.getTitle();
    this.url = createPictureParam.getUrl();
    this.chapter = createPictureParam.getChapter();
  }
}