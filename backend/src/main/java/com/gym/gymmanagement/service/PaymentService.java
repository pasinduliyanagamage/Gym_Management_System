package com.gym.gymmanagement.service;

import com.gym.gymmanagement.dto.PaymentDTO;
import com.gym.gymmanagement.exception.ResourceNotFoundException;
import com.gym.gymmanagement.model.Member;
import com.gym.gymmanagement.model.Payment;
import com.gym.gymmanagement.repository.MemberRepository;
import com.gym.gymmanagement.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final MemberRepository memberRepository;

    public List<PaymentDTO> getAllPayments() {
        return paymentRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public PaymentDTO getPaymentById(Long id) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payment record not found with id: " + id));
        return mapToDTO(payment);
    }

    public PaymentDTO createPayment(PaymentDTO dto) {
        Member member = memberRepository.findById(dto.getMemberId())
                .orElseThrow(() -> new ResourceNotFoundException("Member not found with id: " + dto.getMemberId()));

        String invoiceNo = dto.getInvoiceNumber() != null ? dto.getInvoiceNumber() : "INV-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();

        Payment payment = Payment.builder()
                .member(member)
                .amount(dto.getAmount())
                .paymentDate(dto.getPaymentDate() != null ? dto.getPaymentDate() : LocalDateTime.now())
                .paymentMethod(dto.getPaymentMethod() != null ? dto.getPaymentMethod() : "CARD")
                .paymentStatus(dto.getPaymentStatus() != null ? dto.getPaymentStatus() : "PAID")
                .invoiceNumber(invoiceNo)
                .build();

        Payment saved = paymentRepository.save(payment);
        return mapToDTO(saved);
    }

    public PaymentDTO updatePayment(Long id, PaymentDTO dto) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payment record not found with id: " + id));

        if (dto.getMemberId() != null) {
            Member member = memberRepository.findById(dto.getMemberId())
                    .orElseThrow(() -> new ResourceNotFoundException("Member not found with id: " + dto.getMemberId()));
            payment.setMember(member);
        }

        payment.setAmount(dto.getAmount());
        if (dto.getPaymentDate() != null) payment.setPaymentDate(dto.getPaymentDate());
        if (dto.getPaymentMethod() != null) payment.setPaymentMethod(dto.getPaymentMethod());
        if (dto.getPaymentStatus() != null) payment.setPaymentStatus(dto.getPaymentStatus());
        if (dto.getInvoiceNumber() != null) payment.setInvoiceNumber(dto.getInvoiceNumber());

        Payment updated = paymentRepository.save(payment);
        return mapToDTO(updated);
    }

    public void deletePayment(Long id) {
        if (!paymentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Payment record not found with id: " + id);
        }
        paymentRepository.deleteById(id);
    }

    public PaymentDTO mapToDTO(Payment payment) {
        if (payment == null) return null;
        return PaymentDTO.builder()
                .id(payment.getId())
                .memberId(payment.getMember() != null ? payment.getMember().getId() : null)
                .memberName(payment.getMember() != null ? payment.getMember().getFirstName() + " " + payment.getMember().getLastName() : "Unknown Member")
                .amount(payment.getAmount())
                .paymentDate(payment.getPaymentDate())
                .paymentMethod(payment.getPaymentMethod())
                .paymentStatus(payment.getPaymentStatus())
                .invoiceNumber(payment.getInvoiceNumber())
                .build();
    }
}
