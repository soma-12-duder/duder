package com.duder.api.chatroom.domain;

import com.duder.api.chatroom.service.ChatroomResponse;
import com.duder.api.chatroom.service.QChatroomResponse;
import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

import static com.duder.api.chatroom.domain.QChatroom.chatroom;
import static com.duder.api.member.domain.QMember.member;

@RequiredArgsConstructor
public class ChatroomRepositoryImpl implements ChatroomRepositoryCustom{

    private final JPAQueryFactory queryFactory;


    @Override
    public List<ChatroomResponse> findAllOfChatroom(Long memberId) {
        return queryFactory
                .select(new QChatroomResponse(chatroom.id,
                        chatroom.member,
                        ExpressionUtils.as(JPAExpressions.select(member).from(member)
                                .where(member.id.eq(chatroom.opponentId)), "opponent")
                ))
                .from(chatroom)
                .where(chatroom.opponentId.eq(memberId)
                        .or(chatroom.member.id.eq(memberId)))
                .fetch();
    }
}
