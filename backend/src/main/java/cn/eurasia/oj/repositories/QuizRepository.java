package cn.eurasia.oj.repositories;

import cn.eurasia.oj.entities.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizRepository extends JpaRepository<Quiz, Long> {
}
