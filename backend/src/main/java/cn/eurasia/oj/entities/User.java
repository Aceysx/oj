package cn.eurasia.oj.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Setter
@Getter
@Entity
@Table(name = "user")
@Accessors(chain = true)
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String username;
  @Transient
  private String password;
  private Boolean available;
  private String name;
  private String phone;
  private String email;
  @ManyToMany
  @JoinTable(name = "userRole",joinColumns = @JoinColumn(name = "userId"),
          inverseJoinColumns = @JoinColumn(name = "roleId"))
  private List<Role> roles;

  @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
  private Date createTime;

}