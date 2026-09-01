# Codemap — route layer

Overview → `docs/codemap.md`.

## Files

* `app/layout.tsx` — Server. html/body, IBM Plex Serif (`latin`+`latin-ext`), `metadataBase` and title template from `config/site.ts`. (Phase 2) Navbar. No remount on navigation.
* `app/template.tsx` — Client, **Phase 2**. Page transition (Door FadeIn-Up&Down). It is `template`, not `layout`, because the entrance animation needs to trigger on every navigation.
* `app/page.tsx` (LandingPage) · `app/projects/` · `app/about/` · `app/experience/`
* `app/not-found.tsx` — page not found + return to home, Navbar is preserved.
* `loading.tsx` and `error.tsx` in every route.

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

Each page fetches its own data in its Server Component via `lib/queries/`.

* `/` — project count (COUNT), welcome text + photo, tech stack
* `/projects` — published project list (`order`)
* `/about` — about sections (photo+text) + `EDUCATION` roadmap
* `/experience` — experience text blocks + `WORK` roadmap