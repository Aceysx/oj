package cn.eurasia.oj.controllers;

import cn.eurasia.oj.entities.User;
import cn.eurasia.oj.exceptions.BusinessException;
import cn.eurasia.oj.services.UserCenterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping(value = "/api/users")
public class UserController {

  @Autowired
  private UserCenterService userCenterService;

  @GetMapping("{userId}")
  public ResponseEntity getUserById(@PathVariable Long userId) {
    Map user = userCenterService.getUserInfo(userId);

    return ResponseEntity.ok(user);
  }

  @PostMapping("login")
  public ResponseEntity login(@RequestBody User user) throws BusinessException {
    user = userCenterService.login(user);

    return new ResponseEntity(user, HttpStatus.CREATED);
  }
}
