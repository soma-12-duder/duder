package com.duder.api.security.config;

import com.duder.api.security.filter.JwtAuthenticationFilter;
import com.duder.api.security.handler.OAuth2CustomSuccessHandler;
import com.duder.api.security.service.CustomOAuth2MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final CustomOAuth2MemberService customOAuth2MemberService;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final OAuth2CustomSuccessHandler oAuth2CustomSuccessHandler;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        //@formatter:off
        http
                    .httpBasic().disable()
                    .csrf().disable()
                    .formLogin().disable()
                    .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                    .headers().frameOptions().disable() // h2 화면 보이게 처리
                .and()
//                    .csrf().requireCsrfProtectionMatcher(new AntPathRequestMatcher("'!/h2-console/**"))
                    .authorizeRequests() // url별 권한 관리
                    .antMatchers("/", "/oauth2/**", "/h2-console/**", "**") // 매칭되는 문자열
                    .permitAll() // 허용
                    .anyRequest().authenticated() // 나머지는 인증과정 거친다.
                .and()
                    .oauth2Login()
                    .userInfoEndpoint()
                    .userService(customOAuth2MemberService) // 소셜 로그인 성공 시 후속 조치 진행할 MemberService
                .and()
                    .successHandler(oAuth2CustomSuccessHandler)
//                    .defaultSuccessUrl("/login-success")
//                    .failureUrl("/login-failure");
                .and()
                    .addFilterBefore(jwtAuthenticationFilter, OAuth2LoginAuthenticationFilter.class); // 실질적 인증 일어나기 직전
        //@formatter:on
    }

//    @Bean
//    public ClientRegistrationRepository clientRegistrationRepository (
//            @Value("${spring.security.oauth2.client.registration.kakao.client-id}") String kakaoClientId,
//            @Value("${spring.security.oauth2.client.registration.kakao.client-secret}") String kakaoClientSecret
//    ){
//        List< ClientRegistration> registrations = new ArrayList<>();
//        registrations.add(CustomOAuth2Provider.KAKAO.getBuilder("kakao")
//                .clientId(kakaoClientId)
//                .clientSecret(kakaoClientSecret)
//                .jwkSetUri("temp")
//                .build()
//        );
//
//        return new InMemoryClientRegistrationRepository(registrations);
//    }
}
