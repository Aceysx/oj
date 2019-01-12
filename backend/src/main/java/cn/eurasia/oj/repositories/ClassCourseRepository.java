package cn.eurasia.oj.repositories;

import cn.eurasia.oj.entities.ClassCourse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClassCourseRepository extends JpaRepository<ClassCourse, Long> {
  Page<ClassCourse> findAll(Pageable pageable);
}
