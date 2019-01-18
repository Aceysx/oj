package cn.eurasia.oj.controllers.teacher;

import cn.eurasia.oj.annotations.Auth;
import cn.eurasia.oj.entities.Quiz;
import cn.eurasia.oj.entities.User;
import cn.eurasia.oj.exceptions.BusinessException;
import cn.eurasia.oj.requestParams.CreateQuizParam;
import cn.eurasia.oj.services.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping(value = "/api/quizzes")
public class QuizController {

  @Autowired
  private QuizService quizService;

  @GetMapping("")
  public ResponseEntity getClassCourse(
    @PageableDefault(sort = {"id"},
      direction = Sort.Direction.DESC) Pageable pageable) {
    return ResponseEntity.ok(quizService.getQuizzes(pageable));
  }

  @PostMapping("")
  public ResponseEntity addQuiz(@RequestBody CreateQuizParam quizParam,
                                       @Auth User current) {

    Quiz quiz = quizService.addQuiz(quizParam,current);
    return ResponseEntity.created(URI.create("/api/quizzes/"+quiz.getId())).build();
  }

  @PutMapping("")
  public ResponseEntity editQuiz(@RequestBody Quiz quiz) throws BusinessException {
    quizService.editQuiz(quiz);
    return ResponseEntity.noContent().build();
  }

}
