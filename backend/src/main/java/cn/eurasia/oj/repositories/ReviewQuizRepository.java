package cn.eurasia.oj.repositories;

import cn.eurasia.oj.entities.ReviewQuiz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewQuizRepository extends JpaRepository<ReviewQuiz, Long> {
  ReviewQuiz findByClassCourseIdAndPaperIdAndUserId(Long id, Long paperId, Long userId);

}
