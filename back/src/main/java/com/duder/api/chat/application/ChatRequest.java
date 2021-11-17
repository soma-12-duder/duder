package com.duder.api.chat.application;

import com.duder.api.chat.domain.Chat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ChatRequest {

    private Long senderId;
    private String senderNickname;
    private Long roomId;
    private String content;

    public static Chat toChat(ChatRequest request){
        return new Chat(null, request.getSenderId(), request.getSenderNickname(),
                request.getRoomId(), request.getContent(), LocalDateTime.now());
    }

}
