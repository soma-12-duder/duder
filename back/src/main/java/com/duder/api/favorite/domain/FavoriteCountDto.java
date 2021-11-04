package com.duder.api.favorite.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteCountDto {
    private Long postId;
    private Long favoriteCount;
}
