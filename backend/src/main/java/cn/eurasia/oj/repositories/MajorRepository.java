package cn.eurasia.oj.repositories;

import cn.eurasia.oj.entities.Major;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MajorRepository extends JpaRepository<Major, Long> {
    Page<Major> findAllByUserId(Long userId, Pageable pageable);

    List<Major> findAllByUserId(Long id);

}
