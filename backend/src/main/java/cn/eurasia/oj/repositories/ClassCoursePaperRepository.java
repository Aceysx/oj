package cn.eurasia.oj.repositories;

import cn.eurasia.oj.entities.ClassCoursePaper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

public interface ClassCoursePaperRepository extends JpaRepository<ClassCoursePaper, Long> {
  @Transactional
  @Modifying
  @Query(value = "delete from classCoursePaper where classCourseId = ?1", nativeQuery = true)
  void deleteClassCourseId(Long id);

  List<ClassCoursePaper> findByClassCourseIdIn(List<Long> classCourseIds);

  List<ClassCoursePaper> findByClassCourseId(Long classCourseId);

  Optional<ClassCoursePaper> findByClassCourseIdAndPaperId(Long classCourseId, Long paperId);
}
