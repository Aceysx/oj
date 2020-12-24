package cn.eurasia.oj.resolvers;

import cn.eurasia.oj.annotations.Access;
import cn.eurasia.oj.entities.RoleEnum;
import cn.eurasia.oj.entities.User;
import cn.eurasia.oj.exceptions.BusinessException;
import cn.eurasia.oj.utils.JwtUtil;
import org.springframework.util.StringUtils;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;

public class PermissionResolver extends HandlerInterceptorAdapter {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        return true;
//        if (!handler.getClass().isAssignableFrom(HandlerMethod.class)) {
//            System.out.println("cat cast handler to HandlerMethod.class");
//            return true;
//        }
//        HandlerMethod method = (HandlerMethod) handler;
//        Access access = method.getMethodAnnotation(Access.class);
//        if (access == null) {
//            return true;
//        }
//        RoleEnum[] needRoles = access.roles();
//        String token = request.getHeader("token");
//        User user = JwtUtil.convertUser(JwtUtil.parseTokenToMap(token));
//
//        if (StringUtils.isEmpty(user) || !hasRole(user, needRoles)) {
//            throw new BusinessException("no permission with :" + request.getRequestURI());
//        }
//        return true;
    }

    private boolean hasRole(User user, RoleEnum[] roles) {
        if (user.getAvailable()) {
            return Arrays.stream(roles).anyMatch(role -> user.getRoles().contains(role.name())
                || role.equals(RoleEnum.LOGIN));
        }
        return false;
    }
}
