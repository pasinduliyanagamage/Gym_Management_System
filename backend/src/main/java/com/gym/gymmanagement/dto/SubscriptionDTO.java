package com.gym.gymmanagement.dto;

import java.math.BigDecimal;

public class SubscriptionDTO {
    private Long id;
    private String planName;
    private BigDecimal price;
    private Integer durationMonths;
    private String description;
    private String features;

    public SubscriptionDTO() {}

    public SubscriptionDTO(Long id, String planName, BigDecimal price, Integer durationMonths, String description, String features) {
        this.id = id;
        this.planName = planName;
        this.price = price;
        this.durationMonths = durationMonths;
        this.description = description;
        this.features = features;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private String planName;
        private BigDecimal price;
        private Integer durationMonths;
        private String description;
        private String features;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder planName(String planName) { this.planName = planName; return this; }
        public Builder price(BigDecimal price) { this.price = price; return this; }
        public Builder durationMonths(Integer durationMonths) { this.durationMonths = durationMonths; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder features(String features) { this.features = features; return this; }

        public SubscriptionDTO build() {
            return new SubscriptionDTO(id, planName, price, durationMonths, description, features);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getPlanName() { return planName; }
    public void setPlanName(String planName) { this.planName = planName; }
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    public Integer getDurationMonths() { return durationMonths; }
    public void setDurationMonths(Integer durationMonths) { this.durationMonths = durationMonths; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getFeatures() { return features; }
    public void setFeatures(String features) { this.features = features; }
}