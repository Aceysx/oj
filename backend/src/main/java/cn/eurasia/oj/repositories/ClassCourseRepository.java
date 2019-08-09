package cn.eurasia.oj.repositories;

import cn.eurasia.oj.entities.ClassCourse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.Optional;

public interface ClassCourseRepository extends JpaRepository<ClassCourse, Long> {
    Optional<ClassCourse> findByCode(String code);

    @Query(value = "select * from classCourse c where c.id in (select classCourseId from userClassCourse u where u.userId = ?1)", nativeQuery = true)
    Page<ClassCourse> findByCoursesUserId(Long id, Pageable pageable);

    @Transactional
    @Modifying
    @Query(value = "delete from classCoursePaper where classCourseId = ?1", nativeQuery = true)
    void deleteClassCoursePaper(Long id);

    @Query("from ClassCourse c where c.user.id=?1")
    Page<ClassCourse> findAllByUserId(Long id, Pageable pageable);

}
