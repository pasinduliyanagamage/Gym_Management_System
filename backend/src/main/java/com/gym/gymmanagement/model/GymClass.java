package com.gym.gymmanagement.model;

public class GymClass {package com.gym.gymmanagement.model;

    import jakarta.persistence.*;
    
    import java.time.LocalDateTime;
    
    @Entity
    @Table(name = "classes")
    public class GymClass {
    
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
    
        @Column(nullable = false)
        private String className;
    
        @Column(length = 1000)
        private String description;
    
        private LocalDateTime scheduleTime;
        private Integer durationMinutes;
        private Integer capacity;
        private String room;
    
        @ManyToOne(fetch = FetchType.EAGER)
        @JoinColumn(name = "trainer_id")
        private Trainer trainer;
    
        public GymClass() {}
    
        public GymClass(Long id, String className, String description, LocalDateTime scheduleTime, Integer durationMinutes, Integer capacity, String room, Trainer trainer) {
            this.id = id;
            this.className = className;
            this.description = description;
            this.scheduleTime = scheduleTime;
            this.durationMinutes = durationMinutes;
            this.capacity = capacity;
            this.room = room;
            this.trainer = trainer;
        }
    
        public static GymClassBuilder builder() {
            return new GymClassBuilder();
        }
    
        public static class GymClassBuilder {
            private Long id;
            private String className;
            private String description;
            private LocalDateTime scheduleTime;
            private Integer durationMinutes;
            private Integer capacity;
            private String room;
            private Trainer trainer;
    
            public GymClassBuilder id(Long id) { this.id = id; return this; }
            public GymClassBuilder className(String className) { this.className = className; return this; }
            public GymClassBuilder description(String description) { this.description = description; return this; }
            public GymClassBuilder scheduleTime(LocalDateTime scheduleTime) { this.scheduleTime = scheduleTime; return this; }
            public GymClassBuilder durationMinutes(Integer durationMinutes) { this.durationMinutes = durationMinutes; return this; }
            public GymClassBuilder capacity(Integer capacity) { this.capacity = capacity; return this; }
            public GymClassBuilder room(String room) { this.room = room; return this; }
            public GymClassBuilder trainer(Trainer trainer) { this.trainer = trainer; return this; }
    
            public GymClass build() {
                return new GymClass(id, className, description, scheduleTime, durationMinutes, capacity, room, trainer);
            }
        }
    
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
    
        public String getClassName() { return className; }
        public void setClassName(String className) { this.className = className; }
    
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
    
        public LocalDateTime getScheduleTime() { return scheduleTime; }
        public void setScheduleTime(LocalDateTime scheduleTime) { this.scheduleTime = scheduleTime; }
    
        public Integer getDurationMinutes() { return durationMinutes; }
        public void setDurationMinutes(Integer durationMinutes) { this.durationMinutes = durationMinutes; }
    
        public Integer getCapacity() { return capacity; }
        public void setCapacity(Integer capacity) { this.capacity = capacity; }
    
        public String getRoom() { return room; }
        public void setRoom(String room) { this.room = room; }
    
        public Trainer getTrainer() { return trainer; }
        public void setTrainer(Trainer trainer) { this.trainer = trainer; }
    }
    
}
