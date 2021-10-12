package com.duder.api.security.service;

import com.duder.api.member.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class PrincipalDetail implements OAuth2User {

    private Member member;
    private Map<String, Object> attributes;

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }


    @Override
    public String getName() {
        System.out.println("member.getName() = " + member.getName());
        return member.getName();
    }

    public String getProviderId() {
        return member.getProviderId();
    }
}
