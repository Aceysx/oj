package cn.eurasia.oj.requestParams;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateQuizParam {

  private Long id;
  private String description;
  private String options;
  private String answer;
  private String chapter;
  private Long major;
  private String level;
  private String type;
  private Long pictureId;
}
