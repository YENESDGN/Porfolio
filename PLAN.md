# Big Phase 4 — Plan

## Context

`/projects` renders one full-viewport block per project: cover plate, title, one-paragraph description, and a GitHub pill. That is the whole depth the site has on a project — there is nowhere to say what was built, why, or with what. The list is the terminus.

Phase 4 adds the missing floor: a per-project detail page at `/projects/[slug]`, reached from the list. It ends when a visitor can press a project on `/projects`, land on a case-study page carrying a long narrative, the project's own tech stack, its images and its links, and get back with one press — statically rendered, on fixtures, with the build green.

PostgreSQL is still unavailable, so this phase does **no database work**. `prisma/schema.prisma` is edited and `prisma generate` is run — both work offline — so types keep flowing from Prisma. `migrate` and `seed` roll into the still-blocked Phase 2.6.

## Status

**Phases 4.0–4.4 complete.** `lint` / `typecheck` / `build` clean; the five fixed routes report `○` and `/projects/[slug]` prerenders its three slugs as `●`. The only work left in this phase's scope is the migration and seed, which stay blocked with 2.6 — see "Carried over" below.

## Decisions locked

- **`description` is the card summary; `body` is the new column.** `description` already is a short summary, so no separate `summary` field is added. One concept, one column.
- **The click surface stays a link.** `docs/codemap/ui.md` and `DESIGN.md` lock "cards, photos and text blocks are never anchors". That rule is **kept**: `ProjectCard` gains an explicit "Projeyi incele" text link. The card does not become an anchor and no doc rule is reversed.
- **The project↔tech relation is an explicit join model (`ProjectTech`), not implicit.** An implicit relation table would be `_ProjectToTechStackItem`, which cannot carry `order` and breaks the snake_case `@@map` convention every other table follows.
- **Slugs are written to the data, not derived.** Same reasoning as `order`: the value lives in the row, so no Turkish-transliteration helper is needed and a title can change without breaking a URL.
- **The detail route is fully static.** `generateStaticParams` plus `dynamicParams = false`: the path set is fixed at build, an unknown slug 404s without an on-demand render. Still no `export const revalidate` — refresh stays on-demand.
- **No new visual vocabulary.** No new token, no new shadow, no new animation pattern, no rounded corner. The page is assembled from `Section`, `Container`, `OverlapPair`, `MediaPlane`, `TechStack`, `GitHubLink`, `Reveal`.

## Version facts verified against `node_modules/next/dist/docs`

- `params` is a **Promise** in Next 16 and must be awaited — `01-app/03-api-reference/03-file-conventions/dynamic-routes.md`.
- `generateStaticParams` typing and build-time behaviour — `01-app/03-api-reference/04-functions/generate-static-params.md`. It runs before the page is generated; during `next dev` it is called on navigation.
- `generateMetadata({ params }, parent)` takes the same Promise `params`; the docs point at the `PageProps<'/route'>` helper for typing, which is the idiom `app/layout.tsx` already uses as `LayoutProps<"/">` — `01-app/03-api-reference/04-functions/generate-metadata.md`.
- `dynamicParams` is a route-segment config option and remains available because `next.config.ts` does not enable `cacheComponents`.

## The design

Three stacked `Section`s in the site's existing grammar: `Section` owns height, `Container` owns gutter, full-viewport blocks alternate `bg-page` / `bg-page-deep` so the scroll reads as a transition. Paper over glass; one accent; hierarchy by size, never weight.

**1 — Künye (hero).** `bg-page`, inside `Container`, built with the existing `OverlapPair` — `media` is the cover `MediaPlane` at `aspect-plate-wide`, `content` is the paper block. The site's signature, its single overlap implementation. The paper block carries, in order:

```
← Projeler                     TextLink, text-small, breadcrumb
Proje Adı                      h1, text-h1 text-ink
açıklama paragrafı…            text-lead text-ink-secondary, max-w-prose
Rol · Ocak 2024 — Mart 2024    text-caption text-ink-muted (formatDateRange)
[ GitHub'da gör ]  Canlı site  GitHubLink pill + TextLink, both conditional
```

**2 — Anlatı.** `bg-page-deep`, `Container`, the künye's mirror: the same `OverlapPair` with `reverse`, media from the project's first gallery image, content a `Card` of body paragraphs split on blank lines. Two mirrored overlaps, the alternation `/about` already uses.

**3 — Teknolojiler.** `bg-page`, the project's own `TechStack` under an `h2`; skipped when the project has none.

**4 — Galeri.** `Container`, `ProjectGallery` over `images.slice(1)` — the narrative already spent the first frame, so no image appears twice. `md:grid-cols-2` of `MediaPlane`s at `aspect-plate`, each with an optional caption beneath. Skipped when nothing is left.

Every section is wrapped in `Reveal` with alternating `direction`, matching `/about`.

---

## Phase 4.0 — Write the plan

- Write this plan to `PLAN.md`, replacing the Big Phase 2 body. PLAN.md is the _active_ phase plan; Phase 3 and the surface passes were never written into it and are not retro-written now — they live in `docs/codemap/`.

**Report:** done — active plan on disk.

## Phase 4.1 — Schema and types (no DB)

`prisma/schema.prisma` — extend `Project` with `slug` (unique), `body`, `role`, `startDate`, `endDate`, `liveUrl`, plus `images` and `techStack` relations. Add `ProjectImage` (`project_images`) and `ProjectTech` (`project_tech`), and the two back-relations: `projectImages` on `Media`, `projects` on `TechStackItem`.

`npm run db:generate` — offline, no connection needed. **No `migrate`, no `seed`.**

`lib/queries/projects.ts` — `projectSelect` gains `slug` (the card needs the href). Beside it: `projectDetailSelect` with ordered `images` and `techStack`, the derived `ProjectDetail` type, `getProjectBySlug(slug)` and `getProjectSlugs()`. Both new functions return fixtures today; in 2.6 only their bodies change, against the same `select` objects — the established seam.

`lib/queries/fixtures.ts` — `projectDetailsFixture` becomes the single source for the three projects; `projectsFixture` is **derived from it by a map**, so no content is written twice. Photo fields stay `null` per the existing fixture policy, which keeps `ProjectGallery`'s empty branch on the live path.

`lib/queries/index.ts` — export the two functions and the type.

**Report:** done — schema validated, client generated offline, `getProjectBySlug` / `getProjectSlugs` live behind `lib/queries/index.ts`. No database command was run.

## Phase 4.2 — Components

New, all Server:

- `components/TextLink.tsx` — internal accent link. Reuses the already-approved `NavLink` underline motion verbatim: `raspberry-400` hairline, `origin-right scale-x-0` at rest → `group-hover:origin-left scale-x-100`, label lifts 2px, `motion-reduce:` drops the movement but **keeps** the underline. Plain CSS, not Motion — a pointer state must not cost a re-render. A component rather than repeated classes because it appears in three places (card → detail, detail → back, live-site link). An `external` prop covers `liveUrl` with the same `target`/`rel`/`sr-only` treatment `GitHubLink` uses.
- `components/ProjectHeader.tsx` — the hero paper block: breadcrumb, `h1`, lead, meta line via the existing `formatDateRange`, and the two action links. Each conditional part renders only when its field is non-null — no empty rows.
- `components/ProjectGallery.tsx` — image grid; **returns `null` on an empty list**, matching `RoadMap`, `TechStack` and `GitHubLink`.

Modified: `ProjectCard` gains the "Projeyi incele" `TextLink` above its `GitHubLink`; `components/index.ts` exports the three.

`app/globals.css` is **not** touched — every token the page needs already exists, and no new source root is added, so the `source(none)` + four-`@source` list stays correct.

**Report:** done — `TextLink`, `ProjectHeader`, `ProjectGallery` added and exported; `ProjectCard` carries "Projeyi incele" beside the GitHub pill and is still not an anchor.

## Phase 4.3 — The route

`app/projects/[slug]/` — three files: `page.tsx`, plus the one-line `loading.tsx` and `error.tsx` re-exports every other route uses.

`page.tsx` is a Server Component with `dynamicParams = false`, `generateStaticParams()` from `getProjectSlugs()`, `generateMetadata()` returning the project's title and description (the root layout's `template: "%s — …"` supplies the suffix), and a default async function that awaits `params`, calls `getProjectBySlug`, `notFound()`s on a miss, and renders the three sections.

No route-local `not-found.tsx`: the root `app/not-found.tsx` already renders inside the layout, so the navbar survives. `NavLink` matches with `pathname.startsWith(href)`, so "Projeler" stays `aria-current="page"` on the detail route with no change.

`generateMetadata` and `generateStaticParams` are both **firsts in this repo** — recorded so the next reader does not mistake them for drift.

**Report:** done — all three slugs return 200 with the right title, h1, meta line and links; an unknown slug returns 404; every detail page balances `data-animated` against `opacity:0`.

## Phase 4.4 — Docs

- `docs/codemap.md` — status for Big Phase 4; "Next up" keeps 2.6 and gains the deferred migration.
- `docs/codemap/routes.md` — the new segment, its page→data row, the three first-of-kind APIs, and that the dynamic route reports `●` not `○`.
- `docs/codemap/ui.md` — the three new components, the detail-page composition, and an explicit note that "only links are clickable" was **kept**, not reversed.
- `docs/codemap/data.md` — the two new models, the `description`-as-summary decision, the explicit-vs-implicit m-n rationale, and that migration and seed stay blocked.
- `PRODUCT.md` — **scope amendment.** The Kapsam table gains the detail page and Sınırlar's "İçerik dört sayfayla sınırlı" is corrected to four pages plus one detail route. This is the one place the phase widens the product's stated scope.
- `.claude/rules/ui.md` — the internal accent-link pattern recorded next to the two existing CSS pointer states, so a third is not invented later.

`DESIGN.md` is deliberately left untouched: its frontmatter already describes the retired light palette and reconciling it is its own task.

**Report:** done — codemap (index, routes, ui, data), `PRODUCT.md` scope, and the `TextLink` rule in `.claude/rules/ui.md`.

---

## Carried over — closed

**Faz 2.6 tamamlandı (29-10-2026).** İlk migration (`20261029134652_init`) yerel PostgreSQL 16'ya uygulandı, seed gerçek içerikle iki kez çalıştırıldı ve ikizlenme olmadı; sorgular Prisma'ya döndü, `fixtures.ts` silindi, `/api/revalidate` eklendi. Aşağıdaki not tarihçe olarak duruyor.

~~Faz 2.6 bloke.~~ Docker daemon çalışmıyor ve `psql` yok; PostgreSQL erişilebilir değil. Faz 4 şema değişikliğini yazar ve `prisma generate` çalıştırır, ama migration ve seed çalıştırmaz. Postgres açıldığında 2.6 olduğu gibi işletilir ve bu fazın eklediği `slug` / `body` / `role` / `startDate` / `endDate` / `liveUrl` alanları ile `project_images` ve `project_tech` tabloları aynı ilk migration'a girer. Sayfa kodu değişmeyecek; yalnızca `lib/queries/` gövdeleri Prisma çağrısına dönecek ve `lib/queries/fixtures.ts` silinecek.

## Verification

- `npm run lint`, `npm run typecheck`, `npm run build` clean after every phase.
- Build output: the four static routes plus `/projects/[slug]`. The dynamic segment shows **`●` (SSG, 3 paths prerendered)** — that is the pass condition, not `○`. If it shows `ƒ`, a dynamic API leaked in; fix before continuing.
- `npm run dev`: `/projects` → press "Projeyi incele" on each of the three cards → correct detail page, Door transition fires, "Projeler" stays active in the navbar. Press "← Projeler" → back on the list.
- `/projects/yok-boyle-bir-proje` → not-found page with the navbar intact.
- Scroll the detail page: each section reveals once, not again on scroll-up.
- OS reduced-motion on → sections render in plain state; the `TextLink` underline still appears, only the lift is gone.
- JavaScript disabled → every section fully visible (the `@media (scripting: none)` rule; confirm each new `Reveal` stamps `data-animated`).
- 375px → overlap unstacks, gallery goes single-column, nothing scrolls horizontally.
- Tab through the detail page → focus visible on breadcrumb, both action links and the back link.
- Contrast spot-check: `text-ink-muted` meta on `bg-page`, `text-raspberry-400` links on `bg-surface`.

## Critical files

`prisma/schema.prisma` · `lib/queries/{projects,fixtures,index}.ts` · `components/{TextLink,ProjectHeader,ProjectGallery}.tsx` (new) · `components/{ProjectCard,index}.tsx` · `app/projects/[slug]/{page,loading,error}.tsx` (new) · `PRODUCT.md` · `docs/codemap.md` · `docs/codemap/{routes,ui,data}.md` · `.claude/rules/ui.md`

Reused as-is: `components/{OverlapPair,MediaPlane,TechStack,GitHubLink,Card,Section,Container,Reveal,RouteLoading,RouteError}.tsx` · `lib/formatDate.ts` (`formatDateRange`) · `lib/cn.ts` · `app/globals.css` (no new token, no new `@source`) · `config/`.

Not touched: `DESIGN.md` · `next.config.ts` · any database command.
