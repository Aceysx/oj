package cn.eurasia.oj.entities;


import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Setter
@Getter
@Entity
@Table(name = "role")
@Accessors(chain = true)
public class Role {
    @Id
    private Long id;

    private String roleName;
}
