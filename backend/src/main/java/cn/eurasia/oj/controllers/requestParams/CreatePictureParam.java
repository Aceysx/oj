package cn.eurasia.oj.controllers.requestParams;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreatePictureParam {

  private Long id;
  private String description;
  private Long userId;
  private String title;
  private String url;
  private String chapter;
}
