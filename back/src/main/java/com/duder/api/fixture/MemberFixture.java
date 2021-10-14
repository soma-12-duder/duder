package com.duder.api.fixture;

import com.duder.api.member.domain.Member;
import com.duder.api.security.service.ProviderType;

public class MemberFixture {
    public static Member MEMBER1 = new Member(1L, "12345", ProviderType.KAKAO,
            "김진오", "nickname", "www.naver.com", "rlawlsdh1127@naver.com");
}
