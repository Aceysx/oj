package cn.eurasia.oj.controllers.requestParams;

import cn.eurasia.oj.entities.Quiz;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class CreatePaperAutoGenerateParam {

	private Long id;
	private String title;
	private Date endTime;
	private Long timeBox;
	private List<Quiz> quizzes;
	private Long quizNumber;
	private String currentMajorId;
	private String currentChapter;
	private String currentLevel;
	private String currentQuizType;
}