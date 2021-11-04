package com.duder.api.post.response;

import com.duder.api.member.response.MemberResponse;
import com.duder.api.post.domain.Post;
import com.duder.api.post.service.CoordinateUtil;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class PostResponse {
    private Long id;
    private double latitude;
    private double longitude;
    private String content;
    private long view;
    private MemberResponse member;

    private long favoriteCount = 0;
    private long commentCount = 0;
    private double distance = 0.0;

    public static PostResponse of(Post post){
        return new PostResponse(post);
    }

    public PostResponse (Post post){
        this.id = post.getId();
        this.latitude = post.getLatitude();
        this.longitude = post.getLongitude();
        this.content = post.getContent();
        this.view = 0;
        this.member = MemberResponse.of(post.getMember());
    }

    public PostResponse (Post post, double latitude, double longitude, long favoriteCount, long commentCount){
        this.id = post.getId();
        this.latitude = post.getLatitude();
        this.longitude = post.getLongitude();
        this.content = post.getContent();
        this.view = 0;
        this.member = MemberResponse.of(post.getMember());
        this.distance = Math.floor((CoordinateUtil
                .calculateDistanceTwoPoints(latitude, longitude, this.latitude, this.longitude) * 10) / 10);
        this.favoriteCount = favoriteCount;
        this.commentCount = commentCount;
    }

    public static List<PostResponse> toList(List<Post> posts, Map<Long, Long> favoriteOfPosts, Map<Long, Long> commentOfPosts, double latitude, double longitude) {
        return posts.stream()
                .map(o-> new PostResponse(o, latitude, longitude, favoriteOfPosts.get(o.getId()), commentOfPosts.get(o.getId())))
                .collect(Collectors.toList());
    }
}
