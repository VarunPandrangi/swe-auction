# Online Auction System for Students

A real-time, multi-university auction marketplace for students.

## Prerequisites

- Node.js 20+
- Docker Desktop
- npm (using npm workspaces)

## Quickstart

1. Clone the repo
2. `cp .env.example .env`
3. `npm install`
4. `docker compose -f docker/docker-compose.yml up -d postgres redis`
5. `npm run dev`

## Architecture

(Text-based diagram as per Section 8.2 of plan_v4.md)

PRESENTATION LAYER: Express routes, Socket.IO, Next.js
APPLICATION LAYER: Use-case services (AuctionService, etc.)
DOMAIN LAYER: AuctionStateMachine, BidValidationStrategy
INFRASTRUCTURE LAYER: Prisma, Redis, Bull, Nodemailer

## Technology Decisions

- **Bull 4.x**: Sticking with Bull 4.x instead of BullMQ as specified in `plan_v4.md`.

## Module Map

| Module      | Owns                                                                                 | Depends On                                  |
| ----------- | ------------------------------------------------------------------------------------ | ------------------------------------------- |
| MOD-AUTH    | Registration, login, JWT, email verification, password reset                         | MOD-USER (create user record), MOD-EMAIL    |
| MOD-USER    | User profiles, roles, public lookup                                                  | —                                           |
| MOD-TENANT  | University onboarding, domain matching, tenant-scoped queries                        | MOD-USER                                    |
| MOD-AUCTION | Auction CRUD, lifecycle state machine, scheduling, visibility, invites, access codes | MOD-USER, MOD-TENANT, MOD-NOTIFY, MOD-AUDIT |
| MOD-BID     | Bid submission pipeline, validation, ranking, proxy bidding, anti-sniping            | MOD-AUCTION, MOD-NOTIFY, MOD-AUDIT          |
| MOD-DUTCH   | Dutch price timer, decrement scheduling, floor detection                             | MOD-AUCTION, MOD-NOTIFY, MOD-AUDIT          |
| MOD-NOTIFY  | Notification creation, persistence, real-time push, email fallback                   | MOD-USER, MOD-EMAIL                         |
| MOD-SEARCH  | Full-text search, filters, sort                                                      | MOD-AUCTION (read-only)                     |
| MOD-REVIEW  | Post-auction reviews, rating aggregation, review moderation                          | MOD-AUCTION, MOD-USER                       |
| MOD-AUDIT   | Append-only logging within the same DB transaction                                   | — (depended on by all)                      |
| MOD-ADMIN   | Admin dashboards, moderation actions, reports                                        | All modules (read + controlled writes)      |

## Documentation

- [Product Plan (plan_v4.md)](./plan_v4.md)
- [Sprint Prompts (prompts.md)](./prompts.md)
