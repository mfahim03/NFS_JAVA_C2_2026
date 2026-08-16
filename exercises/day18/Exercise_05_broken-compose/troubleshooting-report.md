# Docker Troubleshooting Report

## Part A: Start the broken stack

The broken stack cannot start successfully as written. Compose reports that the frontend depends on an undefined service named `api`. Its backend and frontend build contexts also resolve to the wrong directories, so no usable application containers are created. MongoDB may be created before a build failure in some Compose versions, but the final stack is not healthy.

Commands used:

```powershell
docker compose -f compose.broken.yml --env-file .env.broken config
docker compose -f compose.broken.yml --env-file .env.broken ps
```

- Running: none reliably; MongoDB may briefly run depending on when Compose stops.
- Unhealthy: the backend cannot reach a healthy state.
- Exited/not created: backend and frontend.

## Part B: Investigate the backend

1. **What error did you see?** The broken configuration points MongoDB at `localhost:27017`. From the backend container, that address has no MongoDB server, so connection attempts fail and the backend remains unhealthy.
2. **Which setting is wrong?** `SPRING_MONGODB_URI` does not match the application property, the URI uses `localhost`, and `JWT_SECRET: ${APP_JWT_SECRET}` uses a mismatched variable name. `APP_JWT_EXPIRATION_MINUTES` is also not consumed by this application. The `docker` profile is unnecessary because the project has no Docker-specific properties file.
3. **What did you change?** The fixed file supplies `MONGODB_URI=mongodb://mongo:27017/asset_tracker_db`, `JWT_SECRET`, and `JWT_EXPIRATION_MINUTES`.
4. **Why does it work?** Compose DNS resolves the `mongo` service name, and Spring Boot receives the exact environment keys referenced by `application.properties`.

Diagnostic command:

```powershell
docker compose -f compose.broken.yml --env-file .env.broken logs backend
```

## Part C: Investigate the frontend

1. **Did the frontend page load?** Not from the original broken file because `../frontend` is the wrong build context relative to this lab directory.
2. **Did the login API call work?** No. Even after correcting only the build context, the backend is unavailable because of its MongoDB configuration.
3. **Where was the problem?** The initial failure is in Compose configuration. The frontend has an invalid `api` dependency, its build context is wrong, and the backend configuration prevents API requests from succeeding. The fixed Nginx proxy correctly targets `backend`.
4. **What proves it?** `docker compose config` exposes the undefined dependency and resolved paths; `docker compose ps` shows service health; `docker compose logs backend` shows the database failure; and `docker compose logs frontend` shows Nginx requests.

The fixed frontend build context is `../../../support-desk-ui`, its dependency is `backend`, and its health check uses Alpine's available `wget` command instead of unavailable `curl`.

## Part D: Fixed Compose file

The corrected configuration is in `compose.fixed.yml`. It uses:

- `mongo:27017` for backend-to-MongoDB communication;
- `backend:8080` through the existing Nginx proxy;
- correct build contexts relative to the lab directory;
- the correct environment-variable names;
- non-conflicting host ports `27019`, `8081`, and `5174`;
- valid service dependencies and health-check commands.

Run it with:

```powershell
Copy-Item .env.broken.example .env.broken
docker compose -f compose.fixed.yml --env-file .env.broken up --build
docker compose -f compose.fixed.yml --env-file .env.broken ps
```

## Part E: Reset and rerun

1. **Difference between `down` and `down -v`:** `down` removes containers and the Compose network but preserves named volumes. `down -v` removes the named volumes too.
2. **Why does MongoDB data behave differently?** MongoDB stores its database under `/data/db`, backed by `mongo_lab_data`. Preserving that volume preserves records across container replacement; deleting it removes the stored database.
3. **When should `down -v` be used before a demo?** Use it when the demo needs a clean, predictable database and losing the current lab data is acceptable.

## Part F: Problems, fixes, and evidence

### Problem 1

Symptom: Dockerfiles cannot be found during the build.

Command used: `docker compose -f compose.broken.yml --env-file .env.broken config`

Log or evidence: Build contexts are resolved relative to the Compose file. `..` points to `exercises/day18`, and `../frontend` does not contain the required Support Desk UI.

Root cause: Incorrect relative build contexts.

Fix: Use `../../..` for the backend and `../../../support-desk-ui` for the frontend.

Why the fix works: Those directories contain the correct Dockerfiles and source trees.

### Problem 2

Symptom: Backend does not become healthy.

Command used: `docker compose -f compose.broken.yml --env-file .env.broken logs backend`

Log or evidence: The MongoDB URI contains `localhost`, and environment names do not match `application.properties`.

Root cause: Container-local `localhost` and misnamed configuration variables.

Fix: Use `MONGODB_URI=mongodb://mongo:27017/asset_tracker_db`, `JWT_SECRET`, and `JWT_EXPIRATION_MINUTES`.

Why the fix works: Service-name DNS reaches MongoDB and Spring receives its expected settings.

### Problem 3

Symptom: Compose rejects the frontend dependency or reports the frontend unhealthy.

Command used: `docker compose ... ps` and `docker compose ... logs frontend`.

Log or evidence: `api` is not a defined service, and `curl` is unavailable in the Nginx Alpine image.

Root cause: Wrong dependency name and health-check executable.

Fix: Depend on `backend` and use `wget -q --spider http://localhost/`.

Why the fix works: Compose follows an existing healthy service and executes a command included in the image.

## Reflection questions

1. **Why use `mongo:27017` rather than `localhost:27017`?** Each container has its own loopback interface. The service name `mongo` resolves to the MongoDB container on the Compose network.
2. **Why is the JWT secret required?** The backend uses it to sign and verify authentication tokens. In this project the correct variable is `JWT_SECRET`; the broken file's `APP_JWT_SECRET` reference is intentionally mismatched.
3. **Why is healthy different from running?** Running only means the container process exists. Healthy means its configured health command succeeds and the application is ready to serve requests.
4. **Why inspect logs first?** Logs provide evidence of the failing component and root exception, preventing unrelated or speculative changes.
5. **Why is this useful for capstone demos?** It helps isolate build, networking, configuration, readiness, and persisted-data failures quickly and repeatably.

## Final verification

- [/] Frontend loads at `http://localhost:5174`
- [/] Login works
- [/] Backend health check works
- [/] Backend readiness check works
- [/] MongoDB container is running
- [/] Backend can connect to MongoDB
- [/] Data can be reset with `down -v`

These runtime boxes must only be checked after running the fixed stack and observing each result.
