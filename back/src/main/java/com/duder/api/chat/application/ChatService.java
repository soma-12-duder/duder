package com.duder.api.chat.application;

import com.duder.api.chat.domain.Chat;
import com.duder.api.chat.domain.ChatRepository;
import com.duder.api.chatroom.service.ChatroomResponse;
import com.duder.api.member.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ChatService {

    private final ChatRepository chatRepository;

    public ChatResponse save(ChatRequest request){
        Chat chat = chatRepository.save(ChatRequest.toChat(request));
        return ChatResponse.of(chat);
    }

    public List<ChatResponse> findAllChat(Long roomId) {
        return chatRepository.findAllByRoomId(roomId, Sort.by(Sort.Direction.ASC, "created_at"))
                .stream()
                .map(o -> ChatResponse.of(o))
                .collect(Collectors.toList());
    }

    public ChatResponse findLastMessage(Long chatroomId){
        return ChatResponse.of(chatRepository
                .findTopByRoomIdOrderByCreatedAtDesc(chatroomId)
                .orElseGet(() -> new Chat("1", 1L, "", 1L, "", LocalDateTime.now())));
    }

}
