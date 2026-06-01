---
name: xyrus10-dev
description: Development workflow for xyrus10-web portfolio. Use for DB operations, admin management, UI component creation with Tailwind 4 and shadcn/ui.
---

# Xyrus10 Dev

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Database**: Drizzle ORM + better-sqlite3
- **Auth**: Lucia
- **Cache**: ioredis

## Core Workflows

### 1. Database Operations
- **Push Changes**: `npm run db:push` to sync schema with `sqlite.db`.
- **Seed Data**: `npm run db:seed` for initial content.
- **Studio**: `npm run db:studio` to view/edit data.
- **Schema**: Located in `src/lib/db/schema.ts`.

### 2. Admin Management
- **Create Admin**: `npm run create-admin` to add new admin users.
- **Admin Pages**: Located in `src/app/admin/`. Follow existing Sidebar/Layout pattern.

### 3. UI Development
- **No `any`**: Never use `any` type. Use specific types or `unknown`.
- **Components**: Follow shadcn/ui pattern in `src/components/ui`.
- **Tailwind 4**: No `tailwind.config.ts` changes needed for v4 default behaviors. Use `@theme` in `src/app/globals.css`.
- **Glassmorphism**: Use `bg-white/10 backdrop-blur-md border-white/20`.

## Directory Map
- `/src/app/admin`: Admin dashboard routes.
- `/src/components/ui`: Primitive components.
- `/src/lib/actions`: Server actions for data mutations.
- `/src/lib/db`: Database config and schema.
