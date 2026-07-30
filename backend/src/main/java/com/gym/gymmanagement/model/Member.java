package com.gym.gymmanagement.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "members")
public class Member {

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
    private String gender;
    private LocalDate joinDate;
    private String status = "ACTIVE";

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "subscription_id")
    private Subscription subscription;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "trainer_id")
    private Trainer trainer;

    public Member() {}

    public Member(Long id, String firstName, String lastName, String email, String phone, String gender, LocalDate joinDate, String status, Subscription subscription, Trainer trainer) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.gender = gender;
        this.joinDate = joinDate;
        this.status = status != null ? status : "ACTIVE";
        this.subscription = subscription;
        this.trainer = trainer;
    }

    public static MemberBuilder builder() {
        return new MemberBuilder();
    }

    public static class MemberBuilder {
        private Long id;
        private String firstName;
        private String lastName;
        private String email;
        private String phone;
        private String gender;
        private LocalDate joinDate;
        private String status = "ACTIVE";
        private Subscription subscription;
        private Trainer trainer;

        public MemberBuilder id(Long id) { this.id = id; return this; }
        public MemberBuilder firstName(String firstName) { this.firstName = firstName; return this; }
        public MemberBuilder lastName(String lastName) { this.lastName = lastName; return this; }
        public MemberBuilder email(String email) { this.email = email; return this; }
        public MemberBuilder phone(String phone) { this.phone = phone; return this; }
        public MemberBuilder gender(String gender) { this.gender = gender; return this; }
        public MemberBuilder joinDate(LocalDate joinDate) { this.joinDate = joinDate; return this; }
        public MemberBuilder status(String status) { this.status = status; return this; }
        public MemberBuilder subscription(Subscription subscription) { this.subscription = subscription; return this; }
        public MemberBuilder trainer(Trainer trainer) { this.trainer = trainer; return this; }

        public Member build() {
            return new Member(id, firstName, lastName, email, phone, gender, joinDate, status, subscription, trainer);
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

    public Subscription getSubscription() { return subscription; }
    public void setSubscription(Subscription subscription) { this.subscription = subscription; }

    public Trainer getTrainer() { return trainer; }
    public void setTrainer(Trainer trainer) { this.trainer = trainer; }
}
