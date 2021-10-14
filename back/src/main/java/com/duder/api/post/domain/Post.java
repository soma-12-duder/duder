package com.duder.api.post.domain;

import com.duder.api.common.BaseEntity;
import com.duder.api.member.domain.Member;
import com.duder.api.post.request.PostUpdateRequest;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * 사용자의 게시글을 저장
 * id : PK
 * latitude : 위도 (y 좌표)
 * longitude : 경도 (x 좌표)
 * Picture : 게시글 사진
 * content : 게시글 내용
 * view : 사용자 수
 * member_id : FK (Member 테이블)
 * cellValue : 게시글의 cell 값
 */

 @Getter
 @NoArgsConstructor
 @Entity
public class Post extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long id;

    private double latitude;

    private double longitude;

    @Embedded
    private Photo photo;

    private String title;

    private String content;

    private long view;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private Integer cellValue;

    public Post(double latitude, double longitude, Photo photo, String content, Member member, Integer cellValue) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.photo = photo;
        this.content = content;
        this.member = member;
        this.cellValue = cellValue;
    }

    public Post(Long id, double latitude, double longitude, Photo photo, String title, String content, Member member, Integer cellValue) {
        this.id = id;
        this.latitude = latitude;
        this.longitude = longitude;
        this.photo = photo;
        this.title = title;
        this.content = content;
        this.member = member;
        this.cellValue = cellValue;
    }

    public void update(PostUpdateRequest postUpdateRequest){
        title = postUpdateRequest.getTitle();
        content = postUpdateRequest.getContent();
    }
}
