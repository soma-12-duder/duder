package com.duder.api.chatroom.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ChatroomRepository extends JpaRepository<Chatroom, Long>, ChatroomRepositoryCustom {

    @Query("select C from Chatroom C where (C.member.id = :memberId and C.opponentId = :opponentId) " +
            "or (C.member.id = :opponentId and C.opponentId = :memberId)")
    Optional<Chatroom> findChatroomByUserToUser(Long memberId, Long opponentId);

    @Query("select C from Chatroom C inner join C.member M on C.member.id = M.id " +
            "where C.member.id = :memberId or C.opponentId = :memberId")
    List<Chatroom> findAllChatroom(Long memberId);

}
