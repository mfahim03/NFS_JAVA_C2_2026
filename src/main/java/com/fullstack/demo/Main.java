package com.fullstack.demo;

public class Main {
    public static void main(String[] args) {
        // Syntax for creating a new object (instance) of a class:
        // ClassName objectName = new Constructor();
        // ClassName and Constructor usually match.

        Course course1 = new Course("C001", "Java Programming", 40, "Beginner", "Programming", true);
        Course course2 = new Course("C002", "Front-End Development", 30, "Intermediate", "Frontend", true);

        Instructor instructor1= new Instructor("I001", "John Doe", "Java Programming");
        Instructor instructor2 = new Instructor("I002", "Jane Smith", "Web Development");

        Student student1 = new Student("S001", "Alice Johnson", "alice.johnson@example.com");
        Student student2 = new Student("S002", "Bob Williams", "bob.williams@example.com");

        course1.setInstructor(instructor1);
        course2.setInstructor(instructor2);

        System.out.println("Course Details:");
        course1.printSummary();
        course2.printSummary();

        System.out.println("\nInstructor Details:");
        instructor1.printProfile();
        instructor2.printProfile();

        System.out.println("\nStudent Profiles:");
        student1.printProfile();
        student2.printProfile();
    
    }
}