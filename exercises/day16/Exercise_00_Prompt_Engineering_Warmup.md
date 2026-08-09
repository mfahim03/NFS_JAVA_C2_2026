# Day 16 Exercise 0 - Prompt Engineering Warm-Up

## Purpose

Before using AI to change code, practise writing a prompt that gives enough context and constraints.

## Scenario

You are working on your Support Desk Ticket project. You want AI to help you improve a service class, but you do not want it to change endpoint behaviour.

## Task

Write two prompts:

1. A poor prompt that is too vague.
2. A better developer prompt using this structure:

```text
Context:
Task:
Constraints:
Expected output:
Tests:
Review:
```

## Requirements for the better prompt

Your better prompt must tell the AI:

- what project you are working on
- what file or method you want help with
- what must not change
- what output you want
- what tests or checks you expect
- what risks the AI should mention

## Submission

Submit both prompts and a short explanation of why the second prompt is safer.

### 1) Poor prompt (too vague)

Help me improve the service class that handles tickets. Make it cleaner and faster.

### 2) Better developer prompt (structured)

Context:
- Project: Support Desk Ticket project (Java Spring Boot) in this repository.
- Target code: the service class that implements ticket business logic (for example, `TicketService` in `src/main/java/.../service/TicketService.java`).

Task:
- Review and refactor the specified service class to improve readability, maintainability, and performance without changing any public API or endpoint behavior.
- Apply small, well-scoped improvements: extract private helper methods, add meaningful variable/method names, reduce duplication, and improve exception handling.

Constraints:
- Do NOT change controller classes, request/response DTOs, or any REST endpoint signatures or semantics.
- Do NOT change the database schema, entity field names, or repository interfaces.
- Any changes must preserve existing behavior and side effects (including order of operations and transactions).
- Keep changes minimal and focused; prefer clear, small refactors over large rewrites.

Expected output:
- A patch (diff) or a set of file edits showing the refactorings to the service class only.
- A concise summary of each change and why it was made (1–2 sentences per change).

Tests:
- Run existing unit and integration tests and confirm they all pass: `./mvnw.cmd test`.
- Add or update unit tests only if new behavior is introduced; otherwise ensure the unchanged tests still pass.
- Manually verify that the affected endpoints return the same HTTP status codes and JSON shapes for existing requests.

Review:
- List any assumptions you made about missing context or unclear behavior.
- Flag any risky changes or places where behavior might subtly change (e.g., lazy-loading, transaction boundaries, exception translation).

Risks to mention:
- Potential behavioral changes related to transaction boundaries, lazy-loading, or exception mapping.
- Performance regressions if refactoring introduces additional allocations or blocking calls.
- Concurrency issues if shared mutable state is altered.

### Short explanation: why the second prompt is safer

The structured prompt provides the project context and the exact file/class to change, enumerates hard constraints (especially "do NOT change endpoints"), and specifies expected outputs and test checks. This forces the AI to preserve API behavior, run tests, and report risks and assumptions—reducing the chance of unintended breaking changes compared with the vague prompt.