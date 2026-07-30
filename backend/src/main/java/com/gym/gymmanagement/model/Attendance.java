package com.gym.gymmanagement.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "attendance")
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    private LocalDate date;
    private LocalTime checkInTime;
    private LocalTime checkOutTime;
    private String status = "PRESENT";

    public Attendance() {}

    public Attendance(Long id, Member member, LocalDate date, LocalTime checkInTime, LocalTime checkOutTime, String status) {
        this.id = id;
        this.member = member;
        this.date = date;
        this.checkInTime = checkInTime;
        this.checkOutTime = checkOutTime;
        this.status = status != null ? status : "PRESENT";
    }

    public static AttendanceBuilder builder() {
        return new AttendanceBuilder();
    }

    public static class AttendanceBuilder {
        private Long id;
        private Member member;
        private LocalDate date;
        private LocalTime checkInTime;
        private LocalTime checkOutTime;
        private String status = "PRESENT";

        public AttendanceBuilder id(Long id) { this.id = id; return this; }
        public AttendanceBuilder member(Member member) { this.member = member; return this; }
        public AttendanceBuilder date(LocalDate date) { this.date = date; return this; }
        public AttendanceBuilder checkInTime(LocalTime checkInTime) { this.checkInTime = checkInTime; return this; }
        public AttendanceBuilder checkOutTime(LocalTime checkOutTime) { this.checkOutTime = checkOutTime; return this; }
        public AttendanceBuilder status(String status) { this.status = status; return this; }

        public Attendance build() {
            return new Attendance(id, member, date, checkInTime, checkOutTime, status);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Member getMember() { return member; }
    public void setMember(Member member) { this.member = member; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public LocalTime getCheckInTime() { return checkInTime; }
    public void setCheckInTime(LocalTime checkInTime) { this.checkInTime = checkInTime; }

    public LocalTime getCheckOutTime() { return checkOutTime; }
    public void setCheckOutTime(LocalTime checkOutTime) { this.checkOutTime = checkOutTime; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
