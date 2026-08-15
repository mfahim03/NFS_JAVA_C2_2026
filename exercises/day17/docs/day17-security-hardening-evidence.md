# Day 17 Security Hardening Evidence

Complete this document during the lab.

## 1. Authentication evidence

Test performed:

```http
GET /api/v1/assets without token
```

Expected result:

```text
401 Unauthorized
```

Repeatable evidence:

```http
GET /api/v1/assets
```

Spring Security returns `401 Unauthorized` before the controller runs. The timing filter records only request metadata, for example:

```text
requestId=ab12cd34 method=GET path=/api/v1/assets status=401 durationMs=7
```

## 2. Authorisation evidence

Test performed:

```text
Non-admin user tries admin-only create/update action.
```

Expected result:

```text
403 Forbidden
```

Repeatable evidence: authenticate as a `USER`, then send `POST /api/v1/assets` with its bearer token. Spring Security returns `403 Forbidden` because that operation requires `ADMIN`; the timing log records `status=403` without recording the token.
```

## 3. Duplicate protection evidence

Test performed:

```text
Create asset using an existing assetTag or serialNumber.
```

Expected result:

```text
409 Conflict
```

Repeatable evidence: submit the duplicate request in `requests/day17.http` after `LAP-2026-001` has been seeded. `AssetService` raises `DuplicateResourceException`, and the API responds with `409 Conflict`.
```

## 4. Input validation evidence

Test performed:

```text
Send invalid pagination or invalid required fields.
```

Expected result:

```text
400 Bad Request
```

Repeatable evidence: call `/api/v1/assets/paged?page=-1&size=5` with a valid token. Validation rejects the negative page and returns `400 Bad Request`.
```

## 5. Logging evidence

Confirm logs do not show:

- Passwords
- JWT tokens
- Full Authorization headers
- Secret keys

The `RequestTimingFilter` emits only a generated request ID, HTTP method, path, status, and elapsed time:

```text
requestId=ab12cd34 method=GET path=/api/readiness status=200 durationMs=5
```

It does not read request bodies or headers, so passwords, JWTs, and Authorization values are not included in this log statement.
```

## 6. Docker secret hygiene evidence

Confirm these files are not committed:

- `.env`
- `secrets/`
- private key files

`.env`, `.env.*`, `secrets/`, and common private-key formats are ignored by `.gitignore`; `.env.example` is deliberately retained as a non-secret template. Verify locally with `git check-ignore .env` and `git ls-files .env` (which should print no tracked `.env` file).
