## Day 3 Assignment 01 - Code Flow Trace

When `getCourseById("C004")` is called, which file does the request go to first, second, and third?

### Answer:

1. **First: CodeFlowPractice.java** - This is where the method is called. The demo class invokes `courseService.getCourseById("C004")`.

2. **Second: CourseService.java** - The `getCourseById()` method is defined and executed here. The service validates the request and then calls `courseRepository.findById(courseId)`.

3. **Third: InMemoryCourseRepository.java** - The `findById()` method searches the LinkedHashMap in memory and returns an Optional containing the course (if found).


## Why is InMemoryCourseRepository temporary storage?

InMemoryCourseRepository is temporary storage because it keeps course records only in memory while the program runs. When the application stops, all data is lost.

## What would probably replace it later when we use MongoDB?

A MongoDB-backed repository implementation would probably replace it later. That implementation would store and retrieve courses from a MongoDB database instead of the in-memory `LinkedHashMap`.

## Why is throwing CourseNotFoundException better than printing inside CourseService?

Throwing CourseNotFoundException is better because the service reports the error without deciding how to display it. A console app, web API, and frontend app may all show the same error differently, so the service should let the caller handle presentation.