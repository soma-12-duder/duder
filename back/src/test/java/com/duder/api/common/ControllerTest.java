package com.duder.api.common;

import com.duder.api.member.domain.MemberRepository;
import com.duder.api.member.domain.Role;
import com.duder.api.security.filter.JwtAuthenticationFilter;
import com.duder.api.security.handler.OAuth2CustomSuccessHandler;
import com.duder.api.security.service.CustomOAuth2MemberService;
import com.duder.api.security.util.JwtTokenUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;

import java.util.Optional;

import static com.duder.api.fixture.MemberFixture.MEMBER1;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ControllerTest {
    public static String X_AUTH_TOKEN = "X-Auth-Token";
    public static String POST_API = "/api/post";

    public String JWT_TOKEN;
    public MockMvc mockMvc;

    @MockBean
    JwtAuthenticationFilter jwtAuthenticationFilter;

    JwtTokenUtil jwtTokenUtil;

    @MockBean
    CustomOAuth2MemberService customOAuth2MemberService;

    @MockBean
    OAuth2CustomSuccessHandler oAuth2CustomSuccessHandler;
    @MockBean
    MemberRepository memberRepository;

    @BeforeEach
    public void setUp(WebApplicationContext wac){
        this.jwtTokenUtil = new JwtTokenUtil(memberRepository);
        this.jwtAuthenticationFilter = new JwtAuthenticationFilter(jwtTokenUtil);
        this.JWT_TOKEN = jwtTokenUtil.createToken(1L, "12354", Role.USER);
        this.mockMvc = MockMvcBuilders
                .webAppContextSetup(wac)
                .addFilter(new CharacterEncodingFilter( "UTF-8", true ) )
                .addFilter(jwtAuthenticationFilter)
                .build();
        when(memberRepository.findByProviderId(any())).thenReturn(Optional.of(MEMBER1));
    }

}
