package com.even.controller;

import com.even.entity.user;
import com.even.repository.UserRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "*")
public class ProfileController {


private final UserRepository userRepository;

public ProfileController(
        UserRepository userRepository) {

    this.userRepository = userRepository;
}

@GetMapping

public ResponseEntity<?> getProfile(
        Authentication authentication) {

    user user =
            (user) authentication.getPrincipal();

    Map<String, Object> response =
            new HashMap<>();

    response.put("id", user.getId());
    response.put("fullName", user.getFullName());
    response.put("username", user.getUsername());
    response.put("email", user.getEmail());
    response.put("phone", user.getPhone());
    response.put("role", user.getRole());
    response.put("createdAt", user.getCreatedAt());

    return ResponseEntity.ok(response);
}

@PutMapping
public ResponseEntity<?> updateProfile(
        @RequestBody Map<String, String> request,
        Authentication authentication) {

    user user =
            (user) authentication.getPrincipal();

    if (request.containsKey("fullName")) {
        user.setFullName(
                request.get("fullName"));
    }

    if (request.containsKey("email")) {
        user.setEmail(
                request.get("email"));
    }

    if (request.containsKey("phone")) {
        user.setPhone(
                request.get("phone"));
    }

    user updatedUser =
            userRepository.save(user);

    Map<String, Object> response =
            new HashMap<>();

    response.put("id", updatedUser.getId());
    response.put("fullName",
            updatedUser.getFullName());
    response.put("username",
            updatedUser.getUsername());
    response.put("email",
            updatedUser.getEmail());
    response.put("phone",
            updatedUser.getPhone());
    response.put("role",
            updatedUser.getRole());
    response.put("createdAt",
            updatedUser.getCreatedAt());

    return ResponseEntity.ok(response);
}


}
