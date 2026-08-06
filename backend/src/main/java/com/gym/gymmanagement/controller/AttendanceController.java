package com.gym.gymmanagement.controller;

import com.gym.gymmanagement.dto.AttendanceDTO;
import com.gym.gymmanagement.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceService attendanceService;

    @GetMapping
    public ResponseEntity<List<AttendanceDTO>> getAllAttendance() {
        return ResponseEntity.ok(attendanceService.getAllAttendance());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AttendanceDTO> getAttendanceById(@PathVariable Long id) {
        return ResponseEntity.ok(attendanceService.getAttendanceById(id));
    }

    @PostMapping("/check-in/{memberId}")
    public ResponseEntity<AttendanceDTO> checkInMember(@PathVariable Long memberId) {
        AttendanceDTO dto = attendanceService.checkInMember(memberId);
        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }

    @PutMapping("/check-out/{attendanceId}")
    public ResponseEntity<AttendanceDTO> checkOutMember(@PathVariable Long attendanceId) {
        return ResponseEntity.ok(attendanceService.checkOutMember(attendanceId));
    }

    @PostMapping
    public ResponseEntity<AttendanceDTO> createAttendance(@RequestBody AttendanceDTO dto) {
        AttendanceDTO created = attendanceService.createAttendance(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAttendance(@PathVariable Long id) {
        attendanceService.deleteAttendance(id);
        return ResponseEntity.noContent().build();
    }
}