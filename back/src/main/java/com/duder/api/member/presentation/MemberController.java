package com.duder.api.member.presentation;

import com.duder.api.form.ApiForm;
import com.duder.api.member.application.MemberService;
import com.duder.api.member.domain.Member;
import com.duder.api.member.response.MemberResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import static com.duder.api.form.ApiForm.*;

@RequestMapping("/api/me")
@RequiredArgsConstructor
@RestController
public class MemberController {

    private final MemberService memberService;
    public final String SUCCESS_FIND_MEMBER = "성공적으로 회원을 찾았습니다.";
    public final String SUCCESS_UPDATE_MEMBER = "회원 정보를 성공적으로 수정했습니다.";

    @GetMapping
    public ApiForm<?> findMemberById(@AuthenticationPrincipal OAuth2User oAuth2User){
        try {
            return succeed(MemberResponse.of(oAuth2User.getAttribute("member")), SUCCESS_FIND_MEMBER);
        }catch (IllegalArgumentException e){
            return fail(e.getMessage());
        }
    }

    @PutMapping("/update")
    public ApiForm<?> updateMemberNickname(@AuthenticationPrincipal OAuth2User oAuth2User, @RequestParam String nickname){
        try {
            return succeed(memberService.updateMemberNickname(
                    oAuth2User.getAttribute("member"), nickname), SUCCESS_UPDATE_MEMBER);
        }catch (IllegalArgumentException e){
            return fail(e.getMessage());
        }
    }

    @PutMapping("/update/profile")
    public ApiForm<?> updateMemberProfile(@AuthenticationPrincipal OAuth2User oAuth2User, @RequestParam String profileUrl){
        try {
            return succeed(memberService.updateMemberNickname(
                    oAuth2User.getAttribute("member"), profileUrl), SUCCESS_UPDATE_MEMBER);
        }catch (IllegalArgumentException e){
            return fail(e.getMessage());
        }
    }
}
