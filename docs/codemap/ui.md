# Codemap — UI

Overview → `docs/codemap.md`. Rules → `.claude/rules/ui.md`.

## Theme tokens — `app/globals.css`

Tailwind v4: theme is in the `@theme` block, NO `tailwind.config.ts`.

* **Color:** `page`, `surface` / `surface-media`, `ink` / `-secondary` / `-muted` / `-inverse`, `line` / `-strong`, `raspberry-50/500/600/700`
* **Font:** `--font-serif` → `--font-plex-serif` (next/font, IBM Plex Serif). `latin-ext` subset is mandatory; otherwise ş/ğ/ı/İ fall back to a fallback font.
* **Weight:** only `thin 100`, `light 300`, `normal 400`. `--font-weight-*: initial` namespace reset completely removes `font-bold` / `font-semibold` classes from production.
* **Size:** `caption · small · body · lead · h3 · h2 · h1 · display` (the last three are clamp, they shrink automatically on mobile).
* **Spacing:** `overlap`, `overlap-lg`, `section` (clamp).

### Pitfall: `max-w-prose`

The 62ch value is provided via `--max-width-prose`, not `--container-prose`. Tailwind v4 reads this class from the `--max-width-*` namespace; if `--container-prose` is written, it silently stays at the built-in 65ch.

Note: A token defined in `@theme` but not used in any class is not written to CSS (this is currently the case for `overlap-lg`). Do not think it is missing, it will come in Phase 2.

## Components

### Existing

* `RouteLoading` (Server) · `RouteError` (Client) — route plumbing, see `docs/codemap/routes.md`.

### To be written in Phase 2

**Navbar:** `Navbar` (Server) · `NavLink` (Client; `usePathname`, `aria-current` — the only part of the navbar that needs to be client) · `SocialLinks` (Server, `config/social.ts`) · `MobileMenu` (Client, Radix Dialog).

**Common UI:** `Card` (card shell, `title` is optional) · `OverlapPair` (`media`, `content`, `reverse`; **single** overlap implementation) · `Reveal` (Client; `whileInView` + `once`, because it takes `children`, the Server Components inside it stay on the server) · `PageTransition` (Client, inside `template.tsx`).

**Content (all Server):** `RoadMap` · `TextCard` · `ProjectCard` (2-col / 1-row grid + optional `GitHubLink`) · `GitHubLink` (not rendered at all if no url) · `TechStack` · `StatCard` · `WelcomeSection` · `ProfileImage`.

### Dropped from the list

`App`/`Outlet` (React Router concept; equivalent is `layout.tsx` + file system) · `Layout` (→ `app/layout.tsx`) · `OverlapText` (→ embedded into `OverlapPair`, DRY) · `TechIcons` (→ merged with `TechStack`) · `Image` (`next/image` is used directly).

### Decisions locked in `PLAN.md`

* **`ProjectCard` is not an overlap.** 2-column / 1-row grid, `gap-4`: thumbnail left, brief description + `GitHubLink` right; single column below `md`. `OverlapPair` stays reserved for `/about`.
* **Links are the only clickable surfaces on the site** — GitHub, LinkedIn, Mail. Cards, photos and text blocks are never anchors.
* **`next/image`: `preload`, not `priority`.** Next 16 deprecated `priority`; `.claude/rules/ui.md` was corrected accordingly.
* **The `<noscript>` rule is still missing from `globals.css`.** The UI rules require it before any reveal ships — it lands in Phase 2.1 together with `Reveal`.
* **`LazyMotion features={domAnimation}` is enough for `whileInView`.** The `inView` feature ships inside the `domAnimation` bundle; `domMax` is not needed.

## Static config — `config/`

`site.ts` (name, title, description, url) · `nav.ts` (4 routes, TR label / EN href) · `social.ts` (GitHub, LinkedIn, Email; the `external` flag ensures mailto opens in the same tab). Public API `config/index.ts`.

The icon component is not kept in the config — `SocialLinks` matches via the `key`, so the config remains independent of React.

**(To be checked later)** The name, domain, and profile URLs in `site.ts` and `social.ts` are placeholders. Favicon is still the Next.js default.