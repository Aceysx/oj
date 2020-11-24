package cn.eurasia.oj.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Setter
@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "user")
@Accessors(chain = true)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;
    private Boolean available;
    private String name;
    private String phone;
    private String email;
    private String roles;

    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private Date createTime;

    public User(Long id) {
        this.id = id;
    }

    public static User build(String username, String password, String name, String phone, String email, String userRoles) {
        return User.builder()
            .username(username)
            .name(name)
            .password(password)
            .phone(phone)
            .email(email)
            .roles(userRoles)
            .available(true)
            .build();
    }

    public User hidePassword() {
        this.setPassword("");
        return this;
    }

    public void update(User user) {
        this.username = user.getUsername();
        this.name = user.name;
        this.email = user.email;
        this.roles = user.roles;
        this.phone = user.phone;
    }

    public void init() {
        this.available = true;
    }
}