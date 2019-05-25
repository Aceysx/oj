package cn.eurasia.oj.repositories;

import cn.eurasia.oj.entities.ReviewQuiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

public interface ReviewQuizRepository extends JpaRepository<ReviewQuiz, Long> {
    ReviewQuiz findByClassCourseIdAndPaperIdAndUserId(Long id, Long paperId, Long userId);

    @Query(value = "select round(avg(score),10) `avg`,max(score)  `max`,min(score) `min` from reviewQuiz review where review.paperId=?1",nativeQuery = true)
    Map statisticScore(Long paperId);

    List<ReviewQuiz> findByPaperId(Long paperId);
}
