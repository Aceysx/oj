package cn.eurasia.oj.repositories;

import cn.eurasia.oj.entities.ClassCourse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ClassCourseRepository extends JpaRepository<ClassCourse, Long> {
  Optional<ClassCourse> findByCode(String code);

  @Query( value = "select c.* from classCourse c where c.id in (select classCourseId from userClassCourse u where u.userId = :id)",nativeQuery = true)
  Page<ClassCourse> findByUserId(@Param("id") Long id, Pageable pageable);
}
