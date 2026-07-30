package com.gym.gymmanagement.modules.trainer.service;

import com.gym.gymmangement.modules.trainer.model.Trainer;
import java.util.List;

public interface TrainerService {
    List<Trainer> getAllTrainers();
    Trainer getTrainerById(Long id);
    Trainer saveTrainer(Trainer trainer);
    Trainer updateTrainer(Long id, Trainer trainer);
    void deleteTrainer(Long id);
}