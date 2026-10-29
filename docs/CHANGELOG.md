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

### Navbar pass

(English from here on, per the working-language preference.)

- **Navbar scaled up in three steps**, each driven through `--spacing-nav`
  (3.75rem → 4.125rem → 4.25rem → 5rem) so `--spacing-viewport` kept every
  `Section` in sync. Header padding, nav gaps and social sizing grew with it.
- **Nav links moved from `text-body` to `text-lead`.** Its 1.7 prose
  line-height made the links taller than the bar's content box, which is what
  forced the bar to grow rather than the padding to shrink — trimming the link
  padding instead would have dropped the mobile-menu touch target to 43px,
  under the 44px floor.
- **`NavLink` hover interaction added** — a `raspberry-700` hairline wiping in
  from the left and collecting to the right, plus a 2px label lift. Plain CSS,
  matching `SocialLinks`' existing rising fill rather than adding a fifth
  Motion pattern.

### Fixed

- **`hover:text-raspberry-500` on nav links violated the palette split and
  AA.** raspberry-500 measures 4.00:1 on `surface`, under the 4.5:1 needed for
  16px body text; now `raspberry-700` at 6.43:1. This was the loose end carried
  over from the previous session.
- **Social marks overhung the container edge by 7px.** After the icons were
  resized to 36px in 48px circles, `Navbar` still passed the old `-mr-3.25`
  (13px) alignment constant; the inner padding is 6px, so it is now `-mr-1.5`.

### Reverted

- A section-crossing curtain transition plus scroll-snap on `/` was built and
  then removed in full at the user's request. `CurtainReveal` and
  `SectionCurtain`, the `snap-start` on `Section`, the
  `html:has([data-snap-sections])` rule and the `[data-curtain]` no-JS rule are
  all gone; a grep for them returns nothing.

### Note

- **Tailwind spacing multipliers must be multiples of 0.25.** `py-3.75`,
  `gap-5.25`, `gap-10.5` and `size-5.5` are valid and now in use. An invalid
  multiplier emits **no CSS and no error**, so the spacing silently collapses —
  verify against the built stylesheet, not the class name.
- Nothing in this pass was verified in a browser; no browser tooling was
  available. Contrast figures are computed.

### Section transition — built, iterated four times, reverted

Net change to the codebase this pass: **none.** The work is recorded because the
analysis is worth more than the code was.

- A section-crossing curtain for `/` was rebuilt from a reference image
  (full-screen sweep, raspberry ground, no text) and taken through four
  architectures: scrubbed + `scroll-snap-type: mandatory`, then spring-smoothed
  scrub, then a timed tween fired on crossing, then scrub with a JS settle and no
  snap. The user then rewound to the pre-request state.
- **The finding: a scrubbed curtain and mandatory snap are mutually exclusive.**
  The boundary is ~760px of scroll, and mandatory snap forbids resting anywhere
  inside it — the browser crosses it in one frame, so `scrollYProgress` jumps
  0 → 0.83 in a single event. Scrubbed, the sweep lasts as long as the snap
  animation rather than the gesture. Timed, it fires after arrival and covers the
  new section instead of the change. Snap deletes the moment the transition needs.
- **`scroll-padding-top` caps scroll progress below 1.** Section 2 snaps to nav
  height, not the viewport top, so progress rests at ~0.83. A sweep mapped to
  `[0, 0.5, 1]` strands the panel at -83% and leaves the bottom ~17% of the
  screen permanently covered. Scroll-linked ranges on this page must end near 0.8.
- **A covering panel must never carry `data-animated`.** The `<noscript>` rule
  forces `transform: none`, which for a curtain _is_ the covering position; the
  fallback would hide the page instead of revealing it.
- Full reasoning is in `docs/codemap/ui.md` → "Rejected twice: the
  section-crossing curtain". Read it before a third attempt.

### Reverted

- Every file touched is back to its pre-request state: `components/SectionWipe.tsx`
  deleted, and `app/page.tsx`, `app/globals.css`, `components/index.ts`,
  `.claude/rules/ui.md` restored by hand rather than with `git checkout`, since the
  tree carries 30+ uncommitted files from earlier work. A grep for `SectionWipe`,
  `scroll-snap`, `snap-sections`, `data-curtain` and `scroll-padding` across
  `app/`, `components/`, `lib/`, `config/` and `.claude/rules/` returns nothing.
  `lint` / `typecheck` / `build` clean, all 5 routes still static.

## 02-09-2026 — Büyük Faz 4: proje detay sayfası

- `/projects/[slug]` açıldı: ağaçtaki ilk dinamik segment ve `generateStaticParams`,
  `generateMetadata`, `dynamicParams` üçünün de ilk kullanımı. Üç bölüm — `OverlapPair`
  künye, aynı overlap'in `reverse` ile aynası (anlatı), ve koşullu galeri.
- `ProjectCard` "Projeyi incele" `TextLink`'i aldı. **"Tıklanır tek yüzey linktir"
  kararı bozulmadı:** kart anchor'a çevrilmedi, açık bir link eklendi.
- Yeni bileşenler: `TextLink` (iç vurgu bağlantısı, `NavLink`'in altı çizgisini
  aynen tekrarlar — üçüncü bir işaretçi kalıbı icat edilmedi), `ProjectHeader`,
  `ProjectGallery` (boş listede `null`).
- Şema büyüdü: `Project` + `slug`/`body`/`role`/`startDate`/`endDate`/`liveUrl`,
  yeni `ProjectImage` ve `ProjectTech` modelleri.
- `PRODUCT.md` kapsamı genişletildi: dört sayfa + detay route'u.

### Veritabanı yok

- **Hiçbir veritabanı komutu çalıştırılmadı.** Şema düzenlendi ve `prisma generate`
  çevrimdışı koştu, böylece tipler Prisma'dan gelmeye devam ediyor; `migrate` ve
  `seed` 2.6 ile birlikte bloke kalıyor ve yeni iki tablo aynı ilk migration'a girecek.
- İçerik `lib/queries/fixtures.ts` üzerinden. `projectDetailsFixture` tek kaynak,
  kart özeti ondan türetiliyor — aynı içerik iki kez yazılmıyor.

### Ölçülen, düzeltilmeyen iki sorun

- **`cn()` type size'ları sessizce siliyor.** `tailwind-merge` projenin `@theme`
  adlarını bilmiyor; `cn("text-lead","text-ink")` yalnızca rengi döndürüyor. Şu an
  `NavLink` `text-lead`siz, `GitHubLink`/`TextLink` `text-body`siz render ediliyor.
- **Dört kontrast çifti AA altında.** `not-found` dönüş linki 2.00:1, `RouteError`
  buton etiketi 2.34:1 (hover 2.89:1), `RoadMap` rayı 2.72:1 (eşik 3).
- İkisi de `docs/codemap/ui.md` içindeki iki "Pitfall" bölümünde, tek noktalı
  çözümüyle birlikte duruyor.

### Geri alınan

- Oturum içinde istenen aydınlık/karşıt renk paleti altı tur denendi (kayısı zemin,
  mandalina cam, ateş kırmızısı vurgu, koyu navbar) ve **istek üzerine tümüyle geri
  alındı**. `app/globals.css`, `Navbar`, `NavLink`, `MobileMenu`, `SocialLinks`,
  `GitHubLink`, `OverlapPair`, `lib/cn.ts` sekizi de `git checkout` ile HEAD'e döndü;
  palet karanlık kimliğiyle olduğu gibi duruyor. Faz 4 işi bundan etkilenmedi.

## 29-10-2026 — Faz 2.6: gerçek veri

- İlk migration `20261029134652_init`; yerel PostgreSQL 16'da sıfırdan uygulandı.
- `prisma/seed.ts` gerçek içerikle: 7 proje (HandPocket, StockMaster, Kişisel
  Portfolyo, CineFlow, EduAI, Safety 4.0, VisData), her biri 3 ekran görüntüsü;
  portre, 9 teknoloji, hakkımda/tecrübe metinleri, roadmap. İki kez çalıştırıldı,
  satır sayıları değişmedi.
- Ekran görüntüleri projeler yerelde çalıştırılarak alındı (`public/images/projects/`).
- FastAPI ve Docker işaretleri eklendi; vitrin 3×3 doldu.
- Dört sorgu gövdesi Prisma çağrısı, `lib/queries/fixtures.ts` silindi.
- `POST /api/revalidate` (`REVALIDATE_SECRET`), `.env.example` güncellendi.
- `config/site.ts` ve `config/social.ts` gerçek ad, alan adı ve profillerle.
