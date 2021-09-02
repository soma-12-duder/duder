package com.duder.api.post.domain;

import com.duder.api.cell.domain.Cell;
import com.duder.api.common.BaseEntity;
import com.duder.api.member.domain.Member;
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
 */

 @Getter @NoArgsConstructor
 @Entity
public class Post extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long id;

    private double latitude;

    private double longitude;

    @Embedded
    private Photo photo;

    private String content;

    private long view;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cell_id")
    private Cell cell;

    public Post(double latitude, double longitude, Photo photo, String content, Member member, Cell cell) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.photo = photo;
        this.content = content;
        this.member = member;
        this.cell = cell;
    }

}
