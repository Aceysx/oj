package cn.eurasia.oj.repositories;

import cn.eurasia.oj.entities.QuizSubmission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizSubmissionRepository extends JpaRepository<QuizSubmission, Long> {
  List<QuizSubmission> findByClassCourseIdAndPaperIdAndUserIdAndQuizIdIn(Long classCourseId, Long id, Long userId, List<Long> quizIds);

  List<QuizSubmission> findByUserIdAndIsCorrectIsFalse(Long id);

}
