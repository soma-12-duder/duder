package com.duder.api.fixture;

import com.duder.api.comment.domain.Comment;
import com.duder.api.comment.request.CommentEnrollRequest;
import com.duder.api.comment.response.AllCommentResponse;
import com.duder.api.comment.response.CommentResponse;

import static com.duder.api.fixture.MemberFixture.MEMBER1;
import static com.duder.api.fixture.PostFixture.POST1;

public class CommentFixture {
    public static Comment COMMENT1 = new Comment(1L, "hi", true, MEMBER1, POST1, null);
    public static Comment COMMENT2 = new Comment(2L, "hi", true, MEMBER1, POST1, null);
    public static Comment SUBCOMMENT1 = new Comment(1L, "hi", true, MEMBER1, POST1, COMMENT1);

    public static CommentEnrollRequest COMMENT_REQUEST = new CommentEnrollRequest(1L, "hi");

    public static AllCommentResponse ALL_COMMENT1 = new AllCommentResponse(CommentResponse.of(COMMENT1));
    public static AllCommentResponse ALL_COMMENT2 = new AllCommentResponse(CommentResponse.of(COMMENT2));
}
