package com.gym.gymmanagement.service;

import com.gym.gymmanagement.dto.MemberDTO;
import com.gym.gymmanagement.exception.ResourceNotFoundException;
import com.gym.gymmanagement.model.Member;
import com.gym.gymmanagement.model.Subscription;
import com.gym.gymmanagement.model.Trainer;
import com.gym.gymmanagement.repository.MemberRepository;
import com.gym.gymmanagement.repository.SubscriptionRepository;
import com.gym.gymmanagement.repository.TrainerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final TrainerRepository trainerRepository;

    public List<MemberDTO> getAllMembers() {
        return memberRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public MemberDTO getMemberById(Long id) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Member not found with id: " + id));
        return mapToDTO(member);
    }

    public MemberDTO createMember(MemberDTO dto) {
        Subscription subscription = null;
        if (dto.getSubscriptionId() != null) {
            subscription = subscriptionRepository.findById(dto.getSubscriptionId())
                    .orElseThrow(() -> new ResourceNotFoundException("Subscription not found with id: " + dto.getSubscriptionId()));
        }

        Trainer trainer = null;
        if (dto.getTrainerId() != null) {
            trainer = trainerRepository.findById(dto.getTrainerId())
                    .orElseThrow(() -> new ResourceNotFoundException("Trainer not found with id: " + dto.getTrainerId()));
        }

        Member member = Member.builder()
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .gender(dto.getGender())
                .joinDate(dto.getJoinDate() != null ? dto.getJoinDate() : LocalDate.now())
                .status(dto.getStatus() != null ? dto.getStatus() : "ACTIVE")
                .subscription(subscription)
                .trainer(trainer)
                .build();

        Member saved = memberRepository.save(member);
        return mapToDTO(saved);
    }

    public MemberDTO updateMember(Long id, MemberDTO dto) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Member not found with id: " + id));

        if (dto.getSubscriptionId() != null) {
            Subscription subscription = subscriptionRepository.findById(dto.getSubscriptionId())
                    .orElseThrow(() -> new ResourceNotFoundException("Subscription not found with id: " + dto.getSubscriptionId()));
            member.setSubscription(subscription);
        } else {
            member.setSubscription(null);
        }

        if (dto.getTrainerId() != null) {
            Trainer trainer = trainerRepository.findById(dto.getTrainerId())
                    .orElseThrow(() -> new ResourceNotFoundException("Trainer not found with id: " + dto.getTrainerId()));
            member.setTrainer(trainer);
        } else {
            member.setTrainer(null);
        }

        member.setFirstName(dto.getFirstName());
        member.setLastName(dto.getLastName());
        member.setEmail(dto.getEmail());
        member.setPhone(dto.getPhone());
        member.setGender(dto.getGender());
        if (dto.getJoinDate() != null) {
            member.setJoinDate(dto.getJoinDate());
        }
        if (dto.getStatus() != null) {
            member.setStatus(dto.getStatus());
        }

        Member updated = memberRepository.save(member);
        return mapToDTO(updated);
    }

    public void deleteMember(Long id) {
        if (!memberRepository.existsById(id)) {
            throw new ResourceNotFoundException("Member not found with id: " + id);
        }
        memberRepository.deleteById(id);
    }

    public MemberDTO mapToDTO(Member member) {
        if (member == null) return null;
        return MemberDTO.builder()
                .id(member.getId())
                .firstName(member.getFirstName())
                .lastName(member.getLastName())
                .email(member.getEmail())
                .phone(member.getPhone())
                .gender(member.getGender())
                .joinDate(member.getJoinDate())
                .status(member.getStatus())
                .subscriptionId(member.getSubscription() != null ? member.getSubscription().getId() : null)
                .subscriptionName(member.getSubscription() != null ? member.getSubscription().getPlanName() : "None")
                .trainerId(member.getTrainer() != null ? member.getTrainer().getId() : null)
                .trainerName(member.getTrainer() != null ? member.getTrainer().getFirstName() + " " + member.getTrainer().getLastName() : "Unassigned")
                .build();
    }
}