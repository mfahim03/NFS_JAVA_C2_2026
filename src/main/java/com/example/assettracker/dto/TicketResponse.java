package com.example.assettracker.dto;

import java.time.Instant;

/*
 * TicketResponse
 * --------------
 * DTO returned by ticket controller endpoints. Separates the internal
 * Ticket model from the JSON contract the API exposes.
 */
public class TicketResponse {

    private String id;
    private String title;
    private String description;
    private String category;
    private String priority;
    private String status;
    private String createdBy;
    private Instant createdAt;

    public TicketResponse(String id, String title, String description, String category,
                          String priority, String status, String createdBy, Instant createdAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.priority = priority;
        this.status = status;
        this.createdBy = createdBy;
        this.createdAt = createdAt;
    }

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getCategory() {
        return category;
    }

    public String getPriority() {
        return priority;
    }

    public String getStatus() {
        return status;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
}
