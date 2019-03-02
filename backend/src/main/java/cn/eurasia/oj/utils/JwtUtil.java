package cn.eurasia.oj.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

public class JwtUtil {
  private static final String SECRET = "ThisIsASecret";

  public static Map<String, Object> parseTokenToMap(String token) {
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

  public static Map convertUser(Map<String, Object> body) throws IOException {
    Map<String, Object> user = new ObjectMapper().readValue(body.get("sub").toString(), HashMap.class);
    return user;
  }
}
