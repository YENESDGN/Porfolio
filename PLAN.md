# Big Phase 2 — Plan

## Context

Phase 1 delivered a skeleton: theme tokens, Prisma schema, and five statically rendered routes whose pages are placeholder paragraphs. Nothing on screen is real yet — no navbar, no card, no overlap, no animation, no data.

Phase 2 turns the skeleton into the actual site: the components the design canvas calls for, the four pages assembled from them, and the data layer behind them. It ends when all four routes render real content from PostgreSQL, statically, with the four animation patterns in place.

PostgreSQL is not available yet, so the order is **UI first, data last**. To keep that from meaning a rewrite, pages call `lib/queries/` functions from the very first commit; those functions return fixture data now and run Prisma later. The page code never changes.

## Decisions locked

- **Fixtures are a seam, not content.** They live only in `lib/queries/fixtures.ts` and are deleted in 2.6. Pages and components never contain content — they map what a query function returns. This is a deliberate, temporary deviation from "content is not hardcoded", scoped to one file.
- **`ProjectCard` is a 2-column / 1-row grid with `gap-4`** — left column thumbnail, right column brief description. It is **not** `OverlapPair`. `docs/codemap/ui.md` currently says otherwise and gets corrected.
- **Refresh is on-demand only.** No `export const revalidate`. Pages prerender at build; a secret-guarded endpoint calls `revalidatePath` after a content edit.
- **Links are the only clickable surfaces on the site** — GitHub, LinkedIn, Mail. Cards, photos, and text blocks are never anchors, so `ProjectCard` stays plain content with `GitHubLink` inside it.

## Version facts verified against `node_modules/next` and `node_modules/framer-motion`

- `export const revalidate` / `revalidatePath` remain valid — they are removed only when `cacheComponents` is enabled, which `next.config.ts` does not enable.
- **`next/image` `priority` is deprecated in Next 16; `preload` replaces it.** `.claude/rules/ui.md` still says `priority` and must be corrected.
- `LazyMotion features={domAnimation}` is enough for `whileInView` — the `inView` feature ships in the `domAnimation` bundle (`framer-motion/dist/es/motion/features/gestures.mjs`). No `domMax`.
- The generated client exports the `Prisma` namespace, so `Prisma.XGetPayload<{ select: typeof xSelect }>` types work offline, before any DB exists.

---

## Phase 2.0 — Clean tree

- **First action: write this plan to `PLAN.md` at repo root.**
- Commit the eight pending doc/rule edits so Phase 2 lands on a clean base.

## Phase 2.1 — Common UI

- `components/Card.tsx` — Server. Shell for every box: `bg-surface`, padding, optional `title`. No border; separation is by tone.
- `components/OverlapPair.tsx` — Server. Props `media`, `content`, `reverse`. **The only overlap implementation.** DOM order is always media → content; `reverse` flips desktop placement via grid/`order` only. Overlap shift uses the `-mt-overlap` / `overlap-lg` tokens, `md:` and up only; below `md` blocks stack and `gap` carries the rhythm. Arbitrary values are permitted here and nowhere else.
- `components/Reveal.tsx` — Client. `LazyMotion features={domAnimation}` + `m.div`, `whileInView`, `viewport={{ once: true }}`, `useReducedMotion` → renders plain when reduced. Takes `children`, so Server Components placed inside it stay on the server.
- `components/PageTransition.tsx` — Client, Door FadeIn-Up&Down + `app/template.tsx` that wraps `children` in it. Template, not layout — layout does not remount on navigation.
- `app/globals.css` — add the `<noscript>` rule that forces animated elements visible. `.claude/rules/ui.md` mandates it and it is currently missing; without it a JS failure leaves the page blank.
- `components/index.ts` — public API.

**Report:** four primitives, template wired, noscript fallback in place.

## Phase 2.2 — Navbar

- `Navbar` (Server) — page links left, `SocialLinks` top right, `MobileMenu` trigger below `md`.
- `NavLink` (Client) — `usePathname`, `aria-current` on the active route. The only client part of the navbar.
- `SocialLinks` (Server) — reads `config/social.ts`, maps `key` → lucide icon so config stays React-free. `aria-label` on every icon, 44×44 touch target, `target="_blank" rel="noopener noreferrer"` on GitHub/LinkedIn, **nothing** on `mailto:`.
- `MobileMenu` (Client) — Radix Dialog. Icons stay visible on mobile; page links move into the menu.
- Mount in `app/layout.tsx` above `{children}` so `not-found` keeps it.

**Report:** navbar on all five routes, keyboard navigable, mobile menu working.

## Phase 2.3 — Query layer (the seam)

`lib/queries/{landing,projects,about,experience}.ts`, re-exported from `lib/queries/index.ts`. Each file holds:

1. a `select` object,
2. a type derived from it via `Prisma.XGetPayload<{ select: typeof xSelect }>`,
3. a named async function whose body returns fixtures from `lib/queries/fixtures.ts`.

Functions per the page→data mapping in `docs/codemap/routes.md`: project count + welcome text + photo + tech stack; published projects by `order`; about sections + `EDUCATION` roadmap; experience sections + `WORK` roadmap.

**Report:** pages have a typed data gate; only these four bodies change in 2.6.

## Phase 2.4 — Content components

All Server, all consuming query types: `RoadMap` · `TextCard` · `ProjectCard` · `GitHubLink` · `TechStack` · `StatCard` · `WelcomeSection` · `ProfileImage`.

- `GitHubLink` returns `null` when `githubUrl` is null — no empty box.
- `ProjectCard` — `Card` + `grid grid-cols-2 grid-rows-1 gap-4` on `md` and up, single column below. Thumbnail left, description + `GitHubLink` right.
- `ProfileImage` — `next/image` with `preload` (not `priority`), real `sizes`.
- Dates via `Intl.DateTimeFormat` in a pure `lib/` helper. No date package.

**Report:** every content block renders from fixture data in isolation.

## Phase 2.5 — Pages assembled from the canvas

Layouts read off `Obsidian/Diagrams & Notes/Basic-Flow.canvas`:

- `/` — left column `StatCard` ("Projeler + sayısı") over `WelcomeSection` + `TechStack`; right column tall `ProfileImage`. Partial FadeIn-Left&Right&Up.
- `/about` — two `OverlapPair`s with alternating `reverse`, then education `RoadMap` with text beside it.
- `/experience` — tall work `RoadMap` rail left, four `TextCard`s stacked right.
- `/projects` — `ProjectCard` list.

Sections wrap in `Reveal`. Every page ships desktop **and** mobile; single-breakpoint work is not done. `notFound()` where a page's record is missing.

**Report:** four pages match the canvas at both breakpoints, still static.

## Phase 2.6 — Data (last, gated on PostgreSQL)

- Bring up Postgres (Docker), fill `.env` from `.env.example`.
- `npm run db:migrate` — the first migration. Never `db push`.
- Fill `prisma/seed.ts` with real content, `upsert` only, idempotent. Optimized images into `public/images/`; DB stores paths.
- Replace the four query bodies with Prisma calls matching the existing `select` objects. Delete `lib/queries/fixtures.ts`.
- `app/api/revalidate/route.ts` — POST, compares a `REVALIDATE_SECRET` env var, calls `revalidatePath`. Add the key to `.env.example`, never to code. This is the one write-side endpoint; the "no API routes" rule covers reading.
- Correct `.claude/rules/ui.md` (`priority` → `preload`) and `docs/codemap/ui.md` (`ProjectCard` is a grid, not `OverlapPair`).

**If Postgres still is not available:** stop after 2.5, mark 2.6 `(Sonra bakılacak)` per the stuck rule. Pages stay on fixtures and the build stays green.

---

## Verification

- `npm run lint`, `npm run typecheck`, `npm run build` clean after every phase.
- Build output shows all five routes as `○` (static). If any flips to `ƒ`, a dynamic API leaked in — fix before moving on.
- `npm run dev`: navigate all four routes and check the Door transition fires each time; scroll each page and check reveals trigger once, not on scroll-up.
- OS reduced-motion on → animations render as plain state.
- Disable JavaScript → all content visible (the noscript rule).
- Narrow to 375px → overlaps unstack, nothing scrolls horizontally, icon targets stay 44px.
- Tab through the navbar → focus visible, `aria-current` on the active link.
- After 2.6: edit a row in `npm run db:studio`, POST to `/api/revalidate` with the secret, confirm the page shows the new value; POST without the secret → rejected.

## Critical files

`app/layout.tsx` · `app/template.tsx` (new) · `app/globals.css` · `app/{,projects/,about/,experience/}page.tsx` · `components/{Card,OverlapPair,Reveal,PageTransition,Navbar,NavLink,SocialLinks,MobileMenu,RoadMap,TextCard,ProjectCard,GitHubLink,TechStack,StatCard,WelcomeSection,ProfileImage}.tsx` · `lib/queries/*` · `prisma/seed.ts` · `app/api/revalidate/route.ts` (new)

Reused as-is: `lib/cn.ts`, `lib/prisma.ts`, `config/` (`site`, `nav`, `social` via `config/index.ts`), `components/RouteLoading.tsx`, `components/RouteError.tsx`.
