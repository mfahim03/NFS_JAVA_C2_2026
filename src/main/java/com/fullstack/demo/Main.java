package com.fullstack.demo;

public class Main {
    public static void main(String[] args) {
        // Syntax for creating a new object (instance) of a class:
        // ClassName objectName = new Constructor();
        // ClassName and Constructor usually match.

        Course course1 = new Course("C001", "Java Programming", 40, "Beginner", "Programming", true);
        Course course2 = new Course("C002", "Web Technology", 30, "Intermediate", "Frontend", false);

        Instructor instructor1= new Instructor("I001", "Mark Johnson", "Java Programming");
        Instructor instructor2 = new Instructor("I002", "Jason", "Web Development");

        Student student1 = new Student("S001", "Muhammad Fahim", "fahim@example.com");
        Student student2 = new Student("S002", "Bob Williams", "bob.williams@example.com");

        CourseOffering offering1 = new CourseOffering("O001", "Java Fundamentals - June Intake 2026", course1, instructor1, "2024-09-01", "2024-12-15", 30, "Online");
        CourseOffering offering2 = new CourseOffering("O002", "Web Technology - July Intake 2026", course2, instructor2, "2024-09-01", "2024-12-15", 25, "In-Person");

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

        System.out.println("\nCourse Offering Summary:\n");
        offering1.printOfferingSummary();
        System.out.println("\n");
        offering2.printOfferingSummary();
    }
}