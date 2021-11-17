package com.duder.api.chat.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "chat")
public class Chat {

    @Id
    private String id;
    private Long senderId;
    private String senderNickname;
    private Long roomId;
    private String content;

    @CreatedDate
    private LocalDateTime createdAt;
}
