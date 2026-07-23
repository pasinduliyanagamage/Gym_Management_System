package com.gym.gymmanagement.modules.members.service;

import com.gym.dto.MemberDTO;
import com.gym.exception.ResourceNotFoundException;
import com.gym.model.Member;
import com.gym.repository.MemberRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemberService {

    private final MemberRepository repository;

    public MemberService(MemberRepository repository) {
        this.repository = repository;
    }

    // Get all members
    public List<Member> getAllMembers() {
        return repository.findAll();
    }

    // Get member by ID
    public Member getMemberById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Member not found"));
    }

    // Add member
    public Member addMember(MemberDTO dto) {

        Member member = new Member();

        member.setFirstName(dto.getFirstName());
        member.setLastName(dto.getLastName());
        member.setPhone(dto.getPhone());
        member.setEmail(dto.getEmail());
        member.setMembershipType(dto.getMembershipType());

        return repository.save(member);
    }

    // Update member
    public Member updateMember(Long id, MemberDTO dto) {

        Member member = getMemberById(id);

        member.setFirstName(dto.getFirstName());
        member.setLastName(dto.getLastName());
        member.setPhone(dto.getPhone());
        member.setEmail(dto.getEmail());
        member.setMembershipType(dto.getMembershipType());

        return repository.save(member);
    }

    // Delete member
    public void deleteMember(Long id) {

        Member member = getMemberById(id);

        repository.delete(member);
    }

}