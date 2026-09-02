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
components/  UI components (24 + index.ts)
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

**Big Phase 3 — scroll rework, done.** The page composition is now a stack of full-viewport `Section`s. The type scale, overlap offsets and `Container` widths all grew; the navbar became `sticky` with a fixed `h-nav` that `--spacing-viewport` subtracts. Identity was deliberately **not** touched: IBM Plex Serif, the cream/raspberry palette, `OverlapPair` and the four animation patterns all stand. `MediaPlane` now draws a labelled placeholder while photo fields are still null. `build` / `lint` / `typecheck` clean, all 5 routes still static (`○`).

**Navbar pass, after Phase 3.** The band was scaled up in steps (`--spacing-nav` 3.75rem → 5rem), nav links moved from `text-body` to `text-lead`, and `NavLink` gained a CSS hover underline. Details and the two pitfalls it surfaced — token-driven bar height, and Tailwind's silent drop of invalid spacing multipliers — are in `docs/codemap/ui.md`. A scroll-snap plus section-crossing curtain transition was built on `/` during this pass and then **reverted in full** at the user's request; no trace remains in the tree.

**Section transition, attempted a second time and reverted again.** A later session rebuilt it from the reference image the user supplied — a full-screen curtain crossing the two `/` sections, no text, raspberry ground. Four architectures were tried in sequence (scrubbed + mandatory snap → spring-smoothed scrub → timed tween fired on crossing → scrub with a JS settle and no snap) before the user rewound the whole thing. The tree is back to 22 components and `app/page.tsx`, `app/globals.css`, `components/index.ts` and `.claude/rules/ui.md` are byte-identical to their pre-request state. **Why each attempt failed is now recorded in `docs/codemap/ui.md`** — that section, not this line, is what a third attempt should read first.

**Surface pass after Phase 3 — navbar, then `/projects`.** `Container` lost its `default`/`wide`/`full` widths and became full-bleed (`w-full px-16`): it owns the gutter, `max-w-prose` owns the measure. `Card` gained a `bare` variant, `GitHubLink` became a raspberry pill, `TechStack` became a 3×3 vitrine, and the accent split by job (`raspberry-700` fills, `raspberry-400` carries text). `/projects` was then reworked into a full-bleed composition: no `Container`, a bare shell, a 5-column grid at media 3 / text 2, the new `aspect-plate-wide` (16/9) token, and `text-h2` / `text-body`. Details in `docs/codemap/ui.md` and `docs/codemap/routes.md`.

**Big Phase 4 — project detail page, done.** `/projects/[slug]` is the first dynamic segment in the tree and the first use of `generateStaticParams`, `generateMetadata` and `dynamicParams`. Three sections: an `OverlapPair` künye, a 5-column narrative rail with the project's own `TechStack`, and a conditional gallery. `Project` gained `slug` / `body` / `role` / `startDate` / `endDate` / `liveUrl`, plus the `ProjectImage` and `ProjectTech` models. **No database work:** the schema was edited and `prisma generate` run offline; migration and seed roll into 2.6. The locked "only links are clickable" decision was **kept** — `ProjectCard` gained a "Projeyi incele" `TextLink` rather than becoming an anchor. Build shows the three slugs as `●` and the other five routes as `○`.

**Phase 2.6 is blocked, not skipped.** The Docker daemon is not running and there is no `psql`, so PostgreSQL is unreachable. Marked `(Sonra bakılacak)` in `PLAN.md` per the stuck rule. Pages currently read fixtures; 2.6 swaps four function bodies and touches no page code.

### Loose ends

- **(To be checked later)** No PostgreSQL → migration and seed have not been run. Details: `docs/codemap/data.md`.
- **Nothing has been verified visually.** No browser tooling was available, so the checks in `PLAN.md` — overlap at both breakpoints, reveal timing, reduced-motion, JS disabled, 375px, tab focus — are outstanding. Contrast figures throughout the docs are computed, not observed.
- **(To be checked later)** `cn()` silently drops type sizes, and four contrast pairs fail — both measured, neither fixed. Details and the one-place fix: `docs/codemap/ui.md` → the two "Pitfall" sections.
- `config/site.ts` and `config/social.ts` are placeholders; favicon is the Next.js default.
- `next dev` appends the agent-rules block to the end of `CLAUDE.md`. Since it is rewritten on every run, it is not deleted, it is committed.
- `.claude/rules/skills/` (vendored impeccable, 123 files / 2.9 MB) is untracked and undecided. It is excluded from eslint, and no longer reaches Tailwind: `globals.css` now uses `source(none)` plus four explicit `@source` roots, which cut the stylesheet 27,116 → 23,630 bytes (−12.9%).
- `PRODUCT.md` and `DESIGN.md` are written in Turkish while the rest of the docs are English.

### Next up — Phase 2.6

Bring up Postgres (Docker) → `npm run db:migrate` (never `db push`; the first migration now also carries Phase 4's project columns, `project_images` and `project_tech`) → fill `prisma/seed.ts` with real content via `upsert` → replace the four query bodies with Prisma calls against the existing `select` objects → delete `lib/queries/fixtures.ts` → add `app/api/revalidate/route.ts` (POST, `REVALIDATE_SECRET`). Optimized images into `public/images/`; the DB stores paths only.
