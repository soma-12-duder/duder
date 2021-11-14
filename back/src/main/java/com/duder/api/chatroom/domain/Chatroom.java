package com.duder.api.chatroom.domain;

import com.duder.api.common.BaseEntity;
import com.duder.api.member.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Entity
public class Chatroom extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chatroom_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    public Member member;

    public Long opponentId;

    public static Chatroom create(Member member, Long opponentId){
        return new Chatroom(null, member, opponentId);
    }

}
