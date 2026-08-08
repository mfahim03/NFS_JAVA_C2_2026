package com.example.assettracker.dto;

import java.time.LocalDate;

public record TicketResponse(
        String id,
        String title,
        String description,
        String category,
        String priority,
        String status,
        String createdBy,
        LocalDate createdAt
) {
}
