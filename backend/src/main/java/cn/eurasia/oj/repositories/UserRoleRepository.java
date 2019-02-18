package cn.eurasia.oj.repositories;

import cn.eurasia.oj.entities.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRoleRepository extends JpaRepository<UserRole, Long> {
    void deleteByUserId(Long id);
}
