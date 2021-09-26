package com.duder.api.post.service;

import com.duder.api.cell.domain.Cell;
import com.duder.api.form.ApiForm;
import com.duder.api.member.domain.Member;
import com.duder.api.post.domain.Post;
import com.duder.api.post.domain.PostRepository;
import com.duder.api.post.request.PostEnrollRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.duder.api.form.ApiForm.succeed;

@RequiredArgsConstructor
@Service
public class PostService {

    private final PostRepository postRepository;

    // Cell 과 함께 저장해줘야함.
    @Transactional
    public ApiForm<?> enroll(Member member, PostEnrollRequest request) {

        //Cell 계산 로직 추가

        Long postId = postRepository.save(request.toPostWithMemberAndCell(member, new Cell())).getId();
        return succeed(postId, "게시글 등록에 성공했습니다.");
    }


}
