package com.duder.api.comment.response;

import com.duder.api.comment.domain.Comment;
import com.duder.api.member.response.MemberResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Getter
public class CommentResponse {
    private Long id;
    private String content;
    private boolean isVisible;

    private MemberResponse member;

    public static CommentResponse of(Comment comment){
        return new CommentResponse(comment.getId(), comment.getContent(),
                comment.isVisible(), MemberResponse.of(comment.getMember()));
    }

}
