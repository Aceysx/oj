package cn.eurasia.oj.services;

import cn.eurasia.oj.entities.Role;
import cn.eurasia.oj.repositories.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoleService {
    private final RoleRepository roleRepository;

    public Page<Role> getAllRole(Pageable pageable) {
        return roleRepository.findAll(pageable);
    }
}
