package cn.eurasia.oj.repositories;

import cn.eurasia.oj.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);

    List<User> findByUsernameOrPhoneOrEmail(String username, String phone, String email);

}
