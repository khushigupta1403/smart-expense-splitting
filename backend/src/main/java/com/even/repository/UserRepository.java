package com.even.repository;

import com.even.entity.user;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<user, Long> {

    Optional<user> findByEmail(String email);

    Optional<user> findByUsername(String username);

    boolean existsByEmail(String email);

    boolean existsByUsername(String username);
}