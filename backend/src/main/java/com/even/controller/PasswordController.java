package com.even.controller;

import com.even.entity.user;
import com.even.repository.UserRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "*")
public class PasswordController {


private final UserRepository userRepository;
private final PasswordEncoder passwordEncoder;

public PasswordController(
        UserRepository userRepository,
        PasswordEncoder passwordEncoder) {

    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
}

@PutMapping("/password")
public ResponseEntity<?> changePassword(
        @RequestBody Map<String, String> request,
        Authentication authentication) {

    user user =
            (user) authentication.getPrincipal();

    String currentPassword =
            request.get("currentPassword");

    String newPassword =
            request.get("newPassword");

    if (currentPassword == null ||
            newPassword == null) {

        Map<String, String> response =
                new HashMap<>();

        response.put(
                "message",
                "Current password and new password are required"
        );

        return ResponseEntity
                .badRequest()
                .body(response);
    }

    if (!passwordEncoder.matches(
            currentPassword,
            user.getPassword())) {

        Map<String, String> response =
                new HashMap<>();

        response.put(
                "message",
                "Current password is incorrect"
        );

        return ResponseEntity
                .badRequest()
                .body(response);
    }

    if (newPassword.length() < 6) {

        Map<String, String> response =
                new HashMap<>();

        response.put(
                "message",
                "New password must contain at least 6 characters"
        );

        return ResponseEntity
                .badRequest()
                .body(response);
    }

    user.setPassword(
            passwordEncoder.encode(newPassword)
    );

    userRepository.save(user);

    Map<String, String> response =
            new HashMap<>();

    response.put(
            "message",
            "Password changed successfully"
    );

    return ResponseEntity.ok(response);
}


}
