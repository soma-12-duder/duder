package com.duder.api.chat.application;

import com.duder.api.chat.domain.Chat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ChatResponse {

    private String id;
    private Long senderId;
    private String senderNickname;
    private String content;
    private LocalDateTime createdAt;

    public static ChatResponse of(Chat chat){
        return new ChatResponse(chat.getId(), chat.getSenderId(), chat.getSenderNickname(),
                chat.getContent(), chat.getCreatedAt());
    }

}
