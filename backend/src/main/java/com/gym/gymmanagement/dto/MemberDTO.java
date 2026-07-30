package com.gym.gymmanagement.dto;

import java.time.LocalDate;

public class MemberDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String gender;
    private LocalDate joinDate;
    private String status;
    private Long subscriptionId;
    private String subscriptionName;
    private Long trainerId;
    private String trainerName;

    public MemberDTO() {}

    public MemberDTO(Long id, String firstName, String lastName, String email, String phone, String gender, LocalDate joinDate, String status, Long subscriptionId, String subscriptionName, Long trainerId, String trainerName) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.gender = gender;
        this.joinDate = joinDate;
        this.status = status;
        this.subscriptionId = subscriptionId;
        this.subscriptionName = subscriptionName;
        this.trainerId = trainerId;
        this.trainerName = trainerName;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private String firstName;
        private String lastName;
        private String email;
        private String phone;
        private String gender;
        private LocalDate joinDate;
        private String status;
        private Long subscriptionId;
        private String subscriptionName;
        private Long trainerId;
        private String trainerName;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder firstName(String firstName) { this.firstName = firstName; return this; }
        public Builder lastName(String lastName) { this.lastName = lastName; return this; }
        public Builder email(String email) { this.email = email; return this; }
        public Builder phone(String phone) { this.phone = phone; return this; }
        public Builder gender(String gender) { this.gender = gender; return this; }
        public Builder joinDate(LocalDate joinDate) { this.joinDate = joinDate; return this; }
        public Builder status(String status) { this.status = status; return this; }
        public Builder subscriptionId(Long subscriptionId) { this.subscriptionId = subscriptionId; return this; }
        public Builder subscriptionName(String subscriptionName) { this.subscriptionName = subscriptionName; return this; }
        public Builder trainerId(Long trainerId) { this.trainerId = trainerId; return this; }
        public Builder trainerName(String trainerName) { this.trainerName = trainerName; return this; }

        public MemberDTO build() {
            return new MemberDTO(id, firstName, lastName, email, phone, gender, joinDate, status, subscriptionId, subscriptionName, trainerId, trainerName);
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

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public LocalDate getJoinDate() { return joinDate; }
    public void setJoinDate(LocalDate joinDate) { this.joinDate = joinDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Long getSubscriptionId() { return subscriptionId; }
    public void setSubscriptionId(Long subscriptionId) { this.subscriptionId = subscriptionId; }

    public String getSubscriptionName() { return subscriptionName; }
    public void setSubscriptionName(String subscriptionName) { this.subscriptionName = subscriptionName; }

    public Long getTrainerId() { return trainerId; }
    public void setTrainerId(Long trainerId) { this.trainerId = trainerId; }

    public String getTrainerName() { return trainerName; }
    public void setTrainerName(String trainerName) { this.trainerName = trainerName; }
}
