package com.duder.api.favorite.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    Optional<Favorite> findFavoriteByMemberIdAndPostId(Long memberId, Long postId);
}
