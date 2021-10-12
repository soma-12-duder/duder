package com.duder.api.security.service;

import com.duder.api.member.domain.Member;
import lombok.*;

import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Builder
public class OAuthAttribute {
    private String providerId;
    private ProviderType providerType;
    private String email;
    private String name;

    public static OAuthAttribute of(ProviderType providerType, Map<String, Object> attributes) {
        switch (providerType){
            case KAKAO: return ofKakao(attributes);
            default: return ofGoogle(attributes);
        }
    }

    public static OAuthAttribute ofGoogle(Map<String, Object> attributes) {
        return OAuthAttribute.builder()
                .providerId((String) attributes.get("sub"))
                .email((String) attributes.get("email"))
                .name((String) attributes.get("name"))
                .providerType(ProviderType.GOOGLE)
                .build();
    }

    public static OAuthAttribute ofKakao(Map<String, Object> attributes) {
        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
        Map<String, Object> properties = (Map<String, Object>) attributes.get("properties");

        return OAuthAttribute.builder()
                .email((String) kakaoAccount.get("email"))
                .name((String) properties.get("nickname"))
                .providerId(String.valueOf(attributes.get("id")))
                .providerType(ProviderType.KAKAO)
                .build();
    }

    public Member toEntity (){
        return new Member(providerId, providerType, name, null, null, email);
    }

}
