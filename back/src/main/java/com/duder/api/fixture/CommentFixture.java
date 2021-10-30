package com.duder.api.fixture;

import com.duder.api.comment.domain.Comment;
import com.duder.api.comment.request.CommentEnrollRequest;

import static com.duder.api.fixture.MemberFixture.MEMBER1;
import static com.duder.api.fixture.PostFixture.POST1;

public class CommentFixture {
    public static Comment COMMENT1 = new Comment(1L, "hi", MEMBER1, POST1, null);
    public static Comment SUBCOMMENT1 = new Comment(1L, "hi", MEMBER1, POST1, COMMENT1);

    public static CommentEnrollRequest COMMENT_REQUEST = new CommentEnrollRequest(1L, "hi");
}
