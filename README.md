# Portfolyo

Kişisel portfolyo sitesi. Dört sayfa, görsel ağırlıklı; içerik veritabanında, arayüz metinleri Türkçe.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · PostgreSQL + Prisma · Motion.
Self-hosted (DigitalOcean), `output: "standalone"`.

## Geliştirme

```bash
npm install
cp .env.example .env      # DATABASE_URL'i doldur
npx prisma migrate dev    # ilk migration (PostgreSQL gerekir)
npx prisma db seed        # içerik
npm run dev               # http://localhost:3000
```

PostgreSQL henüz kurulmadıysa `npm run dev` çalışır; veri çeken sayfalar Faz 2'de geldiğinde DB gerekir.

## Komutlar

| Komut                         | İş                                         |
| ----------------------------- | ------------------------------------------ |
| `npm run dev`                 | Geliştirme sunucusu                        |
| `npm run build` / `npm start` | Üretim derlemesi ve sunucu                 |
| `npm run lint`                | ESLint                                     |
| `npm run typecheck`           | `tsc --noEmit`                             |
| `npm run format`              | Prettier (Tailwind sınıf sıralaması dahil) |
| `npx prisma studio`           | İçerik girişi                              |

## Dosya düzeni

`src/` yok — `app/`, `components/`, `lib/`, `config/`, `prisma/`, `public/` kökte. `@/*` takma adı kökü gösterir.

## Dokümantasyon

- `PRODUCT.md` — amaç, kapsam, kullanıcı akışı
- `docs/codemap.md` — mimari, klasör düzeni, veri modeli
- `CLAUDE.md` + `.claude/rules/` — geliştirme kuralları
- `Obsidian/` — tasarımın kaynağı: canvas, diyagramlar, ham notlar
