package cn.eurasia.oj.entities.model;

import cn.eurasia.oj.entities.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@AllArgsConstructor
@Getter
public class UserModel {
    private Long id;
    private String username;
    private Boolean available;
    private String name;
    private String phone;
    private String email;
    private List<RoleModel> roles;
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private Date createTime;

    public static UserModel build(User user) {
        List<RoleModel> roles = Stream.of(user.getRoles().split(","))
                .map(RoleModel::build).collect(Collectors.toList());
        return new UserModel(
                user.getId(),
                user.getUsername(),
                user.getAvailable(),
                user.getName(),
                user.getPhone(),
                user.getEmail(),
                roles,
                user.getCreateTime()
        );
    }
}
