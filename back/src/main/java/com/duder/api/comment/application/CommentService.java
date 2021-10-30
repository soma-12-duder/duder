package com.duder.api.comment.application;

import com.duder.api.comment.domain.Comment;
import com.duder.api.comment.domain.CommentRepository;
import com.duder.api.comment.request.CommentEnrollRequest;
import com.duder.api.member.domain.Member;
import com.duder.api.post.domain.Post;
import com.duder.api.post.domain.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    @Transactional
    public Long enrollComment(Member member, CommentEnrollRequest request){
        Comment comment = request.toCommentWithPost(member, findPostById(request.getPostId()));
        return commentRepository.save(comment).getId();
    }

    @Transactional
    public Long enrollSubComment(Member member, Long commentId, CommentEnrollRequest request){
        Comment comment = request.toSubCommentWithPost(member,
                findPostById(request.getPostId()), findCommentById(commentId));
        return commentRepository.save(comment).getId();
    }

    private Comment findCommentById(Long commentId) {
        return commentRepository.findById(commentId).orElseThrow(
                () -> new IllegalArgumentException("존재하지 않는 댓글 입니다.")
        );
    }

    public Post findPostById(Long postId){
        return postRepository.findPostById(postId).orElseThrow(
                () -> new IllegalArgumentException("존재하지 않는 게시글 입니다.")
        );
    }


}
