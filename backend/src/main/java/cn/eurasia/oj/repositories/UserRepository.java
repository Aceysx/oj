package cn.eurasia.oj.repositories;

import cn.eurasia.oj.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
  User findByUsernameAndPassword(String username, String password);
}
