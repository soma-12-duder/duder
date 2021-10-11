package com.duder.api.post.service;

import com.duder.api.member.domain.Member;
import com.duder.api.member.domain.MemberRepository;
import com.duder.api.post.domain.Photo;
import com.duder.api.post.domain.Post;
import com.duder.api.post.domain.PostRepository;
import com.duder.api.post.request.PostEnrollRequest;
import com.duder.api.post.response.PostResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
class PostServiceTest {

    @Autowired MemberRepository memberRepository;
    @Autowired PostRepository postRepository;
    @Autowired PostService postService;
    public Member memberA;

    @Autowired EntityManager em;

    @PostConstruct
    public void init(){
        memberA = new Member("memeber1", "nick",
                "www.abc.com", "www.naver.com");
        memberRepository.save(memberA);
    }

    @DisplayName("1. 게시글 등록 테스트: 전송 url이 하나일 때")
    @Test
    public void enroll_1() throws Exception {
        //given
        PostEnrollRequest request = new  PostEnrollRequest(37.2323, 126.2323,
                Arrays.asList("www.abd.com"), "게시글");

        //when
        Long postId = postService.enroll(memberA, request);
        em.flush();

        //then
        Post post = findById(postId);

        assertThat(post.getId()).isEqualTo(postId);
        assertThat(post.getContent()).isEqualTo("게시글");
        assertThat(post.getPhoto().getPhotoUrl()).contains("www.abd.com");
    }

    @DisplayName("2. 게시글 등록 테스트: 전송 url이 두개일 때")
    @Test
    public void enroll_2() throws Exception {
        //given
        PostEnrollRequest request = new PostEnrollRequest(37.2323, 126.2323,
                Arrays.asList("www.abc.com", "www.abd.com"), "게시글");

        //when
        Long postId = postService.enroll(memberA, request);

        //then
        Post post = findById(postId);

        assertThat(post.getId()).isEqualTo(postId);
        assertThat(post.getContent()).isEqualTo("게시글");
        assertThat(post.getPhoto().getPhotoUrl()).contains("www.abc.com", "www.abd.com");
    }

    @DisplayName("3. 게시글 조회 테스트: 한 개 조회")
    @Test
    public void findPostById() throws Exception{
        //given
        Post post = postRepository.save(new Post(37.2323, 126.2323,
                new Photo(Arrays.asList("www.abc.com")), "게시글", memberA, 1));
        em.flush();

        //when
        PostResponse findPost = postService.findPostById(post.getId());

        //then

        assertThat(findPost.getId()).isEqualTo(post.getId());
    }


    @DisplayName("4. 게시글 조회 테스트: 여러 게시글 조회-1")
    @Test
    public void findPostAll() throws Exception{
        //given
        int cellValue = CoordinateUtil.findCellValue(37.2323, 126.2323);
        int cellValue1 = CoordinateUtil.findCellValue(37.2322, 126.2325);
        int cellValue2 = CoordinateUtil.findCellValue(37.2324, 126.2321);
        Post post1 = new Post(37.2323, 126.2323, new Photo(Arrays.asList("www.abc.com")),
                "게시글", memberA, cellValue);
        Post post2 = new Post(37.2322, 126.2325, new Photo(Arrays.asList("www.abc.com")),
                "게시글", memberA, cellValue1);
        Post post3 = new Post(37.2324, 126.2321, new Photo(Arrays.asList("www.abc.com")),
                "게시글", memberA, cellValue2);

        //when
        postRepository.saveAll(Arrays.asList(post1, post2, post3));
        List<PostResponse> allPosts = postService.findPostsByDistance(37.2323, 126.2323, 10);

        //then
        assertThat(allPosts.size()).isEqualTo(3);
    }

    @DisplayName("5. 게시글 조회 테스트: 여러 게시글 조회-2")
    @Test
    public void findPostAll2() throws Exception{
        //given
        int cellValue = CoordinateUtil.findCellValue(37.2323, 126.2323);
        int cellValue1 = CoordinateUtil.findCellValue(37.2322, 126.2325);
        int cellValue2 = CoordinateUtil.findCellValue(37.2324, 126.2321);
        Post post1 = new Post(37.2323, 126.2323, new Photo(Arrays.asList("www.abc.com")),
                "게시글", memberA, cellValue);
        Post post2 = new Post(37.2322, 126.2325, new Photo(Arrays.asList("www.abc.com")),
                "게시글", memberA, cellValue1);
        Post post3 = new Post(37.2324, 126.2321, new Photo(Arrays.asList("www.abc.com")),
                "게시글", memberA, cellValue2);

        //when
        postRepository.saveAll(Arrays.asList(post1, post2, post3));
        List<PostResponse> allPosts = postService.findPostsByDistance(37.2323, 126.2323, 10);

        //then
        assertThat(allPosts.size()).isEqualTo(3);
    }

    public Post findById(Long id) throws IllegalArgumentException {
        return postRepository.findById(id).orElseThrow(() -> new IllegalArgumentException(id + "번은 존재하지 않는 post 입니다"));
    }

}