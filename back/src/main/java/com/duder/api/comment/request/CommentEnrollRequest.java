package com.duder.api.comment.request;

import com.duder.api.comment.domain.Comment;
import com.duder.api.member.domain.Member;
import com.duder.api.post.domain.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class CommentEnrollRequest {
    private Long postId;
    private String content;

    public Comment toCommentWithPost(Member member, Post post) {
        return new Comment(content, member, post);
    }

    public Comment toSubCommentWithPost(Member member, Post post, Comment parentComment) {
        return new Comment(content, member, post, parentComment);
    }
}
