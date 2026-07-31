package com.gym.gymmanagement.dto;

import java.time.LocalDateTime;

public class GymClassDTO {

    private Long id;
    private String className;
    private String description;
    private LocalDateTime scheduleTime;
    private Integer durationMinutes;
    private Integer capacity;
    private String room;
    private Long trainerId;
    private String trainerName;

    public GymClassDTO() {
    }

    public GymClassDTO(Long id, String className, String description,
                       LocalDateTime scheduleTime, Integer durationMinutes,
                       Integer capacity, String room,
                       Long trainerId, String trainerName) {
        this.id = id;
        this.className = className;
        this.description = description;
        this.scheduleTime = scheduleTime;
        this.durationMinutes = durationMinutes;
        this.capacity = capacity;
        this.room = room;
        this.trainerId = trainerId;
        this.trainerName = trainerName;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private String className;
        private String description;
        private LocalDateTime scheduleTime;
        private Integer durationMinutes;
        private Integer capacity;
        private String room;
        private Long trainerId;
        private String trainerName;

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public Builder className(String className) {
            this.className = className;
            return this;
        }

        public Builder description(String description) {
            this.description = description;
            return this;
        }

        public Builder scheduleTime(LocalDateTime scheduleTime) {
            this.scheduleTime = scheduleTime;
            return this;
        }

        public Builder durationMinutes(Integer durationMinutes) {
            this.durationMinutes = durationMinutes;
            return this;
        }

        public Builder capacity(Integer capacity) {
            this.capacity = capacity;
            return this;
        }

        public Builder room(String room) {
            this.room = room;
            return this;
        }

        public Builder trainerId(Long trainerId) {
            this.trainerId = trainerId;
            return this;
        }

        public Builder trainerName(String trainerName) {
            this.trainerName = trainerName;
            return this;
        }

        public GymClassDTO build() {
            return new GymClassDTO(id, className, description,
                    scheduleTime, durationMinutes,
                    capacity, room, trainerId, trainerName);
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getScheduleTime() {
        return scheduleTime;
    }

    public void setScheduleTime(LocalDateTime scheduleTime) {
        this.scheduleTime = scheduleTime;
    }

    public Integer getDurationMinutes() {
        return durationMinutes;
    }

    public void setDurationMinutes(Integer durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public String getRoom() {
        return room;
    }

    public void setRoom(String room) {
        this.room = room;
    }

    public Long getTrainerId() {
        return trainerId;
    }

    public void setTrainerId(Long trainerId) {
        this.trainerId = trainerId;
    }

    public String getTrainerName() {
        return trainerName;
    }

    public void setTrainerName(String trainerName) {
        this.trainerName = trainerName;
    }
}