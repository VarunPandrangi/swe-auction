# prompts.md — Online Auction System for Students

## Agentic AI Sprint Prompts for Implementing `plan_v4.md`

> **This file is the single operational playbook for implementing the entire Online Auction System defined in `plan_v4.md`.** It contains one prompt per sprint, designed to be copy-pasted into an agentic AI coding tool (Claude Code, Claude in an IDE, GPT Codex, Google Antigravity, Cursor, Windsurf, or any comparable agent). Each prompt is self-contained, references `plan_v4.md` as the authoritative source of truth, and gives the agent everything it needs to complete that sprint without guessing.
>
> **The prompts are written to work equally well for a top-tier model (e.g. Claude Opus 4.7) and a smaller model (e.g. GPT-5.4 mini).** They are explicit, exhaustive, numbered, and prescriptive. If the agent is smart, the prompt is complete; if the agent is weak, the prompt still forces it down the right path.

---

## 0. How to Use This File

### 0.1 Agent-Facing Rules (applies to every sprint prompt)

Every sprint prompt begins with the same standing directive: **"Before you write a single line of code, open `plan_v4.md` at the repository root and read it end-to-end."** This is non-negotiable. The plan is the contract; this prompts file is the execution order.

When a sprint prompt and `plan_v4.md` appear to conflict, **`plan_v4.md` wins every time**. If the agent detects a conflict, it must stop, surface the conflict to the human in its response, and ask before proceeding.

The agent must:

1. Read `plan_v4.md` fully at the start of every sprint — not just skim, not just grep, the whole file. The plan is ~1,100 lines and contains edge cases, glossary entries, and risk mitigations that only make sense in full context.
2. Treat Section 12 (Explicitly Out of Scope) as a hard wall. Never implement anything listed there, no matter how tempting.
3. Treat the Glossary (Section 13) as authoritative vocabulary. Names like `AWARDED`, `EXTENDED`, `proxy floor`, and `rank signal` are contract terms; do not rename them.
4. Treat the Risk Register (Section 11) as a checklist — each risk has a listed mitigation that must appear in the code.
5. Never invent requirements. If `plan_v4.md` does not specify something, either (a) infer from adjacent sections with explicit reasoning in a comment, or (b) ask the human.
6. Never skip the Definition of Done in each sprint.

### 0.2 Branching Strategy

The team is 3–4 developers. Branches follow this convention:

| Branch prefix | When to use                        |
| ------------- | ---------------------------------- |
| `feat/`       | A new feature or sprint slice      |
| `fix/`        | A bug fix                          |
| `refactor/`   | Non-behavioural code restructuring |
| `chore/`      | Tooling, CI, dependencies, docs    |
| `test/`       | Test-only additions                |

Every sprint below lists its branch name. Never work on `main` directly. Every branch is opened from the latest `develop`, and every PR targets `develop`. `develop` is merged to `main` only at the end of each sprint's demo.

### 0.3 Linear Execution Map — Sprint Order

Every sprint is **one branch**. Sprints run **strictly sequentially**: finish → review → merge to `develop` → start the next one. Never two sprints in flight at the same time. This eliminates merge-conflict risk.

```
Sprint  0: Project Bootstrap & Foundations  →  branch `chore/sprint-0-bootstrap`
Sprint  1: Auth & Users Schema  →  branch `feat/sprint-1-schema`
Sprint  2: Authentication Endpoints  →  branch `feat/sprint-1-auth`
Sprint  3: Users, Tenants & Profiles  →  branch `feat/sprint-1-users-tenants`
Sprint  4: RBAC Middleware  →  branch `feat/sprint-1-rbac`
Sprint  5: Auction Engine Schema  →  branch `feat/sprint-2-schema`
Sprint  6: Auction Lifecycle & Scheduling  →  branch `feat/sprint-2-auction-core`
Sprint  7: Bid Submission Pipeline (Forward)  →  branch `feat/sprint-2-bid-pipeline`
Sprint  8: Auction Image Upload  →  branch `feat/sprint-2-image-upload`
Sprint  9: Realtime & Notifications Schema  →  branch `feat/sprint-3-schema`
Sprint 10: Socket.IO Realtime Infrastructure  →  branch `feat/sprint-3-realtime`
Sprint 11: Private Auctions (Codes, Links, Invites)  →  branch `feat/sprint-3-private-auctions`
Sprint 12: Notification Service & Email Fallback  →  branch `feat/sprint-3-notifications`
Sprint 13: Watchlist  →  branch `feat/sprint-3-watchlist`
Sprint 14: Next.js Frontend — Auctions & Inbox  →  branch `feat/sprint-3-web`
Sprint 15: Reverse Auction Format  →  branch `feat/sprint-4-reverse`
Sprint 16: Sealed-Bid Auction Format  →  branch `feat/sprint-4-sealed`
Sprint 17: Dutch Auction Format  →  branch `feat/sprint-4-dutch`
Sprint 18: Frontend — Multi-Format Wizard  →  branch `feat/sprint-4-web-formats`
Sprint 19: Search, Proxy & Reviews Schema  →  branch `feat/sprint-5-schema`
Sprint 20: Proxy Bidding (Forward + Reverse)  →  branch `feat/sprint-5-proxy-bidding`
Sprint 21: Search & Filters  →  branch `feat/sprint-5-search`
Sprint 22: Reviews Module  →  branch `feat/sprint-5-reviews`
Sprint 23: Public Profile & Re-list Failed Auctions  →  branch `feat/sprint-5-relist-and-profile`
Sprint 24: Admin Core (Layout, Guards, Audit Log Viewer)  →  branch `feat/sprint-6-admin-core`
Sprint 25: Suspensions & Account Deletion  →  branch `feat/sprint-6-suspensions-deletion`
Sprint 26: Admin Reports & Analytics  →  branch `feat/sprint-6-reports`
Sprint 27: Review Moderation & Force-Cancel UI  →  branch `feat/sprint-6-moderation`
Sprint 28: Security Hardening (Rate Limits, TLS, Sanitisation)  →  branch `chore/sprint-7-security`
Sprint 29: Performance & Load Tests  →  branch `perf/sprint-7-load-and-cache`
Sprint 30: Observability (Logging, Metrics, Health)  →  branch `chore/sprint-7-observability`
Sprint 31: Docs, Deployment & Runbook  →  branch `chore/sprint-7-docs-and-deploy`
```

Each sprint below is self-contained: one branch name, one prompt, one Definition of Done. If a developer or AI agent wants to know "what do I do next," the answer is always "the next sprint in the list above."

**Important — two sprint numbering systems:**

- The sprint numbers 0–31 above are the **execution order in this prompts.md**.
- `plan_v4.md` Section 9 has its own sprint numbering (Sprint 1 through Sprint 7), which groups related work together. Inside each sprint's prompt body, when you see a reference like "Sprint 3 plugs into this" or "handled in Sprint 5," that always refers to the **`plan_v4.md` Section 9 sprint groupings**, not the sprint numbers in this file.
- Each sprint heading below tells you which `plan_v4.md` legacy group it belongs to, so the mapping is always explicit.

**Repo**: `https://github.com/VarunPandrangi/swe-auction.git` — `plan_v4.md` is committed at the root. Clone it and read the plan before starting any sprint.

### 0.4 Pull Request Discipline (zero-conflict recipe)

1. **Rebase, don't merge.** Before opening a PR, run `git fetch origin && git rebase origin/develop`. Resolve any conflicts locally. Force-push your branch.
2. **Small PRs, frequent PRs.** Each sprint's sub-branch should open a PR at a natural seam, not after 20 files of work.
3. **One PR, one reviewer, one topic.** Never bundle unrelated changes.
4. **Schema changes go first.** If you need a Prisma schema change, open that PR before any code PR that depends on it. Merge it. Rebase.
5. **No `any` types allowed through review.** TypeScript strict mode is on from Sprint 0.
6. **CI must be green.** Unit tests, integration tests, and `tsc --noEmit` pass before merge.

### 0.5 Prompt Template (what each sprint block looks like)

Every sprint block has the following fixed structure so the agent knows where to look:

- **Sprint Number & Title**
- **Branch Name(s)** — exactly as to be typed into `git checkout -b`
- **Preamble** — the fixed "read `plan_v4.md` first" directive
- **Context Recap** — what has been built before; what the agent should assume exists
- **Goal** — one paragraph, non-ambiguous
- **In Scope (with `plan_v4.md` section references)**
- **Out of Scope for this sprint (explicit)**
- **Linear Execution Plan** — branches listed in strict sequential order
- **Step-by-Step Implementation Instructions** — numbered, sequential, copy-pasteable
- **Edge Cases the Agent Must Handle** — direct from `plan_v4.md`
- **Tests to Write (mandatory)**
- **Definition of Done**
- **Handoff to Next Sprint** — what artefacts the next sprint depends on

---

# SPRINT 0 — Project Bootstrap & Foundations

> **This sprint is not listed in `plan_v4.md` Section 9 because it covers pre-Sprint-1 scaffolding. It must be completed before any feature work begins. One developer does this; everyone else waits.**

### Branch

`chore/sprint-0-bootstrap`

### Execution Mode

**Linear, single branch.** This is a blocking sprint. One person completes it; the next sprint starts only after this branch is merged.

### Prompt

```
ROLE: You are a senior full-stack engineer setting up a brand-new monorepo for a production-grade online auction platform.

PRIMARY DIRECTIVE:
Open `plan_v4.md` at the repository root and read it end-to-end before doing anything else. Pay particular attention to:
- Section 8 (System Architecture) — technology stack, layer boundaries, modules, containers
- Section 8.4 (Technology Stack) — exact versions to use
- Section 8.5 (Deployment Containers) — what needs to run in Docker Compose
- Section 12 (Explicitly Out of Scope) — do not add anything from this list
- Section 13 (Glossary) — use these exact names throughout the codebase

GOAL:
Create the skeleton of a modular monolith that all future sprints will build into. Nothing should work end-to-end yet — no features — but `docker compose up` must start every service cleanly, `npm run dev` must run the backend and frontend locally, and TypeScript must compile with zero errors.

IN SCOPE:
1. Repository structure (monorepo, one root `package.json` with workspaces, or separate `apps/` and `packages/` folders):
     apps/
       web/             ← Next.js 14 + TypeScript
       api/             ← Express 4 + TypeScript
       worker/          ← Bull worker process (separate from api)
     packages/
       shared/          ← Zod schemas, DTOs, enums, constants shared by web+api+worker
       domain/          ← Pure domain logic (AuctionStateMachine, BidValidationStrategy, etc.) — NO framework, NO DB
     prisma/
       schema.prisma    ← Empty schema with just the generator and datasource for now
     docker/
       docker-compose.yml
       nginx/nginx.conf (stub — will do TLS in Sprint 7)
     .github/workflows/ci.yml
     plan_v4.md         ← place the plan here
     prompts.md         ← place this file here
     README.md

2. TypeScript configuration:
   - Root `tsconfig.base.json` with `"strict": true`, `"noUncheckedIndexedAccess": true`, `"exactOptionalPropertyTypes": true`
   - Each app extends the base
   - Path aliases: `@shared/*` → `packages/shared/src/*`, `@domain/*` → `packages/domain/src/*`

3. Linting/formatting:
   - ESLint with `@typescript-eslint` rules, `eslint-plugin-import`, `eslint-plugin-unused-imports`
   - Prettier with a single `.prettierrc` at the root
   - Husky + lint-staged running ESLint + Prettier + `tsc --noEmit` on every commit

4. Docker Compose — per Section 8.5 of `plan_v4.md`:
   Services: nginx, nextjs, express-api, socket-server, bull-worker, postgres (16), redis (7). Each service builds from its own Dockerfile under `docker/`. Healthchecks on postgres and redis. Volumes for pg data and redis. Shared Docker network. Environment variables loaded from a root `.env` file (with a committed `.env.example` — NEVER commit `.env`).
   NOTE: Until Sprint 1, the socket-server container is identical to the express-api container; they will diverge in Sprint 3.

5. Prisma setup:
   - Install `prisma` and `@prisma/client`
   - Create `prisma/schema.prisma` with the datasource (postgres) and generator only — NO models yet
   - Add scripts: `db:migrate:dev`, `db:migrate:deploy`, `db:reset`, `db:seed` (seed file is a placeholder that exits 0)

6. Bull + Redis client wiring:
   - Create a `packages/shared/src/queue/` module that exports a singleton `BullMQ` connection (use `bullmq`, not the deprecated `bull`, even though the plan says `Bull 4.x`. Leave a comment pointing to this decision in the code and in the `README.md`.)
   - Actually, wait — the plan says "Bull 4.x". Stay with Bull 4.x (`bull` package). Do NOT switch to BullMQ unless the human later approves.
   - Define one stub queue: `auction-lifecycle-queue`.

7. Socket.IO:
   - Add `socket.io` to the api app and a separate entry point in apps/api/src/socket/server.ts. It just logs "socket server listening" for now.
   - Add `@socket.io/redis-adapter` as a dependency.

8. Environment variable contract — create `packages/shared/src/env.ts`:
   - Use `zod` to parse `process.env` into a typed `Env` object.
   - Required keys at minimum: `DATABASE_URL`, `REDIS_URL`, `JWT_PRIVATE_KEY`, `JWT_PUBLIC_KEY`, `JWT_REFRESH_SECRET`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `FRONTEND_ORIGIN`, `API_ORIGIN`, `NODE_ENV`.
   - Fail hard at boot if any required var is missing.

9. CI (GitHub Actions) — `.github/workflows/ci.yml`:
   Jobs (all run on every PR): install, lint, typecheck, unit-test (vitest), build. Use Node 20. Cache `node_modules` via `actions/setup-node`'s built-in cache.

10. README.md with:
    - One-line project description
    - Prereqs (Node 20, Docker Desktop, pnpm or npm)
    - Quickstart (`cp .env.example .env && docker compose up -d postgres redis && npm run dev`)
    - Architecture diagram (text, same as plan_v4.md Section 8.2)
    - Module map table (copy from plan_v4.md Section 8.3)
    - A pointer to `plan_v4.md` as the product spec

DETAILED RULES:
- Use pnpm workspaces for the monorepo (faster, better disk usage). If pnpm is not available, fall back to npm workspaces and note it.
- Never commit `node_modules`, `.env`, `dist`, `.next`, `.turbo`.
- `.gitignore` must be comprehensive for a TS monorepo.
- No `console.log` in production code paths; use `pino` as the logger (install it).

EDGE CASES:
- If the developer is on Windows, Docker paths must not assume Linux. Use relative paths everywhere in compose.
- If `JWT_PRIVATE_KEY` and `JWT_PUBLIC_KEY` are not provided, the API must not crash at boot for *developer* machines — instead, generate a temporary keypair on first boot if `NODE_ENV=development` and log a big warning. Production boot must still fail-hard if keys are missing.

TESTS:
- Add one vitest test in `packages/domain/src/sanity.test.ts` that just asserts `1 + 1 === 2`. It exists to confirm CI works end-to-end.

DEFINITION OF DONE:
- `git clone` → `pnpm install` → `cp .env.example .env` → `docker compose up -d postgres redis` → `pnpm dev` starts web on :3000, api on :4000, worker without crashing.
- `pnpm typecheck` passes with zero errors.
- `pnpm lint` passes.
- CI on the PR is green.
- `plan_v4.md` and this `prompts.md` are committed at the repo root.

HANDOFF:
Sprint 1 expects:
- Prisma is wired; a developer can add models and run `pnpm db:migrate:dev`.
- `packages/shared` and `packages/domain` are importable from both api and web.
- Bull connection helper exists and works.
- Email sending has a `nodemailer` stub in `apps/api/src/infra/email/`. No templates yet.
```

### Definition of Done (Sprint 0)

- All steps above complete. CI green. PR merged to `develop`.

---

# SPRINT 1 — Auth & Users Schema

> **Branch:** `feat/sprint-1-schema`
>
> **Legacy group:** this is one slice of what `plan_v4.md` Section 9 called **Sprint 1**. In this prompts.md that group has been split so each branch is its own sprint. **Inside the prompt body below, any reference to "Sprint N" means the original `plan_v4.md` Section 9 grouping, not a sprint number in this file.**

> **Plan reference:** `plan_v4.md` Section 9 → "Sprint 1 — Auth, Users, Tenants, and Access Infrastructure". Also Sections 2, 3.1, 3.5, 6.9, 8.3 (MOD-AUTH, MOD-USER, MOD-TENANT, MOD-NOTIFY partially, MOD-AUDIT).

### Execution Mode

**Linear, single branch.** Start only after the previous sprint has merged to `develop`. One branch, one PR, one Definition of Done. When this branch merges, move to the next sprint.

### Prompt

```
ROLE: You are a senior backend engineer. You are implementing Sprint 1 of the Online Auction System for Students.

PRIMARY DIRECTIVE:
Before touching any code, open `plan_v4.md` at the repo root and read it end-to-end. The plan is ~1,100 lines and every part matters. For this sprint, pay special attention to:
- Section 2 (User Personas) — especially Persona 5 (University Admin) and Persona 6 (Platform Admin)
- Section 3.1 (Registration and Identity user stories US01–US08)
- Section 3.5 (Administration user stories US40, US42)
- Section 4 (Auction Access Model) — even though auctions don't exist yet, the tenant model must be compatible with the 3 visibility modes
- Section 6.9 (Notifications) — you will build the notification stub/table, not the full system
- Section 7.5 (Session expiry) and 7.10 (Account deletion)
- Section 8.3 (Module Map) — modules MOD-AUTH, MOD-USER, MOD-TENANT, MOD-AUDIT
- Section 8.6 (Multi-Tenancy Model)
- Section 11 (Risk Register) — R08 (session expiry) applies here

GOAL:
Deliver a working authentication, user, and tenant subsystem. After this sprint a new user can register with any email, receive a verification token by email, verify, log in, stay logged in via refresh tokens, reset their password, update their profile, and view another user's public profile. A Platform Admin can create a university tenant and set its email domain, and new users who register with that domain are auto-affiliated.

No auctions, no bids, no real-time — those come in Sprint 2+. But the audit_log table must exist and must be written to for every auth event, because the audit trail is foundational.

IN SCOPE (by branch):

─────────────────────────────────────────────

═════════════════════════════════════════════════
BRANCH: feat/sprint-1-schema
═════════════════════════════════════════════════

─────────────────────────────────────────────

Define the following Prisma models. Use snake_case for database columns and camelCase for Prisma field names via @map. Use UUID (v4) primary keys via @default(uuid()).

model User {
  id               String    @id @default(uuid())
  email            String    @unique
  email_verified   Boolean   @default(false)
  password_hash    String
  display_name     String
  profile_image_url String?
  role             UserRole  @default(STUDENT)
  tenant_id        String?   // NULL = unaffiliated student
  status           UserStatus @default(ACTIVE)
  created_at       DateTime  @default(now())
  updated_at       DateTime  @updatedAt
  deleted_at       DateTime? // soft-delete (section 7.10)
  pending_deletion_at DateTime? // when set → 30-day grace
  tenant           Tenant?   @relation(fields: [tenant_id], references: [id])
  sessions         Session[]
  // auctions, bids, reviews, etc. will be added in later sprints
}

enum UserRole {
  STUDENT
  UNIVERSITY_ADMIN
  PLATFORM_ADMIN
}

enum UserStatus {
  ACTIVE
  UNVERIFIED
  SUSPENDED
  PENDING_DELETION
}

model Tenant {
  id            String    @id @default(uuid())
  name          String
  email_domain  String    @unique   // e.g. "university-a.edu"
  created_at    DateTime  @default(now())
  updated_at    DateTime  @updatedAt
  users         User[]
}

model Session {
  id                String   @id @default(uuid())
  user_id           String
  refresh_token_hash String  @unique // store the SHA-256 of the refresh token, NEVER the plaintext
  user_agent        String?
  ip_address        String?
  expires_at        DateTime
  revoked_at        DateTime?
  created_at        DateTime @default(now())
  user              User     @relation(fields: [user_id], references: [id], onDelete: Cascade)
  @@index([user_id])
  @@index([expires_at])
}

model EmailVerificationToken {
  id         String   @id @default(uuid())
  user_id    String
  token_hash String   @unique
  expires_at DateTime
  consumed_at DateTime?
  created_at DateTime @default(now())
  @@index([user_id])
}

model PasswordResetToken {
  id         String   @id @default(uuid())
  user_id    String
  token_hash String   @unique
  expires_at DateTime
  consumed_at DateTime?
  created_at DateTime @default(now())
  @@index([user_id])
}

model AuditLog {
  id           String   @id @default(uuid())
  actor_user_id String?  // null for system actions
  action        String   // e.g. 'USER_REGISTERED', 'USER_LOGGED_IN', 'TENANT_CREATED'
  entity_type   String   // e.g. 'user', 'tenant', 'session'
  entity_id     String
  metadata_json Json?    // free-form context
  ip_address    String?
  user_agent    String?
  created_at    DateTime @default(now())
  @@index([actor_user_id])
  @@index([entity_type, entity_id])
  @@index([created_at])
  @@index([action])
}

Rules:
- Never store plaintext tokens of any kind. Store only SHA-256 hashes.
- Passwords: `bcryptjs` with cost factor 12.
- All timestamps are UTC. Never store local time.
- Every model that represents an entity must have `created_at`; mutable ones also `updated_at`.
- Add a Prisma seed script at `prisma/seed.ts` that creates the test accounts listed in `plan_v4.md` Section 10.3. Use the exact emails and roles listed there. Seed idempotently (upsert by email).

Deliverables:
- `prisma/schema.prisma` with all models above
- `pnpm db:migrate:dev --name sprint-1-init` creates the migration
- `pnpm db:seed` populates the test accounts
- Open PR titled "feat(schema): sprint 1 — users, tenants, sessions, audit_log"

─────────────────────────────────────────────
```

### Definition of Done

Every requirement in the task block above is implemented, tested, reviewed, and merged to `develop`. All listed tests pass. No feature outside the stated scope of this branch is added.

---

# SPRINT 2 — Authentication Endpoints

> **Branch:** `feat/sprint-1-auth`
>
> **Legacy group:** this is one slice of what `plan_v4.md` Section 9 called **Sprint 1**. In this prompts.md that group has been split so each branch is its own sprint. **Inside the prompt body below, any reference to "Sprint N" means the original `plan_v4.md` Section 9 grouping, not a sprint number in this file.**

> **Plan reference:** `plan_v4.md` Section 9 → "Sprint 1 — Auth, Users, Tenants, and Access Infrastructure". Also Sections 2, 3.1, 3.5, 6.9, 8.3 (MOD-AUTH, MOD-USER, MOD-TENANT, MOD-NOTIFY partially, MOD-AUDIT).

### Execution Mode

**Linear, single branch.** Start only after the previous sprint has merged to `develop`. One branch, one PR, one Definition of Done. When this branch merges, move to the next sprint.

### Prompt

```
ROLE: You are a senior backend engineer. You are implementing Sprint 1 of the Online Auction System for Students.

PRIMARY DIRECTIVE:
Before touching any code, open `plan_v4.md` at the repo root and read it end-to-end. The plan is ~1,100 lines and every part matters. For this sprint, pay special attention to:
- Section 2 (User Personas) — especially Persona 5 (University Admin) and Persona 6 (Platform Admin)
- Section 3.1 (Registration and Identity user stories US01–US08)
- Section 3.5 (Administration user stories US40, US42)
- Section 4 (Auction Access Model) — even though auctions don't exist yet, the tenant model must be compatible with the 3 visibility modes
- Section 6.9 (Notifications) — you will build the notification stub/table, not the full system
- Section 7.5 (Session expiry) and 7.10 (Account deletion)
- Section 8.3 (Module Map) — modules MOD-AUTH, MOD-USER, MOD-TENANT, MOD-AUDIT
- Section 8.6 (Multi-Tenancy Model)
- Section 11 (Risk Register) — R08 (session expiry) applies here

GOAL:
Deliver a working authentication, user, and tenant subsystem. After this sprint a new user can register with any email, receive a verification token by email, verify, log in, stay logged in via refresh tokens, reset their password, update their profile, and view another user's public profile. A Platform Admin can create a university tenant and set its email domain, and new users who register with that domain are auto-affiliated.

No auctions, no bids, no real-time — those come in Sprint 2+. But the audit_log table must exist and must be written to for every auth event, because the audit trail is foundational.

IN SCOPE (by branch):

─────────────────────────────────────────────

═════════════════════════════════════════════════
BRANCH: feat/sprint-1-auth
═════════════════════════════════════════════════

─────────────────────────────────────────────

Implement MOD-AUTH under `apps/api/src/modules/auth/`. Follow this layout (same for every module in the project):

apps/api/src/modules/auth/
  auth.router.ts          ← Express router, route definitions
  auth.controller.ts      ← Thin: parse req → call service → shape res
  auth.service.ts         ← Business logic, orchestrates repo + infra
  auth.repository.ts      ← Prisma calls only
  auth.schemas.ts         ← Zod schemas for every request body
  auth.errors.ts          ← Typed domain errors (InvalidCredentialsError, etc.)
  auth.router.test.ts     ← API-level integration tests
  auth.service.test.ts    ← Unit tests with repo mocked

ENDPOINTS (all under /api/v1/auth):

POST /register
  Body: { email: string, password: string, display_name: string }
  Validation (Zod):
    - email: valid email format, lowercased on entry
    - password: min 8 chars, at least one letter and one digit
    - display_name: 2–50 chars, trimmed, no HTML
  Business rules:
    - If email already exists (any status): return 409 "An account with this email already exists" — but for security, optionally rate-limit more aggressively.
    - Hash password with bcrypt.
    - Auto-affiliation: look up tenant by email domain (the part after @). If found, set tenant_id. If not, tenant_id stays null.
    - Create user with status=UNVERIFIED, email_verified=false.
    - Generate 32-byte cryptographically random token. Store sha256(token) in EmailVerificationToken with 24h expiry.
    - Send verification email (via the email infra stub) containing the plaintext token as a link: `${FRONTEND_ORIGIN}/verify-email?token={plaintext}`.
    - Write audit log: action='USER_REGISTERED'.
  Returns: 201 { userId, email, status: 'UNVERIFIED' }. Do NOT log the user in yet — they must verify first.

POST /verify-email
  Body: { token: string }
  - sha256(token); lookup EmailVerificationToken by hash.
  - Reject if: not found, expired, already consumed.
  - On success: set user.email_verified=true, user.status='ACTIVE', mark token consumed_at=now().
  - Audit log: USER_EMAIL_VERIFIED.
  Returns: 200 { ok: true }

POST /login
  Body: { email: string, password: string }
  - Lookup user by email.
  - Constant-time comparison via bcrypt.compare to avoid timing attacks.
  - If user.status === 'SUSPENDED' or 'PENDING_DELETION': return 403 with the specific reason.
  - If user.status === 'UNVERIFIED': return 403 "Please verify your email before logging in" and OPTIONALLY resend the verification email (rate-limited).
  - On success:
      - Generate access token: JWT RS256, payload { sub: userId, role, tenant_id, status }, exp = 15 min.
      - Generate refresh token: 64-byte random. Store sha256 in Session with 30-day expiry.
      - Return access token in response body AND set refresh token in httpOnly, Secure, SameSite=Lax cookie at path=/api/v1/auth/refresh.
  - Audit log: USER_LOGGED_IN (or USER_LOGIN_FAILED on failure, but do not log the attempted password).
  Returns: 200 { accessToken, user: { id, email, displayName, role, tenantId, emailVerified } }

POST /refresh
  Reads refresh token from httpOnly cookie. sha256 and lookup active session.
  - If session not found / expired / revoked: 401 "Session expired".
  - On success: issue new access token. Optionally rotate refresh token (recommended — revoke old session, create new one).
  Returns: 200 { accessToken }.
  (See plan_v4.md 7.5 — client intercepts 401, calls refresh, retries original request.)

POST /logout
  - Revoke the current session (set revoked_at).
  - Clear the refresh cookie.
  - Audit log: USER_LOGGED_OUT.
  Returns: 204.

POST /forgot-password
  Body: { email: string }
  - ALWAYS return 200 with a generic message, even if email doesn't exist — do not leak account existence.
  - If the account exists, generate a PasswordResetToken (32-byte, 1h expiry), email it.
  - Audit log: PASSWORD_RESET_REQUESTED.

POST /reset-password
  Body: { token: string, new_password: string }
  - Validate token (same as email verification).
  - Update password_hash; consume token; revoke ALL existing sessions for that user (force re-login).
  - Audit log: PASSWORD_RESET_COMPLETED.

RATE LIMITS (plan_v4.md Section 9 "Rate limiting on auth endpoints"):
Use `express-rate-limit` backed by Redis store (`rate-limit-redis`):
- POST /register:        5 per IP per hour
- POST /login:           10 per IP per 15 min; 5 per email per 15 min (key by email lowercased)
- POST /forgot-password: 3 per IP per hour, 3 per email per hour
- POST /verify-email:    20 per IP per hour
- POST /refresh:         60 per IP per minute

JWT SETUP:
- RS256. Private key signs; public key verifies.
- Keys come from env (PEM format).
- In dev, Sprint 0 generated an ephemeral pair — that's fine. In prod, provide real ones.
- Access token payload: { sub, role, tenant_id, email_verified, iat, exp }. Do NOT include email or name (PII minimisation).
- Refresh token: opaque random, NEVER a JWT.

EMAIL INFRASTRUCTURE:
Under `apps/api/src/infra/email/`:
  email.provider.ts — nodemailer transport (SMTP). In dev, if SMTP_HOST=== 'dev-console', just console.log the email.
  templates/verification.html
  templates/password-reset.html
Simple Handlebars or a lightweight template function. Do NOT use heavy MJML etc.

EDGE CASES:
- User registers, doesn't verify, tries to register again: return 409 "An account with this email already exists. Check your inbox for the verification email, or request a new one." (Consider a resend-verification endpoint if time allows; otherwise leave a TODO that references plan_v4.md 7.10 and the "request a new one" part of this error.)
- Two tabs try to refresh simultaneously: refresh rotation must be atomic — use a DB transaction with SELECT ... FOR UPDATE on the session row.
- Clock skew: give access tokens a 60-second `nbf` grace via JWT `clockTolerance`.
- Session revocation: refresh token rotation means a stolen refresh token can only be used once. If an attacker uses the old token after the legit user has rotated, detect this — the old session is marked revoked; if a revoked token is presented, invalidate ALL sessions for that user and log a security audit event.

TESTS (all required):
- Unit tests for auth.service (mock repository): every success path, every error path.
- Integration tests for the full router using supertest + a test Postgres (use a single `beforeEach` transaction rollback, or testcontainers).
- Test that passwords never appear in any response, audit log metadata, or error message.
- Test that refresh cookie is httpOnly, Secure (in prod), SameSite=Lax.
- Test the rate limiters (fire N+1 requests, assert 429 on the last one).

─────────────────────────────────────────────
```

### Definition of Done

Every requirement in the task block above is implemented, tested, reviewed, and merged to `develop`. All listed tests pass. No feature outside the stated scope of this branch is added.

---

# SPRINT 3 — Users, Tenants & Profiles

> **Branch:** `feat/sprint-1-users-tenants`
>
> **Legacy group:** this is one slice of what `plan_v4.md` Section 9 called **Sprint 1**. In this prompts.md that group has been split so each branch is its own sprint. **Inside the prompt body below, any reference to "Sprint N" means the original `plan_v4.md` Section 9 grouping, not a sprint number in this file.**

> **Plan reference:** `plan_v4.md` Section 9 → "Sprint 1 — Auth, Users, Tenants, and Access Infrastructure". Also Sections 2, 3.1, 3.5, 6.9, 8.3 (MOD-AUTH, MOD-USER, MOD-TENANT, MOD-NOTIFY partially, MOD-AUDIT).

### Execution Mode

**Linear, single branch.** Start only after the previous sprint has merged to `develop`. One branch, one PR, one Definition of Done. When this branch merges, move to the next sprint.

### Prompt

```
ROLE: You are a senior backend engineer. You are implementing Sprint 1 of the Online Auction System for Students.

PRIMARY DIRECTIVE:
Before touching any code, open `plan_v4.md` at the repo root and read it end-to-end. The plan is ~1,100 lines and every part matters. For this sprint, pay special attention to:
- Section 2 (User Personas) — especially Persona 5 (University Admin) and Persona 6 (Platform Admin)
- Section 3.1 (Registration and Identity user stories US01–US08)
- Section 3.5 (Administration user stories US40, US42)
- Section 4 (Auction Access Model) — even though auctions don't exist yet, the tenant model must be compatible with the 3 visibility modes
- Section 6.9 (Notifications) — you will build the notification stub/table, not the full system
- Section 7.5 (Session expiry) and 7.10 (Account deletion)
- Section 8.3 (Module Map) — modules MOD-AUTH, MOD-USER, MOD-TENANT, MOD-AUDIT
- Section 8.6 (Multi-Tenancy Model)
- Section 11 (Risk Register) — R08 (session expiry) applies here

GOAL:
Deliver a working authentication, user, and tenant subsystem. After this sprint a new user can register with any email, receive a verification token by email, verify, log in, stay logged in via refresh tokens, reset their password, update their profile, and view another user's public profile. A Platform Admin can create a university tenant and set its email domain, and new users who register with that domain are auto-affiliated.

No auctions, no bids, no real-time — those come in Sprint 2+. But the audit_log table must exist and must be written to for every auth event, because the audit trail is foundational.

IN SCOPE (by branch):

─────────────────────────────────────────────

═════════════════════════════════════════════════
BRANCH: feat/sprint-1-users-tenants
═════════════════════════════════════════════════

─────────────────────────────────────────────

Implement MOD-USER and MOD-TENANT.

USERS (apps/api/src/modules/users/):

GET /api/v1/users/me                     (auth required)
  Returns: { id, email, displayName, profileImageUrl, role, tenantId, emailVerified, createdAt }

PATCH /api/v1/users/me                   (auth required, verified required)
  Body: { displayName?, profileImageUrl? }
  - displayName: 2–50 chars, trimmed, no HTML (strip with DOMPurify or a server-side sanitiser — we are not displaying HTML anywhere)
  - profileImageUrl: must be a URL that our own file storage returned. In Sprint 1, accept any valid URL (file storage is TBD per plan_v4.md Section 8.4); in Sprint 2 this will be tightened.
  - Audit: USER_PROFILE_UPDATED.

GET /api/v1/users/:userId                (public — no auth required)
  Returns the PUBLIC profile: { id, displayName, profileImageUrl, tenantName (not tenantId), createdAt, role (only if admin roles — students show nothing special), auctionsCompletedCount: 0, averageRating: null, reviewCount: 0 }
  - Reviews and auctions count will be real numbers in later sprints. For Sprint 1, return zeros with a comment pointing to Sprint 5.
  - NEVER expose: email, status, tenant_id (raw UUID), pending_deletion_at, any token.

TENANTS (apps/api/src/modules/tenants/):

POST /api/v1/tenants                     (role: PLATFORM_ADMIN)
  Body: { name: string, email_domain: string }
  - email_domain lowercased, validated (looks like a domain: regex /^[a-z0-9.-]+\.[a-z]{2,}$/)
  - Must be globally unique.
  - Audit: TENANT_CREATED.

GET /api/v1/tenants                      (any authenticated user)
  Returns: [{ id, name, emailDomain }] — used by the frontend to show universities in filters later.

GET /api/v1/tenants/:id                  (any authenticated user)

PATCH /api/v1/tenants/:id                (role: PLATFORM_ADMIN)
  Body: { name? }
  - Email domain cannot be changed after creation (would break existing affiliations).

DELETE /api/v1/tenants/:id               (role: PLATFORM_ADMIN)
  - Soft-delete only if no users are affiliated; otherwise 409. For Sprint 1, just return 409 with a clear message; hard delete is out of scope.

AUTO-AFFILIATION:
Already implemented in `feat/sprint-1-auth` /register, but expose a shared helper function in `packages/domain/src/tenancy/affiliate.ts`:

  export function resolveTenantIdForEmail(email: string, tenants: {id: string, emailDomain: string}[]): string | null

Pure function, fully unit-tested with edge cases:
- "student@UNIVERSITY-A.EDU" → tenant matched case-insensitively
- "student+tag@university-a.edu" → tenant matched (plus-addressing)
- "student@subdomain.university-a.edu" → NO match (exact domain only)
- malformed email → null

TESTS:
- API tests for every endpoint: happy path, auth failure, validation failure, RBAC failure.
- Unit tests for resolveTenantIdForEmail covering all cases above.
- Test that GET /users/:id hides all PII.

─────────────────────────────────────────────
```

### Definition of Done

Every requirement in the task block above is implemented, tested, reviewed, and merged to `develop`. All listed tests pass. No feature outside the stated scope of this branch is added.

---

# SPRINT 4 — RBAC Middleware

> **Branch:** `feat/sprint-1-rbac`
>
> **Legacy group:** this is one slice of what `plan_v4.md` Section 9 called **Sprint 1**. In this prompts.md that group has been split so each branch is its own sprint. **Inside the prompt body below, any reference to "Sprint N" means the original `plan_v4.md` Section 9 grouping, not a sprint number in this file.**

> **Plan reference:** `plan_v4.md` Section 9 → "Sprint 1 — Auth, Users, Tenants, and Access Infrastructure". Also Sections 2, 3.1, 3.5, 6.9, 8.3 (MOD-AUTH, MOD-USER, MOD-TENANT, MOD-NOTIFY partially, MOD-AUDIT).

### Execution Mode

**Linear, single branch.** Start only after the previous sprint has merged to `develop`. One branch, one PR, one Definition of Done. When this branch merges, move to the next sprint.

### Prompt

```
ROLE: You are a senior backend engineer. You are implementing Sprint 1 of the Online Auction System for Students.

PRIMARY DIRECTIVE:
Before touching any code, open `plan_v4.md` at the repo root and read it end-to-end. The plan is ~1,100 lines and every part matters. For this sprint, pay special attention to:
- Section 2 (User Personas) — especially Persona 5 (University Admin) and Persona 6 (Platform Admin)
- Section 3.1 (Registration and Identity user stories US01–US08)
- Section 3.5 (Administration user stories US40, US42)
- Section 4 (Auction Access Model) — even though auctions don't exist yet, the tenant model must be compatible with the 3 visibility modes
- Section 6.9 (Notifications) — you will build the notification stub/table, not the full system
- Section 7.5 (Session expiry) and 7.10 (Account deletion)
- Section 8.3 (Module Map) — modules MOD-AUTH, MOD-USER, MOD-TENANT, MOD-AUDIT
- Section 8.6 (Multi-Tenancy Model)
- Section 11 (Risk Register) — R08 (session expiry) applies here

GOAL:
Deliver a working authentication, user, and tenant subsystem. After this sprint a new user can register with any email, receive a verification token by email, verify, log in, stay logged in via refresh tokens, reset their password, update their profile, and view another user's public profile. A Platform Admin can create a university tenant and set its email domain, and new users who register with that domain are auto-affiliated.

No auctions, no bids, no real-time — those come in Sprint 2+. But the audit_log table must exist and must be written to for every auth event, because the audit trail is foundational.

IN SCOPE (by branch):

─────────────────────────────────────────────

═════════════════════════════════════════════════
BRANCH: feat/sprint-1-rbac
═════════════════════════════════════════════════

─────────────────────────────────────────────

Under `apps/api/src/middleware/`:

authenticate(req, res, next)
  - Reads Authorization: Bearer <token>.
  - Verifies JWT with the public key.
  - Sets `req.user = { id, role, tenantId, emailVerified }`.
  - On invalid/expired: 401 { error: 'AUTH_REQUIRED' }.

requireVerified(req, res, next)
  - Requires req.user set and req.user.emailVerified === true.
  - On failure: 403 { error: 'EMAIL_VERIFICATION_REQUIRED', message: 'Please verify your email before bidding or selling.' }

requireRole(...roles)
  - Factory that returns middleware requiring req.user.role ∈ roles.
  - On failure: 403 { error: 'FORBIDDEN' }.

requireActiveAccount(req, res, next)
  - Blocks SUSPENDED and PENDING_DELETION users from any API access except logout and account status read.
  - 403 { error: 'ACCOUNT_NOT_ACTIVE', message: <specific reason> }.

Expose typed versions using declaration merging so `req.user` has proper types app-wide.

Apply these middlewares in a sensible default chain, documented in `apps/api/src/modules/README.md`.

TESTS:
- For each middleware, test both pass and fail cases.
- Test that req.user type is inferred correctly in a sample route.

─────────────────────────────────────────────
CROSS-CUTTING REQUIREMENTS (all branches)
─────────────────────────────────────────────

1. Every mutating endpoint writes ONE audit log entry inside the same DB transaction as the mutation itself. Use Prisma's $transaction pattern. If the audit write fails, the entire mutation rolls back.

2. Every endpoint validates input with Zod at the controller boundary. No `req.body as any` anywhere.

3. Logger (pino) logs every request with: method, path, status, duration_ms, user_id (if auth'd), request_id (generate a UUID per request in an early middleware, return as X-Request-Id header).

4. NEVER log: passwords, tokens (plaintext or hashed), JWTs, request bodies from /auth endpoints.

5. Error response shape (consistent everywhere):
   { error: 'MACHINE_READABLE_CODE', message: 'Human-readable message', details?: object }
   Never expose stack traces in non-dev environments.

6. Add a global error handler that maps domain errors (e.g. InvalidCredentialsError) to the right HTTP status + error code. Unexpected errors → 500 with a generic message, full error logged server-side with the request ID.

LINEAR EXECUTION / MERGE ORDER:
Step 1: feat/sprint-1-schema opens, reviewed, merged to develop.
Step 2: feat/sprint-1-auth opens (rebased on the now-merged schema), reviewed, merged.
Step 3: feat/sprint-1-users-tenants opens (rebased on the now-merged auth), reviewed, merged.
Step 4: feat/sprint-1-rbac opens (rebased on the now-merged users-tenants), reviewed, merged.
Day 9: Cross-branch smoke test — QA runs through DoD.
Day 10: Sprint review + retro.

SHARED FILES / CONFLICT MANAGEMENT:
- `prisma/schema.prisma` — ONLY `feat/sprint-1-schema` touches this in Sprint 1.
- `apps/api/src/app.ts` (the Express bootstrap that registers routers) — each branch must append its router in a dedicated line; resolve by adding at the end in branch-merge order. Keep the registrations alphabetical by route prefix to reduce future conflicts.
- `apps/api/src/index.ts` (entry point) — only the schema branch or the first auth branch should set up the server; others only add routers to app.ts.

DEFINITION OF DONE (from plan_v4.md Section 9, Sprint 1):
"A new user can register, verify their email, log in, and see their profile. Platform Admin can create a university tenant."

Also:
- All 4 branches merged to develop.
- docker compose up + pnpm dev still works.
- `curl` smoke flow in README.md: register → verify (use the token from server console log) → login → GET /users/me.
- `pnpm test` passes across all workspaces.
- No TypeScript errors, no lint errors.
- Seeded test accounts from plan_v4.md 10.3 work.

HANDOFF TO SPRINT 2:
- User model, Tenant model, Session model, AuditLog model are all stable.
- JWT issuing and verification works — Sprint 2 will need it for bid submission.
- Audit log infrastructure is in place; Sprint 2 plugs into it.
- RBAC middleware is reusable — Sprint 2 uses requireVerified on bid endpoints.
```

### Definition of Done (Sprint 1)

Matches `plan_v4.md` Section 9 Sprint 1 DoD.

---

# SPRINT 5 — Auction Engine Schema

> **Branch:** `feat/sprint-2-schema`
>
> **Legacy group:** this is one slice of what `plan_v4.md` Section 9 called **Sprint 2**. In this prompts.md that group has been split so each branch is its own sprint. **Inside the prompt body below, any reference to "Sprint N" means the original `plan_v4.md` Section 9 grouping, not a sprint number in this file.**

> **Plan reference:** `plan_v4.md` Section 9 → "Sprint 2". Also Sections 3.2, 3.3, 5.1 (Forward Auction), 6.1 (Bid Submission Flow — the single most important section of the entire plan), 6.4 (Anti-Sniping), 6.5 (Seller cannot cancel open auction), 6.6 (Reserve Price), 7.6 (concurrent bids), 7.9 (no bids), 8.2 (4-layer architecture), 8.3 (MOD-AUCTION, MOD-BID, MOD-AUDIT), Section 11 (Risks R01, R03, R10, R12, R14).

### Execution Mode

**Linear, single branch.** Start only after the previous sprint has merged to `develop`. One branch, one PR, one Definition of Done. When this branch merges, move to the next sprint.

### Prompt

```
ROLE: You are a senior backend engineer implementing the core auction and bidding engine of a production-grade online auction platform. This is the most complex sprint of the project.

PRIMARY DIRECTIVE:
Open `plan_v4.md` at the repo root and read it end-to-end before touching code. For this sprint, the mandatory sections to re-read in depth are:

- Section 5.1 (Forward Auction) — configuration, validation, winner determination, edge cases
- Section 6.1 (Bid Submission Flow) — MEMORISE this 15-step pipeline; every bid in the entire system goes through it
- Section 6.4 (Anti-Sniping) — trigger, extension math, Bull job rescheduling, max extensions
- Section 6.5 (Seller Cannot Cancel Open Auction) — the cancel button is HIDDEN not just disabled after OPEN
- Section 6.6 (Reserve Price) — hidden from everyone forever; FAILED if not met; special Sealed Bid behaviour (Sprint 4 concern, but model for it now)
- Section 7.6 (Two bidders at same millisecond) — Redis SETNX, 500ms lock wait, soft-error UI
- Section 7.9 (No bids → FAILED for every format)
- Section 7.7 (Seller edits after PUBLISHED) — some fields lock once OPEN
- Section 8.2 (4-layer architecture) — keep domain layer PURE: no Prisma, no Express
- Section 11 Risks R01, R03, R10, R11, R12, R14 — each has a specified mitigation you must implement

GOAL:
Deliver a fully working Forward Auction end-to-end, minus real-time UI (that's Sprint 3). By end of sprint: a verified seller can create a Forward auction, publish it, have it auto-open at start time, have two bidders submit valid competing bids, have anti-sniping extend the close time correctly, and have it auto-close and transition to AWARDED (reserve met) or FAILED (no bids or reserve not met) with correct winner determination and full audit trail.

No WebSockets in this sprint. No real-time. The client polls (Sprint 3 replaces polling). No Reverse / Sealed / Dutch (Sprint 4). No Private auctions (Sprint 3). No proxy bidding (Sprint 5). No search (Sprint 5). No reviews (Sprint 5). No admin dashboards (Sprint 6).

═════════════════════════════════════════════════
BRANCH: feat/sprint-2-schema
═════════════════════════════════════════════════


Add these models to prisma/schema.prisma. All fields are required unless marked optional.

enum AuctionFormat { FORWARD REVERSE SEALED_BID DUTCH }

enum AuctionStatus { DRAFT PUBLISHED OPEN EXTENDED CLOSED AWARDED FAILED CANCELLED }

enum AuctionVisibility { PUBLIC UNIVERSITY_RESTRICTED PRIVATE }

enum AuctionCategory { TEXTBOOKS ELECTRONICS SERVICES COLLECTIBLES CLOTHING FURNITURE SPORTS OTHER }

model Auction {
  id                      String          @id @default(uuid())
  seller_id               String
  tenant_id               String?         // snapshot of seller's tenant at creation; used for UNIVERSITY_RESTRICTED
  format                  AuctionFormat
  status                  AuctionStatus   @default(DRAFT)
  visibility              AuctionVisibility @default(PUBLIC)
  title                   String
  description             String          @db.Text
  category                AuctionCategory
  auction_code            String          @unique    // 8-char alphanumeric
  // Pricing (semantic meaning depends on format — document in comments)
  starting_price          Decimal         @db.Decimal(12, 2)
  current_price           Decimal         @db.Decimal(12, 2) // initialised to starting_price on PUBLISHED
  reserve_price           Decimal?        @db.Decimal(12, 2) // nullable, hidden
  increment_amount        Decimal?        @db.Decimal(12, 2) // Forward/Reverse only
  // Dutch-specific (used in Sprint 4; add columns now to avoid churn later)
  floor_price             Decimal?        @db.Decimal(12, 2)
  decrement_amount        Decimal?        @db.Decimal(12, 2)
  decrement_interval_sec  Int?
  // Timing
  scheduled_start_time    DateTime
  scheduled_end_time      DateTime
  actual_start_time       DateTime?
  actual_end_time         DateTime?
  // Anti-sniping
  anti_snipe_window_min   Int             @default(3)
  anti_snipe_extension_min Int            @default(3)
  max_extensions          Int             @default(10)
  extension_count         Int             @default(0)
  // Outcome
  winning_bid_id          String?         @unique
  // Timestamps
  created_at              DateTime        @default(now())
  updated_at              DateTime        @updatedAt
  // Relations
  seller                  User            @relation("auctions_as_seller", fields: [seller_id], references: [id])
  item                    AuctionItem?
  bids                    Bid[]
  invites                 AuctionInvite[]
  extensions              AntiSnipeExtension[]
  winning_bid             Bid?            @relation("winning_bid", fields: [winning_bid_id], references: [id])

  @@index([status, scheduled_end_time])
  @@index([seller_id])
  @@index([tenant_id, visibility, status])
  @@index([category, status])
}

model AuctionItem {
  id            String   @id @default(uuid())
  auction_id    String   @unique
  condition     String   // 'NEW' | 'LIKE_NEW' | 'GOOD' | 'FAIR' | 'POOR'
  brand         String?
  auction       Auction  @relation(fields: [auction_id], references: [id], onDelete: Cascade)
  images        AuctionItemImage[]
}

model AuctionItemImage {
  id            String   @id @default(uuid())
  item_id       String
  url           String
  display_order Int      @default(0)
  created_at    DateTime @default(now())
  item          AuctionItem @relation(fields: [item_id], references: [id], onDelete: Cascade)
  @@index([item_id])
}

model Bid {
  id                 String   @id @default(uuid())
  auction_id         String
  bidder_id          String
  amount             Decimal  @db.Decimal(12, 2)
  // Proxy fields — populated in Sprint 5. Add columns now.
  proxy_max_amount   Decimal? @db.Decimal(12, 2)   // For Forward: max; for Reverse: min floor
  is_proxy_generated Boolean  @default(false)
  server_timestamp   DateTime @default(now())
  created_at         DateTime @default(now())
  auction            Auction  @relation(fields: [auction_id], references: [id])
  bidder             User     @relation("bids_as_bidder", fields: [bidder_id], references: [id])

  @@index([auction_id, server_timestamp])
  @@index([auction_id, amount])
  @@index([bidder_id])
}

model AuctionInvite {
  id              String   @id @default(uuid())
  auction_id      String
  invitee_email   String    // not necessarily a registered user
  invitee_user_id String?
  status          String   @default("PENDING") // PENDING, ACCEPTED, DECLINED, EXPIRED
  invited_at      DateTime @default(now())
  responded_at    DateTime?
  @@unique([auction_id, invitee_email])
  @@index([invitee_user_id])
}

model AntiSnipeExtension {
  id                String   @id @default(uuid())
  auction_id        String
  triggering_bid_id String
  extension_number  Int       // 1, 2, 3...
  previous_end_time DateTime
  new_end_time      DateTime
  created_at        DateTime  @default(now())
  auction           Auction   @relation(fields: [auction_id], references: [id])
  @@index([auction_id])
}

// Update User model (from Sprint 1) to add the back-relations:
//   auctions_as_seller  Auction[]   @relation("auctions_as_seller")
//   bids_as_bidder      Bid[]       @relation("bids_as_bidder")

MIGRATION:
`pnpm db:migrate:dev --name sprint-2-auctions`

SEED:
Extend prisma/seed.ts (idempotent) to also create a handful of PUBLISHED and OPEN auctions across tenants for local testing. Do NOT commit auction IDs that tests rely on — tests should create their own fixtures.
```

### Definition of Done

Every requirement in the task block above is implemented, tested, reviewed, and merged to `develop`. All listed tests pass. No feature outside the stated scope of this branch is added.

---

# SPRINT 6 — Auction Lifecycle & Scheduling

> **Branch:** `feat/sprint-2-auction-core`
>
> **Legacy group:** this is one slice of what `plan_v4.md` Section 9 called **Sprint 2**. In this prompts.md that group has been split so each branch is its own sprint. **Inside the prompt body below, any reference to "Sprint N" means the original `plan_v4.md` Section 9 grouping, not a sprint number in this file.**

> **Plan reference:** `plan_v4.md` Section 9 → "Sprint 2". Also Sections 3.2, 3.3, 5.1 (Forward Auction), 6.1 (Bid Submission Flow — the single most important section of the entire plan), 6.4 (Anti-Sniping), 6.5 (Seller cannot cancel open auction), 6.6 (Reserve Price), 7.6 (concurrent bids), 7.9 (no bids), 8.2 (4-layer architecture), 8.3 (MOD-AUCTION, MOD-BID, MOD-AUDIT), Section 11 (Risks R01, R03, R10, R12, R14).

### Execution Mode

**Linear, single branch.** Start only after the previous sprint has merged to `develop`. One branch, one PR, one Definition of Done. When this branch merges, move to the next sprint.

### Prompt

```
ROLE: You are a senior backend engineer implementing the core auction and bidding engine of a production-grade online auction platform. This is the most complex sprint of the project.

PRIMARY DIRECTIVE:
Open `plan_v4.md` at the repo root and read it end-to-end before touching code. For this sprint, the mandatory sections to re-read in depth are:

- Section 5.1 (Forward Auction) — configuration, validation, winner determination, edge cases
- Section 6.1 (Bid Submission Flow) — MEMORISE this 15-step pipeline; every bid in the entire system goes through it
- Section 6.4 (Anti-Sniping) — trigger, extension math, Bull job rescheduling, max extensions
- Section 6.5 (Seller Cannot Cancel Open Auction) — the cancel button is HIDDEN not just disabled after OPEN
- Section 6.6 (Reserve Price) — hidden from everyone forever; FAILED if not met; special Sealed Bid behaviour (Sprint 4 concern, but model for it now)
- Section 7.6 (Two bidders at same millisecond) — Redis SETNX, 500ms lock wait, soft-error UI
- Section 7.9 (No bids → FAILED for every format)
- Section 7.7 (Seller edits after PUBLISHED) — some fields lock once OPEN
- Section 8.2 (4-layer architecture) — keep domain layer PURE: no Prisma, no Express
- Section 11 Risks R01, R03, R10, R11, R12, R14 — each has a specified mitigation you must implement

GOAL:
Deliver a fully working Forward Auction end-to-end, minus real-time UI (that's Sprint 3). By end of sprint: a verified seller can create a Forward auction, publish it, have it auto-open at start time, have two bidders submit valid competing bids, have anti-sniping extend the close time correctly, and have it auto-close and transition to AWARDED (reserve met) or FAILED (no bids or reserve not met) with correct winner determination and full audit trail.

No WebSockets in this sprint. No real-time. The client polls (Sprint 3 replaces polling). No Reverse / Sealed / Dutch (Sprint 4). No Private auctions (Sprint 3). No proxy bidding (Sprint 5). No search (Sprint 5). No reviews (Sprint 5). No admin dashboards (Sprint 6).

═════════════════════════════════════════════════
BRANCH: feat/sprint-2-auction-core
═════════════════════════════════════════════════


Layout:
apps/api/src/modules/auctions/
  auction.router.ts
  auction.controller.ts
  auction.service.ts
  auction.repository.ts
  auction.schemas.ts
  auction.errors.ts
  auction.code-generator.ts    ← 8-char alphanumeric + collision check

packages/domain/src/auction/
  auction-state-machine.ts     ← PURE: given (currentStatus, event) → (nextStatus, emitted events)
  auction-state-machine.test.ts
  auction.types.ts             ← enums mirrored from Prisma for the pure domain layer

apps/worker/src/jobs/
  auction-open.job.ts
  auction-close.job.ts

═══ State Machine (packages/domain/src/auction/auction-state-machine.ts) ═══

Allowed transitions (plan_v4.md Section 13 + 6.5 + 7.9):

  DRAFT     → PUBLISHED  (seller action)
  DRAFT     → CANCELLED  (seller action)
  PUBLISHED → OPEN       (scheduler at start_time)
  PUBLISHED → CANCELLED  (seller action — only before OPEN)
  OPEN      → EXTENDED   (bid in anti-snipe window)
  OPEN      → CLOSED     (scheduler at end_time)
  EXTENDED  → EXTENDED   (repeated extensions within max)
  EXTENDED  → CLOSED     (scheduler at new_end_time)
  CLOSED    → AWARDED    (winner determined, reserve met)
  CLOSED    → FAILED     (no bids OR reserve not met)
  *         → CANCELLED  ONLY by PLATFORM_ADMIN (force-cancel, plan 6.5)

Disallowed transitions must throw `InvalidStateTransitionError` from the domain layer.

Design:
- The state machine is a pure function: `transition(current: AuctionStatus, event: AuctionEvent): AuctionStatus`.
- No Prisma, no dates, no I/O. It just validates the move.
- Unit tests enumerate EVERY valid and invalid pair. Do not skip.

═══ Auction Code Generator ═══

- 8 chars, alphanumeric, human-readable (exclude 0/O/1/I/l).
- Collision check: generate → query — unique? If not, retry up to 5 times. After 5 failures, throw.
- Plan 11 R11: 8 chars from ~32-symbol alphabet ≈ 10^12 space → collision rate effectively zero, but enforce the check anyway.
- Unit test the generator's character set and the collision retry loop with a mocked repository.

═══ Auction Endpoints (all under /api/v1/auctions) ═══

All endpoints require authentication. Some require specific roles or verified status — documented per endpoint.

POST /
  Role: STUDENT (verified).
  Body (Zod-validated):
    {
      format: 'FORWARD',  // only FORWARD accepted in Sprint 2; schema passes the enum through but service layer rejects others with 400
      title: string (5–120 chars),
      description: string (20–5000 chars),
      category: AuctionCategory,
      visibility: 'PUBLIC' | 'UNIVERSITY_RESTRICTED',  // no PRIVATE in Sprint 2
      starting_price: number (>= 1, max 2 decimals),
      increment_amount: number (>= 1, max 2 decimals),
      reserve_price?: number (>= starting_price if provided),
      scheduled_start_time: ISO 8601 (>= now + 5 min, <= now + 30 days),
      scheduled_end_time: ISO 8601 (>= start + 1 hour, <= start + 7 days),
      anti_snipe_window_min?: number (default 3, range 1–60),
      anti_snipe_extension_min?: number (default 3, range 1–60),
      max_extensions?: number (default 10, range 0–50),
      item: {
        condition: enum,
        brand?: string,
        image_urls: string[]  // up to 10; URLs returned from POST /uploads/images earlier
      }
    }
  Behaviour:
    - Auction is created in DRAFT (not PUBLISHED — seller must publish explicitly, plan US09).
    - Generate auction_code via the generator.
    - Snapshot tenant_id from seller.
    - If visibility=UNIVERSITY_RESTRICTED, seller MUST have a tenant_id (else 400).
    - Write audit: AUCTION_CREATED.
  Returns: 201 { auction }.

GET /:id
  Access rules (plan Section 4):
    - PUBLIC auction: any authenticated user can read.
    - UNIVERSITY_RESTRICTED: only users whose tenant_id equals the auction's tenant_id, OR platform_admin.
    - PRIVATE: (not in Sprint 2 — rejected) — but reserve the code path for Sprint 3.
    - Sellers can always read their own draft.
  Returns the auction with item + images + seller public profile (id, displayName, profileImageUrl, averageRating).
  NEVER include: reserve_price (unless requester is the seller or platform_admin), bidder identities on bids, proxy_max_amount on any bid.

GET /
  Query params: status, category, format, tenant_id (with ACL), seller_id, page, limit (default 20, max 50).
  Returns: paginated list filtered by ACL (e.g. UNIVERSITY_RESTRICTED from other tenants are never returned to a student from a different tenant).
  Sort: scheduled_end_time ASC by default.

PATCH /:id
  Role: owner (seller) OR platform_admin.
  Body: partial of creation body minus format.
  State-dependent field locking (plan 7.7):
    - DRAFT: all fields editable.
    - PUBLISHED: title, description, item.images editable. Pricing, timing, format, visibility LOCKED.
    - OPEN / EXTENDED: item.description and item.images only. Every other field LOCKED.
    - Any other state: 409 Conflict.
  Write audit: AUCTION_UPDATED with a JSON diff of what changed.

POST /:id/publish
  Role: owner.
  - Auction must be DRAFT.
  - Validate all required fields are set (image count ≥ 1 recommended, not required — note this).
  - Transition DRAFT → PUBLISHED via state machine.
  - Schedule Bull job: `auction-open` with delay = (scheduled_start_time - now).
  - Schedule Bull job: `auction-close` with delay = (scheduled_end_time - now).
  - Audit: AUCTION_PUBLISHED.
  - If scheduled_start_time <= now (edge case): open immediately, do not schedule the open job.
  Returns: 200 { auction }.

POST /:id/cancel
  Role: owner (only while DRAFT or PUBLISHED — plan US16/US17 and Section 6.5) OR platform_admin (any state except terminal).
  - Seller cancel: only DRAFT or PUBLISHED. Once OPEN, return 403 "An open auction cannot be cancelled by the seller. Contact platform administration for emergencies."
  - Admin cancel: body required { reason: string }. State → CANCELLED. Reason stored in audit. Notify all bidders (stub in Sprint 2; real WS in Sprint 3).
  - Cancel Bull jobs (open + close).
  - Audit: AUCTION_CANCELLED with actor_role in metadata.

GET /:id/bids/mine
  Role: authenticated.
  Returns the requesting user's own bids on this auction (identity fully revealed to self — this is the only place).

GET /:id/bids
  Role: authenticated + access to auction.
  Returns anonymised bid history: [{ amount, server_timestamp, rank }] — NO bidder_id, NO names. Order by server_timestamp DESC.
  For SEALED auctions (Sprint 4) this endpoint returns 403 until closure. For Sprint 2 (Forward only), always allowed.

═══ Bull Jobs (apps/worker/src/jobs/) ═══

auction-open.job.ts:
  processor(job):
    - Read auction by id (job payload).
    - If status !== PUBLISHED → log warning and exit (idempotent).
    - Transition PUBLISHED → OPEN in a DB transaction. Set actual_start_time = now. Initialise current_price = starting_price.
    - Audit: AUCTION_OPENED.
    - For Sprint 2, no WebSocket emission. Just return.

auction-close.job.ts:
  processor(job):
    - Read auction by id.
    - If status NOT in (OPEN, EXTENDED) → log warning, exit (maybe the auction was cancelled; idempotent).
    - Transition to CLOSED. Set actual_end_time = now.
    - Determine outcome in the same transaction:
        - Find highest bid by (amount DESC, server_timestamp ASC).
        - If no bids: status → FAILED. Audit: AUCTION_FAILED_NO_BIDS.
        - If highest.amount < reserve_price (if reserve set): status → FAILED. Audit: AUCTION_FAILED_RESERVE_NOT_MET.
        - Else: status → AWARDED, winning_bid_id = highest.id. Audit: AUCTION_AWARDED with winner's user_id in metadata.
    - Commit.
    - Queue notifications (stub — Sprint 3 fully implements delivery).

Job options:
  - attempts: 3, backoff: { type: 'exponential', delay: 2000 }
  - removeOnComplete: true, removeOnFail: false
  - jobId = `auction-close:${auctionId}` — idempotency key (plan Section 11 R03).

Job rescheduling (used by anti-snipe in the other branch): the job must be re-queue-able. When anti-snipe triggers, the BidService calls AuctionScheduler.rescheduleClose(auctionId, newEndTime), which: removes the old job by jobId, enqueues a new one with the same jobId and new delay.

═══ TESTS ═══

- Unit tests for auction-state-machine (every transition pair).
- Unit tests for auction.code-generator.
- Integration tests for every endpoint: happy, validation, ACL, state conflicts.
- Integration tests for the Bull jobs: run them synchronously via `queue.process()` against a test Redis.
- Scheduled open/close: insert an auction with start_time = now + 100ms, end_time = now + 500ms; run the scheduler; assert final status is FAILED (no bids).
```

### Definition of Done

Every requirement in the task block above is implemented, tested, reviewed, and merged to `develop`. All listed tests pass. No feature outside the stated scope of this branch is added.

---

# SPRINT 7 — Bid Submission Pipeline (Forward)

> **Branch:** `feat/sprint-2-bid-pipeline`
>
> **Legacy group:** this is one slice of what `plan_v4.md` Section 9 called **Sprint 2**. In this prompts.md that group has been split so each branch is its own sprint. **Inside the prompt body below, any reference to "Sprint N" means the original `plan_v4.md` Section 9 grouping, not a sprint number in this file.**

> **Plan reference:** `plan_v4.md` Section 9 → "Sprint 2". Also Sections 3.2, 3.3, 5.1 (Forward Auction), 6.1 (Bid Submission Flow — the single most important section of the entire plan), 6.4 (Anti-Sniping), 6.5 (Seller cannot cancel open auction), 6.6 (Reserve Price), 7.6 (concurrent bids), 7.9 (no bids), 8.2 (4-layer architecture), 8.3 (MOD-AUCTION, MOD-BID, MOD-AUDIT), Section 11 (Risks R01, R03, R10, R12, R14).

### Execution Mode

**Linear, single branch.** Start only after the previous sprint has merged to `develop`. One branch, one PR, one Definition of Done. When this branch merges, move to the next sprint.

### Prompt

```
ROLE: You are a senior backend engineer implementing the core auction and bidding engine of a production-grade online auction platform. This is the most complex sprint of the project.

PRIMARY DIRECTIVE:
Open `plan_v4.md` at the repo root and read it end-to-end before touching code. For this sprint, the mandatory sections to re-read in depth are:

- Section 5.1 (Forward Auction) — configuration, validation, winner determination, edge cases
- Section 6.1 (Bid Submission Flow) — MEMORISE this 15-step pipeline; every bid in the entire system goes through it
- Section 6.4 (Anti-Sniping) — trigger, extension math, Bull job rescheduling, max extensions
- Section 6.5 (Seller Cannot Cancel Open Auction) — the cancel button is HIDDEN not just disabled after OPEN
- Section 6.6 (Reserve Price) — hidden from everyone forever; FAILED if not met; special Sealed Bid behaviour (Sprint 4 concern, but model for it now)
- Section 7.6 (Two bidders at same millisecond) — Redis SETNX, 500ms lock wait, soft-error UI
- Section 7.9 (No bids → FAILED for every format)
- Section 7.7 (Seller edits after PUBLISHED) — some fields lock once OPEN
- Section 8.2 (4-layer architecture) — keep domain layer PURE: no Prisma, no Express
- Section 11 Risks R01, R03, R10, R11, R12, R14 — each has a specified mitigation you must implement

GOAL:
Deliver a fully working Forward Auction end-to-end, minus real-time UI (that's Sprint 3). By end of sprint: a verified seller can create a Forward auction, publish it, have it auto-open at start time, have two bidders submit valid competing bids, have anti-sniping extend the close time correctly, and have it auto-close and transition to AWARDED (reserve met) or FAILED (no bids or reserve not met) with correct winner determination and full audit trail.

No WebSockets in this sprint. No real-time. The client polls (Sprint 3 replaces polling). No Reverse / Sealed / Dutch (Sprint 4). No Private auctions (Sprint 3). No proxy bidding (Sprint 5). No search (Sprint 5). No reviews (Sprint 5). No admin dashboards (Sprint 6).

═════════════════════════════════════════════════
BRANCH: feat/sprint-2-bid-pipeline
═════════════════════════════════════════════════


Layout:
apps/api/src/modules/bids/
  bid.router.ts
  bid.controller.ts
  bid.service.ts
  bid.repository.ts
  bid.schemas.ts
  bid.errors.ts

packages/domain/src/auction/
  bid-validation-strategy.ts         ← interface
  forward-bid-validation-strategy.ts ← Sprint 2
  reverse-bid-validation-strategy.ts ← stub, Sprint 4
  sealed-bid-validation-strategy.ts  ← stub, Sprint 4
  dutch-acceptance-strategy.ts       ← stub, Sprint 4
  ranking-engine.ts
  anti-snipe-service.ts

apps/api/src/infra/redis/
  distributed-lock.ts   ← SETNX with expiry + safe release via Lua

═══ Distributed Lock ═══

Implements plan Section 6.1 step 8 and Section 7.6.

API:
  async acquire(resource: string, ttlMs: number, waitMs: number): Promise<Lock | null>
  async release(lock: Lock): Promise<void>

Implementation:
- Key: `lock:${resource}` — e.g. `lock:auction:abc123`.
- Value: a random UUID (the lock's "fencing token").
- SET key value NX PX ttlMs.
- If SET returns OK → acquired.
- If not acquired: retry with 25ms jitter until waitMs elapses. Then return null.
- Release: Lua script that checks the value matches the token before DEL, so you only ever release YOUR lock. Never plain DEL.

TTL:
- Bid processing typical ≤ 200ms. Use ttlMs = 5000 (safety margin).
- waitMs = 500 per plan 7.6.

Tests:
- Two concurrent callers, assert exactly one gets the lock, the other times out at ~500ms.
- A caller that holds the lock and doesn't release before TTL — the key auto-expires; next caller acquires.
- Release with wrong token does nothing (the Lua script returns 0).

═══ Bid Validation Strategy Pattern ═══

interface BidValidationStrategy {
  validate(input: BidValidationInput): BidValidationResult;
}

type BidValidationInput = {
  auction: {
    format: AuctionFormat,
    status: AuctionStatus,
    starting_price: Decimal,
    current_price: Decimal,
    increment_amount: Decimal,
    seller_id: string,
  },
  bidder: { id: string, status: UserStatus, email_verified: boolean, tenant_id: string | null },
  proposed_amount: Decimal,
  existing_bids_by_bidder: number  // needed for Sealed
}

type BidValidationResult =
  | { ok: true }
  | { ok: false, code: string, message: string }

ForwardBidValidationStrategy implements plan Section 5.1 "Bid Validation Rules" exactly:
  - status ∈ [OPEN, EXTENDED] else code=AUCTION_NOT_OPEN
  - bidder.id !== auction.seller_id else code=SELF_BID_FORBIDDEN
  - bidder.email_verified else code=EMAIL_VERIFICATION_REQUIRED
  - proposed_amount >= current_price + increment_amount else code=BID_TOO_LOW with message that includes the minimum required amount
  - proposed_amount is positive, has at most 2 decimals, and is <= 10,000,000 (reasonable ceiling; document the constant)

ALL other strategies return { ok: false, code: 'NOT_IMPLEMENTED_IN_SPRINT_2' } — to be implemented in Sprint 4.

Strategy factory:
  function getStrategy(format: AuctionFormat): BidValidationStrategy

Unit tests enumerate every rule with boundary conditions: exactly equal (rejected), one paisa below (rejected), one paisa above (accepted), negative, zero, too many decimals, exceeding ceiling.

═══ Ranking Engine ═══

For Sprint 2 (Forward only):

function computeRanking(bids: Bid[]): Map<userId, rank>
  - Sort bids by amount DESC, server_timestamp ASC.
  - The leading bid per user is their highest; only that one counts for ranking.
  - Assign rank 1 to the top user, 2 to the next, etc.

function rankSignal(userRank: number | null, totalBidders: number): 'green' | 'yellow' | 'red' | null
  - null if user has no bid.
  - 'green' if rank === 1.
  - 'yellow' if rank > 1 AND rank <= Math.ceil(totalBidders / 2).
  - 'red' otherwise.
  Document this formula in a docblock — the plan describes the signal but leaves exact thresholds to our design.

Unit test with 1 bidder, 2 bidders, 5 bidders, 10 bidders.

═══ Anti-Snipe Service ═══

Pure function per plan 6.4:

function shouldExtend(input: { bid_time: Date, end_time: Date, anti_snipe_window_min: number, extension_count: number, max_extensions: number }): { extend: boolean, new_end_time?: Date }

Rules:
  - If extension_count >= max_extensions → extend: false.
  - If bid_time > (end_time - window_min * 60_000) → extend: true, new_end_time = end_time + extension_min * 60_000.
  - Else → extend: false.

Unit tests for: exactly at the boundary, 1ms before boundary, 1ms after, at max extensions, above max.

═══ Bid Submission Endpoint ═══

POST /api/v1/auctions/:auctionId/bids
  Middleware chain: authenticate → requireActiveAccount → requireVerified (plan 6.1 step 3).
  Body: { amount: number, proxy_max_amount?: number (ignored in Sprint 2 — store column for Sprint 5) }
  Implementation MUST follow plan Section 6.1 steps 1–15 EXACTLY.

Step-by-step in code:

  1. Zod-validate body.
  2. Lookup auction by id (cached read fine; we verify state under lock later). Return 404 if not found.
  3. ACL: public vs university-restricted access check. Private is Sprint 3.
  4. Pre-lock state check: status in [OPEN, EXTENDED]. If not, 400 with code=AUCTION_NOT_OPEN.
  5. Self-bid check: return 400 code=SELF_BID_FORBIDDEN.
  6. Format strategy pre-check: run strategy.validate() WITHOUT the lock using the stale current_price. Catches obvious "bid too low" errors cheaply.
  7. Acquire Redis lock `lock:auction:{auctionId}` with TTL 5000ms, wait 500ms.
     - If not acquired: 503 { error: 'BID_CONCURRENCY', message: 'Please try again — another bid is being processed' }.
  8. BEGIN Postgres transaction (Prisma $transaction with SERIALIZABLE isolation level):
     a. SELECT auction FOR UPDATE (re-read with lock so in-memory copy is authoritative).
     b. Re-run strategy.validate() against the re-read auction.current_price. If reject now (maybe another bid landed between step 6 and step 7a), return 400.
     c. INSERT bid with server_timestamp = NOW().
     d. UPDATE auction.current_price = bid.amount (Forward; other formats differ — Sprint 4 changes this to strategy-defined update).
     e. Compute anti-snipe: AntiSnipeService.shouldExtend(...). If extend:
          - UPDATE auction.scheduled_end_time = new_end_time, status = 'EXTENDED', extension_count++.
          - INSERT AntiSnipeExtension row.
     f. INSERT AuditLog rows: BID_PLACED (always); AUCTION_EXTENDED (if extended).
     g. COMMIT.
  9. Release Redis lock (in `finally` block guarded so a failed tx still releases).
  10. If extended: call AuctionScheduler.rescheduleClose(auctionId, new_end_time) (outside the DB transaction, but before responding — if this fails, log the incident; retry 3 times before giving up).
  11. Return 201 { bid: { id, amount, server_timestamp }, auction: { current_price, status, scheduled_end_time, extension_count } }.

If any step between 8.a and 8.f throws: Prisma rolls back the transaction; the lock is still held; step 9 releases it in a `finally` block.

Proxy bidding triggers (plan 6.3): stub only in Sprint 2 — add a `TODO(sprint-5): trigger proxy chain` comment.

Outbid notifications (plan 6.1 step 14): stub — log 'pretend-notify: user X was outbid'. Add the audit log entry BIDDER_OUTBID.

═══ Error Codes (complete list this sprint adds) ═══

  AUCTION_NOT_FOUND
  AUCTION_NOT_OPEN
  AUCTION_INVALID_STATE
  AUCTION_ACCESS_DENIED
  SELF_BID_FORBIDDEN
  BID_TOO_LOW
  BID_INVALID_AMOUNT
  BID_CONCURRENCY
  EMAIL_VERIFICATION_REQUIRED
  INVALID_STATE_TRANSITION

Every code has a machine-readable constant and a consistent human message. Document in `apps/api/src/errors/codes.ts`.

═══ TESTS (mandatory) ═══

Unit:
- Every bid validation strategy rule, every boundary condition.
- Ranking engine with 0, 1, 2, 5, 10 bidders.
- Anti-snipe math at every boundary.
- State machine every transition.

Integration:
- A full bid from verified bidder → 201 → current_price updated, audit logged.
- Bid below increment → 400.
- Bid on own auction → 400.
- Bid on UNIVERSITY_RESTRICTED from different tenant → 403.
- Bid on CANCELLED auction → 400.
- Two concurrent bids (use Promise.all with hand-crafted delays) → exactly one succeeds, one receives 503 or 400.
- Anti-snipe: place a bid in the last 2 minutes (window=3) → auction is now EXTENDED with extension_count=1 and end_time pushed back by 3 min. Verify the Bull job's delay updates.
- Anti-snipe cap: force extension_count=10 in the DB, place a bid in the window → auction remains OPEN, no new extension.
- Reserve not met: configure reserve_price=1000, end auction with highest bid 999 → FAILED.
- No bids: end auction empty → FAILED.

Load-style (non-CI, runnable locally):
- A small script that launches 50 concurrent bidders against one auction and asserts all bids are ordered correctly (no duplicate current_price steps, no lost bids).
```

### Definition of Done

Every requirement in the task block above is implemented, tested, reviewed, and merged to `develop`. All listed tests pass. No feature outside the stated scope of this branch is added.

---

# SPRINT 8 — Auction Image Upload

> **Branch:** `feat/sprint-2-image-upload`
>
> **Legacy group:** this is one slice of what `plan_v4.md` Section 9 called **Sprint 2**. In this prompts.md that group has been split so each branch is its own sprint. **Inside the prompt body below, any reference to "Sprint N" means the original `plan_v4.md` Section 9 grouping, not a sprint number in this file.**

> **Plan reference:** `plan_v4.md` Section 9 → "Sprint 2". Also Sections 3.2, 3.3, 5.1 (Forward Auction), 6.1 (Bid Submission Flow — the single most important section of the entire plan), 6.4 (Anti-Sniping), 6.5 (Seller cannot cancel open auction), 6.6 (Reserve Price), 7.6 (concurrent bids), 7.9 (no bids), 8.2 (4-layer architecture), 8.3 (MOD-AUCTION, MOD-BID, MOD-AUDIT), Section 11 (Risks R01, R03, R10, R12, R14).

### Execution Mode

**Linear, single branch.** Start only after the previous sprint has merged to `develop`. One branch, one PR, one Definition of Done. When this branch merges, move to the next sprint.

### Prompt

```
ROLE: You are a senior backend engineer implementing the core auction and bidding engine of a production-grade online auction platform. This is the most complex sprint of the project.

PRIMARY DIRECTIVE:
Open `plan_v4.md` at the repo root and read it end-to-end before touching code. For this sprint, the mandatory sections to re-read in depth are:

- Section 5.1 (Forward Auction) — configuration, validation, winner determination, edge cases
- Section 6.1 (Bid Submission Flow) — MEMORISE this 15-step pipeline; every bid in the entire system goes through it
- Section 6.4 (Anti-Sniping) — trigger, extension math, Bull job rescheduling, max extensions
- Section 6.5 (Seller Cannot Cancel Open Auction) — the cancel button is HIDDEN not just disabled after OPEN
- Section 6.6 (Reserve Price) — hidden from everyone forever; FAILED if not met; special Sealed Bid behaviour (Sprint 4 concern, but model for it now)
- Section 7.6 (Two bidders at same millisecond) — Redis SETNX, 500ms lock wait, soft-error UI
- Section 7.9 (No bids → FAILED for every format)
- Section 7.7 (Seller edits after PUBLISHED) — some fields lock once OPEN
- Section 8.2 (4-layer architecture) — keep domain layer PURE: no Prisma, no Express
- Section 11 Risks R01, R03, R10, R11, R12, R14 — each has a specified mitigation you must implement

GOAL:
Deliver a fully working Forward Auction end-to-end, minus real-time UI (that's Sprint 3). By end of sprint: a verified seller can create a Forward auction, publish it, have it auto-open at start time, have two bidders submit valid competing bids, have anti-sniping extend the close time correctly, and have it auto-close and transition to AWARDED (reserve met) or FAILED (no bids or reserve not met) with correct winner determination and full audit trail.

No WebSockets in this sprint. No real-time. The client polls (Sprint 3 replaces polling). No Reverse / Sealed / Dutch (Sprint 4). No Private auctions (Sprint 3). No proxy bidding (Sprint 5). No search (Sprint 5). No reviews (Sprint 5). No admin dashboards (Sprint 6).

═════════════════════════════════════════════════
BRANCH: feat/sprint-2-image-upload
═════════════════════════════════════════════════


Plan Section 8.4 says file storage is TBD. Plan Section 12 confirms "File storage provider selection — To be decided in a future plan revision; placeholder integration used during development". Plan Section 11 R12 requires MIME + 5MB limit enforced server-side.

Implementation:

apps/api/src/infra/storage/
  storage.interface.ts
  local-disk-storage.ts        ← Sprint 2 implementation
  storage.provider.ts          ← switchable via env var STORAGE_PROVIDER (default 'local')

interface StorageProvider {
  upload(input: { buffer: Buffer, mime: string, originalName: string }): Promise<{ url: string, key: string }>;
  delete(key: string): Promise<void>;
}

LocalDiskStorage:
  - Stores files under `./storage-data/` (gitignored, docker volume in compose).
  - Serves them via a static route at /static/uploads/* mounted at the Express level behind a signed-URL verifier (HMAC with a TTL) so URLs aren't guessable.
  - The `url` returned is a fully-qualified URL including signature: e.g. `${API_ORIGIN}/static/uploads/<key>?sig=<hmac>&exp=<unix>`.
  - In production this provider will be swapped for S3/R2/GCS in a later sprint — do not over-invest.

Endpoint:
POST /api/v1/uploads/images
  Multipart form-data, field `file`.
  Rules (plan R12):
    - MIME: only image/jpeg, image/png, image/webp.
    - Size: 5,242,880 bytes (5 MB) max — enforced by multer.
    - Dimension validation: decode with `sharp`; reject if width*height > 30_000_000 (30 MP) or either dimension < 100.
    - Strip EXIF metadata with sharp to avoid leaking location data.
    - Re-encode to reduce attack surface: sharp().jpeg({ quality: 85 }) etc.
    - Generate a fresh filename (uuid + extension).
  Requires: authenticated + verified.
  Returns: 201 { url, key }.
  Audit: IMAGE_UPLOADED with metadata { mime, bytes, key }.

Rate limit: 30 uploads per user per hour (configurable).

Tests:
- Valid JPEG upload → 201, URL fetchable.
- 6 MB file → 413 Payload Too Large.
- text/html pretending to be image/jpeg (magic number check fails) → 400.
- 1x1 tiny image → 400 DIMENSION_TOO_SMALL.
- Fetch URL without signature or with expired signature → 403.

═════════════════════════════════════════════════
CROSS-CUTTING (all Sprint 2 branches)
═════════════════════════════════════════════════

Observability:
- Every bid submission logs: auction_id, bidder_id, amount, duration_ms, lock_wait_ms, db_tx_ms.
- Metric counters (wire prometheus in Sprint 7): bid_accepted_total, bid_rejected_total by reason, anti_snipe_triggered_total.

Error handling:
- All domain errors have a mapped HTTP status in the error handler added in Sprint 1.
- InvalidStateTransitionError → 409.
- BidValidationError → 400 with the code from the strategy.
- BidConcurrencyError → 503.

DO NOT leak:
- Reserve price to anyone but seller/admin.
- Bidder identity in any bid list.
- Proxy max (columns exist but never selected by any read method; whitelist columns in repository reads — Sprint 5 reinforces per plan R05).

HANDOFF TO SPRINT 3:
- Auction, Bid, AuctionItem tables populated and stable.
- Bid submission pipeline fully functional (REST only, no realtime).
- Anti-sniping works deterministically.
- Private visibility mode is a Prisma enum value not yet honoured by any endpoint — Sprint 3 activates it.
- Notification "stub" calls exist at the right moments — Sprint 3 replaces them with real delivery.
```

### Definition of Done (Sprint 2)

Matches `plan_v4.md` Section 9 Sprint 2 DoD: _"A seller can create and publish a Forward auction. Two bidders can submit bids in sequence. Anti-sniping triggers correctly. Auction closes and AWARDED status is set correctly."_

Plus every test class listed must be green, including the concurrent-bid test.

---

# SPRINT 9 — Realtime & Notifications Schema

> **Branch:** `feat/sprint-3-schema`
>
> **Legacy group:** this is one slice of what `plan_v4.md` Section 9 called **Sprint 3**. In this prompts.md that group has been split so each branch is its own sprint. **Inside the prompt body below, any reference to "Sprint N" means the original `plan_v4.md` Section 9 grouping, not a sprint number in this file.**

> **Plan reference:** `plan_v4.md` Section 9 → "Sprint 3". Also Sections 3.4, 4 (Auction Access Model — all three visibility modes now live), 6.2 (Real-Time Bidding Experience — the WebSocket architecture), 6.9 (Notifications), 7.3 (Multiple tabs), 7.4 (Server down), 7.12 (Watchlisted auction cancelled), 8.3 (MOD-NOTIFY), Section 11 Risks R04 (offline outbid), R06 (sealed privacy — relevant forward-looking), R07 (private discoverable), R08 (session expiry mid-bid).

### Execution Mode

**Linear, single branch.** Start only after the previous sprint has merged to `develop`. One branch, one PR, one Definition of Done. When this branch merges, move to the next sprint.

### Prompt

```
ROLE: You are a senior full-stack engineer. You are implementing Sprint 3, which transforms the polling-based auction from Sprint 2 into a real-time, private-capable, notification-driven platform.

PRIMARY DIRECTIVE:
Open `plan_v4.md` at the repo root. Read the entire file before starting. Then re-read in depth:

- Section 4 (Auction Access Model) — the three modes and especially 4.2 (codes and links), 4.3 (joining), 4.4 (visibility change rules), 4.5 (invites)
- Section 6.2 (Real-Time Bidding Experience) — room architecture, event names, reconnection protocol, what each user role sees
- Section 6.9 (Notifications) — channels, priority, email fallback rules
- Section 7.3, 7.4, 7.5, 7.8, 7.12 — all the edge cases that realtime and notifications must survive
- Section 11 R04 (offline outbid must be persisted), R07 (private discoverable), R08 (session mid-bid), R09 (worker crash)

GOAL:
After this sprint:
- Bids update in real time via Socket.IO across every connected client to sub-1-second latency.
- Sellers can create Private auctions. Others can join by 8-char code, shareable link, or direct invite.
- Watchlists work, with 15-min-before-close notifications delivered in-app + email fallback for offline users.
- The notification inbox shows unread counts and persists across devices.
- The frontend has working pages for auction detail, bid placement, and notifications.

═════════════════════════════════════════════════
BRANCH: feat/sprint-3-schema
═════════════════════════════════════════════════


Add these models:

enum NotificationType {
  AUCTION_OPENED
  AUCTION_CLOSING_SOON
  AUCTION_EXTENDED
  AUCTION_OUTCOME_WON
  AUCTION_OUTCOME_LOST
  AUCTION_OUTCOME_FAILED_SELLER
  AUCTION_CANCELLED
  BIDDER_OUTBID
  INVITE_RECEIVED
  INVITE_RESPONSE
  REVIEW_REQUEST        // Sprint 5
  ACCOUNT_SUSPENDED      // Sprint 6
  SYSTEM                 // general
}

model Notification {
  id          String   @id @default(uuid())
  user_id     String
  type        NotificationType
  title       String
  body        String
  payload_json Json?   // { auctionId, bidAmount, ... } — flexible context
  deep_link   String?  // e.g. /auctions/abc123
  read_at     DateTime?
  created_at  DateTime @default(now())
  // For email fallback (plan 6.9)
  email_sent_at DateTime?
  email_suppressed Boolean @default(false)  // true if type is in "never email" list
  user        User     @relation(fields: [user_id], references: [id], onDelete: Cascade)
  @@index([user_id, read_at])
  @@index([user_id, created_at])
}

model Watchlist {
  id         String   @id @default(uuid())
  user_id    String
  auction_id String
  created_at DateTime @default(now())
  user       User     @relation(fields: [user_id], references: [id], onDelete: Cascade)
  auction    Auction  @relation(fields: [auction_id], references: [id], onDelete: Cascade)
  @@unique([user_id, auction_id])
  @@index([auction_id])
}

model ShareableLinkToken {
  id         String   @id @default(uuid())
  auction_id String
  token_hash String   @unique // SHA-256 of the token embedded in the URL
  created_by String
  created_at DateTime @default(now())
  revoked_at DateTime?
  auction    Auction  @relation(fields: [auction_id], references: [id], onDelete: Cascade)
  @@index([auction_id])
}

Update AuctionInvite — add `token_hash` field for per-invitee acceptance tokens (the email link carries this token):

model AuctionInvite {
  // ... existing fields ...
  invite_token_hash String? @unique
  // ...
}

Update User — add back-relations: watchlists, notifications, invitesSent.

Migration: `pnpm db:migrate:dev --name sprint-3-realtime-private-notify`
```

### Definition of Done

Every requirement in the task block above is implemented, tested, reviewed, and merged to `develop`. All listed tests pass. No feature outside the stated scope of this branch is added.

---

# SPRINT 10 — Socket.IO Realtime Infrastructure

> **Branch:** `feat/sprint-3-realtime`
>
> **Legacy group:** this is one slice of what `plan_v4.md` Section 9 called **Sprint 3**. In this prompts.md that group has been split so each branch is its own sprint. **Inside the prompt body below, any reference to "Sprint N" means the original `plan_v4.md` Section 9 grouping, not a sprint number in this file.**

> **Plan reference:** `plan_v4.md` Section 9 → "Sprint 3". Also Sections 3.4, 4 (Auction Access Model — all three visibility modes now live), 6.2 (Real-Time Bidding Experience — the WebSocket architecture), 6.9 (Notifications), 7.3 (Multiple tabs), 7.4 (Server down), 7.12 (Watchlisted auction cancelled), 8.3 (MOD-NOTIFY), Section 11 Risks R04 (offline outbid), R06 (sealed privacy — relevant forward-looking), R07 (private discoverable), R08 (session expiry mid-bid).

### Execution Mode

**Linear, single branch.** Start only after the previous sprint has merged to `develop`. One branch, one PR, one Definition of Done. When this branch merges, move to the next sprint.

### Prompt

```
ROLE: You are a senior full-stack engineer. You are implementing Sprint 3, which transforms the polling-based auction from Sprint 2 into a real-time, private-capable, notification-driven platform.

PRIMARY DIRECTIVE:
Open `plan_v4.md` at the repo root. Read the entire file before starting. Then re-read in depth:

- Section 4 (Auction Access Model) — the three modes and especially 4.2 (codes and links), 4.3 (joining), 4.4 (visibility change rules), 4.5 (invites)
- Section 6.2 (Real-Time Bidding Experience) — room architecture, event names, reconnection protocol, what each user role sees
- Section 6.9 (Notifications) — channels, priority, email fallback rules
- Section 7.3, 7.4, 7.5, 7.8, 7.12 — all the edge cases that realtime and notifications must survive
- Section 11 R04 (offline outbid must be persisted), R07 (private discoverable), R08 (session mid-bid), R09 (worker crash)

GOAL:
After this sprint:
- Bids update in real time via Socket.IO across every connected client to sub-1-second latency.
- Sellers can create Private auctions. Others can join by 8-char code, shareable link, or direct invite.
- Watchlists work, with 15-min-before-close notifications delivered in-app + email fallback for offline users.
- The notification inbox shows unread counts and persists across devices.
- The frontend has working pages for auction detail, bid placement, and notifications.

═════════════════════════════════════════════════
BRANCH: feat/sprint-3-realtime
═════════════════════════════════════════════════


Create apps/api/src/socket/ (we share a process with Express in dev; in production the socket-server container may run a dedicated instance — plan 8.5. Use the Redis adapter from Sprint 0 so multi-instance fan-out works).

Layout:
apps/api/src/socket/
  server.ts              ← initialises Socket.IO, adapter, auth middleware
  auction-room.ts        ← room name helpers + join/leave
  events.ts              ← typed event contracts
  socket-auth.middleware.ts

═══ Socket.IO Server Initialisation ═══

const io = new Server(httpServer, {
  cors: { origin: [process.env.FRONTEND_ORIGIN], credentials: true },
  transports: ['websocket', 'polling'],
});
io.adapter(createAdapter(pubClient, subClient));   // @socket.io/redis-adapter

═══ Socket Auth Middleware ═══

Every socket connection must carry an accessToken (sent via the `auth` field in the handshake):

  io.use(async (socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error('AUTH_REQUIRED'));
    try {
      const payload = jwtVerify(token);
      socket.data.userId = payload.sub;
      socket.data.role = payload.role;
      socket.data.tenantId = payload.tenant_id;
      socket.data.emailVerified = payload.email_verified;
      next();
    } catch (e) {
      next(new Error('AUTH_INVALID'));
    }
  });

On connect, auto-join the user to their personal room:
  socket.join(`user:${socket.data.userId}`);

═══ Typed Event Contracts (events.ts) ═══

Define in packages/shared/src/socket-events.ts (shared with the web app):

  // room → client (auction room, all participants)
  type AuctionRoomEvents = {
    'new_high_bid':       { auctionId: string, newPrice: string, previousPrice: string, serverTimestamp: string };
    'auction_extended':   { auctionId: string, newEndTime: string, extensionNumber: number, maxExtensions: number };
    'auction_closed':     { auctionId: string, status: 'AWARDED' | 'FAILED' | 'CANCELLED', closedAt: string };
    'dutch_price_update': { auctionId: string, newPrice: string, nextTickAt: string };  // Sprint 4 uses this — define event name now
    'dutch_accepted':     { auctionId: string, finalPrice: string, acceptedAt: string }; // Sprint 4
    'ranking_update':     { auctionId: string }; // triggers clients to re-fetch rank
  }

  // room → specific user (personal room)
  type UserRoomEvents = {
    'rank_signal':        { auctionId: string, signal: 'green' | 'yellow' | 'red' | null };
    'bid_accepted':       { auctionId: string, bidId: string, amount: string, serverTimestamp: string };
    'outbid':             { auctionId: string, newPrice: string, yourLastBid: string };
    'notification':       { id: string, type: NotificationType, title: string, body: string, deepLink?: string };
    'bid_on_your_auction': { auctionId: string, newPrice: string, bidCount: number, timeRemaining: number }; // to seller only
  }

Anonymity rule from plan 6.2: NEVER broadcast a bidder_id on any auction-room event. Only `new_high_bid`, no names or counts of bidders per event (bidCount is a RUNNING total visible only to the seller).

═══ Room Joining on Page View ═══

Client-side (Sprint 3 frontend) calls `socket.emit('auction:join', { auctionId })` when the user opens the auction detail page.

Server handler:
  socket.on('auction:join', async ({ auctionId }) => {
    // ACL check: same rules as GET /auctions/:id.
    const ok = await canAccessAuction(socket.data, auctionId);
    if (!ok) return socket.emit('auction:join:denied', { auctionId, reason: 'ACCESS_DENIED' });
    socket.join(`auction:${auctionId}`);
    socket.emit('auction:join:ok', { auctionId });
  });

  socket.on('auction:leave', ({ auctionId }) => {
    socket.leave(`auction:${auctionId}`);
  });

═══ Emission from Bid Pipeline (edit Sprint 2 code) ═══

Extend apps/api/src/modules/bids/bid.service.ts: after step 10 of the pipeline (after rescheduleClose), emit:

  io.to(`auction:${auctionId}`).emit('new_high_bid', { auctionId, newPrice, previousPrice, serverTimestamp });
  if (extended) io.to(`auction:${auctionId}`).emit('auction_extended', { auctionId, newEndTime, extensionNumber, maxExtensions });

  io.to(`user:${bidder.id}`).emit('bid_accepted', { ... });
  io.to(`user:${bidder.id}`).emit('rank_signal', { auctionId, signal: 'green' });
  io.to(`user:${seller.id}`).emit('bid_on_your_auction', { ... });

  // For the previous leader (if any) who just got outbid:
  if (previousLeaderUserId) {
    io.to(`user:${previousLeaderUserId}`).emit('outbid', { ... });
    // Also create a persisted Notification row (see notifications branch).
    io.to(`user:${previousLeaderUserId}`).emit('rank_signal', { auctionId, signal: 'yellow-or-red' });
  }

Also emit `ranking_update` broadcast so every connected personal socket for this auction's participants can re-request rank. OR compute and emit fresh rank_signal per user — prefer the direct approach.

═══ Auction Open / Close Events (edit Sprint 2 worker) ═══

apps/worker/src/jobs/auction-open.job.ts: after transitioning → OPEN, publish via the Redis adapter's emission API (worker doesn't have the io instance — use `publishToRoom(redisClient, 'auction:{id}', 'auction_opened', {...})` helper):

  - Emit `auction_opened` to the auction room (but most users only join once they navigate; so this event is mostly consumed by watchers via their personal room when we dispatch AUCTION_OPENED notifications).

auction-close.job.ts: after determining outcome, emit `auction_closed` to the auction room and personal notifications per participant.

═══ Reconnection Protocol (plan 6.2) ═══

Client-side on `socket.on('disconnect')`:
  - Show a subtle "Reconnecting…" indicator.
  - Socket.IO auto-reconnects with exponential backoff.

On `socket.on('connect')` (post-reconnect):
  1. Re-join all auction rooms currently open in the UI (emit `auction:join` for each).
  2. REST call: GET /api/v1/auctions/:id to get authoritative state.
  3. REST call: GET /api/v1/auctions/:id/bids/mine.
  4. REST call: GET /api/v1/notifications?unread=true to fetch any missed notifications.
  5. Re-render. Plan 6.2 explicitly says missed events are NOT replayed — the REST fetches cover it.

═══ Tests ═══

- Two socket clients in one auction room: bidder A bids; assert both receive `new_high_bid` within 500ms.
- User in a DIFFERENT auction's room: assert they do NOT receive the event.
- Unverified user attempts `auction:join` → receives `auction:join:denied`.
- Invited vs uninvited user on PRIVATE auction: after Branch 3 merges, add these tests.
- Reconnect storm simulation (plan load tests 10.4): 50 sockets disconnect + reconnect; all re-sync within 5 seconds. (This test runs in CI at reduced scale — 10 sockets — and the full version runs in Sprint 7.)
```

### Definition of Done

Every requirement in the task block above is implemented, tested, reviewed, and merged to `develop`. All listed tests pass. No feature outside the stated scope of this branch is added.

---

# SPRINT 11 — Private Auctions (Codes, Links, Invites)

> **Branch:** `feat/sprint-3-private-auctions`
>
> **Legacy group:** this is one slice of what `plan_v4.md` Section 9 called **Sprint 3**. In this prompts.md that group has been split so each branch is its own sprint. **Inside the prompt body below, any reference to "Sprint N" means the original `plan_v4.md` Section 9 grouping, not a sprint number in this file.**

> **Plan reference:** `plan_v4.md` Section 9 → "Sprint 3". Also Sections 3.4, 4 (Auction Access Model — all three visibility modes now live), 6.2 (Real-Time Bidding Experience — the WebSocket architecture), 6.9 (Notifications), 7.3 (Multiple tabs), 7.4 (Server down), 7.12 (Watchlisted auction cancelled), 8.3 (MOD-NOTIFY), Section 11 Risks R04 (offline outbid), R06 (sealed privacy — relevant forward-looking), R07 (private discoverable), R08 (session expiry mid-bid).

### Execution Mode

**Linear, single branch.** Start only after the previous sprint has merged to `develop`. One branch, one PR, one Definition of Done. When this branch merges, move to the next sprint.

### Prompt

```
ROLE: You are a senior full-stack engineer. You are implementing Sprint 3, which transforms the polling-based auction from Sprint 2 into a real-time, private-capable, notification-driven platform.

PRIMARY DIRECTIVE:
Open `plan_v4.md` at the repo root. Read the entire file before starting. Then re-read in depth:

- Section 4 (Auction Access Model) — the three modes and especially 4.2 (codes and links), 4.3 (joining), 4.4 (visibility change rules), 4.5 (invites)
- Section 6.2 (Real-Time Bidding Experience) — room architecture, event names, reconnection protocol, what each user role sees
- Section 6.9 (Notifications) — channels, priority, email fallback rules
- Section 7.3, 7.4, 7.5, 7.8, 7.12 — all the edge cases that realtime and notifications must survive
- Section 11 R04 (offline outbid must be persisted), R07 (private discoverable), R08 (session mid-bid), R09 (worker crash)

GOAL:
After this sprint:
- Bids update in real time via Socket.IO across every connected client to sub-1-second latency.
- Sellers can create Private auctions. Others can join by 8-char code, shareable link, or direct invite.
- Watchlists work, with 15-min-before-close notifications delivered in-app + email fallback for offline users.
- The notification inbox shows unread counts and persists across devices.
- The frontend has working pages for auction detail, bid placement, and notifications.

═════════════════════════════════════════════════
BRANCH: feat/sprint-3-private-auctions
═════════════════════════════════════════════════


Activate PRIVATE visibility mode. Extend plan Section 4.

═══ Auction Creation ═══

POST /api/v1/auctions now accepts `visibility: 'PRIVATE'`.
On creation with PRIVATE, the auction already has an auction_code (generated in Sprint 2). Additionally, generate a shareable link token:

  POST /api/v1/auctions/:id/share-link    (role: owner)
    - Creates a ShareableLinkToken: 32-byte random, store SHA-256.
    - Returns { url: '${FRONTEND_ORIGIN}/j/<token>', token: '<plaintext>' } — the plaintext is returned ONCE to the seller and never again.
    - A seller can generate multiple share tokens and revoke them independently.

  GET /api/v1/auctions/:id/share-links    (role: owner)
    - Returns list of active tokens (never the plaintext — just a truncated "…X7K2" reveal and created_at, revoked_at).

  DELETE /api/v1/auctions/:id/share-links/:tokenId    (role: owner)
    - Revokes (sets revoked_at).

═══ Join by Code ═══

POST /api/v1/auctions/join/code
  Body: { code: string }
  - Normalise: uppercase, strip dashes/spaces.
  - Lookup auction by auction_code.
  - If not found: 404.
  - Grant the requesting user an invite record with status=ACCEPTED (auto-accept for code joins — the code is the entry ticket).
    - Idempotent: if invite already exists, update to ACCEPTED.
  - For PRIVATE auctions the invite is what gives access. For PUBLIC and UNIVERSITY_RESTRICTED the code is convenience; still store the invite to signal "interested".
  - Audit: AUCTION_JOIN_BY_CODE.
  Returns: 200 { auctionId, visibility }.

POST /api/v1/auctions/join/link
  Body: { token: string }
  - Lookup ShareableLinkToken by sha256(token).
  - Reject if not found, revoked, or the auction is CANCELLED / FAILED / AWARDED (expired).
  - Same invite-create flow as /join/code.
  - Audit: AUCTION_JOIN_BY_LINK.

═══ Direct Invites (plan 4.5) ═══

POST /api/v1/auctions/:id/invites
  Role: owner.
  Body: { emails: string[] } OR { usernames: string[] } — support both. Cap at 100 per request.
  - Valid only while auction is DRAFT or PUBLISHED (plan 4.5 — "not once OPEN").
  - For each email: create AuctionInvite status=PENDING; generate invite_token_hash; send email with `${FRONTEND_ORIGIN}/invites/<token>`.
  - If the email matches an existing user, also emit a real-time notification via personal room (type=INVITE_RECEIVED).
  - Audit: INVITE_SENT.

POST /api/v1/invites/:token/accept         (authenticated)
  - Look up invite by sha256(token).
  - If invitee_user_id is null and the current user's email matches invitee_email (case-insensitively): bind invite.invitee_user_id = current user.
  - Else: if invitee_user_id is set and != current user → 403 (security: invite is bound to a different account).
  - Set status=ACCEPTED, responded_at=now.
  - Audit: INVITE_ACCEPTED.

POST /api/v1/invites/:token/decline        (authenticated)
  - Similar; set status=DECLINED. Notify the seller.
  - Audit: INVITE_DECLINED.

GET /api/v1/auctions/:id/invites           (role: owner)
  Returns list: [{ invitee_email, status, responded_at }] — plan US18 / seller's invite management view.

═══ ACL Update ═══

Re-open the helper `canAccessAuction(userContext, auctionId)` from Sprint 2 and update for PRIVATE:

  - PUBLIC: any authenticated user.
  - UNIVERSITY_RESTRICTED: user.tenant_id === auction.tenant_id (both non-null) OR user is platform_admin.
  - PRIVATE: user is the seller, OR user has an AuctionInvite with status=ACCEPTED for this auction, OR user is platform_admin.

Crucially (plan R07): the auction LIST endpoint (GET /api/v1/auctions) must filter out PRIVATE auctions entirely, regardless of query params. Integration-test this explicitly.

Search index (Sprint 5 concern) must also exclude PRIVATE auctions.

═══ Visibility Change Rules (plan 4.4) ═══

PATCH /api/v1/auctions/:id — allow visibility change only while DRAFT or PUBLISHED. From PRIVATE → PUBLIC or UNIVERSITY_RESTRICTED is allowed; PUBLIC → PRIVATE is NOT allowed after PUBLISHED (would exclude users who discovered it).

═══ Tests ═══

- Create PRIVATE auction, try to list without code → not in results.
- Search for the auction by title → not in results (Sprint 5 enforces this fully).
- Access PRIVATE auction directly by ID → 403 unless invited/code-joined.
- Join by code → subsequent GET returns 200.
- Invite flow: seller invites email X → user X registers with that email → user accepts → GET /auctions/:id works.
- Invite with wrong bound user → 403.
- Revoked share link → 404/410 on subsequent use.
```

### Definition of Done

Every requirement in the task block above is implemented, tested, reviewed, and merged to `develop`. All listed tests pass. No feature outside the stated scope of this branch is added.

---

# SPRINT 12 — Notification Service & Email Fallback

> **Branch:** `feat/sprint-3-notifications`
>
> **Legacy group:** this is one slice of what `plan_v4.md` Section 9 called **Sprint 3**. In this prompts.md that group has been split so each branch is its own sprint. **Inside the prompt body below, any reference to "Sprint N" means the original `plan_v4.md` Section 9 grouping, not a sprint number in this file.**

> **Plan reference:** `plan_v4.md` Section 9 → "Sprint 3". Also Sections 3.4, 4 (Auction Access Model — all three visibility modes now live), 6.2 (Real-Time Bidding Experience — the WebSocket architecture), 6.9 (Notifications), 7.3 (Multiple tabs), 7.4 (Server down), 7.12 (Watchlisted auction cancelled), 8.3 (MOD-NOTIFY), Section 11 Risks R04 (offline outbid), R06 (sealed privacy — relevant forward-looking), R07 (private discoverable), R08 (session expiry mid-bid).

### Execution Mode

**Linear, single branch.** Start only after the previous sprint has merged to `develop`. One branch, one PR, one Definition of Done. When this branch merges, move to the next sprint.

### Prompt

```
ROLE: You are a senior full-stack engineer. You are implementing Sprint 3, which transforms the polling-based auction from Sprint 2 into a real-time, private-capable, notification-driven platform.

PRIMARY DIRECTIVE:
Open `plan_v4.md` at the repo root. Read the entire file before starting. Then re-read in depth:

- Section 4 (Auction Access Model) — the three modes and especially 4.2 (codes and links), 4.3 (joining), 4.4 (visibility change rules), 4.5 (invites)
- Section 6.2 (Real-Time Bidding Experience) — room architecture, event names, reconnection protocol, what each user role sees
- Section 6.9 (Notifications) — channels, priority, email fallback rules
- Section 7.3, 7.4, 7.5, 7.8, 7.12 — all the edge cases that realtime and notifications must survive
- Section 11 R04 (offline outbid must be persisted), R07 (private discoverable), R08 (session mid-bid), R09 (worker crash)

GOAL:
After this sprint:
- Bids update in real time via Socket.IO across every connected client to sub-1-second latency.
- Sellers can create Private auctions. Others can join by 8-char code, shareable link, or direct invite.
- Watchlists work, with 15-min-before-close notifications delivered in-app + email fallback for offline users.
- The notification inbox shows unread counts and persists across devices.
- The frontend has working pages for auction detail, bid placement, and notifications.

═════════════════════════════════════════════════
BRANCH: feat/sprint-3-notifications
═════════════════════════════════════════════════


Layout: apps/api/src/modules/notifications/

═══ Notification Service ═══

createNotification(input: { userId, type, title, body, payload, deepLink }): Promise<Notification>
  1. INSERT Notification row.
  2. Emit via io.to(`user:${userId}`).emit('notification', { ... }).
  3. If type is in EMAIL_ELIGIBLE set (plan 6.9):
      - Queue a Bull job `notification-email` with a 5-minute delay. The job handler checks: if the notification's read_at is still null, send the email; if it has been read, skip.

Never email these types (plan 6.9): BIDDER_OUTBID, AUCTION_CLOSING_SOON (watchlist update), confirmations. Email these: AUCTION_OUTCOME_WON, AUCTION_OUTCOME_FAILED_SELLER, ACCOUNT_SUSPENDED, and all auth emails (which are handled by MOD-AUTH, not here).

═══ Endpoints ═══

GET /api/v1/notifications
  Query: unread=true, limit=50, cursor.
  Returns cursor-paginated list.

GET /api/v1/notifications/unread-count
  Returns { count: number }.

POST /api/v1/notifications/:id/read
  Sets read_at = now. Emits 'notification:read' to the user's personal room.

POST /api/v1/notifications/read-all
  Sets read_at = now for all unread.

═══ Edge Cases ═══

- Race condition — user opens notification inbox while a new notification arrives. The client should append the new event to its in-memory list; the inbox re-fetches on mount.
- A notification whose deep_link is to a now-deleted auction: clicking should navigate, and the auction page shows a 404 state gracefully.
- Plan R04: offline user misses the outbid WS event → the persisted Notification row in DB covers it; user sees it on next login.

═══ Tests ═══

- Create notification → WS delivered → DB row exists.
- Unread count: create 5, mark 2 read, assert count=3.
- Email fallback: create notification of type AUCTION_OUTCOME_WON, do not mark read, advance fake timers 5 minutes, assert email send invocation.
- Email fallback skipped if read within 5 min: create, mark read at t=1 min, advance to 5 min, assert NO email sent.
```

### Definition of Done

Every requirement in the task block above is implemented, tested, reviewed, and merged to `develop`. All listed tests pass. No feature outside the stated scope of this branch is added.

---

# SPRINT 13 — Watchlist

> **Branch:** `feat/sprint-3-watchlist`
>
> **Legacy group:** this is one slice of what `plan_v4.md` Section 9 called **Sprint 3**. In this prompts.md that group has been split so each branch is its own sprint. **Inside the prompt body below, any reference to "Sprint N" means the original `plan_v4.md` Section 9 grouping, not a sprint number in this file.**

> **Plan reference:** `plan_v4.md` Section 9 → "Sprint 3". Also Sections 3.4, 4 (Auction Access Model — all three visibility modes now live), 6.2 (Real-Time Bidding Experience — the WebSocket architecture), 6.9 (Notifications), 7.3 (Multiple tabs), 7.4 (Server down), 7.12 (Watchlisted auction cancelled), 8.3 (MOD-NOTIFY), Section 11 Risks R04 (offline outbid), R06 (sealed privacy — relevant forward-looking), R07 (private discoverable), R08 (session expiry mid-bid).

### Execution Mode

**Linear, single branch.** Start only after the previous sprint has merged to `develop`. One branch, one PR, one Definition of Done. When this branch merges, move to the next sprint.

### Prompt

```
ROLE: You are a senior full-stack engineer. You are implementing Sprint 3, which transforms the polling-based auction from Sprint 2 into a real-time, private-capable, notification-driven platform.

PRIMARY DIRECTIVE:
Open `plan_v4.md` at the repo root. Read the entire file before starting. Then re-read in depth:

- Section 4 (Auction Access Model) — the three modes and especially 4.2 (codes and links), 4.3 (joining), 4.4 (visibility change rules), 4.5 (invites)
- Section 6.2 (Real-Time Bidding Experience) — room architecture, event names, reconnection protocol, what each user role sees
- Section 6.9 (Notifications) — channels, priority, email fallback rules
- Section 7.3, 7.4, 7.5, 7.8, 7.12 — all the edge cases that realtime and notifications must survive
- Section 11 R04 (offline outbid must be persisted), R07 (private discoverable), R08 (session mid-bid), R09 (worker crash)

GOAL:
After this sprint:
- Bids update in real time via Socket.IO across every connected client to sub-1-second latency.
- Sellers can create Private auctions. Others can join by 8-char code, shareable link, or direct invite.
- Watchlists work, with 15-min-before-close notifications delivered in-app + email fallback for offline users.
- The notification inbox shows unread counts and persists across devices.
- The frontend has working pages for auction detail, bid placement, and notifications.

═════════════════════════════════════════════════
BRANCH: feat/sprint-3-watchlist
═════════════════════════════════════════════════


Endpoints:

POST /api/v1/watchlist
  Body: { auctionId }. Requires auth + auction access (same ACL as GET /auctions/:id).
  - Idempotent: if already watched, return the existing record.

DELETE /api/v1/watchlist/:auctionId
  Removes.

GET /api/v1/watchlist
  Returns user's watchlist with light auction summary (id, title, status, current_price, scheduled_end_time, seller_display_name).

═══ Watchlist-Driven Notifications ═══

Plan US36 / US37 / 7.12:

1. On AUCTION_OPENED (in auction-open job after state transition): fetch watchlist users → createNotification(AUCTION_OPENED).

2. AUCTION_CLOSING_SOON: when a Bull `auction-closing-soon` job fires (scheduled at publish time, delay = end_time - 15min - now; rescheduled when anti-snipe extends):
   - fetch watchlist users → createNotification(AUCTION_CLOSING_SOON, deepLink=auction).

3. Auction outcome: after close job determines AWARDED / FAILED / CANCELLED:
   - If winner: AUCTION_OUTCOME_WON to winner (with email).
   - If bidder but not winner: AUCTION_OUTCOME_LOST to each (in-app only).
   - Seller: AUCTION_OUTCOME_FAILED_SELLER (if FAILED) or AUCTION_OUTCOME_AWARDED (if AWARDED, with email).
   - Watchers (non-bidders): AUCTION_CLOSED in-app only.

4. Auction cancelled by seller (only in DRAFT/PUBLISHED) or force-cancelled by admin:
   - All watchers and bidders: AUCTION_CANCELLED notification (in-app only for watchers; in-app + email for bidders if force-cancel, per plan 6.5).
   - Auto-remove from watchlists (plan 7.12).

Add Bull job: `auction-closing-soon`. Scheduled at publish time. Rescheduled by anti-snipe (edit Sprint 2's rescheduleClose to also reschedule this one).

Tests:
- Watch an auction → open it → user receives AUCTION_OPENED.
- Watch → 15 min before close (simulated) → user receives AUCTION_CLOSING_SOON.
- Anti-snipe extension reschedules the closing-soon job.
- Seller cancels DRAFT auction → watchers receive AUCTION_CANCELLED and are removed from watchlist.
```

### Definition of Done

Every requirement in the task block above is implemented, tested, reviewed, and merged to `develop`. All listed tests pass. No feature outside the stated scope of this branch is added.

---

# SPRINT 14 — Next.js Frontend — Auctions & Inbox

> **Branch:** `feat/sprint-3-web`
>
> **Legacy group:** this is one slice of what `plan_v4.md` Section 9 called **Sprint 3**. In this prompts.md that group has been split so each branch is its own sprint. **Inside the prompt body below, any reference to "Sprint N" means the original `plan_v4.md` Section 9 grouping, not a sprint number in this file.**

> **Plan reference:** `plan_v4.md` Section 9 → "Sprint 3". Also Sections 3.4, 4 (Auction Access Model — all three visibility modes now live), 6.2 (Real-Time Bidding Experience — the WebSocket architecture), 6.9 (Notifications), 7.3 (Multiple tabs), 7.4 (Server down), 7.12 (Watchlisted auction cancelled), 8.3 (MOD-NOTIFY), Section 11 Risks R04 (offline outbid), R06 (sealed privacy — relevant forward-looking), R07 (private discoverable), R08 (session expiry mid-bid).

### Execution Mode

**Linear, single branch.** Start only after the previous sprint has merged to `develop`. One branch, one PR, one Definition of Done. When this branch merges, move to the next sprint.

### Prompt

```
ROLE: You are a senior full-stack engineer. You are implementing Sprint 3, which transforms the polling-based auction from Sprint 2 into a real-time, private-capable, notification-driven platform.

PRIMARY DIRECTIVE:
Open `plan_v4.md` at the repo root. Read the entire file before starting. Then re-read in depth:

- Section 4 (Auction Access Model) — the three modes and especially 4.2 (codes and links), 4.3 (joining), 4.4 (visibility change rules), 4.5 (invites)
- Section 6.2 (Real-Time Bidding Experience) — room architecture, event names, reconnection protocol, what each user role sees
- Section 6.9 (Notifications) — channels, priority, email fallback rules
- Section 7.3, 7.4, 7.5, 7.8, 7.12 — all the edge cases that realtime and notifications must survive
- Section 11 R04 (offline outbid must be persisted), R07 (private discoverable), R08 (session mid-bid), R09 (worker crash)

GOAL:
After this sprint:
- Bids update in real time via Socket.IO across every connected client to sub-1-second latency.
- Sellers can create Private auctions. Others can join by 8-char code, shareable link, or direct invite.
- Watchlists work, with 15-min-before-close notifications delivered in-app + email fallback for offline users.
- The notification inbox shows unread counts and persists across devices.
- The frontend has working pages for auction detail, bid placement, and notifications.

═════════════════════════════════════════════════
BRANCH: feat/sprint-3-web
═════════════════════════════════════════════════


The user will plug in Google Stitch AI designs later. Your job is to make it FUNCTIONAL and REASONABLE-LOOKING. Use Tailwind + a lightweight component library (shadcn/ui) for sensible defaults. Do NOT over-design.

Pages to deliver this sprint (apps/web/app/):

/                        ← Landing page: recent public auctions grid, CTAs to login/register
/login, /register, /verify-email, /forgot-password, /reset-password
/dashboard               ← Logged-in home: your auctions (as seller) + watchlist + notifications summary
/auctions                ← Browse (basic — Sprint 5 adds full search)
/auctions/[id]           ← Auction detail (see below — the critical page)
/auctions/new            ← Create auction wizard (4-step: format → details → images → timing/reserve)
/auctions/[id]/manage    ← Seller management: edit, publish, cancel, invite (private), share link
/auctions/join           ← Join by code input
/j/[token]               ← Shareable link landing
/invites/[token]         ← Accept/Decline UI
/notifications           ← Inbox
/profile/[userId]        ← Public profile (rating is 0/0 in Sprint 3; Sprint 5 fills it)
/settings                ← Own profile edit
/admin                   ← Sprint 6 — placeholder 404 for now

═══ Auction Detail Page (apps/web/app/auctions/[id]/page.tsx) ═══

- Server-render initial state via GET /api/v1/auctions/:id.
- On client mount: initialise Socket.IO client with accessToken. Emit `auction:join`.
- Subscribe to: `new_high_bid` → update current_price with a subtle flash animation; `auction_extended` → update countdown + show banner; `auction_closed` → replace interactive panel with outcome panel; `rank_signal` (personal) → update the green/yellow/red pill; `outbid` (personal) → red toast + sound (optional); `bid_accepted` (personal) → green toast.
- Countdown: compute `scheduled_end_time - now` client-side, tick every second, re-base on server time via periodic resync.
- Bid form: amount input with min suggestion = current_price + increment, "Place Bid" button, optional "Set proxy max" disabled with tooltip "Coming in Sprint 5".
- Seller view: list of anonymised bids (amount + timestamp), invite management panel (if PRIVATE), share link panel, edit/cancel buttons (state-aware per Sprint 2 rules).

═══ Socket Client Wiring ═══

apps/web/lib/socket.ts: a singleton Socket.IO client keyed to the access token. Recreate if token changes (after refresh).

On 401 from any REST call → intercept, call /api/v1/auth/refresh, retry. On failure, redirect to /login?return=<current path>.

═══ Tests ═══

- Playwright E2E: login → browse → open auction → place bid → assert current_price updates in DOM within 1s.
- Two browsers (Playwright) on the same auction: place bid in browser A → browser B's DOM updates within 1s.
- Join by code → land on auction page → can bid.

═════════════════════════════════════════════════
CROSS-CUTTING
═════════════════════════════════════════════════

- Socket.IO metrics: connection count, room counts, emit counts — log at 60s intervals.
- CSP headers on the Next.js app allow the socket origin.
- CORS on Express allows the frontend origin with credentials.

HANDOFF TO SPRINT 4:
- Real-time plumbing is DONE. Sprint 4 just emits new event types (dutch_price_update, etc.) on the existing io infrastructure.
- `BidValidationStrategy` interface is stable. Sprint 4 fills in the three stub strategies.
- Notification infra is done. Sprint 4 creates two new NotificationType values (e.g. DUTCH_ACCEPTED) and registers them.
```

### Definition of Done (Sprint 3)

Matches `plan_v4.md` Section 9 Sprint 3 DoD: _"Full real-time Forward auction works. Private auction can be created, shared by code, joined, and bid on. Watchlist notifications fire correctly."_

---

# SPRINT 15 — Reverse Auction Format

> **Branch:** `feat/sprint-4-reverse`
>
> **Legacy group:** this is one slice of what `plan_v4.md` Section 9 called **Sprint 4**. In this prompts.md that group has been split so each branch is its own sprint. **Inside the prompt body below, any reference to "Sprint N" means the original `plan_v4.md` Section 9 grouping, not a sprint number in this file.**

> **Plan reference:** `plan_v4.md` Section 9 → "Sprint 4". Also Sections 5.2 (Reverse), 5.3 (Sealed Bid), 5.4 (Dutch), 6.3 (Proxy — relevant for Reverse proxy in Sprint 5), 7.8 (Dutch simultaneous tick+accept), Section 11 R02 (Dutch double-accept), R06 (sealed privacy).

### Execution Mode

**Linear, single branch.** Start only after the previous sprint has merged to `develop`. One branch, one PR, one Definition of Done. When this branch merges, move to the next sprint.

### Prompt

```
ROLE: You are a senior backend engineer implementing three new auction formats that must coexist with the existing Forward format without any regressions.

PRIMARY DIRECTIVE:
Open `plan_v4.md` and read it end-to-end. For Sprint 4, re-read in depth:
- Section 5.2 (Reverse Auction) — full spec
- Section 5.3 (Sealed Bid Auction) — the sealed-blind rules
- Section 5.4 (Dutch Auction) — ticking, acceptance, floor-fail
- Section 7.8 (Dutch simultaneous accept / tick)
- Section 11 R02 (Dutch double-accept), R06 (sealed privacy)
- Section 6.1 remains the master pipeline — every format plugs into it via the strategy interface
- Section 6.6 reserve rules, especially the Sealed Bid note

GOAL:
After Sprint 4, a seller can create and run an auction in any of the four formats. Each format has its own validation, its own UI at the bidder side, its own winner determination, and its own edge-case handling. The existing Forward path continues to pass every Sprint 2 + 3 test unchanged.

═════════════════════════════════════════════════
BRANCH: feat/sprint-4-reverse
═════════════════════════════════════════════════


Plan 5.2.

═══ Strategy (packages/domain/src/auction/reverse-bid-validation-strategy.ts) ═══

Rules:
- status ∈ [OPEN, EXTENDED].
- bidder.id !== auction.seller_id (the seller here is the buyer; "seller_id" remains the auction creator's id).
- proposed_amount <= auction.current_price - auction.increment_amount (field stores decrement for Reverse — document the dual-semantic in comments on the schema).
- proposed_amount >= 1.
- proposed_amount <= starting_price (Reverse starts at ceiling; bids go down).

Creation validation (in auction schemas): when format=REVERSE:
- starting_price is interpreted as CEILING.
- increment_amount as DECREMENT.
- reserve_price (optional) as REVERSE FLOOR — winning bid below this → FAILED (plan 5.2).
- Anti-sniping works identically (same window/extension/max-extensions logic).

═══ Bid Pipeline Update (apps/api/src/modules/bids/bid.service.ts) ═══

Step 8.d of the pipeline updates auction.current_price = bid.amount for Forward. For Reverse, the direction is the same (set current_price = bid.amount — because amount is decreasing).

Winner determination (in auction-close.job.ts):
- Forward: highest amount, earliest server_timestamp tiebreak.
- Reverse: LOWEST amount, earliest server_timestamp tiebreak.
- Extract this into a function `determineWinner(auction, bids)` that switches on format.

Reserve check:
- Forward: highest bid < reserve → FAILED.
- Reverse: lowest bid > reserve_floor → FAILED (plan 5.2).

═══ Tests ═══
- Reverse bid at exactly current_price - decrement: accepted.
- Reverse bid at current_price - decrement + 1 (i.e. NOT enough down): rejected.
- Reverse bid < 0: rejected.
- Reverse bid > starting_price (ceiling): rejected.
- Reverse auction with reserve_floor = 100, winning bid = 50: FAILED.
```

### Definition of Done

Every requirement in the task block above is implemented, tested, reviewed, and merged to `develop`. All listed tests pass. No feature outside the stated scope of this branch is added.

---

# SPRINT 16 — Sealed-Bid Auction Format

> **Branch:** `feat/sprint-4-sealed`
>
> **Legacy group:** this is one slice of what `plan_v4.md` Section 9 called **Sprint 4**. In this prompts.md that group has been split so each branch is its own sprint. **Inside the prompt body below, any reference to "Sprint N" means the original `plan_v4.md` Section 9 grouping, not a sprint number in this file.**

> **Plan reference:** `plan_v4.md` Section 9 → "Sprint 4". Also Sections 5.2 (Reverse), 5.3 (Sealed Bid), 5.4 (Dutch), 6.3 (Proxy — relevant for Reverse proxy in Sprint 5), 7.8 (Dutch simultaneous tick+accept), Section 11 R02 (Dutch double-accept), R06 (sealed privacy).

### Execution Mode

**Linear, single branch.** Start only after the previous sprint has merged to `develop`. One branch, one PR, one Definition of Done. When this branch merges, move to the next sprint.

### Prompt

```
ROLE: You are a senior backend engineer implementing three new auction formats that must coexist with the existing Forward format without any regressions.

PRIMARY DIRECTIVE:
Open `plan_v4.md` and read it end-to-end. For Sprint 4, re-read in depth:
- Section 5.2 (Reverse Auction) — full spec
- Section 5.3 (Sealed Bid Auction) — the sealed-blind rules
- Section 5.4 (Dutch Auction) — ticking, acceptance, floor-fail
- Section 7.8 (Dutch simultaneous accept / tick)
- Section 11 R02 (Dutch double-accept), R06 (sealed privacy)
- Section 6.1 remains the master pipeline — every format plugs into it via the strategy interface
- Section 6.6 reserve rules, especially the Sealed Bid note

GOAL:
After Sprint 4, a seller can create and run an auction in any of the four formats. Each format has its own validation, its own UI at the bidder side, its own winner determination, and its own edge-case handling. The existing Forward path continues to pass every Sprint 2 + 3 test unchanged.

═════════════════════════════════════════════════
BRANCH: feat/sprint-4-sealed
═════════════════════════════════════════════════


Plan 5.3.

═══ Strategy (sealed-bid-validation-strategy.ts) ═══

Rules:
- status === OPEN (no EXTENDED — sealed has no anti-sniping).
- bidder.id !== auction.seller_id.
- proposed_amount >= starting_price.
- existing_bids_by_bidder === 0 (one bid per bidder, plan 5.3; second attempt → code=SEALED_ALREADY_BID).

═══ Creation Validation ═══

When format=SEALED_BID:
- increment_amount: not applicable (plan 5.3). Enforce null/omitted.
- Anti-sniping fields: force-set to 0/0/0 at creation (they don't apply; plan 5.3).
- reserve_price optional.

═══ Bid Pipeline Update ═══

For Sealed:
- Step 8.d: do NOT update auction.current_price. Sealed has no "current price" visible. Leave current_price = starting_price.
- Step 8.e: skip anti-snipe entirely.
- Step 13 (emit WebSocket events): DO NOT emit `new_high_bid` or any rank signal. Only emit `bid_accepted` to the bidder privately with a generic "Your bid has been submitted" message (no amount reveal in broadcast, but the bidder sees their own amount).

═══ Endpoint Constraints ═══

GET /api/v1/auctions/:id/bids — for a SEALED auction that is still OPEN, return 403 `{ error: 'SEALED_BLINDED', message: 'Bid history is hidden until the auction closes.' }`. Include this check in the controller; test it.

═══ Closure ═══

In auction-close.job.ts for format=SEALED_BID:
- Determine winner: highest amount, earliest server_timestamp tiebreak.
- Reserve check same as Forward.
- Emit one special event `sealed_reveal` to the auction room containing only the WINNING amount and the WINNER's displayName — NOT the full bid list (plan 5.3 "bidder names remain hidden in the public reveal; only the winner's username is shown").
- For each non-winner: send a Notification (type=AUCTION_OUTCOME_LOST) with the winning amount and their own bid amount (plan 5.3: "Winning bid: ₹X. Your bid: ₹Y.").
- For winner: type=AUCTION_OUTCOME_WON.

═══ Tests (plan R06 is critical — test aggressively) ═══

- During OPEN: GET /:id/bids → 403.
- During OPEN: no `new_high_bid` events emitted (mock io, assert zero calls to emit for that event on a sealed auction).
- User bids twice → second attempt 400 SEALED_ALREADY_BID.
- All bids same amount: earliest server_timestamp wins, and the UI does not explain the tie to others (plan 5.3).
- One bid only: wins if reserve met.
- Zero bids: FAILED.
```

### Definition of Done

Every requirement in the task block above is implemented, tested, reviewed, and merged to `develop`. All listed tests pass. No feature outside the stated scope of this branch is added.

---

# SPRINT 17 — Dutch Auction Format

> **Branch:** `feat/sprint-4-dutch`
>
> **Legacy group:** this is one slice of what `plan_v4.md` Section 9 called **Sprint 4**. In this prompts.md that group has been split so each branch is its own sprint. **Inside the prompt body below, any reference to "Sprint N" means the original `plan_v4.md` Section 9 grouping, not a sprint number in this file.**

> **Plan reference:** `plan_v4.md` Section 9 → "Sprint 4". Also Sections 5.2 (Reverse), 5.3 (Sealed Bid), 5.4 (Dutch), 6.3 (Proxy — relevant for Reverse proxy in Sprint 5), 7.8 (Dutch simultaneous tick+accept), Section 11 R02 (Dutch double-accept), R06 (sealed privacy).

### Execution Mode

**Linear, single branch.** Start only after the previous sprint has merged to `develop`. One branch, one PR, one Definition of Done. When this branch merges, move to the next sprint.

### Prompt

```
ROLE: You are a senior backend engineer implementing three new auction formats that must coexist with the existing Forward format without any regressions.

PRIMARY DIRECTIVE:
Open `plan_v4.md` and read it end-to-end. For Sprint 4, re-read in depth:
- Section 5.2 (Reverse Auction) — full spec
- Section 5.3 (Sealed Bid Auction) — the sealed-blind rules
- Section 5.4 (Dutch Auction) — ticking, acceptance, floor-fail
- Section 7.8 (Dutch simultaneous accept / tick)
- Section 11 R02 (Dutch double-accept), R06 (sealed privacy)
- Section 6.1 remains the master pipeline — every format plugs into it via the strategy interface
- Section 6.6 reserve rules, especially the Sealed Bid note

GOAL:
After Sprint 4, a seller can create and run an auction in any of the four formats. Each format has its own validation, its own UI at the bidder side, its own winner determination, and its own edge-case handling. The existing Forward path continues to pass every Sprint 2 + 3 test unchanged.

═════════════════════════════════════════════════
BRANCH: feat/sprint-4-dutch
═════════════════════════════════════════════════


Plan 5.4 + 7.8 + R02. This is the trickiest format.

═══ Strategy (dutch-acceptance-strategy.ts) ═══

There is NO amount input in Dutch. The client POSTs an ACCEPT, not a bid:

POST /api/v1/auctions/:auctionId/accept     (verified bidder)
  Body: {} (no amount)
  Behaviour:
    1. Normal ACL + state checks: status must be OPEN.
    2. Self-check (not seller).
    3. Acquire Redis lock `lock:auction:{id}` (TTL 5s, wait 500ms). Plan R02.
    4. DB txn:
       a. SELECT auction FOR UPDATE.
       b. Re-check status === OPEN. If closed (another accept just committed), return 409 `{ error: 'DUTCH_ALREADY_ACCEPTED', message: 'Sorry, this auction was just accepted by another bidder.' }` (plan 5.4).
       c. Read current_price = auction.current_price (server-authoritative, plan 7.8 — NOT the price the client displayed).
       d. INSERT Bid with amount=current_price, is_proxy_generated=false.
       e. UPDATE auction: status=CLOSED, actual_end_time=now, winning_bid_id=bid.id.
          Then transition CLOSED → AWARDED (reserve doesn't apply to Dutch — floor is the implicit reserve; if we reached here the floor has not been touched yet).
       f. Audit: DUTCH_ACCEPTED.
    5. Release lock.
    6. Cancel the Dutch tick Bull job (via jobId).
    7. Emit `dutch_accepted` to auction room with { finalPrice, acceptedAt, winnerDisplayName }.
    8. Emit `auction_closed` to the auction room.
    9. Return 200 { bid, auction: { status: 'AWARDED', final_price } }.

═══ Tick Job (apps/worker/src/jobs/dutch-tick.job.ts) ═══

On auction publish for format=DUTCH: schedule the FIRST tick job with delay = scheduled_start_time + decrement_interval_sec*1000 - now (first tick happens one interval after open). Or, if you prefer: on auction-open.job execution, schedule the first tick.

Each tick:
  jobId = `dutch-tick:${auctionId}`   // deduplicated
  processor:
    1. Lookup auction.
    2. If status !== OPEN → exit (already accepted or cancelled).
    3. Compute new_price = auction.current_price - auction.decrement_amount.
    4. In a DB txn + Redis lock (same lock as accept — this race is plan 7.8):
       - SELECT auction FOR UPDATE.
       - If status !== OPEN (someone accepted meanwhile): release lock, exit.
       - If new_price <= auction.floor_price:
          - UPDATE status=CLOSED (then FAILED in the same txn path).
          - Audit: DUTCH_FAILED_FLOOR_REACHED.
          - Emit `auction_closed` with status=FAILED.
          - Do NOT schedule another tick.
       - Else:
          - UPDATE current_price = new_price.
          - Audit: DUTCH_TICK.
       - Commit; release lock.
    5. Emit `dutch_price_update` to auction room with { newPrice: new_price, nextTickAt: now + decrement_interval_sec*1000 }.
    6. Schedule next tick with delay = decrement_interval_sec*1000.

Worker crash recovery (plan R09 / 7.4):
- Bull persists the delayed job in Redis; on restart the job runs.
- If the scheduled tick time has passed while worker was down: the job still runs, but step 2 checks current auction state — if more time has passed than a single decrement should account for, this "catch up" is a DESIGN DECISION. Chosen behaviour: fast-forward the price to where it should be now (compute how many ticks were missed and apply them all in one txn, clamped to floor_price), then re-schedule the next tick. Document this in the job's top-of-file comment with a pointer to plan R09.

═══ Creation Validation ═══

When format=DUTCH:
- Require: starting_price, floor_price, decrement_amount, decrement_interval_sec, duration (scheduled_end_time).
- Ban: increment_amount, reserve_price (Dutch uses floor_price as the implicit reserve; avoid duplicate semantics).
- Validate: floor_price < starting_price (strict), decrement_amount > 0, decrement_interval_sec >= 10 (sanity), duration covers at least ((starting - floor) / decrement) * interval seconds OR present a warning in the creation UI ("At this rate, the price will reach the floor in X minutes — your auction duration covers Y minutes"). Plan 5.4: if duration expires before floor, auction FAILS at duration.

═══ Close-at-Duration-End Path ═══

In auction-close.job.ts for DUTCH: if the job fires while the auction is still OPEN (no accept happened and the floor wasn't reached via ticks yet):
- status → FAILED (DUTCH_FAILED_DURATION_EXPIRED).
- Cancel the pending tick job.
- Notifications + events as per Sprint 3.

═══ Tests (plan R02 is critical — concurrency) ═══

- Two clients POST /accept in parallel → exactly one receives 200; the other receives 409 DUTCH_ALREADY_ACCEPTED.
- Client sees ₹500 but server has ticked to ₹475 → server accepts at ₹475, response says final_price=475 (plan 5.4 edge case).
- Floor reached with no acceptance → FAILED.
- Duration expired with no acceptance (floor not yet reached) → FAILED via auction-close job.
- Worker restart mid-auction: kill worker process during dev test, restart after 30s, verify price fast-forwards correctly.
```

### Definition of Done

Every requirement in the task block above is implemented, tested, reviewed, and merged to `develop`. All listed tests pass. No feature outside the stated scope of this branch is added.

---

# SPRINT 18 — Frontend — Multi-Format Wizard

> **Branch:** `feat/sprint-4-web-formats`
>
> **Legacy group:** this is one slice of what `plan_v4.md` Section 9 called **Sprint 4**. In this prompts.md that group has been split so each branch is its own sprint. **Inside the prompt body below, any reference to "Sprint N" means the original `plan_v4.md` Section 9 grouping, not a sprint number in this file.**

> **Plan reference:** `plan_v4.md` Section 9 → "Sprint 4". Also Sections 5.2 (Reverse), 5.3 (Sealed Bid), 5.4 (Dutch), 6.3 (Proxy — relevant for Reverse proxy in Sprint 5), 7.8 (Dutch simultaneous tick+accept), Section 11 R02 (Dutch double-accept), R06 (sealed privacy).

### Execution Mode

**Linear, single branch.** Start only after the previous sprint has merged to `develop`. One branch, one PR, one Definition of Done. When this branch merges, move to the next sprint.

### Prompt

```
ROLE: You are a senior backend engineer implementing three new auction formats that must coexist with the existing Forward format without any regressions.

PRIMARY DIRECTIVE:
Open `plan_v4.md` and read it end-to-end. For Sprint 4, re-read in depth:
- Section 5.2 (Reverse Auction) — full spec
- Section 5.3 (Sealed Bid Auction) — the sealed-blind rules
- Section 5.4 (Dutch Auction) — ticking, acceptance, floor-fail
- Section 7.8 (Dutch simultaneous accept / tick)
- Section 11 R02 (Dutch double-accept), R06 (sealed privacy)
- Section 6.1 remains the master pipeline — every format plugs into it via the strategy interface
- Section 6.6 reserve rules, especially the Sealed Bid note

GOAL:
After Sprint 4, a seller can create and run an auction in any of the four formats. Each format has its own validation, its own UI at the bidder side, its own winner determination, and its own edge-case handling. The existing Forward path continues to pass every Sprint 2 + 3 test unchanged.

═════════════════════════════════════════════════
BRANCH: feat/sprint-4-web-formats
═════════════════════════════════════════════════


Update apps/web/app/auctions/new/ to be a multi-step wizard:

Step 1: Format picker (4 cards with plain-language descriptions matching plan 5.1–5.4 summaries).
Step 2: Item details (title, description, category, images, condition).
Step 3: Pricing & Timing — fields shown conditionally on format:
  - Forward: starting_price, increment, reserve (opt), anti-snipe (with defaults)
  - Reverse: ceiling (starting_price field relabelled), decrement (increment field relabelled), reserve_floor (reserve_price field relabelled), anti-snipe
  - Sealed: starting_price (relabel "Minimum Bid"), reserve (opt), NO anti-snipe fields at all
  - Dutch: starting_price, floor_price, decrement_amount, decrement_interval (with a helper showing "Price will reach floor in X minutes"), duration
Step 4: Visibility (Public / Univ / Private). If Private, show code preview + invite composer.
Step 5: Review & Publish.

Auction detail page branches by format:
- Forward/Reverse: unchanged bid form (just label and direction differ).
- Sealed: a single-shot bid form with a pre-submission confirmation dialog: "You cannot revise or retract this bid once submitted." After submission, form is replaced by "Your bid has been submitted. Winner will be announced at close."
- Dutch: displays a large countdown to NEXT TICK, current price prominently, and a single "Accept this price" button. Subscribes to `dutch_price_update` to update the price ticker.

Sealed auction detail page during OPEN: hide the bid history panel entirely (plan R06 — no leak path).

Tests: Playwright E2E for each of the four formats, end-to-end from creation to award.

═════════════════════════════════════════════════
CROSS-CUTTING
═════════════════════════════════════════════════

Verify plan R06 via a dedicated E2E: create SEALED auction, place 3 bids, then attempt every possible leak path (REST, WebSocket, logs) and confirm no amount or identity leaks during OPEN.

HANDOFF TO SPRINT 5:
- Four formats live. Strategies solid.
- Proxy bidding stubs exist in the bid pipeline. Sprint 5 activates them for Forward + Reverse.
- Search and reviews come next.
```

### Definition of Done (Sprint 4)

Matches `plan_v4.md` Section 9 Sprint 4 DoD: _"A seller can create all four auction formats. Each format runs end-to-end correctly with correct winner determination and edge case handling."_

---

# SPRINT 19 — Search, Proxy & Reviews Schema

> **Branch:** `feat/sprint-5-schema`
>
> **Legacy group:** this is one slice of what `plan_v4.md` Section 9 called **Sprint 5**. In this prompts.md that group has been split so each branch is its own sprint. **Inside the prompt body below, any reference to "Sprint N" means the original `plan_v4.md` Section 9 grouping, not a sprint number in this file.**

**Sprint goal (quoted from `plan_v4.md` Section 9):** _"Bidders can discover auctions through search and filters. Forward and Reverse auctions support proxy (auto) bidding. Buyers and sellers can review each other after an auction closes."_

### Execution Mode

**Linear, single branch.** Start only after the previous sprint has merged to `develop`. One branch, one PR, one Definition of Done. When this branch merges, move to the next sprint.

### Prompt

```
ROLE: You are a senior engineer.

────────────────────────────────────────────────────────
TASK BRIEF — ONLINE AUCTION SYSTEM, SPRINT 5
Search, Proxy Bidding (Forward + Reverse), Reviews, Re-list
────────────────────────────────────────────────────────

STEP ZERO — ABSOLUTELY REQUIRED

Before writing a single line of code, open `plan_v4.md` in the repo root and read it end-to-end. Pay extreme attention to:

- Section 5.1 (forward auctions, proxy_bid_max field)
- Section 5.2 (reverse auctions — proxy inversion: proxy bids DECREASE from proxy_max_amount downward)
- Section 6.3 (PROXY BIDDING PIPELINE — read this THREE times; it is the algorithmic centrepiece of this sprint)
- Section 6.7 (REVIEWS — 1 hour grace period, 30 day window, two-sided mutual rating model)
- Section 6.8 (SEARCH & FILTERS — GIN full-text index, cursor pagination, all filter combinations)
- Section 7.3 (re-listing FAILED auctions — new ID, new code, carry-over of item data only)
- Section 11, risks R05 (proxy encryption) and R14 (search result staleness under high write load)
- Section 12 (out-of-scope — no AI pricing, no recommendations, no saved-searches notification system in MVP)

You must not invent any feature. You must not skip any feature. Every endpoint, field, index, and edge case listed below traces back to a specific line in `plan_v4.md`.

CONTEXT RECAP — WHAT EXISTS AFTER SPRINT 4

- Four auction formats running end-to-end (Forward, Reverse, Sealed, Dutch).
- Bid pipeline (Section 6.1) with 15-step atomic placement, Redis SETNX locks, ranking engine, anti-snipe.
- Realtime Socket.IO infrastructure with room management.
- Notifications (email + in-app) with Bull fallback.
- Private auctions (code join, link join, direct invites).
- Watchlist with closing-soon alerts.
- Auction CRUD + lifecycle (DRAFT → SCHEDULED → OPEN → CLOSED/FAILED/CANCELLED).
- User profile (skeletal — no real ratings yet).

WHAT DOES NOT EXIST AND SPRINT 5 MUST DELIVER

1. Proxy bidding for Forward and Reverse (section 6.3). Sprint 2 left a stubbed `proxy_bid_max` field on the Bid create DTO and a no-op in the pipeline. This sprint wires it up fully.
2. Search + filters + listing endpoint (section 6.8).
3. Reviews module (section 6.7).
4. Public profile with real aggregated ratings, completed-auction count, 5 most recent reviews.
5. Re-list flow for FAILED auctions (section 7.3).

═════════════════════════════════════════════════
BRANCH: feat/sprint-5-schema
═════════════════════════════════════════════════


Add these Prisma models to `packages/domain/prisma/schema.prisma`:

model Review {
  id                String      @id @default(uuid())
  auction_id        String
  auction           Auction     @relation(fields: [auction_id], references: [id], onDelete: Cascade)
  reviewer_user_id  String
  reviewer          User        @relation("ReviewsGiven", fields: [reviewer_user_id], references: [id], onDelete: Cascade)
  reviewee_user_id  String
  reviewee          User        @relation("ReviewsReceived", fields: [reviewee_user_id], references: [id], onDelete: Cascade)
  reviewer_role     ReviewerRole  // SELLER or BUYER (direction of review)
  rating            Int         // 1–5 inclusive, enforced in app + DB check
  comment           String?     @db.VarChar(1000)
  created_at        DateTime    @default(now())
  updated_at        DateTime    @updatedAt
  is_hidden         Boolean     @default(false)  // moderation soft-hide
  hidden_reason     String?

  @@unique([auction_id, reviewer_user_id], name: "one_review_per_reviewer_per_auction")
  @@index([reviewee_user_id, created_at(sort: Desc)])
  @@index([auction_id])
}

enum ReviewerRole {
  SELLER   // seller reviewing buyer
  BUYER    // buyer reviewing seller
}

model ProxyBid {
  id                   String    @id @default(uuid())
  auction_id           String
  auction              Auction   @relation(fields: [auction_id], references: [id], onDelete: Cascade)
  user_id              String
  user                 User      @relation(fields: [user_id], references: [id], onDelete: Cascade)
  // encrypted at rest per plan R05. Stored as base64 of AES-256-GCM ciphertext || IV || authTag.
  proxy_max_amount_enc String
  // for range queries we also store a hashed bucket — see proxy bidding algorithm
  created_at           DateTime  @default(now())
  updated_at           DateTime  @updatedAt
  cancelled_at         DateTime? // set when user explicitly cancels or seller suspended
  is_active            Boolean   @default(true)

  @@unique([auction_id, user_id], name: "one_proxy_per_user_per_auction")
  @@index([auction_id, is_active])
}

Additions to Auction model for search:
- `search_vector     Unsupported("tsvector")?` (managed by trigger; see below)

Migration must include this raw SQL for the GIN index and tsvector trigger (plan 6.8):

CREATE EXTENSION IF NOT EXISTS pg_trgm;

ALTER TABLE "Auction" ADD COLUMN IF NOT EXISTS "search_vector" tsvector;

CREATE OR REPLACE FUNCTION auction_search_vector_update() RETURNS trigger AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', coalesce(NEW.title,'')), 'A') ||
    setweight(to_tsvector('english', coalesce(NEW.description,'')), 'B') ||
    setweight(to_tsvector('english', coalesce(NEW.category,'')), 'C');
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS auction_search_vector_trg ON "Auction";
CREATE TRIGGER auction_search_vector_trg
  BEFORE INSERT OR UPDATE OF title, description, category ON "Auction"
  FOR EACH ROW EXECUTE FUNCTION auction_search_vector_update();

CREATE INDEX IF NOT EXISTS auction_search_vector_idx ON "Auction" USING GIN (search_vector);
CREATE INDEX IF NOT EXISTS auction_title_trgm_idx ON "Auction" USING GIN (title gin_trgm_ops);
CREATE INDEX IF NOT EXISTS auction_status_end_idx ON "Auction" (status, end_time);
CREATE INDEX IF NOT EXISTS auction_visibility_status_idx ON "Auction" (visibility, status);

Backfill search_vector for existing rows in the same migration:
UPDATE "Auction" SET title = title;  -- triggers update
```

### Definition of Done

Every requirement in the task block above is implemented, tested, reviewed, and merged to `develop`. All listed tests pass. No feature outside the stated scope of this branch is added.

---

# SPRINT 20 — Proxy Bidding (Forward + Reverse)

> **Branch:** `feat/sprint-5-proxy-bidding`
>
> **Legacy group:** this is one slice of what `plan_v4.md` Section 9 called **Sprint 5**. In this prompts.md that group has been split so each branch is its own sprint. **Inside the prompt body below, any reference to "Sprint N" means the original `plan_v4.md` Section 9 grouping, not a sprint number in this file.**

**Sprint goal (quoted from `plan_v4.md` Section 9):** _"Bidders can discover auctions through search and filters. Forward and Reverse auctions support proxy (auto) bidding. Buyers and sellers can review each other after an auction closes."_

### Execution Mode

**Linear, single branch.** Start only after the previous sprint has merged to `develop`. One branch, one PR, one Definition of Done. When this branch merges, move to the next sprint.

### Prompt

```
ROLE: You are a senior engineer.

────────────────────────────────────────────────────────
TASK BRIEF — ONLINE AUCTION SYSTEM, SPRINT 5
Search, Proxy Bidding (Forward + Reverse), Reviews, Re-list
────────────────────────────────────────────────────────

STEP ZERO — ABSOLUTELY REQUIRED

Before writing a single line of code, open `plan_v4.md` in the repo root and read it end-to-end. Pay extreme attention to:

- Section 5.1 (forward auctions, proxy_bid_max field)
- Section 5.2 (reverse auctions — proxy inversion: proxy bids DECREASE from proxy_max_amount downward)
- Section 6.3 (PROXY BIDDING PIPELINE — read this THREE times; it is the algorithmic centrepiece of this sprint)
- Section 6.7 (REVIEWS — 1 hour grace period, 30 day window, two-sided mutual rating model)
- Section 6.8 (SEARCH & FILTERS — GIN full-text index, cursor pagination, all filter combinations)
- Section 7.3 (re-listing FAILED auctions — new ID, new code, carry-over of item data only)
- Section 11, risks R05 (proxy encryption) and R14 (search result staleness under high write load)
- Section 12 (out-of-scope — no AI pricing, no recommendations, no saved-searches notification system in MVP)

You must not invent any feature. You must not skip any feature. Every endpoint, field, index, and edge case listed below traces back to a specific line in `plan_v4.md`.

CONTEXT RECAP — WHAT EXISTS AFTER SPRINT 4

- Four auction formats running end-to-end (Forward, Reverse, Sealed, Dutch).
- Bid pipeline (Section 6.1) with 15-step atomic placement, Redis SETNX locks, ranking engine, anti-snipe.
- Realtime Socket.IO infrastructure with room management.
- Notifications (email + in-app) with Bull fallback.
- Private auctions (code join, link join, direct invites).
- Watchlist with closing-soon alerts.
- Auction CRUD + lifecycle (DRAFT → SCHEDULED → OPEN → CLOSED/FAILED/CANCELLED).
- User profile (skeletal — no real ratings yet).

WHAT DOES NOT EXIST AND SPRINT 5 MUST DELIVER

1. Proxy bidding for Forward and Reverse (section 6.3). Sprint 2 left a stubbed `proxy_bid_max` field on the Bid create DTO and a no-op in the pipeline. This sprint wires it up fully.
2. Search + filters + listing endpoint (section 6.8).
3. Reviews module (section 6.7).
4. Public profile with real aggregated ratings, completed-auction count, 5 most recent reviews.
5. Re-list flow for FAILED auctions (section 7.3).

═════════════════════════════════════════════════
BRANCH: feat/sprint-5-proxy-bidding
═════════════════════════════════════════════════


This is the hardest part of this sprint. Read plan Section 6.3 again before starting.

ENCRYPTION (plan R05):
Create `apps/api/src/infra/crypto/proxyBidCipher.ts` exposing:
- encrypt(maxAmount: number, auctionId: string, userId: string): string
- decrypt(enc: string, auctionId: string, userId: string): number

Use AES-256-GCM. Key from env var PROXY_BID_ENCRYPTION_KEY (32 bytes base64). AAD = `${auctionId}:${userId}` so ciphertext cannot be moved between users/auctions. Random 12-byte IV per encryption. Output format: base64(iv || authTag || ciphertext).

Log-safe: never log plaintext amount, never log the ciphertext, log only the ProxyBid.id.

API ENDPOINTS

POST /api/auctions/:id/proxy-bids
Body: { proxy_max_amount: number }
Auth: verified buyer not the seller.
Rules per plan 6.3:
- Only supported for format = FORWARD or REVERSE. 409 PROXY_NOT_SUPPORTED for SEALED/DUTCH.
- Auction must be OPEN.
- For FORWARD: proxy_max_amount must be > current highest bid (or ≥ starting_price if none). Must be a valid increment above current. 422 PROXY_MAX_TOO_LOW otherwise.
- For REVERSE: proxy_max_amount must be < current lowest bid ceiling (the starting_price acting as ceiling, per plan 5.2). 422 PROXY_MAX_TOO_HIGH otherwise (we treat REVERSE proxy as a floor the bidder is willing to go DOWN TO).
- Upsert into ProxyBid (one per user per auction). If user had one and submits a new value:
  - FORWARD: new value must be strictly greater than the old one (plan 6.3 "proxy-increase-only rule"). 422 PROXY_DECREASE_NOT_ALLOWED.
  - REVERSE: new value must be strictly less than the old one (symmetric inversion).
- After upsert, immediately run the proxy chain (see below). Do so inside the same distributed Redis lock used by the bid pipeline (`auction:{id}:bid`) so that a regular bid landing at the same moment cannot interleave.
- Response: { id, current_bid, is_leading, proxy_max_obscured: true }. Never echo proxy_max back.

DELETE /api/auctions/:id/proxy-bids/me
- Cancels the requesting user's proxy bid (sets is_active=false, cancelled_at=now).
- Does not retract any already-placed chain bids. 200 OK.

GET /api/auctions/:id/proxy-bids/me
- Returns { has_proxy: boolean, created_at }. NEVER returns the amount.

INTEGRATION INTO BID PIPELINE (plan 6.1 step 14 + 6.3):

Modify `apps/api/src/modules/bid/services/BidService.ts`:

After a successful manual bid (pipeline step 13 committed), BEFORE emitting new_high_bid over Socket.IO (step 15), call `ProxyBidService.runChain(auctionId, tx)`.

runChain algorithm (FORWARD):
1. Load all active ProxyBids for this auction ordered by created_at ASC (FIFO tiebreak per plan 6.3).
2. Load current highest bid B.
3. For each ProxyBid P:
   - Decrypt max.
   - If max ≤ B.amount → skip (cannot outbid).
   - If max > B.amount and P.user_id != B.user_id:
       - Compute next amount: min(B.amount + increment, max).
       - Place a bid on behalf of P.user_id at that amount. This bid must go through the same ranking engine but SKIP the "not self-outbid" check for the proxy's chain response (the proxy is responding TO someone else). It must still pass all other validations (reserve, min_increment, anti-snipe, user active, etc.).
       - Set B = the new bid.
   - If P.user_id == B.user_id → skip (already leading).
4. Loop until no further proxy can outbid. MAX ITERATIONS = 50 (safety valve against a bug causing infinite loop). If 50 reached, log CRITICAL and emit admin alert event.
5. Return the final top bid.

runChain (REVERSE):
- Mirror logic: "outbid" means "undercut". Next amount = max(B.amount - decrement, proxy_min).
- Proxy_min here is proxy_max_amount decrypted — the user's floor, meaning the lowest they're willing to offer.

TIE-BREAKING:
- If two proxies have same max, FIFO by created_at (plan 6.3).
- If proxy max equals current + increment, proxy places exactly at current + increment.
- If a later proxy ties a current high, it does NOT outbid it (FIFO: earlier bid wins ties, per plan 6.1 ranking engine).

REALTIME EMISSION:
- Each bid placed by the proxy chain emits its own `new_high_bid` event, in order, with `is_proxy_placed: true`. Clients render proxy bids visually distinct (small robot icon + label "auto-bid").
- A single `bid_accepted` is emitted only for the user's original manual bid. Proxy auto-bids do NOT emit `bid_accepted` to the owner.

SUSPENSION HOOK (plan 7.1):
- When a user is suspended, ProxyBidService.cancelAllForUser(userId) is called: sets is_active=false for all their active proxies across all auctions, emits `proxy_cancelled` notification to the user.

PROXY + ANTI-SNIPE:
- If a proxy-chain bid lands in the snipe window, the anti-snipe extension MUST trigger exactly as it would for a manual bid (plan 6.4). Each chain step may trigger its own extension, but cap at auction.max_extensions (plan 5.1).

PROXY + SEALED/DUTCH:
- SEALED: explicitly reject at endpoint (409 PROXY_NOT_SUPPORTED). Plan 5.3 has no proxy concept.
- DUTCH: explicitly reject (409 PROXY_NOT_SUPPORTED). Plan 5.4 is accept-based, not bid-based.

TESTS (critical — plan calls this the riskiest algorithm):
- Two proxies, A=100 max, B=150 max, manual bid 50 with increment 10 → B wins at 110, A's chain attempt stops (A.max=100, next=110 > max).
- Three proxies at maxes 100/120/150 in FIFO order → chain ends with the 150 proxy leading at 130 (tie-broken against 120's best attempt).
- Proxy set BELOW current high → 422.
- Proxy decrease attempt → 422 PROXY_DECREASE_NOT_ALLOWED.
- REVERSE: proxy at 40 (floor), manual bid at 50 with ceiling 60 decrement 5 → proxy undercuts to 45.
- Concurrent manual bid + proxy chain: confirm Redis lock serialises them.
- Suspension cancels all proxies.
- 51-step infinite-loop defensive bailout logged.
- Encryption roundtrip: ciphertext with wrong AAD fails to decrypt.
```

### Definition of Done

Every requirement in the task block above is implemented, tested, reviewed, and merged to `develop`. All listed tests pass. No feature outside the stated scope of this branch is added.

---

# SPRINT 21 — Search & Filters

> **Branch:** `feat/sprint-5-search`
>
> **Legacy group:** this is one slice of what `plan_v4.md` Section 9 called **Sprint 5**. In this prompts.md that group has been split so each branch is its own sprint. **Inside the prompt body below, any reference to "Sprint N" means the original `plan_v4.md` Section 9 grouping, not a sprint number in this file.**

**Sprint goal (quoted from `plan_v4.md` Section 9):** _"Bidders can discover auctions through search and filters. Forward and Reverse auctions support proxy (auto) bidding. Buyers and sellers can review each other after an auction closes."_

### Execution Mode

**Linear, single branch.** Start only after the previous sprint has merged to `develop`. One branch, one PR, one Definition of Done. When this branch merges, move to the next sprint.

### Prompt

```
ROLE: You are a senior engineer.

────────────────────────────────────────────────────────
TASK BRIEF — ONLINE AUCTION SYSTEM, SPRINT 5
Search, Proxy Bidding (Forward + Reverse), Reviews, Re-list
────────────────────────────────────────────────────────

STEP ZERO — ABSOLUTELY REQUIRED

Before writing a single line of code, open `plan_v4.md` in the repo root and read it end-to-end. Pay extreme attention to:

- Section 5.1 (forward auctions, proxy_bid_max field)
- Section 5.2 (reverse auctions — proxy inversion: proxy bids DECREASE from proxy_max_amount downward)
- Section 6.3 (PROXY BIDDING PIPELINE — read this THREE times; it is the algorithmic centrepiece of this sprint)
- Section 6.7 (REVIEWS — 1 hour grace period, 30 day window, two-sided mutual rating model)
- Section 6.8 (SEARCH & FILTERS — GIN full-text index, cursor pagination, all filter combinations)
- Section 7.3 (re-listing FAILED auctions — new ID, new code, carry-over of item data only)
- Section 11, risks R05 (proxy encryption) and R14 (search result staleness under high write load)
- Section 12 (out-of-scope — no AI pricing, no recommendations, no saved-searches notification system in MVP)

You must not invent any feature. You must not skip any feature. Every endpoint, field, index, and edge case listed below traces back to a specific line in `plan_v4.md`.

CONTEXT RECAP — WHAT EXISTS AFTER SPRINT 4

- Four auction formats running end-to-end (Forward, Reverse, Sealed, Dutch).
- Bid pipeline (Section 6.1) with 15-step atomic placement, Redis SETNX locks, ranking engine, anti-snipe.
- Realtime Socket.IO infrastructure with room management.
- Notifications (email + in-app) with Bull fallback.
- Private auctions (code join, link join, direct invites).
- Watchlist with closing-soon alerts.
- Auction CRUD + lifecycle (DRAFT → SCHEDULED → OPEN → CLOSED/FAILED/CANCELLED).
- User profile (skeletal — no real ratings yet).

WHAT DOES NOT EXIST AND SPRINT 5 MUST DELIVER

1. Proxy bidding for Forward and Reverse (section 6.3). Sprint 2 left a stubbed `proxy_bid_max` field on the Bid create DTO and a no-op in the pipeline. This sprint wires it up fully.
2. Search + filters + listing endpoint (section 6.8).
3. Reviews module (section 6.7).
4. Public profile with real aggregated ratings, completed-auction count, 5 most recent reviews.
5. Re-list flow for FAILED auctions (section 7.3).

═════════════════════════════════════════════════
BRANCH: feat/sprint-5-search
═════════════════════════════════════════════════


GET /api/auctions  (public listing + search)

Query params (plan 6.8):
- q: string (full-text, optional)
- format: FORWARD|REVERSE|SEALED|DUTCH (optional, multi-select comma-separated)
- status: OPEN|SCHEDULED|CLOSED (defaults to OPEN)
- category: string
- min_price, max_price: numbers (applied to current_bid for OPEN, starting_price otherwise)
- visibility: PUBLIC|UNIV (PRIVATE never returned in listings — plan R07)
- tenant_id: string (when visibility=UNIV only)
- sort: ending_soon | newest | price_asc | price_desc | most_bids | relevance (relevance only if q is set)
- cursor: opaque string (for pagination — see below)
- limit: int 1–50, default 20

ACCESS RULES (plan 4 visibility matrix):
- Unauthenticated users: only visibility=PUBLIC results.
- Authenticated users: PUBLIC + UNIV where auction.tenant_id == user.tenant_id.
- PRIVATE: never surfaced here. Users reach them only via code or link.

QUERY CONSTRUCTION:
Use Prisma raw query when q is present to score by ts_rank:

SELECT a.*, ts_rank(a.search_vector, plainto_tsquery('english', $1)) AS relevance
FROM "Auction" a
WHERE a.search_vector @@ plainto_tsquery('english', $1)
  AND <access predicates>
  AND <other filters>
ORDER BY <sort>
LIMIT $N OFFSET 0;

Without q, use Prisma query builder.

CURSOR PAGINATION:
Opaque cursor is base64url(JSON({ sort_key_value, id })). Each sort option maps to a concrete sort_key:
- ending_soon: (end_time ASC, id ASC)
- newest: (created_at DESC, id DESC)
- price_asc: (current_bid ASC, id ASC)
- etc.
Always include `id` as tiebreak to guarantee stable pagination even with ties.

STALENESS (plan R14):
- Search results are read from Postgres directly (no cache in MVP).
- `current_bid` is denormalised on Auction (already updated by bid pipeline in Sprint 2). Stale by at most one transaction commit.
- Responses include `served_at: ISO timestamp` so clients can show "X seconds ago".

LIVE NEW AUCTIONS SIGNAL:
When a new auction transitions to OPEN (auction-open Bull job fires), emit a Socket.IO broadcast to the `global:listings` room: `{ event: 'auction_opened', auction_id, visibility, tenant_id }`. Subscribed clients filter by their own access rules and show a non-intrusive "X new auctions" badge (frontend concern, not implemented here beyond the emission).

ENDPOINT: GET /api/auctions/categories
Returns the list of distinct categories currently in use across accessible auctions, with counts. Used to populate the filter UI.

TESTS:
- Full-text: "vintage guitar" matches title="Vintage Gibson Guitar".
- Access: anon user sees only PUBLIC; UNIV auction excluded.
- Cross-tenant: user from Tenant A cannot see UNIV of Tenant B.
- Filter combinations: format=FORWARD,DUTCH & status=OPEN & category=books works correctly.
- Pagination: 25 auctions, limit=10, three cursor roundtrips return exactly 25 distinct items with no duplicates.
- Price range on OPEN auctions: uses current_bid.
```

### Definition of Done

Every requirement in the task block above is implemented, tested, reviewed, and merged to `develop`. All listed tests pass. No feature outside the stated scope of this branch is added.

---

# SPRINT 22 — Reviews Module

> **Branch:** `feat/sprint-5-reviews`
>
> **Legacy group:** this is one slice of what `plan_v4.md` Section 9 called **Sprint 5**. In this prompts.md that group has been split so each branch is its own sprint. **Inside the prompt body below, any reference to "Sprint N" means the original `plan_v4.md` Section 9 grouping, not a sprint number in this file.**

**Sprint goal (quoted from `plan_v4.md` Section 9):** _"Bidders can discover auctions through search and filters. Forward and Reverse auctions support proxy (auto) bidding. Buyers and sellers can review each other after an auction closes."_

### Execution Mode

**Linear, single branch.** Start only after the previous sprint has merged to `develop`. One branch, one PR, one Definition of Done. When this branch merges, move to the next sprint.

### Prompt

```
ROLE: You are a senior engineer.

────────────────────────────────────────────────────────
TASK BRIEF — ONLINE AUCTION SYSTEM, SPRINT 5
Search, Proxy Bidding (Forward + Reverse), Reviews, Re-list
────────────────────────────────────────────────────────

STEP ZERO — ABSOLUTELY REQUIRED

Before writing a single line of code, open `plan_v4.md` in the repo root and read it end-to-end. Pay extreme attention to:

- Section 5.1 (forward auctions, proxy_bid_max field)
- Section 5.2 (reverse auctions — proxy inversion: proxy bids DECREASE from proxy_max_amount downward)
- Section 6.3 (PROXY BIDDING PIPELINE — read this THREE times; it is the algorithmic centrepiece of this sprint)
- Section 6.7 (REVIEWS — 1 hour grace period, 30 day window, two-sided mutual rating model)
- Section 6.8 (SEARCH & FILTERS — GIN full-text index, cursor pagination, all filter combinations)
- Section 7.3 (re-listing FAILED auctions — new ID, new code, carry-over of item data only)
- Section 11, risks R05 (proxy encryption) and R14 (search result staleness under high write load)
- Section 12 (out-of-scope — no AI pricing, no recommendations, no saved-searches notification system in MVP)

You must not invent any feature. You must not skip any feature. Every endpoint, field, index, and edge case listed below traces back to a specific line in `plan_v4.md`.

CONTEXT RECAP — WHAT EXISTS AFTER SPRINT 4

- Four auction formats running end-to-end (Forward, Reverse, Sealed, Dutch).
- Bid pipeline (Section 6.1) with 15-step atomic placement, Redis SETNX locks, ranking engine, anti-snipe.
- Realtime Socket.IO infrastructure with room management.
- Notifications (email + in-app) with Bull fallback.
- Private auctions (code join, link join, direct invites).
- Watchlist with closing-soon alerts.
- Auction CRUD + lifecycle (DRAFT → SCHEDULED → OPEN → CLOSED/FAILED/CANCELLED).
- User profile (skeletal — no real ratings yet).

WHAT DOES NOT EXIST AND SPRINT 5 MUST DELIVER

1. Proxy bidding for Forward and Reverse (section 6.3). Sprint 2 left a stubbed `proxy_bid_max` field on the Bid create DTO and a no-op in the pipeline. This sprint wires it up fully.
2. Search + filters + listing endpoint (section 6.8).
3. Reviews module (section 6.7).
4. Public profile with real aggregated ratings, completed-auction count, 5 most recent reviews.
5. Re-list flow for FAILED auctions (section 7.3).

═════════════════════════════════════════════════
BRANCH: feat/sprint-5-reviews
═════════════════════════════════════════════════


ENDPOINTS

POST /api/auctions/:id/reviews
Body: { rating: 1–5, comment?: string (max 1000 chars), reviewer_role: SELLER|BUYER }
Auth: verified user.
Eligibility checks per plan 6.7:
- Auction status = CLOSED (not FAILED, not CANCELLED). 409 AUCTION_NOT_CLOSED otherwise.
- If reviewer_role = SELLER: requesting user must be auction.seller_id. Reviewee = auction.winner_user_id.
- If reviewer_role = BUYER: requesting user must be auction.winner_user_id. Reviewee = auction.seller_id.
- Auction must have a winner (CLOSED with winner_user_id != null).
- Timing window: now >= auction.end_time + 1 hour (grace period) AND now <= auction.end_time + 30 days.
  - Before grace: 409 REVIEW_TOO_EARLY
  - After window: 409 REVIEW_WINDOW_CLOSED
- User cannot review twice on the same auction from the same role (Prisma unique constraint will enforce — catch P2002 as 409 REVIEW_ALREADY_SUBMITTED).

On success:
- Insert Review row.
- Recompute reviewee's rating_avg and rating_count on User (denormalised for public profile performance).
- Emit in-app notification to reviewee: "You received a 4-star review on auction {auction.title}".

GET /api/users/:id/reviews?page=cursor
Returns paginated reviews where reviewee_user_id = :id AND is_hidden = false. Public endpoint (no auth required), because public profiles per plan 6.5 are public.

GET /api/auctions/:id/reviews
Returns both reviews (if submitted) for this auction. Accessible by seller, winner, and Platform/University Admins.

MODERATION:
POST /api/admin/reviews/:id/hide — Platform Admin or University Admin (if reviewer or reviewee is in their tenant). Sets is_hidden=true, hidden_reason, emits audit log entry, recomputes reviewee's aggregate.

REMINDER JOB:
Schedule a Bull delayed job `review-reminder` at auction close + 24h to email both parties if they haven't reviewed yet. Single reminder only per plan 6.7 "one reminder".

TESTS:
- Seller reviews winner, winner reviews seller → both succeed, both aggregates update.
- Submit 59 minutes after close → 409 REVIEW_TOO_EARLY.
- Submit 30 days + 1 minute after close → 409 REVIEW_WINDOW_CLOSED.
- Attempt to review a FAILED auction → 409 AUCTION_NOT_CLOSED.
- Double-submit → 409 REVIEW_ALREADY_SUBMITTED.
- Moderation hide removes the review from aggregate and from public listing.
```

### Definition of Done

Every requirement in the task block above is implemented, tested, reviewed, and merged to `develop`. All listed tests pass. No feature outside the stated scope of this branch is added.

---

# SPRINT 23 — Public Profile & Re-list Failed Auctions

> **Branch:** `feat/sprint-5-relist-and-profile`
>
> **Legacy group:** this is one slice of what `plan_v4.md` Section 9 called **Sprint 5**. In this prompts.md that group has been split so each branch is its own sprint. **Inside the prompt body below, any reference to "Sprint N" means the original `plan_v4.md` Section 9 grouping, not a sprint number in this file.**

**Sprint goal (quoted from `plan_v4.md` Section 9):** _"Bidders can discover auctions through search and filters. Forward and Reverse auctions support proxy (auto) bidding. Buyers and sellers can review each other after an auction closes."_

### Execution Mode

**Linear, single branch.** Start only after the previous sprint has merged to `develop`. One branch, one PR, one Definition of Done. When this branch merges, move to the next sprint.

### Prompt

```
ROLE: You are a senior engineer.

────────────────────────────────────────────────────────
TASK BRIEF — ONLINE AUCTION SYSTEM, SPRINT 5
Search, Proxy Bidding (Forward + Reverse), Reviews, Re-list
────────────────────────────────────────────────────────

STEP ZERO — ABSOLUTELY REQUIRED

Before writing a single line of code, open `plan_v4.md` in the repo root and read it end-to-end. Pay extreme attention to:

- Section 5.1 (forward auctions, proxy_bid_max field)
- Section 5.2 (reverse auctions — proxy inversion: proxy bids DECREASE from proxy_max_amount downward)
- Section 6.3 (PROXY BIDDING PIPELINE — read this THREE times; it is the algorithmic centrepiece of this sprint)
- Section 6.7 (REVIEWS — 1 hour grace period, 30 day window, two-sided mutual rating model)
- Section 6.8 (SEARCH & FILTERS — GIN full-text index, cursor pagination, all filter combinations)
- Section 7.3 (re-listing FAILED auctions — new ID, new code, carry-over of item data only)
- Section 11, risks R05 (proxy encryption) and R14 (search result staleness under high write load)
- Section 12 (out-of-scope — no AI pricing, no recommendations, no saved-searches notification system in MVP)

You must not invent any feature. You must not skip any feature. Every endpoint, field, index, and edge case listed below traces back to a specific line in `plan_v4.md`.

CONTEXT RECAP — WHAT EXISTS AFTER SPRINT 4

- Four auction formats running end-to-end (Forward, Reverse, Sealed, Dutch).
- Bid pipeline (Section 6.1) with 15-step atomic placement, Redis SETNX locks, ranking engine, anti-snipe.
- Realtime Socket.IO infrastructure with room management.
- Notifications (email + in-app) with Bull fallback.
- Private auctions (code join, link join, direct invites).
- Watchlist with closing-soon alerts.
- Auction CRUD + lifecycle (DRAFT → SCHEDULED → OPEN → CLOSED/FAILED/CANCELLED).
- User profile (skeletal — no real ratings yet).

WHAT DOES NOT EXIST AND SPRINT 5 MUST DELIVER

1. Proxy bidding for Forward and Reverse (section 6.3). Sprint 2 left a stubbed `proxy_bid_max` field on the Bid create DTO and a no-op in the pipeline. This sprint wires it up fully.
2. Search + filters + listing endpoint (section 6.8).
3. Reviews module (section 6.7).
4. Public profile with real aggregated ratings, completed-auction count, 5 most recent reviews.
5. Re-list flow for FAILED auctions (section 7.3).

═════════════════════════════════════════════════
BRANCH: feat/sprint-5-relist-and-profile
═════════════════════════════════════════════════


PUBLIC PROFILE (plan 6.5):
GET /api/users/:id/profile (already skeletal from Sprint 1 — now populate for real):
{
  id, display_name, tenant_name_if_uni, member_since,
  rating_avg, rating_count,
  completed_auctions_count_as_seller,
  completed_auctions_count_as_buyer,
  recent_reviews: Review[5] (5 most recent non-hidden, with reviewer display_name)
}
Never returns email, real name (unless display_name IS real name), or university email.

RE-LIST FAILED AUCTIONS (plan 7.3):
POST /api/auctions/:id/relist
Auth: auction.seller_id == requesting user.
Rules:
- Source auction.status must be FAILED. 409 AUCTION_NOT_FAILED otherwise.
- Can re-list max 2 times per failed lineage (track via auction.relisted_from_id chain). 409 RELIST_LIMIT_REACHED.
- Optional body overrides: starting_price, start_time, end_time (duration), reserve_price, increment. Format and item details are carried over.
- Creates a new Auction row with:
  - new UUID, new 8-char code
  - status = DRAFT (seller must still explicitly publish — or pass `?publish=true` query to auto-publish per plan 7.3)
  - relisted_from_id = source.id
  - Item rows (AuctionItem, AuctionItemImage) are CLONED (deep copy, new IDs) so editing one doesn't affect the other.

GET /api/auctions/:id/relisted-chain — returns the chain of auction IDs for transparency in the UI (so a buyer can see "this item was listed before").

WEB CHANGES:
- Public profile page (`apps/web/app/users/[id]/page.tsx`) renders real ratings + reviews list.
- FAILED auction page shows a "Re-list this auction" button to the seller.
- Listings page adds search bar + filter sidebar.

═════════════════════════════════════════════════════════
EDGE CASES & RISK MITIGATIONS
═════════════════════════════════════════════════════════

- R05 (proxy encryption): verified by a test that opens a DB snapshot, reads ProxyBid.proxy_max_amount_enc as raw string, and confirms no plaintext number is recoverable without the key.
- R14 (search staleness): documented limitation; sub-1s acceptable per plan. No caching in MVP. If it becomes a problem post-launch, add pg_notify → invalidation.
- Proxy + anti-snipe interaction: extension count applies to the auction, not per bid. One chain run can trigger at most one extension (we snapshot the count at chain start and compare at end).
- Review eligibility: a user deleted (soft-deleted) during the 30-day window CAN still be reviewed; their name shows as "[Deleted User]" per plan 7.10.
- Search result `current_bid` for DUTCH shows the CURRENT ticked price, not starting, per plan 5.4.

DEFINITION OF DONE

Matches plan Section 9 Sprint 5 DoD. Concretely, a tester can:
1. Search "vintage guitar", filter to Forward auctions, see results sorted by ending_soon.
2. Submit a proxy bid of ₹2000 on a Forward auction. Watch it auto-outbid three subsequent manual bids from other users up to ₹2000.
3. Win the auction. Wait 1 hour 1 minute. Submit a 5-star review. See seller's rating_avg update live.
4. After auction FAILS (reserve not met), click "Re-list" and see a new DRAFT auction with the same item.
```

### Definition of Done (Sprint 5)

Matches `plan_v4.md` Section 9 Sprint 5 DoD: _"Auctions are discoverable via search and filters. Forward and Reverse auctions support proxy bidding with encrypted max amounts. Buyers and sellers can review each other within the defined window. Failed auctions can be re-listed."_

---

# SPRINT 24 — Admin Core (Layout, Guards, Audit Log Viewer)

> **Branch:** `feat/sprint-6-admin-core`
>
> **Legacy group:** this is one slice of what `plan_v4.md` Section 9 called **Sprint 6**. In this prompts.md that group has been split so each branch is its own sprint. **Inside the prompt body below, any reference to "Sprint N" means the original `plan_v4.md` Section 9 grouping, not a sprint number in this file.**

**Sprint goal (quoted from `plan_v4.md` Section 9):** _"Platform Admins and University Admins have functional dashboards to manage users, tenants, auctions, and reviews. Suspension, force-cancel, account deletion, and audit log viewing all work. Activity reports are available."_

### Execution Mode

**Linear, single branch.** Start only after the previous sprint has merged to `develop`. One branch, one PR, one Definition of Done. When this branch merges, move to the next sprint.

### Prompt

```
ROLE: You are a senior engineer.

────────────────────────────────────────────────────────
TASK BRIEF — ONLINE AUCTION SYSTEM, SPRINT 6
Admin Panels, Suspensions, Account Deletion, Reports, Moderation
────────────────────────────────────────────────────────

STEP ZERO

Read `plan_v4.md` end-to-end. Focus especially on:
- Section 3.5 (admin roles and their responsibilities — every bullet is a feature)
- Section 6.6 (audit log — this sprint only READS it; writes already exist from Sprints 1–5)
- Section 7.1 (user suspension cascade — every single action listed must happen atomically)
- Section 7.10 (account deletion — 30-day soft-delete with grace for recovery)
- Section 10.3 (test admin accounts you will use)

WHAT EXISTS AFTER SPRINT 5
- Full auction lifecycle across 4 formats
- Proxy bidding, search, reviews
- RBAC middleware (requireRole) from Sprint 1
- AuditLog table and write hooks throughout
- Notification infrastructure
- User soft-delete column (deleted_at) from Sprint 1 — but no workflow around it yet

WHAT SPRINT 6 DELIVERS
1. Platform Admin dashboard: global view of all users, tenants, auctions, reviews, audit log.
2. University Admin dashboard: scoped view of their own tenant's users, auctions, reviews, audit log.
3. Suspension workflow (plan 7.1) with full cascade.
4. Force-cancel auction workflow (plan 3.5 + 7.1).
5. Account deletion 30-day flow (plan 7.10).
6. Review moderation (hide).
7. Activity reports.

═════════════════════════════════════════════════
BRANCH: feat/sprint-6-admin-core
═════════════════════════════════════════════════


ROUTE STRUCTURE:
apps/api/src/modules/admin/
  controllers/
    platformAdmin.controller.ts  (requires PLATFORM_ADMIN role)
    universityAdmin.controller.ts (requires UNIVERSITY_ADMIN role, tenant-scoped)
  services/
    adminQueryScope.ts    // applies tenant filter for University Admins

Admin middleware `requireAdminScope`:
- Platform Admin sees everything (no tenant filter).
- University Admin: inject `{ tenant_filter: req.user.tenant_id }` into query context. Any service called from this controller MUST respect this filter.
- Any attempt by a University Admin to access a resource outside their tenant returns 403 OUT_OF_SCOPE.

apps/web/app/admin/layout.tsx:
- Admin nav sidebar: Dashboard, Users, Tenants (Platform only), Auctions, Reviews, Audit Log, Reports.
- Server-side guard: redirect to /login if not authenticated; redirect to / if not an admin role.

AUDIT LOG VIEWER:
GET /api/admin/audit-log
Query: actor_user_id, action, target_type, target_id, from, to, cursor, limit
- Platform Admin: full access.
- University Admin: only entries where actor or target belongs to their tenant. Implement as a JOIN to User/Auction and filter.
- Response includes denormalised actor display_name, target type label.
```

### Definition of Done

Every requirement in the task block above is implemented, tested, reviewed, and merged to `develop`. All listed tests pass. No feature outside the stated scope of this branch is added.

---

# SPRINT 25 — Suspensions & Account Deletion

> **Branch:** `feat/sprint-6-suspensions-deletion`
>
> **Legacy group:** this is one slice of what `plan_v4.md` Section 9 called **Sprint 6**. In this prompts.md that group has been split so each branch is its own sprint. **Inside the prompt body below, any reference to "Sprint N" means the original `plan_v4.md` Section 9 grouping, not a sprint number in this file.**

**Sprint goal (quoted from `plan_v4.md` Section 9):** _"Platform Admins and University Admins have functional dashboards to manage users, tenants, auctions, and reviews. Suspension, force-cancel, account deletion, and audit log viewing all work. Activity reports are available."_

### Execution Mode

**Linear, single branch.** Start only after the previous sprint has merged to `develop`. One branch, one PR, one Definition of Done. When this branch merges, move to the next sprint.

### Prompt

```
ROLE: You are a senior engineer.

────────────────────────────────────────────────────────
TASK BRIEF — ONLINE AUCTION SYSTEM, SPRINT 6
Admin Panels, Suspensions, Account Deletion, Reports, Moderation
────────────────────────────────────────────────────────

STEP ZERO

Read `plan_v4.md` end-to-end. Focus especially on:
- Section 3.5 (admin roles and their responsibilities — every bullet is a feature)
- Section 6.6 (audit log — this sprint only READS it; writes already exist from Sprints 1–5)
- Section 7.1 (user suspension cascade — every single action listed must happen atomically)
- Section 7.10 (account deletion — 30-day soft-delete with grace for recovery)
- Section 10.3 (test admin accounts you will use)

WHAT EXISTS AFTER SPRINT 5
- Full auction lifecycle across 4 formats
- Proxy bidding, search, reviews
- RBAC middleware (requireRole) from Sprint 1
- AuditLog table and write hooks throughout
- Notification infrastructure
- User soft-delete column (deleted_at) from Sprint 1 — but no workflow around it yet

WHAT SPRINT 6 DELIVERS
1. Platform Admin dashboard: global view of all users, tenants, auctions, reviews, audit log.
2. University Admin dashboard: scoped view of their own tenant's users, auctions, reviews, audit log.
3. Suspension workflow (plan 7.1) with full cascade.
4. Force-cancel auction workflow (plan 3.5 + 7.1).
5. Account deletion 30-day flow (plan 7.10).
6. Review moderation (hide).
7. Activity reports.

═════════════════════════════════════════════════
BRANCH: feat/sprint-6-suspensions-deletion
═════════════════════════════════════════════════


SUSPENSION (plan 7.1):

POST /api/admin/users/:id/suspend
Body: { reason: string (required, 10–500 chars), duration_days?: number (omit = indefinite) }
Auth: Platform Admin; OR University Admin if target.tenant_id == actor.tenant_id.
Behaviour — ALL inside a single SERIALIZABLE transaction:

1. Set user.status = SUSPENDED, user.suspended_until = now + duration_days (or null for indefinite), user.suspension_reason = reason.
2. For every OPEN auction where user is the SELLER:
   - Transition to CANCELLED.
   - Emit `auction_cancelled` to the auction room.
   - Notify every bidder: "Auction {title} was cancelled because the seller account was suspended."
3. For every OPEN auction where user has an active bid:
   - Mark their bids as `is_bidder_suspended = true` (add this column to Bid model — migration required).
   - Recompute the auction's ranking EXCLUDING suspended-bidder bids. The new top bid becomes the leading bid; emit `new_high_bid` with `ranking_recomputed: true`.
   - If user was the current leader and there is no next valid bid, the auction has NO CURRENT HIGH BID. Emit `no_current_leader` event.
4. Cancel all active ProxyBids for this user (set is_active=false, cancelled_at=now, cancellation_reason=USER_SUSPENDED).
5. For every OPEN DUTCH auction where this user accepted pending fulfilment — N/A in MVP (accept is instant). If the plan evolves, handle here.
6. Revoke all active Sessions for this user (set revoked=true). Forces logout on next refresh.
7. Write AuditLog entry: action=USER_SUSPENDED, actor=admin, target=user, metadata={reason, duration_days}.
8. Send in-app + email notification to the suspended user: "Your account has been suspended. Reason: ..."
9. Commit transaction.

If duration_days was set, schedule Bull job `unsuspend` at suspended_until with jobId = `unsuspend:{userId}`. That job sets status back to ACTIVE, suspended_until=null, and emits a notification.

POST /api/admin/users/:id/unsuspend
- Manual unsuspend. Same auth. Cancels the delayed Bull job (by jobId), sets status=ACTIVE.
- Does NOT un-cancel previously cancelled auctions or re-rank prior bids. The suspension cascade was destructive and is not reversed.

TESTS:
- User has 3 OPEN seller auctions → all 3 become CANCELLED on suspend.
- User is leading on auction X → recomputation promotes the next bidder, emits `new_high_bid` with `ranking_recomputed: true`.
- Delayed unsuspend fires automatically and restores login.
- User's refresh token fails with 401 within 1 second of suspension.

FORCE-CANCEL AUCTION:
POST /api/admin/auctions/:id/force-cancel
Body: { reason: string }
Auth: Platform Admin; OR University Admin if auction.tenant_id == actor.tenant_id AND visibility != PUBLIC OR auction.seller.tenant_id == actor.tenant_id.
- Transition status to CANCELLED.
- Notify seller and all active bidders with reason.
- Write audit log.

ACCOUNT DELETION (plan 7.10):

POST /api/users/me/delete-request
Body: { password: string, reason?: string }
Auth: any verified user.
- Verify password.
- If user has any OPEN auctions as seller with bids placed → 409 CANNOT_DELETE_WITH_ACTIVE_SELLER_AUCTIONS. Must cancel those first.
- If user has any active bids as buyer → cancel those bids (same ranking recompute as suspension cascade).
- Set user.status = PENDING_DELETION, user.deletion_requested_at = now, user.deletion_effective_at = now + 30 days.
- Revoke all sessions.
- Schedule Bull delayed job `finalize-deletion` at deletion_effective_at with jobId = `delete:{userId}`.
- Send email: "Your account will be permanently deleted on {date}. Log in any time before then to cancel."

POST /api/users/me/delete-cancel
- During the 30-day window (status = PENDING_DELETION), the user can log back in and cancel.
- Cancels the Bull job, sets status = ACTIVE, clears deletion_* fields.
- Email confirmation.

Bull `finalize-deletion` job at deletion_effective_at:
- Soft-delete: set user.deleted_at = now, user.email = `deleted-{id}@deleted.local`, display_name = "[Deleted User]", clear password_hash, clear all PII fields (full_name, university_email, phone if any).
- DO NOT delete:
  - Auctions where they were seller (keep for historical record; seller shows as "[Deleted User]")
  - Bids they placed (same reason)
  - Reviews written by or about them (with display "[Deleted User]")
  - Audit log entries
- This is plan 7.10 exactly: "Personal data scrubbed; transactional history preserved for audit."

Login attempts for a soft-deleted account: 401 ACCOUNT_DELETED, always.

TESTS:
- Request deletion, confirm email sent.
- Within 30 days, log in → auto-cancels deletion. 200 OK.
- Bull job fires at T+30d → user.email is `deleted-...@deleted.local`, cannot log in.
- Reviews written by this user still appear, showing "[Deleted User]".
```

### Definition of Done

Every requirement in the task block above is implemented, tested, reviewed, and merged to `develop`. All listed tests pass. No feature outside the stated scope of this branch is added.

---

# SPRINT 26 — Admin Reports & Analytics

> **Branch:** `feat/sprint-6-reports`
>
> **Legacy group:** this is one slice of what `plan_v4.md` Section 9 called **Sprint 6**. In this prompts.md that group has been split so each branch is its own sprint. **Inside the prompt body below, any reference to "Sprint N" means the original `plan_v4.md` Section 9 grouping, not a sprint number in this file.**

**Sprint goal (quoted from `plan_v4.md` Section 9):** _"Platform Admins and University Admins have functional dashboards to manage users, tenants, auctions, and reviews. Suspension, force-cancel, account deletion, and audit log viewing all work. Activity reports are available."_

### Execution Mode

**Linear, single branch.** Start only after the previous sprint has merged to `develop`. One branch, one PR, one Definition of Done. When this branch merges, move to the next sprint.

### Prompt

```
ROLE: You are a senior engineer.

────────────────────────────────────────────────────────
TASK BRIEF — ONLINE AUCTION SYSTEM, SPRINT 6
Admin Panels, Suspensions, Account Deletion, Reports, Moderation
────────────────────────────────────────────────────────

STEP ZERO

Read `plan_v4.md` end-to-end. Focus especially on:
- Section 3.5 (admin roles and their responsibilities — every bullet is a feature)
- Section 6.6 (audit log — this sprint only READS it; writes already exist from Sprints 1–5)
- Section 7.1 (user suspension cascade — every single action listed must happen atomically)
- Section 7.10 (account deletion — 30-day soft-delete with grace for recovery)
- Section 10.3 (test admin accounts you will use)

WHAT EXISTS AFTER SPRINT 5
- Full auction lifecycle across 4 formats
- Proxy bidding, search, reviews
- RBAC middleware (requireRole) from Sprint 1
- AuditLog table and write hooks throughout
- Notification infrastructure
- User soft-delete column (deleted_at) from Sprint 1 — but no workflow around it yet

WHAT SPRINT 6 DELIVERS
1. Platform Admin dashboard: global view of all users, tenants, auctions, reviews, audit log.
2. University Admin dashboard: scoped view of their own tenant's users, auctions, reviews, audit log.
3. Suspension workflow (plan 7.1) with full cascade.
4. Force-cancel auction workflow (plan 3.5 + 7.1).
5. Account deletion 30-day flow (plan 7.10).
6. Review moderation (hide).
7. Activity reports.

═════════════════════════════════════════════════
BRANCH: feat/sprint-6-reports
═════════════════════════════════════════════════


PLATFORM ADMIN REPORTS:
GET /api/admin/reports/platform-overview
Returns:
- total_users (by status)
- total_tenants (active)
- total_auctions_last_30d (by format, by status)
- success_rate (CLOSED / (CLOSED+FAILED+CANCELLED))
- avg_bids_per_auction
- gmv_proxy: sum of final_price for CLOSED auctions in last 30d (note: not real money, just a value metric)
- top_10_categories_by_volume

GET /api/admin/reports/user-growth?window=30d|90d|1y
Returns time-series of daily registrations.

UNIVERSITY ADMIN REPORTS (scoped to their tenant):
GET /api/admin/reports/tenant-overview
Same shape as platform-overview but filtered to auctions where seller.tenant_id or any bidder.tenant_id = actor.tenant_id.

Implement these as raw SQL in read-only Postgres for performance. Cache the response for 5 minutes (Redis, key = `report:{type}:{scope}:{hash_of_params}`). Invalidate never — the 5-min TTL is enough.

TESTS:
- Platform Admin sees global numbers.
- University Admin of Tenant A sees only Tenant A's scope.
- Cache hit observable in logs on second call within 5 min.
```

### Definition of Done

Every requirement in the task block above is implemented, tested, reviewed, and merged to `develop`. All listed tests pass. No feature outside the stated scope of this branch is added.

---

# SPRINT 27 — Review Moderation & Force-Cancel UI

> **Branch:** `feat/sprint-6-moderation`
>
> **Legacy group:** this is one slice of what `plan_v4.md` Section 9 called **Sprint 6**. In this prompts.md that group has been split so each branch is its own sprint. **Inside the prompt body below, any reference to "Sprint N" means the original `plan_v4.md` Section 9 grouping, not a sprint number in this file.**

**Sprint goal (quoted from `plan_v4.md` Section 9):** _"Platform Admins and University Admins have functional dashboards to manage users, tenants, auctions, and reviews. Suspension, force-cancel, account deletion, and audit log viewing all work. Activity reports are available."_

### Execution Mode

**Linear, single branch.** Start only after the previous sprint has merged to `develop`. One branch, one PR, one Definition of Done. When this branch merges, move to the next sprint.

### Prompt

```
ROLE: You are a senior engineer.

────────────────────────────────────────────────────────
TASK BRIEF — ONLINE AUCTION SYSTEM, SPRINT 6
Admin Panels, Suspensions, Account Deletion, Reports, Moderation
────────────────────────────────────────────────────────

STEP ZERO

Read `plan_v4.md` end-to-end. Focus especially on:
- Section 3.5 (admin roles and their responsibilities — every bullet is a feature)
- Section 6.6 (audit log — this sprint only READS it; writes already exist from Sprints 1–5)
- Section 7.1 (user suspension cascade — every single action listed must happen atomically)
- Section 7.10 (account deletion — 30-day soft-delete with grace for recovery)
- Section 10.3 (test admin accounts you will use)

WHAT EXISTS AFTER SPRINT 5
- Full auction lifecycle across 4 formats
- Proxy bidding, search, reviews
- RBAC middleware (requireRole) from Sprint 1
- AuditLog table and write hooks throughout
- Notification infrastructure
- User soft-delete column (deleted_at) from Sprint 1 — but no workflow around it yet

WHAT SPRINT 6 DELIVERS
1. Platform Admin dashboard: global view of all users, tenants, auctions, reviews, audit log.
2. University Admin dashboard: scoped view of their own tenant's users, auctions, reviews, audit log.
3. Suspension workflow (plan 7.1) with full cascade.
4. Force-cancel auction workflow (plan 3.5 + 7.1).
5. Account deletion 30-day flow (plan 7.10).
6. Review moderation (hide).
7. Activity reports.

═════════════════════════════════════════════════
BRANCH: feat/sprint-6-moderation
═════════════════════════════════════════════════


REVIEW HIDING — API already built in Sprint 5 Branch 4. This branch wires the admin UI to it:
- `apps/web/app/admin/reviews/page.tsx`: paginated list of all reviews (Platform) or tenant-scoped reviews (University), with search and a "Hide" button.
- Confirmation modal must require a hidden_reason (≥10 chars).

USER MANAGEMENT UI:
- `apps/web/app/admin/users/page.tsx`: search, filter by status, paginated list.
- Row actions: View (to profile + admin-only details like real email), Suspend, Unsuspend, Impersonate (Platform only, Sprint 7 optional — not required here).

TENANT MANAGEMENT UI (Platform Admin only):
- `apps/web/app/admin/tenants/page.tsx`: CRUD. Name, domain regex, is_active toggle.
- Deactivating a tenant: confirm dialog warns "Existing users in this tenant retain access; new registrations blocked." (plan 3.4).

═════════════════════════════════════════════════════════
EDGE CASES
═════════════════════════════════════════════════════════

- Suspending an admin: Platform Admin can suspend a University Admin; a University Admin CANNOT suspend a Platform Admin or another University Admin. 403 INSUFFICIENT_PRIVILEGE.
- Suspending yourself: always 400 CANNOT_SUSPEND_SELF.
- Deleting an admin account: Platform Admin must first demote themselves (not in MVP scope — block with 409 ADMIN_MUST_DEMOTE_FIRST).
- Deletion request during an unsuspend pending: rejected — 409 RESOLVE_SUSPENSION_FIRST.

DEFINITION OF DONE
Matches plan Section 9 Sprint 6 DoD. Admin dashboards are functional for both roles with tenant scoping enforced end-to-end. Suspension, force-cancel, and account deletion all execute their full cascades atomically.
```

### Definition of Done (Sprint 6)

Matches `plan_v4.md` Section 9 Sprint 6 DoD: _"Admin dashboards are functional. Platform and University admins can manage users, auctions, and reviews within their scope. Suspension, force-cancel, and 30-day account deletion flows are live and tested."_

---

# SPRINT 28 — Security Hardening (Rate Limits, TLS, Sanitisation)

> **Branch:** `chore/sprint-7-security`
>
> **Legacy group:** this is one slice of what `plan_v4.md` Section 9 called **Sprint 7**. In this prompts.md that group has been split so each branch is its own sprint. **Inside the prompt body below, any reference to "Sprint N" means the original `plan_v4.md` Section 9 grouping, not a sprint number in this file.**

**Sprint goal (quoted from `plan_v4.md` Section 9):** _"System passes all functional tests across formats, concurrency tests, load tests, and security checks. Deployment pipeline and monitoring are in place. The product is ready to serve real users."_

### Execution Mode

**Linear, single branch.** Start only after the previous sprint has merged to `develop`. One branch, one PR, one Definition of Done. When this branch merges, move to the next sprint.

### Prompt

```
ROLE: You are a senior engineer.

────────────────────────────────────────────────────────
TASK BRIEF — ONLINE AUCTION SYSTEM, SPRINT 7
Security, Performance, Observability, Launch Readiness
────────────────────────────────────────────────────────

STEP ZERO

Read `plan_v4.md` end-to-end once more. Then re-read, very carefully:
- Section 8 (architecture — nginx, TLS, horizontal scaling specifics)
- Section 10.2 (coverage matrix — find any gap and close it)
- Section 10.4 (load tests — EVERY number here is a pass criterion)
- Section 11 (risks R01–R15 — each must have a verified mitigation in this sprint)

DO NOT add new features. Sprint 7 is purely about making what exists correct, fast, observable, and deployable.

═════════════════════════════════════════════════
BRANCH: chore/sprint-7-security
═════════════════════════════════════════════════


RATE LIMITING (Redis-backed, token bucket):
Create `apps/api/src/middleware/rateLimit.ts` using `rate-limiter-flexible` with Redis store. Apply per-endpoint-group:

| Endpoint group | Limit | Key |
|---|---|---|
| POST /auth/login | 5/min, 20/hour | IP |
| POST /auth/register | 3/hour | IP |
| POST /auth/forgot-password | 3/hour | IP + email |
| POST /auctions/:id/bids | 30/min | user_id |
| POST /auctions/:id/proxy-bids | 10/min | user_id |
| POST /auctions/:id/dutch/accept | 5/min | user_id |
| POST /auctions | 20/day | user_id |
| GET /auctions (search) | 60/min | user_id or IP |
| Socket.IO connection | 10/min | IP |

On limit exceeded: 429 RATE_LIMITED with `Retry-After` header.

INPUT SANITISATION:
- All string inputs pass through a sanitiser that strips zero-width chars and normalises unicode (NFKC).
- HTML-rich fields (auction description, review comment): allow only a safe subset via `sanitize-html`: <p>, <br>, <strong>, <em>, <ul>, <ol>, <li>. Strip all attributes.
- Validate all UUIDs with Zod .uuid() at route level.
- Reject request bodies > 1 MB (except image uploads at dedicated endpoints).

TLS / nginx (plan Section 8):
- `docker/nginx/nginx.conf`: serve HTTPS on 443, redirect HTTP 80 → 443. TLS 1.2+ only, Mozilla "intermediate" cipher list.
- Self-signed cert in dev; clear comments in the file pointing to where ACME / Let's Encrypt would plug in for prod.
- Security headers: Strict-Transport-Security, X-Content-Type-Options, X-Frame-Options: DENY, Content-Security-Policy (tight — script-src 'self'; connect-src 'self' wss://<domain>; img-src 'self' data: blob:).
- Next.js: helmet-style headers via middleware.

CSRF:
- Refresh token cookie is httpOnly and SameSite=Strict already (Sprint 1). Double-submit CSRF token for any non-GET non-auth endpoint that relies on cookies.

TESTS:
- OWASP ZAP baseline scan in CI — zero high-severity findings.
- Manually verify: SQL injection attempt on /auctions?q=' OR 1=1 -- returns clean.
- XSS attempt in review comment → stored sanitised, rendered safely.
```

### Definition of Done

Every requirement in the task block above is implemented, tested, reviewed, and merged to `develop`. All listed tests pass. No feature outside the stated scope of this branch is added.

---

# SPRINT 29 — Performance & Load Tests

> **Branch:** `perf/sprint-7-load-and-cache`
>
> **Legacy group:** this is one slice of what `plan_v4.md` Section 9 called **Sprint 7**. In this prompts.md that group has been split so each branch is its own sprint. **Inside the prompt body below, any reference to "Sprint N" means the original `plan_v4.md` Section 9 grouping, not a sprint number in this file.**

**Sprint goal (quoted from `plan_v4.md` Section 9):** _"System passes all functional tests across formats, concurrency tests, load tests, and security checks. Deployment pipeline and monitoring are in place. The product is ready to serve real users."_

### Execution Mode

**Linear, single branch.** Start only after the previous sprint has merged to `develop`. One branch, one PR, one Definition of Done. When this branch merges, move to the next sprint.

### Prompt

```
ROLE: You are a senior engineer.

────────────────────────────────────────────────────────
TASK BRIEF — ONLINE AUCTION SYSTEM, SPRINT 7
Security, Performance, Observability, Launch Readiness
────────────────────────────────────────────────────────

STEP ZERO

Read `plan_v4.md` end-to-end once more. Then re-read, very carefully:
- Section 8 (architecture — nginx, TLS, horizontal scaling specifics)
- Section 10.2 (coverage matrix — find any gap and close it)
- Section 10.4 (load tests — EVERY number here is a pass criterion)
- Section 11 (risks R01–R15 — each must have a verified mitigation in this sprint)

DO NOT add new features. Sprint 7 is purely about making what exists correct, fast, observable, and deployable.

═════════════════════════════════════════════════
BRANCH: perf/sprint-7-load-and-cache
═════════════════════════════════════════════════


CACHING (Redis):
- Auction detail GET /api/auctions/:id → cache for 10s. Invalidate on bid placement, status change, update. Key: `cache:auction:{id}`.
- Category list → cache 5 min.
- Reports → already cached in Sprint 6.

CACHE INVALIDATION:
- BidService emits a cache-bust on every commit: `redis.del('cache:auction:' + auctionId)`.
- AuctionService does the same on status transitions.

QUERY OPTIMISATION:
- Run EXPLAIN ANALYZE on the 10 slowest queries from production-like load. Add indexes where scans > 10k rows.
- Expected new indexes:
  - Bid (auction_id, amount DESC, created_at ASC) — for ranking engine
  - AuditLog (actor_user_id, created_at DESC)
  - Notification (user_id, read_at, created_at DESC)

LOAD TESTS (plan 10.4 — every number is a pass criterion):

Use k6. Scripts in `tools/loadtest/`:

1. `bid-concurrency.k6.js`: 200 concurrent bidders on a single FORWARD auction placing bids for 60 seconds. PASS CRITERION: p95 bid acceptance latency < 1s, zero duplicate winners, zero lost bids.
2. `simultaneous-auctions.k6.js`: 50 OPEN auctions running concurrently, 20 bidders each distributed randomly. Duration 5 minutes. PASS: all auctions close correctly, no job queue backlog > 30s.
3. `dutch-concurrency.k6.js`: 100 users racing to accept a Dutch auction at the same price. PASS: exactly one winner, p95 response < 500ms.
4. `bid-burst.k6.js`: 100 bids in 10 seconds on one auction. PASS: pipeline handles without errors or dropped connections.
5. `listing-page.k6.js`: listing page with 500 auctions matched by filter, p95 < 2s.
6. `reconnect-storm.k6.js`: 500 Socket.IO clients disconnect and reconnect within 5s. PASS: all re-attach to rooms, no server OOM.

HORIZONTAL SCALING TEST:
Bring up 2 API instances, 2 Socket.IO instances, 1 Redis, 1 Postgres via docker-compose.scale.yml. Confirm:
- Socket.IO Redis adapter fan-outs events across instances.
- Session cookies + refresh tokens work regardless of which API instance serves the request.
- Distributed lock serialises bids across API instances.

Load test 1 must pass under this 2+2 configuration.

FAILED TESTS = SPRINT NOT DONE. Tune (indexes, connection pools, lock TTLs) until they pass.
```

### Definition of Done

Every requirement in the task block above is implemented, tested, reviewed, and merged to `develop`. All listed tests pass. No feature outside the stated scope of this branch is added.

---

# SPRINT 30 — Observability (Logging, Metrics, Health)

> **Branch:** `chore/sprint-7-observability`
>
> **Legacy group:** this is one slice of what `plan_v4.md` Section 9 called **Sprint 7**. In this prompts.md that group has been split so each branch is its own sprint. **Inside the prompt body below, any reference to "Sprint N" means the original `plan_v4.md` Section 9 grouping, not a sprint number in this file.**

**Sprint goal (quoted from `plan_v4.md` Section 9):** _"System passes all functional tests across formats, concurrency tests, load tests, and security checks. Deployment pipeline and monitoring are in place. The product is ready to serve real users."_

### Execution Mode

**Linear, single branch.** Start only after the previous sprint has merged to `develop`. One branch, one PR, one Definition of Done. When this branch merges, move to the next sprint.

### Prompt

```
ROLE: You are a senior engineer.

────────────────────────────────────────────────────────
TASK BRIEF — ONLINE AUCTION SYSTEM, SPRINT 7
Security, Performance, Observability, Launch Readiness
────────────────────────────────────────────────────────

STEP ZERO

Read `plan_v4.md` end-to-end once more. Then re-read, very carefully:
- Section 8 (architecture — nginx, TLS, horizontal scaling specifics)
- Section 10.2 (coverage matrix — find any gap and close it)
- Section 10.4 (load tests — EVERY number here is a pass criterion)
- Section 11 (risks R01–R15 — each must have a verified mitigation in this sprint)

DO NOT add new features. Sprint 7 is purely about making what exists correct, fast, observable, and deployable.

═════════════════════════════════════════════════
BRANCH: chore/sprint-7-observability
═════════════════════════════════════════════════


LOGGING:
- Structured JSON logs via pino. Fields: timestamp, level, service, request_id, user_id (if auth), latency_ms, message.
- No PII: never log email, name, password, proxy bid amount, JWT contents.
- Log levels: trace (off in prod), debug (off in prod), info (business events), warn, error, fatal.

METRICS:
- Prometheus `/metrics` endpoint on each service.
- Key metrics:
  - http_requests_total{route, status}
  - http_request_duration_seconds histogram
  - bid_placements_total{result}  (ACCEPTED, REJECTED_RESERVE, REJECTED_INCREMENT, etc.)
  - socket_connections_current
  - bull_job_duration_seconds{queue, result}
  - db_pool_connections_active

ERROR TRACKING:
- Sentry SDK integration in API, worker, and web. DSN from env.
- Source-map upload in CI so stack traces are readable.

HEALTH CHECKS:
- GET /health: returns 200 if process alive.
- GET /ready: returns 200 only if DB reachable, Redis reachable, Bull queue accepting jobs. Used by load balancer.

EMAIL FALLBACK VERIFICATION (plan 6.9):
- Integration test: disconnect Socket.IO, place a bid that out-bids user X, wait 5 minutes, confirm email was sent (use a mock transport that records).
```

### Definition of Done

Every requirement in the task block above is implemented, tested, reviewed, and merged to `develop`. All listed tests pass. No feature outside the stated scope of this branch is added.

---

# SPRINT 31 — Docs, Deployment & Runbook

> **Branch:** `chore/sprint-7-docs-and-deploy`
>
> **Legacy group:** this is one slice of what `plan_v4.md` Section 9 called **Sprint 7**. In this prompts.md that group has been split so each branch is its own sprint. **Inside the prompt body below, any reference to "Sprint N" means the original `plan_v4.md` Section 9 grouping, not a sprint number in this file.**

**Sprint goal (quoted from `plan_v4.md` Section 9):** _"System passes all functional tests across formats, concurrency tests, load tests, and security checks. Deployment pipeline and monitoring are in place. The product is ready to serve real users."_

### Execution Mode

**Linear, single branch.** Start only after the previous sprint has merged to `develop`. One branch, one PR, one Definition of Done. When this branch merges, move to the next sprint.

### Prompt

```
ROLE: You are a senior engineer.

────────────────────────────────────────────────────────
TASK BRIEF — ONLINE AUCTION SYSTEM, SPRINT 7
Security, Performance, Observability, Launch Readiness
────────────────────────────────────────────────────────

STEP ZERO

Read `plan_v4.md` end-to-end once more. Then re-read, very carefully:
- Section 8 (architecture — nginx, TLS, horizontal scaling specifics)
- Section 10.2 (coverage matrix — find any gap and close it)
- Section 10.4 (load tests — EVERY number here is a pass criterion)
- Section 11 (risks R01–R15 — each must have a verified mitigation in this sprint)

DO NOT add new features. Sprint 7 is purely about making what exists correct, fast, observable, and deployable.

═════════════════════════════════════════════════
BRANCH: chore/sprint-7-docs-and-deploy
═════════════════════════════════════════════════


SWAGGER / OPENAPI:
- Finalise the OpenAPI 3 spec at `apps/api/openapi.yaml`. Every endpoint documented with full request/response schemas and example payloads.
- Serve `/api/docs` via swagger-ui-express in dev. In prod, static docs deployed alongside.

DEPLOYMENT:
- `docker-compose.prod.yml`: production-tuned compose (resource limits, restart: unless-stopped, volumes for Postgres data and Redis append-only).
- `.github/workflows/deploy.yml`: on push to `main`, build and push images to GHCR, then trigger deploy (placeholder script documenting what would happen — actual deploy target is out of scope for this project).
- `docs/RUNBOOK.md`: operational runbook covering:
  - How to roll back a deployment
  - How to inspect Bull queues (failed jobs, stuck jobs)
  - How to rotate the JWT RS256 keys
  - How to rotate the PROXY_BID_ENCRYPTION_KEY (requires ciphertext re-encryption migration)
  - How to investigate a "stuck" auction (auction-close job didn't fire)
  - How to escalate a suspected security incident

FINAL REGRESSION TEST PLAN:
- `docs/TEST-PLAN.md` enumerating every test case from plan Section 10.2 with pass/fail status.
- Playwright E2E suite covers: register → verify → login → create each of 4 auctions → bid on each → win → review. This one suite is the launch smoke test.

SEED DATA:
- `tools/seed/production-seed.ts` creates the test accounts listed in plan Section 10.3 (one Platform Admin, two University Admins for two seeded tenants, and ~20 buyer+seller test users across both tenants with diverse rating histories). Safe to run against a fresh DB only (refuses if User table non-empty).

═════════════════════════════════════════════════════════
RISK REGISTER VERIFICATION (plan Section 11)
═════════════════════════════════════════════════════════

Produce a final table in `docs/RISKS.md` with every R01–R15 from plan Section 11 and:
- The implementation that mitigates it (module + file + line)
- The test that proves the mitigation works (test file + test name)
- Residual risk accepted (if any) with owner sign-off

This table is the single most important launch artifact. No risk may remain unmitigated or untested without explicit written acceptance.

DEFINITION OF DONE

All load test pass criteria met. All security scans clean. OpenAPI documentation complete. Runbook written. Risk register fully mitigated. A production-ready deployment.
```

### Definition of Done (Sprint 7)

Matches `plan_v4.md` Section 9 Sprint 7 DoD: _"All functional, concurrency, load, and security tests pass. Deployment pipeline ready. Monitoring in place. System is production-ready."_

---

## Appendix A — Glossary Quick-Reference

Mirrors `plan_v4.md` Section 13. Agents should treat this as authoritative terminology; any mismatch, defer to Section 13.

| Term                    | Meaning (this project only)                                                        |
| ----------------------- | ---------------------------------------------------------------------------------- |
| Forward auction         | Ascending price, highest valid bid wins. Plan 5.1.                                 |
| Reverse auction         | Descending price, lowest valid bid wins (buyer posts a ceiling). Plan 5.2.         |
| Sealed bid              | One bid per user, hidden until close. Plan 5.3.                                    |
| Dutch auction           | Price decreases over time by fixed ticks; first to accept wins. Plan 5.4.          |
| Anti-snipe              | End-time extension triggered by bids near close. Plan 6.4.                         |
| Proxy bid               | User's hidden max; system auto-bids on their behalf up to it. Plan 6.3.            |
| Tenant                  | A university (multi-tenancy unit). Plan 3.4.                                       |
| Platform Admin          | Global admin. Plan 3.5.                                                            |
| University Admin        | Tenant-scoped admin. Plan 3.5.                                                     |
| PUBLIC / UNIV / PRIVATE | Visibility levels. Plan 4.                                                         |
| Ranking engine          | Pure function that decides bid outcome (accepted / outranked / invalid). Plan 6.1. |
| Distributed lock        | Redis SETNX lock on `auction:{id}:bid`. Plan 6.1 + R02.                            |
| Audit log               | Immutable record of admin + sensitive user actions. Plan 6.6.                      |

---

## Appendix B — Risk-to-Sprint Mitigation Matrix

Each risk from `plan_v4.md` Section 11 is addressed in the sprint shown. Any agent implementing a sprint MUST verify its listed risks at DoD time.

| Risk | Description (paraphrase)                               | Addressed in                            | Verification                                                           |
| ---- | ------------------------------------------------------ | --------------------------------------- | ---------------------------------------------------------------------- |
| R01  | Race conditions on concurrent bids                     | Sprint 2, Branch 3                      | Distributed lock + SERIALIZABLE tx + load test `bid-concurrency.k6.js` |
| R02  | Double-accept on Dutch                                 | Sprint 4, Branch 3                      | Redis lock on accept + load test `dutch-concurrency.k6.js`             |
| R03  | Anti-snipe misconfiguration causing runaway extensions | Sprint 2, Branch 3                      | `max_extensions` cap enforced; unit test `antiSnipe.spec.ts`           |
| R04  | Session hijack / token theft                           | Sprint 1                                | httpOnly cookies, refresh rotation with SHA-256 hash                   |
| R05  | Proxy max leak                                         | Sprint 5, Branch 2                      | AES-256-GCM at rest, never exposed over wire                           |
| R06  | Sealed bid information leak                            | Sprint 4, Branch 2 + Cross-cutting E2E  | 403 on GET bids during OPEN + no socket emission                       |
| R07  | Private auction discoverability leak                   | Sprint 3, Branch 3                      | Excluded from GET /auctions; Sprint 5 search also excludes             |
| R08  | Socket.IO auth bypass                                  | Sprint 3, Branch 2                      | JWT verification in connect middleware                                 |
| R09  | Dutch worker crash mid-auction                         | Sprint 4, Branch 3                      | Fast-forward recovery on worker restart                                |
| R10  | Email delivery failure                                 | Sprint 3, Branch 4 + Sprint 7, Branch 3 | Bull fallback after 5 min + observability                              |
| R11  | Notification spam                                      | Sprint 3, Branch 4                      | Coalesce + per-user per-auction dedup window                           |
| R12  | Malicious image upload                                 | Sprint 2, Branch 4                      | MIME sniffing + sharp reprocess + size cap                             |
| R13  | Rate-limit circumvention                               | Sprint 7, Branch 1                      | IP + user_id composite keys                                            |
| R14  | Search index staleness                                 | Sprint 5, Branch 3                      | Documented + served_at timestamp; acceptable in MVP                    |
| R15  | Admin privilege escalation                             | Sprint 6, Branch 1                      | Tenant-scoping middleware + 403 OUT_OF_SCOPE tests                     |

---

## Appendix C — Test Coverage Matrix

> **Note on sprint numbering below:** the S0..S7 labels in this coverage matrix refer to the _original_ sprint groupings from `plan_v4.md` Section 9. In this prompts.md each original sprint has been split into single-branch sprints; see the Linear Execution Map in Section 0.3 for the new numbering. The coverage commitment is unchanged.

Reproduced at a high level from `plan_v4.md` Section 10.2. Each cell names the sprint that must land the test.

| Area                   | Unit | Integration | E2E | Load |
| ---------------------- | ---- | ----------- | --- | ---- |
| Auth & Sessions        | S1   | S1          | S7  | S7   |
| Auction state machine  | S2   | S2          | S2  | —    |
| Bid pipeline (Forward) | S2   | S2          | S2  | S7   |
| Reverse auction        | S4   | S4          | S4  | —    |
| Sealed bid             | S4   | S4          | S4  | —    |
| Dutch auction          | S4   | S4          | S4  | S7   |
| Anti-snipe             | S2   | S2          | S2  | —    |
| Proxy bidding          | S5   | S5          | S5  | S7   |
| Realtime (Socket.IO)   | S3   | S3          | S3  | S7   |
| Private auctions       | S3   | S3          | S3  | —    |
| Search & filters       | S5   | S5          | S5  | S7   |
| Reviews                | S5   | S5          | S5  | —    |
| Suspensions cascade    | S6   | S6          | S6  | —    |
| Account deletion       | S6   | S6          | S6  | —    |
| Admin scoping          | S6   | S6          | S6  | —    |
| Email fallback         | S3   | S3          | S7  | —    |

---

## Appendix D — Agent Sanity Checklist (every PR must pass)

Any agent opening a pull request MUST confirm, in the PR description:

1. I re-read `plan_v4.md` end-to-end before writing code in this PR.
2. Every feature claimed in this PR traces to a specific section in `plan_v4.md` (section numbers listed).
3. I introduced no feature NOT in `plan_v4.md`.
4. I introduced no dependency not listed in the existing package.json without justifying it in the PR body.
5. TypeScript strict mode passes with zero errors (`pnpm -r typecheck`).
6. Linter passes with zero errors (`pnpm -r lint`).
7. All new and existing unit tests pass (`pnpm -r test`).
8. All new endpoints are documented in `openapi.yaml` (or a follow-up chore issue is linked).
9. No secrets, keys, or PII committed.
10. Migration files (if any) are reversible and tested against a seeded DB.
11. The branch is rebased on the latest target branch; there are no merge commits.
12. The PR body lists every file changed and why, grouped by module.

If any box is unchecked, the PR is not ready for review.

---

**End of `prompts.md`. Thirty-two sprints, thirty-two branches, one complete system. Build with precision, one sprint at a time.**
