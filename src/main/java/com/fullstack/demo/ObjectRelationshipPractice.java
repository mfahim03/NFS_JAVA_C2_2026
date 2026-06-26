package com.fullstack.demo;

import com.fullstack.demo.model.Course;
import com.fullstack.demo.model.CourseOffering;
import com.fullstack.demo.model.Instructor;

public class ObjectRelationshipPractice {

    public static void main(String[] args) {
        Instructor instructor1 = new Instructor("I001", "Mike Rahman", "Java and Spring Boot");
        Instructor instructor2 = new Instructor("I002", "Marcus Lee", "React and Frontend Development");

        Course course1 = new Course("C001", "Java Fundamentals", 14, "Beginner");
        Course course2 = new Course("C002", "React Frontend Development", 21, "Intermediate");

        course1.setInstructor(instructor1);
        course2.setInstructor(instructor2);

        System.out.println("=== Courses ===");
        course1.printSummary();
        System.out.println();
        course2.printSummary();
        System.out.println();

        // CourseOffering uses composition because it has a Course and has an Instructor.
        CourseOffering offering1 = new CourseOffering(
                "OFF001",
                "Java Fundamentals",
                course1,
                instructor1,
                "2026-06-29",
                "2026-06-30",
                25,
                "Physical"
        );

        CourseOffering offering2 = new CourseOffering(
                "OFF002",
                "React Frontend",
                course2,
                instructor2,
                "2026-07-01",
                "2026-07-03",
                20,
                "Hybrid"
        );

        CourseOffering offering3 = new CourseOffering(
                "OFF003",
                "Java Fundamentals",
                course1,
                instructor1,
                "2026-07-10",
                "2026-07-12",
                25,
                "Physical"
        );

        System.out.println("=== Course Offerings ===");
        offering1.printSummary();
        System.out.println();
        offering2.printSummary();
        System.out.println();
        offering3.printSummary();
    }
}
