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

import static com.duder.api.fixture.CommentFixture.ALL_COMMENT1;
import static com.duder.api.fixture.CommentFixture.ALL_COMMENT2;
import static com.duder.api.fixture.MemberFixture.MEMBER1;
import static com.duder.api.fixture.PostFixture.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PostViewServiceTest {

    private PostViewService postViewService;

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
        postViewService = new PostViewService(postRepository, commentService, favoriteRepository, commentRepository);
    }

    @DisplayName("1. 게시글 하나 조회 테스트")
    @Test
    public void findPostById() throws Exception{
        Long postId = 1L;
        when(postRepository.findPostById(postId)).thenReturn(Optional.of(POST1));
        when(commentService.getCommentByPostId(POST1.getId())).thenReturn(Arrays.asList(ALL_COMMENT1, ALL_COMMENT2));

        PostWithCommentResponse response = postViewService.findPostById(MEMBER1, postId);

        assertThat(response.getComments().size()).isEqualTo(2);
        assertThat(response.getId()).isEqualTo(postId);
    }

    @DisplayName("2. 게시글 조회 테스트: 주변 게시글 조회")
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
        List<PostListResponse> responses = postViewService.findPostsOrderByCreatedAt(POST1.getLatitude(), POST1.getLongitude(), 10);

        //then
        assertThat(responses.size()).isEqualTo(3);
    }

    @DisplayName("3. 내 게시글 보기")
    @Test
    public void getMyPost(){
        //given
        when(postRepository.findPostByMemberId(MEMBER_ID)).thenReturn(Arrays.asList(POST1, POST2));

        assertThat(postViewService.findPostByMember(MEMBER1).size()).isEqualTo(2L);
    }

}