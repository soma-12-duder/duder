package com.duder.api.post.request;

import com.duder.api.cell.domain.Cell;
import com.duder.api.member.domain.Member;
import com.duder.api.post.domain.Photo;
import com.duder.api.post.domain.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class PostEnrollRequest {
    private double latitude;
    private double longitude;
    private List<String> photoUrls;
    private String content;

    public Post toPostWithMemberAndCell(Member member, Cell cell){
        return new Post(latitude, longitude, new Photo(photoUrls), content, member, cell);
    }

}
