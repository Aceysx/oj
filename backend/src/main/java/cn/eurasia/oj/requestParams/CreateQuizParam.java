package cn.eurasia.oj.requestParams;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateQuizParam {

  private Long id;
  private String description;
  private String options;
  private Integer answer;
  private String chapter;
  private Integer major;
  private String level;
}
