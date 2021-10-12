package com.duder.api.member.domain;

import com.duder.api.common.BaseEntity;
import com.duder.api.security.service.ProviderType;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * 회원 정보를 저장
 * id : PK
 * username : 실명
 * nickname : 닉네임
 * profile : 사용자 프로필 url
 * email : 사용자 email 주소
 */

 @Getter @NoArgsConstructor
 @Entity
public class Member extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    private String providerId;

    @Enumerated(EnumType.STRING)
    private ProviderType providerType;

    private String name;

    private String nickname;

    private String profile;

    private String email;

    public Member(String providerId, ProviderType providerType, String name, String nickname, String profile, String email) {
        this.providerId = providerId;
        this.providerType = providerType;
        this.name = name;
        this.nickname = nickname;
        this.profile = profile;
        this.email = email;
    }

    public Member(String name, String nickname, String profile, String email) {
        this.name = name;
        this.nickname = nickname;
        this.profile = profile;
        this.email = email;
    }

    public void updateNickname(String nickname){
        this.nickname = nickname;
    }

}
