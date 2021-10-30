package com.duder.api.comment.application;


import com.duder.api.comment.domain.CommentRepository;
import com.duder.api.post.domain.PostRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;


import static com.duder.api.fixture.MemberFixture.*;
import static com.duder.api.fixture.CommentFixture.*;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CommentServiceTest {

    private CommentService commentService;

    @Mock
    private PostRepository postRepository;

    @Mock
    private CommentRepository commentRepository;

    @BeforeEach
    void init(){
        this.commentService = new CommentService(commentRepository, postRepository);
    }

    @Test
    public void comment_enroll(){
        when(commentRepository.save(any())).thenReturn(COMMENT1);

        assertThat(commentService.enrollComment(MEMBER1, COMMENT_REQUEST)).isEqualTo(1L);
    }

    @Test
    public void subComment_enroll(){
        when(commentRepository.save(any())).thenReturn(SUBCOMMENT1);

        assertThat(commentService.enrollSubComment(MEMBER1, 1L, COMMENT_REQUEST)).isEqualTo(1L);
    }

}