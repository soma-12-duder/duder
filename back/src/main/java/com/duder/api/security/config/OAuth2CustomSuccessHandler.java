package com.duder.api.security.config;

import com.duder.api.member.domain.Member;
import com.duder.api.member.domain.MemberRepository;
import com.duder.api.member.domain.Role;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.event.AuthenticationFailureBadCredentialsEvent;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
@Component
public class OAuth2CustomSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtTokenUtil jwtTokenUtil;
    private final ObjectMapper objectMapper;
    private final MemberRepository memberRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        // 인증이 성공적이라면 토큰을 발급해줌

        OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();

        String kakaoId = oauthUser.getName();
        System.out.println("인증성공 success handler kakaoId = " + kakaoId);

        Member member = memberRepository.findByKakaoId(kakaoId).orElseThrow(
                () -> new AuthenticationCredentialsNotFoundException("회원이 존재하지 않습니다.")
        );

        String token = jwtTokenUtil.createToken(kakaoId, Role.USER);

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpStatus.OK.value());
        response.setCharacterEncoding("utf-8");
        response.getWriter()
                .write(objectMapper.writeValueAsString(
                    TokenResponse.of(member.getId(), member.getEmail(), token)
                ));

    }
}
