# Day 8 Exercise 5: Query Behaviour and Troubleshooting

## Objective

Test how your Support Desk Ticket API behaves when users send unusual, incorrect, or edge-case query requests.

## Log Evidence to Capture

When you run the unusual query tests, capture these log lines from the running app terminal:

- `Fetching tickets with filters - status=INVALID, priority=null, category=null`
- `Fetched 0 tickets...`
- `Fetching tickets with filters - status=null, priority=URGENT, category=null`
- `Fetching paged tickets - page=99, size=5, sortBy=createdAt, direction=asc`
- `Fetching paged tickets - page=0, size=100, sortBy=createdAt, direction=asc`
- `Fetching paged tickets - page=0, size=5, sortBy=unknownField, direction=asc`

These lines show the request values and the API's actual behaviour.


## Background

Real API users do not always send perfect requests.

They may:

* use the wrong status value
* request a page that has no data
* sort by the wrong field
* use a very large page size
* combine filters in a way your API does not fully support yet

As a backend developer, you must understand how your API behaves in these situations.

This exercise is not mainly about writing new features. It is about testing, observing, explaining, and thinking like a backend developer.

---

## Task

Add the following unusual query requests to your Day 8 `.http` file.

Run each request and record what happens.

You do not need to fix every issue today. The goal is to understand the current API behaviour and identify what could be improved later.

---

## Test 1: Invalid Status Value

```http
GET http://localhost:8080/api/tickets?status=INVALID
```

Observe:

* Does the API return an empty list?
* Does it return an error?
* What log message appears in the terminal?

---

## Test 2: Invalid Priority Value

```http
GET http://localhost:8080/api/tickets?priority=URGENT
```

Observe:

* Does your API support this priority?
* What response is returned?
* Should the API accept this value?

---

## Test 3: Page Number with No Records

```http
GET http://localhost:8080/api/tickets/paged?page=99&size=5
```

Observe:

* Does the API crash?
* Does it return an empty page?
* What does the page metadata show?

---

## Test 4: Very Large Page Size

```http
GET http://localhost:8080/api/tickets/paged?page=0&size=100
```

Observe:

* Does the API allow this?
* Should real APIs allow very large page sizes?
* What could go wrong if the page size is too large?

---

## Test 5: Unknown Sort Field

```http
GET http://localhost:8080/api/tickets/paged?page=0&size=5&sortBy=unknownField&direction=asc
```

Observe:

* Does the API return data?
* Does the sorting seem meaningful?
* Should the backend validate allowed sort fields?

---

## Test 6: Combined Filters

```http
GET http://localhost:8080/api/tickets?status=OPEN&priority=HIGH
```

Observe:

* Does your API apply both filters?
* Does it only apply one filter?
* Is this behaviour clear to the API user?

---

## Reflection Questions

Answer the following questions:

1. What happened when you used an invalid status?
2. What happened when you used an invalid priority?
3. What happened when you requested page 99?
4. What happened when you used an unknown sort field?
5. Why should an API limit page size?
6. Why should an API validate sort fields?
7. Does your current API support combined filters?
8. What log messages helped you understand what happened?
9. Which behaviour would you improve in a future version?

---

## Expected Learning

By the end of this exercise, you should understand that API development is not only about successful requests.

A good backend developer must also think about:

* invalid input
* edge cases
* unexpected query values
* clear API behaviour
* useful logs
* future improvements

---

## Submission

Submit:

1. Updated Day 8 `.http` file
2. Results from at least five unusual query requests
3. Short answers to the reflection questions
4. (Optional) What you would improve in the API later.

---

## Results

### Test 1: Invalid Status Value
GET http://localhost:8080/api/tickets?status=INVALID

- Response: empty list `[]`.
- Logs: `Fetching tickets with filters - status=INVALID, priority=null, category=null` and `Fetched 0 tickets...`.
- Behaviour: the API does not error; it treats unknown status like no matching tickets.

### Test 2: Invalid Priority Value
GET http://localhost:8080/api/tickets?priority=URGENT

- Response: empty list `[]`.
- Logs: `Fetching tickets with filters - status=null, priority=URGENT, category=null` and `Fetched 0 tickets...`.
- Behaviour: unknown priority is accepted as a filter value but returns no matches.

### Test 3: Page Number with No Records
GET http://localhost:8080/api/tickets/paged?page=99&size=5

- Response: an empty page object with no content.
- Behaviour: the API does not crash; it returns a valid empty page.
- Expected page metadata: `totalElements` and `totalPages` reflect the current dataset, with `content: []`.

### Test 4: Very Large Page Size
GET http://localhost:8080/api/tickets/paged?page=0&size=100

- Response: allowed by the API.
- Behaviour: there is no page-size limit in the current implementation.
- Concern: very large page sizes can increase memory and response time, so real APIs should enforce a maximum.

### Test 5: Unknown Sort Field
GET http://localhost:8080/api/tickets/paged?page=0&size=5&sortBy=unknownField&direction=asc

- Response: the API still returns data.
- Behaviour: the backend does not validate the sort field, so the database sorts by a field that may not exist. The order may be undefined or meaningless.

### Test 6: Combined Filters
GET http://localhost:8080/api/tickets?status=OPEN&priority=HIGH

- Response: returns tickets filtered by only one of the query parameters.
- Behaviour: the current implementation uses `if / else if / else if`, so only the first matching filter is applied (status, then priority, then category).
- User expectation: combined filters are not fully supported yet.

## Reflections

1. What happened when you used an invalid status?

   The API returned an empty list and did not throw an error. It logged the invalid status and showed `Fetched 0 tickets...`.

2. What happened when you used an invalid priority?

   The API behaved the same as invalid status: no matches and an empty result, without validation failure.

3. What happened when you requested page 99?

   The API returned a valid empty page instead of crashing. The page metadata should show zero or the actual totals with no content.

4. What happened when you used an unknown sort field?

   The API still returned data. Because there is no validation on `sortBy`, sorting by a nonexistent field is accepted, but the order is not guaranteed.

5. Why should an API limit page size?

   To prevent large responses that consume too much memory, slow down the server, and make the client wait longer. A maximum page size keeps the API stable and predictable.

6. Why should an API validate sort fields?

   To avoid meaningless or unexpected order and to give users clear feedback if they request an unsupported sort field.

7. Does your current API support combined filters?

   Not fully. It only applies one filter at a time because the service uses `if / else if / else if`.

8. What log messages helped you understand what happened?

   The logs show the filter values and the number of tickets fetched, for example:
   - `Fetching tickets with filters - status=OPEN, priority=null, category=null`
   - `Fetched 0 tickets ...`
   - `Fetching paged tickets - page=99, size=5, sortBy=createdAt, direction=asc`

9. Which behaviour would you improve in a future version?

   I would improve combined filter support, validate sort fields, and add a maximum page size limit.
