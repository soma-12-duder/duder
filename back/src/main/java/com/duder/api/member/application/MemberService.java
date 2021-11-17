package com.duder.api.member.application;

import com.duder.api.member.domain.Member;
import com.duder.api.member.domain.MemberRepository;
import com.duder.api.member.response.MemberResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class MemberService {
    private final MemberRepository memberRepository;
    public final String MEMBER_NOT_FOUND_EXCEPTION = "회원이 존재하지 않습니다.";

    @Transactional
    public MemberResponse updateMemberNickname(Member member, String nickname) {
        member.updateNickname(nickname);
        return MemberResponse.of(member);
    }

    @Transactional
    public MemberResponse updateMemberProfile(Member member, String profileUrl){
        member.updateProfile(profileUrl);
        return MemberResponse.of(member);
    }

    public Member findById(Long memberId){
        return memberRepository.findMemberById(memberId).orElseThrow(
                () -> new IllegalArgumentException(MEMBER_NOT_FOUND_EXCEPTION));
    }
}
