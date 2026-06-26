package com.fullstack.demo;

import com.fullstack.demo.model.Course;
import com.fullstack.demo.repository.CourseRepository;
import com.fullstack.demo.repository.InMemoryCourseRepository;
import com.fullstack.demo.service.CourseService;

public class CodeFlowPractice {

    public static void main(String[] args) {
        
        // We create the repository first because the service depends on it.
        // The repository is responsible for storing and retrieving data.
        // CourseService needs CourseRepository to interact with the data storage.
        CourseRepository courseRepository = new InMemoryCourseRepository();
        
        // CourseService needs CourseRepository as a dependency.
        // The service acts as a business logic layer that uses the repository
        // to perform operations like creating, retrieving, and managing courses.
        CourseService courseService = new CourseService(courseRepository);
        
        System.out.println("=== Add and Find Course ===\n");
        
        // 1. Demo class calls CourseService.createCourse()
        // 2. CourseService validates the course
        // 3. CourseService asks CourseRepository to save the course
        // 4. InMemoryCourseRepository stores the course in memory (LinkedHashMap)
        // 5. The course object is returned to the demo class
        
        Course springBootCourse = new Course("C004", "Spring Boot API Development", 18, "Intermediate");
        courseService.createCourse(springBootCourse);
        
        // 1. Demo class calls CourseService.getCourseById("C004")
        // 2. CourseService asks CourseRepository to find the course by ID
        // 3. InMemoryCourseRepository searches in memory and returns the course
        // 4. The course object is returned to the demo class
        
        Course retrievedCourse = courseService.getCourseById("C004");

        retrievedCourse.printSummary();
    }
}