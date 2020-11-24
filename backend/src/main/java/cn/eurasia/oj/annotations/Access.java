package cn.eurasia.oj.annotations;

import cn.eurasia.oj.entities.RoleEnum;

import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
@Documented
public @interface Access {
    RoleEnum[] roles();
}
