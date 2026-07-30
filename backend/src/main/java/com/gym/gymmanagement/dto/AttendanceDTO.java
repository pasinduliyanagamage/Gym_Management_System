package com.gym.gymmanagement.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public class AttendanceDTO {
    private Long id;
    private Long memberId;
    private String memberName;
    private LocalDate date;
    private LocalTime checkInTime;
    private LocalTime checkOutTime;
    private String status;

    public AttendanceDTO() {}

    public AttendanceDTO(Long id, Long memberId, String memberName, LocalDate date, LocalTime checkInTime, LocalTime checkOutTime, String status) {
        this.id = id;
        this.memberId = memberId;
        this.memberName = memberName;
        this.date = date;
        this.checkInTime = checkInTime;
        this.checkOutTime = checkOutTime;
        this.status = status;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private Long memberId;
        private String memberName;
        private LocalDate date;
        private LocalTime checkInTime;
        private LocalTime checkOutTime;
        private String status;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder memberId(Long memberId) { this.memberId = memberId; return this; }
        public Builder memberName(String memberName) { this.memberName = memberName; return this; }
        public Builder date(LocalDate date) { this.date = date; return this; }
        public Builder checkInTime(LocalTime checkInTime) { this.checkInTime = checkInTime; return this; }
        public Builder checkOutTime(LocalTime checkOutTime) { this.checkOutTime = checkOutTime; return this; }
        public Builder status(String status) { this.status = status; return this; }

        public AttendanceDTO build() {
            return new AttendanceDTO(id, memberId, memberName, date, checkInTime, checkOutTime, status);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getMemberId() { return memberId; }
    public void setMemberId(Long memberId) { this.memberId = memberId; }
    public String getMemberName() { return memberName; }
    public void setMemberName(String memberName) { this.memberName = memberName; }
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
    public LocalTime getCheckInTime() { return checkInTime; }
    public void setCheckInTime(LocalTime checkInTime) { this.checkInTime = checkInTime; }
    public LocalTime getCheckOutTime() { return checkOutTime; }
    public void setCheckOutTime(LocalTime checkOutTime) { this.checkOutTime = checkOutTime; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
