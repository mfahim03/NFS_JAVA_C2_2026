const students = [
  {
    studentId: "S001",
    studentName: "Ignacio de Paul",
    email: "ignacio@example.com",
    status: "Active",
  },
  {
    studentId: "S002",
    studentName: "Ben Tan",
    email: "ben@example.com",
    status: "Inactive",
  },
  {
    studentId: "S003",
    studentName: "Chong Mei",
    email: "mei@example.com",
    status: "Active",
  },
  {
    studentId: "S004",
    studentName: "Danish Nawaz",
    email: "danish@example.com",
    status: "Active",
  },
];

const studentList = document.getElementById("student-list");

students.forEach((student) => {
  const studentCard = document.createElement("div");

  studentCard.innerHTML = `
    <h2>${student.studentName}</h2>
    <p>Student ID: ${student.studentId}</p>
    <p>Name: ${student.studentName}</p>
    <p>Email: ${student.email}</p>
    <p>Status: ${student.status}</p>
  `;

  studentList.appendChild(studentCard);
});
