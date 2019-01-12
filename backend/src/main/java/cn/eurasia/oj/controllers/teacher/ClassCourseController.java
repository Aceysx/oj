package cn.eurasia.oj.controllers;

import cn.eurasia.oj.services.UserCenterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping(value = "/api")
public class UserController {

    @Autowired
    private UserCenterService userCenterService;

    @GetMapping("/users/{userId}")
    public ResponseEntity getUserById(@PathVariable Long userId) {
        Map user = userCenterService.getUserInfo(userId);

        return ResponseEntity.ok(user);
    }

}
