package com.gym.gymmanagement.repository;

import com.gym.gymmanagement.model.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EquipmentRepository extends JpaRepository<Equipment, Long> {
    List<Equipment> findByConditionStatus(String conditionStatus);
    List<Equipment> findByCategory(String category);
}
