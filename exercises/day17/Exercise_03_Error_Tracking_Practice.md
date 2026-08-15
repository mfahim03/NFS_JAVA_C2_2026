# D17 Exercise 03 — Error Tracking

## Goal

Trace errors using HTTP status and logs.

## Tasks

Trigger and document:

1. `401 Unauthorized`
2. `403 Forbidden`
3. `400 Bad Request`
4. `404 Not Found`
5. `409 Conflict`

## For each error, record

| Error | Request made | Why it happened | Where you saw it in logs |
|---|---|---|---|
| `401 Unauthorized` | `GET /api/v1/assets` with no `Authorization` header | The endpoint requires an authenticated user. | `RequestTimingFilter` logs the request with `status=401`; no credentials are written to the log. |
| `403 Forbidden` | `POST /api/v1/assets` with a valid `USER` token | Creating an asset is restricted to the `ADMIN` role. | `RequestTimingFilter` logs the request with `status=403`. |
| `400 Bad Request` | `GET /api/v1/assets/paged?page=-1&size=5` with a valid token | A page number cannot be negative. | `RequestTimingFilter` logs the request with `status=400`; the response identifies the invalid request without exposing secrets. |
| `404 Not Found` | `GET /api/v1/assets/not-a-real-id` with a valid token | No asset exists for the supplied ID. | `RequestTimingFilter` logs the request with `status=404`; the exception handler produces the error response. |
| `409 Conflict` | `POST /api/v1/assets` using an existing `assetTag` or `serialNumber` | The unique asset tag/serial-number constraint rejects duplicates. | `RequestTimingFilter` logs the request with `status=409`; `DuplicateResourceException` identifies the conflict. |

Safe log format used for every request:

```text
requestId=ab12cd34 method=GET path=/api/v1/assets status=401 durationMs=7
```

## Submission

Submit your completed table.
