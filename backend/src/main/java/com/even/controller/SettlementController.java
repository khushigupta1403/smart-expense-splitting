package com.even.controller;

import com.even.entity.Settlement;
import com.even.entity.user;
import com.even.service.SettlementService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/groups")
@CrossOrigin(origins = "*")
public class SettlementController {


private final SettlementService settlementService;

public SettlementController(
        SettlementService settlementService) {

    this.settlementService = settlementService;
}

@PostMapping("/{groupId}/settlements")
public ResponseEntity<?> createSettlement(
        @PathVariable Long groupId,
        @RequestBody Map<String, Object> request,
        Authentication authentication) {

    try {

        user user =
                (user) authentication.getPrincipal();

        Long paidTo =
                Long.valueOf(
                        request.get("paidTo").toString());

        BigDecimal amount =
                new BigDecimal(
                        request.get("amount").toString());

        Settlement settlement =
                settlementService.createSettlement(
                        groupId,
                        user.getId(),
                        paidTo,
                        amount);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(settlement);

    } catch (RuntimeException e) {

        Map<String, String> response =
                new HashMap<>();

        response.put(
                "message",
                e.getMessage());

        return ResponseEntity
                .badRequest()
                .body(response);
    }
}

@GetMapping("/{groupId}/settlements")
public ResponseEntity<List<Settlement>>
        getGroupSettlements(
                @PathVariable Long groupId) {

    return ResponseEntity.ok(
            settlementService
                    .getGroupSettlements(groupId)
    );
}

@GetMapping("/settlements/{id}")
public ResponseEntity<?> getSettlement(
        @PathVariable Long id) {

    try {

        return ResponseEntity.ok(
                settlementService
                        .getSettlement(id)
        );

    } catch (RuntimeException e) {

        Map<String, String> response =
                new HashMap<>();

        response.put(
                "message",
                e.getMessage());

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(response);
    }
}


}
