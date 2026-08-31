# Proje kuralları ve delegasyon

Claude Code bu dosyayı her oturumda otomatik yükler. Yalın tut. Ana oturum = koordinatör: aşağıdaki delegasyon kapısını SEN işletirsin.

**Proje:** Kişisel portfolyo sitesi. 4 sayfa, görsel ağırlıklı, tek kullanıcı akışı. Next.js + TypeScript + Tailwind, PostgreSQL + Prisma, DigitalOcean'da self-hosted. Arayüz metinleri Türkçe, route'lar İngilizce. İçerik DB'de, elle güncelleniyor; yazma arayüzü YOK. Mimari ve yığın burada TEKRARLANMAZ → `docs/codemap.md`.

**`src/` yok.** Kök düzen: `app/`, `components/`, `lib/`, `config/`, `prisma/`, `public/`. Import takma adı `@/*` kökü gösterir (`@/lib/cn`, `@/config/nav`).

## Evrensel kurallar

- Değişiklik küçük ve tek amaçlı; bir commit = bir mantıksal değişiklik.
- Yeni desen icat etme; önce mevcut deseni ara, ona uy.
- Sır/anahtar/token asla koda veya log'a yazılmaz.
- Nedenini bilmediğin kuralı varsayma, sor.

## Kod paradigması

- **Fonksiyonel.** Sınıf yok. Yan etki yalnızca React bileşenlerinde.
- **Saf yardımcılar** `lib/` içinde; React veya DOM importu YOK.
- **DRY — tek implementasyon kuralı.** Bu proje aynı görsel yapıyı defalarca tekrar ediyor. Her biri TEK bileşendir, ikincisi açılmaz: overlap → `OverlapPair` (yön farkı `reverse` prop'u), kart kabuğu → `Card`, roadmap → `RoadMap`. Yeni bölüm bunlarla yapılamıyorsa önce sor.
- **İçerik koda gömülmez.** Proje listesi, roadmap maddeleri, sayfa metinleri, tech stack → DB. Bileşen veriyi map'ler, içermez.
- **İçerik ile ayar ayrı yerlerde.** Değişen içerik DB'de; sabit ayar (sosyal linkler, navbar route listesi, site adı) `config/` içinde TypeScript dosyasında. İki satırlık sabit için tablo açma.
- **Store kurma.** Bu sitede paylaşılan istemci durumu yok. Veri sunucudan geliyor, durum ya router'da ya bileşenin kendisinde. Gerçek ihtiyaç doğarsa (tema, mobil menü) o zaman ekle ve gerekçesini codemap'e yaz.
- **Prop kullanımı serbest.** Veriyi sunucuda çek, aşağıya prop olarak geçir; prop drilling problemi yok.
- **Modüler.** Her modülün `index.ts` public API'si var; modüller birbirinin içine değil, `index.ts`'ine bakar.

## Veri katmanı

İçerik PostgreSQL'de, Prisma ile okunuyor. Ayrıntı → `.claude/rules/data.md`. Her yerde geçerli üç kural:

- **Prisma yalnızca sunucuda.** Client Component'te `@prisma/client` importu YOK.
- **Sorgular `lib/queries/` içinde.** Bileşende çıplak Prisma çağrısı yok.
- **Okuma için API route açma.** Server Component doğrudan sorgular.

## Arayüz

Tailwind v4, IBM Plex Serif, overlap layout, dört animasyon kalıbı. Ayrıntı → `.claude/rules/ui.md`. Her yerde geçerli üç kural:

- **Token'lar `app/globals.css` içindeki `@theme` bloğunda.** Tailwind v4 kullanılıyor; `tailwind.config.ts` dosyası YOK, açma.
- **Font ağırlıkları 100, 300, 400 ile sınırlı.** `font-bold` ve `font-semibold` KULLANMA; yüklü değiller ve `@theme` içindeki reset yüzünden sınıf olarak da üretilmiyorlar.
- **Overlap tek bileşende:** `OverlapPair`. İkinci bir overlap implementasyonu açma.

## Paketler

Listedeki paketler onaylı. Yeni bağımlılık eklemeden önce sor — her paket bakım yükü ve bundle demek.

**Çekirdek:** next, react, typescript, tailwindcss, prisma + @prisma/client, motion (eski framer-motion; import `motion/react`), sharp. **Yardımcı:** clsx + tailwind-merge (`cn()`), lucide-react (ikon), @radix-ui/react-dialog (yalnızca mobil menü), tsx (seed çalıştırıcı). **Geliştirme:** eslint-config-next, prettier + prettier-plugin-tailwindcss.

`sharp` opsiyonel değil: `output: "standalone"` ile görsel optimizasyonu onsuz çalışmaz. Docker'da runner katmanında ayrıca kurulur — build makinesindeki kuruluma güvenme, mimari uyuşmazlığı üretim ortamında patlar.

EKLENMEZ — bu projede karşılığı yok:

- İstemci veri çekme (TanStack Query, SWR, axios): veri Server Component'te gelir.
- Global state (zustand, redux): paylaşılan istemci durumu yok.
- Form kütüphanesi: sitede form yok.
- Hazır bileşen kiti (shadcn/ui, MUI): `Card` ve `OverlapPair` bu projeye özel; kit kendi `Card`'ını getirir ve DRY kuralı bozulur.
- Tarih kütüphanesi: `Intl.DateTimeFormat` roadmap tarihleri için yeterli.
- i18n: şimdilik tek dil.

## Next.js

- Varsayılan Server Component. `"use client"` yalnızca gerçekten gerekende: animasyon, scroll gözlemi, mobil menü.
- `"use client"` sayfanın tepesine değil, **yaprağa** konur. Bir animasyon yüzünden tüm sayfayı client'a çevirme.
- **Sayfalar statik render edilir.** İçerik ayda bir değişiyor; her istekte DB'ye gitme. `revalidate` ile yenile, elle güncelleme sonrası on-demand revalidate et. Sayfayı dinamik yapan bir şey eklemeden önce sor.
- **Self-hosted varsayımı:** `output: "standalone"`, tek instance. ISR cache'i instance'a özel; ikinci instance eklenirse cache paylaşılmaz, o karar verilmeden yatay ölçekleme yapılmaz. Vercel'e özel API kullanma.
- `loading.tsx` ve `error.tsx` her route'ta var. Statik render'da nadiren görünürler; yine de eksik bırakılmaz.
- Kaydı olmayan içerik → `notFound()`. Boş sayfa render etme.
- İç gezinme `next/link`. `<a href>` yalnızca dış linklerde.
- Sayfa başlığı ve açıklaması Metadata API ile; her route kendi metadata'sını verir.

## Route'lar

Route'lar İngilizce, arayüz metinleri Türkçe. Bilinçli bir ayrım, düzeltme.

- `/` LandingPage · `/projects` Projeler · `/about` Hakkımda · `/experience` Tecrübe
- `not-found` → sayfa bulunamadı + ana sayfaya dönüş linki. Navbar korunur.

## Yorum satırları

Az ve yalnızca gerekli yerde. Maksimum 2 satır, `"... işini yapar."` biçiminde. Kodun NE yaptığını değil, NEDEN öyle olduğunu yaz — ne yaptığı zaten kodda.

## Takılma kuralı

Bir fonksiyonu çalıştırmada problem yaşıyorsan onu ve bağlantılı olanları pas geç, yanına `(Sonra bakılacak)` yaz, sonraki adıma atla. Tıkanıp bekleme.

## Plan ve rapor tarzı

- Plan çok kısa, sade, öz ve tamamen iş odaklı olur.
- İhtimal değerlendirmesi YOK. "Bu da olabilir / belki / şöyle de yapılabilir" tarzı olasılık cümlesi kurulmaz. Ne yapılacaksa o yazılır.
- Fazlara böl, fazların altına substep koy.
- Her fazın bitiminde çok kısa rapor geç.

## Bug vs. iyileştirme

Bug ve hataları sorma, kesinlikle düzelt. Yaşam kalitesi iyileştirmelerini uygulamadan önce üç soruyla sun: gerekli mi ve neyi değiştirecek, faydası ne kadar, gözle görülür fark olacak mı.

## Delegasyon kapısı — çalışma anı

Proje küçük ve dosya sayısı az. **Varsayılan yol: kendin yap.**

1. Tek geçişte, 1-2 dosyaya dokunarak yapabiliyor musun? → Evet: KENDİN yap.
2. Değilse: çok dosya okuma veya keşif için `Explore`, strateji için `Plan`.
3. Yeni agent OLUŞTURMA. Gerektiğini düşünüyorsan söyle; kalıcı ekleme kararını `/create-subagent` skill'iyle ben veririm.
4. Parçalar bağımsızsa paralel, bağımlıysa sıralı git ve öncekinin özetini sonrakinin görevine koy.

## Handoff

Her subagent'a net görev + beklenen çıktı ver. Subagent işi kendi izole context'inde yapar, sana yalnızca kısa özet döner. Ara log dosyası YOK.

## Nerede ne var

- Mimari ve yığın → `docs/codemap.md` (otomatik yüklenir). Amaç ve kapsam → `PRODUCT.md`.
- Klasöre özel kurallar → `.claude/rules/`. Worker rolleri → `.claude/agents/`.
- Tasarımın kaynağı (canvas, diyagram, ham notlar) → `Obsidian/`. Kural metinleri oradan türetildi; çelişki varsa repo içindeki kural dosyası geçerlidir.
- Değişiklik geçmişi → `docs/CHANGELOG.md`. Session özetleri → `docs/sessions/`. İkisi de gerekince okunur, otomatik yüklenmez.
- `codemap.md` ve `CHANGELOG.md` takip edilir. `sessions.md` ve `sessions/` kişiseldir, `.gitignore`'da.

## Session komutları

- **"CLAUDE.md oku"** → `docs/sessions.md` varsa sessizce oku, kalınan yeri bağlamına al. Dosyayı BOŞALTMA.
- **"session'ı bitir"** → `docs/sessions.md` SONUNA ekle: 10-20 satır, ne yapıldı ve nerede kalındı.
- **"session'ı kapat" / "session'ları kaydet"** → sessions.md'yi özetle, `docs/sessions/Session_GG-AA-YYYY.md`'ye yaz (varsa sonuna ekle), ardından sessions.md'yi boşalt.
- **"codemap güncelle"** → codemap BOŞSA tam tarama. DOLUYSA `git log -1 --format=%cI -- docs/codemap.md` ile son güncellemeyi bul, o zamandan beri değişen dosyaların bölümlerini güncelle. `git log` boşsa tam tarama.
- **"changelog'a ekle" / "günü kapat"** → `docs/CHANGELOG.md`'ye birkaç satır (append).
- **"günü bitir"** → önce codemap, sonra changelog.

## Token verimliliği

- Bu dosyayı 200 satırın altında tut.
- Kod tabanından çıkarılabilecek şeyi yazma — yalnızca istisnaları, gerekçeleri ve tuzakları tut.
- Her göreve uymayan kuralı `.claude/rules/`'a taşı.
- `@path` import'ları organizasyonu kolaylaştırır ama context'i azaltmaz; import edilen dosya da açılışta yüklenir.
- Periyodik olarak `/doctor` çalıştır.

@docs/codemap.md
@docs/sessions.md
