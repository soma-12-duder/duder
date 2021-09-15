package com.duder.api.security.service;

import com.duder.api.member.domain.Member;
import com.duder.api.member.domain.MemberRepository;
import com.duder.api.member.domain.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashMap;

@Service
@RequiredArgsConstructor
public class CustomOAuth2MemberService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final MemberRepository memberRepository;

    @Transactional
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();

        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        // 서비스 id(카카오, 구글 등)
        String registrationId = userRequest.getClientRegistration().getRegistrationId();

        // 로그인 진행 시 키가 되는 필드 값 (PK)
        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails()
            .getUserInfoEndpoint().getUserNameAttributeName();


        System.out.println("registrationId = " + registrationId);
        System.out.println("userNameAttributeName = " + userNameAttributeName);

        String kakaoId = oAuth2User.getName();
        LinkedHashMap<String, Object> kakao_account = (LinkedHashMap<String, Object>) oAuth2User.getAttributes().get("kakao_account");
        String email = (String) kakao_account.get("email");

        System.out.println("kakaoId = " + kakaoId);

        Member member = memberRepository.findByKakaoId(kakaoId)
                .orElseGet(() -> memberRepository.save(
                        new Member(kakaoId, null, null, Role.USER, null, email, null)));

        System.out.println("loadUser member = " + member);

        return oAuth2User;
    }
}
