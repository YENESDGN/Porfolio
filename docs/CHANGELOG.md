# Changelog

Kritik değişikliklerin kısa kaydı. "changelog'a ekle" / "günü kapat"
komutlarıyla sona eklenir.

## 31-08-2026 — Büyük Faz 1

- Proje temeli kuruldu: yönetim dosyaları (`CLAUDE.md`, `.claude/rules/`,
  codemap, `PRODUCT.md`), onaylı paketler, `output: "standalone"`.
- Tema token'ları `app/globals.css` içinde Tailwind v4 `@theme` olarak;
  `tailwind.config.ts` açılmadı. Font ağırlıkları 100/300/400'e kilitlendi,
  `font-bold`/`font-semibold` üretimden kalktı.
- Prisma şeması: 7 model. Not'taki 4 tabloya `TechStackItem`,
  `ExperienceSection`, `RoadmapItem` ve `order` alanları eklendi.
- App kabuğu: 4 route + `not-found`, her route'ta `loading`/`error`
  (ortak `RouteLoading`/`RouteError` üzerinden). Beşi de statik.

### Zorunlu sapmalar

- **`@prisma/adapter-pg` onaylı listeye eklendi.** Prisma 7'de çalışma
  zamanı driver adapter olmadan client çalışmıyor; bağlantı adresi de
  şemadan kalkıp `prisma.config.ts`'e taşındı.
- **`prisma` 7.10.0'a sabitlendi.** npm `latest` etiketi 8.0.0-rc'yi
  gösteriyor; RC client 7 ile uyumsuz ve ~386 paket getiriyor.
- Seed ayarı `package.json#prisma.seed` yerine
  `prisma.config.ts` → `migrations.seed`.

### Düzeltilen

- `max-w-prose` 62ch yerine yerleşik 65ch'de kalıyordu: Tailwind v4 bu
  sınıfı `--max-width-*` namespace'inden okuyor, `--container-*` değil.
- `tsc`'yi kıran bayat `types/` klasörü silindi (`next build` üretmiyor).

## 01-09-2026

- `docs/codemap.md` ince indekse indirildi; ayrıntı `docs/codemap/`
  altında `routes.md`, `ui.md`, `data.md` olarak ayrıldı. Alt dosyalar
  import EDİLMEZ — her oturumun context'i küçülsün diye.
- `PRODUCT.md` içindeki sequence diyagramı atfı düzeltildi; işaret ettiği
  PNG repodan kaldırılmıştı.
