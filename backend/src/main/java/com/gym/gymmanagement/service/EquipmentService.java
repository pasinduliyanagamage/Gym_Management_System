package com.gym.gymmanagement.service;

import com.gym.gymmanagement.dto.EquipmentDTO;
import com.gym.gymmanagement.exception.ResourceNotFoundException;
import com.gym.gymmanagement.model.Equipment;
import com.gym.gymmanagement.repository.EquipmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EquipmentService {

    private final EquipmentRepository equipmentRepository;

    public List<EquipmentDTO> getAllEquipment() {
        return equipmentRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public EquipmentDTO getEquipmentById(Long id) {
        Equipment equipment = equipmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Equipment item not found with id: " + id));
        return mapToDTO(equipment);
    }

    public EquipmentDTO createEquipment(EquipmentDTO dto) {
        Equipment equipment = Equipment.builder()
                .name(dto.getName())
                .category(dto.getCategory())
                .quantity(dto.getQuantity())
                .conditionStatus(dto.getConditionStatus() != null ? dto.getConditionStatus() : "GOOD")
                .purchaseDate(dto.getPurchaseDate() != null ? dto.getPurchaseDate() : LocalDate.now())
                .lastMaintenanceDate(dto.getLastMaintenanceDate())
                .build();
        Equipment saved = equipmentRepository.save(equipment);
        return mapToDTO(saved);
    }

    public EquipmentDTO updateEquipment(Long id, EquipmentDTO dto) {
        Equipment equipment = equipmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Equipment item not found with id: " + id));

        equipment.setName(dto.getName());
        equipment.setCategory(dto.getCategory());
        equipment.setQuantity(dto.getQuantity());
        if (dto.getConditionStatus() != null) equipment.setConditionStatus(dto.getConditionStatus());
        if (dto.getPurchaseDate() != null) equipment.setPurchaseDate(dto.getPurchaseDate());
        if (dto.getLastMaintenanceDate() != null) equipment.setLastMaintenanceDate(dto.getLastMaintenanceDate());

        Equipment updated = equipmentRepository.save(equipment);
        return mapToDTO(updated);
    }

    public void deleteEquipment(Long id) {
        if (!equipmentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Equipment item not found with id: " + id);
        }
        equipmentRepository.deleteById(id);
    }

    public EquipmentDTO mapToDTO(Equipment equipment) {
        if (equipment == null) return null;
        return EquipmentDTO.builder()
                .id(equipment.getId())
                .name(equipment.getName())
                .category(equipment.getCategory())
                .quantity(equipment.getQuantity())
                .conditionStatus(equipment.getConditionStatus())
                .purchaseDate(equipment.getPurchaseDate())
                .lastMaintenanceDate(equipment.getLastMaintenanceDate())
                .build();
    }
}
