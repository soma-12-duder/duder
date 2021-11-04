package com.duder.api.post.presentation;

import com.duder.api.form.ApiForm;
import com.duder.api.member.domain.Member;
import com.duder.api.post.request.PostEnrollRequest;
import com.duder.api.post.request.PostUpdateRequest;
import com.duder.api.post.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import static com.duder.api.form.ApiForm.fail;
import static com.duder.api.form.ApiForm.succeed;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/post")
public class PostController {

    private final PostService postService;
    public final String SUCCESS_ENROLL_POST = "게시글 등록에 성공했습니다.";
    public final String SUCCESS_FIND_POST = "게시글을 조회에 성공했습니다.";
    public final String SUCCESS_UPDATE_POST = "게시글을 수정했습니다.";
    public final String SUCCESS_DELETE_POST = "게시글을 삭제했습니다.";

    @PostMapping("/enroll")
    public ApiForm<?> enroll(@AuthenticationPrincipal OAuth2User oAuth2User, @RequestBody PostEnrollRequest request){
        log.info("request" + request);
        try {
            return succeed(postService.enroll(oAuth2User.getAttribute("member"), request), SUCCESS_ENROLL_POST);
        } catch (Exception e) {
            return fail(e.getMessage());
        }
    }

    @GetMapping("/{postId}")
    public ApiForm<?> findPostById(@PathVariable Long postId) {
        try {
            return succeed(postService.findPostById(postId), SUCCESS_FIND_POST);
        }catch (IllegalArgumentException e){
            return fail(e.getMessage());
        }
    }

    @GetMapping("/get/me")
    public ApiForm<?> findPostById(@AuthenticationPrincipal OAuth2User oAuth2User) {
        try {
            return succeed(postService.findPostByMember(oAuth2User.getAttribute("member")), SUCCESS_FIND_POST);
        }catch (IllegalArgumentException e){
            return fail(e.getMessage());
        }
    }


    @GetMapping("/get")
    public ApiForm<?> findPostsByDistance(@RequestParam("latitude") double latitude, @RequestParam("longitude") double longitude,
                                          @RequestParam("distance") int distance){
        try{
            return succeed(postService.findPostsByDistance(latitude, longitude, distance), SUCCESS_FIND_POST);
        }catch (IllegalArgumentException e){
            return fail(e.getMessage());
        }
    }

    @PutMapping("/update/{postId}")
    public ApiForm<?> updatePost(@PathVariable Long postId, @RequestBody PostUpdateRequest postUpdateRequest){
        try {
            return succeed(postService.updatePost(postId, postUpdateRequest), SUCCESS_UPDATE_POST);
        }catch (IllegalArgumentException e){
            return fail(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{postId}")
    public ApiForm<?> deletePost(@AuthenticationPrincipal OAuth2User oAuth2User, @PathVariable Long postId){
        try{
            return succeed(postService.deletePost(oAuth2User.getAttribute("member"), postId), SUCCESS_DELETE_POST);
        }catch (IllegalArgumentException e){
            return fail(e.getMessage());
        }
    }

}
