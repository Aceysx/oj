package cn.eurasia.oj.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Setter
@Getter
@Entity
@Table(name = "quizSubmission")
public class QuizSubmission {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private Long classCourseId;
  private Long paperId;
  private Long quizId;
  private Long userId;
  private Boolean isCorrect;
}