package com.duder.api.post.presentation;

import com.duder.api.form.ApiForm;
import com.duder.api.member.domain.Member;
import com.duder.api.post.request.PostEnrollRequest;
import com.duder.api.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.duder.api.form.ApiForm.succeed;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/enroll")
public class PostController {

    private final PostService postService;

    @PostMapping
    public ApiForm<?> enroll(@AuthenticationPrincipal OAuth2User oAuth2User, PostEnrollRequest request){
        return postService.enroll(oAuth2User.getAttribute("member"), request);
    }

}
