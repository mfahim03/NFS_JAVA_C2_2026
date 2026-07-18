package com.example.assettracker.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.assettracker.dto.ApiDocumentationResponse;
import com.example.assettracker.dto.ApiEndpointResponse;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/docs")
public class ApiDocsController {

    @GetMapping
    public ApiDocumentationResponse getDocumentation() {
        return new ApiDocumentationResponse(
                "Asset Tracker API", 
                "v1", 
                "/api/v1", 
                List.of(
                        new ApiEndpointResponse("GET", "/api/docs", "READ", "Retrieve API documentation"),
                        new ApiEndpointResponse("GET", "/api/v1/assets", "READ", "Retrieve a list of assets"),
                        new ApiEndpointResponse("GET", "/api/v1/assets/{id}", "READ", "Retrieve a specific asset by ID"),
                        new ApiEndpointResponse("POST", "/api/v1/assets", "WRITE", "Create a new asset"),
                        new ApiEndpointResponse("PUT", "/api/v1/assets/{id}", "WRITE", "Update an existing asset by ID"),
                        new ApiEndpointResponse("DELETE", "/api/v1/assets/{id}", "WRITE", "Delete an asset by ID"),
                        new ApiEndpointResponse("GET", "/api/v1/reports", "READ", "Generate reports based on assets")
                )
            );
    }
    
}
