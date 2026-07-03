const events = [
  {
    id: "EV001",
    title: "Tech Career Fair",
    date: "2026-08-10",
    venue: "Kuala Lumpur Convention Centre",
    availableSeats: 120
  },
  {
    id: "EV002",
    title: "Web Development Bootcamp",
    date: "2026-08-15",
    venue: "Digital Learning Hub",
    availableSeats: 35
  },
  {
    id: "EV003",
    title: "AI for Business Workshop",
    date: "2026-08-20",
    venue: "Innovation Centre",
    availableSeats: 50
  }
];

const eventList = document.getElementById("eventList");
const statusText = document.getElementById("statusText");

events.forEach(event => {
  const listItem = document.createElement("li");
  const seatInfo = `${event.availableSeats} seats available`;
  const limitedText = event.availableSeats < 50 ? " - Limited seats" : "";

  listItem.textContent = `${event.title} - ${event.date} - ${event.venue} - ${seatInfo}${limitedText}`;
  eventList.appendChild(listItem);
});

statusText.textContent = `${events.length} event(s) displayed.`;
