package com.even.controller;

import com.even.dto.ReportResponse;
import com.even.entity.user;
import com.even.service.ReportService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "*")
public class ReportController {


private final ReportService reportService;

public ReportController(
        ReportService reportService) {

    this.reportService = reportService;
}

@GetMapping
public ResponseEntity<ReportResponse> getReport(
        Authentication authentication) {

    user user =
            (user) authentication.getPrincipal();

    return ResponseEntity.ok(
            reportService.getReport(
                    user.getId()
            )
    );
}


}
