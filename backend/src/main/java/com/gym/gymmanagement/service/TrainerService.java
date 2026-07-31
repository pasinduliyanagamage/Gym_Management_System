
package com.gym.gymmanagement.service;

import com.gym.gymmanagement.dto.TrainerDTO;
import com.gym.gymmanagement.exception.ResourceNotFoundException;
import com.gym.gymmanagement.model.Trainer;
import com.gym.gymmanagement.repository.TrainerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TrainerService {

    private final TrainerRepository trainerRepository;

    public List<TrainerDTO> getAllTrainers() {
        return trainerRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public TrainerDTO getTrainerById(Long id) {
        Trainer trainer = trainerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Trainer not found with id: " + id));
        return mapToDTO(trainer);
    }

    public TrainerDTO createTrainer(TrainerDTO dto) {
        Trainer trainer = Trainer.builder()
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .specialization(dto.getSpecialization())
                .experienceYears(dto.getExperienceYears())
                .salary(dto.getSalary())
                .status(dto.getStatus() != null ? dto.getStatus() : "ACTIVE")
                .build();
        Trainer saved = trainerRepository.save(trainer);
        return mapToDTO(saved);
    }

    public TrainerDTO updateTrainer(Long id, TrainerDTO dto) {
        Trainer trainer = trainerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Trainer not found with id: " + id));
        trainer.setFirstName(dto.getFirstName());
        trainer.setLastName(dto.getLastName());
        trainer.setEmail(dto.getEmail());
        trainer.setPhone(dto.getPhone());
        trainer.setSpecialization(dto.getSpecialization());
        trainer.setExperienceYears(dto.getExperienceYears());
        trainer.setSalary(dto.getSalary());
        if (dto.getStatus() != null) {
            trainer.setStatus(dto.getStatus());
        }
        Trainer updated = trainerRepository.save(trainer);
        return mapToDTO(updated);
    }

    public void deleteTrainer(Long id) {
        if (!trainerRepository.existsById(id)) {
            throw new ResourceNotFoundException("Trainer not found with id: " + id);
        }
        trainerRepository.deleteById(id);
    }

    public TrainerDTO mapToDTO(Trainer trainer) {
        if (trainer == null) return null;
        return TrainerDTO.builder()
                .id(trainer.getId())
                .firstName(trainer.getFirstName())
                .lastName(trainer.getLastName())
                .email(trainer.getEmail())
                .phone(trainer.getPhone())
                .specialization(trainer.getSpecialization())
                .experienceYears(trainer.getExperienceYears())
                .salary(trainer.getSalary())
                .status(trainer.getStatus())
                .build();
    }
}