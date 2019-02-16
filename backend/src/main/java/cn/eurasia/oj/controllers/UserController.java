package cn.eurasia.oj.controllers;

import cn.eurasia.oj.entities.User;
import cn.eurasia.oj.exceptions.BusinessException;
import cn.eurasia.oj.services.RoleService;
import cn.eurasia.oj.services.UserCenterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping(value = "/api/users")
public class UserController {

    @Autowired
    private UserCenterService userCenterService;
    @Autowired
    private RoleService roleService;

    @GetMapping("{userId}")
    public ResponseEntity getUserById(@PathVariable Long userId) throws BusinessException {
        return ResponseEntity.ok(userCenterService.getUser(userId));
    }

    @PostMapping("login")
    public ResponseEntity login(@RequestBody User user) throws BusinessException {
        user = userCenterService.login(user);

        return new ResponseEntity(user, HttpStatus.CREATED);
    }

    @GetMapping("pageable")
    public ResponseEntity getUsersByPage(
            @PageableDefault(sort = {"id"},
                    direction = Sort.Direction.DESC) Pageable pageable) {

        return ResponseEntity.ok(userCenterService.getUsersByPage(pageable));
    }

    @GetMapping("roles")
    public ResponseEntity getAllRole(@PageableDefault(sort = {"id"},
            direction = Sort.Direction.DESC) Pageable pageable) {

        return ResponseEntity.ok(roleService.getAllRole(pageable));
    }

    @PostMapping("")
    public ResponseEntity addUser(@RequestBody User user) throws BusinessException {
        User data = userCenterService.addUser(user);
        return ResponseEntity.created(URI.create("/api/users" + user.getId())).body(data);
    }

    @PutMapping("")
    public ResponseEntity putUser(@RequestBody User user) throws BusinessException {
        userCenterService.putUser(user);
        return ResponseEntity.noContent().build();
    }
}
