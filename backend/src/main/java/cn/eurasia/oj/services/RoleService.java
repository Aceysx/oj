package cn.eurasia.oj.services;

import cn.eurasia.oj.entities.Role;
import cn.eurasia.oj.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class RoleService {
    @Autowired
    private RoleRepository roleRepository;

    public Page<Role> getAllRole(Pageable pageable) {
        return roleRepository.findAll(pageable);
    }
}
