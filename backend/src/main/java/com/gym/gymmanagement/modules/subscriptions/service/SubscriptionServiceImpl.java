package com.gym.gymmanagement.modules.subscriptions.service;

import com.gym.gymmanagement.modules.subscriptions.dto.PlanRequestDTO;
import com.gym.gymmanagement.modules.subscriptions.dto.PlanResponseDTO;
import com.gym.gymmanagement.modules.subscriptions.exception.ResourceNotFoundException;
import com.gym.gymmanagement.modules.subscriptions.model.SubscriptionPlan;
import com.gym.gymmanagement.modules.subscriptions.repository.SubscriptionPlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SubscriptionServiceImpl implements SubscriptionService {

    private final SubscriptionPlanRepository planRepository;

    @Override
    public PlanResponseDTO createPlan(PlanRequestDTO requestDTO) {
        SubscriptionPlan plan = SubscriptionPlan.builder()
                .name(requestDTO.getName())
                .description(requestDTO.getDescription())
                .price(requestDTO.getPrice())
                .planType(requestDTO.getPlanType())
                .durationInDays(requestDTO.getDurationInDays())
                .active(true)
                .build();

        SubscriptionPlan savedPlan = planRepository.save(plan);
        return mapToResponseDTO(savedPlan);
    }

    @Override
    public List<PlanResponseDTO> getAllActivePlans() {
        return planRepository.findByActiveTrue()
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public PlanResponseDTO getPlanById(Long id) {
        SubscriptionPlan plan = planRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Subscription plan not found with id: " + id));
        return mapToResponseDTO(plan);
    }

    @Override
    public void deletePlan(Long id) {
        SubscriptionPlan plan = planRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Subscription plan not found with id: " + id));
        plan.setActive(false); // Soft delete
        planRepository.save(plan);
    }

    private PlanResponseDTO mapToResponseDTO(SubscriptionPlan plan) {
        return PlanResponseDTO.builder()
                .id(plan.getId())
                .name(plan.getName())
                .description(plan.getDescription())
                .price(plan.getPrice())
                .planType(plan.getPlanType())
                .durationInDays(plan.getDurationInDays())
                .active(plan.getActive())
                .build();
    }
}
