
# Arayüz kuralları

Hedef konum: `.claude/rules/ui.md` Eşleşme: `src/components/**`, `src/app/**`, `src/styles/**`, `tailwind.config.ts`

## Stil

- Tailwind. Ayrı CSS dosyası ve inline `style` yok; tek istisna `globals.css`.
- Renk, boşluk, kırılma noktası `tailwind.config` içinde token olarak durur. Bileşende `#1e293b` gibi çıplak değer yazma.
- Arbitrary değer (`w-[437px]`) yalnızca overlap hesapları için ve yalnızca `OverlapPair` içinde. Başka yerde görürsen token eksik demektir.
- Koşullu sınıflar `src/lib/cn.ts` içindeki `cn()` ile birleşir (`clsx` + `tailwind-merge`); şablon string'i ile sınıf üretme. `tailwind-merge` çakışan sınıfları temizler: `px-2 px-4` → `px-4`.
- Sınıf sırasını `prettier-plugin-tailwindcss` düzenler. Elle sıraya dizme.
- Mobile-first: temel sınıf mobil, `md:` ve üstü masaüstü.

## Renkler

Palet `tailwind.config` içinde token olarak tanımlı. Çıplak hex yazma.

- Zemin `bg-page`, kart `bg-surface`, görsel bloğu `bg-surface-media`. Overlap bu üç tonun farkıyla okunur; ayrıca kenarlık koyma.
- Metin hiyerarşisi renkle kurulur: başlık `text-ink`, gövde `text-ink-secondary`, tarih ve not `text-ink-muted`.
- `text-ink-muted` yalnızca 300 ve 400 ağırlıkla kullanılır. 100 ile birleşince kontrast AA altına düşer.
- **Ahududu ikiye ayrılır.** `raspberry-500` dekoratif dolgu; üstünde metin taşımaz (beyaz metinle 4.3:1, AA altı). Metin, link ve rozet zemini için `raspberry-700` kullanılır.
- Sayfada tek vurgu rengi vardır. İkinci bir canlı renk eklemeden önce sor.

## Tipografi

- Tek font: IBM Plex Serif, `next/font` ile yüklenir.
- **Yalnızca üç ağırlık var: 100, 300, 400.** `font-medium`, `font-semibold`, `font-bold` KULLANMA — yüklü değiller, tarayıcı sahte kalın üretir ve serif'te bu bariz durur. Bu sınıflar `tailwind.config` içinde zaten tanımsız; kullanırsan çalışmaz.
- Hiyerarşi ağırlıkla değil; boyut, boşluk ve renk ile kurulur.
- Boyut token'ları: `text-display`, `text-h1`, `text-h2`, `text-h3`, `text-lead`, `text-body`, `text-small`, `text-caption`. Çıplak `text-[28px]` yazma.
- `display`, `h1` ve `h2` clamp ile tanımlı; mobilde kendiliğinden daralır. Bu üçü için ayrıca `md:text-*` yazma.
- Uzun metin blokları `max-w-prose` (62ch) ile sınırlanır. Serif satır uzunluğu bundan fazla olunca okunmuyor.
- Yeni ağırlık gerekiyorsa sor. Her ağırlık ek font dosyası ve ek yükleme demek.

## Boşluk

- Bölümler arası `py-section` (clamp, mobilde daralır).
- Overlap kayması `overlap` ve `overlap-lg` token'larıyla verilir; negatif margin değeri elle yazılmaz.
- Geri kalan boşluklar Tailwind'in varsayılan 4px skalası.

## Layout ve responsive

- Overlap efekti sitenin görsel kimliği ve dar ekranda ilk kırılan şey. Overlap yalnızca `md` ve üstünde; altında bloklar alt alta düşer.
- **DOM sırası sabittir: önce görsel, sonra metin.** `reverse` prop'u yalnızca masaüstünde yerleşimi çevirir (CSS `order`/grid), DOM'a dokunmaz. Böylece mobil yığılma ve ekran okuyucu sırası her yerde aynı kalır.
- Mobilde overlap kapanır ama boşluk kalmaz; blok arası ritmi `gap` taşır.
- Yeni bölüm masaüstü + mobil birlikte verilir. Tek breakpoint'lik iş tamamlanmış sayılmaz.

## Navbar ve dış linkler

- Navbar iki parçadan oluşur: solda sayfa linkleri, sağ üstte ikon grubu (`SocialLinks`) — GitHub, LinkedIn, Mail. İkisi de `src/config/` içinde, DB'de değil.
- GitHub ve LinkedIn dışa gider: `target="_blank"` + `rel="noopener noreferrer"`.
- **Mail farklı davranır.** `mailto:` linkine `target="_blank"` verme; boş bir sekme açıp arkada bırakır. Aynı sekmede kalır, istemciyi işletim sistemi açar.
- **Yalnız ikon = görünür metin yok.** Her ikon linkinde `aria-label` zorunlu. Tooltip erişilebilirlik yerine geçmez.
- Dokunma hedefi mobilde en az 44×44px; ikon küçülürken tıklama alanı küçülmez.
- İkonlar `lucide-react`'ten tek tek import edilir (`import { Github } from "lucide-react"`). İkinci bir ikon paketi ekleme.
- Mobilde sığmıyorsa ikonlar kalır, sayfa linkleri menüye taşınır — iletişim her ekranda tek dokunuş uzaklıkta.
- Mobil menü `@radix-ui/react-dialog` üzerine kurulur. Focus trap, Escape, scroll kilidi ve aria bağlantılarını elle yazma; bu iş göründüğünden zor.

## Animasyonlar

Motion (eski adı Framer Motion) + IntersectionObserver. Paket adı `motion`, import `motion/react` üzerinden. `framer-motion` paketini kurma — hâlâ çalışıyor ama aktif geliştirilmiyor.

Tanımlı dört kalıp dışına çıkma; yeni animasyon gerekiyorsa sor. Door FadeIn-Left&Right → içerik geçişleri. Door FadeIn-Up&Down → navbar sayfa geçişleri. Partial FadeIn-Left&Right&Up → LandingPage. Scroll reveal → içerik bölümleri görünür alana girince belirir.

### Görev dağılımı

- **Animasyonlu her şey Motion.** Scroll reveal için `whileInView` + `viewport={{ once: true }}` yeterli; bunun için kendi observer'ını yazma. Motion'ın `whileInView`'i zaten IntersectionObserver kullanıyor.
- **Kendi `useInView` hook'un yalnızca animasyon olmayan takip için.** (Bir bölüm göründüğünde animasyon dışında bir şey tetiklemek gibi.) Şu an böyle bir ihtiyaç yok; doğarsa `src/lib/hooks/` içine gelir.
- İkisini aynı iş için üst üste bindirme; iki observer aynı elemanı izliyorsa biri gereksizdir.

### Zorunlu kurallar

- **İçerik varsayılan olarak görünür.** Motion `initial={{ opacity: 0 }}` değerini SSR HTML'ine yazar; JS gelmezse içerik görünmez kalır. Bunu `globals.css` içindeki `<noscript>` kuralı telafi eder: JS yokken animasyonlu elemanlar tam görünür hale gelir. Bu fallback olmadan reveal eklenmez.
- Reveal bir kez tetiklenir (`viewport={{ once: true }}`). Yukarı kaydırıp inince tekrar oynamaz.
- **Sayfa geçişleri `template.tsx` ile.** `layout.tsx` navigasyonda remount olmaz, giriş animasyonu tetiklenmez.
- `useReducedMotion` ile `prefers-reduced-motion` her animasyonlu bileşende kontrol edilir; azaltılmışsa bileşen sade haline döner.
- Yalnızca `transform` ve `opacity` animasyonu. Layout kaydıran özellik (width, height, top, left) animasyonu YOK.
- `LazyMotion` + `m` bileşeni kullanılır; tam `motion` importu bundle'a gereksiz yük bindirir.
- Motion, Client Component gerektirir. Animasyon yaprakta kalır, sayfayı client'a çevirmez.

## Görseller

- Görseller repo'da `public/images/` altında. DB yalnızca yolu tutar (`/images/projects/x.webp`).
- Repo'ya optimize edilmiş dosya girer; telefondan çıkmış ham JPEG değil. Görsel repo'ya girmeden önce boyutlandırılır ve sıkıştırılır.
- Tüm görseller `next/image`. Ham `<img>` yok.
- `alt` zorunlu; dekoratif görselde `alt=""`.
- İlk ekrandaki görsellerde `priority`, diğerlerinde varsayılan lazy davranış.
- `sizes` gerçek gösterim genişliğini yansıtır; masaüstü genişliğini mobile indirtme.

## Erişilebilirlik

- Navbar klavyeyle gezilebilir; aktif sayfada `aria-current`.
- Overlap'te görsel sıra ile DOM sırası çakışırsa DOM sırası okuma mantığını korur.
- Kontrast AA. IBM Plex Serif ince ağırlıklarda (100, 300) kontrast düşer; küçük punto + Thin kombinasyonundan kaçın.