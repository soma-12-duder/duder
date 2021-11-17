package com.duder.api.chatroom.domain;

import com.duder.api.chatroom.service.ChatroomResponse;

import java.util.List;

public interface ChatroomRepositoryCustom {

    List<ChatroomResponse> findAllOfChatroom(Long memberId);
}
