---
description: UI rules — style, color, typography, layout, animation, imagery, accessibility
globs: ["components/**", "app/**", "config/**"]
---

# UI rules

## Style

- Tailwind v4. No separate CSS files or inline `style`; the only exception is `app/globals.css`.
- **Tokens are in the `@theme` block inside `app/globals.css`.** NO `tailwind.config.ts` — in v4, the theme is defined in CSS. Do not write bare values like `#1e293b` in the component.
- Arbitrary values (`w-[437px]`) are only for overlap calculations and only inside `OverlapPair`. If you see one elsewhere, a token is missing. A property Tailwind has no utility for (`writing-mode`) is added as an `@utility` block in `globals.css`, not as an arbitrary property.
- Conditional classes are merged with `cn()` in `lib/cn.ts` (`clsx` + `tailwind-merge`); do not construct classes with template strings. `tailwind-merge` cleans up conflicting classes: `px-2 px-4` → `px-4`.
- Class order is maintained by `prettier-plugin-tailwindcss`. Do not order them manually.
- Mobile-first: base class is mobile, `md:` and above is desktop.

## Colors

The palette is defined as tokens inside `@theme`. Do not write bare hex values.

- Background `bg-page`, card `bg-surface`, image block `bg-surface-media`. Overlap is perceived through the difference of these three tones; do not add borders.
- Text hierarchy is established with color: heading `text-ink`, body `text-ink-secondary`, date and note `text-ink-muted`.
- `text-ink-muted` is used only with 300 and 400 weights. Combined with 100, the contrast falls below AA.
- **Raspberry is split in two.** `raspberry-500` is for decorative fill; it does not carry text on top (4.3:1 with white text, below AA). `raspberry-700` is used for text, links, and badge backgrounds.
- There is only one accent color on the site. Ask before adding a second vibrant color.

## Typography

- Single font: IBM Plex Serif, loaded with `next/font`, bound via the `--font-plex-serif` variable.
- **There are only three weights: 100, 300, 400.** DO NOT USE `font-medium`, `font-semibold`, `font-bold` — they are not loaded, the browser will synthesize faux-bold and it looks obvious on a serif. The `--font-weight-*: initial` reset in `@theme` completely removes these classes; they will not work if you write them.
- Hierarchy is established with size, spacing, and color, not weight.
- Size tokens: `text-display`, `text-h1`, `text-h2`, `text-h3`, `text-lead`, `text-body`, `text-small`, `text-caption`. Do not write bare `text-[28px]`.
- `display`, `h1`, and `h2` are defined with clamp; they shrink automatically on mobile. Do not write `md:text-*` additionally for these three.
- `text-display` belongs to the landing hero alone (`WelcomeSection`). Inner page titles use `text-h1`; it clamps to 4.5rem and is already large.
- Long text blocks are constrained with `max-w-prose` (62ch). Serif line length becomes unreadable beyond this.
- If a new weight is needed, ask. Every weight means an additional font file and payload.

## Spacing

- Vertical rhythm belongs to `Section`, not to the page: it carries `min-h-viewport` (`100svh` minus the navbar) plus its own padding. `py-section` remains for blocks that are not a full screen.
- `--spacing-viewport` reads `svh`, not `vh`: mobile browser chrome must not clip a section.
- Overlap shift is given with the `overlap` and `overlap-lg` tokens (e.g., `-mt-overlap`); do not write negative margin values manually.
- The rest of the spacing is Tailwind's default 4px scale.

## Layout and responsive

- **The page is a scroll composition.** Every block is a `Section`: at least one viewport tall, stacked. `Section` owns height and vertical alignment, `Container` owns measure — one wraps the other, they are not merged.
- `Container` has three widths: `default` (max-w-5xl, prose-scale blocks), `wide` (max-w-7xl, full-screen sections), `full` (gutter only). A block that has to bleed to the page edge takes no Container at all.
- The overlap effect is the visual identity of the site and the first thing to break on a narrow screen. Overlap is only on `md` and above; below that, blocks stack vertically.
- **DOM order is fixed: image first, then text.** The `reverse` prop only changes the placement on desktop (CSS `order`/grid), it does not touch the DOM. Thus, mobile stacking and screen reader order remain the same everywhere.
- On mobile, the overlap is removed but the spacing remains; the rhythm between blocks is carried by `gap`.
- A new section is delivered with both desktop and mobile. Single-breakpoint work is not considered complete.

## Navbar and external links

- The navbar consists of two parts: page links on the left, icon group on the top right (`SocialLinks`) — GitHub, LinkedIn, Email. Both are in `config/`, not in the DB.
- The navbar is `sticky top-0` and its height is fixed to `h-nav`. The height is fixed because `--spacing-viewport` subtracts it; a growing band would push every first screen past the viewport.
- GitHub and LinkedIn go external: `target="_blank"` + `rel="noopener noreferrer"`.
- **Email behaves differently.** Do not give `target="_blank"` to a `mailto:` link; it opens an empty tab and leaves it behind. It stays in the same tab, the OS opens the client.
- **Icon only = no visible text.** `aria-label` is mandatory on every icon link. Tooltips are not a substitute for accessibility.
- Touch target on mobile is at least 44×44px; the click area does not shrink while the icon shrinks.
- Icons are imported individually from `lucide-react` (`import { Github } from "lucide-react"`). Do not add a second icon package.
- If they don't fit on mobile, icons stay, page links move to the menu — communication is one touch away on every screen.
- Mobile menu is built on `@radix-ui/react-dialog`. Do not write focus trap, Escape, scroll lock, and aria bindings manually; it is harder than it looks.

## Animations

Motion (formerly Framer Motion) + IntersectionObserver. Package name is `motion`, import via `motion/react`. Do not install the `framer-motion` package — it still works but is not actively developed.

Do not deviate from the four defined patterns; if a new animation is needed, ask. Door FadeIn-Left&Right → content transitions. Door FadeIn-Up&Down → navbar page transitions. Partial FadeIn-Left&Right&Up → LandingPage. Scroll reveal → content sections appear as they enter the viewport.

**The four patterns describe entrances only.** Pointer and focus states are not among them and are not Motion: they are plain CSS transitions, because a hover should not cost a re-render. Two exist — the `SocialLinks` fill rising from below, and the `NavLink` underline that wipes in from the left and collects to the right. A new one conforms to those two rather than reaching for Motion. Every such state carries `motion-reduce:` handling that drops the movement but **keeps** the state change visible; removing the feedback entirely is not reduced motion.

### Delegation

- **Everything animated is Motion.** `whileInView` + `viewport={{ once: true }}` is sufficient for scroll reveal; do not write your own observer for it. Motion's `whileInView` already uses IntersectionObserver.
- **Your own `useInView` hook is only for non-animation tracking.** (Like triggering something other than an animation when a section becomes visible.) There is no such need currently; if it arises, it goes into `lib/hooks/`.
- Do not overlap the two for the same job; if two observers are watching the same element, one is redundant.

### Mandatory rules

- **Content is visible by default.** Motion writes the `initial={{ opacity: 0 }}` value to the SSR HTML; if JS doesn't arrive, the content remains invisible. The `<noscript>` rule in `globals.css` compensates for this: when JS is absent, animated elements become fully visible. No reveal is added without this fallback.
- Reveal triggers once (`viewport={{ once: true }}`). It does not replay when scrolling up and down.
- **Page transitions via `app/template.tsx`.** `layout.tsx` does not remount on navigation, the entrance animation is not triggered.
- `prefers-reduced-motion` is checked in every animated component with `useReducedMotion`; if reduced, the component reverts to its plain state.
- Only `transform` and `opacity` animation. NO animation of layout-shifting properties (width, height, top, left).
- `LazyMotion` + `m` component is used; a full `motion` import adds unnecessary load to the bundle.
- Motion requires a Client Component. The animation stays on the leaf, it does not turn the page into a client component.

## Imagery

- Images are in the repo under `public/images/`. DB only holds the path (`/images/projects/x.webp`).
- Optimized files go into the repo; not raw JPEGs straight from a phone. Images are resized and compressed before entering the repo.
- All images are `next/image`. No raw `<img>`.
- `alt` is mandatory; `alt=""` for decorative images.
- Photo fields are nullable and many are still null. `MediaPlane` draws a labelled placeholder in that case — the plate is never left as an empty block. The label uses `ink-secondary`: `ink-muted` measures 4.02:1 on `surface-media` and fails AA.
- `preload` on above-the-fold images, default lazy behavior on the rest. Next 16 deprecated `priority` in favor of `preload`; do not write `priority` in new code.
- `sizes` reflects the actual display width; do not make mobile download the desktop width.

## Accessibility

- Navbar is keyboard navigable; `aria-current` on the active page.
- If visual order and DOM order conflict in the overlap, the DOM order preserves the reading logic.
- Contrast AA. IBM Plex Serif contrast drops in thin weights (100, 300); avoid the small font + Thin combination.
