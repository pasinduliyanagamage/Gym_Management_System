package com.gym.gymmanagement.modules.subscriptions.service;

import com.gym.gymmanagement.modules.subscriptions.dto.PlanRequestDTO;
import com.gym.gymmanagement.modules.subscriptions.dto.PlanResponseDTO;

import java.util.List;

public interface SubscriptionService {
    PlanResponseDTO createPlan(PlanRequestDTO requestDTO);
    List<PlanResponseDTO> getAllActivePlans();
    PlanResponseDTO getPlanById(Long id);
    void deletePlan(Long id);
}