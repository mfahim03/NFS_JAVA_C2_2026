# Day 5 Exercise 5.2: REST API Design

## Topic
Designing REST endpoints using resources

## Objective
In this exercise, you will design a REST API without writing code. The goal is to practise thinking like a backend API designer.

By the end of this exercise, you should be able to:

- Identify API resources
- Choose suitable endpoint URLs
- Choose suitable HTTP methods
- Decide when a request body is needed
- Decide possible success and error status codes
- Avoid action-style endpoint names

---

## Scenario
You are designing part of an API for an event booking system.

The system allows users to:

- View available events
- View details of one event
- Create a booking
- View bookings
- View one booking
- Cancel a booking

You are not required to build the API yet. You only need to design it.

---

## Instructions
Create an API specification table.

Your table must include the following columns:

| Resource | Method | Endpoint | Purpose | Request Body Needed? | Success Status | Possible Error Status |
|---|---|---|---|---|---:|---:|
| events | GET | /events | Retrieve all available events | No | 200 OK | 500 Internal Server Error |
| event | GET | /events/{eventId} | Retrieve details for one specific event | No | 200 OK | 404 Not Found, 400 Bad Request |
| booking | POST | /events/{eventId}/bookings | Create a booking for a specific event | Yes | 201 Created | 400 Bad Request, 409 Conflict |
| bookings | GET | /bookings | Retrieve all bookings | No | 200 OK | 500 Internal Server Error |
| booking | GET | /bookings/{bookingId} | Retrieve details for one booking | No | 200 OK | 404 Not Found, 400 Bad Request |
| booking | DELETE | /bookings/{bookingId} | Cancel an existing booking | No | 204 No Content | 404 Not Found, 409 Conflict |

Your API design must cover at least:

1. Viewing all events
2. Viewing one event
3. Creating a booking
4. Viewing all bookings
5. Viewing one booking
6. Cancelling a booking

---

## Important REST Rule
Your endpoint URL should represent the resource.

Avoid action-style URLs such as:

```text
/createEvent
/getAllBookings
/cancelBooking
```

Use resource-style URLs instead.

---

## Request and Response Planning
For any endpoint that needs a request body, briefly describe what data the request body should contain.

For example, do not write the full JSON unless you need to. A short description is enough.

Example format:

| Endpoint | Request Body Description |
|---|---|
| /events/{eventId}/bookings | Booking request includes the event ID in the URL, the user or customer identifier, ticket quantity, and any required attendee or contact details. |

---

## Error Planning
Identify at least two possible error cases.

Examples of possible error categories:

- Required field is missing
- Record does not exist
- Invalid quantity
- Booking is already cancelled
- Event is fully booked

Write your error cases in this format:

| Error Case | Related Endpoint | Suitable Status Code | Explanation |
|---|---|---:|---|
| Event does not exist | /events/{eventId} | 404 Not Found | The requested event ID cannot be found in the system. |
| Required booking field is missing | /events/{eventId}/bookings | 400 Bad Request | The client failed to provide required booking data such as user ID or ticket quantity. |
| Event is fully booked | /events/{eventId}/bookings | 409 Conflict | The event has no remaining seats and the booking cannot be created. |
| Booking is already cancelled or cannot be changed | /bookings/{bookingId} (DELETE) | 409 Conflict | The cancellation request is invalid because the booking is already inactive or cannot be cancelled. |

---

## Restrictions

- Do not use action-style URLs.
- Do not design only one endpoint.
- Do not write Java or Spring Boot code.
- Do not copy the course offering demo endpoints and only rename the resource.
- Do not make every endpoint use `POST`.

---

## Submission
Submit one Markdown file or document containing:

1. Your API specification table
2. Your request body planning table
3. Your error planning table
4. A short explanation of why your endpoint names follow REST principles

---

## Completion Checklist
Before submitting, check that you have:

- [ ] Included at least six endpoints
- [ ] Used resource-style URLs
- [ ] Used suitable HTTP methods
- [ ] Identified when a request body is needed
- [ ] Included success status codes
- [ ] Included possible error status codes
- [ ] Explained at least two error cases

---

## REST principles

The endpoint URLs use nouns to represent resources rather than verbs or actions.
- `GET /events` and `GET /events/{eventId}` read event resources.
- `POST /events/{eventId}/bookings` creates a booking resource for a specific event.
- `GET /bookings` and `GET /bookings/{bookingId}` read booking resources.
- `DELETE /bookings/{bookingId}` removes (cancels) a booking resource.
