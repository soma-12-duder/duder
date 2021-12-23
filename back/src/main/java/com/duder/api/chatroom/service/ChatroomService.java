package com.duder.api.chatroom.service;

import com.duder.api.chatroom.domain.Chatroom;
import com.duder.api.chatroom.domain.ChatroomRepository;
import com.duder.api.member.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class ChatroomService {

    private final ChatroomRepository chatroomRepository;

    @Transactional
    public Long createChatroom(Member member, Long opponentId){
        Optional<Chatroom> room = chatroomRepository.findChatroomByUserToUser(member.getId(), opponentId);
        if(room.isPresent())
            return room.get().getId();

        return chatroomRepository.save(Chatroom.create(member, opponentId)).getId();
    }

    @Transactional
    public Long deleteById(Long chatroomId){
        chatroomRepository.deleteById(chatroomId);
        return chatroomId;
    }

    public List<ChatroomResponse> findAllChatroom(Member member){
        return chatroomRepository.findAllOfChatroom(member.getId());
    }

}
