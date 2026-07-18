# Day 10 Exercise 3: Create a Ticket Report by Priority

## Scenario

The support team also wants to know how many tickets are LOW, MEDIUM, or HIGH priority.

## Required Endpoint

```http
GET /api/v1/reports/tickets-by-priority
```

## Example Response

```json
[
  {
    "label": "HIGH",
    "count": 4
  },
  {
    "label": "MEDIUM",
    "count": 6
  },
  {
    "label": "LOW",
    "count": 2
  }
]
```

## Task

Add another method in your `TicketReportService`:

```java
public List<ReportCountResponse> countTicketsByPriority()
```

Then expose it through `ReportController`.

## Expected Evidence

Add this request to your `.http` file:

```http
GET http://localhost:8080/api/v1/reports/tickets-by-priority
Authorization: Bearer {{token}}
```

## Reflection Question

How could this report help a support manager decide where to assign staff?

The report shows the volume of low-, medium-, and high-priority work at a glance. A
support manager can assign more staff to urgent queues, match experienced staff to
high-priority cases, rebalance workloads before queues grow, and keep enough capacity
available for new critical tickets.
