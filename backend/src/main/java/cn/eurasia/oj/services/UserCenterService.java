package cn.eurasia.oj.services;

import cn.eurasia.oj.entities.User;
import cn.eurasia.oj.exceptions.BusinessException;
import cn.eurasia.oj.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Objects;

@Service
public class UserCenterService {
  @Autowired
  private UserRepository userRepository;

  public Map getUserInfo(Long userId) {
    return null;
  }

  public User login(User userParam) throws BusinessException {
    User user = userRepository.findByUsernameAndPassword(userParam.getUsername(), userParam.getPassword());
    if (Objects.isNull(user)) {
      throw new BusinessException("账号或密码错误");
    }
    user.removePassword();
    return user;
  }
}
