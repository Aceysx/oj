package cn.eurasia.oj.repositories;

import cn.eurasia.oj.entities.Paper;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaperRepository extends JpaRepository<Paper, Long> {

}
