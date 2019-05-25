package cn.eurasia.oj.services;

import cn.eurasia.oj.entities.*;
import cn.eurasia.oj.exceptions.BusinessException;
import cn.eurasia.oj.repositories.MajorRepository;
import cn.eurasia.oj.repositories.PictureRepository;
import cn.eurasia.oj.repositories.QuizRepository;
import cn.eurasia.oj.repositories.QuizSubmissionRepository;
import cn.eurasia.oj.requestParams.CreateQuizParam;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class QuizService {
    @Autowired
    private QuizRepository quizRepository;
    @Autowired
    private MajorRepository majorRepository;
    @Autowired
    private QuizSubmissionRepository quizSubmissionRepository;
    @Autowired
    private QuizExcelImportService quizExcelImportService;
    @Autowired
    private PictureRepository pictureRepository;

    public Page<Quiz> getQuizzesByPage(Pageable pageable, String type, String chapter) {
        Specification<Quiz> specification = (Specification<Quiz>) (root, query, criteriaBuilder) -> {
            List<Predicate> pre = new ArrayList();
            if (!"".equals(type)) {
                pre.add(criteriaBuilder.equal(root.get("type"), type));
            }
            if (!"".equals(chapter)) {
                pre.add(criteriaBuilder.equal(root.get("chapter"), chapter));
            }
            return criteriaBuilder.and(pre.toArray(new Predicate[pre.size()]));
        };
        return quizRepository.findAll(specification, pageable);
    }

    public Quiz addQuiz(CreateQuizParam quizParam, User current) {
        Quiz quiz = Quiz.convertParam(quizParam, current);
        if ("识图题".equals(quizParam.getType())) {
            Picture picture = pictureRepository.findById(quizParam.getPictureId()).get();
            quiz.setPicture(picture);
            quiz.setDescription(picture.getUrl());
        }
        return quizRepository.save(quiz);
    }

    public Quiz editQuiz(CreateQuizParam quizParam) throws BusinessException {
        Quiz quiz = quizRepository.findById(quizParam.getId()).orElseThrow(
            () -> new BusinessException("找不到该quiz")
        );
        Major major = majorRepository.findById(quizParam.getMajor()).orElseThrow(
            () -> new BusinessException("找不到该课程名称")
        );
        quiz.update(quizParam, major);
        return quizRepository.save(quiz);
    }

    public List<Quiz> getQuizzes() {
        return quizRepository.findAll();
    }

    public Page getWrongQuizzesByPage(Pageable pageable, User user) {
        List<QuizSubmission> submissions = quizSubmissionRepository.findByUserIdAndIsCorrectIsFalse(user.getId());
        List<Long> quizIds = submissions.stream().map(QuizSubmission::getQuizId).collect(Collectors.toList());
        Page<Quiz> page = quizRepository.findAllByIdIn(quizIds, pageable);
        List<Map<String, Object>> quizzes = page.getContent().stream().map(quiz -> {
            Map<String, Object> quizMap = new ObjectMapper().convertValue(quiz, Map.class);
            String answer = submissions.stream().filter(submission -> submission.getQuizId().equals(quiz.getId())).findFirst().get().getAnswer();
            quizMap.put("userAnswer", answer);
            return quizMap;
        }).collect(Collectors.toList());
        return new PageImpl<>(quizzes, pageable, page.getTotalElements());
    }

    public void excelImport(MultipartFile file, User current) throws IOException, BusinessException {
        quizExcelImportService.init(file);
        quizExcelImportService.importExcel(current);
    }

    public Set<String> getChapters() {
        return quizRepository.findChapters();
    }

    public void deleteQuiz(Long id) throws BusinessException {
        Quiz quiz = quizRepository.findById(id).orElseThrow(() -> new BusinessException("没有找到该题目"));
        quizRepository.delete(quiz);
    }
}
