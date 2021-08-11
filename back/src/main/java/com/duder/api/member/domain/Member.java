package com.duder.api.member.domain;

import com.duder.api.common.BaseEntity;
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

    private String username;

    private String nickname;

    private String profile;

    private String email;

    public Member(String username, String nickname, String profile, String email) {
        this.username = username;
        this.nickname = nickname;
        this.profile = profile;
        this.email = email;
    }

    public static Member of (String username, String nickname, String profile, String email){
        return new Member(username, nickname, profile, email);
    }

    public void changeNickname(String nickname){
        this.nickname = nickname;
    }

}
