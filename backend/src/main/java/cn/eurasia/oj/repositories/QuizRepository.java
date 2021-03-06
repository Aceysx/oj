package cn.eurasia.oj.repositories;

import cn.eurasia.oj.entities.Quiz;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;

public interface QuizRepository extends JpaRepository<Quiz, Long>,JpaSpecificationExecutor<Quiz> {

    @Autowired
    EntityManager entityManager = null;

    Page<Quiz> findAllByIdIn(List<Long> quizIds, Pageable pageable);
    @Transactional
    @Modifying
    @Query(value = "delete from paperQuiz where quizId = ?1", nativeQuery = true)
    void deletePaperQuiz(Long id);

    void deleteByPictureId(Long id);

    List<Quiz> findAll();

}
