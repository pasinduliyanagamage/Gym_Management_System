package com.gym.gymmanagement.dto;

import java.time.LocalDate;

public class EquipmentDTO {
    private Long id;
    private String name;
    private String category;
    private Integer quantity;
    private String conditionStatus;
    private LocalDate purchaseDate;
    private LocalDate lastMaintenanceDate;

    public EquipmentDTO() {}

    public EquipmentDTO(Long id, String name, String category, Integer quantity, String conditionStatus, LocalDate purchaseDate, LocalDate lastMaintenanceDate) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.quantity = quantity;
        this.conditionStatus = conditionStatus;
        this.purchaseDate = purchaseDate;
        this.lastMaintenanceDate = lastMaintenanceDate;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private String name;
        private String category;
        private Integer quantity;
        private String conditionStatus;
        private LocalDate purchaseDate;
        private LocalDate lastMaintenanceDate;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder name(String name) { this.name = name; return this; }
        public Builder category(String category) { this.category = category; return this; }
        public Builder quantity(Integer quantity) { this.quantity = quantity; return this; }
        public Builder conditionStatus(String conditionStatus) { this.conditionStatus = conditionStatus; return this; }
        public Builder purchaseDate(LocalDate purchaseDate) { this.purchaseDate = purchaseDate; return this; }
        public Builder lastMaintenanceDate(LocalDate lastMaintenanceDate) { this.lastMaintenanceDate = lastMaintenanceDate; return this; }

        public EquipmentDTO build() {
            return new EquipmentDTO(id, name, category, quantity, conditionStatus, purchaseDate, lastMaintenanceDate);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    public String getConditionStatus() { return conditionStatus; }
    public void setConditionStatus(String conditionStatus) { this.conditionStatus = conditionStatus; }
    public LocalDate getPurchaseDate() { return purchaseDate; }
    public void setPurchaseDate(LocalDate purchaseDate) { this.purchaseDate = purchaseDate; }
    public LocalDate getLastMaintenanceDate() { return lastMaintenanceDate; }
    public void setLastMaintenanceDate(LocalDate lastMaintenanceDate) { this.lastMaintenanceDate = lastMaintenanceDate; }
}
