package com.fullstack.demo.model;

public class Person {
    private String id;
    private String name;
    private String email;

    public Person(String id, String name, String email) {
        setId(id);
        setName(name);
        setEmail(email);
    }

    public Person(String id, String name) {
        this(id, name, "");
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = requireText(id, "ID");
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = requireText(name, "Name");
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email == null ? "" : email.trim();
    }

    private static String requireText(String value, String fieldName) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException(fieldName + " is required.");
        }
        return value.trim();
    }
}
