package cn.eurasia.oj.repositories;

import cn.eurasia.oj.entities.Quiz;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Set;

public interface QuizRepository extends JpaRepository<Quiz, Long>,JpaSpecificationExecutor<Quiz> {
    Page<Quiz> findAllByIdIn(List<Long> quizIds, Pageable pageable);
    @Query("select quiz.chapter from Quiz quiz")
    Set<String> findChapters();
}
