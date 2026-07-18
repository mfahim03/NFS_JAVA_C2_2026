# Day 10 Exercise 2: Create a Ticket Report by Status

## Scenario

A support manager wants a quick summary of how many tickets are currently open, in progress, or closed.

Instead of returning all tickets, your API should return a grouped count.

## Learning Objective

Use MongoDB aggregation to group documents and count records.

## Required Endpoint

```http
GET /api/v1/reports/tickets-by-status
```

## Example Response

```json
[
  {
    "label": "OPEN",
    "count": 5
  },
  {
    "label": "IN_PROGRESS",
    "count": 3
  },
  {
    "label": "CLOSED",
    "count": 2
  }
]
```

## Suggested Files

```text
ReportCountResponse.java
TicketReportService.java
ReportController.java
```

## Hint

The in-class demo used this pattern:

```java
Aggregation.group("status").count().as("count")
```

## Security Rule

Only logged-in users should be able to call report endpoints.

## Expected Evidence

Add this request to your `.http` file:

```http
GET http://localhost:8080/api/v1/reports/tickets-by-status
Authorization: Bearer {{token}}
```

## Reflection Question

Why is a grouped report endpoint better than asking the frontend to download all tickets and count them manually?

## Completed Implementation

The `Ticket` model from Day 8 is mapped to the MongoDB `tickets` collection and
includes the required `status` field. The completed report endpoint is:

```http
GET /api/v1/reports/tickets-by-status
```

`ReportController` delegates the request to
`TicketReportService.countTicketsByStatus()`. The service uses a MongoDB aggregation
pipeline to group tickets by `status`, count each group, map the results to
`ReportCountResponse`, and sort the status labels. The security configuration
restricts `/api/v1/reports/**` to authenticated `USER` or `ADMIN` accounts. Evidence
is included in `requests/day08-ticket-filtering.http`.

### Reflection Answer

A grouped report endpoint performs the counting close to the data and returns only
the small summary the frontend needs. This reduces database-to-server and
server-to-client data transfer, avoids exposing unnecessary ticket records, uses less
browser memory and processing time, and keeps the reporting rule consistent for every
client.
