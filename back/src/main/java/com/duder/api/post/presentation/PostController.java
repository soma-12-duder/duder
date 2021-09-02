package com.duder.api.post.presentation;

import com.duder.api.form.ApiForm;
import com.duder.api.member.domain.Member;
import com.duder.api.post.request.PostEnrollRequest;
import com.duder.api.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.duder.api.form.ApiForm.succeed;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/enroll")
public class PostController {

    private final PostService postService;

    @PostMapping
    public ApiForm<?> enroll(PostEnrollRequest request, Member member){
        return postService.enroll(request, member);
    }

}
