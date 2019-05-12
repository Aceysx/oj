package cn.eurasia.oj.repositories;

import cn.eurasia.oj.entities.Paper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Map;

public interface PaperRepository extends JpaRepository<Paper, Long> {

    @Query(value = "select count(1) from userClassCourse where classCourseId = (" +
        "select classCourseId from classCoursePaper where paperId = ?1)",
        nativeQuery = true)
    Long statisticTotalCount(Long paperId);
}
