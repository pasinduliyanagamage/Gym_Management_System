package com.gym.gymmanagement.dto;

import java.math.BigDecimal;

public class TrainerDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String specialization;
    private Integer experienceYears;
    private BigDecimal salary;
    private String status;

    public TrainerDTO() {}

    public TrainerDTO(Long id, String firstName, String lastName, String email, String phone, String specialization, Integer experienceYears, BigDecimal salary, String status) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.specialization = specialization;
        this.experienceYears = experienceYears;
        this.salary = salary;
        this.status = status;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private String firstName;
        private String lastName;
        private String email;
        private String phone;
        private String specialization;
        private Integer experienceYears;
        private BigDecimal salary;
        private String status;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder firstName(String firstName) { this.firstName = firstName; return this; }
        public Builder lastName(String lastName) { this.lastName = lastName; return this; }
        public Builder email(String email) { this.email = email; return this; }
        public Builder phone(String phone) { this.phone = phone; return this; }
        public Builder specialization(String specialization) { this.specialization = specialization; return this; }
        public Builder experienceYears(Integer experienceYears) { this.experienceYears = experienceYears; return this; }
        public Builder salary(BigDecimal salary) { this.salary = salary; return this; }
        public Builder status(String status) { this.status = status; return this; }

        public TrainerDTO build() {
            return new TrainerDTO(id, firstName, lastName, email, phone, specialization, experienceYears, salary, status);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getSpecialization() { return specialization; }
    public void setSpecialization(String specialization) { this.specialization = specialization; }
    public Integer getExperienceYears() { return experienceYears; }
    public void setExperienceYears(Integer experienceYears) { this.experienceYears = experienceYears; }
    public BigDecimal getSalary() { return salary; }
    public void setSalary(BigDecimal salary) { this.salary = salary; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
