package cn.eurasia.oj.repositories;

import cn.eurasia.oj.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
}
