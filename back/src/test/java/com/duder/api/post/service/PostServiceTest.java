package com.duder.api.post.service;

import com.duder.api.member.domain.Member;
import com.duder.api.member.domain.MemberRepository;
import com.duder.api.post.domain.Post;
import com.duder.api.post.domain.PostRepository;
import com.duder.api.post.request.PostEnrollRequest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
class PostServiceTest {

    @Autowired MemberRepository memberRepository;
    @Autowired PostRepository postRepository;
    @Autowired PostService postService;

    @DisplayName("1. 게시글 등록 테스트")
    @Test
    public void enroll() throws Exception {
        //given
        Member member = new Member("memeber1", "nick",
                "www.abc.com", "www.naver.com");

        PostEnrollRequest request = new  PostEnrollRequest(37.2323, 126.2323,
                Arrays.asList("www.abc.com", "www.abd.com"), "게시글");

        //when
        memberRepository.save(member);
        postService.enroll(member, request);

        //then
        Post post = findById(1L);

        assertThat(post.getId()).isEqualTo(1L);
        assertThat(post.getContent()).isEqualTo("게시글");
//        assertThat(post.getPhoto()).extracting("www.abc.com", "www.abd.com");

    }

    public Post findById(Long id) throws Exception {
        return postRepository.findById(id).orElseThrow(() -> new Exception());
    }

}