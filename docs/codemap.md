# Codemap

Mimari ve yığının tek doğru kaynağı. Bu dosya her oturumda otomatik
yüklenir — ince tutulur. Kurallar burada değil → `CLAUDE.md` ve
`.claude/rules/`.

**Ayrıntı alt dosyalarda; otomatik yüklenmezler, gerekince okunur:**

| Dosya                    | İçerik                                                                      |
| ------------------------ | --------------------------------------------------------------------------- |
| `docs/codemap/routes.md` | Route katmanı, loading/error deseni, render stratejisi, sayfa→veri eşlemesi |
| `docs/codemap/ui.md`     | Tema token'ları ve tuzakları, bileşen listesi, `config/`                    |
| `docs/codemap/data.md`   | Prisma 7 kurulumu ve sürüm tuzağı, veri modeli, sorgular                    |

## Yığın

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind v4 ·
PostgreSQL + Prisma 7 (+ `@prisma/adapter-pg`) · Motion · Radix Dialog
(yalnız mobil menü) · lucide-react · sharp.

Dağıtım: DigitalOcean, self-hosted, `output: "standalone"`, tek instance.
ISR cache'i instance'a özel — ikinci instance eklenmeden yatay ölçekleme
yapılmaz.

## Klasör düzeni

`src/` yok, her şey kökte. `@/*` takma adı kökü gösterir.

```
app/         route'lar, layout, globals.css (tema token'ları @theme içinde)
components/  UI bileşenleri
lib/         saf yardımcılar; cn.ts, prisma.ts, queries/
config/      sabit ayarlar; site.ts, nav.ts, social.ts (+ index.ts)
prisma/      schema.prisma, seed.ts, migrations/
generated/   Prisma client — üretilir, gitignore'da
public/      images/ altında görseller
docs/        codemap (+ codemap/), CHANGELOG, sessions
Obsidian/    tasarımın kaynağı: canvas, diyagramlar, ham notlar
```

Modül public API'si `index.ts` ile açılır. `lib/` bir modül değil, küçük
yardımcıların klasörü — `index.ts`'i yok; `lib/queries/` ve `config/`
kendi `index.ts`'lerini taşır.

## Durum

**Büyük Faz 1 tamamlandı.** Yönetim dosyaları, araç zinciri, tema
token'ları, Prisma şeması, app kabuğu (yer tutucu sayfalar).
`build` / `lint` / `typecheck` temiz, 5 route da statik.

### Açık uçlar

- **(Sonra bakılacak)** PostgreSQL yok → migration ve seed çalıştırılmadı.
  Ayrıntı: `docs/codemap/data.md`.
- `config/site.ts` ve `config/social.ts` yer tutucu; favicon Next varsayılanı.
- `next dev`, `CLAUDE.md` sonuna agent-rules bloğu ekler. Her çalışmada
  yeniden yazıldığı için silinmez, commit'lenir.

### Sıradaki — Büyük Faz 2

Ortak UI (`Card`, `OverlapPair`, `Reveal`, `PageTransition` +
`template.tsx`) → Navbar dörtlüsü → içerik bileşenleri → PostgreSQL, ilk
migration, seed içeriği, `lib/queries/` sorguları → sayfaların canvas
yerleşimlerine göre örülmesi → dört animasyon kalıbı.
