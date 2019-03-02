package cn.eurasia.oj.resolvers;

import cn.eurasia.oj.annotations.Auth;
import cn.eurasia.oj.entities.User;
import cn.eurasia.oj.utils.JwtUtil;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import java.util.Map;
import java.util.Objects;

public class AuthResolver implements HandlerMethodArgumentResolver {
    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return Objects.nonNull(parameter.getParameterAnnotation(Auth.class));
    }

    @Override
    public User resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
      String token = webRequest.getHeader("token");
      Map map = JwtUtil.convertUser(JwtUtil.parseTokenToMap(token));
      return new User(Long.valueOf(map.get("id").toString()));
    }
}
