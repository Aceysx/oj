package cn.eurasia.oj.repositories;

import cn.eurasia.oj.entities.Picture;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PictureRepository extends JpaRepository<Picture, Long> {
  Page<Picture> findByTitleIsLike(String title, Pageable pageable);
}
