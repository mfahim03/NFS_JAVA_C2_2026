/* app.js 
small frontend REST client
1. GET data from the mock API and display it in the browser
2. POST data to the mock API when a form is submitted

User clicks button -> GET request to mock API -> API returns courses as JSON-> JS converts JSON into list -> display courses in browser

1. Select HTML Elements
2. Create showStatus()
3. Create renderCourses()
4. Create loadCourses()
5. Connect button click
6. Create createCourse()
7. Connect form submit
*/

const API_BASE_URL = "http://localhost:8081/api";

const statusText = document.querySelector("#statusText");
const courseList = document.querySelector("#courseList");
const loadButton = document.querySelector("#loadButton");
const createForm = document.querySelector("#createForm");
const createButton = document.querySelector("#createButton");

function showStatus(message) {
    statusText.textContent = message;
}

function renderCourses(courses) {
    courseList.innerHTML = "";

    // If the data is an array of events, adapt rendering accordingly
    courses.forEach(item => {
        const listItem = document.createElement("li");

        // Support both course-offering shape and event shape
        if (item.title && item.date) {
            listItem.textContent = `${item.title} - ${item.date} - ${item.venue} - ${item.availableSeats} seats available`;
        } else {
            listItem.textContent =
              `${item.courseTitle} by ${item.instructorName} ` +
              `starts on ${item.startDate}. Capacity: ${item.capacity}. Status: ${item.status}`;
        }

        courseList.appendChild(listItem);
    });
}

async function loadCourses() {
    // Load events from the Event API endpoint for the exercise
    showStatus("Loading events...");

    try {
        const response = await fetch(`${API_BASE_URL}/events`);

        console.log("GET /events status:", response.status);

        if (!response.ok) {
            throw new Error("Request failed with status " + response.status);
        }

        const data = await response.json();

        renderCourses(data);
        showStatus(`Loaded ${data.length} event(s).`);
    } catch (error) {
        showStatus(`Error: ${error.message}`);
    }
}

async function createCourse(event) {
    event.preventDefault(); // Stop the browser from submitting the form and reloading the page

    const payload = {
        courseTitle: createForm.courseTitle.value,
        instructorName: createForm.instructorName.value,
        startDate: createForm.startDate.value,
        capacity: parseInt(createForm.capacity.value)
    };

    try {
        const response = await fetch(`${API_BASE_URL}/course-offerings`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        console.log("POST status:", response.status);
        console.log("POST response:", data);

        if (!response.ok) {
            showStatus(`Error: ${data.message}`);
            return;
        }

        showStatus(`Created course offering ${data.id}.`);
        createForm.reset(); // clear the form
        await loadCourses(); // refresh the list of courses
    } catch (error) {
        showStatus(error.message);
    }
}

// Add a simple search-by-ID UI for the exercise (search events by ID)
const searchWrapper = document.createElement("div");
const searchInput = document.createElement("input");
searchInput.placeholder = "Event ID (e.g. EV001)";
const searchButton = document.createElement("button");
searchButton.textContent = "Find Event";
searchWrapper.appendChild(searchInput);
searchWrapper.appendChild(searchButton);
loadButton.parentNode.insertBefore(searchWrapper, statusText);

async function findEventById(id) {
    if (!id) { showStatus("Enter an event ID to search."); return; }
    showStatus(`Searching for ${id}...`);
    try {
        const res = await fetch(`${API_BASE_URL}/events/${encodeURIComponent(id)}`);
        console.log(`GET /events/${id} status:`, res.status);
        if (res.status === 404) {
            courseList.innerHTML = "";
            showStatus(`Event ${id} not found.`);
            return;
        }
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
        const ev = await res.json();
        renderCourses([ev]);
        showStatus(`Event ${id} loaded.`);
    } catch (err) {
        showStatus(`Error: ${err.message}`);
    }
}

loadButton.addEventListener("click", loadCourses);
searchButton.addEventListener("click", () => findEventById(searchInput.value.trim()));
searchInput.addEventListener("keydown", (e) => { if (e.key === "Enter") findEventById(searchInput.value.trim()); });
createForm.addEventListener("submit", createCourse);