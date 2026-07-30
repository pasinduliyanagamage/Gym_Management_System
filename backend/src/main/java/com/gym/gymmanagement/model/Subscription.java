package com.gym.gymmanagement.model;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "subscriptions")
public class Subscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String planName;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    private Integer durationMonths;

    @Column(length = 1000)
    private String description;

    @Column(length = 1000)
    private String features;

    public Subscription() {}

    public Subscription(Long id, String planName, BigDecimal price, Integer durationMonths, String description, String features) {
        this.id = id;
        this.planName = planName;
        this.price = price;
        this.durationMonths = durationMonths;
        this.description = description;
        this.features = features;
    }

    public static SubscriptionBuilder builder() {
        return new SubscriptionBuilder();
    }

    public static class SubscriptionBuilder {
        private Long id;
        private String planName;
        private BigDecimal price;
        private Integer durationMonths;
        private String description;
        private String features;

        public SubscriptionBuilder id(Long id) { this.id = id; return this; }
        public SubscriptionBuilder planName(String planName) { this.planName = planName; return this; }
        public SubscriptionBuilder price(BigDecimal price) { this.price = price; return this; }
        public SubscriptionBuilder durationMonths(Integer durationMonths) { this.durationMonths = durationMonths; return this; }
        public SubscriptionBuilder description(String description) { this.description = description; return this; }
        public SubscriptionBuilder features(String features) { this.features = features; return this; }

        public Subscription build() {
            return new Subscription(id, planName, price, durationMonths, description, features);
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
