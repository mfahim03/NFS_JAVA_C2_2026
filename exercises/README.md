## Exercise 1

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

## Exercise 3

```text
Why is CourseOffering more useful than using only Course when building a real web application?
```

- CourseOffering is more useful because it separates the static course definition from the dynamic delivery instances.
- It also ensures that data can be reusable since course is what being taught and course offering is the details of it which define when, how and who teaches it
- One course subject can be offered multiple times that can have different date and delivery mode
