package cn.eurasia.oj.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Setter
@Getter
@Entity
@NoArgsConstructor
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
  private Integer answer;

  public QuizSubmission(Long classCourseId, Long paperId, Long quizId, Integer answer, boolean isCorrect, Long userId) {
    this.classCourseId = classCourseId;
    this.paperId = paperId;
    this.quizId = quizId;
    this.isCorrect = isCorrect;
    this.answer = answer;
    this.userId = userId;
  }
}