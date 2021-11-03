package com.duder.api.comment.presentation;

import com.duder.api.comment.application.CommentService;
import com.duder.api.comment.request.CommentEnrollRequest;
import com.duder.api.form.ApiForm;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import static com.duder.api.form.ApiForm.fail;
import static com.duder.api.form.ApiForm.succeed;

@RequiredArgsConstructor
@RequestMapping("/api/comment")
@RestController
public class CommentController {

    private final CommentService commentService;
    private final String SUCCESS_COMMENT_ENROLL = "댓글 등록에 성공했습니다.";
    private final String SUCCESS_COMMENT_DELETE = "댓글 삭제에 성공했습니다.";

    @PostMapping("")
    public ApiForm<?> enrollComment (@AuthenticationPrincipal OAuth2User oAuth2User,
                                     @RequestBody CommentEnrollRequest request){
        try{
            return succeed(commentService.enrollComment(oAuth2User.getAttribute("member"), request),
                    SUCCESS_COMMENT_ENROLL);
        }catch (Exception e){
            return fail(e.getMessage());
        }
    }

    @PostMapping("/{parentId}")
    public ApiForm<?> enrollSubComment (@AuthenticationPrincipal OAuth2User oAuth2User,
                                     @RequestBody CommentEnrollRequest request, @PathVariable Long parentId){
        try{
            return succeed(commentService.enrollSubComment(oAuth2User.getAttribute("member"), parentId, request),
                    SUCCESS_COMMENT_ENROLL);
        }catch (Exception e){
            return fail(e.getMessage());
        }
    }

    @DeleteMapping("/{commentId}")
    public ApiForm<?> deleteCommentId(@AuthenticationPrincipal OAuth2User oAuth2User, @PathVariable Long commentId){
        try {
            return succeed(commentService.deleteComment(oAuth2User.getAttribute("member"), commentId),
                    SUCCESS_COMMENT_DELETE);
        }catch(Exception e){
            return fail(e.getMessage());
        }
    }

}
