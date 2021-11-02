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
    private String content;
    private long view;
    private MemberResponse member;

    private List<AllCommentResponse> comments = new ArrayList<>();

    private int favoriteCount = 0;
    private int commentCount = 0;

    public static PostWithCommentResponse of(Post post, List<AllCommentResponse> comments){
        return new PostWithCommentResponse(post, comments);
    }

    public PostWithCommentResponse (Post post, List<AllCommentResponse> comments){
        this.id = post.getId();
        this.latitude = post.getLatitude();
        this.longitude = post.getLongitude();
        this.content = post.getContent();
        this.view = 0;
        this.member = MemberResponse.of(post.getMember());
        this.comments = comments;
    }

}
