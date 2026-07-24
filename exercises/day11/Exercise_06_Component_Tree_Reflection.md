# D11 Exercise 06 — Component Tree and Reflection

## Goal

Explain the React UI structure.

## Support Desk component tree

```text
App
└── Layout
    ├── AppHeader
    └── main (children)
        ├── Dashboard
        ├── ApiInfoCard
        │   ├── LoadingMessage
        │   └── ErrorMessage
        ├── TicketFilterPanel
        └── Ticket workspace
            ├── TicketList
            │   ├── PriorityBadge
            │   └── StatusBadge
            └── TicketDetail
                ├── PriorityBadge
                └── StatusBadge
```

`App` is the top-level component. It owns the application state and passes data
and event-handler functions to the child components. `Layout` provides the page
structure, while the smaller components each have one main responsibility.

## Reflection answers

### 1. Which component owns the selected ticket state?

The `App` component owns the selected ticket state. It stores
`selectedTicketId` with `useState`. It finds the selected ticket from the
filtered ticket list and passes the result to `TicketDetail`.

### 2. Which components receive props?

- `Layout` receives `children`.
- `ApiInfoCard` receives `loading`, `error`, and `apiInfo`.
- `LoadingMessage` and `ErrorMessage` receive a `message`.
- `TicketFilterPanel` receives the current search and filter values, plus
  handler functions for changing and clearing them.
- `TicketList` receives `tickets`, `selectedTicketId`, and `onSelectTicket`.
- `TicketDetail` receives the selected `ticket`.
- `PriorityBadge` receives `priority`.
- `StatusBadge` receives `status`.

### 3. What does `useEffect` do in the app?

`useEffect` runs once after `App` is first rendered. It calls `fetchApiInfo()` to
request public API information from `/api/v1/info`. When the request succeeds,
it stores the returned API information. When it fails, it stores an error
message. The cleanup flag prevents state updates after the component has been
unmounted.

### 4. What loading state was created?

The app starts with `apiLoading` set to `true`. While the request is running,
`ApiInfoCard` renders `LoadingMessage`, which shows “Loading API information…”
with an animated spinner. The loading state becomes `false` when the request
finishes.

### 5. What error state was created?

If the backend is stopped or the request fails, `apiError` stores a message
explaining that the Day 10 API could not be reached. `ApiInfoCard` then renders
`ErrorMessage` with “Backend unavailable” and tells the user to start Spring
Boot on port 8080 and refresh the page.

The ticket list also has an empty state. If no tickets match the active search
and filters, it displays “No tickets found” instead of an empty list.

### 6. What would change when connecting to the protected backend API later?

Local `sampleTickets` would be replaced
with ticket data fetched from the backend. The UI would also need to handle
`401 Unauthorized` responses for missing or invalid login details and
`403 Forbidden` responses when the logged-in user does not have permission.
Actions such as creating, updating, or deleting tickets could be shown or
hidden based on the user’s role.

## Submission

Submit this component tree and the reflection answers in Google Classroom.
