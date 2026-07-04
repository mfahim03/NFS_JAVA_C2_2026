package com.example.assettracker.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;


@RestController // Tells Spring this class is a Controller, Handles HTTP requests
@RequestMapping("/api")
public class HealthController {
    @GetMapping("/health")  // maps a GET request to a Java method
    public Map<String, String> health() {
        return Map.of(
            "status", "UP",
            "service", "asset-tracker-api"
        );
    }

    @GetMapping("/about")
    public Map<String, String> about() {
        return Map.of(
            "appName", "Asset Tracker API",
            "version", "1.0.0",
            "description", "API for managing asset tracking"
        );
    }
}
