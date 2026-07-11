# Day 8 Exercise 4: Query Test File and Notes

## Objective

Create evidence that your query, pagination, sorting, logging, and indexes work.

## Part A: Update your `.http` file

Your `.http` file must include tests for:

```text
GET /api/tickets
GET /api/tickets?status=OPEN
GET /api/tickets?priority=HIGH
GET /api/tickets?category=Email
GET /api/tickets/paged?page=0&size=5
GET /api/tickets/paged?page=1&size=5
GET /api/tickets/paged?page=0&size=5&sortBy=createdAt&direction=desc
```

## Part B: Write short notes

Answer these questions:

1. Which query parameters did you implement?
2. Which fields did you index?
3. Why should an API use pagination?
4. What log messages appear when you call the filtering endpoint?
5. What endpoint proves your sorting works?

## Submission

Submit:

1. Updated `.http` file
2. Short notes answering the five questions above

---

## Notes

1. Which query parameters did you implement?

   I implemented `status`, `priority`, and `category` for filtering, plus `page`, `size`, `sortBy`, and `direction` for pagination and sorting.

2. Which fields did you index?

   I indexed `status`, `priority`, `category`, `createdBy`, and `createdAt` in the `Ticket` model.

3. Why should an API use pagination?

   Pagination avoids returning huge result sets in one response, reduces server and client memory usage, improves response time, and enables clients to load data in manageable pages.

4. What log messages appear when you call the filtering endpoint?

   The service logs show the filter values and the number of tickets returned, for example:
   - `Fetching tickets with filters - status=OPEN, priority=null, category=null`
   - `Fetched X tickets (status='OPEN', priority='null', category='null')`

5. What endpoint proves your sorting works?

   The endpoint `GET /api/tickets/paged?page=0&size=5&sortBy=createdAt&direction=desc` proves sorting works because it returns tickets ordered by `createdAt` in descending order.
