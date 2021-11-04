package com.duder.api.comment.domain;

import com.duder.api.favorite.domain.FavoriteCountDto;
import com.duder.api.post.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Query("select C from Comment C join fetch C.member M where C.post.id = :postId and " +
            "C.member.id = M.id order by C.createdAt")
    List<Comment> findCommentByPostId(@Param("postId") Long postId);

    @Query("select new com.duder.api.comment.domain.CommentCountDto(C.post.id, count(C.post.id)) from Comment C " +
            "where C.post in (:post) group by C.post.id")
    List<CommentCountDto> findCommentCount(@Param("post") List<Post> post);
}
