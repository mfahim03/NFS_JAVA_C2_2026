package com.example.supportdesk.dto;

public class TicketResponse {
    private final String id;
    private final String title;
    private final String description;
    private final String category;
    private final String priority;
    private final String status;
    private final String createdBy;
    private final String createdAt;

    public TicketResponse(String id, String title, String description, String category,
                          String priority, String status, String createdBy, String createdAt) {
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

    public String getCreatedAt() {
        return createdAt;
    }
}
