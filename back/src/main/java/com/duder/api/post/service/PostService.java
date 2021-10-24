package com.duder.api.post.service;

import com.duder.api.member.domain.Member;
import com.duder.api.post.domain.Post;
import com.duder.api.post.domain.PostRepository;
import com.duder.api.post.request.PostEnrollRequest;
import com.duder.api.post.request.PostUpdateRequest;
import com.duder.api.post.response.PostResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class PostService {

    private final PostRepository postRepository;

    // cell 과 함께 저장해줘야함.
    @Transactional
    public Long enroll(Member member, PostEnrollRequest request) throws Exception {

        double latitude = request.getLatitude();
        double longitude = request.getLongitude();
        log.info("latitude: " + latitude + " longitude: " + longitude);
        Coordinate coordinate = CoordinateUtil.findCellCoordinate(latitude, longitude);

        return postRepository.save(request.toPostWithMemberAndCell(member, coordinate)).getId();
    }

    public PostResponse findPostById (Long postId) throws IllegalArgumentException {
        return PostResponse.of(findById(postId));
    }

    // parameter : 현재 위치(latitude, longitude) 주변 거리 (distance)
    public List<PostResponse> findPostsByDistance (double latitude, double longitude, int distance)
                                                                        throws IllegalArgumentException{
        List<Coordinate> coordinates = CoordinateUtil.findCellCoordinateInRange(latitude, longitude, distance);
        Coordinate leftUpCoordinate = coordinates.get(0);
        Coordinate rightDownCoordinate = coordinates.get(1);

        // 쿼리 날림
        return postRepository.findCellByRange(leftUpCoordinate.getRow(), rightDownCoordinate.getRow(),
                        leftUpCoordinate.getColumn(), rightDownCoordinate.getColumn())
                .stream()
                .map(PostResponse::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public PostResponse updatePost (Long postId, PostUpdateRequest postUpdateRequest) throws IllegalArgumentException{
        Post post = findById(postId);
        post.update(postUpdateRequest);
        return PostResponse.of(post);
    }

    @Transactional
    public Long deletePost(Member member, Long postId) throws IllegalArgumentException{
        Post post = findById(postId);
        if (member.isNotSameId(post.getMember())){
            throw new IllegalArgumentException("회원이 올린 글이 아닙니다.");
        }
        postRepository.delete(post);
        return postId;
    }

    public Post findById(Long postId){
        return postRepository.findPostById(postId).orElseThrow(
                () -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다.")
        );
    }
}
