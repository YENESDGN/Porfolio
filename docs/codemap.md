# Codemap

Mimari ve yığının tek doğru kaynağı. Kurallar burada değil → `CLAUDE.md` ve `.claude/rules/`.

## Yığın

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind v4 · PostgreSQL + Prisma · Motion · Radix Dialog (yalnız mobil menü) · lucide-react. Dağıtım: DigitalOcean, self-hosted, `output: "standalone"`, tek instance.

## Klasör düzeni

`src/` yok, her şey kökte. `@/*` takma adı kökü gösterir.

```
app/         route'lar, layout, globals.css (tema token'ları @theme içinde)
components/  UI bileşenleri (Faz 2)
lib/         saf yardımcılar; cn.ts, prisma.ts, queries/
config/      sabit ayarlar; site.ts, nav.ts, social.ts
prisma/      schema.prisma, seed.ts, migrations/
public/      images/ altında görseller
docs/        codemap, CHANGELOG, sessions
Obsidian/    tasarımın kaynağı: canvas, diyagramlar, ham notlar
```

## Route katmanı

- `app/layout.tsx` — Server. html/body, IBM Plex Serif, (Faz 2) Navbar. Navigasyonda remount olmaz.
- `app/template.tsx` — Client, **Faz 2**. Sayfa geçişi (Door FadeIn-Up&Down). `layout` değil `template`, çünkü giriş animasyonunun her gezinmede tetiklenmesi lazım.
- `app/page.tsx` (LandingPage) · `app/projects/` · `app/about/` · `app/experience/`
- `app/not-found.tsx` — sayfa yok + ana sayfaya dönüş, Navbar korunur.
- Her route'ta `loading.tsx` ve `error.tsx`.

## Tema token'ları — `app/globals.css`

Tailwind v4: tema `@theme` bloğunda, `tailwind.config.ts` YOK.

- Renk: `page`, `surface` / `surface-media`, `ink` / `-secondary` / `-muted` / `-inverse`, `line` / `-strong`, `raspberry-50/500/600/700`
- Font: `--font-serif` → `--font-plex-serif` (next/font)
- Ağırlık: yalnız `thin 100`, `light 300`, `normal 400`. `--font-weight-*: initial` reset'i `font-bold`/`font-semibold` sınıflarını tamamen kaldırır.
- Boyut: `caption · small · body · lead · h3 · h2 · h1 · display` (son üçü clamp)
- Boşluk: `overlap`, `overlap-lg`, `section` (clamp) · `max-w-prose` 62ch

## Bileşenler — Faz 2'de yazılacak

**Navbar:** `Navbar` (Server) · `NavLink` (Client; `usePathname`, `aria-current` — navbar'ın client olması gereken tek parçası) · `SocialLinks` (Server, `config/social.ts`) · `MobileMenu` (Client, Radix Dialog).

**Ortak UI:** `Card` (kart kabuğu, `title` opsiyonel) · `OverlapPair` (`media`, `content`, `reverse`; **tek** overlap implementasyonu) · `Reveal` (Client; `whileInView` + `once`, `children` aldığı için içindeki Server Component'ler sunucuda kalır) · `PageTransition` (Client, `template.tsx` içinde).

**İçerik (hepsi Server):** `RoadMap` · `TextCard` · `ProjectCard` (OverlapPair + opsiyonel `GitHubLink`) · `GitHubLink` (url yoksa hiç render edilmez) · `TechStack` · `StatCard` · `WelcomeSection` · `ProfileImage`.

**Listeden düşenler:** `App`/`Outlet` (React Router kavramı; karşılığı `layout.tsx` + dosya sistemi) · `Layout` (→ `app/layout.tsx`) · `OverlapText` (→ `OverlapPair`'e gömüldü, DRY) · `TechIcons` (→ `TechStack` ile birleşti) · `Image` (`next/image` doğrudan kullanılır).

## Veri modeli — `prisma/schema.prisma`

Model PascalCase, tablo snake_case (`@@map`).

| Model | Tablo | Not |
|---|---|---|
| `Media` | media | Tüm fotoğraf blokları buradan beslenir |
| `LandingPage` | landing_page | Tek satır; proje sayısı COUNT ile, kolon yok |
| `AboutSection` | about_sections | Foto+metin çiftleri, `order` ile sıralı |
| `ExperienceSection` | experience_sections | /experience metin blokları |
| `RoadmapItem` | roadmap_items | `kind` (EDUCATION/WORK) ile öğrenim ve iş roadmap'i aynı tabloda |
| `Project` | projects | `githubUrl` nullable, `isPublished`, `order` |
| `TechStackItem` | tech_stack_items | LandingPage tech stack |

## Sayfa → veri eşlemesi

Her sayfa kendi Server Component'inde `lib/queries/` üzerinden çeker.

- `/` — proje sayısı (COUNT), hoşgeldin metni + fotoğraf, tech stack
- `/projects` — yayınlanmış proje listesi (`order`)
- `/about` — about bölümleri (foto+metin) + `EDUCATION` roadmap
- `/experience` — experience metin blokları + `WORK` roadmap

## Durum

Faz 1 tamamlandı: yönetim dosyaları, araç zinciri, tema token'ları, Prisma şeması, app kabuğu (yer tutucu sayfalar).

**(Sonra bakılacak)** — PostgreSQL henüz yok: `prisma migrate` ve `seed` çalıştırılmadı, `prisma/migrations/` boş. DB ayağa kalkınca ilk migration üretilecek (`db push` kullanılmayacak).
