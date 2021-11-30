package com.duder.api.post.service;

import com.duder.api.comment.application.CommentService;
import com.duder.api.comment.domain.CommentCountDto;
import com.duder.api.comment.domain.CommentRepository;
import com.duder.api.favorite.domain.Favorite;
import com.duder.api.favorite.domain.FavoriteCountDto;
import com.duder.api.favorite.domain.FavoriteRepository;
import com.duder.api.member.domain.Member;
import com.duder.api.post.domain.Post;
import com.duder.api.post.domain.PostRepository;
import com.duder.api.post.response.PostListResponse;
import com.duder.api.post.response.PostWithCommentResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toMap;

@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class PostViewService {

    private final PostRepository postRepository;
    private final CommentService commentService;
    private final FavoriteRepository favoriteRepository;
    private final CommentRepository commentRepository;

    public PostWithCommentResponse findPostById (Member member, Long postId) {
        List<Favorite> favorites = favoriteRepository.findAllByPostId(postId);
        return PostWithCommentResponse.of(findById(postId), commentService.getCommentByPostId(postId),
                checkFavorite(favorites, member.getId()), favorites.size());
    }

    public List<PostListResponse> findPostsOrderByCreatedAt (double latitude, double longitude, int distance) {
        List<Post> posts = findPostsByDistance(latitude, longitude, distance);
        return toPostListResponse(posts, latitude, longitude);
    }

    public List<PostListResponse> findPostsOrderByFavorite(double latitude, double longitude, int distance) {
        List<Post> posts = findPostsByDistance(latitude, longitude, distance);
        List<PostListResponse> responses = toPostListResponse(posts, latitude, longitude);

        return responses.stream()
                .sorted(PostListResponse::compareTo)
                .collect(Collectors.toList());
    }

    public List<PostListResponse> findPostByMember(Member member) {
        List<Post> posts = postRepository.findPostByMemberId(member.getId());
        return toPostListResponse(posts);
    }

    public List<Post> findPostsByDistance(double latitude, double longitude, int distance) {
        List<Coordinate> coordinates = CoordinateUtil.findCellCoordinateInRange(latitude, longitude, distance);
        Coordinate leftUpCoordinate = coordinates.get(0);
        Coordinate rightDownCoordinate = coordinates.get(1);

        return postRepository.findCellByRange(leftUpCoordinate.getRow(), rightDownCoordinate.getRow(),
                leftUpCoordinate.getColumn(), rightDownCoordinate.getColumn());
    }

    public List<PostListResponse> toPostListResponse(List<Post> posts, double latitude, double longitude){
        Map<Long, Long> favoriteOfPosts = favoriteCountToMap(posts);
        Map<Long, Long> commentOfPosts = commentCountToMap(posts);

        return PostListResponse.toList(posts, fillZero(favoriteOfPosts, posts),
                fillZero(commentOfPosts, posts), latitude, longitude);
    }

    public List<PostListResponse> toPostListResponse(List<Post> posts){
        Map<Long, Long> favoriteOfPosts = favoriteCountToMap(posts);
        Map<Long, Long> commentOfPosts = commentCountToMap(posts);

        return PostListResponse.toList(posts, fillZero(favoriteOfPosts, posts),
                fillZero(commentOfPosts, posts));
    }

    private Map<Long, Long> commentCountToMap(List<Post> posts) {
        return commentRepository.findCommentCount(posts).stream()
                .collect(toMap(CommentCountDto::getCommentId, CommentCountDto::getCommentCount));
    }

    private Map<Long, Long> favoriteCountToMap(List<Post> posts) {
        return favoriteRepository.findFavoriteCount(posts).stream()
                .collect(toMap(FavoriteCountDto::getPostId, FavoriteCountDto::getFavoriteCount));
    }

    public Post findById(Long postId) {
        return postRepository.findPostById(postId).orElseThrow(
                () -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다.")
        );
    }

    public boolean checkFavorite(List<Favorite> favorites, Long memberId) {
        return favorites.stream()
                .map(o -> o.getMember().getId())
                .anyMatch(o -> o.equals(memberId));
    }

    public Map<Long, Long> fillZero(Map<Long, Long> countMap, List<Post> posts){
        for (Post post : posts) {
            if (countMap.containsKey(post.getId()))
                continue;
            countMap.put(post.getId(), 0L);
        }
        return countMap;
    }
}
