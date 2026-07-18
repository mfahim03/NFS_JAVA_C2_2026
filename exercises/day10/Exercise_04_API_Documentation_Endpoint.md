# Day 10 Exercise 4: Create a Simple API Documentation Endpoint

## Scenario

Your API now has many endpoints. New developers need a quick way to see what endpoints exist and what each endpoint does.

## Required Endpoint

```http
GET /api/docs
```

## Task

Create a controller called:

```text
ApiDocsController
```

The endpoint should return a JSON list of important endpoints.

## Example Response

```json
{
  "application": "Support Desk Ticket API",
  "version": "v1",
  "baseUrl": "/api/v1",
  "endpoints": [
    {
      "method": "POST",
      "path": "/api/auth/register",
      "access": "Public",
      "description": "Register a new user."
    },
    {
      "method": "GET",
      "path": "/api/v1/tickets",
      "access": "USER or ADMIN",
      "description": "List support tickets."
    }
  ]
}
```

## Security Rule

This endpoint can be public:

```text
/api/docs/** permitAll
```

## Expected Evidence

Add this request to your `.http` file:

```http
GET http://localhost:8080/api/docs
```

## Reflection Question

Why is API documentation useful before frontend integration?

API documentation gives frontend developers a shared contract before integration
begins. They can see the available paths, HTTP methods, authentication requirements,
and endpoint purposes while designing API clients and screens. This reduces incorrect
assumptions, speeds up testing, and helps backend and frontend teams identify missing
operations or mismatched expectations early.