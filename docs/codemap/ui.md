# Codemap — arayüz

Genel bakış → `docs/codemap.md`. Kurallar → `.claude/rules/ui.md`.

## Tema token'ları — `app/globals.css`

Tailwind v4: tema `@theme` bloğunda, `tailwind.config.ts` YOK.

- **Renk:** `page`, `surface` / `surface-media`, `ink` / `-secondary` /
  `-muted` / `-inverse`, `line` / `-strong`, `raspberry-50/500/600/700`
- **Font:** `--font-serif` → `--font-plex-serif` (next/font, IBM Plex Serif).
  `latin-ext` alt kümesi zorunlu; yoksa ş/ğ/ı/İ yedek fonta düşer.
- **Ağırlık:** yalnız `thin 100`, `light 300`, `normal 400`.
  `--font-weight-*: initial` namespace sıfırlaması `font-bold` /
  `font-semibold` sınıflarını üretimden tamamen kaldırır.
- **Boyut:** `caption · small · body · lead · h3 · h2 · h1 · display`
  (son üçü clamp, mobilde kendiliğinden daralır).
- **Boşluk:** `overlap`, `overlap-lg`, `section` (clamp).

### Tuzak: `max-w-prose`

62ch değeri `--max-width-prose` ile veriliyor, `--container-prose` ile
değil. Tailwind v4 bu sınıfı `--max-width-*` namespace'inden okur;
`--container-prose` yazılırsa sessizce yerleşik 65ch'de kalır.

Not: `@theme` içinde tanımlı ama hiçbir sınıfta kullanılmayan token CSS'e
yazılmaz (`overlap-lg` şu an böyle). Eksik sanma, Faz 2'de gelecek.

## Bileşenler

### Mevcut

- `RouteLoading` (Server) · `RouteError` (Client) — route plumbing,
  bkz. `docs/codemap/routes.md`.

### Faz 2'de yazılacak

**Navbar:** `Navbar` (Server) · `NavLink` (Client; `usePathname`,
`aria-current` — navbar'ın client olması gereken tek parçası) ·
`SocialLinks` (Server, `config/social.ts`) · `MobileMenu` (Client,
Radix Dialog).

**Ortak UI:** `Card` (kart kabuğu, `title` opsiyonel) · `OverlapPair`
(`media`, `content`, `reverse`; **tek** overlap implementasyonu) ·
`Reveal` (Client; `whileInView` + `once`, `children` aldığı için
içindeki Server Component'ler sunucuda kalır) · `PageTransition`
(Client, `template.tsx` içinde).

**İçerik (hepsi Server):** `RoadMap` · `TextCard` · `ProjectCard`
(OverlapPair + opsiyonel `GitHubLink`) · `GitHubLink` (url yoksa hiç
render edilmez) · `TechStack` · `StatCard` · `WelcomeSection` ·
`ProfileImage`.

### Listeden düşenler

`App`/`Outlet` (React Router kavramı; karşılığı `layout.tsx` + dosya
sistemi) · `Layout` (→ `app/layout.tsx`) · `OverlapText` (→
`OverlapPair`'e gömüldü, DRY) · `TechIcons` (→ `TechStack` ile birleşti)
· `Image` (`next/image` doğrudan kullanılır).

## Sabit ayarlar — `config/`

`site.ts` (ad, başlık, açıklama, url) · `nav.ts` (4 route, TR etiket /
EN href) · `social.ts` (GitHub, LinkedIn, Mail; `external` bayrağı
mailto'nun aynı sekmede açılmasını sağlar). Public API `config/index.ts`.

İkon bileşeni config'de tutulmaz — `SocialLinks` `key` üzerinden eşler,
böylece config React'tan bağımsız kalır.

**(Sonra bakılacak)** `site.ts` ve `social.ts` içindeki ad, alan adı ve
profil adresleri yer tutucu. Favicon hâlâ Next varsayılanı.
