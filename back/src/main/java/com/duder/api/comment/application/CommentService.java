package com.duder.api.comment.application;

import com.duder.api.comment.domain.Comment;
import com.duder.api.comment.domain.CommentRepository;
import com.duder.api.comment.request.CommentEnrollRequest;
import com.duder.api.comment.response.AllCommentResponse;
import com.duder.api.member.domain.Member;
import com.duder.api.post.domain.Post;
import com.duder.api.post.domain.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Transactional(readOnly = true)
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
    public Long enrollSubComment(Member member, Long parentId, CommentEnrollRequest request){
        // 게시글이 있다면 댓글도 있음.
        Comment comment = request.toSubCommentWithPost(member,
                findPostById(request.getPostId()), new Comment(parentId));
        return commentRepository.save(comment).getId();
    }

    @Transactional
    public Long deleteComment(Member member, Long commentId){
        Comment comment = findCommentById(commentId);
        comment.setVisibleFalse();
        return comment.getId();
    }

    public List<AllCommentResponse> getCommentByPostId(Long postId){
        List<Comment> comments = commentRepository.findCommentByPostId(postId);
        Map<Long, Integer> commentParents = new HashMap<>();

        List<AllCommentResponse> responses = new ArrayList<>();

        for (Comment comment : comments) {
            if (comment.getComment() == null){
                commentParents.put(comment.getId(), responses.size());
                responses.add(AllCommentResponse.ofParent(comment));
                continue;
            }

            int parentIndex = commentParents.get(comment.getComment().getId());
            responses.get(parentIndex).addSubComment(comment);
        }

        return responses;
    }

    public Comment findCommentById(Long commentId){
        return commentRepository.findById(commentId).orElseThrow(
                () -> new IllegalArgumentException("댓글이 존재하지 않습니다.")
        );
    }

    public Post findPostById(Long postId){
        return postRepository.findPostById(postId).orElseThrow(
                () -> new IllegalArgumentException("존재하지 않는 게시글 입니다.")
        );
    }

}
