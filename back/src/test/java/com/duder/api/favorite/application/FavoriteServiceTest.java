package com.duder.api.favorite.application;

import com.duder.api.favorite.domain.FavoriteRepository;
import com.duder.api.post.domain.PostRepository;
import com.duder.api.post.service.PostService;
import com.duder.api.post.service.PostViewService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static com.duder.api.fixture.FavoriteFixture.FAVORITE1;
import static com.duder.api.fixture.MemberFixture.MEMBER1;
import static com.duder.api.fixture.PostFixture.POST1;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class FavoriteServiceTest {

    private FavoriteService favoriteService;

    @Mock
    private FavoriteRepository favoriteRepository;

    @Mock
    private PostViewService postViewService;

    @BeforeEach
    void init(){
        favoriteService = new FavoriteService(favoriteRepository, postViewService);
    }

    @Test
    void favorite_post_test(){
        when(favoriteRepository.findFavoriteByMemberIdAndPostId(any(), any()))
                .thenReturn(Optional.empty());
        when(favoriteRepository.save(any())).thenReturn(FAVORITE1);
        assertThat(favoriteService.push(MEMBER1, POST1.getId())).isEqualTo(POST1.getId());
    }

    @DisplayName("이미 좋아요가 저장되어 있을 때 오류")
    @Test
    void favorite_post_test2(){
        when(favoriteRepository.findFavoriteByMemberIdAndPostId(any(), any()))
                .thenReturn(Optional.of(FAVORITE1));

        assertThatThrownBy(() -> favoriteService.push(MEMBER1, POST1.getId()))
                .isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    void favorite_delete_test(){
        when(favoriteRepository.findFavoriteByMemberIdAndPostId(MEMBER1.getId(), POST1.getId()))
                .thenReturn(Optional.of(FAVORITE1));
        favoriteService.delete(MEMBER1, POST1.getId());
        verify(favoriteRepository).delete(FAVORITE1);
    }

}