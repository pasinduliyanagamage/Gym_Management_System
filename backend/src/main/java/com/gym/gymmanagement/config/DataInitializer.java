package com.gym.gymmanagement.config;

import com.gym.gymmanagement.model.*;
import com.gym.gymmanagement.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final SubscriptionRepository subscriptionRepository;
    private final TrainerRepository trainerRepository;
    private final MemberRepository memberRepository;
    private final GymClassRepository gymClassRepository;
    private final PaymentRepository paymentRepository;
    private final EquipmentRepository equipmentRepository;
    private final AttendanceRepository attendanceRepository;

    @Override
    public void run(String... args) throws Exception {
        if (subscriptionRepository.count() > 0) {
            return; // Data already initialized
        }

        // 1. Seed Subscriptions
        Subscription basic = subscriptionRepository.save(Subscription.builder()
                .planName("Basic Monthly")
                .price(new BigDecimal("49.99"))
                .durationMonths(1)
                .description("Access to gym floor & locker rooms during regular hours.")
                .features("Gym Floor Access, Standard Lockers, Free WiFi")
                .build());

        Subscription premium = subscriptionRepository.save(Subscription.builder()
                .planName("Premium Quarterly")
                .price(new BigDecimal("129.99"))
                .durationMonths(3)
                .description("Full access to all facilities, group classes & 1 free trainer consultation.")
                .features("All Basic Features, Group Fitness Classes, Sauna Access, 1 Personal Session")
                .build());

        Subscription vip = subscriptionRepository.save(Subscription.builder()
                .planName("VIP Annual")
                .price(new BigDecimal("449.99"))
                .durationMonths(12)
                .description("All-inclusive VIP membership with dedicated personal trainer & unlimited classes.")
                .features("Unlimited Access, Dedicated Personal Trainer, Free Smoothies, Priority Booking, Sauna & Spa")
                .build());

        // 2. Seed Trainers
        Trainer trainer1 = trainerRepository.save(Trainer.builder()
                .firstName("Alex")
                .lastName("Rivers")
                .email("alex.rivers@fitgym.com")
                .phone("+1 555-0192")
                .specialization("CrossFit & HIIT")
                .experienceYears(6)
                .salary(new BigDecimal("55000"))
                .status("ACTIVE")
                .build());

        Trainer trainer2 = trainerRepository.save(Trainer.builder()
                .firstName("Elena")
                .lastName("Rostova")
                .email("elena.r@fitgym.com")
                .phone("+1 555-0144")
                .specialization("Yoga & Pilates")
                .experienceYears(8)
                .salary(new BigDecimal("60000"))
                .status("ACTIVE")
                .build());

        Trainer trainer3 = trainerRepository.save(Trainer.builder()
                .firstName("Marcus")
                .lastName("Vance")
                .email("marcus.vance@fitgym.com")
                .phone("+1 555-0188")
                .specialization("Bodybuilding & Strength")
                .experienceYears(10)
                .salary(new BigDecimal("72000"))
                .status("ACTIVE")
                .build());

        // 3. Seed Members
        Member member1 = memberRepository.save(Member.builder()
                .firstName("John")
                .lastName("Doe")
                .email("john.doe@example.com")
                .phone("+1 555-1001")
                .gender("Male")
                .joinDate(LocalDate.now().minusMonths(2))
                .status("ACTIVE")
                .subscription(premium)
                .trainer(trainer1)
                .build());

        Member member2 = memberRepository.save(Member.builder()
                .firstName("Sophia")
                .lastName("Chen")
                .email("sophia.chen@example.com")
                .phone("+1 555-1002")
                .gender("Female")
                .joinDate(LocalDate.now().minusMonths(5))
                .status("ACTIVE")
                .subscription(vip)
                .trainer(trainer2)
                .build());

        Member member3 = memberRepository.save(Member.builder()
                .firstName("David")
                .lastName("Miller")
                .email("david.m@example.com")
                .phone("+1 555-1003")
                .gender("Male")
                .joinDate(LocalDate.now().minusMonths(1))
                .status("ACTIVE")
                .subscription(basic)
                .trainer(trainer3)
                .build());

        Member member4 = memberRepository.save(Member.builder()
                .firstName("Emma")
                .lastName("Watson")
                .email("emma.w@example.com")
                .phone("+1 555-1004")
                .gender("Female")
                .joinDate(LocalDate.now().minusMonths(8))
                .status("EXPIRED")
                .subscription(basic)
                .trainer(null)
                .build());

        // 4. Seed Classes
        gymClassRepository.save(GymClass.builder()
                .className("HIIT Blast")
                .description("High-intensity interval training designed to burn maximum calories.")
                .scheduleTime(LocalDateTime.now().plusDays(1).withHour(8).withMinute(0))
                .durationMinutes(45)
                .capacity(20)
                .room("Studio A")
                .trainer(trainer1)
                .build());

        gymClassRepository.save(GymClass.builder()
                .className("Sunrise Power Yoga")
                .description("Focus on core strength, mobility, balance, and deep stretch.")
                .scheduleTime(LocalDateTime.now().plusDays(1).withHour(7).withMinute(0))
                .durationMinutes(60)
                .capacity(15)
                .room("Mind & Body Studio")
                .trainer(trainer2)
                .build());

        gymClassRepository.save(GymClass.builder()
                .className("Heavy Duty Strength")
                .description("Barbell powerlifting and hyper-trophy strength training.")
                .scheduleTime(LocalDateTime.now().plusDays(2).withHour(18).withMinute(0))
                .durationMinutes(60)
                .capacity(12)
                .room("Iron Zone")
                .trainer(trainer3)
                .build());

        // 5. Seed Payments
        paymentRepository.save(Payment.builder()
                .member(member1)
                .amount(new BigDecimal("129.99"))
                .paymentDate(LocalDateTime.now().minusDays(10))
                .paymentMethod("CARD")
                .paymentStatus("PAID")
                .invoiceNumber("INV-98214A")
                .build());

        paymentRepository.save(Payment.builder()
                .member(member2)
                .amount(new BigDecimal("449.99"))
                .paymentDate(LocalDateTime.now().minusDays(25))
                .paymentMethod("NETBANKING")
                .paymentStatus("PAID")
                .invoiceNumber("INV-98214B")
                .build());

        paymentRepository.save(Payment.builder()
                .member(member3)
                .amount(new BigDecimal("49.99"))
                .paymentDate(LocalDateTime.now().minusDays(2))
                .paymentMethod("UPI")
                .paymentStatus("PAID")
                .invoiceNumber("INV-98214C")
                .build());

        // 6. Seed Equipment
        equipmentRepository.save(Equipment.builder()
                .name("Pro Commercial Treadmill T80")
                .category("Cardio")
                .quantity(8)
                .conditionStatus("GOOD")
                .purchaseDate(LocalDate.now().minusYears(1))
                .lastMaintenanceDate(LocalDate.now().minusMonths(1))
                .build());

        equipmentRepository.save(Equipment.builder()
                .name("Olympic Power Rack & Barbell")
                .category("Strength")
                .quantity(4)
                .conditionStatus("GOOD")
                .purchaseDate(LocalDate.now().minusMonths(18))
                .lastMaintenanceDate(LocalDate.now().minusMonths(2))
                .build());

        equipmentRepository.save(Equipment.builder()
                .name("Stationary Spin Bike Pro")
                .category("Cardio")
                .quantity(12)
                .conditionStatus("MAINTENANCE_REQUIRED")
                .purchaseDate(LocalDate.now().minusYears(2))
                .lastMaintenanceDate(LocalDate.now().minusMonths(4))
                .build());

        equipmentRepository.save(Equipment.builder()
                .name("Rubber Hex Dumbbell Set (5-100 lbs)")
                .category("Free Weights")
                .quantity(2)
                .conditionStatus("GOOD")
                .purchaseDate(LocalDate.now().minusYears(1))
                .lastMaintenanceDate(LocalDate.now().minusMonths(3))
                .build());

        // 7. Seed Attendance
        attendanceRepository.save(Attendance.builder()
                .member(member1)
                .date(LocalDate.now())
                .checkInTime(LocalTime.of(7, 30))
                .checkOutTime(LocalTime.of(8, 45))
                .status("PRESENT")
                .build());

        attendanceRepository.save(Attendance.builder()
                .member(member2)
                .date(LocalDate.now())
                .checkInTime(LocalTime.of(8, 15))
                .checkOutTime(LocalTime.of(9, 30))
                .status("PRESENT")
                .build());

        attendanceRepository.save(Attendance.builder()
                .member(member3)
                .date(LocalDate.now())
                .checkInTime(LocalTime.of(9, 0))
                .checkOutTime(null)
                .status("PRESENT")
                .build());
    }
}
