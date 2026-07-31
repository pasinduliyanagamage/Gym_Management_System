package com.gym.gymmanagement.service;

import com.gym.gymmanagement.dto.SubscriptionDTO;
import com.gym.gymmanagement.exception.ResourceNotFoundException;
import com.gym.gymmanagement.model.Subscription;
import com.gym.gymmanagement.repository.SubscriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;

    public List<SubscriptionDTO> getAllSubscriptions() {
        return subscriptionRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public SubscriptionDTO getSubscriptionById(Long id) {
        Subscription subscription = subscriptionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Subscription plan not found with id: " + id));
        return mapToDTO(subscription);
    }

    public SubscriptionDTO createSubscription(SubscriptionDTO dto) {
        Subscription subscription = Subscription.builder()
                .planName(dto.getPlanName())
                .price(dto.getPrice())
                .durationMonths(dto.getDurationMonths())
                .description(dto.getDescription())
                .features(dto.getFeatures())
                .build();
        Subscription saved = subscriptionRepository.save(subscription);
        return mapToDTO(saved);
    }

    public SubscriptionDTO updateSubscription(Long id, SubscriptionDTO dto) {
        Subscription subscription = subscriptionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Subscription plan not found with id: " + id));
        subscription.setPlanName(dto.getPlanName());
        subscription.setPrice(dto.getPrice());
        subscription.setDurationMonths(dto.getDurationMonths());
        subscription.setDescription(dto.getDescription());
        subscription.setFeatures(dto.getFeatures());
        Subscription updated = subscriptionRepository.save(subscription);
        return mapToDTO(updated);
    }

    public void deleteSubscription(Long id) {
        if (!subscriptionRepository.existsById(id)) {
            throw new ResourceNotFoundException("Subscription plan not found with id: " + id);
        }
        subscriptionRepository.deleteById(id);
    }

    public SubscriptionDTO mapToDTO(Subscription subscription) {
        if (subscription == null) return null;
        return SubscriptionDTO.builder()
                .id(subscription.getId())
                .planName(subscription.getPlanName())
                .price(subscription.getPrice())
                .durationMonths(subscription.getDurationMonths())
                .description(subscription.getDescription())
                .features(subscription.getFeatures())
                .build();
    }
}
