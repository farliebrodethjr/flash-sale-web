# ⚡ Flash Sale Frontend

A fast and user-friendly Flash Sale application designed to provide a smooth shopping experience, with live product updates and quick checkout during limited-time sales.

---

## 🔗 Repository

- **Backend API Repository:** [https://github.com/farliebrodethjr/flash-sale-api](https://github.com/farliebrodethjr/flash-sale-api)

---

## 🚀 Build & Run Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) (`>= 20.12.0`)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

---

### Step 1: Clone Repository & Setup Environment

Clone the repository and create the environment configuration:

```bash
git clone https://github.com/farliebrodethjr/flash-sale-fe.git
cd flash-sale-fe
cp .env.example .env
```

Ensure your `.env` points to the running or deployed backend API:

```env
# Local Development:
VITE_API_URL=http://localhost:9920/v1
```

> ⚠️ **Important Note for Full Functionality:**
> This frontend application needs the **Flash Sale Backend API** to provide login, sale information, product availability, and order processing.
>
> 🔗 **Backend Repository & Deployment Guide:** [https://github.com/farliebrodethjr/flash-sale-api](https://github.com/farliebrodethjr/flash-sale-api)
>
> Please ensure the backend API is deployed or running locally and that `VITE_API_URL` is configured correctly before using the app.

---

### Step 2: Install Dependencies & Run Development Server

```bash
npm install
npm run dev
```

After running the development server, the application will be available at:

- **Web App:** `http://localhost:5173`

---

### Step 3: Production Build

```bash
npm run build
npm run preview
```

---

## 🔑 Test Accounts (For QA & Testing)

Testers can use any of the seeded accounts below to log in at [http://localhost:5173/login](http://localhost:5173/login):

| Email               | Password       | Role / Purpose                   |
| :------------------ | :------------- | :------------------------------- |
| `user1@example.com` | `Password123!` | Primary test user                |
| `user2@example.com` | `Password123!` | Secondary test user              |
| `user3@example.com` | `Password123!` | Multi-session checkout test user |

> **💡 Note:** Any account from `user1@example.com` to `user1000@example.com` with password `Password123!` is valid and pre-seeded in the backend database.

---

## 🖥️ Frontend Views & Key Features

This project provides three core interactive user interfaces:

### 1. Flash Sale Live Hub (Welcome Page)

- **Route:** [http://localhost:5173/](http://localhost:5173/)
- Browse active, upcoming, and ending sales campaigns with real-time status tabs and responsive product cards.

### 2. Product Detail & Live Checkout

- **Route:** [http://localhost:5173/deals/:id](http://localhost:5173/deals/:id)
- High-precision countdown timers, remaining inventory indicators, and one-click rapid checkout optimized for burst traffic.

### 3. Transaction & Order History

- **Route:** [http://localhost:5173/history](http://localhost:5173/history)
- Protected user order history dashboard with status filters (All, Completed, Pending, Failed) and itemized receipts.

---

## 💡 Design Choices & Trade-offs

### 1. TanStack React Query for Server Cache & Data Synchronization

- **Design Choice**:
  - Manages remote server data (flash sale catalogs, active sales, product details, order history) with automatic background caching, request deduplication, and immediate query invalidation upon checkout.
- **Trade-off**:
  - **Cache Freshness Window**: Requires explicit query invalidation to ensure UI inventory counts match backend stock under heavy concurrency.

### 2. Zustand for Lightweight Client UI State

- **Design Choice**:
  - Eliminates Redux/Context boilerplate by managing client-only state (e.g. transaction history filter tab selection and local pagination) with minimal footprint.
- **Trade-off**:
  - **In-Memory Volatility**: Client UI state resets on full browser refresh unless connected to browser storage.

### 3. Centralized Axios HTTP Client with JWT Interceptors

- **Design Choice**:
  - Request interceptors automatically inject the JWT Bearer token from browser cookies (`js-cookie`) into all outgoing API calls.
- **Trade-off**:
  - **Cookie Access**: Reading cookies adds minor client-side access time compared to in-memory state, but guarantees authentication persistence across page reloads.

### 4. Tailwind CSS v4 + Shadcn UI Component Layer

- **Design Choice**:
  - Powered by the `@tailwindcss/vite` engine for zero-runtime CSS overhead, paired with accessible, highly customizable Shadcn primitives.
- **Trade-off**:
  - **Codebase Component Ownership**: Component primitives live directly inside `src/components/ui/`, requiring manual file updates when upgrading components.

### 5. Client-Side Throttling & Graceful Rate-Limit Handling (HTTP 429)

- **Design Choice**:
  - **Optimistic Button Locking**: Disables the checkout button immediately upon submission to prevent accidental duplicate clicks during high-traffic bursts.
  - **Graceful Error Handling**: Intercepts `HTTP 429 Too Many Requests` from the backend `UserThrottlerGuard` and displays non-blocking toast notifications informing the user to wait briefly before retrying.
- **Trade-off**:
  - **User Delay**: Aggressive clickers who exceed rate limits are temporarily throttled until the cooling window resets.

---

## 🏗️ System Architecture

```mermaid
flowchart TD
    User["👤 User / Browser"]
    UI["⚛️ React UI (Shadcn + Tailwind)"]
    Store["🗃️ React Query & Zustand"]
    Axios["🌐 Axios (Auth Interceptor)"]
    Throttler{"🛡️ Rate Limiter (Throttler)"}
    API["⚡ Flash Sale API (NestJS)"]
    Redis[("⚡ Redis (Lua Script & BullMQ)")]
    Worker["⚙️ Order Worker"]
    DB[("🐘 PostgreSQL")]

    User -->|1. Browse / Click Checkout| UI
    UI -->|2. Cache & UI State| Store
    Store -->|3. HTTP Request| Axios
    Axios -->|4. POST /sale-product/:id/checkout| Throttler

    Throttler -->|Exceeded Limit (429)| Axios
    Throttler -->|Allowed Request| API

    API -->|5. Atomic Stock Decrement| Redis
    Redis -->|Stock Reserved (201)| Worker
    Worker -->|6. Persist Order| DB

    Redis -.->|Sold Out (400)| API
    API -->|7. Response & Query Invalidation| Store
    Store -->|8. Live UI & Toast Update| UI
```

### 💡 Simple Explanation (How It Works in Plain English)

Think of the flash sale system like a **popular concert ticket booth**:

1. **You Click "Buy Now" (React UI)**: You click the checkout button. The button instantly freezes and shows a spinner so you don't accidentally buy twice.
2. **Checking Local Data (React Query & Zustand)**: The app prepares your order details from memory without lag.
3. **Attaching Your Pass (Axios Interceptor)**: Axios attaches your digital login badge (JWT token) and sends your purchase request.
4. **The Bouncer (Throttler / Rate Limiter)**: If a bot or user clicks 50 times in 1 second, the bouncer stops them immediately (`429 Slow Down`) so the server stays fast for everyone else.
5. **The Super-Fast Counter (Redis Lua Script)**: In **less than 1 millisecond**, Redis checks if there are items left:
   - **If items are left**: It claims 1 item for you immediately (`201 Created`).
   - **If zero items are left**: It instantly tells you `Sold Out (400)` without ever bothering the database.
6. **The Back-Office Clerk (BullMQ & PostgreSQL)**: After your item is secured, a background worker quietly saves the official receipt into the PostgreSQL database without making you wait.
7. **Instant Screen Update (UI Feedback Loop)**: Your screen instantly updates to **"Order Placed 🎉"** or **"Sold Out ❌"**, and refreshes the live item counter for everyone.
