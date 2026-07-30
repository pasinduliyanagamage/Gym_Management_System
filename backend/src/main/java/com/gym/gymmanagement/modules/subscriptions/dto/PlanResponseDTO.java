package com.gym.gymmanagement.modules.subscriptions.dto;

import com.gym.gymmanagement.modules.subscriptions.model.PlanType;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class PlanResponseDTO {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private PlanType planType;
    private Integer durationInDays;
    private Boolean active;
}
