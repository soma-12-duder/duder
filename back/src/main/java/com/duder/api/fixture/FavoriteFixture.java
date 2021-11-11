package com.duder.api.fixture;

import com.duder.api.favorite.domain.Favorite;

import static com.duder.api.fixture.MemberFixture.MEMBER1;
import static com.duder.api.fixture.PostFixture.POST1;

public class FavoriteFixture {
    public static Favorite FAVORITE1 = new Favorite(1L, MEMBER1, POST1);
}
