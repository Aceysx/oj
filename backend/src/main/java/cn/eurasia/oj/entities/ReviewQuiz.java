package cn.eurasia.oj.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Setter
@Getter
@Entity
@NoArgsConstructor
@Table(name = "reviewQuiz")
public class ReviewQuiz {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private Long classCourseId;
  private Long paperId;
  private Double score;
  private Long userId;
  private Date createTime;

  public ReviewQuiz(Long classCourseId, Long paperId, Long userId, Double score) {
    this.classCourseId = classCourseId;
    this.paperId = paperId;
    this.userId = userId;
    this.score = score;
    this.createTime = new Date();
  }
}