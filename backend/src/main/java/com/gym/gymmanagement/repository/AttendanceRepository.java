package com.gym.gymmanagement.repository;

import com.gym.gymmanagement.model.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByMemberId(Long memberId);
    List<Attendance> findByDate(LocalDate date);
    List<Attendance> findByMemberIdAndDate(Long memberId, LocalDate date);
}