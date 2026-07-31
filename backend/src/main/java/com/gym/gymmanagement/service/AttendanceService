package com.gym.gymmanagement.service;

import com.gym.gymmanagement.dto.AttendanceDTO;
import com.gym.gymmanagement.exception.ResourceNotFoundException;
import com.gym.gymmanagement.model.Attendance;
import com.gym.gymmanagement.model.Member;
import com.gym.gymmanagement.repository.AttendanceRepository;
import com.gym.gymmanagement.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final MemberRepository memberRepository;

    public List<AttendanceDTO> getAllAttendance() {
        return attendanceRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public AttendanceDTO getAttendanceById(Long id) {
        Attendance attendance = attendanceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Attendance record not found with id: " + id));
        return mapToDTO(attendance);
    }

    public AttendanceDTO checkInMember(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new ResourceNotFoundException("Member not found with id: " + memberId));

        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();

        Attendance attendance = Attendance.builder()
                .member(member)
                .date(today)
                .checkInTime(now)
                .status("PRESENT")
                .build();

        Attendance saved = attendanceRepository.save(attendance);
        return mapToDTO(saved);
    }

    public AttendanceDTO checkOutMember(Long attendanceId) {
        Attendance attendance = attendanceRepository.findById(attendanceId)
                .orElseThrow(() -> new ResourceNotFoundException("Attendance record not found with id: " + attendanceId));

        attendance.setCheckOutTime(LocalTime.now());
        Attendance updated = attendanceRepository.save(attendance);
        return mapToDTO(updated);
    }

    public AttendanceDTO createAttendance(AttendanceDTO dto) {
        Member member = memberRepository.findById(dto.getMemberId())
                .orElseThrow(() -> new ResourceNotFoundException("Member not found with id: " + dto.getMemberId()));

        Attendance attendance = Attendance.builder()
                .member(member)
                .date(dto.getDate() != null ? dto.getDate() : LocalDate.now())
                .checkInTime(dto.getCheckInTime() != null ? dto.getCheckInTime() : LocalTime.now())
                .checkOutTime(dto.getCheckOutTime())
                .status(dto.getStatus() != null ? dto.getStatus() : "PRESENT")
                .build();

        Attendance saved = attendanceRepository.save(attendance);
        return mapToDTO(saved);
    }

    public void deleteAttendance(Long id) {
        if (!attendanceRepository.existsById(id)) {
            throw new ResourceNotFoundException("Attendance record not found with id: " + id);
        }
        attendanceRepository.deleteById(id);
    }

    public AttendanceDTO mapToDTO(Attendance attendance) {
        if (attendance == null) return null;
        return AttendanceDTO.builder()
                .id(attendance.getId())
                .memberId(attendance.getMember() != null ? attendance.getMember().getId() : null)
                .memberName(attendance.getMember() != null ? attendance.getMember().getFirstName() + " " + attendance.getMember().getLastName() : "Unknown Member")
                .date(attendance.getDate())
                .checkInTime(attendance.getCheckInTime())
                .checkOutTime(attendance.getCheckOutTime())
                .status(attendance.getStatus())
                .build();
    }
}