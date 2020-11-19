package cn.eurasia.oj.controllers;

import cn.eurasia.oj.annotations.Auth;
import cn.eurasia.oj.entities.Quiz;
import cn.eurasia.oj.entities.User;
import cn.eurasia.oj.exceptions.BusinessException;
import cn.eurasia.oj.requestParams.CreateQuizParam;
import cn.eurasia.oj.services.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;

@RestController
@RequestMapping(value = "/api/quizzes")
@RequiredArgsConstructor
public class QuizController {
    private final QuizService quizService;

    @GetMapping("pageable")
    public ResponseEntity getQuizzesByPage(
        @PageableDefault(sort = {"id"},
            direction = Sort.Direction.DESC) Pageable pageable,
        @RequestParam(name = "type") String type,
        @RequestParam(name = "majorId") String majorId,
        @RequestParam(name = "chapter") String chapter,
        @Auth User user
        ) {
        return ResponseEntity.ok(quizService.getQuizzesByPage(user.getId(),pageable,type,chapter,majorId));
    }

    @GetMapping("chapters")
    public ResponseEntity getChapters(@Auth User user) {
        return ResponseEntity.ok(quizService.getChaptersUserId(user.getId()));
    }

    @GetMapping("wrong/pageable")
    public ResponseEntity getWrongQuizzesByPage(
        @Auth User user,
        @PageableDefault(sort = {"id"},
            direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(quizService.getWrongQuizzesByPage(pageable, user));
    }

    @GetMapping("")
    public ResponseEntity getQuizzes(@Auth User user) {
        return ResponseEntity.ok(quizService.getQuizzes(user.getId()));
    }

    @PostMapping("")
    public ResponseEntity addQuiz(@RequestBody CreateQuizParam quizParam,
                                  @Auth User current) {

        Quiz quiz = quizService.addQuiz(quizParam, current);
        return ResponseEntity.created(URI.create("/api/quizzes/" + quiz.getId())).build();
    }

    @PutMapping("")
    public ResponseEntity editQuiz(@RequestBody CreateQuizParam quizParam) throws BusinessException {
        quizService.editQuiz(quizParam);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("excel")
    public ResponseEntity excelImport(@RequestParam("file") MultipartFile file,
                                      @Auth User current) throws BusinessException, IOException {
        if (validateExcelFormat(file)) {
            quizService.excelImport(file, current);
            return new ResponseEntity(HttpStatus.CREATED);
        }
        throw new BusinessException("Wrong format. Only support .xls or .xlsx");
    }

    public Boolean validateExcelFormat(MultipartFile file) {
        String fileName = file.getOriginalFilename();
        return fileName.endsWith(".xls") || fileName.endsWith(".xlsx");
    }

    @DeleteMapping("{id}")
    public ResponseEntity deleteQuiz(@PathVariable Long id) throws BusinessException {
        quizService.deleteQuiz(id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
