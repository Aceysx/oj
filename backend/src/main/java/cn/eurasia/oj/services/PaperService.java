package cn.eurasia.oj.services;

import cn.eurasia.oj.entities.*;
import cn.eurasia.oj.exceptions.BusinessException;
import cn.eurasia.oj.repositories.PaperRepository;
import cn.eurasia.oj.repositories.QuizSubmissionRepository;
import cn.eurasia.oj.repositories.ReviewQuizRepository;
import cn.eurasia.oj.requestParams.CreatePaperParam;
import cn.eurasia.oj.requestParams.CreatePaperSubmissionParam;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class PaperService {
    @Autowired
    private PaperRepository paperRepository;
    @Autowired
    private QuizSubmissionRepository quizSubmissionRepository;
    @Autowired
    private ReviewQuizRepository reviewQuizRepository;

    public Paper addPaper(CreatePaperParam createPaperParam, User current) {
        Paper paper = Paper.convertParam(createPaperParam, current);
        return paperRepository.save(paper);
    }

    public Page<Paper> getQuizzesByPage(Long id, Pageable pageable) {
        return paperRepository.findAllByUserId(id, pageable);
    }

    public void editPaper(Paper paper) throws BusinessException {
        Paper currentPaper = paperRepository.findById(paper.getId()).orElseThrow(
            () -> new BusinessException("未找到该试卷")
        );
        currentPaper.update(paper);
        paperRepository.save(paper);
    }

    public List<Paper> findAll(Long id) {
        return paperRepository.findAllByUserId(id);
    }

    public Paper findPaper(Long paperId) throws BusinessException {
        Paper paper = paperRepository.findById(paperId).orElseThrow(
            () -> new BusinessException("未找到")
        );
        return paper;
    }

    public void submitPaper(Long classCourseId, Long paperId, CreatePaperSubmissionParam createPaperSubmissionParam, Long userId) throws BusinessException {
        Map<String, Object> submission = createPaperSubmissionParam.getSubmission();
        Paper paper = paperRepository.findById(paperId).orElseThrow(() -> new BusinessException("不存在"));

        dealSubmission(classCourseId, submission, paper, userId);
        dealReviewQuiz(classCourseId, submission, paper, userId);
    }

    private void dealSubmission(Long classCourseId, Map<String, Object> submission, Paper paper, Long userId) {
        List<QuizSubmission> quizSubmissions = paper.getQuizzes().stream().map(quiz -> {
            Long count = submission.keySet().stream().filter(quizId -> {
                boolean isCurrentQuiz = quiz.getId().equals(Long.valueOf(quizId));
                if (quiz.getType().equals("多选题")) {
                    return isCurrentQuiz && isMulQuizAnswerCorrect(quiz.getAnswer(), (List<String>) submission.get(quizId));
                }
                return quiz.getId().equals(Long.valueOf(quizId))
                    && quiz.getAnswer().equals(submission.get(quizId).toString());
            }).count();
            boolean isCorrect = count > 0;
            Object answer = submission.get(quiz.getId().toString());
            return new QuizSubmission(classCourseId, paper.getId(), quiz.getId(), Objects.isNull(answer) ? "-1" : answer.toString(), isCorrect, userId);
        }).collect(Collectors.toList());
        try {
            quizSubmissionRepository.saveAll(quizSubmissions);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    private boolean isMulQuizAnswerCorrect(String answer, List<String> userAnswer) {
        List<String> correct = JSONObject.parseObject(answer, List.class);
        return correct.size() == userAnswer.size() &&
            correct.stream().filter(userAnswer::contains).count() == correct.size();
    }

    private void dealReviewQuiz(Long classCourseId, Map<String, Object> submission, Paper paper, Long userId) {
        ReviewQuiz reviewQuiz = reviewQuizRepository.findByClassCourseIdAndPaperIdAndUserId(classCourseId, paper.getId(), userId);
        Double score = calculateScore(submission, paper);
        reviewQuiz.setScore(score);
        reviewQuiz.setSubmissionStatus("已提交");
        reviewQuizRepository.save(reviewQuiz);
    }

    private Double calculateScore(Map<String, Object> submission, Paper paper) {
        List<Quiz> quizzes = paper.getQuizzes();
        long correctCount = quizzes.stream().filter(quiz -> {
                if (Objects.isNull(submission.get(quiz.getId().toString()))) {
                    return false;
                }
                if (quiz.getType().equals("多选题")) {
                    return isMulQuizAnswerCorrect(quiz.getAnswer(), (List<String>) submission.get(quiz.getId().toString()));
                }

                return quiz.getAnswer().equals(submission.get(quiz.getId().toString()).toString());
            }
        ).count();
        return Double.valueOf(new DecimalFormat("#.00").format(correctCount * 1.0 / quizzes.size() * 100));
    }

    public Map getPaperReviewQuiz(Long classCourseId, Long paperId, Long userId) throws BusinessException {
        Map result = new HashMap();
        Paper paper = paperRepository.findById(paperId).orElseThrow(
            () -> new BusinessException("未找到")
        );
        List<Long> quizIds = paper.getQuizzes().stream().map(Quiz::getId).collect(Collectors.toList());
        List<QuizSubmission> submission = quizSubmissionRepository.findByClassCourseIdAndPaperIdAndUserIdAndQuizIdIn(classCourseId, paper.getId(), userId, quizIds);
        ReviewQuiz reviewQuiz = reviewQuizRepository.findByClassCourseIdAndPaperIdAndUserId(classCourseId, paperId, userId);
        result.put("paper", paper);
        result.put("submission", submission);
        result.put("reviewQuiz", reviewQuiz);
        return result;
    }


    public void deletePaper(Long id) throws BusinessException {
        Paper paper = paperRepository.findById(id).orElseThrow(() -> new BusinessException("没有找到该试卷"));
        paperRepository.deleteClassCoursePaper(paper.getId());
        paperRepository.delete(paper);
    }

    public void startAnswer(Long classCourseId, Long paperId, Long id) {
        ReviewQuiz reviewQuiz = reviewQuizRepository.findByClassCourseIdAndPaperIdAndUserId(classCourseId, paperId, id);
        if (Objects.nonNull(reviewQuiz)) {
            return;
        }
        reviewQuiz = new ReviewQuiz(classCourseId, paperId, id, 0D, "已开始");
        reviewQuizRepository.save(reviewQuiz);
    }

}
