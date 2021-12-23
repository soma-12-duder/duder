package com.duder.api.post.presentation;

import com.duder.api.post.service.PostService;
import com.duder.api.post.service.PostViewService;
import com.duder.api.security.filter.JwtAuthenticationFilter;
import com.duder.api.security.handler.OAuth2CustomSuccessHandler;
import com.duder.api.security.service.CustomOAuth2MemberService;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static com.duder.api.fixture.MemberFixture.MEMBER1;
import static com.duder.api.fixture.PostFixture.POST_ID;
import static com.duder.api.fixture.PostFixture.상수맛집_게시글_요청;
import static com.duder.api.util.JsonUtil.toJson;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = PostController.class)
class PostControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    CustomOAuth2MemberService customOAuth2MemberService;

    @MockBean
    JwtAuthenticationFilter jwtAuthenticationFilter;

    @MockBean
    OAuth2CustomSuccessHandler oAuth2CustomSuccessHandler;

    @MockBean
    PostService postService;

    @MockBean
    PostViewService postViewService;

    @Test
    void enroll() throws Exception {

        when(postService.enroll(any(), any())).thenReturn(POST_ID);

        ResultActions result = mockMvc.perform(post("/api/post/enroll")
                .contentType(MediaType.APPLICATION_JSON)
                .content(toJson(상수맛집_게시글_요청))
        );

        result
                .andExpect(status().isOk());
    }

    @Test
    void findPostById() {
    }

    @Test
    void findMyPosts() {
    }

    @Test
    void findPostsByDistance() {
    }

    @Test
    void findPostsByDistanceOrderByFavorite() {
    }

    @Test
    void updatePost() {
    }

    @Test
    void deletePost() {
    }
}