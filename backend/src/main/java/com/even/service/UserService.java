package com.even.service;

import com.even.dto.RegisterRequest;
import com.even.entity.user;
import com.even.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    // =====================================================
    // REGISTER
    // =====================================================

    public user register(RegisterRequest request) {

        String email =
                request.getEmail()
                        .trim()
                        .toLowerCase();

        String username =
                request.getUsername()
                        .trim();


        if (userRepository.existsByEmail(email)) {

            throw new RuntimeException(
                    "Email already registered"
            );
        }


        if (userRepository.existsByUsername(username)) {

            throw new RuntimeException(
                    "Username already taken"
            );
        }


        user newUser =
                new user();


        newUser.setFullName(
                request.getFullName().trim()
        );

        newUser.setUsername(
                username
        );

        newUser.setEmail(
                email
        );

        newUser.setPhone(
                request.getPhone().trim()
        );


        // IMPORTANT:
        // Password is stored as BCrypt hash.

        newUser.setPassword(
                passwordEncoder.encode(
                        request.getPassword()
                )
        );


        newUser.setRole("USER");


        return userRepository.save(newUser);
    }


    // =====================================================
    // FIND BY EMAIL
    // =====================================================

    public user findByEmail(String email) {

        return userRepository
                .findByEmail(
                        email.trim().toLowerCase()
                )
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        )
                );
    }


    // =====================================================
    // FIND BY USERNAME
    // =====================================================

    public user findByUsername(
            String username) {

        return userRepository
                .findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        )
                );
    }


    // =====================================================
    // CHECK PASSWORD
    // =====================================================

    public boolean checkPassword(
            String rawPassword,
            String encodedPassword) {

        return passwordEncoder.matches(
                rawPassword,
                encodedPassword
        );
    }
}