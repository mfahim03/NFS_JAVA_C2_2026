package com.fullstack.demo.model;

public class Instructor extends Person {
    private String expertise;

    public Instructor(String instructorId, String instructorName, String expertise) {
        super(instructorId, instructorName);
        setExpertise(expertise);
    }

    public String getInstructorId() {
        return getId();
    }

    public void setInstructorId(String instructorId) {
        setId(instructorId);
    }

    public String getInstructorName() {
        return getName();
    }

    public void setInstructorName(String instructorName) {
        setName(instructorName);
    }

    public String getExpertise() {
        return expertise;
    }

    public void setExpertise(String expertise) {
        this.expertise = requireText(expertise, "Expertise");
    }

    public void printProfile() {
        System.out.println("Instructor ID: " + getInstructorId());
        System.out.println("Name: " + getInstructorName());
        System.out.println("Expertise: " + expertise);
    }

    private static String requireText(String value, String fieldName) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException(fieldName + " is required.");
        }
        return value.trim();
    }
}
