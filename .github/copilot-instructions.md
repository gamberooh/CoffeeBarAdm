# Copilot instructions for CoffeeBarAdm

This repository is split into two app roots that are intentionally separate: `frontend/` is the Angular client and `backend/` is the Bun + Express + MongoDB API. Keep changes scoped to the correct side of the stack and preserve the existing boundary between UI and API logic.

## Build, test, and type-check commands

### Frontend (Angular)
- Install dependencies: `cd frontend && bun install`
- Start the app locally: `cd frontend && bun run start`
- Build the app: `cd frontend && bun run build`
- Run the full frontend test suite: `cd frontend && bun run test -- --watch=false`
- Run a single Angular spec: `cd frontend && bun run ng test --watch=false --include src/app/app.spec.ts`

### Backend (Bun + Express)
- Install dependencies: `cd backend && bun install`
- Type-check the backend: `cd backend && bun run typecheck`
- Start the API server: `cd backend && bun run src/server.ts`

## High-level architecture

- `frontend/src/app/`: Angular app root and route config (`app.ts`, `app.routes.ts`, `app.config.ts`)
- `frontend/src/`: UI shell, styles, and app bootstrap (`main.ts`, `index.html`, `styles.css`)
- `backend/src/server.ts`: bootstraps dotenv, Express, MongoDB connection, middleware setup, route loading, and graceful shutdown
- `backend/src/config/`: infrastructure and app wiring (`db.ts`, `middleware.ts`, `routerLoader.ts`)
- `backend/src/router/`: per-domain Express routers; the loader auto-registers `*.router.ts` files under `/api/<module>`
- `backend/src/controller/`: HTTP endpoint handlers
- `backend/src/service/`: business logic and data access coordination
- `backend/src/model/`: Mongoose schemas and DTO models
- `backend/src/model/dto/`: request/response DTOs and nested schema definitions

The backend is intentionally route-driven: new API modules are typically added under `backend/src/router`, then wired to the corresponding controller/service code. `routerLoader.ts` keeps route registration automatic instead of hard-coding every endpoint in `server.ts`.

## Key conventions and project-specific patterns

### Frontend conventions
- Prefer standalone Angular components; do not add `standalone: true` inside decorators because the default is already enabled in Angular v20+
- Use signals for local state and `computed()` for derived values
- Prefer `input()`/`output()` over class field decorators
- Use `ChangeDetectionStrategy.OnPush` in component decorators
- Use native template control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, and `*ngSwitch`
- Use class/style bindings instead of `ngClass` / `ngStyle`
- Use the `async` pipe for observable-driven templates
- Use `providedIn: 'root'` for singleton services and prefer `inject()` over constructor injection
- Use `NgOptimizedImage` for static images; it does not work with inline base64 assets
- Keep accessibility in the codebase: semantic markup, focus handling, contrast, and WCAG AA expectations should be considered part of normal feature work
- Avoid assuming browser globals such as `new Date()` are available in templates or component logic without proper environment handling

### Backend conventions
- `backend/src/config/middleware.ts` is the canonical place for security, CORS, and rate limiting setup
- `backend/src/config/db.ts` owns the MongoDB connection string and connection lifecycle; keep DB config changes there instead of spreading connection logic across routers or controllers
- API responses are intentionally mapped to DTO shapes; the beverage service converts Mongoose `_id` values to API-friendly `id` values rather than exposing raw persistence details
- Validation and ObjectId checks should happen in the service layer before update/delete calls, matching the current `BeverageService` style

## Repo-level guidance

- Treat the Angular frontend and the Express backend as separate build/runtime contexts; do not assume a single root command starts both apps.
- Use the project-local tooling already checked in: frontend uses Angular CLI, backend uses Bun, and Mongo is configured through environment variables in the app runtime.
- When editing frontend code, keep it aligned with the Angular conventions already codified in the repo-level AI guidance (`signals`, standalone components, accessible templates, minimal component scope).
