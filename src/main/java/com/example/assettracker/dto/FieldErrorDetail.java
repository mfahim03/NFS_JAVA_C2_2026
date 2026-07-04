package com.example.assettracker.dto;

public class FieldErrorDetail {
    public String field;
    public String message;

    public FieldErrorDetail(String field, String message) {
        this.field = field;
        this.message = message;
    }

    public String getField() {
        return field;
    }

    public String getMessage() {
        return message;
    }

    
}
