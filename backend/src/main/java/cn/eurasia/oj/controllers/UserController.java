package cn.eurasia.oj.controllers;

import cn.eurasia.oj.annotations.Access;
import cn.eurasia.oj.entities.RoleEnum;
import cn.eurasia.oj.entities.User;
import cn.eurasia.oj.exceptions.BusinessException;
import cn.eurasia.oj.services.RoleService;
import cn.eurasia.oj.services.UserCenterService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping(value = "/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserCenterService userCenterService;
    private final RoleService roleService;

    @GetMapping("{userId}")
    @Access(roles = RoleEnum.ADMIN)
    public ResponseEntity getUserById(@PathVariable Long userId) throws BusinessException {
        return ResponseEntity.ok(userCenterService.getUser(userId));
    }

    @PostMapping("init")
    public ResponseEntity initUser(@RequestBody Map token) throws BusinessException {
        if (Objects.isNull(token.get("token"))) {
            throw new BusinessException("请登录");
        }
        try {
            return ResponseEntity.ok(userCenterService.getUserFromToken(token));
        } catch (Exception e) {
            throw new BusinessException("请登录");
        }
    }

    @PostMapping("login")
    public ResponseEntity login(@RequestBody User user) throws BusinessException, UnsupportedEncodingException {
        return new ResponseEntity(userCenterService.login(user), HttpStatus.CREATED);
    }

    @GetMapping("pageable")
    public ResponseEntity getUsersByPage(
        @PageableDefault(sort = {"id"},
            direction = Sort.Direction.DESC) Pageable pageable) {

        return ResponseEntity.ok(PageVo.build(userCenterService.getUsersByPage(pageable)));
    }

    @GetMapping("roles")
    public ResponseEntity getAllRole() {
        return ResponseEntity.ok(roleService.getAllRole());
    }

    @PostMapping("")
    @Access(roles = RoleEnum.ADMIN)
    public ResponseEntity addUser(@RequestBody User user) throws BusinessException {
        User data = userCenterService.addUser(user);
        return ResponseEntity.created(URI.create("/api/users" + user.getId())).body(data);
    }

    @PutMapping("")
    public ResponseEntity putUser(@RequestBody User user) throws BusinessException {
        userCenterService.putUser(user);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("excel")
    public ResponseEntity excelImport(@RequestParam("file") MultipartFile file) throws BusinessException, IOException {
        if (validateExcelFormat(file)) {
            userCenterService.excelImport(file);
            return new ResponseEntity(HttpStatus.CREATED);
        }
        throw new BusinessException("Wrong format. Only support .xls or .xlsx");
    }

    public Boolean validateExcelFormat(MultipartFile file) {
        String fileName = file.getOriginalFilename();
        return fileName.endsWith(".xls") || fileName.endsWith(".xlsx");
    }

}
