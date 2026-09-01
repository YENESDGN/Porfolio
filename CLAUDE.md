# Project rules and delegation

Claude Code automatically loads this file in every session. Keep it lean. Main session = coordinator: YOU operate the delegation gate below.

**Project:** Personal portfolio site. 4 pages, highly visual, single user flow. Next.js + TypeScript + Tailwind, PostgreSQL + Prisma, self-hosted on DigitalOcean. UI texts are in Turkish, routes are in English. Content is in DB, updated manually; NO writing interface. Architecture and stack are NOT REPEATED here → `docs/codemap.md`.

**NO `src/`.** Root layout: `app/`, `components/`, `lib/`, `config/`, `prisma/`, `public/`. Import alias `@/*` points to the root (`@/lib/cn`, `@/config/nav`).

## Universal rules

* Changes must be small and single-purpose; one commit = one logical change.
* Do not invent new patterns; search for the existing pattern first and conform to it.
* Secrets/keys/tokens are never written to code or logs.
* Do not assume a rule you don't know the reason for, ask.

## Code paradigm

* **Functional.** No classes. Side effects only in React components.
* **Pure helpers** in `lib/`; NO React or DOM imports.
* **DRY — single implementation rule.** This project repeats the same visual structure multiple times. Each is a SINGLE component, a second one is not created: overlap → `OverlapPair` (direction difference via `reverse` prop), card shell → `Card`, roadmap → `RoadMap`. If a new section cannot be built with these, ask first.
* **Content is not hardcoded.** Project list, roadmap items, page texts, tech stack → DB. The component maps the data, it does not contain it.
* **Content and config are in separate places.** Changing content is in DB; static config (social links, navbar route list, site name) is in a TypeScript file under `config/`. Do not create a table for a two-line constant.
* **Do not set up a store.** There is no shared client state on this site. Data comes from the server, state is either in the router or the component itself. If a real need arises (theme, mobile menu), add it then and write the justification in the codemap.
* **Free use of props.** Fetch data on the server, pass it down as props; there is no prop drilling problem.
* **Modular.** Each module has an `index.ts` public API; modules look at each other's `index.ts`, not inside each other.

## Data layer

Content is in PostgreSQL, read with Prisma. Details → `.claude/rules/data.md`. Three universal rules:

* **Prisma only on the server.** NO `@prisma/client` import in Client Components.
* **Queries in `lib/queries/`.** No bare Prisma calls in components.
* **Do not create API routes for reading.** Server Components query directly.

## UI

Tailwind v4, IBM Plex Serif, overlap layout, four animation patterns. Details → `.claude/rules/ui.md`. Three universal rules:

* **Tokens in the `@theme` block in `app/globals.css`.** Tailwind v4 is used; there is NO `tailwind.config.ts` file, do not create one.
* **Font weights are limited to 100, 300, 400.** DO NOT USE `font-bold` and `font-semibold`; they are not loaded and are not generated as classes due to the reset in `@theme`.
* **Overlap in a single component:** `OverlapPair`. Do not create a second overlap implementation.

## Packages

Listed packages are approved. Ask before adding a new dependency — every package means maintenance burden and bundle size.

**Core:** next, react, typescript, tailwindcss, prisma + @prisma/client, motion (formerly framer-motion; import `motion/react`), sharp. **Helper:** clsx + tailwind-merge (`cn()`), lucide-react (icons), @radix-ui/react-dialog (mobile menu only), tsx (seed runner). **Dev:** eslint-config-next, prettier + prettier-plugin-tailwindcss.

`sharp` is not optional: image optimization with `output: "standalone"` will not work without it. It is installed separately in the runner layer in Docker — do not trust the installation on the build machine, architecture mismatch will crash in production.

DO NOT ADD — no use case in this project:

* Client data fetching (TanStack Query, SWR, axios): data arrives in Server Components.
* Global state (zustand, redux): no shared client state.
* Form library: there are no forms on the site.
* Ready-made component kit (shadcn/ui, MUI): `Card` and `OverlapPair` are custom to this project; a kit brings its own `Card` and breaks the DRY rule.
* Date library: `Intl.DateTimeFormat` is sufficient for roadmap dates.
* i18n: single language for now.

## Next.js

* Server Components by default. `"use client"` only when strictly necessary: animations, scroll observation, mobile menu.
* `"use client"` is placed on the **leaf**, not at the top of the page. Do not turn the whole page into a client component because of one animation.
* **Pages are statically rendered.** Content changes once a month; do not hit the DB on every request. Refresh with `revalidate`, on-demand revalidate manually after updates. Ask before adding anything that makes the page dynamic.
* **Self-hosted assumption:** `output: "standalone"`, single instance. ISR cache is instance-specific; if a second instance is added, cache is not shared, do not scale horizontally before that decision is made. Do not use Vercel-specific APIs.
* `loading.tsx` and `error.tsx` exist in every route. They are rarely seen in static rendering; yet, they are never left out.
* Content with no record → `notFound()`. Do not render an empty page.
* Internal navigation via `next/link`. `<a href>` only for external links.
* Page title and description via Metadata API; each route provides its own metadata.

## Routes

Routes are in English, UI texts are in Turkish. This is a deliberate distinction, do not correct it.

* `/` LandingPage · `/projects` Projects · `/about` About Me · `/experience` Experience
* `not-found` → page not found + return to home link. Navbar is preserved.

## Comments

Few and only where necessary. Maximum 2 lines, in the format `"... does X."`. Write WHY the code is the way it is, not WHAT it does — what it does is already in the code.

## Stuck rule

If you are having trouble running a function, skip it and its dependents, write `(To be checked later)` next to it, and jump to the next step. Do not get stuck and wait.

## Plan and report style

* Plans must be very short, plain, concise, and entirely work-focused.
* NO probability assessments. Do not use speculative sentences like "This could also be / maybe / it could also be done like this". Write exactly what will be done.
* Divide into phases, put substeps under phases.
* Give a very brief report at the end of each phase.

## Bug vs. enhancement

Do not ask about bugs and errors, strictly fix them. Present quality-of-life improvements with three questions before applying: is it necessary and what will it change, how much is the benefit, will there be a visible difference?

## Delegation gate — runtime

The project is small and file count is low. **Default path: do it yourself.**

1. Can you do it in a single pass, touching 1-2 files? → Yes: DO IT YOURSELF.
2. If not: `Explore` for multi-file reading or discovery, `Plan` for strategy.
3. DO NOT CREATE a new agent. If you think it's necessary, say so; I make the permanent addition decision with the `/create-subagent` skill.
4. If parts are independent, go parallel; if dependent, go sequential and put the summary of the previous into the next one's task.

## Handoff

Give each subagent a clear task + expected output. Subagents do the work in their own isolated context, returning only a brief summary to you. NO intermediate log files.

## Where things are

* Architecture and stack → `docs/codemap.md` (thin index, auto-loaded). Details `docs/codemap/{routes,ui,data}.md` — not auto-loaded, read when necessary. Purpose and scope → `PRODUCT.md`.
* Folder-specific rules → `.claude/rules/`. Worker roles → `.claude/agents/`.
* Design source (canvas, diagrams, raw notes) → `Obsidian/`. Rule texts were derived from there; if there is a contradiction, the rule file in the repo prevails.
* Changelog → `docs/CHANGELOG.md`. Session summaries → `docs/sessions/`. Both are read when necessary, not auto-loaded.
* `codemap.md` and `CHANGELOG.md` are tracked. `sessions.md` and `sessions/` are personal, in `.gitignore`.

## Session commands

* **"Read CLAUDE.md"** → silently read `docs/sessions.md` if it exists, bring the last point into context. DO NOT EMPTY the file.
* **"End session"** → APPEND to `docs/sessions.md`: 10-20 lines, what was done and where it left off.
* **"Close session" / "Save sessions"** → summarize sessions.md, write to `docs/sessions/Session_DD-MM-YYYY.md` (append if exists), then empty sessions.md.
* **"Update codemap"** → full scan if codemap is EMPTY. If FULL, find the last update with `git log -1 --format=%cI -- docs/codemap.md`, update sections of files changed since then. Full scan if `git log` is empty.
* **"Add to changelog" / "Close the day"** → a few lines to `docs/CHANGELOG.md` (append).
* **"End the day"** → codemap first, then changelog.

## Token efficiency

* Keep this file under 200 lines.
* Do not write things that can be inferred from the codebase — keep only exceptions, rationales, and pitfalls.
* Move rules that don't fit every task to `.claude/rules/`.
* `@path` imports ease organization but do not reduce context; the imported file is also loaded on startup.
* Run `/doctor` periodically.

@docs/codemap.md
@docs/sessions.md

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.