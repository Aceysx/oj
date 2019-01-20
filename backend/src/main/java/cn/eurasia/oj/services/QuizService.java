package cn.eurasia.oj.services;

import cn.eurasia.oj.entities.Major;
import cn.eurasia.oj.entities.Quiz;
import cn.eurasia.oj.entities.User;
import cn.eurasia.oj.exceptions.BusinessException;
import cn.eurasia.oj.repositories.ClassCourseRepository;
import cn.eurasia.oj.repositories.MajorRepository;
import cn.eurasia.oj.repositories.QuizRepository;
import cn.eurasia.oj.requestParams.CreateQuizParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class QuizService {
  @Autowired
  private QuizRepository quizRepository;
  @Autowired
  private MajorRepository majorRepository;

  public Page<Quiz> getQuizzes(Pageable pageable) {

    return quizRepository.findAll(pageable);
  }

  public Quiz addQuiz(CreateQuizParam quizParam, User current) {
    Quiz quiz = Quiz.convertParam(quizParam, current);
    return quizRepository.save(quiz);
  }

  public Quiz editQuiz(CreateQuizParam quizParam) throws BusinessException {
    Quiz quiz = quizRepository.findById(quizParam.getId()).orElseThrow(
      () -> new BusinessException("找不到该quiz")
    );
    Major major = majorRepository.findById(quizParam.getMajor()).orElseThrow(
      () -> new BusinessException("找不到该专业")
    );
    quiz.update(quizParam, major);
    return quizRepository.save(quiz);
  }
}
