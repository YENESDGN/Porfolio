# Codemap — route layer

Overview → `docs/codemap.md`.

## Files

- `app/layout.tsx` — Server. html/body, IBM Plex Serif (`latin`+`latin-ext`), `metadataBase` and title template from `config/site.ts`, and `Navbar` above `{children}` so `not-found` keeps it. Carries no page measure — that is `Container`'s job. No remount on navigation.
- `app/template.tsx` — renders `PageTransition` (Door FadeIn-Up&Down). It is `template`, not `layout`, because the entrance animation has to trigger on every navigation. The navbar sits outside it and stays put.
- `app/page.tsx` (LandingPage) · `app/projects/` · `app/about/` · `app/experience/`
- `app/projects/[slug]/` — the project detail page. The tree's only dynamic segment.
- `app/not-found.tsx` — page not found + return to home, Navbar is preserved.
- `loading.tsx` and `error.tsx` in every route.
- `/` exports no `metadata` on purpose: it takes the layout's `title.default` and `description`. A route-level title would run through the `%s — name` template and double the name.

## loading / error pattern

Single implementation instead of eight copies: route files re-export the shared component.

```
app/<route>/loading.tsx  →  export { RouteLoading as default } from "@/components";
app/<route>/error.tsx    →  "use client"; export { RouteError as default } from "@/components";

```

`RouteError` is a Client Component (error boundary requirement), `RouteLoading` is Server.

These eight files go through the barrel, not `@/components/RouteError` directly, so `app/` never reaches inside the module. It costs about 1.8 KB per route (0.24% of payload, measured) because the boundary chunk pulls the barrel; no cycle results, since `RouteError` imports `./Container` directly rather than re-entering `index.ts`.

## Render strategy

The five fixed routes are statically prerendered (`○`). `/projects/[slug]` is prerendered per slug (`●`) — that is the pass condition for it, not `○`. Since content changes once a month, the DB is not hit on any request.

**Three APIs appear for the first time here, all in `app/projects/[slug]/page.tsx`** — none of them is drift:

- `generateStaticParams()` feeds the slug list from `getProjectSlugs()`.
- `export const dynamicParams = false` fixes the path set at build, so an unknown slug 404s without an on-demand render. Without it the segment would fall back to rendering on request and the route would report `ƒ`.
- `generateMetadata()` supplies a per-project title and description. `params` is a **Promise** in Next 16 and is awaited in both it and the page; typing comes from the global `PageProps<"/projects/[slug]">` helper, the same idiom `app/layout.tsx` uses with `LayoutProps<"/">`.

Those types are generated into `.next/types` by a build. A fresh clone that runs `typecheck` before `build` will fail on `PageProps` with "does not satisfy the constraint `AppRoutes`" — run `npm run build` once first.

**Refresh is on-demand only — no `export const revalidate`.** Pages are prerendered at build and stay frozen until `revalidatePath` is called. `app/api/revalidate/route.ts` (Phase 2.6) is the one write-side endpoint: `POST` with `Authorization: Bearer <REVALIDATE_SECRET>`, compared with `timingSafeEqual`, calls `revalidatePath("/", "layout")` — every page at once, since content changes monthly and the tree is small. 401 on a wrong secret, 500 if the env var is missing. The "no API routes" rule covers reading only. **New slugs still need a rebuild:** `dynamicParams = false` means revalidation refreshes existing project pages but cannot add one.

`export const revalidate` and `revalidatePath` remain valid in Next 16 because `cacheComponents` is not enabled in `next.config.ts`. Enabling it would remove the route-segment config options.

## Page → data mapping

Each page fetches its own data in its Server Component via `lib/queries/`, then calls `notFound()` when the page record is missing.

- `/` — `getLandingPage()`: project count (COUNT), welcome text + photo, tech stack
- `/projects` — `getPublishedProjects()`: published project list (`order`)
- `/about` — `getAboutPage()`: about sections (photo+text) + `EDUCATION` roadmap
- `/experience` — `getExperiencePage()`: experience text blocks + `WORK` roadmap
- `/projects/[slug]` — `getProjectBySlug(slug)`: one project with body, künye, ordered gallery and ordered tech stack. `getProjectSlugs()` feeds `generateStaticParams`. A missing slug **is** `notFound()` here — unlike `/projects`, where an empty list is legal.

## Page composition (Phase 3, scroll rework)

Every page is a stack of `Section`s, each at least one viewport tall. `Section` sets the height, `Container` sets the gutter; a block that should bleed to the page edge takes no `Container` at all.

- `/` — **hero**: no Container, so the portrait bleeds to the right page edge. Left column carries the vertical `site.role` rail (`md` and up), a bare `StatCard`, `WelcomeSection` and the scroll cue, spread with `justify-between`. Reveals run left / up / right — the Partial FadeIn-Left&Right&Up pattern. `WelcomeSection` owns the page's only `text-display`, so the name leads rather than the project count. **Second section**: the welcome text as a `TextCard` beside `TechStack`.
- `/about` — a title section, then one `OverlapPair` per section with alternating `reverse`, then the education `RoadMap` beside a text card on a 5-column grid (3 / 2).
- `/experience` — a title section, then the work `RoadMap` as a rail on the left (2 of 5 columns) with the `TextCard`s stacked on the right (3 of 5). The rail and its texts stay in one section; they read together.
- `/projects` — **one project per section**, no title section and no `Container`: the plate runs to the left page edge and the text column to the right. `py-section` on each `Section` keeps consecutive plates apart — a 3/5-width plate at `aspect-plate` is taller than `min-h-viewport`, which made them butt together with no ground between; `aspect-plate-wide` plus that padding fixes it. An empty list is **not** `notFound()`; only a missing page record is.

Inner page titles use `text-h1`, not `text-display`: display is reserved for the landing hero.

Every block is wrapped in `Reveal`. `/projects` has no page record of its own, so it never calls `notFound()`.

## Project detail composition (Phase 4)

Three `Section`s, alternating ground so the scroll reads as a transition:

1. **Künye** — `Container` + `OverlapPair`: the cover `MediaPlane` at `aspect-plate-wide` under a `ProjectHeader` paper block carrying the "← Projeler" breadcrumb, `text-h1` title, `text-lead` description, a `text-caption text-ink-muted` meta line (role · `formatDateRange`), and the action links. This is the site's signature reused, not a second overlap implementation.
2. **Anlatı** — `bg-page-deep`, the künye's mirror: the same `OverlapPair` with `reverse`, so the plate sits on the opposite side. Media is the project's **first** gallery image, content is a `Card` of body paragraphs. The body is one plain-text column in the DB; the page splits it on blank lines, so formatting lives in code and the data stays free of markup. Two mirrored overlaps, the same alternation `/about` uses.
3. **Teknolojiler** — the project's own `TechStack` under an `h2`, skipped when the project has none.
4. **Galeri** — `ProjectGallery` over `images.slice(1)`: the narrative already spent the first frame, so the gallery draws the rest and no image appears twice. With one image there is no gallery at all, since `ProjectGallery` returns `null` on an empty list.

Grounds alternate `page` → `page-deep` → `page` → `page-deep`. Sections 3 and 4 are both data-dependent, so the gallery reads the tech section's presence to pick its ground; otherwise a project with no tech stack would put two deep grounds side by side and erase the transition.

`NavLink` matches with `pathname.startsWith(href)`, so "Projeler" keeps `aria-current="page"` on a detail route with no change. There is no route-local `not-found.tsx`: the root one already renders inside the layout, so the navbar survives.
