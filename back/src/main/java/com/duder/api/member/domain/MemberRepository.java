package com.duder.api.member.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByProviderId(String providerId);
    Optional<Member> findMemberById(Long memberId);
}
