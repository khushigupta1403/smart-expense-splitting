package com.even.controller;

import com.even.entity.Group;
import com.even.entity.user;
import com.even.service.GroupService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.core.Authentication;

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
public class GroupController {


private final GroupService groupService;

public GroupController(GroupService groupService) {
    this.groupService = groupService;
}

@PostMapping
public ResponseEntity<?> createGroup(
        @RequestBody Map<String, String> request,
        Authentication authentication) {

    try {
        user user = (user) authentication.getPrincipal();

        Group group = groupService.createGroup(
                request.get("name"),
                request.get("description"),
                user.getId()
        );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(group);

    } catch (RuntimeException e) {

        Map<String, String> response = new HashMap<>();
        response.put("message", e.getMessage());

        return ResponseEntity
                .badRequest()
                .body(response);
    }
}

@GetMapping
public ResponseEntity<?> getMyGroups(
        Authentication authentication) {

    user user = (user) authentication.getPrincipal();

    List<Group> groups =
            groupService.getMyGroups(user.getId());

    return ResponseEntity.ok(groups);
}

@GetMapping("/{id}")
public ResponseEntity<?> getGroup(
        @PathVariable Long id) {

    try {
        return ResponseEntity.ok(
                groupService.getGroup(id)
        );

    } catch (RuntimeException e) {

        Map<String, String> response = new HashMap<>();
        response.put("message", e.getMessage());

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(response);
    }
}

@DeleteMapping("/{id}")
public ResponseEntity<?> deleteGroup(
        @PathVariable Long id,
        Authentication authentication) {

    try {
        user user = (user) authentication.getPrincipal();

        groupService.deleteGroup(
                id,
                user.getId()
        );

        Map<String, String> response = new HashMap<>();
        response.put(
                "message",
                "Group deleted successfully"
        );

        return ResponseEntity.ok(response);

    } catch (RuntimeException e) {

        Map<String, String> response = new HashMap<>();
        response.put("message", e.getMessage());

        return ResponseEntity
                .badRequest()
                .body(response);
    }
}

}
