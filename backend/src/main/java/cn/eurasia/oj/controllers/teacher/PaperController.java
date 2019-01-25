package cn.eurasia.oj.controllers.teacher;

import cn.eurasia.oj.annotations.Auth;
import cn.eurasia.oj.entities.Paper;
import cn.eurasia.oj.entities.Quiz;
import cn.eurasia.oj.entities.User;
import cn.eurasia.oj.exceptions.BusinessException;
import cn.eurasia.oj.requestParams.CreatePaperParam;
import cn.eurasia.oj.requestParams.CreateQuizParam;
import cn.eurasia.oj.services.PaperService;
import cn.eurasia.oj.services.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping(value = "/api/papers")
public class PaperController {

  @Autowired
  private PaperService paperService;

  @GetMapping("pageable")
  public ResponseEntity getPapersByPage(
    @PageableDefault(sort = {"id"},
      direction = Sort.Direction.DESC) Pageable pageable) {
    return ResponseEntity.ok(paperService.getQuizzesByPage(pageable));
  }

  @PostMapping("")
  public ResponseEntity addPaper(@RequestBody CreatePaperParam createPaperParam,
                                       @Auth User current) {

    Paper paper = paperService.addPaper(createPaperParam,current);
    return ResponseEntity.created(URI.create("/api/papers/"+paper.getId())).build();
  }

  @PutMapping("")
  public ResponseEntity editPaper(@RequestBody CreateQuizParam quizParam) throws BusinessException {
//    quizService.editQuiz(quizParam);
//    return ResponseEntity.noContent().build();
    return null;
  }

}
