package com.duder.api.post.service;

import com.duder.api.comment.application.CommentService;
import com.duder.api.comment.domain.CommentCountDto;
import com.duder.api.comment.domain.CommentRepository;
import com.duder.api.favorite.domain.FavoriteCountDto;
import com.duder.api.favorite.domain.FavoriteRepository;
import com.duder.api.post.domain.PostRepository;
import com.duder.api.post.response.PostListResponse;
import com.duder.api.post.response.PostWithCommentResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static com.duder.api.fixture.CommentFixture.*;
import static com.duder.api.fixture.MemberFixture.*;
import static com.duder.api.fixture.PostFixture.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PostServiceTest {

    private PostService postService;

    @Mock
    private PostRepository postRepository;

    @Mock
    private FavoriteRepository favoriteRepository;

    @Mock
    private CommentRepository commentRepository;

    @Mock
    private CommentService commentService;

    @BeforeEach
    public void init(){
        postService = new PostService(postRepository, commentService, favoriteRepository, commentRepository);
    }

    @DisplayName("1. 게시글 등록 테스트")
    @Test
    public void enroll_1() throws Exception {
        when(postRepository.save(any())).thenReturn(POST1);

        Long postId = postService.enroll(MEMBER1, 상수맛집_게시글_요청);

        assertThat(postId).isEqualTo(POST1.getId());
    }

    @DisplayName("2. 게시글 조회 테스트")
    @Test
    public void findPostById() throws Exception{
        Long postId = 1L;
        when(postRepository.findPostById(postId)).thenReturn(Optional.of(POST1));
        when(commentService.getCommentByPostId(POST1.getId())).thenReturn(Arrays.asList(ALL_COMMENT1, ALL_COMMENT2));

        PostWithCommentResponse response = postService.findPostById(MEMBER1, postId);

        assertThat(response.getComments().size()).isEqualTo(2);
        assertThat(response.getId()).isEqualTo(postId);
    }

    @DisplayName("3. 게시글 조회 테스트: 주변 게시글 조회")
    @Test
    public void findPostAll() throws Exception{
        //given
        when(postRepository.findCellByRange(any(), any(), any(), any()))
                .thenReturn(Arrays.asList(POST1, POST2, POST3));
        when(commentRepository.findCommentCount(Arrays.asList(POST1, POST2, POST3)))
                .thenReturn(Arrays.asList(new CommentCountDto(POST1.getId(), 1L)));
        when(favoriteRepository.findFavoriteCount(Arrays.asList(POST1, POST2, POST3)))
                .thenReturn(Arrays.asList(new FavoriteCountDto(POST1.getId(), 1L)));
        //when
        List<PostListResponse> responses = postService.findPostsByDistance(POST1.getLatitude(), POST1.getLongitude(), 10);

        //then
        assertThat(responses.size()).isEqualTo(3);
    }

    @DisplayName("4. 게시글 삭제 테스트 ")
    @Test
    public void postDelete(){
        //given
        when(postRepository.findPostById(POST1.getId())).thenReturn(Optional.of(POST1));

        //when
        postService.deletePost(MEMBER1, POST1.getId());

        //then
        verify(postRepository).delete(POST1);
    }

    @DisplayName("5. 게시물 업데이트 테스트")
    @Test
    public void postUpdate(){
        //given
        when(postRepository.findPostById(any())).thenReturn(Optional.of(POST1));

        //when
        postService.updatePost(1L, 게시글_수정_요청);

        //then
        assertThat(POST1.getContent()).isEqualTo(게시글_수정_요청.getContent());
        assertThat(POST1.getTitle()).isEqualTo(게시글_수정_요청.getTitle());
    }


    @DisplayName("6. 내 게시글 보기")
    @Test
    public void getMyPost(){
        //given
        when(postRepository.findPostByMemberId(MEMBER_ID)).thenReturn(Arrays.asList(POST1, POST2));

        assertThat(postService.findPostByMember(MEMBER1).size()).isEqualTo(2L);
    }

}