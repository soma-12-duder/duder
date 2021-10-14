package com.duder.api.member.application;

import com.duder.api.member.domain.Member;
import com.duder.api.member.domain.MemberRepository;
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
    public Member updateMemberNickname(Member member, String nickname) {
        member.updateNickname(nickname);
        return member;
    }

    public Member findById(Long memberId){
        return memberRepository.findMemberById(memberId).orElseThrow(
                () -> new IllegalArgumentException(MEMBER_NOT_FOUND_EXCEPTION));
    }
}
