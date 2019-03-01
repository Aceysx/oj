package cn.eurasia.oj.repositories;

import cn.eurasia.oj.entities.QuizSubmission;
import cn.eurasia.oj.entities.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizSubmissionRepository extends JpaRepository<QuizSubmission, Long> {
}
