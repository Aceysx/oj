package cn.eurasia.oj.entities;


import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;

@Setter
@Getter
@Entity
@Table(name = "role")
@Accessors(chain = true)
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private RoleEnum roleName;
}
