package cn.eurasia.oj.controllers;

import cn.eurasia.oj.annotations.Auth;
import cn.eurasia.oj.entities.Paper;
import cn.eurasia.oj.entities.Quiz;
import cn.eurasia.oj.entities.User;
import cn.eurasia.oj.exceptions.BusinessException;
import cn.eurasia.oj.requestParams.CreatePaperAutoGenerateParam;
import cn.eurasia.oj.requestParams.CreatePaperParam;
import cn.eurasia.oj.requestParams.CreatePaperSubmissionParam;
import cn.eurasia.oj.services.PaperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value = "/api/papers")
public class PaperController {

    @Autowired
    private PaperService paperService;

    @GetMapping("pageable")
    public ResponseEntity getPapersByPage(
        @PageableDefault(sort = {"id"},
            direction = Sort.Direction.DESC) Pageable pageable,
        @Auth User user) {
        return ResponseEntity.ok(paperService.getQuizzesByPage(user.getId(),pageable));
    }

    @GetMapping("")
    public ResponseEntity getPapers(@Auth User user) {
        return ResponseEntity.ok(paperService.findAll(user.getId()));
    }

    @GetMapping("{paperId}")
    public ResponseEntity getPaper(@PathVariable Long paperId) throws BusinessException {
        return ResponseEntity.ok(paperService.findPaper(paperId));
    }

    @PostMapping("")
    public ResponseEntity addPaper(@RequestBody CreatePaperParam createPaperParam,
                                   @Auth User current) {

        Paper paper = paperService.addPaper(createPaperParam, current);
        return ResponseEntity.created(URI.create("/api/papers/" + paper.getId())).build();
    }

    @PostMapping("addAutoPaper")
    public ResponseEntity addAutoPaper(@RequestBody CreatePaperAutoGenerateParam param,
                                   @Auth User current) {
        List<Quiz> randomQuizzes = paperService.findQuizzesByAttribute(param.getCurrentMajorId(),param.getCurrentChapter(),param.getCurrentLevel(),param.getCurrentQuizType(),param.getQuizNumber());//获取随机数目的题目
        param.setQuizzes(randomQuizzes);//将其添加到quizzes参数中
        Paper paper = paperService.addAutoPaper(param, current);//将其保存在数据库中
        return ResponseEntity.created(URI.create("/api/papers/" + paper.getId())).build();
    }

    @PutMapping("")
    public ResponseEntity editPaper(@RequestBody Paper paper) throws BusinessException {
        paperService.editPaper(paper);
        return ResponseEntity.noContent().build();
    }



    @DeleteMapping("{id}")
    public ResponseEntity deletePaper(@PathVariable Long id) throws BusinessException {
        paperService.deletePaper(id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
