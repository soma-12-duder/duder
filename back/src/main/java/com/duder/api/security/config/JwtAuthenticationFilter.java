package com.duder.api.security.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.security.sasl.AuthenticationException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenUtil jwtTokenUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String token = jwtTokenUtil.resolveToken(request);
            System.out.println("jwt 인증 필터 jwt token = " + token);

            if (token != null && jwtTokenUtil.validateToken(token)) {
                System.out.println("validate token = " + token);
                SecurityContext context = SecurityContextHolder.createEmptyContext();
                Authentication authentication = jwtTokenUtil.getAuthentication(token);


                SecurityContextHolder.setContext(context);
                SecurityContextHolder.getContext().setAuthentication(authentication);

                System.out.println(authentication.isAuthenticated());
            }
            filterChain.doFilter(request, response);
        }catch (AuthenticationException e){
            logger.error(e.getMessage(), e);
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
        }

    }
}
