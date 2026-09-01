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
- Yönetim dosyaları İngilizceye çevrildi: `CLAUDE.md`, `.claude/rules/{ui,data}.md`,
  `docs/codemap*`. Kural içerikleri aynı, dil değişti.
- **Büyük Faz 2 planlandı** → kökte `PLAN.md`. Sıra UI-önce / veri-sonra:
  PostgreSQL henüz yok, bu yüzden sayfalar `lib/queries/` arkasındaki
  fixture'lara karşı yazılacak. DB geldiğinde dört fonksiyon gövdesi
  değişecek, sayfalar ve bileşenler değişmeyecek.
- Faz 2 kararları codemap'e işlendi: `ProjectCard` overlap değil, 2 sütun /
  1 satır grid. Tıklanabilir tek yüzey linkler (GitHub, LinkedIn, Mail);
  kart, fotoğraf ve metin bloğu asla anchor değil. Yenileme yalnızca
  on-demand — `export const revalidate` yok, `REVALIDATE_SECRET` ile
  korunan `app/api/revalidate/route.ts` var.

### Düzeltilen

- **`.claude/rules/{ui,data}.md` frontmatter'ı bozuktu.** Çeviri sırasında
  `description:` satırı `## description:` başlığına dönmüş, kapanış `---`
  kaybolmuştu; bu haliyle YAML parse edilmiyor, kurallar `globs` ile hiç
  yüklenmiyordu. Frontmatter yeniden kuruldu, `config/` → `config/**`
  düzeltildi.
- **`next/image` `priority` Next 16'da kullanımdan kalktı**, yerini `preload`
  aldı. `.claude/rules/ui.md` eski kuralı yazıyordu, düzeltildi.
- `.claude/rules/data.md` seed komutunu hâlâ `package.json#prisma.seed`
  olarak gösteriyordu; Prisma 7 bu alanı okumuyor, doğrusu
  `prisma.config.ts` → `migrations.seed`.

### Dikkat

- **`impeccable` ^3.6.0 `dependencies` altına kurulmuş.** Tasarım aracı;
  onaylı paket listesinde değil ve production bağımlılığı olduğu için
  standalone Docker imajına giriyor. `devDependencies`'e taşınmalı ya da
  kaldırılmalı — karar senin.
