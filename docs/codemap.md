# Codemap

The single source of truth for architecture and stack. This file is automatically loaded in every session — it is kept lean. Rules are not here → `CLAUDE.md` and `.claude/rules/`.

**Details are in sub-files; they are not auto-loaded, read when necessary:**

| File | Content |
| --- | --- |
| `docs/codemap/routes.md` | Route layer, loading/error pattern, render strategy, page→data mapping |
| `docs/codemap/ui.md` | Theme tokens and pitfalls, component list, `config/` |
| `docs/codemap/data.md` | Prisma 7 setup and version pitfall, data model, queries |

## Stack

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind v4 · PostgreSQL + Prisma 7 (+ `@prisma/adapter-pg`) · Motion · Radix Dialog (mobile menu only) · lucide-react · sharp.

Deployment: DigitalOcean, self-hosted, `output: "standalone"`, single instance. ISR cache is instance-specific — do not scale horizontally before adding a second instance.

## Folder layout

NO `src/`, everything is in the root. `@/*` alias points to the root.

```
app/         routes, layout, globals.css (theme tokens inside @theme)
components/  UI components
lib/         pure helpers; cn.ts, prisma.ts, queries/
config/      static config; site.ts, nav.ts, social.ts (+ index.ts)
prisma/      schema.prisma, seed.ts, migrations/
generated/   Prisma client — generated, in gitignore
public/      images under images/
docs/        codemap (+ codemap/), CHANGELOG, sessions
Obsidian/    design source: canvas, diagrams, raw notes
PLAN.md      active phase plan (Big Phase 2), at root

```

Module public API is exposed via `index.ts`. `lib/` is not a module, but a folder for small helpers — it has no `index.ts`; `lib/queries/` and `config/` carry their own `index.ts` files.

## Status

**Big Phase 1 completed.** Management files, toolchain, theme tokens, Prisma schema, app shell (placeholder pages). `build` / `lint` / `typecheck` are clean, all 5 routes are static.

**Big Phase 2 planned, not started.** The plan lives at `PLAN.md` in the root; the decisions locked there are already reflected in the sub-files.

### Loose ends

* **(To be checked later)** No PostgreSQL → migration and seed have not been run. Details: `docs/codemap/data.md`.
* `config/site.ts` and `config/social.ts` are placeholders; favicon is the Next.js default.
* `next dev` appends the agent-rules block to the end of `CLAUDE.md`. Since it is rewritten on every run, it is not deleted, it is committed.
* **`impeccable` ^3.6.0 sits in `dependencies`.** It is design tooling (`.claude/rules/skills/impeccable/`), it is not on the approved list in `CLAUDE.md`, and a production dependency ships into the standalone Docker image. Move it to `devDependencies` or drop it.

### Next up — Big Phase 2

2.0 clean tree → 2.1 common UI (`Card`, `OverlapPair`, `Reveal`, `PageTransition` + `template.tsx`, the missing `<noscript>` rule) → 2.2 Navbar quartet → 2.3 `lib/queries/` with the fixture seam → 2.4 content components → 2.5 pages assembled from the canvas → 2.6 PostgreSQL, first migration, seed, real query bodies, revalidate endpoint.

The order is UI-first / data-last because PostgreSQL is not available yet; pages are built against fixtures behind `lib/queries/` so the database step swaps four function bodies instead of rewriting pages. Details in `PLAN.md`.
