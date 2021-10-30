package com.duder.api.comment.application;


import com.duder.api.comment.domain.CommentRepository;
import com.duder.api.post.domain.PostRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

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

}