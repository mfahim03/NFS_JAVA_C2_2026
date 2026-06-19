# Day 1 Exercise 01 - Read and Explain the Demo Code

## Learning Goal

By the end of this exercise, you should be able to explain a basic Java class, object, constructor, field, method, and object relationship.

## Files to Open

Open the Day 1 demo project and review these files:

```text
Course.java
Instructor.java
Student.java
Main.java
```

## Tasks

Answer the following questions in your notebook or README.md file:

1. What is the purpose of `Course.java`?
It represents Course class with fields that contain courseId, title, durationHours, level and instructor.
It also provides default constructor for the class, getter methods, setInstructor() and printSummary().

2. What is the purpose of `Instructor.java`?
It represents Instructor class with fields that contain instructorId, instructorName and expertise.
It also provides default constructor for the class, getter methods and printProfile().

3. What is the purpose of `Student.java`?
It represents Student class with fields that may contain studentId, studenName and email.
IT also provides default constructor for the class together with their getter methods and printProfile().

4. What does the constructor do?
Constructor initialize object's state when new instance is created as it assigns parameter to field.

5. Why are the fields marked as `private`?
To prevent direct access from outside class, data encapsulation and forces external code to use controlled method such as getters and setters.

6. What does `course1.assignInstructor(instructor1);` mean?
It shows the output of instructor information to the console which is the instructor id, name and expertise.

7. What does `student1.printProfile();` do?
It shows the output of student information to the console such as student id, name, matric number.

## AI-Assisted Task

Use ChatGPT, Gemini, Claude, or Windsurf and ask:

```text
Explain this Java class to someone who already knows TypeScript or C#.
```

Then write down:

1. One explanation from AI that helped you.

1.Java, C# and TypeScript all uses private and public method as an access modifier
2.Java enforces types at compile time.
3.Java does not have no null safety by default unlike C#

2. One part you still needed the trainer or your own reading to understand.

Object composition and how one object stores references to another. I initially thought `setInstructor()` would immediately print something, but realized it just creates a link between the Course and Instructor objects. The actual printing happens when `printSummary()` is called separately. This shows how objects can be connected and accessed through multiple method calls.

## Submission Evidence

Add your answers to README.md under:

```text
## Day 1 Exercise 01 - Code Explanation
```
