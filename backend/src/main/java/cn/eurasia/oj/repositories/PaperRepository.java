package cn.eurasia.oj.repositories;

import cn.eurasia.oj.entities.Paper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;

public interface PaperRepository extends JpaRepository<Paper, Long> {

    @Query(value = "select count(1) from userClassCourse where classCourseId in (" +
        "select classCourseId from classCoursePaper where paperId = ?1)",
        nativeQuery = true)
    Long statisticTotalCount(Long paperId);

    @Transactional
    @Modifying
    @Query(value = "delete from classCoursePaper where paperId = ?1", nativeQuery = true)
    void deleteClassCoursePaper(Long id);

    @Query(value = "SELECT u.name, re.score, p.title as pTitle, c.title as cTitle  FROM reviewQuiz re\n" +
            "LEFT JOIN user as u on u.id = re.userId\n" +
            "LEFT JOIN paper as p on p.id = re.paperId\n" +
            "LEFT JOIN classCourse as c on c.id = re.classCourseId\n" +
            "WHERE re.paperId = ?1", nativeQuery = true)
    List<Map<String, Object>> findStuTestInfo(Long paperId);

}
