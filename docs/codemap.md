# Codemap

The single source of truth for architecture and stack. This file is automatically loaded in every session — it is kept lean. Rules are not here → `CLAUDE.md` and `.claude/rules/`.

**Details are in sub-files; they are not auto-loaded, read when necessary:**

| File                     | Content                                                                |
| ------------------------ | ---------------------------------------------------------------------- |
| `docs/codemap/routes.md` | Route layer, loading/error pattern, render strategy, page→data mapping |
| `docs/codemap/ui.md`     | Theme tokens and pitfalls, component list, `config/`                   |
| `docs/codemap/data.md`   | Prisma 7 setup and version pitfall, data model, queries                |

Visual system → `DESIGN.md` at the root (tokens as YAML frontmatter + eight canonical sections, machine-readable sidecar at `.impeccable/design.json`). It answers "what it looks like and why"; this file answers "how it is built".

## Stack

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind v4 · PostgreSQL + Prisma 7 (+ `@prisma/adapter-pg`) · Motion · Radix Dialog (mobile menu only) · lucide-react · sharp.

Deployment: DigitalOcean, self-hosted, `output: "standalone"`, single instance. ISR cache is instance-specific — do not scale horizontally before adding a second instance.

## Folder layout

NO `src/`, everything is in the root. `@/*` alias points to the root.

```
app/         routes, layout, template.tsx, globals.css (theme tokens inside @theme)
components/  UI components (19 + index.ts)
lib/         pure helpers; cn.ts, formatDate.ts, prisma.ts, queries/
config/      static config; site.ts, nav.ts, social.ts (+ index.ts)
prisma/      schema.prisma, seed.ts, migrations/
generated/   Prisma client — generated, in gitignore
public/      images/tech/ (7 marks), images/social/ (3 marks), each with a README
docs/        codemap (+ codemap/), CHANGELOG, sessions
Obsidian/    design source: canvas, diagrams, raw notes
.impeccable/ design.json sidecar — gitignored, feeds impeccable tooling
DESIGN.md    visual system, at root
PLAN.md      active phase plan (Big Phase 2), at root

```

Module public API is exposed via `index.ts`. `lib/` is not a module, but a folder for small helpers — it has no `index.ts`; `lib/queries/` and `config/` carry their own `index.ts` files.

## Status

**Big Phase 1 completed.** Management files, toolchain, theme tokens, Prisma schema, app shell.

**Big Phase 2 completed through 2.5.** Every component exists, all four pages render real content from `lib/queries/`, the four animation patterns are wired. `build` / `lint` / `typecheck` are clean and all 5 routes are still static (`○`).

**Phase 2.6 is blocked, not skipped.** The Docker daemon is not running and there is no `psql`, so PostgreSQL is unreachable. Marked `(Sonra bakılacak)` in `PLAN.md` per the stuck rule. Pages currently read fixtures; 2.6 swaps four function bodies and touches no page code.

### Loose ends

- **(To be checked later)** No PostgreSQL → migration and seed have not been run. Details: `docs/codemap/data.md`.
- **Nothing has been verified visually.** No browser tooling was available, so the checks in `PLAN.md` — overlap at both breakpoints, reveal timing, reduced-motion, JS disabled, 375px, tab focus — are outstanding. Contrast figures throughout the docs are computed, not observed.
- `config/site.ts` and `config/social.ts` are placeholders; favicon is the Next.js default.
- `next dev` appends the agent-rules block to the end of `CLAUDE.md`. Since it is rewritten on every run, it is not deleted, it is committed.
- `.claude/rules/skills/` (vendored impeccable, 123 files / 2.9 MB) is untracked and undecided. It is excluded from eslint; Tailwind still scans it and emits a few unused utilities into the bundle. A `@source not` line in `globals.css` would stop that.
- `PRODUCT.md` and `DESIGN.md` are written in Turkish while the rest of the docs are English.

### Next up — Phase 2.6

Bring up Postgres (Docker) → `npm run db:migrate` (never `db push`) → fill `prisma/seed.ts` with real content via `upsert` → replace the four query bodies with Prisma calls against the existing `select` objects → delete `lib/queries/fixtures.ts` → add `app/api/revalidate/route.ts` (POST, `REVALIDATE_SECRET`). Optimized images into `public/images/`; the DB stores paths only.
