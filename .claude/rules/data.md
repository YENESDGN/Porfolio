---
description: Data layer rules — Prisma usage, schema, content entry
globs: ["prisma/**", "lib/prisma.ts", "lib/queries/**"]
---

# Data layer rules

## Prisma usage

- **Only on the server.** NO `@prisma/client` import in Client Components. A stray import can leak into the bundle without breaking the build.
- **Single client instance.** `globalThis` singleton in `lib/prisma.ts`; in dev, hot reload opens a new connection on every refresh, exhausting the pool.
- **Do not write API routes.** The Server Component issues the query directly. Do not create an `app/api` folder for reading — it adds an unnecessary HTTP hop in between.
- **Queries in one place.** All Prisma calls are inside `lib/queries/`, as named functions; exposed externally via `lib/queries/index.ts`. No bare `prisma.x.findMany` inside the component. The component knows what it asks for, not how it is asked.
- **Prisma is the source of types.** Use generated types; do not redefine the same shape manually.
- **Select only what is needed.** Select fields with `select`; do not fetch the whole row and discard half of it.
- `DATABASE_URL` is only in the env. `.env` is not committed, `.env.example` is.

## Schema

- Model names are PascalCase, table names are snake_case (`@@map`) — table names in the schema notes are preserved.
- Schema changes via migration. No committed change is applied with `db push`.
- Optional fields (like `githubUrl`) are truly `nullable` in the schema; if missing, the relevant part is not rendered, an empty box is not left.
- Sorting is written to the data (`order` field). Do not reorder the array in code.
- Image fields hold the path under `public/` (`/images/projects/x.webp`), not the file itself. Binaries do not go into the DB.
- The length limit of text fields is determined by the layout; a roadmap description and a project description do not fit in the same box.

## Content entry

- Content is entered via Prisma Studio or `prisma/seed.ts`. It is not scattered manually into SQL files. The seed runs with `tsx`; in Prisma 7 the command is defined in `prisma.config.ts` under `migrations.seed` — the `prisma.seed` field in `package.json` is no longer read.
- The seed must be idempotent (`upsert`); running it twice does not duplicate the content.
- After content is updated, the relevant route is revalidated, otherwise the static page continues to show the old state.
