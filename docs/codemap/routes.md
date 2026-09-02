# Codemap — route layer

Overview → `docs/codemap.md`.

## Files

- `app/layout.tsx` — Server. html/body, IBM Plex Serif (`latin`+`latin-ext`), `metadataBase` and title template from `config/site.ts`, and `Navbar` above `{children}` so `not-found` keeps it. Carries no page measure — that is `Container`'s job. No remount on navigation.
- `app/template.tsx` — renders `PageTransition` (Door FadeIn-Up&Down). It is `template`, not `layout`, because the entrance animation has to trigger on every navigation. The navbar sits outside it and stays put.
- `app/page.tsx` (LandingPage) · `app/projects/` · `app/about/` · `app/experience/`
- `app/not-found.tsx` — page not found + return to home, Navbar is preserved.
- `loading.tsx` and `error.tsx` in every route.

## loading / error pattern

Single implementation instead of eight copies: route files re-export the shared component.

```
app/<route>/loading.tsx  →  export { RouteLoading as default } from "@/components";
app/<route>/error.tsx    →  "use client"; export { RouteError as default } from "@/components";

```

`RouteError` is a Client Component (error boundary requirement), `RouteLoading` is Server.

These eight files go through the barrel, not `@/components/RouteError` directly, so `app/` never reaches inside the module. It costs about 1.8 KB per route (0.24% of payload, measured) because the boundary chunk pulls the barrel; no cycle results, since `RouteError` imports `./Container` directly rather than re-entering `index.ts`.

## Render strategy

All five routes are statically prerendered (`○`). Since content changes once a month, the DB is not hit on every request.

**Refresh is on-demand only — no `export const revalidate`.** Pages are prerendered at build and stay frozen until `revalidatePath` is called. Phase 2.6 adds `app/api/revalidate/route.ts` (POST, guarded by a `REVALIDATE_SECRET` env var) as the one write-side endpoint; the "no API routes" rule covers reading only.

`export const revalidate` and `revalidatePath` remain valid in Next 16 because `cacheComponents` is not enabled in `next.config.ts`. Enabling it would remove the route-segment config options.

## Page → data mapping

Each page fetches its own data in its Server Component via `lib/queries/`, then calls `notFound()` when the page record is missing.

- `/` — `getLandingPage()`: project count (COUNT), welcome text + photo, tech stack
- `/projects` — `getPublishedProjects()`: published project list (`order`)
- `/about` — `getAboutPage()`: about sections (photo+text) + `EDUCATION` roadmap
- `/experience` — `getExperiencePage()`: experience text blocks + `WORK` roadmap

## Page composition (Phase 3, scroll rework)

Every page is a stack of `Section`s, each at least one viewport tall. `Section` sets the height, `Container` sets the gutter; a block that should bleed to the page edge takes no `Container` at all.

- `/` — **hero**: no Container, so the portrait bleeds to the right page edge. Left column carries the vertical `site.role` rail (`md` and up), a bare `StatCard`, `WelcomeSection` and the scroll cue, spread with `justify-between`. Reveals run left / up / right — the Partial FadeIn-Left&Right&Up pattern. `WelcomeSection` owns the page's only `text-display`, so the name leads rather than the project count. **Second section**: the welcome text as a `TextCard` beside `TechStack`.
- `/about` — a title section, then one `OverlapPair` per section with alternating `reverse`, then the education `RoadMap` beside a text card on a 5-column grid (3 / 2).
- `/experience` — a title section, then the work `RoadMap` as a rail on the left (2 of 5 columns) with the `TextCard`s stacked on the right (3 of 5). The rail and its texts stay in one section; they read together.
- `/projects` — **one project per section**, no title section and no `Container`: the plate runs to the left page edge and the text column to the right. `py-section` on each `Section` keeps consecutive plates apart — a 3/5-width plate at `aspect-plate` is taller than `min-h-viewport`, which made them butt together with no ground between; `aspect-plate-wide` plus that padding fixes it. An empty list is **not** `notFound()`; only a missing page record is.

Inner page titles use `text-h1`, not `text-display`: display is reserved for the landing hero.

Every block is wrapped in `Reveal`. `/projects` has no page record of its own, so it never calls `notFound()`.
