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
app/<route>/loading.tsx  →  export { default } from "@/components/RouteLoading";
app/<route>/error.tsx    →  "use client"; export { default } from "@/components/RouteError";

```

`RouteError` is a Client Component (error boundary requirement), `RouteLoading` is Server.

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

## Page composition (Phase 2.5, off the canvas)

- `/` — two columns. Left: `StatCard` over `WelcomeSection` + `TechStack`. Right: a tall `ProfileImage`. Reveals run left / up / right — the Partial FadeIn-Left&Right&Up pattern. `WelcomeSection` owns the page's only `text-display`, so the name leads rather than the project count.
- `/about` — two `OverlapPair`s with alternating `reverse`, then the education `RoadMap` beside a text card, on a 5-column grid (3 / 2).
- `/experience` — the work `RoadMap` as a rail on the left (2 of 5 columns), four `TextCard`s stacked on the right (3 of 5).
- `/projects` — a `ProjectCard` list, plus an empty state. An empty list is **not** `notFound()`; only a missing page record is.

Every section is wrapped in `Reveal`. `/projects` has no page record of its own, so it never calls `notFound()`.
