package com.campus.controller;

import com.campus.dto.DashboardDTO;
import com.campus.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {
    
    private final DashboardService dashboardService;
    
    @GetMapping
    public ResponseEntity<DashboardDTO> getDashboardStats() {
        DashboardDTO dashboard = dashboardService.getDashboardStats();
        return ResponseEntity.ok(dashboard);
    }
}
