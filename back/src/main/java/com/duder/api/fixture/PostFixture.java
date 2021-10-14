package com.duder.api.fixture;

import com.duder.api.post.domain.Photo;
import com.duder.api.post.domain.Post;
import com.duder.api.post.request.PostEnrollRequest;
import com.duder.api.post.request.PostUpdateRequest;
import com.duder.api.post.service.CoordinateUtil;

import java.util.Arrays;

public class PostFixture {

    public static final Long POST_ID = 1L;
    public static final Long MEMBER_ID = 1L;

    public final static Post POST1 = new Post(POST_ID, 37.1234, 126.1234, Photo.of("www.abc.com", "www.def.com"),
           "title1", "content1", MemberFixture.MEMBER1, CoordinateUtil.findCellValue(37.1234, 126.1234));

    public final static Post POST2 = new Post(2L, 37.3456, 126.1324, Photo.of("www.abc.com", "www.def.com"),
            "title2", "content1", MemberFixture.MEMBER1, CoordinateUtil.findCellValue(37.3456, 126.1324));

    public final static Post POST3 = new Post(3L, 37.4567, 126.2345, Photo.of("www.abc.com", "www.def.com"),
            "title3", "content1", MemberFixture.MEMBER1, CoordinateUtil.findCellValue(37.4567, 126.2345));

    public final static PostEnrollRequest 상수맛집_게시글_요청 = new PostEnrollRequest(37.1234, 126.1234,
            Arrays.asList("www.abc.com", "www.def.com"), "상수맛집 추천좀요");

    public final static PostUpdateRequest 게시글_수정_요청 = new PostUpdateRequest("title update", "상수 맛집 추천좀");

}
