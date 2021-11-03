package com.duder.api.post.domain;

import com.duder.api.common.BaseEntity;
import com.duder.api.member.domain.Member;
import com.duder.api.post.request.PostUpdateRequest;
import com.duder.api.post.service.Coordinate;
import lombok.AllArgsConstructor;
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
 @AllArgsConstructor
 @Entity
 @Table(
         indexes = {@Index(name = "postMultiIndex", columnList = "compressedRow, compressedColumn")}
 )
public class Post extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    public Long id;

    private Double latitude;

    private Double longitude;

    @Embedded
    private Photo photo;

    private String title;

    private String content;

    private long view;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private Integer compressedRow;

    private Integer compressedColumn;


    public Post(Double latitude, Double longitude, Photo photo, String title, String content, Member member, Integer compressedRow, Integer compressedColumn) {
        this(null, latitude, longitude, photo, title, content, 0, member, compressedRow, compressedColumn);
    }

    public Post(Long id, Double latitude, Double longitude, Photo photo, String title, String content, Member member, Coordinate coordinate) {
        this(id, latitude, longitude, photo, title, content, 0, member, coordinate.getRow(), coordinate.getColumn());
    }

    public Post(Double latitude, Double longitude, Photo photo, String title, String content, Member member, Coordinate coordinate) {
        this(null, latitude, longitude, photo, title, content, 0, member, coordinate.getRow(), coordinate.getColumn());
    }

    public Post(Long postId) {
        this(postId, null, null, null, null, null,0, null, null, null);
    }

    public void update(PostUpdateRequest postUpdateRequest){
        title = postUpdateRequest.getTitle();
        content = postUpdateRequest.getContent();
    }
}
