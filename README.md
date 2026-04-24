# Online Auction System for Students

Production-grade modular monolith scaffold for a real-time student auction platform.

## Prerequisites

- Node.js 20
- Docker Desktop
- pnpm preferred, npm only if pnpm is unavailable

## Quickstart

```bash
cp .env.example .env && docker compose -f docker/docker-compose.yml up -d postgres redis && pnpm dev
```

## Architecture

```text
PRESENTATION LAYER
  Express routes (REST API)
  Socket.IO handlers
  Input validation
  Next.js pages (SSR + CSR)
  Zod schema validation

APPLICATION LAYER
  Use-case services: AuctionService, BidService, NotificationService
  Orchestrates domain logic + infrastructure calls

DOMAIN LAYER
  AuctionStateMachine
  BidValidationStrategy (4 implementations)
  ProxyBiddingEngine
  AntiSnipeService
  RankingEngine
  Pure TypeScript - zero framework or DB dependencies

INFRASTRUCTURE LAYER
  Prisma (PostgreSQL)
  Redis client
  Bull queues
  File storage client (TBD)
  Nodemailer
  Socket.IO adapter
```

## Module Map

| Module      | Owns                                                                                 | Depends On                                  |
| ----------- | ------------------------------------------------------------------------------------ | ------------------------------------------- |
| MOD-AUTH    | Registration, login, JWT, email verification, password reset                         | MOD-USER (create user record), MOD-EMAIL    |
| MOD-USER    | User profiles, roles, public lookup                                                  | -                                           |
| MOD-TENANT  | University onboarding, domain matching, tenant-scoped queries                        | MOD-USER                                    |
| MOD-AUCTION | Auction CRUD, lifecycle state machine, scheduling, visibility, invites, access codes | MOD-USER, MOD-TENANT, MOD-NOTIFY, MOD-AUDIT |
| MOD-BID     | Bid submission pipeline, validation, ranking, proxy bidding, anti-sniping            | MOD-AUCTION, MOD-NOTIFY, MOD-AUDIT          |
| MOD-DUTCH   | Dutch price timer, decrement scheduling, floor detection                             | MOD-AUCTION, MOD-NOTIFY, MOD-AUDIT          |
| MOD-NOTIFY  | Notification creation, persistence, real-time push, email fallback                   | MOD-USER, MOD-EMAIL                         |
| MOD-SEARCH  | Full-text search, filters, sort                                                      | MOD-AUCTION (read-only)                     |
| MOD-REVIEW  | Post-auction reviews, rating aggregation, review moderation                          | MOD-AUCTION, MOD-USER                       |
| MOD-AUDIT   | Append-only logging within the same DB transaction                                   | - (depended on by all)                      |
| MOD-ADMIN   | Admin dashboards, moderation actions, reports                                        | All modules (read + controlled writes)      |

## Technology Decisions

- Bull 4.x is retained for the queue layer, per `plan_v4.md`.

## Documentation

- [Product Spec: `plan_v4.md`](./plan_v4.md)
- [Sprint Prompts: `prompts.md`](./prompts.md)
