package com.duder.api.post.response;

import com.duder.api.member.domain.Member;
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
        return new PostResponse(post.getId(), post.getLatitude(), post.getLongitude(), post.getContent()
                , post.getView(), MemberResponse.of(post.getMember()));
    }

}
