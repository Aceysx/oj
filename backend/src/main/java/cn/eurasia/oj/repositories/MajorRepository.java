package cn.eurasia.oj.repositories;

import cn.eurasia.oj.entities.Major;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MajorRepository extends JpaRepository<Major, Long> {
    @Override
    Page<Major> findAll(Pageable pageable);
}
