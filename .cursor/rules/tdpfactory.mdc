# ✨ AI Coding Rules & Best Practices (Deno + Next.js)

This document defines how Cursor (or any AI) should generate code for this project to **prevent unintended results**, **maintain consistency**, and **improve developer experience**.

---

## 🔧 Project Context

- **Runtime**: Deno (v1.42+)
- **Frontend Framework**: Next.js (13+ with App Router)
- **Language**: TypeScript (strict mode)
- **Monorepo**: Single repo using shared libraries between frontend and backend

---

## 🧠 General AI Code Generation Rules

1. **NEVER assume or hardcode file paths** – Always use relative imports or Deno/Next.js compatible module resolution.
2. **NEVER use `require` or `CommonJS`** – Use ESM-only (`import/export`) syntax.
3. **Always use named exports** unless a default export is justified (e.g., page components).
4. **No unnecessary boilerplate** – Keep generated code lean and purposeful.
5. **Follow functional programming where possible** – Prefer pure functions and stateless components.
6. **Use type inference carefully** – Be explicit with interfaces for public APIs or external calls.

---

## 🗂 Folder & File Naming Conventions

- Use `camelCase` for folders in frontend (e.g., `components/ui`)
- Use `snake_case` for Deno backend modules (e.g., `lib/db_client.ts`)
- File names should reflect their purpose (e.g., `createUserHandler.ts`, not `utils.ts`)
- Co-locate types in `types/` or `*.types.ts` next to usage

---

## 🛡 Deno Rules

- Always use `Deno.Kv` or `Deno.serve` only when explicitly instructed
- All file paths must be **relative** or use full URL imports
- When accessing the file system, wrap with permission checks
- Avoid any `Node.js`-specific APIs or assumptions (e.g., `process`, `fs`)

---

## ⚡ Next.js Rules

- Use **Server Components** by default unless state/interaction is required
- Use `use client` **only when necessary**
- Always use `async` components when performing data fetching
- For API routes, use the **App Router convention** (`app/api/route.ts`)
- Do not use `getServerSideProps`, `getStaticProps` – prefer newer conventions

---

## 💬 Communication Between Frontend and Backend

- Use `fetch()` to communicate from Next.js to Deno endpoints or edge functions
- Always define the shape of request/response using a shared `zod` schema (from `/shared/validation/`)

---

## 🧪 Testing Guidelines

- Use `Deno.test()` for backend logic
- Use `jest` or `vitest` (depending on config) for frontend/unit tests
- Include at least one test stub for generated modules

---

## 🧼 Formatting & Style

- Use `prettier` and `eslint` – assume these are configured
- Follow Airbnb/Next.js style conventions
- Comment complex logic, but avoid redundant comments

---

## 🚫 Forbidden Patterns

- No `any` types unless explicitly permitted with a comment
- No magic strings – use constants or enums
- No duplicate logic – factor shared utilities into `lib/` or `utils/`
- No `console.log` in production paths – use structured logging or telemetry

---

## ✅ Preferred Tools

- **State Management**: `zustand` or context API
- **API validation**: `zod`
- **Database (if any)**: Assume `Deno.Kv` or Supabase unless otherwise noted
- **Styling**: Tailwind CSS

---

## 📌 Default Assumptions

- All components and utilities must be typed
- Assume a modular structure: `app/`, `components/`, `lib/`, `shared/`, `routes/`
- Comments should explain **why**, not just **what**

---

## ✍️ Example Prompt (for Cursor AI)

> "Create a Deno KV handler that saves a user object with validation using `zod`. The object includes `id: string`, `name: string`, and `email: string`. Add a test."

---

## 👁️ Future-Proofing

If unclear on architectural decisions, default to:
- Extensibility
- Simplicity
- Explicitness
- Co-location of logic and types

---

> When in doubt, ask for clarification before generating large blocks of code.