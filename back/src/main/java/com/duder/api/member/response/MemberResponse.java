package com.duder.api.member.response;

import com.duder.api.member.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class MemberResponse {
    private Long id;
    private String nickname;
    private String email;
    private String profile;

    public static MemberResponse of(Member member){
        return new MemberResponse(member.getId(), member.getNickname(), member.getEmail(), member.getProfile());
    }
}
