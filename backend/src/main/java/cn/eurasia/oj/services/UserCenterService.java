package cn.eurasia.oj.services;

import cn.eurasia.oj.entities.User;
import cn.eurasia.oj.entities.model.RoleModel;
import cn.eurasia.oj.entities.model.UserModel;
import cn.eurasia.oj.exceptions.BusinessException;
import cn.eurasia.oj.repositories.UserRepository;
import cn.eurasia.oj.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserCenterService {
    private final UserRepository userRepository;
    private final UserExcelImportService userExcelImportService;
    private final RoleService roleService;

    public UserModel getUser(Long userId) throws BusinessException {
        return UserModel.build(
            userRepository.findById(userId).orElseThrow(() -> new BusinessException("找不到"))
        );
    }

    public Map login(User userParam) throws BusinessException, UnsupportedEncodingException {
        Map result = new HashMap();
        User user = userRepository.findByUsername(userParam.getUsername());
        if (Objects.isNull(user) || !user.getPassword().equals(userParam.getPassword())) {
            throw new BusinessException("账号或密码错误");
        }
        UserModel userModel = UserModel.build(user);
        JSONObject jsonObject = new JSONObject(userModel);
        String token = JwtUtil.build(jsonObject.toString());
        result.put("user", userModel);
        result.put("token", token);
        return result;
    }

    public Page<UserModel> getUsersByPage(Pageable pageable) {
        Page<User> page = userRepository.findAll(pageable);
        List<UserModel> users = page.getContent().stream()
            .map(UserModel::build)
            .collect(Collectors.toList());

        return new PageImpl(users, pageable, page.getTotalElements());
    }

    public User addUser(User user) throws BusinessException {
        if (Objects.nonNull(isExist(user))) {
            throw new BusinessException(String.valueOf(isExist(user)));
        }
        if (isRoleExist(user.getRoles())) {
            throw new BusinessException("用户角色不存在");
        }
        user.init();
        userRepository.save(user);
        return user;
    }

    private boolean isRoleExist(String roles) {
        String[] roleArr = roles.split(",");
        List<RoleModel> allRole = roleService.getAllRole();
        for (String role : roleArr) {
            if (!allRole.contains(role)) {
                return false;
            }
        }
        return true;
    }

    private Object isExist(User user) {
        User currentUser = userRepository.findByUsernameOrPhoneOrEmail(user.getUsername(), user.getPhone(), user.getEmail())
            .stream().findFirst().orElse(null);
        if (Objects.nonNull(currentUser)) {
            if (currentUser.getUsername().equals(user.getUsername())) return "用户名已存在";
            if (currentUser.getPhone().equals(user.getPhone())) return "电话号码已存在";
            if (currentUser.getEmail().equals(user.getEmail())) return "邮箱已存在";
        }
        return null;
    }

    public void putUser(User user) throws BusinessException {
        User foundUser = userRepository.findById(user.getId()).orElseThrow(
            () -> new BusinessException("无当前数据"));

        if (isRoleExist(user.getRoles())) {
            throw new BusinessException("用户角色不存在");
        }
        foundUser.update(user);

        userRepository.save(foundUser);
    }

    public UserModel getUserFromToken(Map token) throws IOException {
        Map<String, Object> body = JwtUtil.parseTokenToMap(token.get("token").toString());
        return UserModel.build(JwtUtil.convertUser(body));
    }

    public void excelImport(MultipartFile file) throws IOException, BusinessException {
        userExcelImportService.init(file);
        userExcelImportService.importExcel();
    }
}
