# Portfolyo

Kişisel portfolyo sitesi. Dört sayfa, görsel ağırlıklı; içerik veritabanında, arayüz metinleri Türkçe.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · PostgreSQL + Prisma · Motion.
Self-hosted (DigitalOcean), `output: "standalone"`.

## Geliştirme

```bash
npm install
cp .env.example .env      # DATABASE_URL'i doldur
npx prisma migrate deploy # migration'lar (PostgreSQL gerekir)
npx prisma db seed        # içerik (upsert, tekrar çalıştırılabilir)
npm run dev               # http://localhost:3000
```

`npm run dev` ve `npm run build` PostgreSQL ister: sayfalar içeriği doğrudan veritabanından okur. `.env` içine `REVALIDATE_SECRET` da yazılır; içerik güncellenince site şu çağrıyla tazelenir:

```bash
curl -X POST -H "Authorization: Bearer $REVALIDATE_SECRET" https://yagizenesdogan.me/api/revalidate
```

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
- `docs/codemap.md` — mimari indeksi; ayrıntı `docs/codemap/` altında (routes, ui, data)
- `CLAUDE.md` + `.claude/rules/` — geliştirme kuralları
- `Obsidian/` — tasarımın kaynağı: canvas, diyagramlar, ham notlar
