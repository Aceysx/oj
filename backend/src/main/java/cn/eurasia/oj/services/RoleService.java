package cn.eurasia.oj.services;

import cn.eurasia.oj.entities.RoleEnum;
import cn.eurasia.oj.entities.model.RoleModel;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoleService {
    public List<RoleModel> getAllRole() {
        return RoleEnum.getRoles();
    }
}
