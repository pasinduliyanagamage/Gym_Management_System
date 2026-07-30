package com.gym.gymmanagement.service;

import com.gym.gymmanagement.dto.GymClassDTO;
import com.gym.gymmanagement.exception.ResourceNotFoundException;
import com.gym.gymmanagement.model.GymClass;
import com.gym.gymmanagement.model.Trainer;
import com.gym.gymmanagement.repository.GymClassRepository;
import com.gym.gymmanagement.repository.TrainerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GymClassService {

    private final GymClassRepository gymClassRepository;
    private final TrainerRepository trainerRepository;

    public List<GymClassDTO> getAllClasses() {
        return gymClassRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public GymClassDTO getClassById(Long id) {
        GymClass gymClass = gymClassRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Class not found with id: " + id));
        return mapToDTO(gymClass);
    }

    public GymClassDTO createClass(GymClassDTO dto) {
        Trainer trainer = null;
        if (dto.getTrainerId() != null) {
            trainer = trainerRepository.findById(dto.getTrainerId())
                    .orElseThrow(() -> new ResourceNotFoundException("Trainer not found with id: " + dto.getTrainerId()));
        }

        GymClass gymClass = GymClass.builder()
                .className(dto.getClassName())
                .description(dto.getDescription())
                .scheduleTime(dto.getScheduleTime())
                .durationMinutes(dto.getDurationMinutes())
                .capacity(dto.getCapacity())
                .room(dto.getRoom())
                .trainer(trainer)
                .build();

        GymClass saved = gymClassRepository.save(gymClass);
        return mapToDTO(saved);
    }

    public GymClassDTO updateClass(Long id, GymClassDTO dto) {
        GymClass gymClass = gymClassRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Class not found with id: " + id));

        if (dto.getTrainerId() != null) {
            Trainer trainer = trainerRepository.findById(dto.getTrainerId())
                    .orElseThrow(() -> new ResourceNotFoundException("Trainer not found with id: " + dto.getTrainerId()));
            gymClass.setTrainer(trainer);
        } else {
            gymClass.setTrainer(null);
        }

        gymClass.setClassName(dto.getClassName());
        gymClass.setDescription(dto.getDescription());
        gymClass.setScheduleTime(dto.getScheduleTime());
        gymClass.setDurationMinutes(dto.getDurationMinutes());
        gymClass.setCapacity(dto.getCapacity());
        gymClass.setRoom(dto.getRoom());

        GymClass updated = gymClassRepository.save(gymClass);
        return mapToDTO(updated);
    }

    public void deleteClass(Long id) {
        if (!gymClassRepository.existsById(id)) {
            throw new ResourceNotFoundException("Class not found with id: " + id);
        }
        gymClassRepository.deleteById(id);
    }

    public GymClassDTO mapToDTO(GymClass gymClass) {
        if (gymClass == null) return null;
        return GymClassDTO.builder()
                .id(gymClass.getId())
                .className(gymClass.getClassName())
                .description(gymClass.getDescription())
                .scheduleTime(gymClass.getScheduleTime())
                .durationMinutes(gymClass.getDurationMinutes())
                .capacity(gymClass.getCapacity())
                .room(gymClass.getRoom())
                .trainerId(gymClass.getTrainer() != null ? gymClass.getTrainer().getId() : null)
                .trainerName(gymClass.getTrainer() != null ? gymClass.getTrainer().getFirstName() + " " + gymClass.getTrainer().getLastName() : "Unassigned")
                .build();
    }
}
