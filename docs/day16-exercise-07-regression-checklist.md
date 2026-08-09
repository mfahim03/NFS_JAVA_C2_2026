# Day 16 Exercise 07: AI Regression Check

## Regression checklist

| # | Check | Result and evidence |
|---|---|---|
| 1 | Login | Code review passed: `/login` still calls `POST /api/auth/login`. Live login remains a manual check. |
| 2 | Protected ticket list | Passed: the protected-route test confirms logged-out users are redirected to login and authenticated users can access protected content. The ticket route remains `/app/tickets`. |
| 3 | Create ticket form | Passed: component tests confirm required-field errors, normalized submission, and saving state. The route remains `/app/tickets/new`. |
| 4 | Edit ticket form | Code review passed: `/app/tickets/:ticketId/edit` still loads the ticket and submits through `updateTicket`. Live editing remains a manual check. |
| 5 | API request headers | Code review passed: JSON requests include `Content-Type: application/json`, and authenticated requests include `Authorization: Bearer <token>`. |
| 6 | Validation rules | Passed: utility tests cover required text fields, invalid priority, invalid status, and payload normalization. Existing messages are preserved. |
| 7 | 401 handling | Code review passed for error propagation: the API message is thrown to the caller. A live expired-token check is still required. |
| 8 | 403 handling | Code review passed for error propagation: the API message is thrown to the caller. A live insufficient-permission check is still required. |
| 9 | Unit tests | Passed: 3 focused test files containing 10 tests completed successfully. |
| 10 | E2E or manual smoke test | Existing Playwright smoke test covers login, protected tickets, and ticket creation. It requires a running frontend, backend, and database, so it was not executed in this environment. |

## Risk identified by AI review

Moving payload creation out of `TicketFormWizard` could accidentally stop trimming text fields or omit `priority` or `status`. That would change the request body even though the form still looked correct.

## Behaviour confirmation

`TicketFormWizard.test.jsx` confirmed that a valid form still submits this normalized payload:

```json
{
  "title": "Cannot access email",
  "description": "The mailbox rejects the user password.",
  "category": "Email",
  "priority": "HIGH",
  "status": "OPEN"
}
```

Verification command:

```powershell
node node_modules\vitest\vitest.mjs run src\components\ProtectedRoute.test.jsx src\components\TicketFormWizard.test.jsx src\utils\ticketFormValidation.test.js --maxWorkers=1
```

Result: 3 test files passed, with 10 tests passing.
