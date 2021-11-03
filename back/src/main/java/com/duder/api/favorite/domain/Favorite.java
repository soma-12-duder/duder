package com.duder.api.favorite.domain;

import com.duder.api.common.BaseEntity;
import com.duder.api.member.domain.Member;
import com.duder.api.post.domain.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * 사용자가 게시글을 좋아요 한 정보들을 저장
 * id : PK
 * member_id : FK (Member 테이블)
 * post_id : FK (Post 테이블)
 */

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Favorite extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "favorite_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    public Favorite (Member member, Post post){
        this(null, member, post);
    }

}
