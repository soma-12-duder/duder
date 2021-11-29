package com.duder.api.post.service;

import com.duder.api.comment.application.CommentService;
import com.duder.api.comment.domain.CommentRepository;
import com.duder.api.favorite.application.FavoriteService;
import com.duder.api.member.domain.Member;
import com.duder.api.post.domain.Post;
import com.duder.api.post.domain.PostRepository;
import com.duder.api.post.request.PostEnrollRequest;
import com.duder.api.post.request.PostUpdateRequest;
import com.duder.api.post.response.PostListResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class PostService {

    private final PostRepository postRepository;
    private final CommentService commentService;
    private final FavoriteService favoriteService;

    @Transactional
    public Long enroll(Member member, PostEnrollRequest request) throws Exception {

        double latitude = request.getLatitude();
        double longitude = request.getLongitude();
        log.info("latitude: " + latitude + " longitude: " + longitude);
        Coordinate coordinate = CoordinateUtil.findCellCoordinate(latitude, longitude);

        return postRepository.save(request.toPostWithMemberAndCell(member, coordinate)).getId();
    }

    @Transactional
    public PostListResponse updatePost (Long postId, PostUpdateRequest postUpdateRequest) throws IllegalArgumentException{
        Post post = findById(postId);
        post.update(postUpdateRequest);
        return PostListResponse.of(post);
    }

    @Transactional
    public Long deletePost(Member member, Long postId) throws IllegalArgumentException{
        Post post = findById(postId);
        if (member.isNotSameId(post.getMember())){
            throw new IllegalArgumentException("회원이 올린 글이 아닙니다.");
        }
        commentService.deleteAllByPostId(post.getId());
        favoriteService.deleteAllByPostId(post.getId());
        postRepository.delete(post);
        return postId;
    }

    public Post findById(Long postId){
        return postRepository.findPostById(postId).orElseThrow(
                () -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다.")
        );
    }

}
