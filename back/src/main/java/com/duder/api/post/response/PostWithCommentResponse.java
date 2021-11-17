package com.duder.api.post.response;

import com.duder.api.comment.response.AllCommentResponse;
import com.duder.api.comment.response.CommentResponse;
import com.duder.api.member.response.MemberResponse;
import com.duder.api.post.domain.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Getter
public class PostWithCommentResponse {
    private Long id;
    private double latitude;
    private double longitude;
    private List<String> photoUrls = new ArrayList<>();
    private String content;
    private long view;
    private boolean favoriteState;
    private MemberResponse member;

    private List<AllCommentResponse> comments = new ArrayList<>();

    private int favoriteCount = 0;
    private int commentCount = 0;

    public static PostWithCommentResponse of(Post post, List<AllCommentResponse> comments, boolean favoriteState, int favoriteCount){
        return new PostWithCommentResponse(post, comments, favoriteState, favoriteCount);
    }

    public PostWithCommentResponse (Post post, List<AllCommentResponse> comments, boolean favoriteState, int favoriteCount){
        this.id = post.getId();
        this.latitude = post.getLatitude();
        this.longitude = post.getLongitude();
        this.photoUrls = post.getPhoto().getPhotoUrl();
        this.content = post.getContent();
        this.view = 0;
        this.favoriteState = favoriteState;
        this.member = MemberResponse.of(post.getMember());
        this.comments = comments;
        this.commentCount = comments.size();
        this.favoriteCount = favoriteCount;
    }

}
