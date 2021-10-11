package com.duder.api.post.service;

import com.duder.api.member.domain.Member;
import com.duder.api.post.domain.Post;
import com.duder.api.post.domain.PostRepository;
import com.duder.api.post.request.PostEnrollRequest;
import com.duder.api.post.response.PostResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@RequiredArgsConstructor
@Service
public class PostService {

    private final PostRepository postRepository;

    // cell 과 함께 저장해줘야함.
    @Transactional
    public Long enroll(Member member, PostEnrollRequest request) throws Exception {

        //cell 계산 로직
        double latitude = request.getLatitude();
        double longitude = request.getLongitude();

        int cellValue = CoordinateUtil.findCellValue(latitude, longitude);

        Long postId = postRepository.save(request.toPostWithMemberAndCell(member, cellValue)).getId();
        return postId;
    }

    @Transactional(readOnly = true)
    public PostResponse findPostById (Long postId) throws IllegalArgumentException {
        Post post = postRepository.findPostById(postId).orElseThrow(
                () -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다.")
        );

        return PostResponse.of(post);
    }

    // parameter : 현재 위치(latitude, longitude) 주변 거리 (distance)
    @Transactional(readOnly = true)
    public List<PostResponse> findPostsByDistance (double latitude, double longitude, int distance){
        int userCellValue = CoordinateUtil.findCellValue(latitude, longitude);
        List<Integer> allCellValue = CoordinateUtil.findCellValueInRange(userCellValue, distance);
        // 쿼리 날림

        return postRepository.findByCellValues(allCellValue)
                .stream()
                .map(PostResponse::new)
                .collect(Collectors.toList());
    }

}
