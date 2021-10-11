package com.duder.api.post.presentation;

import com.duder.api.form.ApiForm;
import com.duder.api.member.domain.Member;
import com.duder.api.post.request.PostEnrollRequest;
import com.duder.api.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import static com.duder.api.form.ApiForm.fail;
import static com.duder.api.form.ApiForm.succeed;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/post")
public class PostController {

    private final PostService postService;

    @PostMapping("/enroll")
    public ApiForm<?> enroll(@AuthenticationPrincipal OAuth2User oAuth2User, PostEnrollRequest request){
        try {
            return succeed(postService.enroll(oAuth2User.getAttribute("member"), request), "게시글 등록에 성공했습니다.");
        } catch (Exception e) {
            return fail(e.getMessage());
        }
    }

    @GetMapping("/{postId}")
    public ApiForm<?> findPostById(@AuthenticationPrincipal OAuth2User oAuth2User, @PathVariable Long postId)
            throws IllegalArgumentException{
        try {
            return succeed(postService.findPostById(postId), "게시글을 찾았습니다.");
        }catch (IllegalArgumentException e){
            return fail(e.getMessage());
        }
    }

    @GetMapping("/get")
    public ApiForm<?> findPostsByDistance(@RequestParam("latitude") double latitude, @RequestParam("longitude") double longitude,
                                          @RequestParam("distance") int distance) throws IllegalArgumentException{
        try{
            return succeed(postService.findPostsByDistance(latitude, longitude, distance), "게시글을 찾았습니다.");
        }catch (IllegalArgumentException e){
            return fail(e.getMessage());
        }
    }

}
