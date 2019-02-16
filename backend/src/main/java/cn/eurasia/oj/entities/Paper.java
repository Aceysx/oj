package cn.eurasia.oj.entities;

import cn.eurasia.oj.requestParams.CreatePaperParam;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Setter
@Getter
@Entity
@Table(name = "paper")
@NoArgsConstructor
public class Paper {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String title;
  @ManyToMany
  @JoinTable(name = "paperQuiz",joinColumns = @JoinColumn(name = "paperId"),
    inverseJoinColumns = @JoinColumn(name = "quizId"))
  private List<Quiz> quizzes;
  @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
  private Date createTime;
  @ManyToOne
  @JoinColumn(name = "userId")
  private User user;

  public Paper(String title, List<Quiz> quizzes, User current) {
    this.title = title;
    this.quizzes = quizzes;
    this.user = current;
  }

  public static Paper convertParam(CreatePaperParam createPaperParam, User current) {
    return new Paper(createPaperParam.getTitle(), createPaperParam.getQuizzes(), current);
  }

  public void update(Paper paper) {
    this.title = paper.getTitle();
    this.quizzes = paper.getQuizzes();
  }

  public void removeQuizzesAnswer() {
    this.getQuizzes().forEach(quiz -> quiz.setAnswer(null));
  }
}