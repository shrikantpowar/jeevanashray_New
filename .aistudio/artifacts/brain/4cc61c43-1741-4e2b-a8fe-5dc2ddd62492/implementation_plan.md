# Jeevanashray Foundation — NGO Web Architecture & Implementation Plan

A comprehensive, accessible, database-free web platform for **Jeevanashray Foundation** (Est. 2013, Nallasopara, Maharashtra, India), delivering a responsive experience with a universal top announcement banner, curated local content management, transparent community impact, and secure Cashfree donation processing.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> **Key Architecture Decisions & Operational Boundaries**
>
> 1. **Logo Asset Provision**: Per your instruction, the official logo will not be redrawn or replaced. An accessible, styled foundation seal will serve as a visual placeholder in `src/assets/logo/` until you upload the original NGO logo asset.
> 2. **Database-Free Content Architecture**: No Firebase, Firestore, or relational databases will be initialized. All content (programs, impact statistics, gallery manifest, 11 team profiles, reviews, and announcement banners) is managed via strongly-typed TypeScript configuration files (`src/config/` and `src/data/`).
> 3. **Non-Persistent Demonstration for Public Submissions**: In strict adherence to your prompt, volunteer and contact forms will not claim data is permanently stored. They will perform client-side validation and display a clear non-persistent demonstration confirmation with direct contact links (email: `info@jeevanashrayfoundation.com`, phone: `+91 93211 32003`).
> 4. **Cashfree Payments via Express Server**: Frontend will contain zero payment secrets. A lightweight Express backend (`server.ts`) using official Cashfree SDK / REST APIs (`/api/payments/create-order`, `/api/payments/verify-order`, `/api/payments/webhook`) will handle payment creation and raw-body webhook signature verification.

---

## 1. Overview & Core Concept

- **What It Does**: Provides a modern, responsive digital home for Jeevanashray Foundation across 15 dedicated pages, communicating its 2013-founded grassroots initiatives in Nallasopara and Palghar, displaying exact verified programs (child welfare, women's empowerment, education, rural livelihoods, information access), and facilitating donations via Cashfree.
- **Target Audience**: Community members, donors, volunteers, CSR partners, and families across Maharashtra seeking authentic information about the foundation's social welfare programs.
- **Key Value**: Transparent, authentic representation with zero fake testimonials, zero hallucinated team profiles, strict brand color adherence, and reliable donation handling.

---

## 2. User Experience & Visual Design

### Brand Identity & Palette
- **White**: `#FFFFFF` (Primary canvas & clean surfaces)
- **Ivory**: `#FFF8ED` (Warm institutional paper backdrop & subtle section alternations)
- **Foundation Red**: `#C8102E` (Global announcement banner, primary call-to-actions, urgent impact badges)
- **Gold**: `#D4A72C` (Warm accents, trust borders, icon highlights, subtle decorative dividers)
- **Charcoal**: `#424242` (High-contrast typography, readable prose, subtle structural dividers)

### Typography & Structure
- **Headings**: Editorial serif / refined sans pairing (`Playfair Display` or `Outfit` with `DM Sans` / `Plus Jakarta Sans`) respecting the 2+1 font rule.
- **Reading Measure**: Constrained to `65–75ch` (`max-w-2xl` / `max-w-3xl`) with relaxed leading (`1.65–1.75`) for mission statements and program descriptions.
- **Anti-Slop Discipline**: No code-comment prefixes (`//`), no decorative pulsing dots, no floating synthetic innovation badges, no badge sandwiches. Natural human title-case prose throughout.

### Universal Announcement Banner
- Mounts at the absolute top of the shared layout above navigation on **every single public route**.
- Styled with Foundation Red (`#C8102E`), crisp white text, and an optional gold CTA button.
- Configured via `src/config/announcementConfig.ts` with visibility flag, message, optional start/end dates, CTA text/link, and session-aware dismissal stored in `sessionStorage`.

---

## 3. Technical Architecture & System Layout

```
┌────────────────────────────────────────────────────────────────────────┐
│                        SHARED APPLICATION LAYOUT                       │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ Global Announcement Banner (#C8102E) [announcementConfig.ts]    │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ Top Bar Header: [Brand Wordmark] ── [Nav Links] ── [Donate CTA]   │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│  ┌───────────────────────── PAGE ROUTER ────────────────────────────┐  │
│  │                                                                 │  │
│  │  1. Home (Exact 10-section sequence)                            │  │
│  │  2. About (History since 2013, Nallasopara, Vision & Values)     │  │
│  │  3. Programs (Balwadi, Mahila Bachat Gat, Livelihoods, etc.)    │  │
│  │  4. Impact (Verified metrics, community focus, reports)         │  │
│  │  5. Gallery (Lightbox viewer, keyboard navigation, unique imgs) │  │
│  │  6. Team (Exactly 11 profile slots with honest placeholders)    │  │
│  │  7. Reviews & Comments (Curated initial data & empty states)    │  │
│  │  8. Volunteer (Validated form with demonstration mode)          │  │
│  │  9. Donate (Amounts, custom INR input, Cashfree checkout)       │  │
│  │ 10. Contact (Validated form, office address, emergency contact) │  │
│  │ 11. Privacy Policy                                              │  │
│  │ 12. Terms & Conditions                                          │  │
│  │ 13. Refund and Cancellation Policy                              │  │
│  │ 14. Donation Success Page                                       │  │
│  │ 15. Donation Failure / Pending Page                             │  │
│  │                                                                 │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ Global Footer (Trust markers, 80G/Registration notes, Contacts) │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
              Donation Flow (Cashfree REST & Webhooks)
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                    NODE.JS EXPRESS SERVER (server.ts)                  │
│                                                                        │
│  POST /api/payments/create-order  ──▶  Cashfree API /pg/orders         │
│  GET  /api/payments/verify/:order ──▶  Cashfree API /pg/orders/{id}    │
│  POST /api/payments/webhook       ──▶  Raw-Body HMAC-SHA256 Signature  │
│                                        Verification & Status Log       │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Homepage Section Sequence (Strict Order)

1. **Hero Banner**: Engaging headline, verified mission kicker, dual CTA (*Support Our Cause* and *Explore Programs*), and central image manifest asset.
2. **Mission**: Verified foundation mission statement:
   > *"We are inspired by passion and compassion for the well-being of people. We listen and learn about problems that cause inequity, whether low-yield crops in Maharashtra, child poverty, women's issues, or unemployment. We get involved only if we believe we can make a unique contribution. We are committed to social justice, sustainable development, and human rights. Access to information is essential to informed decision-making at all levels. We are committed to disseminating information and promoting sustainable development initiatives for underrepresented and marginalized sectors of society."*
3. **Programs**: Interactive cards covering the 9 core areas of work (Balwadi & Early Education, Women's Self-Help Groups / Mahila Bachat Gat, Child Welfare, Agriculture & Low-yield crop aid, Rural Livelihoods, Information Access, Health & Medical Camps, Social Justice, Sustainable Development).
4. **Impact Numbers**: Verified operational indicators (Years of Service since 2013, Communities Served in Palghar/Nallasopara, Focus Initiatives) presented with tabular numerals and explicit context.
5. **Donate Call to Action**: Highlighted donation card with quick amount selector (₹500, ₹1,000, ₹2,500, ₹5,000, Custom) and 80G tax benefit informational banner.
6. **Stories**: Verified community change vignettes with distinct documentary imagery from the central manifest.
7. **Reviews Showcase**: Curated community feedback carousel/grid with verified quotes or honest empty state.
8. **Latest Comments Showcase**: Dedicated section for community feedback with transparent notice regarding moderation.
9. **Volunteer Call to Action**: Inviting community leaders, teachers, and field workers to join hands in Nallasopara and Palghar.
10. **Footer**: Navigation links, statutory disclosures (Registration, 80G, 12A notes), physical address, phone, email, and social links.

---

## 5. Team Section — Exactly 11 Slots Specification

The team page and data store will define exactly 11 profile slots with strict schema:
- `id`: Unique identifier (`team-01` through `team-11`)
- `slotNumber`: `1` through `11`
- `name`: Real name or clearly labeled *"Office Bearer Slot [N]"* / *"Trustee Slot [N]"*
- `role`: Designated designation (e.g., Founder & President, Secretary, Treasurer, Field Operations Lead, etc.)
- `bio`: Short biography emphasizing community service background
- `photoUrl`: Unique placeholder portrait from the image manifest (`/assets/images/team_slot_[N].jpg`)
- `displayOrder`: Integer order `1` to `11`

No stock photography will be misrepresented as real staff members.

---

## 6. Central Image Manifest Rules

To enforce the requirement that **every image placement uses a different source image across the entire website**:
- An asset tracker `src/data/imageManifest.ts` will catalog every visual slot (Hero, Program Cards 1–9, Stories 1–3, Gallery 1–12, Team 1–11, About imagery, Impact banner).
- A compile-time/runtime validation helper ensures no two slots share the same image URI.
- High-fidelity documentary photography will be generated or mapped with descriptive alt text, responsive aspect ratios (`16:9` hero, `4:3` cards, `1:1` portraits), and resilient CSS fallback containers.

---

## 7. Cashfree Payment Gateway Backend Specification

- **Configuration via Server Env**:
  - `CASHFREE_APP_ID`
  - `CASHFREE_SECRET_KEY`
  - `CASHFREE_ENV` (`SANDBOX` or `PRODUCTION`)
  - `CASHFREE_WEBHOOK_SECRET`
  - `CASHFREE_API_VERSION` (`2023-08-01`)
  - `APP_BASE_URL`
- **Endpoints in `server.ts`**:
  - `POST /api/payments/create-order`: Validates amount ($\ge ₹10$), currency (`INR`), customer phone, customer email, customer name; generates unique order ID (`order_JAF_${timestamp}`); calls Cashfree `/pg/orders`; returns `payment_session_id`.
  - `GET /api/payments/verify/:orderId`: Calls Cashfree `/pg/orders/:orderId` to fetch authoritative status (`PAID`, `ACTIVE`, `EXPIRED`, `TERMINATED`).
  - `POST /api/payments/webhook`: Parses raw body buffer; validates `x-webhook-signature` using HMAC-SHA256 with `CASHFREE_WEBHOOK_SECRET`; logs transaction status securely; implements idempotent processing to prevent duplicate execution.
- **Frontend Integration**:
  - Client loads official Cashfree SDK (`Cashfree.load({ mode: "sandbox" })`).
  - Initiates checkout via `cashfree.checkout({ paymentSessionId, redirectTarget: "_self" })`.
  - Routes to `/donation-success` or `/donation-pending` based on server verification (never client redirect alone).

---

## 8. Multi-Phase Execution Roadmap

| Phase | Scope & Deliverables | Verification & Approval Gate |
|---|---|---|
| **Phase 1** | Inspect project, produce architecture & plan artifact, present decisions | **Current Turn** — Await user approval |
| **Phase 2** | Build global announcement banner, navigation, header, footer, 15 complete pages, image manifest, and exact 11 team member slots | Visual inspection of all 15 routes, banner dismissal, mobile nav test |
| **Phase 3** | Connect local data configuration (`src/config/`, `src/data/`), interactive donation amount selector, gallery lightbox, FAQ accordion, honest non-persistent forms | Interactive test of forms, lightbox keyboard nav, zero-database audit |
| **Phase 4** | Build Express `server.ts`, Cashfree order creation, server-side status verification, webhook signature verifier, sandbox test runner | Verify order creation endpoint, SDK checkout flow, webhook test |
| **Phase 5** | SEO audit (meta tags, JSON-LD NGO schema), WCAG 2.2 AA accessibility check, `.env.example`, deployment test | `compile_applet` build success, clean console, zero errors |

---
