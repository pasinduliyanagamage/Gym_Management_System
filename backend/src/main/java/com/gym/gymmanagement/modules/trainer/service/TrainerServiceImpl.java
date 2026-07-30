package com.gym.gymmanagement.modules.trainer.service;



import com.gym.gymmangement.modules.trainer.model.Trainer;
import com.gym.gymmangement.modules.trainer.repository.TrainerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TrainerServiceImpl implements TrainerService {

    @Autowired
    private TrainerRepository trainerRepository;

    @Override
    public List<Trainer> getAllTrainers() {
        return trainerRepository.findAll();
    }

    @Override
    public Trainer getTrainerById(Long id) {
        return trainerRepository.findById(id).orElseThrow(() ->
                new RuntimeException("Trainer not found with id: " + id)
        );
    }

    @Override
    public Trainer saveTrainer(Trainer trainer) {
        Optional<Trainer> existing = trainerRepository.findByEmail(trainer.getEmail());
        if (existing.isPresent()) {
            throw new RuntimeException("Trainer with email " + trainer.getEmail() + " already exists!");
        }
        return trainerRepository.save(trainer);
    }

    @Override
    public Trainer updateTrainer(Long id, Trainer trainerDetails) {
        Trainer existingTrainer = getTrainerById(id);

        existingTrainer.setName(trainerDetails.getName());
        existingTrainer.setEmail(trainerDetails.getEmail());
        existingTrainer.setPhone(trainerDetails.getPhone());
        existingTrainer.setSpecialization(trainerDetails.getSpecialization());
        existingTrainer.setExperienceYears(trainerDetails.getExperienceYears());

        return trainerRepository.save(existingTrainer);
    }

    @Override
    public void deleteTrainer(Long id) {
        Trainer trainer = getTrainerById(id);
        trainerRepository.delete(trainer);
    }
}
