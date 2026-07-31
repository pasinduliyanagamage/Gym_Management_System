package com.gym.gymmanagement.controller;

import com.gym.gymmanagement.dto.GymClassDTO;
import com.gym.gymmanagement.service.GymClassService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/classes")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class GymClassController {

    private final GymClassService gymClassService;

    @GetMapping
    public ResponseEntity<List<GymClassDTO>> getAllClasses() {
        return ResponseEntity.ok(gymClassService.getAllClasses());
    }

    @GetMapping("/{id}")
    public ResponseEntity<GymClassDTO> getClassById(@PathVariable Long id) {
        return ResponseEntity.ok(gymClassService.getClassById(id));
    }

    @PostMapping
    public ResponseEntity<GymClassDTO> createClass(@RequestBody GymClassDTO dto) {
        GymClassDTO created = gymClassService.createClass(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GymClassDTO> updateClass(@PathVariable Long id, @RequestBody GymClassDTO dto) {
        return ResponseEntity.ok(gymClassService.updateClass(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClass(@PathVariable Long id) {
        gymClassService.deleteClass(id);
        return ResponseEntity.noContent().build();
    }
}