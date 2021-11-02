package com.duder.api.comment.response;

import com.duder.api.comment.domain.Comment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AllCommentResponse {

    private CommentResponse comment;

    List<CommentResponse> subComments = new ArrayList<>();

    public AllCommentResponse(CommentResponse comment) {
        this.comment = comment;
    }

    public static AllCommentResponse ofParent(Comment comment){
        return new AllCommentResponse(CommentResponse.of(comment));
    }

    public void addSubComment(Comment comment){
        subComments.add(CommentResponse.of(comment));
    }

}
