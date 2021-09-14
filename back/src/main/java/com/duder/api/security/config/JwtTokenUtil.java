package com.duder.api.security.config;

import com.duder.api.member.domain.Member;
import com.duder.api.member.domain.MemberRepository;
import com.duder.api.member.domain.Role;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.*;

@RequiredArgsConstructor
@Component
public class JwtTokenUtil {

    private String secretKey = "duder";

    private long tokenValidTime = 30 * 60 * 1000L;

    private final MemberRepository memberRepository;

    @PostConstruct
    protected void init(){
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    // JWT 토큰 생성

    public String createToken(String userId, Role role){
        Claims claims = Jwts.claims().setSubject(userId);
        claims.put("role", role.getKey()); // 정보는 key value 로 저장
        Date now = new Date();
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + tokenValidTime))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    // 토큰에서 회원 정보 추출
    public String getPayload(String token){
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // Jwt 토큰 -> 인증 정보 조회
    public Authentication getAuthentication(String token){
        String kakaoId = getPayload(token);
        Member member = memberRepository.findByKakaoId(kakaoId).orElseThrow(
                () -> new AuthenticationCredentialsNotFoundException("존재하지 않는 회원입니다.")
        );

        Map<String, Object> attribute = createAttribute(member);

        OAuth2User defaultUser = new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority(member.getRole().getKey())),
                attribute, "kakaoId");

        return new OAuth2AuthenticationToken(defaultUser,
                Collections.singleton(new SimpleGrantedAuthority(member.getRole().getKey())),
                "kakao");
    }

    public Map<String, Object> createAttribute(Member member){
        Map<String, Object> attribute = new HashMap<>();
        attribute.put("kakaoId", member.getKakaoId());
        return attribute;
    }

    public String resolveToken(HttpServletRequest request){
        return request.getHeader("X-AUTH-TOKEN");
    }

    public boolean validateToken(String jwtToken){
        try{
            Jws<Claims> claims = Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(jwtToken);

            return !claims.getBody().getExpiration().before(new Date());
        }catch (Exception e){
            return false;
        }
    }

}
