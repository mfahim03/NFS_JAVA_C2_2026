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
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const resetButton = document.getElementById("reset-button");

function renderStudents(studentArray) {
  studentList.innerHTML = "";

  if (studentArray.length === 0) {
    studentList.innerHTML = "<p>No students found.</p>";
    return;
  }

  studentArray.forEach((student) => {
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
}

searchButton.addEventListener("click", () => {
  const keyword = searchInput.value.trim().toLowerCase();

  const results = students.filter((student) => {
    return student.studentName.toLowerCase().includes(keyword);
  });

  renderStudents(results);
});

resetButton.addEventListener("click", () => {
  searchInput.value = "";
  renderStudents(students);
});

renderStudents(students);
