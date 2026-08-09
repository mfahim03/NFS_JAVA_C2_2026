# Day 16 Exercise 1 - AI Refactor Safety Checklist

## Scenario

Before asking an AI assistant to suggest code changes, you must decide what is safe to share and what must be protected.

## Task

Create a short checklist for your Support Desk Ticket project.

## Include

- What files are safe to share with AI.
- What files should not be shared.
- What secrets, tokens, connection strings or passwords must be removed.
- What behaviour must not change during the refactor.
- What tests or HTTP requests will prove the refactor is safe.

## Expected output

Submit a short checklist with 8 to 10 bullet points.

Short checklist (9 bullets):

- Files safe to share: non-sensitive service and utility classes, DTOs, controllers (for context), and unit tests (e.g., `src/main/java/.../service/*`, `src/test/java/*`).
- Files not to share: any file that contains secrets or credentials such as `src/main/resources/application*.properties` or `application.yml`, keystores, or CI pipeline secrets.
- Secrets to remove: API keys, OAuth client secrets, database connection strings, JWT signing keys, SSH private keys, and any tokens present in config or test fixtures.
- Sensitive code to avoid: code that implements proprietary algorithms, third‑party license keys, or external vendor credentials.
- Behavior that must NOT change: all REST endpoint signatures and response shapes, authentication/authorization flows, database schema and repository interfaces, and transaction semantics.
- Tests to run before/after: run the full unit and integration test suite (`./mvnw.cmd test`) and any existing end-to-end tests in `frontend/` or `support-desk-ui/`.
- HTTP requests to verify: execute representative requests from `requests/*.http` (or use `curl`/Postman) to confirm identical status codes and JSON for key endpoints.
- Proof of safety: provide passing test output and a short changelog summarizing each edit and why it is safe (1–2 lines per change).
- Risks to document: note possible impacts on lazy-loading, transaction boundaries, concurrency, and external integrations; list assumptions about missing context.
