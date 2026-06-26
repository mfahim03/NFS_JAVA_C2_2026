package com.fullstack.demo;

import com.fullstack.demo.exception.CourseNotFoundException;
import com.fullstack.demo.model.Course;
import com.fullstack.demo.repository.CourseRepository;
import com.fullstack.demo.repository.InMemoryCourseRepository;
import com.fullstack.demo.service.CourseService;

public class ExceptionPractice {
    public static void main(String[] args) {
        CourseRepository courseRepository = new InMemoryCourseRepository();
        CourseService courseService = new CourseService(courseRepository);

        Course course1 = new Course("C001", "Java Fundamentals", 10, "Beginner");
        Course course2 = new Course("C002", "React Frontend Development", 12, "Beginner");

        courseService.createCourse(course1);
        courseService.createCourse(course2);

        System.out.println("=== Existing Course ===");
        Course existingCourse = courseService.getCourseById("C001");
        existingCourse.printSummary();

        System.out.println();
        System.out.println("=== Missing Course C999 ===");
        try {
            Course missingCourse = courseService.getCourseById("C999");
            missingCourse.printSummary();
        } catch (CourseNotFoundException e) {
            System.out.println("Friendly message for user: " + e.getMessage());
        }

        System.out.println();
        System.out.println("=== Missing Course C888 ===");
        try {
            Course anotherMissingCourse = courseService.getCourseById("C888");
            anotherMissingCourse.printSummary();
        } catch (CourseNotFoundException e) {
            System.out.println("Cannot display course details because the course does not exist.");
        }
    }
}