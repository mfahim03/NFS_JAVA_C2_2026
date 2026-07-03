# Day 5 Exercise 5.1: HTTP Investigation

## Topic
REST request and response behaviour

## Objective
In this exercise, you will inspect how a REST API responds to different types of requests. The purpose is to understand the HTTP conversation before writing JavaScript code.

By the end of this exercise, you should be able to identify:

- HTTP method
- Endpoint URL
- Status code
- Response body type
- Whether the request was successful or failed
- The reason for the success or failure

---

## Scenario
You have been given access to a mock training API. The API contains course offering data.

Your task is to test several API requests and record what happens.

---

## Tools
Use one of the following:

- VS Code REST Client using the provided `.http` file
- Postman
- Insomnia
- Thunder Client
- Browser, for simple `GET` requests only

---

## Instructions
Test at least five different API requests.

Your investigation must include:

1. One successful request that returns a list
2. One successful request that returns one item
3. One request for an item that does not exist
4. One successful create request
5. One failed create request

For each request, record the following information:

| Method | URL | Status Code | Response Type | What Happened? |
|---|---|---:|---|---|
| GET | http://localhost:8081/api/course-offerings | 200 | List | Returned all course offerings as a JSON array. This is a successful list response from the API. |
| GET | http://localhost:8081/api/course-offerings/CO001 | 200 | Single object | Returned one course offering object for the requested ID CO001. The request succeeded and returned the matching item. |
| GET | http://localhost:8081/api/course-offerings/C999 | 404 | Error object | The requested course offering does not exist, so the API returned a not-found error object with a message. |
| POST | http://localhost:8081/api/course-offerings | 201 | Single object | Created a new course offering successfully and returned the created object with a generated ID. |
| POST | http://localhost:8081/api/course-offerings | 400 | Error object | Validation failed because required fields were missing or invalid, and the API returned an error object with details. |

---

## Questions and Answers

1. Which request returned a successful list response?
   - `GET http://localhost:8081/api/course-offerings` returned the successful list response with status `200`.
2. Which request returned a not-found response?
   - `GET http://localhost:8081/api/course-offerings/C999` returned a `404` not-found response.
3. Which request returned a validation error?
   - `POST http://localhost:8081/api/course-offerings` with invalid course data returned a `400` validation error.
4. What is the difference between a successful response and an error response?
   - A successful response uses a `2xx` status code and returns the requested data or the created resource. An error response uses a `4xx` or `5xx` status code and returns an error object explaining why the request failed.
5. Why is the status code important for frontend developers?
   - The status code tells the frontend whether the request succeeded or failed, so the UI can handle results correctly, show success messages, or display errors to the user.

## Reflection

After this exercise, I understand better how REST APIs use HTTP methods and status codes to communicate request results. I also see how a successful response is different from a validation failure or not-found response, which helps frontend code decide how to react.

## Response Type Guide
Use one of these terms in your table:

- List
- Single object
- Error object
- Empty response

---

## Questions to Answer
After completing your table, answer the following questions:

1. Which request returned a successful list response?
2. Which request returned a not-found response?
3. Which request returned a validation error?
4. What is the difference between a successful response and an error response?
5. Why is the status code important for frontend developers?

---

## Restrictions

- Do not write JavaScript for this exercise.
- Do not modify the mock API.
- Do not only copy the response body. You must explain what the response means.
- Do not submit screenshots only. Your findings must be written in a table.

---

## Submission
Submit one Markdown file or document containing:

1. Your completed investigation table
2. Your answers to the five questions
3. One short reflection: what is one thing you understand better about REST after this exercise?

---

## Completion Checklist
Before submitting, check that you have:

- [ ] Tested at least five requests
- [ ] Included at least one successful list request
- [ ] Included at least one not-found request
- [ ] Included at least one failed create request
- [ ] Recorded the status code for every request
- [ ] Explained what each response means
