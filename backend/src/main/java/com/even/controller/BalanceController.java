package com.even.controller;

import com.even.dto.BalanceResponse;
import com.even.service.BalanceService;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/groups")
@CrossOrigin(origins = "*")
public class BalanceController {


private final BalanceService balanceService;

public BalanceController(
        BalanceService balanceService) {

    this.balanceService = balanceService;
}

@GetMapping("/{groupId}/balances")
public ResponseEntity<List<BalanceResponse>>
        getGroupBalances(
                @PathVariable Long groupId) {

    return ResponseEntity.ok(
            balanceService.getGroupBalances(
                    groupId)
    );
}

}
