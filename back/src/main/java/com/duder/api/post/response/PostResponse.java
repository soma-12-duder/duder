package com.duder.api.post.response;

import com.duder.api.member.response.MemberResponse;
import com.duder.api.post.domain.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class PostResponse {
    private Long id;
    private double latitude;
    private double longitude;
    private String content;
    private long view;
    private MemberResponse memberResponse;

    public static PostResponse of(Post post){
        return new PostResponse(post);
    }

    public PostResponse (Post post){
        this.id = post.getId();
        this.latitude = post.getLatitude();
        this.longitude = post.getLongitude();
        this.content = post.getContent();
        this.view = 0;
        this.memberResponse = MemberResponse.of(post.getMember());
    }

}
