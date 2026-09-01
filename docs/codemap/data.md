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

| Model               | Table               | Note                                                                          |
| ------------------- | ------------------- | ----------------------------------------------------------------------------- |
| `Media`             | media               | Feeds all photo blocks                                                        |
| `LandingPage`       | landing_page        | Single row; project count is via COUNT, no column for it                      |
| `TechStackItem`     | tech_stack_items    | LandingPage tech stack                                                        |
| `AboutSection`      | about_sections      | Photo+text pairs, ordered by `order`                                          |
| `ExperienceSection` | experience_sections | /experience text blocks                                                       |
| `RoadmapItem`       | roadmap_items       | Education and work roadmaps are in the same table via `kind` (EDUCATION/WORK) |
| `Project`           | projects            | `githubUrl` nullable, `isPublished`, `order`                                  |

The three tables required by the page-data mapping (`TechStackItem`, `ExperienceSection`, `RoadmapItem`) were added to the 4 tables from the schema notes.

**Deliberate deviation from the diagram:** `media` relations were drawn as one-to-one (`-`) in dbdiagram, but are one-to-many in the schema. This allows the same visual to be used in multiple blocks without causing an unnecessary unique constraint.

## Queries

All Prisma calls are written as named functions inside `lib/queries/` and exposed externally via `lib/queries/index.ts`. The layer exists and every page consumes it; only the function bodies are still fixtures.

Files: `landing.ts`, `projects.ts`, `about.ts`, `experience.ts`, plus `roadmap.ts` and `fixtures.ts`.

**`roadmap.ts` is a fifth file beyond the plan.** `RoadmapItem` is read identically by `/about` (EDUCATION) and `/experience` (WORK), so the `select` and its derived `RoadmapEntry` type live in one place rather than being duplicated or imported sideways between the two page modules.

Date formatting is a pure helper at `lib/formatDate.ts` using `Intl.DateTimeFormat("tr-TR")` — one module-level formatter, no date package.

### The fixture seam (Phase 2)

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

**(To be checked later)** — No PostgreSQL: `prisma migrate` and seed have not been run, `prisma/migrations/` is empty. The schema passes `prisma validate`, the client is generated, the seed pipeline works end-to-end (`npm run db:seed` reads the env and runs tsx) — we just haven't connected to a DB. The first migration will be generated once the DB is up; `db push` will not be used.
