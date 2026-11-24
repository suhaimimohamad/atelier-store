# Atelier Store

Next.js (App Router) + TypeScript + Tailwind CSS, with Better Auth, Drizzle ORM and Postgres on Neon.

## Setup

```bash
npm install
cp .env.example .env.local   # fill in DATABASE_URL and BETTER_AUTH_SECRET
npm run dev
```

`DATABASE_URL` is required at build and run time. The app fails fast if it is missing.

### Database

Products, categories and stock live in Postgres. Set up a fresh database with:

```bash
npm run db:migrate   # create the tables from the SQL in ./drizzle
npm run db:seed      # load the sample catalog (safe to re-run)
```

`npm run build` prerenders product pages from the database, so the database must be migrated and seeded first.

## Project structure

```
src/
  app/
    api/auth/[...all]/route.ts   Better Auth route handler
    layout.tsx, page.tsx         minimal shell
  db/
    index.ts                     Drizzle client (Neon serverless HTTP driver)
    schema/index.ts              schema barrel (no tables yet)
  lib/
    auth.ts                      Better Auth server instance (Drizzle adapter)
    auth-client.ts               Better Auth React client
drizzle.config.ts                drizzle-kit config (reads .env.local)
drizzle/                         generated migrations (created on first generate)
```

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` / `build` / `start` | Next.js |
| `npm run lint` | ESLint |
| `npm run typecheck` | Generate Next route types, then `tsc --noEmit` |
| `npm run auth:generate` | Generate Better Auth tables into `src/db/schema/auth.ts` |
| `npm run db:generate` | Create SQL migrations from the schema |
| `npm run db:migrate` | Apply migrations to the database |
| `npm run db:push` | Push schema directly (prototyping only) |
| `npm run db:studio` | Open Drizzle Studio |
| `npm run db:seed` | Load or refresh the sample catalog |

## Next steps

1. Run `npm run auth:generate`, then add `export * from "./auth";` to `src/db/schema/index.ts`.
2. Run `npm run db:generate && npm run db:migrate` to add the auth tables.
3. Enable sign-in methods in `src/lib/auth.ts` (for example `emailAndPassword` or `socialProviders`).
