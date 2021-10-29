package com.duder.api.favorite.presentation;

import com.duder.api.favorite.application.FavoriteService;
import com.duder.api.favorite.request.FavoriteRequest;
import com.duder.api.form.ApiForm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import static com.duder.api.form.ApiForm.fail;
import static com.duder.api.form.ApiForm.succeed;

@Slf4j
@RequestMapping("/api/favorite")
@RequiredArgsConstructor
@RestController
public class FavoriteController {

    private final FavoriteService favoriteService;
    private final String SUCCESS_FAVORITE = "좋아요 요청에 성공했습니다.";
    private final String SUCCESS_FAVORITE_DELETE = "좋아요 삭제 요청에 성공했습니다.";

    @PostMapping
    public ApiForm<?> push(@AuthenticationPrincipal OAuth2User oAuth2User, @RequestBody FavoriteRequest favoriteRequest){
        try {
            log.info(favoriteRequest.getPostId() + "번 게시글 좋아요 요청");
            return succeed(favoriteService.push(oAuth2User.getAttribute("member"),
                    favoriteRequest.getPostId()), SUCCESS_FAVORITE);
        }catch (IllegalArgumentException e){
            return fail(e.getMessage());
        }
    }

    @DeleteMapping
    public ApiForm<?> delete(@AuthenticationPrincipal OAuth2User oAuth2User, @RequestBody FavoriteRequest favoriteRequest){
        try {
            log.info(favoriteRequest.getPostId() + "번 게시글 좋아요 삭제 요청");
            return succeed(favoriteService.delete(oAuth2User.getAttribute("member"),
                            favoriteRequest.getPostId()), SUCCESS_FAVORITE_DELETE );
        }catch (IllegalArgumentException e){
            return fail(e.getMessage());
        }
    }

}
