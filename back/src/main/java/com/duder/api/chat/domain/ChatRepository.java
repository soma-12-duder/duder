package com.duder.api.chat.domain;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ChatRepository extends MongoRepository<Chat, String> {
    List<Chat> findAllByRoomId(Long roomId, Sort sort);

    Optional<Chat> findTopByRoomIdOrderByCreatedAtDesc(Long roomId);
}
