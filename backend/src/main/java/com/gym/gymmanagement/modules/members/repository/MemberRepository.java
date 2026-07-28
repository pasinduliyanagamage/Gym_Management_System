package com.gym.gymmanagement.modules.members.repository;

import com.gym.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {

}