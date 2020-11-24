package cn.eurasia.oj.utils;

import cn.eurasia.oj.entities.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.*;
import java.util.stream.Collectors;

public class JwtUtil {
    private static final String SECRET = "ThisIsASecret";

    public static Map<String, Object> parseTokenToMap(String token) {
        if (Objects.isNull(token)) {
            return null;
        }
        return (Map<String, Object>) Jwts.parser()
            .setSigningKey(SECRET.getBytes())
            .parse(token)
            .getBody();
    }

    public static String build(String jsonStr) throws UnsupportedEncodingException {
        return Jwts.builder()
            .setSubject(jsonStr)
            .signWith(SignatureAlgorithm.HS512, SECRET.getBytes("UTF-8"))
            .compact();
    }

    public static User convertUser(Map<String, Object> data) throws IOException {
        if (Objects.isNull(data)) {
            return null;
        }
        Map<String, Object> userMap = new ObjectMapper().readValue(data.get("sub").toString(), HashMap.class);
        User user = new User();
        Optional.of(userMap.get("roles")).ifPresent(roles -> {
            String rolesStr = ((List<Map>) roles).stream().map(item -> item.get("key").toString()).collect(Collectors.joining(","));
            user.setRoles(rolesStr);
        });
        Optional.of(userMap.get("available")).ifPresent(available -> user.setAvailable((Boolean) available));
        Optional.of(userMap.get("id")).ifPresent(id -> user.setId(Long.parseLong(id.toString())));
        Optional.of(userMap.get("name")).ifPresent(name -> user.setName((String) name));
        Optional.of(userMap.get("phone")).ifPresent(phone -> user.setPhone((String) phone));
        Optional.of(userMap.get("email")).ifPresent(email -> user.setEmail((String) email));
        return user;
    }
}
