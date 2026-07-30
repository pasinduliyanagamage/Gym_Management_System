package com.gym.gymmanagement.modules.subscriptions.repository;

import com.gym.gymmanagement.modules.subscriptions.model.UserSubscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserSubscriptionRepository extends JpaRepository<UserSubscription, Long> {
    List<UserSubscription> findByMemberId(Long memberId);
}
