package com.even.controller;

import com.even.dto.AnalyticsResponse;
import com.even.entity.user;
import com.even.service.AnalyticsService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "*")
public class AnalyticsController {


private final AnalyticsService analyticsService;

public AnalyticsController(
        AnalyticsService analyticsService) {

    this.analyticsService = analyticsService;
}

@GetMapping
public ResponseEntity<AnalyticsResponse>
        getAnalytics(
                Authentication authentication) {

    user user =
            (user) authentication.getPrincipal();

    return ResponseEntity.ok(
            analyticsService.getAnalytics(
                    user.getId())
    );
}


}
