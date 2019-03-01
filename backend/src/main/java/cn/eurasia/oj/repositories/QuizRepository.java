package cn.eurasia.oj.repositories;

import cn.eurasia.oj.entities.Quiz;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizRepository extends JpaRepository<Quiz, Long> {
  Page<Quiz> findAllByIdIn(List<Long> quizIds, Pageable pageable);
}
