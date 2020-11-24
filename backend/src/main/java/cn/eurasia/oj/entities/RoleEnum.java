package cn.eurasia.oj.entities;

import cn.eurasia.oj.entities.model.RoleModel;
import lombok.AllArgsConstructor;

import java.util.Arrays;
import java.util.List;

@AllArgsConstructor
public enum RoleEnum {
    ADMIN("管理员"),
    TEACHER("老师"),
    STUDENT("学生"),
    LOGIN("登陆用户");

    private String description;

    public static List<RoleModel> getRoles() {
        return Arrays.asList(
            new RoleModel(ADMIN.name(), ADMIN.description),
            new RoleModel(TEACHER.name(), TEACHER.description),
            new RoleModel(STUDENT.name(), STUDENT.description)
        );
    }
}
