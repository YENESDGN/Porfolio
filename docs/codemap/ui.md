# Codemap — UI

Overview → `docs/codemap.md`. Rules → `.claude/rules/ui.md`.

## Theme tokens — `app/globals.css`

Tailwind v4: theme is in the `@theme` block, NO `tailwind.config.ts`.

- **Color:** `page`, `surface` / `surface-media`, `ink` / `-secondary` / `-muted` / `-inverse`, `line` / `-strong`, `raspberry-50/500/600/700`
- **Font:** `--font-serif` → `--font-plex-serif` (next/font, IBM Plex Serif). `latin-ext` subset is mandatory; otherwise ş/ğ/ı/İ fall back to a fallback font.
- **Weight:** only `thin 100`, `light 300`, `normal 400`. `--font-weight-*: initial` namespace reset completely removes `font-bold` / `font-semibold` classes from production.
- **Size:** `caption · small · body · lead · h3 · h2 · h1 · display` (the last three are clamp, they shrink automatically on mobile).
- **Spacing:** `overlap`, `overlap-lg`, `section` (clamp).
- **Shadow:** `contact` — the only shadow in the system. Used solely on `OverlapPair`'s upper block, `md` and up.
- **Aspect:** `portrait` (3/4), `plate` (4/3). Tokens exist so `MediaPlane` callers never need an arbitrary value.

### Pitfall: `max-w-prose`

The 62ch value is provided via `--max-width-prose`, not `--container-prose`. Tailwind v4 reads this class from the `--max-width-*` namespace; if `--container-prose` is written, it silently stays at the built-in 65ch.

Note: A token defined in `@theme` but not used in any class is not written to CSS. Every token above is now in use.

### The `<noscript>` rule

Motion writes `initial={{ opacity: 0 }}` into the SSR HTML, so a JS failure would leave every animated block invisible. The fallback is `@media (scripting: none)` on `[data-animated]` in `globals.css` — pure CSS, no inline `<style>` and no `no-js` bootstrap script. `Reveal` and `PageTransition` both stamp `data-animated`; the prerendered HTML is checked so that the `data-animated` count equals the `opacity:0` count on every page.

## Components

All exist and are exported from `components/index.ts`. Only four are Client Components.

**Route plumbing:** `RouteLoading` (Server) · `RouteError` (Client) — see `docs/codemap/routes.md`. Both import `./Container` directly rather than the barrel, to avoid a cycle through `index.ts`.

**Layout:** `Container` — the single definition of the page measure (`mx-auto w-full max-w-5xl px-6`). `header` and `main` are full-bleed and each wraps its content in one. Nothing else declares a `max-width`.

**Navbar:** `Navbar` (Server; a full-bleed `bg-surface` paper bar) · `NavLink` (**Client** — `usePathname` and `aria-current`, the only part of the navbar that has to be) · `SocialLinks` (Server) · `MobileMenu` (**Client**, Radix Dialog).

**Common UI:** `Card` (shell, optional `title`) · `OverlapPair` (`media`, `content`, `reverse`; **single** overlap implementation) · `Reveal` (**Client**; `whileInView` + `once`; takes `children` so Server Components inside it stay on the server) · `PageTransition` (**Client**, inside `template.tsx`).

**Content (all Server):** `RoadMap` · `TextCard` · `ProjectCard` (2-col grid + optional `GitHubLink`) · `GitHubLink` (renders nothing when the url is null) · `TechStack` · `StatCard` · `WelcomeSection` · `ProfileImage` · `MediaPlane` · `BrandIcons`.

Two were added beyond the planned list:

- **`MediaPlane`** — the single glass-plane implementation. `ProfileImage` and `ProjectCard` both use it, so the "photo missing → the plane still stands, no empty box" behaviour exists once.
- **`BrandIcons`** — see the icon note below.

### Icons: lucide has no brand marks

lucide-react v1 ships 1796 icons and **zero brand logos**; `Github` and `Linkedin` were removed in that major. Consequences, all deliberate:

- `components/BrandIcons.tsx` holds lucide's own outline GitHub path locally, so `GitHubLink` can tint with `currentColor` inline in text. No second icon package was added.
- Official brand marks are **files**: `public/images/tech/*.svg` (7) and `public/images/social/*.svg` (3), drawn with `next/image` + `unoptimized` (what the Next 16 docs prescribe for vector images).
- **CSS colour cannot reach an `<img>`.** Colour lives inside each file, hover cannot re-tint it, and `brightness-0 invert` is not a workaround — it flattens a multicolour logo into a single blob. Both READMEs record this.
- Brand colour is a scoped exception to the single-accent palette; `DESIGN.md` carries it as The Borrowed Ink Exception.

### Dropped from the list

`App`/`Outlet` (React Router concept; equivalent is `layout.tsx` + file system) · `Layout` (→ `app/layout.tsx`) · `OverlapText` (→ embedded into `OverlapPair`, DRY) · `TechIcons` (→ merged with `TechStack`) · `Image` (`next/image` is used directly).

### Decisions locked in `PLAN.md`

- **`ProjectCard` is not an overlap.** 2-column / 1-row grid, `gap-4`: thumbnail left, brief description + `GitHubLink` right; single column below `md`. `OverlapPair` stays reserved for `/about`.
- **Links are the only clickable surfaces on the site** — GitHub, LinkedIn, Mail. Cards, photos and text blocks are never anchors.
- **`next/image`: `preload`, not `priority`.** Next 16 deprecated `priority`; `.claude/rules/ui.md` was corrected accordingly.
- **The `<noscript>` rule is still missing from `globals.css`.** The UI rules require it before any reveal ships — it lands in Phase 2.1 together with `Reveal`.
- **`LazyMotion features={domAnimation}` is enough for `whileInView`.** The `inView` feature ships inside the `domAnimation` bundle; `domMax` is not needed.

## Static config — `config/`

`site.ts` (name, title, description, url) · `nav.ts` (4 routes, TR label / EN href) · `social.ts` (GitHub, LinkedIn, Email; the `external` flag ensures mailto opens in the same tab). Public API `config/index.ts`.

The icon component is not kept in the config — `SocialLinks` matches via the `key`, so the config remains independent of React.

**(To be checked later)** The name, domain, and profile URLs in `site.ts` and `social.ts` are placeholders. Favicon is still the Next.js default.
