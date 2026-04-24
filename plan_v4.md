# Online Auction System for Students
## Product Plan — Version 4.0
**Group 37 | 19th April 2026 | Living Document**

This document is the single source of truth for what we are building, why we are building it, who it is for, and how it will behave — including when things go wrong. It is written for every member of the team: engineers, designers, testers, and the project manager. Every decision recorded here has a reason.

---

## Table of Contents
1. Product Vision & Strategy
2. User Personas
3. User Stories
4. Auction Access Model
5. Auction Formats — Detailed Specification
6. Core Feature Specifications
7. Workflow & Edge Case Analysis
8. System Architecture
9. Agile Delivery Roadmap
10. Test Strategy
11. Risk Register
12. Explicitly Out of Scope
13. Glossary

---

## 1. Product Vision & Strategy

### 1.1 The Problem

Students constantly buy and sell things — textbooks between semesters, laptops before graduation, notes, gadgets, handmade goods, tutoring slots. The way this happens today is a mess: WhatsApp groups, Instagram stories, random notice boards, and one-sided negotiations. There is no price discovery, no fairness, no accountability, and no record of what happened.

### 1.2 The Solution

A real-time, multi-university auction marketplace where any student can list something, pick how they want to sell it, and let the market decide the price — transparently, fairly, and in real time.

Four auction formats. Honest ranking signals. Anti-sniping protection. A reputation system built on verified outcomes. Search across universities or within your own.

### 1.3 What Makes This Different

Most student marketplaces are classified ad boards with a chat button. This is not that. This is a live, competitive, rule-enforced auction environment — the kind of engine that drives eBay, Trademe, and procurement systems — but designed specifically for students, with formats that actually make sense for what students buy and sell.

### 1.4 Strategic Goals (in order of priority)

1. **Correctness** — Every auction produces the right winner. Every bid is recorded. No race conditions.
2. **Fairness** — Anti-sniping, anonymity, and proxy bidding create a level playing field.
3. **Real-Time Feel** — Bids feel live. Updates in under 1 second.
4. **Trust** — Verified accounts, audit logs, and reviews create accountability.
5. **Discoverability** — Students can find auctions easily — by search, by university, by format, or by a shared code.
6. **Simplicity** — Creating an auction takes under 3 minutes. Placing a bid takes two clicks.

---

## 2. User Personas

**Persona 1: Riya — The Seller**
Third-year engineering student. Moving off-campus next month. Has a semester's worth of textbooks, a monitor, and a standing desk she no longer needs.
- Wants to get a fair price — not just dump things on OLX for whatever someone offers
- Doesn't have time to negotiate with 20 people individually
- Wants to list once, let people compete, and ship to the winner
- Cares about the buyer being legitimate (not a ghost account)

**Persona 2: Aditya — The Casual Bidder**
Second-year student looking for a cheap laptop for his internship. Checks the platform a few times a day.
- Wants to find good deals before they're gone
- Doesn't want to babysit an auction — would set a max price and let the system bid for him
- Gets frustrated when someone snipes an auction at the last second
- Wants to know roughly if he's winning or not — not the exact number, just: am I ahead?

**Persona 3: Priya — The Power Bidder**
Final-year student. Actively bids on 4–5 auctions a week. Has developed a strategy around sealed bids.
- Knows exactly how much she'll pay for something and doesn't reveal it until she has to
- Uses sealed bid auctions specifically to avoid being played
- Wants a clean history of what she's bid on, won, and lost
- Cares deeply about the review system — won't buy from a seller with bad ratings

**Persona 4: Karan — The Service Provider**
Freelance student offering tutoring, resume editing, and graphic design.
- Uses the platform to offer services at competitive rates (reverse auction)
- Wants buyers to come to him with a need, and let him compete fairly for the job
- Needs the auction to expire so he doesn't get ghosted after quoting

**Persona 5: Dr. Meera — University Admin**
Student affairs coordinator at a partner university.
- Wants to ensure the platform is clean — no inappropriate listings, no banned users
- Needs basic moderation tools and a view of activity within her university
- Does not need to understand auction mechanics in detail

**Persona 6: Platform Admin (Internal)**
The team operating the platform.
- Onboards new universities
- Handles abuse reports escalated by university admins
- Monitors system health and activity
- Has override ability on any entity

---

## 3. User Stories

### 3.1 Registration and Identity

| ID | As a… | I want to… | So that… |
|----|-------|-----------|---------|
| US01 | Visitor | Register with any email address | I can join the platform |
| US02 | New user | Verify my email before bidding or selling | The platform knows I am a real person |
| US03 | Student | Be automatically affiliated to my university if my email domain matches | I see my university's auctions by default |
| US04 | Student | Optionally add my university if not auto-detected | I can join a university community manually |
| US05 | Returning user | Log in securely and stay logged in across sessions | I don't have to log in every visit |
| US06 | User | Reset my password via email | I can recover my account |
| US07 | User | Update my display name and profile picture | My profile looks legitimate to other users |
| US08 | User | View another user's public profile, rating, and auction history | I can decide whether to trust them before bidding |

### 3.2 Creating and Managing Auctions

| ID | As a… | I want to… | So that… |
|----|-------|-----------|---------|
| US09 | Seller | Create an auction in draft before publishing | I can review it before it goes live |
| US10 | Seller | Choose from four auction formats | I can pick the right format for what I'm selling |
| US11 | Seller | Upload multiple photos of my item | Bidders can see exactly what they're getting |
| US12 | Seller | Set a reserve price (hidden from bidders) | I'm protected from selling too low |
| US13 | Seller | Set the auction's visibility (public, university-only, or private invite-only) | I can control who participates |
| US14 | Seller | Invite specific users to a private auction by username or email | I can run an invitation-only sale |
| US15 | Seller | Share a unique auction code so others can join directly | Buyers can join without searching |
| US16 | Seller | Cancel an auction while it is still in DRAFT or PUBLISHED state | I can back out before bidding starts |
| US17 | Seller | Not be allowed to cancel an auction once bidding has started | Bidders can trust that open auctions stay open |
| US18 | Seller | See all bids on my auction in real time (anonymised) | I can monitor engagement |
| US19 | Seller | Be notified when my auction closes and who won | I know the outcome immediately |
| US20 | Seller | Review the buyer after the auction is awarded | I can give feedback on the transaction |

### 3.3 Bidding

| ID | As a… | I want to… | So that… |
|----|-------|-----------|---------|
| US21 | Bidder | Browse all public auctions and search by keyword, category, format, and price | I can find what I'm looking for |
| US22 | Bidder | Filter auctions by my university | I see relevant local listings first |
| US23 | Bidder | Join a private auction using its unique code | I can participate in invite-only auctions |
| US24 | Bidder | See the current price, time remaining, and item details before bidding | I can make an informed decision |
| US25 | Bidder | Place a bid with one click after entering an amount | The process is fast and frictionless |
| US26 | Bidder | Set a proxy (maximum) bid and let the system bid for me | I don't have to watch the screen constantly |
| US27 | Bidder | See a colour signal (green / yellow / red) showing whether I'm leading | I know my position without seeing others' amounts |
| US28 | Bidder | Be notified immediately if I'm outbid | I can decide whether to bid again |
| US29 | Bidder | Not be able to bid on my own auction | The system prevents self-dealing |
| US30 | Bidder | Not be able to bid on an auction I'm not invited to | Private auctions stay private |
| US31 | Bidder | Have my bid extended automatically if someone snipes at the last second | Late bids don't kill my chance |
| US32 | Bidder | Receive a confirmation that my bid was accepted or rejected (with reason) | I know the outcome of every bid attempt immediately |
| US33 | Bidder | View my own bid history on an auction I'm participating in | I can track my own bidding |
| US34 | Bidder | Review the seller after winning an auction | I can give feedback on the transaction |

### 3.4 Watchlist and Notifications

| ID | As a… | I want to… | So that… |
|----|-------|-----------|---------|
| US35 | User | Add any auction to my watchlist | I can track auctions I'm interested in |
| US36 | User | Receive a notification when a watchlisted auction opens | I don't miss the start |
| US37 | User | Receive a notification 15 minutes before a watchlisted auction closes | I can decide to place a final bid |
| US38 | User | Mark notifications as read individually or all at once | My notification inbox stays clean |
| US39 | User | See an unread notification count badge in the UI | I know when something needs my attention |

### 3.5 Administration

| ID | As a… | I want to… | So that… |
|----|-------|-----------|---------|
| US40 | Platform Admin | Onboard a new university with its email domain | Students from that university auto-affiliate |
| US41 | Platform Admin | Suspend any user account globally | I can respond to abuse reports |
| US42 | Platform Admin | View a full audit log across the entire platform | I can investigate any incident |
| US43 | University Admin | View and moderate auctions within my university | I can keep the community clean |
| US44 | University Admin | Suspend a user within my university | I can act on local reports |
| US45 | University Admin | View activity reports for my university | I can report back to my institution |

---

## 4. Auction Access Model

This is one of the most important design decisions in the product. Like a lobby in a multiplayer game, an auction needs a clear rule about who can enter.

### 4.1 Three Visibility Modes

**Mode A: Public**
- The auction is listed in search results for all users on the platform
- Any verified student can discover it and join without any invitation
- The default mode for most auctions

**Mode B: University-Restricted**
- The auction is visible only in search results for users affiliated with the seller's university
- Users from other universities cannot see or join it
- Useful for campus sales where physical pickup is required
- A student without a university affiliation cannot see university-restricted auctions from any university

**Mode C: Private (Invite-Only)**
- The auction does NOT appear in any search results
- Access is granted only through one of three mechanisms:
  1. **Direct invite by username or email** — the seller sends an invite from within the platform; the invitee receives a notification and an in-app join request
  2. **Unique auction code** — an 8-character alphanumeric code (e.g., `AUC-X7K2`) generated at creation; anyone with the code can join
  3. **Shareable link** — a tokenised URL that the seller can copy and share outside the platform (e.g., via WhatsApp); clicking the link and logging in grants access

### 4.2 Auction Code and Link Mechanics

- Every auction (regardless of visibility mode) gets a unique code and link at creation
- For Public and University-Restricted auctions, the code is just a convenient shortcut (not required for discovery)
- For Private auctions, the code and link are the primary access mechanism
- Codes are case-insensitive and human-readable
- Links expire if the auction is cancelled; they remain active until the auction is ARCHIVED
- The seller can view and copy their auction's code and link from the auction management page

### 4.3 Joining an Auction

```
User wants to participate in an auction
│
├── Knows the auction code or link?
│   │
│   ├── YES → Enter code on "Join by Code" page
│   │         or click the shared link
│   │         → Access granted (if verified account)
│   │
│   └── NO → Search for it
│             → Only Public and own-University auctions appear
│
└── Access granted → Land on Auction Detail page
                   → Can watch (unverified) or bid (verified)
```

### 4.4 Visibility Change Rules

- A seller can change visibility from Private → Public or University-Restricted before the auction reaches OPEN status
- Once the auction is OPEN, visibility is locked — you cannot retroactively restrict who can see a live auction
- Rationale: changing visibility mid-auction could confuse or exclude active participants

### 4.5 Invitation Management (Private Auctions)

- Invites can be sent before and during the PUBLISHED state, but not once OPEN
- An invited user can accept or decline; decline sends a notification to the seller
- If an invited user has not accepted by the time the auction opens, their invite expires
- The seller can see a list of all invitees and their status (Pending / Accepted / Declined)

---

## 5. Auction Formats — Detailed Specification

### 5.1 Forward Auction

**Summary:** Prices go up. Highest bid at close wins.

**Configuration (set by seller at creation):**

| Field | Required | Description |
|-------|----------|-------------|
| Starting Price | Yes | Lowest acceptable opening bid |
| Minimum Bid Increment | Yes | How much each new bid must exceed the last (e.g., ₹10) |
| Reserve Price | Optional | Hidden minimum — if not met, auction fails silently |
| Duration | Yes | Auction length (1 hour to 7 days) |
| Anti-Snipe Window | Yes | Minutes before end where a bid triggers extension (default: 3) |
| Anti-Snipe Extension | Yes | Minutes added per extension (default: 3, max extensions: 10) |

**Bid Validation Rules:**
- `amount >= current_price + increment_amount`
- Bidder is not the seller
- Auction status is OPEN or EXTENDED
- Bidder's account is verified
- Bidder is permitted (access mode check)

**Winner Determination:**
- Highest amount in bids table for this auction at closure
- If tied: earliest server_timestamp wins (no tie-breaking on client time)
- If highest bid < reserve_price: FAILED (reserve not revealed to anyone, ever)

**Edge Cases:**
- Seller sets increment to ₹0 or negative: Rejected at input validation; minimum increment is ₹1
- No bids placed: Auction closes to FAILED regardless of reserve
- Bidder's proxy max exactly equals current price: Proxy does not auto-bid; bidder is already leading at that amount

### 5.2 Reverse Auction

**Summary:** Price goes down. A seller (buyer) posts a need; bidders (service providers) compete to offer it at the lowest price.

**Configuration:**

| Field | Required | Description |
|-------|----------|-------------|
| Ceiling Price | Yes | Maximum the buyer will pay (opening price) |
| Minimum Decrement | Yes | How much each bid must undercut the last (e.g., ₹50) |
| Reserve Floor | Optional | Lowest acceptable price; if all bids are below it, auction fails |
| Duration | Yes | Auction length |
| Anti-Snipe | Yes | Same mechanism as Forward |

**Bid Validation Rules:**
- `amount <= current_price - decrement_amount`
- Bidder is not the auction creator
- Auction status is OPEN or EXTENDED
- Bidder is verified and permitted

**Winner Determination:**
- Lowest amount at closure
- Tie: earliest server_timestamp

**Edge Cases:**
- Bidder tries to submit amount equal to current price: Rejected — must be strictly lower by at least the decrement
- Seller (the buyer) has a budget constraint (reserve floor): If winning bid < floor, auction FAILS and the buyer is not obligated
- Bidder submits ₹0: Rejected at validation; minimum bid amount = ₹1

### 5.3 Sealed Bid Auction

**Summary:** One shot. No revisions. No signals. Bids revealed simultaneously at close.

**Configuration:**

| Field | Required | Description |
|-------|----------|-------------|
| Starting Price | Yes | Minimum acceptable bid |
| Reserve Price | Optional | Hidden minimum |
| Duration | Yes | Window during which bids can be submitted |

No Increment — Not applicable; any amount above starting price is valid.

**Bid Validation Rules:**
- One bid per bidder per auction (second attempt rejected: *"You have already submitted a bid for this auction"*)
- `amount >= starting_price`
- Bidder is not the seller
- Auction status is OPEN
- Bidder is verified and permitted

**Rank Signals:** None. During the auction, bidders see only: *"Your bid has been submitted."* No position indicator.

**At Close:**
- All bids revealed simultaneously: bidder names remain hidden in the public reveal; only the winner's username is shown
- Winner receives: *"You won with a bid of ₹X"*
- Non-winners receive: *"The auction closed. Winning bid: ₹X. Your bid: ₹Y."*

**Anti-Sniping:** Not applicable (no competitive real-time dynamics; one submission per user).

**Edge Cases:**
- User submits bid and then wants to retract: Retractions are not allowed for Sealed Bid auctions. This is a core rule of the format and is shown clearly in the UI before submission (*"Bids in Sealed Bid auctions cannot be revised or retracted"*)
- All bids are at exactly the same amount: Earliest server_timestamp wins. The UI shows the winner but does not explain the tie-breaking to others (to preserve sealed-bid integrity)
- Only one bid is submitted: That bidder wins, provided the bid meets the reserve
- No bids: Auction moves to FAILED

### 5.4 Dutch Auction

**Summary:** Price starts high and drops automatically. First bidder to accept wins immediately.

**Configuration:**

| Field | Required | Description |
|-------|----------|-------------|
| Starting Price | Yes | Initial (highest) price |
| Floor Price | Yes | Minimum price; auction fails if reached with no acceptance |
| Decrement Amount | Yes | How much price drops per tick (e.g., ₹25) |
| Decrement Interval | Yes | How often price drops (e.g., every 60 seconds) |
| Duration | Yes | Maximum auction window (failsafe; should be > time to reach floor) |

**Acceptance Validation:**
- Bidder accepts the current displayed price (no amount field — bidder just clicks Accept)
- Bidder is not the seller
- Auction status is OPEN
- Bidder is verified and permitted
- The server validates the price at the server-side tick, not the client-displayed price (race condition protection)

**At Acceptance:**
- Auction immediately transitions to CLOSED → AWARDED
- Dutch timer Bull job is cancelled
- All connected participants receive `dutch_accepted` WebSocket event with final price
- Other bidders who were watching see the auction as closed

**At Floor:**
- If floor price is reached and no acceptance has been made: CLOSED → FAILED
- All watching users are notified

**Anti-Sniping:** Not applicable (first-accept format; no "end time" to snipe).

**Edge Cases:**
- Two users click Accept at the exact same millisecond: Server-side lock (Redis SETNX) per auction ensures only one acceptance is processed. The second user receives: *"Sorry, this auction was just accepted by another bidder."*
- User sees ₹500 on screen but clicks Accept when price has already ticked to ₹475: The server has already moved to ₹475. The system accepts at ₹475 (the current server-side price) — which is better for the buyer. The winner confirmation shows the actual accepted price.
- Floor price equals starting price: Caught at creation validation; floor must be strictly less than starting price
- Decrement interval is so long that duration expires before floor is reached: Auction closes to FAILED at end of duration, not at floor. UI makes this clear during configuration (*"At this rate, the price will reach the floor in X minutes — your auction duration covers Y minutes."*)
- Seller sets floor = ₹0: Rejected at validation; floor minimum = ₹1

---

## 6. Core Feature Specifications

### 6.1 The Bid Submission Flow (with all edge cases)

Every bid submission — regardless of format — goes through this exact pipeline:

```
1. CLIENT sends bid request (POST /api/v1/auctions/:id/bids)
│
2. AUTH MIDDLEWARE
│   ├── Token missing or expired → 401 Unauthorized
│   └── Token valid → continue
│
3. RBAC MIDDLEWARE
│   ├── User is unverified → 403 "Please verify your email before bidding"
│   └── User is verified → continue
│
4. ACCESS CONTROL CHECK
│   ├── Auction is private and user not invited → 403 "You do not have access to this auction"
│   └── Access granted → continue
│
5. AUCTION STATE CHECK
│   ├── Status not in [OPEN, EXTENDED] → 400 "This auction is not currently accepting bids"
│   └── Status valid → continue
│
6. SELF-BID CHECK
│   ├── bidder_id == auction.seller_id → 400 "You cannot bid on your own auction"
│   └── Not same → continue
│
7. FORMAT-SPECIFIC VALIDATION (Strategy pattern per auction_type)
│   ├── Amount invalid for format → 400 with specific reason
│   └── Amount valid → continue
│
8. ACQUIRE DISTRIBUTED LOCK (Redis SETNX: lock:auction:{id})
│   ├── Lock not acquired within 500ms → 503 "Please try again — another bid is being processed"
│   └── Lock acquired → continue
│
9. POSTGRESQL TRANSACTION
│   ├── INSERT bid record (server_timestamp = NOW())
│   ├── UPDATE auction.current_price
│   ├── RECALCULATE rankings
│   ├── APPEND to audit_log
│   └── COMMIT
│
10. RELEASE LOCK
│
11. ANTI-SNIPE CHECK (async, non-blocking)
│
12. PROXY BID CHECK (async — may trigger recursive bid for other users)
│
13. EMIT WebSocket events to auction room and personal channels
│
14. QUEUE outbid notifications for displaced bidders (Bull job)
│
15. RETURN 201 Created with bid confirmation to original requester
```

**What the bidder sees:**
- Success: Green toast — *"Bid of ₹X placed successfully"* + rank signal update
- Rejected: Red toast — *"Bid rejected: [specific reason]"*
- Concurrent conflict: Yellow toast — *"Please try again — another bid is being processed"*

### 6.2 Real-Time Bidding Experience

**WebSocket Room Architecture:**
- Every auction has one Socket.IO room: `auction:{auctionId}`
- Every user has one personal room: `user:{userId}`
- A user who opens an auction detail page is auto-joined to the auction room (no explicit action needed)
- A user who navigates away is removed from the room

**What everyone in the auction room sees:**
```
new_high_bid → { newPrice, previousPrice, timestamp }
```
No bidder identity. No bid count.

**What each individual bidder sees (personal room):**
```
rank_signal  → { signal: "green" | "yellow" | "red" }
bid_accepted → { bidId, amount, timestamp }
outbid       → { auctionId, newPrice, yourLastBid }
```

**What the seller sees (in addition to room events):**
```
bid_on_your_auction → { newPrice, bidCount, timeRemaining }
```
Still no bidder identity.

**Reconnection Behaviour:**
If a user's WebSocket disconnects (network drop, tab close and reopen), on reconnect the client automatically:
1. Re-joins the auction room
2. Fetches current auction state via REST (`GET /api/v1/auctions/:id`)
3. Fetches own bid status via REST (`GET /api/v1/auctions/:id/bids/mine`)
4. Re-renders the UI with up-to-date information

Any events missed during disconnection are not replayed (REST fetch covers the gap).

### 6.3 Proxy Bidding — Detailed Specification

**Setup:**
- When placing a bid, a bidder may optionally enter a proxy maximum in addition to their opening bid
- The proxy max must be ≥ their current bid amount + one increment
- The proxy max is stored encrypted in the database and never returned in any API response

**Execution:**
```
Bidder A sets proxy max = ₹500, increment = ₹10
System places minimum valid bid (e.g., ₹100) on A's behalf

Bidder B places ₹150:
→ System checks: A's proxy max (₹500) > ₹150 + ₹10 = ₹160?
→ YES → System auto-bids ₹160 for A
→ Bidder B is notified: "You have been outbid"

Bidder C places ₹490:
→ System checks: A's proxy max (₹500) > ₹490 + ₹10 = ₹500?
→ Equal (not strictly greater) → System auto-bids ₹500 for A (the max)

Bidder D places ₹500:
→ System checks: A's proxy max (₹500) > ₹500 + ₹10 = ₹510?
→ NO → A's proxy is exhausted
→ A is notified: "Your proxy bid has been exceeded. The current price is ₹500."
→ D is now the leader
```

**Proxy Bid Tie (two users with same proxy max):**
The bidder whose proxy was active first wins the tie (earlier timestamp in proxy_bids table). Neither bidder is told the other's proxy amount, ever.

**Can a bidder update their proxy max?**
Yes — a bidder who already has an active proxy can increase their proxy max (not decrease it). Decreasing is not allowed (to prevent gaming: set high to block others, then lower).

**Proxy Bidding in Reverse Auctions:**
Same logic, but inverted: proxy minimum replaces proxy maximum. The system auto-bids downward on the user's behalf down to their proxy floor.

### 6.4 Anti-Sniping — Detailed Specification

**Trigger condition:**
```
bid.server_timestamp > (auction.end_time - anti_snipe_window_minutes)
AND auction.extension_count < auction.max_extensions
```

**On trigger:**
1. `new_end_time = auction.end_time + anti_snipe_extension_minutes`
2. `extension_count++`
3. Reschedule the Bull auction-close job to `new_end_time`
4. Emit `auction_extended` to all users in the auction room: `{ newEndTime, extensionNumber, maxExtensions }`
5. Write to audit_log: `AUCTION_EXTENDED`

**When max extensions is reached:**
- The anti-snipe check is skipped for all subsequent bids
- The auction will close at the final extended time regardless of late bids
- All users in the room are notified: *"This auction has reached its maximum number of extensions and will close at [time] regardless of new bids."*

**What users see:**
- A countdown timer in the UI reflects the new end time immediately
- A banner: *"Auction extended — a bid was placed in the final minutes. New close time: [time]"*

### 6.5 Seller Cannot Cancel an Open Auction

- Once an auction moves to OPEN status, the seller loses the ability to cancel
- Rationale: Bidders may have placed bids in good faith; cancellation after bidding starts causes harm
- The cancel button is hidden (not just disabled) once the auction is OPEN
- If a genuine emergency arises, a Platform Admin can force-cancel with a reason that is logged and communicated to all bidders
- Force-cancellation notifies all bidders: *"This auction was cancelled by platform administration. Any bids placed have been voided."*

### 6.6 Reserve Price — Behaviour and UX

- Reserve price is optional and set at auction creation
- It is NEVER shown to any bidder at any point
- The UI shows: *"Reserve: Not Yet Met"* or *"Reserve: Met"* — no amounts
- For Sealed Bid: the reserve status is not shown during the auction at all (to preserve blind format)
- At closure, if reserve is not met: FAILED. The failure notification to bidders reads: *"This auction failed to meet the seller's reserve price."* The reserve amount is still not shown.
- After FAILED status, the seller can see how close the highest bid was to the reserve (for their own planning) — no one else can

### 6.7 Ratings and Reviews — Detailed Specification

**Eligibility:**
- Only the confirmed winner can review the seller
- Only the seller can review the winner
- Reviews are unlocked 1 hour after AWARDED status (grace period to arrange transaction details)
- Reviews are permanently locked 30 days after AWARDED status (review window closes)

**Review Content:**
- Rating: 1–5 stars (mandatory)
- Comment: up to 500 characters (optional)
- No editing after submission
- No deletion by users (only Platform Admins can remove reviews that violate community guidelines)

**Display:**
- Average star rating shown on public profile (rounded to 1 decimal place)
- Total review count shown alongside rating
- Recent reviews listed on profile (newest first, paginated)
- Reviews are anonymous about the auction — the review shows "Transaction in [Category]" not the item name, for privacy

**Abuse Prevention:**
- Reviews flagged by a user go into a review queue visible to University Admins and Platform Admins
- Platform Admin can remove a review with a reason (logged in audit trail)
- A user whose review is removed is notified

**New User with No Reviews:**
- Profile shows: *"No reviews yet"* + a note: *"This user has completed X auctions"*
- Completed auction count builds credibility before reviews accumulate

### 6.8 Search and Discovery

**Search Index:**
PostgreSQL full-text search on: title, description, category (GIN index on tsvector). Indexed fields updated synchronously on auction creation/edit.

**Filter Parameters:**

| Filter | Type | Values |
|--------|------|--------|
| keyword | string | Free text search |
| category | enum | textbooks, electronics, services, collectibles, clothing, furniture, sports, other |
| format | enum | forward, reverse, sealed_bid, dutch |
| status | enum | published (not yet open), open, closed |
| min_price | decimal | Current price ≥ value |
| max_price | decimal | Current price ≤ value |
| university | uuid | Filter to a specific tenant |
| closing_soon | boolean | Auctions closing in next 2 hours |

**Sort Options:** Ending soonest, Newest listed, Price low→high, Price high→low, Most active (by bid count)

**Pagination:** 20 results per page, cursor-based for consistent results during live updates

**Edge Cases:**
- Search returns no results: Show an empty state with suggestions (check spelling, try broader terms) — not a blank screen
- An auction in search results is won or cancelled while the user is browsing: The status badge updates in real time via WebSocket; the user does not navigate to a dead auction
- A new auction is published while search results are showing: A "New auctions available — refresh results" banner appears non-intrusively at the top of results

### 6.9 Notifications System

**Delivery Channels (in order of priority):**
1. In-app real-time (WebSocket to personal room) — instant
2. In-app persisted (stored in notifications table, visible in notification inbox) — permanent record
3. Email (for high-priority events when the user is offline) — sent via Bull job 5 minutes after the event if the notification has not been read in-app

**Email sent for:**
- Auction won
- Auction failed (as seller)
- Account suspended
- Email verification / password reset

**Email NOT sent for:**
- Outbid (too frequent; only in-app)
- Watchlist updates (too frequent)
- Bid confirmations

**Notification Inbox:**
- Shows unread count badge in the top navigation
- Clicking a notification navigates to the relevant auction
- Read/unread state synced across devices via database (not local state)

---

## 7. Workflow and Edge Case Analysis

### 7.1 What Happens to Active Bids if a User Account is Suspended?

When a Platform Admin or University Admin suspends a user:

**If the suspended user is a bidder:**
- Their bids remain recorded in the system (audit integrity)
- They are removed from the current ranking
- The next-ranked bidder becomes the new leader
- The auction room receives a `ranking_update` event (no mention of suspension)
- If the suspended bidder was using proxy bidding, the proxy is cancelled
- Their rank signal goes to null (they cannot see the auction if suspended)

**If the suspended user is a seller:**
- If the auction is in DRAFT or PUBLISHED: auction is moved to CANCELLED automatically
- If the auction is OPEN or EXTENDED: Platform Admin must explicitly decide — cancel (with notification to all bidders) or allow it to complete (winner is determined normally; a suspended seller who completes a transaction may be unsuspended to allow post-sale communication)
- University Admins cannot suspend sellers with active open auctions — they must escalate to Platform Admin

### 7.2 What Happens if the Highest Bidder Wins but Does Not Follow Through?

The system handles auction outcome but not payment or physical delivery — that is between the buyer and seller. However:
- 30 days after AWARDED, if either party submits a dispute report, Platform Admin reviews it
- Both parties are required to have left a review within 30 days (review window is also a signal of completion)
- A seller who consistently reports non-completing winners can flag those users; Platform Admin decides on action
- This is the trust layer motivation for the review system

### 7.3 What Happens if a User Has Multiple Tabs Open on the Same Auction?

- Each tab maintains its own WebSocket connection
- Both tabs receive bid events and update independently
- If the user places a bid from Tab A and the bid succeeds, Tab B also receives the confirmation via the personal room WebSocket
- If the user tries to place a bid from Tab B after Tab A's bid was accepted (e.g., slow network), the second bid is validated server-side and may be accepted as a valid higher bid, or rejected if it doesn't meet the new minimum — same as any other bid

### 7.4 What Happens if the Server Goes Down During an Active Auction?

- Bull jobs for auction scheduling are persisted in Redis — if the worker restarts, pending jobs are re-processed
- On restart, the scheduler reconciles: any auction whose scheduled close time has passed is closed immediately
- This means if the server is down for 10 minutes and an auction should have closed during that time, it closes as soon as the server restarts with the correct server timestamp
- Active bids are already in the database (committed before the crash) — they are not lost
- WebSocket connections are dropped on crash; clients detect the disconnection and enter a reconnect loop. When the server is back, they reconnect and re-fetch state as described in section 6.2

### 7.5 What Happens if a Bidder's Session Expires Mid-Auction?

- Their access token expires after 15 minutes
- The client automatically attempts to refresh using the refresh token (stored in httpOnly cookie)
- If the refresh succeeds, bidding continues transparently (user doesn't notice)
- If the refresh fails (refresh token expired or revoked), the user is redirected to the login page
- Any bid attempt made with an expired token returns 401; the client intercepts this before showing an error to the user and attempts refresh first

### 7.6 What Happens if Two Bidders Submit at the Exact Same Millisecond?

- The Redis distributed lock (SETNX) serialises access — only one bid is processed at a time per auction
- The second bidder waits up to 500ms for the lock
- If the lock is released within 500ms: the second bid is processed against the updated price (may now fail validation if it no longer meets the increment requirement)
- If the lock is not released within 500ms: second bidder gets a soft error — *"Please try again — another bid is being processed"* — with a retry suggestion in the UI

### 7.7 What Happens if a Seller Changes Auction Details After It's Published?

- Sellers can edit auction details (title, description, photos, item condition) while in DRAFT or PUBLISHED state
- Once OPEN, the following fields are locked and cannot be changed by the seller: Starting price, reserve price, increment amount, auction format, visibility mode
- The following fields can still be changed by the seller while OPEN (with audit log entry): Item description (to add clarification if asked by a bidder), Item photos (to add more images)
- If substantive details change after PUBLISHED but before OPEN, all users who have already accepted their invitation (for private auctions) or watchlisted the auction are notified: *"The seller has updated details for this auction — please review before bidding."*

### 7.8 What Happens When a Dutch Auction Price Ticks at the Same Moment a User Clicks Accept?

- The server-side accepted price is authoritative — not the client-displayed price
- If the tick happens first: user receives `dutch_price_update` event; their displayed price updates; they accept the new (lower) price — which is better for them
- If the accept arrives first (before the tick job runs): system records acceptance at the current price and cancels the tick job
- If both happen truly simultaneously (within the same millisecond): database transaction for the acceptance is committed; the tick job detects the auction is no longer OPEN and exits cleanly
- The buyer always pays the server's current price at the moment of server-side acceptance — never more

### 7.9 What Happens if No One Bids on Any Format?

| Format | Outcome |
|--------|---------|
| Forward | CLOSED → FAILED. Seller notified. All watchers notified. |
| Reverse | CLOSED → FAILED. Auction creator notified. All watchers notified. |
| Sealed Bid | CLOSED → FAILED. Same notifications. |
| Dutch | CLOSED → FAILED when floor price is reached OR when auction duration expires, whichever comes first. |

In all cases, the seller sees the option to re-list (which creates a new DRAFT with the same details pre-filled — one click to re-list).

### 7.10 Account Deletion

- Users can request account deletion from their profile settings
- Deletion is soft at first: the account is marked PENDING_DELETION with a 30-day grace period
- During this period, the user cannot log in, bid, or create auctions — but their records remain
- If the user has active open auctions, deletion is blocked: *"You must close or cancel all active auctions before deleting your account."*
- After 30 days, the account is hard-deleted: email, name, and password hash are erased; all bid records and audit logs retain a placeholder user_id reference (for integrity) with a display name of "[Deleted User]"
- Reviews they received remain visible (they reflect real transactions); reviews they wrote are anonymised to "[Deleted User]"

### 7.11 Duplicate Listing Prevention

- No automatic duplicate detection (too subjective for varied items)
- However, a seller cannot have more than 5 active (OPEN or EXTENDED) auctions simultaneously — this reduces spam listing
- University Admins can flag a listing as duplicate and remove it with a reason

### 7.12 What Happens When a Watchlisted Auction is Cancelled by the Seller?

- All users who have watchlisted the auction receive an in-app notification: *"An auction on your watchlist has been cancelled by the seller: [Auction Title]"*
- The auction is removed from their watchlist automatically
- No email is sent for this event (low priority)

---

## 8. System Architecture

### 8.1 Pattern: Modular Monolith

A single deployable application with clearly bounded internal modules. Each module owns its service, repository, and domain logic. Modules communicate through defined service interfaces, not direct database cross-access.

**Why not microservices?**
- Team size (8 people) and timeline (14 weeks) do not justify the operational complexity
- Shared PostgreSQL transactions across the bid pipeline (bid → auction update → audit log) require atomicity that is trivial in a monolith and complex across services
- The modular structure means individual modules can be extracted into services later with minimal refactoring

### 8.2 Four-Layer Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                         PRESENTATION LAYER                             │
│   Express routes (REST API) · Socket.IO handlers · Input validation    │
│   Next.js pages (SSR + CSR) · Zod schema validation                   │
├────────────────────────────────────────────────────────────────────────┤
│                         APPLICATION LAYER                              │
│   Use-case services: AuctionService, BidService, NotificationService  │
│   Orchestrates domain logic + infrastructure calls                     │
├────────────────────────────────────────────────────────────────────────┤
│                           DOMAIN LAYER                                 │
│   AuctionStateMachine · BidValidationStrategy (4 implementations)      │
│   ProxyBiddingEngine · AntiSnipeService · RankingEngine                │
│   Pure TypeScript — zero framework or DB dependencies                  │
├────────────────────────────────────────────────────────────────────────┤
│                        INFRASTRUCTURE LAYER                            │
│   Prisma (PostgreSQL) · Redis client · Bull queues                     │
│   File storage client (TBD) · Nodemailer · Socket.IO adapter           │
└────────────────────────────────────────────────────────────────────────┘
```

### 8.3 Internal Module Map

| Module | Owns | Depends On |
|--------|------|-----------|
| MOD-AUTH | Registration, login, JWT, email verification, password reset | MOD-USER (create user record), MOD-EMAIL |
| MOD-USER | User profiles, roles, public lookup | — |
| MOD-TENANT | University onboarding, domain matching, tenant-scoped queries | MOD-USER |
| MOD-AUCTION | Auction CRUD, lifecycle state machine, scheduling, visibility, invites, access codes | MOD-USER, MOD-TENANT, MOD-NOTIFY, MOD-AUDIT |
| MOD-BID | Bid submission pipeline, validation, ranking, proxy bidding, anti-sniping | MOD-AUCTION, MOD-NOTIFY, MOD-AUDIT |
| MOD-DUTCH | Dutch price timer, decrement scheduling, floor detection | MOD-AUCTION, MOD-NOTIFY, MOD-AUDIT |
| MOD-NOTIFY | Notification creation, persistence, real-time push, email fallback | MOD-USER, MOD-EMAIL |
| MOD-SEARCH | Full-text search, filters, sort | MOD-AUCTION (read-only) |
| MOD-REVIEW | Post-auction reviews, rating aggregation, review moderation | MOD-AUCTION, MOD-USER |
| MOD-AUDIT | Append-only logging within the same DB transaction | — (depended on by all) |
| MOD-ADMIN | Admin dashboards, moderation actions, reports | All modules (read + controlled writes) |

### 8.4 Technology Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| Frontend | Next.js + TypeScript | 14.x |
| Backend | Express.js + TypeScript | 4.x |
| ORM | Prisma | 5.x |
| Database | PostgreSQL | 16 |
| Cache + Pub/Sub | Redis | 7.x |
| Real-Time | Socket.IO | 4.x |
| Background Jobs | Bull | 4.x |
| Auth | JWT (RS256) + httpOnly cookie refresh | — |
| **File Storage** | **TBD — to be decided in a future plan revision** | — |
| Email | Nodemailer | — |
| Input Validation | Zod | 3.x |
| Containerisation | Docker + Docker Compose | — |
| API Documentation | Swagger / OpenAPI | 3.0 |

### 8.5 Deployment Containers (Docker Compose)

| Container | Role |
|-----------|------|
| nginx | Reverse proxy; TLS termination; routes /api → Express, / → Next.js |
| nextjs | Frontend (SSR) |
| express-api | REST API (horizontally scalable) |
| socket-server | Socket.IO real-time server (Redis adapter for multi-instance) |
| bull-worker | Background job processor (auction scheduler, Dutch timer, notifications) |
| postgres | Primary data store |
| redis | Cache, pub/sub, job queue |

### 8.6 Multi-Tenancy Model

- Row-level filtering on all tenant-scoped tables via `tenant_id` column
- University affiliation is optional; `tenant_id` is nullable on the users table
- Auto-affiliation: on registration, if `email_domain` matches a tenant's registered domain, `tenant_id` is set automatically
- Students may request manual affiliation (requires University Admin approval) if their email is not on the recognised domain (e.g., personal email at a registered university)
- Cross-tenant browsing: Public auctions are visible to all users regardless of tenant

---

## 9. Agile Delivery Roadmap

**Sprint Structure**
- Sprint duration: 2 weeks
- Team: 8 members
- Ceremonies: Sprint Planning (Day 1), Daily Standup (15 min daily), Sprint Review + Retrospective (last day)
- Definition of Done: Feature is implemented, tested (unit + basic integration), and demoed working in the development environment

### Phase 1 — Foundation (Sprints 1–3) · 6 Weeks

**Goal:** A working Forward Auction, end-to-end, with real-time bidding and audit trail.

#### Sprint 1 — Auth, Users, Tenants, and Access Infrastructure

**Deliverables:**
- User registration (any email)
- Email verification flow (token sent, token validated)
- Login / logout / session management (JWT + refresh token in httpOnly cookie)
- Password reset flow
- RBAC middleware (platform_admin / university_admin / student / unverified)
- User profile (view own, view public)
- Tenant (university) data model + Platform Admin: create tenant, set email domain
- Auto-affiliation on registration by domain match
- Rate limiting on auth endpoints
- Full Docker Compose dev environment (postgres + redis + API running locally)

**Definition of Done:** A new user can register, verify their email, log in, and see their profile. Platform Admin can create a university tenant.

#### Sprint 2 — Auction Engine, Forward Bidding, and Audit

**Deliverables:**
- Auction CRUD (create, read, update, delete draft)
- Auction lifecycle state machine (DRAFT → PUBLISHED → OPEN → CLOSED → AWARDED / FAILED)
- Item listing within an auction (photos, description, condition)
- Image upload (file storage solution TBD — placeholder integration)
- Auction scheduling (Bull jobs: open on start_time, close on end_time)
- Forward Auction bid validation and recording (full pipeline from section 6.1)
- Reserve price logic (hidden; FAILED if not met)
- Anti-sniping (trigger, extension, max extension cap)
- Ranking engine
- Audit logging on all bid and state-change events
- Auction visibility: Public + University-Restricted modes (Private mode in Sprint 3)
- Seller cannot bid on own auction
- Seller cannot cancel once OPEN
- REST API: auction CRUD, bid submission, bid history (own bids)

**Definition of Done:** A seller can create and publish a Forward auction. Two bidders can submit bids in sequence. Anti-sniping triggers correctly. Auction closes and AWARDED status is set correctly.

#### Sprint 3 — Real-Time, Private Auctions, Watchlist, and Notifications

**Deliverables:**
- Socket.IO auction rooms: `new_high_bid`, `auction_extended`, `auction_closed`
- Personal room: `rank_signal`, `bid_accepted`, `outbid`
- Dutch auction_room events (pre-built for Sprint 4)
- Reconnect + re-fetch state on WebSocket reconnect
- Watchlist (add, remove, list)
- Notification system: creation, persistence, real-time delivery
- Notification inbox (list, mark read, mark all read, unread count)
- Watchlist notifications: auction opening, closing soon (15-min warning), auction outcome
- Private auction mode: access code generation, shareable link, direct invite by email/username
- Invitation management: accept, decline, status list for seller
- Join by code (`POST /api/v1/auctions/join/:code`)
- Auction detail page: seller UI (bid list anonymised, invite management) and bidder UI (rank signal, place bid, set proxy)

**Definition of Done:** Full real-time Forward auction works. Private auction can be created, shared by code, joined, and bid on. Watchlist notifications fire correctly.

### Phase 2 — All Formats, Search, Proxy, and Reviews (Sprints 4–5) · 4 Weeks

**Goal:** All four auction formats live. Platform is searchable. Proxy bidding and reviews complete.

#### Sprint 4 — Reverse, Sealed Bid, and Dutch Auction Formats

**Deliverables:**
- Reverse Auction: bid validation (downward), reverse proxy bidding
- Sealed Bid Auction: single-bid enforcement, no rank signals during auction, simultaneous reveal at close
- Dutch Auction: Bull recurring timer job, price decrement, `dutch_price_update` WebSocket event, first-accept logic, floor-price FAILED logic
- Dutch concurrency protection (Redis lock on acceptance)
- All format-specific edge cases from Section 5
- Auction format selector in creation UI with format-specific configuration fields
- Format-appropriate bidder UI (Dutch shows countdown to next decrement + current price + Accept button only)

**Definition of Done:** A seller can create all four auction formats. Each format runs end-to-end correctly with correct winner determination and edge case handling.

#### Sprint 5 — Search, Proxy Bidding (Forward/Reverse), and Reviews

**Deliverables:**
- Full-text search endpoint with all filters and sort options (section 6.8)
- Search index (GIN on tsvector)
- Pagination (cursor-based)
- "New auctions available" live update signal on search results page
- Proxy bidding: set proxy max on bid, auto-bid engine, proxy max increase, proxy exhaustion notification, tie-breaking
- Review system: submission, eligibility check, display on profiles, average rating computation
- Review moderation: flag, admin review queue, removal
- User public profile page: rating, completed auctions count, recent reviews, active listings
- Re-list from FAILED auction (pre-fill DRAFT from previous data)

**Definition of Done:** Search with all filters works. Proxy bidding works correctly across Forward and Reverse auctions. Post-auction reviews are submitted and displayed correctly.

### Phase 3 — Admin, Performance, and Production Readiness (Sprints 6–7) · 4 Weeks

**Goal:** Platform is administrable, secure, performant, and ready for real use.

#### Sprint 6 — Admin Panels and Reporting

**Deliverables:**
- Platform Admin dashboard: user list, tenant list, platform-wide audit log viewer, global reports
- University Admin dashboard: user list (own university), auction list (own university), local reports
- User suspension (Platform Admin: global; University Admin: own university only)
- Suspended user with active bids: auto-remove from ranking, proxy cancelled
- Suspended seller with active auctions: workflow (see section 7.1)
- Force-cancel auction (Platform Admin only) with reason + notification to all bidders
- Review removal (Platform Admin) with reason + notification to author
- Account deletion flow (section 7.10)
- Activity reports: auctions created, bids placed, active users, format breakdown, average auction value
- Audit log viewer with filters (entity type, action, date range, actor)

**Definition of Done:** Platform Admin and University Admin can perform all moderation actions. Reports are accurate. Audit log is queryable.

#### Sprint 7 — Security, Performance, and End-to-End Hardening

**Deliverables:**
- Rate limiting on all endpoint groups
- Input sanitisation (strip HTML from all text fields)
- HTTPS setup (nginx TLS configuration)
- Redis caching for auction listings (5-minute TTL, invalidated on state change)
- Load test: 200 concurrent users, bid broadcast latency < 1 second, page load < 2 seconds
- Horizontal scaling test: 2 API instances + 2 Socket.IO instances + Redis adapter
- Full regression test suite run
- End-to-end test: each auction format run from creation to AWARDED
- Performance profiling and query optimisation (EXPLAIN ANALYSE on slow queries)
- Email fallback for offline notifications (5-minute delay check)
- Bug fixes from Sprint 6 review
- Final API documentation (Swagger) review

**Definition of Done:** All functional requirements (F1–F12 from SRS) pass. Load targets are met. No P0 or P1 bugs outstanding. HTTPS works. API docs are complete.

---

## 10. Test Strategy

### 10.1 Test Levels

| Level | What is Tested | When Run |
|-------|---------------|---------|
| Unit | Domain layer: BidValidationStrategies, AuctionStateMachine, ProxyBiddingEngine, AntiSnipeService, RankingEngine | On every commit (CI) |
| Integration | Service layer + database: full bid pipeline, auction lifecycle transitions | On every PR |
| API | All REST endpoints: correct status codes, response shapes, validation errors | On every PR |
| WebSocket | Socket.IO events: correct delivery to correct rooms, not delivered to wrong rooms | On every PR |
| End-to-End | Full user journeys: Create auction → Bid → Close → Award → Review | Per sprint, before review |
| Load | 200 concurrent users, 100 bids/minute/auction, reconnect storm simulation | Sprint 7 |
| Security | Auth bypass attempts, self-bid attempts, private auction access without code | Sprint 7 |

### 10.2 Mandatory Checks Per Sprint (Definition of Done)

| Check | Description |
|-------|-------------|
| Bid correctness | Each format only accepts valid bids per its rules |
| Bid pipeline atomicity | No bid succeeds partially (amount updated but auction price not, or vice versa) |
| Anonymity | No API response exposes bidder identity in auction bid history |
| Sealed bid privacy | No rank signals or bid data accessible via any API endpoint during a Sealed auction |
| Proxy privacy | Proxy max_amount never appears in any API response, WebSocket event, or log output |
| Anti-sniping | Extension fires correctly; max extensions cap enforced; Bull job rescheduled correctly |
| Dutch timer | Price decrements at configured interval; floor FAILED logic works; acceptance closes immediately |
| Rank accuracy | Green / Yellow / Red signals always reflect actual current rankings |
| Access control | Private auctions inaccessible without code or invite; university-restricted auctions inaccessible to unaffiliated users |
| Self-bid prevention | Seller cannot place a bid on own auction through any code path |
| State machine | No auction can skip states or transition backwards |
| Audit completeness | Every bid and state-change has a corresponding audit log entry in the same transaction |
| WebSocket room isolation | Events for Auction A never delivered to users in Auction B's room |
| Concurrency | Concurrent bids handled correctly by the distributed lock |

### 10.3 Test Accounts

```
Platform Admin:       admin@auctionportal.test

University Admins:
  uniadmin1@university-a.edu  → University A tenant
  uniadmin2@university-b.edu  → University B tenant

Students — Affiliated:
  student1@university-a.edu   → University A, verified, seller + bidder
  student2@university-a.edu   → University A, verified, bidder
  student3@university-b.edu   → University B, verified
  student4@university-b.edu   → University B, verified

Students — Unaffiliated:
  student5@gmail.com          → No university, verified
  student6@gmail.com          → No university, verified

Unverified:
  unverified@gmail.com        → Registered but email not verified

Suspended:
  suspended@university-a.edu  → Active account then suspended mid-test
```

### 10.4 Load Test Scenarios

| Scenario | Target | Tooling |
|----------|--------|---------|
| 200 concurrent bidders on a single Forward auction | All bid events delivered < 1 second | k6 + Socket.IO client |
| 50 simultaneous active auctions | All auctions run correctly without interference | k6 |
| Dutch auction with 100 users watching, 2 click Accept simultaneously | Exactly one winner, second gets soft error | Custom script |
| Bid submission burst (100 bids in 10 seconds on one auction) | All processed in order, no data corruption | k6 |
| Auction listing page | Load < 2 seconds with 500 auctions in DB | k6 |
| WebSocket reconnect storm (50 clients disconnect and reconnect) | All re-sync correctly within 5 seconds | Custom script |

---

## 11. Risk Register

| ID | Risk | Impact | Likelihood | Mitigation |
|----|------|--------|-----------|-----------|
| R01 | Bid race condition — two bids at identical timestamp produce wrong winner | Critical | Medium | Redis SETNX distributed lock serialises all bids per auction; enforced at the application layer |
| R02 | Dutch auction — two users accept simultaneously | High | Medium | Same Redis lock mechanism; second user gets a clear soft error with explanation |
| R03 | Anti-snipe Bull job not rescheduled correctly — auction closes early | High | Low | Job rescheduling tested explicitly; idempotency key on close jobs |
| R04 | WebSocket disconnect causes bidder to miss their outbid notification | Medium | High | Outbid notifications persisted in DB; client re-fetches on reconnect; email fallback for auction outcomes |
| R05 | Proxy max amount leaked via API response or log | High | Low | Proxy max never selected in any repository read method; code-reviewed field whitelist |
| R06 | Sealed bid — rank signal shown accidentally | High | Low | Sealed bid format returns no rank_signal events; tested explicitly in API and WebSocket tests |
| R07 | Private auction discoverable via search | High | Low | Search query explicitly filters by visibility AND access; integration tested |
| R08 | Session expiry during active bidding causes bid loss | Medium | High | Client auto-refreshes token before showing 401 to user; retry on new token |
| R09 | Bull worker crash during active Dutch timer | High | Low | Bull retries with exponential backoff; on worker restart, job state is recovered from Redis |
| R10 | Shill bidding (seller creates second account to inflate price) | Medium | Low | Seller self-bid prevention; same IP detection flagged in audit log for admin review; review system surfaces suspicious patterns |
| R11 | Duplicate auction code collision | Low | Low | 8-character alphanumeric space = 2.8 trillion combinations; collision check on generation |
| R12 | Image upload abuse (large files, wrong types) | Medium | Medium | MIME type validation + 5MB limit server-side (not just client-side); upload restrictions enforced at the API layer regardless of storage provider |
| R13 | Review manipulation (coordinated fake positive reviews) | Medium | Low | One review per auction per user enforced by DB unique constraint; admin moderation queue |
| R14 | Auction listing search index lag (new auction not appearing) | Low | Low | Index updated synchronously on write (not async); acceptable for this scale |
| R15 | University Admin abuses suspension power | Low | Low | All University Admin actions logged in audit trail; visible to Platform Admin |

---

## 12. Explicitly Out of Scope

These features are not being built. They are listed here so the team does not waste time debating them.

| Feature | Why Excluded |
|---------|-------------|
| Payment processing or escrow | Out of scope for this academic cycle; the platform records outcomes only |
| In-app messaging between buyer and seller | Adds significant complexity; contact happens outside the platform |
| Mobile native app (iOS / Android) | Web-first; responsive design covers mobile browsers |
| Push notifications (mobile OS level) | Web notifications (in-app + email) are sufficient |
| AI-based price recommendations | Feature idea for a future version; not in this cycle |
| Bidder count display | Explicitly hidden to maintain competitive anonymity |
| Public bid history (showing who bid what) | Bidder identity is anonymised throughout and after the auction |
| Multi-currency support | Single currency (configurable at deployment time) |
| Scheduled auctions more than 30 days in future | Limits complexity in the scheduling engine |
| Bundle / combinatorial bidding (bid on lots together) | Significantly more complex; not needed for this use case |
| Multi-round negotiation | Enterprise procurement concept; not relevant here |
| API access for external systems | No external integrations in scope |
| Billing or subscription management | Platform is not monetised in this phase |
| **File storage provider selection** | **To be decided in a future plan revision; placeholder integration used during development** |

---

## 13. Glossary

| Term | Definition |
|------|-----------|
| Forward Auction | Bids go upward; highest bid wins |
| Reverse Auction | Bids go downward (the auctioneer is the buyer, bidders compete to offer the lowest price) |
| Sealed Bid | Blind single-round auction; all bids submitted in secret, revealed simultaneously at close |
| Dutch Auction | Price starts high and decrements on a timer; first bidder to accept the current price wins |
| Anti-Sniping | Automatic extension of an auction's end time when a bid is placed in the final minutes |
| Proxy Bid | A maximum (or minimum for Reverse) amount a user authorises the system to bid on their behalf |
| Rank Signal | A colour indicator (green / yellow / red) showing a bidder's competitive position without revealing amounts or identities |
| Tenant | A university registered on the platform; provides a scoped community for its students |
| Reserve Price | A hidden minimum acceptable price set by the seller; if not met at close, the auction FAILS |
| Auction Code | An 8-character alphanumeric identifier for joining a private auction (e.g., AUC-X7K2) |
| DRAFT | Auction state: created but not visible to others |
| PUBLISHED | Auction state: visible and joinable; bidding not yet open |
| OPEN | Auction state: bidding window is active |
| EXTENDED | Auction state: anti-sniping extension is active; still accepting bids |
| CLOSED | Auction state: bidding window has ended; being evaluated |
| AWARDED | Auction state: winner determined; reserve met |
| FAILED | Auction state: no bids, or reserve not met |
| CANCELLED | Auction state: terminated by seller (before OPEN) or Platform Admin |
| Auction Room | A Socket.IO room scoped to one auction for real-time event delivery |
| Distributed Lock | A Redis SETNX-based mechanism that ensures only one bid is processed at a time per auction |
| Bull | A Redis-backed job queue used for scheduling auction open/close, Dutch timer, and notification dispatch |
| Modular Monolith | A single deployable application with clearly defined and bounded internal modules |
| GIN Index | Generalised Inverted Index in PostgreSQL, used to accelerate full-text search queries |
| Server Timestamp | The authoritative time of a bid, recorded by the server (never the client) |
| Proxy Floor | In a Reverse Auction proxy bid, the lowest price the system will auto-bid down to |

---

*This plan is a living document. All changes are tracked in the document's version history. The SRS and SDS each maintain their own change logs referencing changes from this plan.*
