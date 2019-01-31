package cn.eurasia.oj.services;

import cn.eurasia.oj.entities.User;
import cn.eurasia.oj.exceptions.BusinessException;
import cn.eurasia.oj.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class UserCenterService {
    @Autowired
    private UserRepository userRepository;

    public User getUser(Long userId) throws BusinessException {
        return userRepository.findById(userId).orElseThrow(() -> new BusinessException("找不到"));
    }

    public User login(User userParam) throws BusinessException {
        User user = userRepository.findByUsername(userParam.getUsername());
        if (Objects.isNull(user) && !user.getPassword().equals(userParam.getPassword())) {
            throw new BusinessException("账号或密码错误");
        }
        return user;
    }

    public Page<User> getUsersByPage(Pageable pageable) {
        return userRepository.findAll(pageable);
    }
}
