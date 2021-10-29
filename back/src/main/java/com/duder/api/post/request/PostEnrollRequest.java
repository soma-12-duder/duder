package com.duder.api.post.request;

import com.duder.api.member.domain.Member;
import com.duder.api.post.domain.Photo;
import com.duder.api.post.domain.Post;
import com.duder.api.post.service.Coordinate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
public class PostEnrollRequest {
    public double latitude;
    public double longitude;
    public List<String> photoUrls;
    public String title;
    public String content;

    public Post toPostWithMemberAndCell(Member member, Coordinate coordinate){
        return new Post(latitude, longitude, new Photo(photoUrls), title, content, member, coordinate);
    }

}
