package com.even.controller;

import com.even.entity.GroupMember;
import com.even.service.GroupMemberService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/groups")
@CrossOrigin(origins = "*")
public class GroupMemberController {


private final GroupMemberService groupMemberService;

public GroupMemberController(
        GroupMemberService groupMemberService) {
    this.groupMemberService = groupMemberService;
}

@PostMapping("/{groupId}/members")
public ResponseEntity<?> addMember(
        @PathVariable Long groupId,
        @RequestBody Map<String, Long> request) {

    try {
        Long userId = request.get("userId");

        if (userId == null) {
            throw new RuntimeException(
                    "userId is required");
        }

        GroupMember member =
                groupMemberService.addMember(
                        groupId,
                        userId);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(member);

    } catch (RuntimeException e) {

        Map<String, String> response =
                new HashMap<>();

        response.put("message", e.getMessage());

        return ResponseEntity
                .badRequest()
                .body(response);
    }
}

@GetMapping("/{groupId}/members")
public ResponseEntity<?> getMembers(
        @PathVariable Long groupId) {

    List<GroupMember> members =
            groupMemberService.getMembers(groupId);

    return ResponseEntity.ok(members);
}

@DeleteMapping("/{groupId}/members/{userId}")
public ResponseEntity<?> removeMember(
        @PathVariable Long groupId,
        @PathVariable Long userId) {

    try {
        groupMemberService.removeMember(
                groupId,
                userId);

        Map<String, String> response =
                new HashMap<>();

        response.put(
                "message",
                "Member removed successfully");

        return ResponseEntity.ok(response);

    } catch (RuntimeException e) {

        Map<String, String> response =
                new HashMap<>();

        response.put("message", e.getMessage());

        return ResponseEntity
                .badRequest()
                .body(response);
    }
}


}
