# Day 16 Ticket Refactor Rationale

## Files changed

- `src/main/java/com/example/assettracker/service/TicketService.java`
- `support-desk-ui/src/components/TicketFormWizard.jsx`
- `support-desk-ui/src/utils/ticketFormValidation.js`
- `support-desk-ui/src/utils/ticketFormValidation.test.js`
- `exercises/day16/docs/exercise-04-test-hardening-notes.md`

## Behaviour preserved

- Ticket endpoint URLs, request DTO names, and response shapes are unchanged.
- Missing tickets still raise `ResourceNotFoundException` with the same message.
- Create and update operations still trim text and uppercase priority and status on the backend.
- The ticket form keeps the same fields, default values, validation messages, success messages, and create/edit submission flow.
- Valid frontend payloads still contain trimmed text with the selected priority and status unchanged.

## Logic extracted

Backend lookup and normalization duplication was moved into the private `findTicketOrThrow`, `normalizeRequired`, `normalizePriority`, and `normalizeStatus` methods. Frontend validation, payload normalization, and label formatting were moved from the React component into `ticketFormValidation.js`.

## Maintainability improvement

The public service methods now describe the create and update workflows without repeating low-level lookup and string handling. The React component remains responsible for UI state and submission while pure utility functions own validation and normalization. Those rules can now be changed and tested without rendering the form.

## Verification performed

- `ticketFormValidation.test.js`: 5 tests passed, covering required fields, invalid priority, invalid status, payload normalization, and label formatting.
- `npm.cmd run lint`: passed.
- `npm.cmd run build`: passed with 47 modules transformed.
- `TicketFormWizard.test.jsx`: 3 tests passed, confirming required-field rendering, normalized submission, and saving state after the extraction. The complete frontend suite did not finish in this environment; its worker process stalled without output.
- The repository Maven wrapper failed before Maven started (`Cannot start maven from wrapper`). A cached Maven launcher returned successfully but emitted no test report, so it is not counted as backend test evidence.
- Live create, update, and missing-ticket HTTP requests were not run because no verified backend and database instance was available during the refactor.

## Remaining risks

The backend helper extraction is intentionally behavior-preserving, but backend unit tests and live HTTP regression checks are still needed in a configured environment. In particular, verify authenticated ticket creation, ticket update, and the missing-ticket error response. The frontend utility assumes its text fields are strings, matching the form state and existing API data contract.
