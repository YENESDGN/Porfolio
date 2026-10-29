# Codemap — data layer

Overview → `docs/codemap.md`. Rules → `.claude/rules/data.md`.

## Prisma 7 setup

Prisma 7 is significantly different from 6.x. Three points:

1. **Connection URL does not reside in the schema.** `datasource db` only holds the `provider`. If `url = env(...)` is written, schema validation fails (P1012).
2. **CLI configuration is in `prisma.config.ts**` — the schema path, migrations path, and the `migrations.seed` command are there. The `prisma.seed` field in `package.json` is NO LONGER USED.
3. **Runtime requires an adapter.** `lib/prisma.ts` provides `PrismaPg` from `@prisma/adapter-pg` to `PrismaClient`. The client will not work without an adapter — which is why `@prisma/adapter-pg` was added to the approved list.

Reading `.env` is done via Node's built-in `process.loadEnvFile()` instead of `dotenv`; Prisma 7 does not load `.env` on its own.

### Generated client

The generator is `prisma-client` (not the old `prisma-client-js`), the output is in `generated/prisma/` — not in `node_modules`. Import: `@/generated/prisma/client`.

The folder is in gitignore and `npm run build` (`prisma generate && next build`) regenerates it every time; no separate step is needed on a clean checkout. ESLint and Prettier ignore `generated/`.

### Version pitfall

npm's `latest` tag for `prisma` points to **8.0.0-rc**. The RC is incompatible with client 7 and brings ~386 packages including `hono`/`workerd`. Both `prisma` and `@prisma/client` are pinned to **7.10.0**.

The remaining 3 high npm audit warnings are from the prisma CLI's `deepmerge-ts` dependency; they are dev-only, do not go to production, and were left as is because the fix requires downgrading to 6.12.

## Data model — `prisma/schema.prisma`

Models are PascalCase, tables are snake_case (`@@map`). Sorting is written to the data (`order`); arrays are not reordered in code.

| Model               | Table               | Note                                                                                     |
| ------------------- | ------------------- | ---------------------------------------------------------------------------------------- |
| `Media`             | media               | Feeds all photo blocks                                                                   |
| `LandingPage`       | landing_page        | Single row; project count is via COUNT, no column for it                                 |
| `TechStackItem`     | tech_stack_items    | LandingPage tech stack                                                                   |
| `AboutSection`      | about_sections      | Photo+text pairs, ordered by `order`                                                     |
| `ExperienceSection` | experience_sections | /experience text blocks                                                                  |
| `RoadmapItem`       | roadmap_items       | Education and work roadmaps are in the same table via `kind` (EDUCATION/WORK)            |
| `Project`           | projects            | `slug` unique; `githubUrl` / `liveUrl` / `role` / dates nullable, `isPublished`, `order` |
| `ProjectImage`      | project_images      | Detail-page gallery; `Media` 1-N so one visual can serve several projects                |
| `ProjectTech`       | project_tech        | Project ↔ tech stack, explicit join with its own `order`                                 |

The three tables required by the page-data mapping (`TechStackItem`, `ExperienceSection`, `RoadmapItem`) were added to the 4 tables from the schema notes.

**Phase 4 additions to `Project`:** `slug` (unique), `body`, `role`, `startDate`, `endDate`, `liveUrl`, plus the `images` and `techStack` relations. Three decisions worth keeping:

- **`description` stays the card summary; `body` is the detail narrative.** No separate `summary` column was added — `description` already was one, and two fields for one concept would drift apart.
- **`slug` is written to the data, not derived from the title.** Same reasoning as `order`: the value lives in the row, so no Turkish-transliteration helper is needed and retitling a project does not break its URL.
- **`ProjectTech` is an explicit join model, not an implicit N-N.** Prisma would have named the implicit table `_ProjectToTechStackItem`, which cannot carry `order` and breaks the snake_case `@@map` convention every other table follows.

**Deliberate deviation from the diagram:** `media` relations were drawn as one-to-one (`-`) in dbdiagram, but are one-to-many in the schema. This allows the same visual to be used in multiple blocks without causing an unnecessary unique constraint.

## Queries

All Prisma calls are written as named functions inside `lib/queries/` and exposed externally via `lib/queries/index.ts`. Every body is a Prisma call against the module's `select`; published projects are filtered with `isPublished: true` and every list is `orderBy: { order: "asc" }`.

Files: `landing.ts`, `projects.ts`, `about.ts`, `experience.ts`, plus `roadmap.ts`. `fixtures.ts` was deleted in Phase 2.6.

`projects.ts` carries two selects against the same model: `projectSelect` for the card and `projectDetailSelect` for the detail page, with `orderBy` on both relations so ordering comes from the data. `getProjectSlugs()` exists purely to feed `generateStaticParams`; it returns `{ slug }` and nothing else. `getProjectBySlug` filters on `isPublished` too, so an unpublished project 404s instead of rendering.

**`roadmap.ts` is a fifth file beyond the plan.** `RoadmapItem` is read identically by `/about` (EDUCATION) and `/experience` (WORK), so the `select`, its derived `RoadmapEntry` type and `getRoadmap(kind)` live in one place rather than being duplicated or imported sideways between the two page modules. `getRoadmap` is internal — not exported from `index.ts`.

Date formatting is a pure helper at `lib/formatDate.ts` using `Intl.DateTimeFormat("tr-TR")` — one module-level formatter, no date package.

### The fixture seam (Phase 2, closed in 2.6)

PostgreSQL arrives last in Phase 2, so `lib/queries/` is written **before** there is a database. Each of `landing.ts`, `projects.ts`, `about.ts`, `experience.ts` holds three things:

1. a `select` object,
2. a type derived from it — `Prisma.XGetPayload<{ select: typeof xSelect }>`; this works offline because the generated client already exports the `Prisma` namespace,
3. a named async function whose body returns fixtures from `lib/queries/fixtures.ts`.

Pages call these functions from their first commit. Phase 2.6 replaces the four function bodies with real Prisma calls against the same `select` objects and deletes `fixtures.ts`; no page or component changes. The fixtures are a temporary, single-file deviation from the "content is not hardcoded" rule — not content.

Two things the fixtures deliberately do **not** fake:

- **Every photo field is `null`.** `public/images/` holds no photography, and a null exercises the real risk — that the glass plane has to stand on its own without leaving an empty box. It also means the `next/image` branch inside `MediaPlane` has never actually rendered; that is a 2.6 check.
- **Text asserts nothing about a real person.** Roadmap entries are role categories ("Lisans eğitimi", "Stajyer geliştirici"), never named institutions or employers.

`TechStackItem.icon` is selected and rendered (a path under `public/images/tech/`). It was deliberately left out of the `select` while nothing drew it, per "select only what is needed", and added back when `TechStack` started drawing marks.

## Status

**Phase 2.6 done.** `prisma/migrations/20261029134652_init/` holds the first migration; it creates every table in the schema, Phase 4's columns included. It was applied to a local PostgreSQL 16 and re-applied to an empty database without error.

**Seed — `prisma/seed.ts`.** Real content: landing text and portrait, 9 tech items (the 3×3 vitrine), 3 about and 4 experience sections, 3 roadmap rows, 7 projects with 3 screenshots each and their tech. Every row is an `upsert` on a fixed id (projects on `slug`), so two runs leave identical counts; a closing `setval` moves each sequence past the seeded ids so rows added later from Studio do not collide. `ProjectTech` rows dropped from the seed are deleted per project.

**Project tech is limited to the nine vitrine items.** `ProjectTech` points at `TechStackItem`, and the landing page draws every `TechStackItem`. Adding Supabase, Flask or Django to a project would add them to the landing vitrine too; separating the two needs a schema field and is an open decision.

**Image order on the detail page:** screenshot 1 is `coverPhoto` (künye and `/projects` card); `images` are ordered 2, 1, 3 so the narrative plate shows screenshot 2 and the gallery fills both columns.

**Pitfall — Prisma engines behind a closed network.** `migrate`, `db seed` and even `generate` try to download the schema-engine binary from `binaries.prisma.sh`. Where that host is blocked: `PRISMA_SCHEMA_ENGINE_BINARY=/bin/true npx prisma generate` works (generate never runs the engine), and the seed runs directly with `npx tsx --env-file=.env prisma/seed.ts`. The first migration was produced by the same-version WASM schema engine (`@prisma/schema-engine-wasm`, run outside the repo); on a normal network `npx prisma migrate deploy` applies it.
