---
description: Veri katmanı kuralları — Prisma kullanımı, şema, içerik girişi
globs: ["prisma/**", "lib/prisma.ts", "lib/queries/**"]
---

# Veri katmanı kuralları

## Prisma kullanımı

- **Yalnızca sunucuda.** Client Component'te `@prisma/client` importu YOK. Kaçak import build'i patlatmadan bundle'a sızabilir.
- **Tek client örneği.** `lib/prisma.ts` içinde `globalThis` singleton'ı; dev'de hot reload her yenilemede yeni bağlantı açar, havuz tükenir.
- **API route yazma.** Server Component sorguyu doğrudan atar. Okuma için `app/api` klasörü açma — araya gereksiz bir HTTP atlaması koyar.
- **Sorgular tek yerde.** Tüm Prisma çağrıları `lib/queries/` içinde, isimlendirilmiş fonksiyonlar olarak; dışarıya `lib/queries/index.ts` üzerinden açılır. Bileşen içinde çıplak `prisma.x.findMany` yok. Bileşen ne sorduğunu bilir, nasıl sorulduğunu bilmez.
- **Tip kaynağı Prisma.** Üretilen tipleri kullan; aynı şekli elle tekrar tanımlama.
- **Sadece gerekeni seç.** `select` ile alan seç; tüm satırı çekip yarısını atma.
- `DATABASE_URL` yalnızca env'de. `.env` commit edilmez, `.env.example` edilir.

## Şema

- Model adları PascalCase, tablo adları snake_case (`@@map`) — şema notundaki tablo adları korunur.
- Şema değişikliği migration ile. Commit'lenen hiçbir değişiklik `db push` ile geçmez.
- Opsiyonel alanlar (`githubUrl` gibi) şemada gerçekten `nullable`; yoksa ilgili parça render edilmez, boş kutu bırakılmaz.
- Sıralama veriye yazılır (`order` alanı). Diziyi kodda yeniden sıralama.
- Görsel alanları `public/` altındaki yolu tutar (`/images/projects/x.webp`), dosyanın kendisini değil. Binary DB'ye girmez.
- Metin alanlarının uzunluk sınırı layout'a göre belirlenir; roadmap açıklaması ile proje açıklaması aynı kutuya sığmaz.

## İçerik girişi

- İçerik Prisma Studio veya `prisma/seed.ts` üzerinden girilir. Elle SQL dosyaya dağıtılmaz. Seed `tsx` ile çalışır; `package.json` içindeki `prisma.seed` alanında tanımlıdır.
- Seed idempotent olur (`upsert`); iki kez çalıştırınca içerik ikizlenmez.
- İçerik güncellendikten sonra ilgili route revalidate edilir, yoksa statik sayfa eski halini göstermeye devam eder.
