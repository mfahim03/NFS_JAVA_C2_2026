package com.example.assettracker.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record CreateTicketRequest(
        @NotBlank(message = "Title is required") String title,
        @NotBlank(message = "Description is required") String description,
        @NotBlank(message = "Category is required") String category,
        @NotBlank(message = "Priority is required")
        @Pattern(regexp = "(?i)LOW|MEDIUM|HIGH", message = "Priority must be LOW, MEDIUM or HIGH")
        String priority,
        @NotBlank(message = "Status is required")
        @Pattern(regexp = "(?i)OPEN|IN_PROGRESS|CLOSED", message = "Status must be OPEN, IN_PROGRESS or CLOSED")
        String status,
        @NotBlank(message = "Created by is required") String createdBy
) {
}
