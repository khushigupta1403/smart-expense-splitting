package com.even.controller;

import com.even.dto.DashboardResponse;
import com.even.entity.user;
import com.even.service.DashboardService;

import org.springframework.http.ResponseEntity;

import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {


private final DashboardService dashboardService;

public DashboardController(
        DashboardService dashboardService) {

    this.dashboardService = dashboardService;
}

@GetMapping
public ResponseEntity<DashboardResponse>
        getDashboard(
                Authentication authentication) {

    user user =
            (user) authentication.getPrincipal();

    return ResponseEntity.ok(
            dashboardService.getDashboard(
                    user.getId())
    );
}


}
