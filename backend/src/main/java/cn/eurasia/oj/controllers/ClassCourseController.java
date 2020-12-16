package cn.eurasia.oj.controllers;

import cn.eurasia.oj.annotations.Auth;
import cn.eurasia.oj.entities.ClassCourse;
import cn.eurasia.oj.entities.User;
import cn.eurasia.oj.exceptions.BusinessException;
import cn.eurasia.oj.controllers.requestParams.CreatePaperSubmissionParam;
import cn.eurasia.oj.services.ClassCourseService;
import cn.eurasia.oj.services.PaperService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Map;

@RestController
@RequestMapping(value = "/api/classCourses")
@RequiredArgsConstructor
public class ClassCourseController {

    private final PaperService paperService;
    private final ClassCourseService classCourseService;

    @GetMapping("")
    public ResponseEntity getClassCourse(
        @PageableDefault(sort = {"id"},
            direction = Sort.Direction.DESC) Pageable pageable,
        @Auth User user) {
        return ResponseEntity.ok(classCourseService.getClassCoursesPageable(pageable));
    }

    @PostMapping("")
    public ResponseEntity addClassCourse(@RequestBody ClassCourse classCourse,
                                         @Auth User current) {

        classCourse = classCourseService.addClassCourse(classCourse, current);
        return ResponseEntity.created(URI.create("/api/classCourse/" + classCourse.getId())).build();
    }

    @PostMapping("my")
    public ResponseEntity addMyClassCourse(@RequestParam String code,
                                           @Auth User current) throws BusinessException {

        ClassCourse classCourse = classCourseService.addMyClassCourse(code, current);
        return ResponseEntity.created(URI.create("/api/classCourse/" + classCourse.getId())).build();
    }


    @GetMapping("my")
    public ResponseEntity getMyClassCourse(
        @PageableDefault(sort = {"id"},
            direction = Sort.Direction.DESC) Pageable pageable,
        @Auth User current) {
        return ResponseEntity.ok(classCourseService.getMyClassCourses(pageable, current));
    }

    @PutMapping("")
    public ResponseEntity editClassCourse(@RequestBody ClassCourse classCourse) throws BusinessException {
        classCourseService.editClassCourse(classCourse);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("{classCourseId}/papers/{paperId}/submission")
    public ResponseEntity submitPaper(@PathVariable Long paperId,
                                      @PathVariable Long classCourseId,
                                      @Auth User user,
                                      @RequestBody CreatePaperSubmissionParam createPaperSubmissionParam) throws BusinessException {
        paperService.submitPaper(classCourseId, paperId, createPaperSubmissionParam, user.getId());
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @PostMapping("{classCourseId}/papers/{paperId}/submission/starter")
    public ResponseEntity startAnswer(@PathVariable Long paperId,
                                      @PathVariable Long classCourseId,
                                      @Auth User user) {
        paperService.startAnswer(classCourseId, paperId, user.getId());
        return new ResponseEntity(HttpStatus.CREATED);
    }


    @GetMapping("{classCourseId}/papers/{paperId}/reviewQuiz")
    public ResponseEntity getReviewQuiz(@PathVariable Long paperId,
                                        @PathVariable Long classCourseId,
                                        @Auth User user) throws BusinessException {
        Map result = paperService.getPaperReviewQuiz(classCourseId, paperId, user.getId());
        return ResponseEntity.ok(result);
    }

    @GetMapping("{classCourseId}/papers")
    public ResponseEntity getPapersByClassCourseId(@PathVariable Long classCourseId) throws BusinessException {
        return ResponseEntity.ok(classCourseService.getBy(classCourseId).getPapers());
    }

    @DeleteMapping("{id}")
    public ResponseEntity deleteClassCourse(@PathVariable Long id) throws BusinessException {
        classCourseService.deleteClassCourse(id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @GetMapping("{classCourseId}/papers/{paperId}/statistics")
    public ResponseEntity statistic(@PathVariable Long paperId,
                                    @PathVariable Long classCourseId) throws BusinessException {
        return ResponseEntity.ok(classCourseService.statistic(classCourseId, paperId));
    }

}
