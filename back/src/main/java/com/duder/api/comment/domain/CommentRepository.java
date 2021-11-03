package com.duder.api.comment.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Query("select C from Comment C join fetch C.member M where C.post.id = :postId and " +
            "C.member.id = M.id order by C.createdAt")
    List<Comment> findCommentByPostId(@Param("postId") Long postId);
}
