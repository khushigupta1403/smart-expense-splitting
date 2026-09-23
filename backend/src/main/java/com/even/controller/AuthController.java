package com.even.controller;

import com.even.dto.LoginRequest;
import com.even.dto.RegisterRequest;
import com.even.entity.user;
import com.even.security.JwtService;
import com.even.service.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserService userService;
    private final JwtService jwtService;

    public AuthController(
            UserService userService,
            JwtService jwtService) {

        this.userService = userService;
        this.jwtService = jwtService;
    }


    // =====================================================
    // REGISTER
    // =====================================================

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody RegisterRequest request) {

        try {

            if (request.getFullName() == null ||
                    request.getFullName().isBlank()) {

                throw new RuntimeException(
                        "Full name is required"
                );
            }

            if (request.getUsername() == null ||
                    request.getUsername().isBlank()) {

                throw new RuntimeException(
                        "Username is required"
                );
            }

            if (request.getEmail() == null ||
                    request.getEmail().isBlank()) {

                throw new RuntimeException(
                        "Email is required"
                );
            }

            if (request.getPassword() == null ||
                    request.getPassword().isBlank()) {

                throw new RuntimeException(
                        "Password is required"
                );
            }


            user newUser =
                    userService.register(request);


            Map<String, Object> response =
                    new HashMap<>();

            response.put(
                    "message",
                    "Registration successful"
            );

            response.put(
                    "userId",
                    newUser.getId()
            );

            response.put(
                    "fullName",
                    newUser.getFullName()
            );

            response.put(
                    "username",
                    newUser.getUsername()
            );

            response.put(
                    "email",
                    newUser.getEmail()
            );


            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(response);


        } catch (RuntimeException e) {

            Map<String, String> response =
                    new HashMap<>();

            response.put(
                    "message",
                    e.getMessage()
            );


            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(response);
        }
    }


    // =====================================================
    // LOGIN
    // =====================================================

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request) {

        try {

            if (request.getEmail() == null ||
                    request.getEmail().isBlank()) {

                throw new RuntimeException(
                        "Email is required"
                );
            }

            if (request.getPassword() == null ||
                    request.getPassword().isBlank()) {

                throw new RuntimeException(
                        "Password is required"
                );
            }


            String email =
                    request.getEmail()
                            .trim()
                            .toLowerCase();


            user existingUser =
                    userService.findByEmail(email);


            boolean passwordCorrect =
                    userService.checkPassword(
                            request.getPassword(),
                            existingUser.getPassword()
                    );


            if (!passwordCorrect) {

                throw new RuntimeException(
                        "Invalid email or password"
                );
            }


            String token =
                    jwtService.generateToken(
                            existingUser
                    );


            Map<String, Object> response =
                    new HashMap<>();

            response.put(
                    "message",
                    "Login successful"
            );

            response.put(
                    "token",
                    token
            );

            response.put(
                    "userId",
                    existingUser.getId()
            );

            response.put(
                    "fullName",
                    existingUser.getFullName()
            );

            response.put(
                    "username",
                    existingUser.getUsername()
            );

            response.put(
                    "email",
                    existingUser.getEmail()
            );

            response.put(
                    "role",
                    existingUser.getRole()
            );


            return ResponseEntity.ok(response);


        } catch (RuntimeException e) {

            Map<String, String> response =
                    new HashMap<>();

            response.put(
                    "message",
                    "Invalid email or password"
            );


            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(response);
        }
    }
}