package com.gym.gymmanagement.modules.members.controller;

import com.gym.dto.MemberDTO;
import com.gym.model.Member;
import com.gym.service.MemberService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/members")
public class MemberController {

    private final MemberService service;

    public MemberController(MemberService service) {
        this.service = service;
    }

    // Get all members
    @GetMapping
    public List<Member> getAllMembers() {
        return service.getAllMembers();
    }

    // Get member by ID
    @GetMapping("/{id}")
    public Member getMember(@PathVariable Long id) {
        return service.getMemberById(id);
    }

    // Add member
    @PostMapping
    public Member addMember(@RequestBody MemberDTO dto) {
        return service.addMember(dto);
    }

    // Update member
    @PutMapping("/{id}")
    public Member updateMember(@PathVariable Long id,
                               @RequestBody MemberDTO dto) {

        return service.updateMember(id, dto);
    }

    // Delete member
    @DeleteMapping("/{id}")
    public String deleteMember(@PathVariable Long id) {

        service.deleteMember(id);

        return "Member deleted successfully.";
    }

}