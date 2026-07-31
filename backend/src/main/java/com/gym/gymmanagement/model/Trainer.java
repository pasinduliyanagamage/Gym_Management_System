package com.gym.gymmanagement.model;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "trainers")
public class Trainer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String email;

    private String phone;
    private String specialization;
    private Integer experienceYears;
    private BigDecimal salary;
    private String status = "ACTIVE";

    public Trainer() {}

    public Trainer(Long id, String firstName, String lastName, String email, String phone, String specialization, Integer experienceYears, BigDecimal salary, String status) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.specialization = specialization;
        this.experienceYears = experienceYears;
        this.salary = salary;
        this.status = status != null ? status : "ACTIVE";
    }

    public static TrainerBuilder builder() {
        return new TrainerBuilder();
    }

    public static class TrainerBuilder {
        private Long id;
        private String firstName;
        private String lastName;
        private String email;
        private String phone;
        private String specialization;
        private Integer experienceYears;
        private BigDecimal salary;
        private String status = "ACTIVE";

        public TrainerBuilder id(Long id) { this.id = id; return this; }
        public TrainerBuilder firstName(String firstName) { this.firstName = firstName; return this; }
        public TrainerBuilder lastName(String lastName) { this.lastName = lastName; return this; }
        public TrainerBuilder email(String email) { this.email = email; return this; }
        public TrainerBuilder phone(String phone) { this.phone = phone; return this; }
        public TrainerBuilder specialization(String specialization) { this.specialization = specialization; return this; }
        public TrainerBuilder experienceYears(Integer experienceYears) { this.experienceYears = experienceYears; return this; }
        public TrainerBuilder salary(BigDecimal salary) { this.salary = salary; return this; }
        public TrainerBuilder status(String status) { this.status = status; return this; }

        public Trainer build() {
            return new Trainer(id, firstName, lastName, email, phone, specialization, experienceYears, salary, status);
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