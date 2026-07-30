package com.gym.gymmanagement.modules.subscriptions.dto;

import com.gym.gymmanagement.modules.subscriptions.model.PlanType;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class PlanRequestDTO {
    private String name;
    private String description;
    private BigDecimal price;
    private PlanType planType;
    private Integer durationInDays;
}