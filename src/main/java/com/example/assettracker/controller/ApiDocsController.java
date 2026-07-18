package com.example.assettracker.controller;

import com.example.assettracker.dto.ApiDocumentationResponse;
import com.example.assettracker.dto.ApiEndpointResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/docs")
public class ApiDocsController {

    @GetMapping
    public ApiDocumentationResponse getDocumentation() {
        return new ApiDocumentationResponse(
                "Support Desk Ticket API",
                "v1",
                "/api/v1",
                List.of(
                        new ApiEndpointResponse("POST", "/api/auth/register", "Public", "Register a new user account."),
                        new ApiEndpointResponse("POST", "/api/auth/login", "Public", "Login and receive a JWT bearer token."),
                        new ApiEndpointResponse("GET", "/api/tickets", "USER or ADMIN", "List tickets using the original route."),
                        new ApiEndpointResponse("POST", "/api/tickets", "ADMIN", "Create a ticket using the original route."),
                        new ApiEndpointResponse("GET", "/api/v1/tickets", "USER or ADMIN", "List tickets, optionally filtered by status, priority, or category."),
                        new ApiEndpointResponse("GET", "/api/v1/tickets/{id}", "USER or ADMIN", "Get one ticket by MongoDB id."),
                        new ApiEndpointResponse("POST", "/api/v1/tickets", "USER or ADMIN", "Create a ticket using the versioned route."),
                        new ApiEndpointResponse("GET", "/api/v1/reports/tickets-by-status", "USER or ADMIN", "Count tickets grouped by status."),
                        new ApiEndpointResponse("GET", "/api/v1/reports/tickets-by-priority", "USER or ADMIN", "Count tickets grouped by priority."),
                        new ApiEndpointResponse("GET", "/api/docs", "Public", "View this API documentation.")
                )
        );
    }
}
