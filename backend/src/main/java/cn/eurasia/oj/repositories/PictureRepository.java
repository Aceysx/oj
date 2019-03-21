package cn.eurasia.oj.repositories;

import cn.eurasia.oj.entities.Picture;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PictureRepository extends JpaRepository<Picture, Long> {
}
