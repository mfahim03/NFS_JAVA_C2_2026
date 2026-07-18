# Day 10 Exercise 5: Backend Milestone Review

## Scenario

You have completed the first backend milestone of the programme.

Your task is to review your Support Desk Ticket API and prove that the backend is ready for frontend integration.

## Checklist

Tick each item once completed:

```text
[/] Project runs successfully
[/] MongoDB connection works
[/] Ticket model uses @Document and @Id
[/] TicketRepository extends MongoRepository
[/] Basic CRUD endpoints work
[/] Filtering works
[/] Pagination works
[/] Sorting works
[/] Duplicate or validation errors return clear responses
[/] Register endpoint works
[/] Login endpoint returns JWT
[/] Protected endpoints reject missing token
[/] Protected endpoints accept valid token
[/] Versioned /api/v1 routes exist
[/] Report endpoint works
[/] API documentation endpoint exists
[/] .http file contains test evidence
```

## Submission

Submit:

1. Screenshot of successful login response.
2. Screenshot of protected endpoint working with token.
3. Screenshot of report endpoint response.
4. Screenshot of `/api/docs` response.
5. Updated `.http` file.

## Reflection Question

What is one thing you would improve before connecting this backend to React?

I would add complete update and delete operations for tickets. The current API supports creating and reading tickets, but the frontend will also need to change ticket details or status and remove tickets when appropriate. I would implement secure PUT and DELETE endpoints with validation, role-based access, and clear error responses.
