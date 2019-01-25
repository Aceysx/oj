package cn.eurasia.oj.requestParams;

import cn.eurasia.oj.entities.Quiz;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CreatePaperParam {

  private Long id;
  private String title;
  private List<Quiz> quizzes;
}
