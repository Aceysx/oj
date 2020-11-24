package cn.eurasia.oj.entities.model;

import cn.eurasia.oj.entities.RoleEnum;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RoleModel {
    private String key;
    private String name;

    public static RoleModel build(String key) {
        RoleEnum roleEnum = RoleEnum.valueOf(key);
        return new RoleModel(roleEnum.name(), roleEnum.name());
    }
}
