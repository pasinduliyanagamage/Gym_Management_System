package com.gym.gymmanagement.repository;

import com.gym.gymmanagement.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    List<Member> findByStatus(String status);
    List<Member> findByTrainerId(Long trainerId);
    List<Member> findBySubscriptionId(Long subscriptionId);
}
