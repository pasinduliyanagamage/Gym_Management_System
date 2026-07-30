package com.gym.gymmanagement.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "equipment")
public class Equipment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String category;
    private Integer quantity;
    private String conditionStatus;
    private LocalDate purchaseDate;
    private LocalDate lastMaintenanceDate;

    public Equipment() {}

    public Equipment(Long id, String name, String category, Integer quantity, String conditionStatus, LocalDate purchaseDate, LocalDate lastMaintenanceDate) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.quantity = quantity;
        this.conditionStatus = conditionStatus != null ? conditionStatus : "GOOD";
        this.purchaseDate = purchaseDate;
        this.lastMaintenanceDate = lastMaintenanceDate;
    }

    public static EquipmentBuilder builder() {
        return new EquipmentBuilder();
    }

    public static class EquipmentBuilder {
        private Long id;
        private String name;
        private String category;
        private Integer quantity;
        private String conditionStatus = "GOOD";
        private LocalDate purchaseDate;
        private LocalDate lastMaintenanceDate;

        public EquipmentBuilder id(Long id) { this.id = id; return this; }
        public EquipmentBuilder name(String name) { this.name = name; return this; }
        public EquipmentBuilder category(String category) { this.category = category; return this; }
        public EquipmentBuilder quantity(Integer quantity) { this.quantity = quantity; return this; }
        public EquipmentBuilder conditionStatus(String conditionStatus) { this.conditionStatus = conditionStatus; return this; }
        public EquipmentBuilder purchaseDate(LocalDate purchaseDate) { this.purchaseDate = purchaseDate; return this; }
        public EquipmentBuilder lastMaintenanceDate(LocalDate lastMaintenanceDate) { this.lastMaintenanceDate = lastMaintenanceDate; return this; }

        public Equipment build() {
            return new Equipment(id, name, category, quantity, conditionStatus, purchaseDate, lastMaintenanceDate);
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
