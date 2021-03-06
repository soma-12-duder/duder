package com.duder.api.comment.domain;

import com.duder.api.common.BaseEntity;
import com.duder.api.member.domain.Member;
import com.duder.api.post.domain.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * 사용자가 포스트에 남긴 댓글 저장
 * id : PK
 * member_id : FK (Member 테이블)
 * post_id : FK (Post 테이블)
 */

@AllArgsConstructor
@Getter @NoArgsConstructor
@Entity
public class Comment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long id;

    private String content;

    private boolean visible;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    public Post post;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Comment comment;

    public Comment(String content, Member member, Post post) {
        this(null, content, true, member, post, null);
    }

    public Comment(String content, Member member, Post post, Comment parentComment) {
        this(null, content, true, member, post, parentComment);
    }

    public Comment(Long commentId) {
        this(commentId, null, true, null, null, null);
    }

    public void setVisibleFalse(){
        this.visible = false;
    }
}
