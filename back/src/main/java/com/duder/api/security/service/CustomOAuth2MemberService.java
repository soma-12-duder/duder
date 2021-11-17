package com.duder.api.security.service;

import com.duder.api.member.domain.Member;
import com.duder.api.member.domain.MemberRepository;
import com.duder.api.member.domain.Role;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Slf4j
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

        ProviderType providerType = ProviderType.valueOf(registrationId.toUpperCase());

        Map<String, Object> attributes = oAuth2User.getAttributes();
        OAuthAttribute oAuthAttribute = OAuthAttribute.of(providerType, attributes);

        Member member = memberRepository.findByProviderId(oAuthAttribute.getProviderId())
                .orElseGet(() -> memberRepository.save(oAuthAttribute.toEntity()));

        log.info("success Authentication: " + registrationId);

        return new PrincipalDetail(member, attributes);
    }
}
