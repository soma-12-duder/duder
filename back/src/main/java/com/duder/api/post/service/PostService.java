package com.duder.api.post.service;

import com.duder.api.form.ApiForm;
import com.duder.api.member.domain.Member;
import com.duder.api.post.domain.Post;
import com.duder.api.post.domain.PostRepository;
import com.duder.api.post.request.PostEnrollRequest;
import com.duder.api.post.response.PostResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static com.duder.api.form.ApiForm.succeed;

@RequiredArgsConstructor
@Service
public class PostService {

    private final PostRepository postRepository;

    // cell 과 함께 저장해줘야함.
    @Transactional
    public ApiForm<?> enroll(Member member, PostEnrollRequest request) {

        //cell 계산 로직
        double latitude = request.getLatitude();
        double longitude = request.getLongitude();

        int cellValue = CoordinateUtil.findCellValue(latitude, longitude);

        Long postId = postRepository.save(request.toPostWithMemberAndCell(member, cellValue)).getId();
        return succeed(postId, "게시글 등록에 성공했습니다.");
    }

    @Transactional(readOnly = true)
    public List<PostResponse> findAllPosts (double latitude, double longitude, int distance){
        int userCellValue = CoordinateUtil.findCellValue(latitude, longitude);
        List<Integer> allCellValue = CoordinateUtil.findCellValueInRange(userCellValue, distance);
        // 쿼리 날림
        List <PostResponse> postResponses = new ArrayList<>();

        return postResponses;
    }

}
