package com.duder.api.chatroom.service;

import com.duder.api.chatroom.domain.Chatroom;
import com.duder.api.member.domain.Member;
import com.duder.api.member.response.MemberResponse;
import com.querydsl.core.annotations.QueryProjection;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ChatroomResponse {

    private Long chatroomId;
    private MemberResponse member;
    private MemberResponse opponent;

    @QueryProjection
    public ChatroomResponse(Long chatroomId,Member member, Member opponent){
        this.chatroomId = chatroomId;
        this.member = MemberResponse.of(member);
        this.opponent = MemberResponse.of(opponent);
    }

}
