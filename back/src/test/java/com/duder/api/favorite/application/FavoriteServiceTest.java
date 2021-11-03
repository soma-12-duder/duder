package com.duder.api.favorite.application;

import com.duder.api.favorite.domain.Favorite;
import com.duder.api.favorite.domain.FavoriteRepository;
import com.duder.api.fixture.MemberFixture;
import com.duder.api.post.domain.PostRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static com.duder.api.fixture.MemberFixture.MEMBER1;
import static com.duder.api.fixture.PostFixture.POST1;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class FavoriteServiceTest {

    private FavoriteService favoriteService;

    @Mock
    private FavoriteRepository favoriteRepository;

    @Mock
    private PostRepository postRepository;

    @BeforeEach
    void init(){
        favoriteService = new FavoriteService(favoriteRepository, postRepository);
    }

    @Test
    void favorite_post_test(){
        when(postRepository.findPostById(any())).thenReturn(Optional.of(POST1));
        when(favoriteRepository.save(any())).thenReturn(new Favorite(1L, MEMBER1, POST1));
        assertThat(favoriteService.push(MEMBER1, POST1.getId())).isEqualTo(POST1.getId());
    }

    @Test
    void favorite_delete_test(){
        Favorite favorite = new Favorite(1L, MEMBER1, POST1);
        when(favoriteRepository.findFavoriteByMemberIdAndPostId(MEMBER1.getId(), POST1.getId()))
                .thenReturn(Optional.of(favorite));
        favoriteService.delete(MEMBER1, POST1.getId());
        verify(favoriteRepository).delete(favorite);
    }

}