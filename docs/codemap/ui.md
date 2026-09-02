# Codemap — UI

Overview → `docs/codemap.md`. Rules → `.claude/rules/ui.md`.

## Theme tokens — `app/globals.css`

Tailwind v4: theme is in the `@theme` block, NO `tailwind.config.ts`.

- **Color:** `page` / `page-deep`, `surface` / `surface-media`, `ink` / `-secondary` / `-muted` / `-inverse`, `line` / `-strong`, `raspberry-50/400/500/600/700`. Raspberry is split by job: `700` is a fill only (3.4:1 as text on the dark ground, under AA), `400` carries text, links and underlines (4.7:1 on `surface`).
- **Font:** `--font-serif` → `--font-plex-serif` (next/font, IBM Plex Serif). `latin-ext` subset is mandatory; otherwise ş/ğ/ı/İ fall back to a fallback font.
- **Weight:** only `thin 100`, `light 300`, `normal 400`. `--font-weight-*: initial` namespace reset completely removes `font-bold` / `font-semibold` classes from production.
- **Size:** `caption · small · body · lead · h3 · h2 · h1 · display` (the last three are clamp, they shrink automatically on mobile).
- **Spacing:** `overlap` (percentage — 25% of the grid column), `section` (clamp), `nav` (fixed navbar height), `viewport` (`calc(100svh - nav)` — the height every `Section` claims).
- **Shadow:** `contact` — the only shadow in the system. Used solely on `OverlapPair`'s upper block, `md` and up.
- **Aspect:** `portrait` (3/4), `plate` (4/3), `plate-wide` (16/9 — the same width as `plate` at 25% less height; only `ProjectCard` uses it, `plate` stays 4/3 for `/about`). Tokens exist so `MediaPlane` callers never need an arbitrary value.
- **Utility:** `text-vertical` (`writing-mode: vertical-rl`) — an `@utility` block, not a token. Tailwind has no writing-mode utility and arbitrary properties are reserved for `OverlapPair`. Used only by the landing hero rail.

### Pitfall: prose leaks utilities into the bundle

Tailwind scans the whole project by default, and a class name written in prose is indistinguishable from one written in JSX. Rule files and changelog entries quoting `-ml-3` or `-mr-3.25` had those utilities emitted into production CSS even though no component used them.

`globals.css` therefore opens with `@import "tailwindcss" source(none)` and names its four roots explicitly: `../app`, `../components`, `../config`, `../lib`. That cut the stylesheet from 27,116 to 23,630 bytes (−12.9%) and also removed `docs/`, `Obsidian/` and the vendored `.claude/rules/skills/` from the scan. **A new code directory must be added to that list, or its classes silently produce no CSS.**

### Pitfall: `max-w-prose`

The 62ch value is provided via `--max-width-prose`, not `--container-prose`. Tailwind v4 reads this class from the `--max-width-*` namespace; if `--container-prose` is written, it silently stays at the built-in 65ch.

Note: A token defined in `@theme` but not used in any class is not written to CSS. Every token above is now in use.

### The `<noscript>` rule

Motion writes `initial={{ opacity: 0 }}` into the SSR HTML, so a JS failure would leave every animated block invisible. The fallback is `@media (scripting: none)` on `[data-animated]` in `globals.css` — pure CSS, no inline `<style>` and no `no-js` bootstrap script. `Reveal` and `PageTransition` both stamp `data-animated`; the prerendered HTML is checked so that the `data-animated` count equals the `opacity:0` count on every page.

## Components

All exist and are exported from `components/index.ts`. Only four are Client Components.

**Route plumbing:** `RouteLoading` (Server) · `RouteError` (Client) — see `docs/codemap/routes.md`. Both import `./Container` directly rather than the barrel, to avoid a cycle through `index.ts`.

**Layout:** `Container` — full-bleed, `w-full px-16`. It owns the gutter, not the measure: no `max-width`, no centering margin, and line length is held by `max-w-prose` on the text block itself. The `default`/`wide`/`full` width props are gone. `Section` — the single scroll unit: `min-h-viewport` plus vertical `align` (`start`/`center`/`end`). Section owns height, Container owns measure; a block that bleeds to the page edge takes no Container.

**Navbar:** `Navbar` (Server; a full-bleed `bg-surface` paper bar, `sticky top-0` with a fixed `h-nav` height) · `NavLink` (**Client** — `usePathname` and `aria-current`, the only part of the navbar that has to be; also owns the hover rule below) · `SocialLinks` (Server) · `MobileMenu` (**Client**, Radix Dialog).

The band may grow, but only through `--spacing-nav`: `--spacing-viewport` subtracts that token, so every `Section` follows automatically. Give the header a taller height any other way and the first screen overflows the viewport. The token equals the header's vertical padding plus its tallest child — currently `py-3.75` (2 × 15px) plus the 50px `text-lead` links, so `5rem`. The links, not the 48px social circles, set the floor on desktop.

Both flanks now carry the same geometry: a 48px box holding a 36px mark, so the `MobileMenu` trigger matches the `SocialLinks` circles. The negative margins in `Navbar` (`-ml-1.5`, `-mr-1.5`) are **not** scale values: each cancels the 6px padding inside its icon box so the mark lands flush with the `Container` edge. They change only when a child's box or mark size changes, and scaling them alongside everything else breaks the alignment.

**Common UI:** `Card` (shell, optional `title`; `variant` is `surface` (default, `bg-surface p-6 md:p-8`) or `bare`, which drops shell and padding so the caller supplies both — a variant, not a second component) · `OverlapPair` (`media`, `content`, `reverse`; **single** overlap implementation) · `Reveal` (**Client**; `whileInView` + `once`; takes `children` so Server Components inside it stay on the server) · `PageTransition` (**Client**, inside `template.tsx`).

**Content (all Server):** `RoadMap` · `TextCard` · `ProjectCard` (5-col grid, media 3 / text 2 + optional `GitHubLink`) · `GitHubLink` (renders nothing when the url is null; otherwise a `raspberry-700` pill whose label slides left as an `ArrowUpRight` fades in from the right, plus an `sr-only` "yeni sekmede açılır") · `TechStack` (3×3 vitrine: a `bg-surface` plate fades up under each mark on hover and the baseline hairline turns `raspberry-400`) · `StatCard` · `WelcomeSection` · `ProfileImage` · `MediaPlane` · `BrandIcons`.

Phase 4 added three more, all Server: **`TextLink`** — the site's internal accent link; repeats `NavLink`'s underline exactly rather than inventing a third pointer state, and an `external` prop gives it `GitHubLink`'s `target`/`rel`/`sr-only` treatment for an outbound URL. **`ProjectHeader`** — the detail page's künye block; role and date range are joined into one meta line and the whole line, like the links row, is skipped when both fields are null, so no empty row is drawn. **`ProjectGallery`** — image grid that returns `null` on an empty list, matching `RoadMap`, `TechStack` and `GitHubLink`.

Two were added beyond the planned list:

- **`MediaPlane`** — the single glass-plane implementation. `ProfileImage` and `ProjectCard` both use it, so the "photo missing → the plane still stands, no empty box" behaviour exists once. With no photo it draws a labelled placeholder in `ink-secondary` (`ink-muted` is 4.02:1 on `surface-media`, under AA).
- **`BrandIcons`** — see the icon note below.

### Navbar hover: CSS, not Motion

`NavLink` draws a `raspberry-700` hairline that scales in from the left and collects to the right (`origin-right` at rest → `group-hover:origin-left` with `scale-x-0/100`), while the label lifts 2px. `SocialLinks` uses the same idiom for its rising fill. Both are plain CSS transitions rather than Motion: a pointer state should not cost a re-render, and the four Motion patterns cover entrances only. `TextLink` is the third user of the same underline and deliberately adds nothing to it — the rule is one pointer idiom, reused, not a new one per component.

- Tailwind compiles `hover:` inside `@media (hover:hover)`, so touch devices never get a stuck hover state; `group-focus-visible:` stays outside it, so keyboard users get the same affordance everywhere.
- Under `motion-reduce` the lift is dropped and the transition removed, but the underline still appears — the state change stays legible instead of being deleted.
- Nav links are `text-lead`. `raspberry-500` cannot carry them: it is **4.00:1** on `surface`, under AA. `raspberry-700` is 6.43:1.

### Pitfall: quarter-step spacing values

Tailwind 4.3.3 accepts any spacing multiplier that is a multiple of `0.25`, so `py-3.75`, `gap-5.25`, `gap-10.5`, `size-5.5` and `-mr-1.5` are all real utilities, and the navbar depends on them.

A multiplier that is _not_ a multiple of 0.25 (`py-2.625`) is not an error — Tailwind emits no CSS at all and the spacing silently collapses to zero. The same holds for any mistyped variant. When a spacing or state value looks ignored, grep the built stylesheet under `.next/static/chunks/*.css` for the declaration rather than trusting the class name in the source.

### Icons: lucide has no brand marks

lucide-react v1 ships 1796 icons and **zero brand logos**; `Github` and `Linkedin` were removed in that major. Consequences, all deliberate:

- `components/BrandIcons.tsx` holds lucide's own outline GitHub path locally, so `GitHubLink` can tint with `currentColor` inline in text. No second icon package was added.
- Official brand marks are **files**: `public/images/tech/*.svg` (7) and `public/images/social/*.svg` (3), drawn with `next/image` + `unoptimized` (what the Next 16 docs prescribe for vector images).
- **CSS colour cannot reach an `<img>`.** Colour lives inside each file, hover cannot re-tint it, and `brightness-0 invert` is not a workaround — it flattens a multicolour logo into a single blob. Both READMEs record this.
- Brand colour is a scoped exception to the single-accent palette; `DESIGN.md` carries it as The Borrowed Ink Exception.

### Rejected twice: the section-crossing curtain

A full-screen curtain sweeping between the two `/` sections has now been built and reverted in two separate sessions, across five architectures. The reasons are mechanical, not taste, so read this before a third attempt:

- **A scrubbed curtain and `scroll-snap-type: mandatory` cancel each other out.** The boundary is ~760px of scroll (920px viewport, 80px nav). Mandatory snap forbids resting anywhere inside it, so the browser crosses the whole range in a single frame and `scrollYProgress` jumps 0 → 0.83 in one event. The sweep then lasts as long as the browser's snap animation, never as long as the gesture — it reads as a cut.
- **Making it timed moves the problem rather than solving it.** With snap the scroll is atomic, so whatever threshold fires, the user has already arrived; the curtain covers the _new_ section instead of the change. While snap is on, "during the crossing" is not a moment that exists.
- **`scroll-padding-top` stops progress short of 1.** Section 2 snaps to nav height, not the viewport top, so `scrollYProgress` rests at ~0.83. A sweep mapped to `[0, 0.5, 1]` leaves the panel at -83%, i.e. the bottom ~17% of the screen covered for good. Any scroll-linked element on this page has to end its range near 0.8.
- **A curtain must never carry `data-animated`.** The `<noscript>` rule forces `transform: none`, and for a covering panel that _is_ the covering position — the fallback would hide the page rather than reveal it. It needs its own `display: none`, or must not be server-rendered at all.
- `whileInView` cannot observe a `fixed` element; it reads as permanently visible and fires on load. The driver has to be an in-flow marker.
- Nesting a `fixed` child under `PageTransition` is safe: Motion's `buildTransform` emits `transform: none` once every value sits at its default, so the entrance animation leaves no containing block behind.

The only combination that satisfies both "smooth" and "during the crossing" is: no mandatory snap, the curtain scrubbed against a real scroll runway, and a JS settle so stopping mid-band cannot strand a half-closed panel. That was reached and then reverted along with everything else.

### Dropped from the list

`App`/`Outlet` (React Router concept; equivalent is `layout.tsx` + file system) · `Layout` (→ `app/layout.tsx`) · `OverlapText` (→ embedded into `OverlapPair`, DRY) · `TechIcons` (→ merged with `TechStack`) · `Image` (`next/image` is used directly).

### Decisions locked in `PLAN.md`

- **`ProjectCard` is not an overlap.** 5-column grid, media 3 / text 2 (the rail ratio `/about` and `/experience` already use); single column below `md`. It fills a whole `Section` and takes no `Container`, so the plate bleeds to the page edge. Shell is `variant="bare"`, the plate is `aspect-plate-wide`, type sits at `text-h2` / `text-body`, and the title is an `h2` under the page `h1`. `OverlapPair` stays reserved for `/about`.
- **Links are the only clickable surfaces on the site** — GitHub, LinkedIn, Mail. Cards, photos and text blocks are never anchors. **Phase 4 kept this, it did not reverse it.** Reaching `/projects/[slug]` could have been done by wrapping the card in a `Link`; instead `ProjectCard` carries an explicit "Projeyi incele" `TextLink` beside the GitHub pill. The card stays content and the plate stays inert. A card-as-anchor would also have forced the GitHub pill out of the card, since anchors cannot nest.
- **`next/image`: `preload`, not `priority`.** Next 16 deprecated `priority`; `.claude/rules/ui.md` was corrected accordingly.
- **The `<noscript>` rule shipped with `Reveal` in Phase 2.1** and now lives in `globals.css`; see "The `<noscript>` rule" above. Any future animated element must stamp `data-animated` (or carry its own fallback) before it ships.
- **`LazyMotion features={domAnimation}` is enough for `whileInView`.** The `inView` feature ships inside the `domAnimation` bundle; `domMax` is not needed.

## Static config — `config/`

`site.ts` (name, role, title, description, url — `role` labels the landing hero rail) · `nav.ts` (4 routes, TR label / EN href) · `social.ts` (GitHub, LinkedIn, Email; the `external` flag ensures mailto opens in the same tab). Public API `config/index.ts`.

The icon component is not kept in the config — `SocialLinks` matches via the `key`, so the config remains independent of React.

**(To be checked later)** The name, domain, and profile URLs in `site.ts` and `social.ts` are placeholders. Favicon is still the Next.js default.

### Pitfall — `cn()` siler type sizes silently

`tailwind-merge` does not know this project's `@theme` names. `text-lead` is not a
t-shirt size to it, so every unknown `text-*` lands in the **colour** group and the
last one wins:

```
cn("text-lead", "text-ink")        -> "text-ink"          // size gone
cn("text-body", "text-raspberry-400") -> "text-raspberry-400"
```

It only bites when both reach `cn()`; a plain literal `className="text-h1 text-ink"`
is untouched because tailwind-merge never sees it. Currently affected: `NavLink`
renders without `text-lead`, `GitHubLink` and `TextLink` without `text-body`.

Measured with the installed tailwind-merge 3.6.0. The fix is one place —
`extendTailwindMerge` in `lib/cn.ts` registering the eight `--text-*` names under
`font-size` — and it was verified to work without breaking real merges
(`cn("px-2","px-4")`, colour-vs-colour and size-vs-size all still collapse
correctly). **Not applied:** it was written during the reverted palette pass and
went back with it. A new `--text-*` token would need adding to that list too.

### Pitfall — four contrast pairs fail in the shipped palette

Computed over the current tokens, not observed:

| pair                             | ratio  | needs | where                                       |
| -------------------------------- | ------ | ----- | ------------------------------------------- |
| `raspberry-700` on `page`        | 2.00:1 | 4.5   | `app/not-found.tsx:19` return link          |
| `ink-inverse` on `raspberry-700` | 2.34:1 | 4.5   | `components/RouteError.tsx:17` button label |
| `ink-inverse` on `raspberry-600` | 2.89:1 | 4.5   | same button, hover                          |
| `line-strong` on `page`          | 2.72:1 | 3     | `RoadMap` rail                              |

The first three are the same root cause: `raspberry-700` is documented fill-only and
`ink-inverse` is the _dark_ token on this dark ground, so putting one on the other
is two dark values. The accent split by job holds everywhere else; these two files
predate it.

### Project detail page (Phase 4)

`/projects/[slug]` is assembled entirely from existing primitives — no new token, no new shadow, no new animation pattern, no rounded corner, and `globals.css` was not touched. `OverlapPair` carries **both** the künye and the narrative below it, the second with `reverse` so the two read as mirrored halves the way `/about`'s pairs do. The note above that it "stays reserved for `/about`" now means _reserved against a second implementation_, not against a second caller.

The body is one plain-text column in the DB. The page splits it on blank lines into paragraphs, so the formatting decision lives in code and the data stays free of markup. `TextCard` was not used for it: that component renders a single paragraph, and widening it would have changed a component `/about` and `/experience` already depend on.

**The narrative consumes the first gallery image and the gallery renders `images.slice(1)`.** Feeding both from the same array would otherwise print one frame twice — with a single image there is no gallery section at all.

`ProjectGallery` has an empty list in every fixture, because `public/images/` still holds no photography and pointing a fixture at a missing file would ship a broken image. The branch was verified twice by temporarily injecting image rows — once for the grid, the `next/image` fill, the caption-only-when-present rule and the `data-animated` / `opacity:0` balance, and again with three rows to confirm the narrative takes the first frame and the gallery draws only the rest — then reverted. Same standing check as `MediaPlane`'s image branch: it needs real content in 2.6.
