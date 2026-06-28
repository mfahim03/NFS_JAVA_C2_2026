const student = {
  studentId: "S001",
  studentName: "Ignacio de Paul",
  email: "ignacio@example.com",
  status: "Active",
};

console.log("=== Student Object ===");
console.log(student);

console.log(`Student ID: ${student.studentId}`);
console.log(`Name: ${student.studentName}`);
console.log(`Email: ${student["email"]}`);
console.log(`Status: ${student.status}`);
