package com.duder.api.post.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {
    Optional<Post> findPostById(Long id);

//    @Query("select P from Post P where P.cellValue in (:cellValues)")
    @Query("select P from Post P")
    List<Post> findByCellValues(@Param("cellValues") List<Integer> cellValues);

    @Query("select P from Post P where (P.compressedRow between :rowStart and :rowEnd) and " +
            "(P.compressedColumn between :columnStart and :columnEnd)")
    List<Post> findCellByRange(@Param("rowStart") Integer rowStart, @Param("rowEnd") Integer rowEnd,
                    @Param("columnStart") Integer columnStart, @Param("columnEnd") Integer columnEnd);

    List<Post> findPostByMemberId(Long memberId);
}
