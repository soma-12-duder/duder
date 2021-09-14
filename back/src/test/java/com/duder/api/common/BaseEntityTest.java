package com.duder.api.common;

import com.duder.api.member.domain.Member;
import com.duder.api.member.domain.MemberRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
class BaseEntityTest {

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    EntityManager em;

    @DisplayName("생성일, 수정일 기입 확인")
    @Test
    public void checkBaseEntity() {
        Member member = new Member("jino", "beenzino",
                "profile test", "rlawlsdh@naver.com");

        memberRepository.save(member);
        em.flush();
        em.clear();
        Member findMember = memberRepository.findById(member.getId()).get();

        assertThat(findMember.getCreatedAt()).isNotNull();
        assertThat(findMember.getUpdatedAt()).isNotNull();
    }

}