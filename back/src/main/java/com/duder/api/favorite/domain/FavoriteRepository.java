package com.duder.api.favorite.domain;

import com.duder.api.post.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    Optional<Favorite> findFavoriteByMemberIdAndPostId(Long memberId, Long postId);

    @Query("select new com.duder.api.favorite.domain.FavoriteCountDto(F.post.id, count(F.post.id)) from Favorite F " +
            "where F.post in (:post) group by F.post.id")
    List<FavoriteCountDto> findFavoriteCount(@Param("post") List<Post> post);

    @Query("select F from Favorite F join fetch F.post join fetch F.member where F.member.id = :memberId")
    List<Favorite> findAllFavoritesByMemberId(@Param("memberId") Long memberId);

}
