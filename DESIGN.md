---
name: Yağız Doğan — Portfolyo
description: Fildişi kâğıt yaprakları soğuk cam levhaların üstüne kayar; ahududu basılmış mürekkeptir.
colors:
  page: "#fffcff"
  surface: "#f6f7eb"
  surface-media: "#d1f5ff"
  ink: "#353535"
  ink-secondary: "#5c5c58"
  ink-muted: "#75756f"
  ink-inverse: "#fffcff"
  line: "#e4e4dc"
  line-strong: "#cfcfc5"
  raspberry-50: "#fbeaec"
  raspberry-500: "#de3c4b"
  raspberry-600: "#c0303f"
  raspberry-700: "#a82836"
typography:
  display:
    fontFamily: "IBM Plex Serif, Georgia, serif"
    fontSize: "clamp(2.5rem, 1.6rem + 4.2vw, 3.5rem)"
    fontWeight: 100
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  h1:
    fontFamily: "IBM Plex Serif, Georgia, serif"
    fontSize: "clamp(2rem, 1.4rem + 2.8vw, 2.5rem)"
    fontWeight: 300
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  h2:
    fontFamily: "IBM Plex Serif, Georgia, serif"
    fontSize: "clamp(1.5rem, 1.2rem + 1.4vw, 1.875rem)"
    fontWeight: 300
    lineHeight: 1.3
  h3:
    fontFamily: "IBM Plex Serif, Georgia, serif"
    fontSize: "1.375rem"
    fontWeight: 400
    lineHeight: 1.4
  lead:
    fontFamily: "IBM Plex Serif, Georgia, serif"
    fontSize: "1.125rem"
    fontWeight: 300
    lineHeight: 1.75
  body:
    fontFamily: "IBM Plex Serif, Georgia, serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  small:
    fontFamily: "IBM Plex Serif, Georgia, serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
  caption:
    fontFamily: "IBM Plex Serif, Georgia, serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  none: "0"
spacing:
  overlap: "3rem"
  overlap-lg: "4.5rem"
  section: "clamp(4rem, 2rem + 7vw, 7rem)"
components:
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "1.5rem"
  media-plane:
    backgroundColor: "{colors.surface-media}"
    rounded: "{rounded.none}"
  nav-link:
    textColor: "{colors.ink-secondary}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
  nav-link-active:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
  link-accent:
    textColor: "{colors.raspberry-700}"
    typography: "{typography.body}"
  button-primary:
    backgroundColor: "{colors.raspberry-700}"
    textColor: "{colors.ink-inverse}"
    rounded: "{rounded.none}"
    padding: "0.75rem 1.25rem"
  icon-link:
    textColor: "{colors.ink-secondary}"
    rounded: "{rounded.none}"
    height: "44px"
    width: "44px"
---

# Design System: Yağız Doğan — Portfolyo

## Overview

**Creative North Star: "Kağıt ve Cam"**

Site iki malzemeden kurulu: sıcak fildişi kâğıt ve soğuk cam. Metin blokları kâğıttır — mat, hafif sarıya çalan, üzerine yazı basılmış. Görsel blokları camdır — soğuk, mavimsi, arkasında bir şey duran. Overlap tam olarak budur: bir kâğıdın cam levhanın üstüne kayması. İki yüzey birbirine çizgiyle değil, ton farkıyla değer; kenarlık çizmek kâğıdı kâğıt olmaktan çıkarır.

Ahududu bu iki malzemeye basılmış mürekkeptir. Nadirdir ve tek iş yapar: gidilecek yeri işaret eder, dekorasyona harcanmaz. Tipografi tek aileden ve üç ince ağırlıktan ibarettir; hiyerarşi kalınlıkla değil boyut, boşluk ve renkle kurulur — bir baskı ustasının aynı puntodan farklı ritim çıkarması gibi.

Site sakin, dar ve dingin. Etkileşim yüzeyi bilinçli olarak dardır: ziyaretçi işi görsün diye arayüz geri çekilir.

**Key Characteristics:**

- Kâğıt (`surface`) ve cam (`surface-media`) iki ayrı malzemedir; birbirinin yerine geçmez.
- Kenarlık yok. Ayrım tondan okunur.
- Tek vurgu rengi, seyrek kullanım.
- Tek font, üç ince ağırlık; kalın hiç yok.
- Kare kenar: kâğıdın da camın da köşesi keskindir.

## Colors

Palet dar ve bilinçli bir sıcak–soğuk karşıtlığı üzerine kurulu: sıcak fildişi kâğıt, soğuk buz mavisi cam, neredeyse beyaz zemin.

### Primary

- **Ahududu Mürekkebi** (`#de3c4b`, `raspberry-500`): Yalnızca dekoratif dolgu. Üzerine metin gelmez — beyaz metinle 4.3:1, AA altında kalır.
- **Basılmış Ahududu** (`#a82836`, `raspberry-700`): Metin, link ve rozet zemini bu tondan okunur. Sitedeki tek vurgu sesi.
- **Ahududu Gölgesi** (`#c0303f`, `raspberry-600`): Hover ve basılı durum.
- **Soluk Ahududu** (`#fbeaec`, `raspberry-50`): Çok seyrek; vurgu rengiyle akraba açık zemin.

### Neutral

- **Sayfa Beyazı** (`#fffcff`, `page`): Zemin. Saf beyaz değil, hafif sıcak.
- **Fildişi Kâğıt** (`#f6f7eb`, `surface`): Metin bloklarının malzemesi. Her kart bu tonu taşır.
- **Buz Camı** (`#d1f5ff`, `surface-media`): Görsel bloklarının malzemesi; fotoğrafın altındaki levha.
- **Mürekkep** (`#353535`, `ink`): Başlık ve birincil metin.
- **İkincil Mürekkep** (`#5c5c58`, `ink-secondary`): Gövde metni.
- **Soluk Mürekkep** (`#75756f`, `ink-muted`): Tarih, not, üst veri.
- **Ters Mürekkep** (`#fffcff`, `ink-inverse`): Koyu zemin üzerindeki metin.
- **Çizgi / Güçlü Çizgi** (`#e4e4dc` / `#cfcfc5`, `line` / `line-strong`): Yalnızca gerçek ayraç ve ray için; kart kenarı için değil.

### Named Rules

**The Two Materials Rule.** `surface` kâğıttır, `surface-media` camdır. Metin bloğunun malzemesi kâğıt, görsel bloğunun malzemesi camdır; biri diğerinin malzemesini giymez. Cam levhanın kâğıdın üstüne monte edilmesi kuralın ihlali değil, tam da kendisidir. Bir bloğun hangi malzeme olduğu belirsizse tasarım kararı henüz verilmemiştir.

**The Ink Rarity Rule.** Ahududu bir ekranın %10'undan fazlasını kaplamaz. Nadirliği onun gücüdür; ikinci bir canlı renk eklenmeden önce sorulur.

**The Never Gray On Color Rule.** Renkli zemin üzerinde `ink-muted` kullanılmaz; ikincil metin o zeminin kendi tonundan koyultularak türetilir.

## Typography

**Tek aile:** IBM Plex Serif (`latin` + `latin-ext`), yedek Georgia. `latin-ext` zorunlu — yoksa ş/ğ/ı/İ yedek fonta düşer ve satır ortasında malzeme değişir.

**Character:** İnce çizgili, yüksek kontrastlı bir serif. Kalın hiç yüklenmez; sayfa ince kalır ve ağırlık yerine boşluk konuşur.

### Hierarchy

- **Display** (100, `clamp(2.5rem → 3.5rem)`, 1.1, `-0.02em`): Sayfa başına bir kez. Ana sayfanın açılış sesi.
- **H1** (300, `clamp(2rem → 2.5rem)`, 1.2, `-0.01em`): Sayfa başlığı.
- **H2** (300, `clamp(1.5rem → 1.875rem)`, 1.3): Bölüm ve kart başlığı.
- **H3** (400, `1.375rem`, 1.4): Roadmap girdisi, proje adı.
- **Lead** (300, `1.125rem`, 1.75): Hoşgeldin yazısı ve bölüm girişi.
- **Body** (400, `1rem`, 1.7): Gövde metni; `max-w-prose` ile 62ch.
- **Small** (400, `0.875rem`, 1.6): Yardımcı metin, tech stack etiketi.
- **Caption** (400, `0.8125rem`, 1.5): Tarih ve üst veri.

### Named Rules

**The No Weight Rule.** `--font-weight-*: initial` sıfırlaması `font-bold` ve `font-semibold` sınıflarını üretimden tamamen siler. Kalın yazılamaz; yazılırsa tarayıcı sahte kalın üretir ve serif'te bu apaçık görünür. Vurgu boyut, boşluk ve renkle kurulur.

**The Thin Contrast Rule.** 100 ve 300 ağırlıklar küçük puntoyla birleşmez. `ink-muted` yalnızca 300 ve 400 ile kullanılır; 100 ile kontrast AA altına düşer.

**The 62ch Rule.** Uzun metin `max-w-prose` ile sınırlanır. Serif satır uzunluğu bunun ötesinde okunmaz hale gelir. Değer `--max-width-prose` üzerinden verilir — `--container-prose` yazılırsa Tailwind sessizce yerleşik 65ch'te kalır.

## Layout

Mobil önce: temel sınıf mobil, `md:` ve üstü masaüstü.

Bölümler arası ritim `py-section` (`clamp(4rem → 7rem)`) ile kurulur. Overlap kayması `overlap` (3rem) ve geniş ekranda `overlap-lg` (4.5rem) token'larıyla verilir; elle negatif değer yazılmaz. Kalan boşluk Tailwind'in 4px ölçeğinden gelir.

Overlap yalnızca `md` ve üstünde vardır. Altında bloklar dikey yığılır ve ritmi `gap` taşır — kayma kaybolur, nefes kaybolmaz. DOM sırası her koşulda görsel → metin; `reverse` yalnızca masaüstü sütununu değiştirir, böylece mobil yığın ve ekran okuyucu sırası her yerde aynı kalır.

Dokunma hedefi mobilde en az 44×44px. İkon küçülürken tıklama alanı küçülmez.

### Named Rules

**The Single Overlap Rule.** Sitede tek overlap uygulaması vardır: `OverlapPair`. İkincisi yazılmaz; yön farkı `reverse` prop'uyla verilir.

**The Both Breakpoints Rule.** Yeni bir bölüm masaüstü **ve** mobiliyle birlikte teslim edilir. Tek breakpoint'lik iş tamamlanmış sayılmaz.

## Elevation & Depth

Sistem varsayılan olarak düzdür. Derinlik üç yüzey tonundan ve overlap sırasından okunur; kart yığını, katmanlı gölge, cam efekti yoktur.

Tek istisna temas gölgesidir: üstteki kâğıt alttaki cam levhayı kestiği yerde tek bir yumuşak gölge bırakır. Bu gölge overlap'in fiziksel gerçeğini taşır — kâğıt gerçekten yukarıdadır. Başka hiçbir yerde gölge kullanılmaz.

### Shadow Vocabulary

- **contact** (`box-shadow: 0 4px 16px rgba(53, 53, 53, 0.08)`): Yalnızca `OverlapPair`'in üstteki içerik bloğunda ve yalnızca `md` ve üstünde — yani yalnızca overlap'in var olduğu yerde.

### Named Rules

**The One Shadow Rule.** Sistemde tek bir gölge vardır ve tek bir işi vardır. Kart, buton, navbar, menü gölge almaz. İkinci bir gölge gerekiyorsa hiyerarşi başka bir yerde çözülmemiş demektir.

## Shapes

Kare kenar. Kâğıdın da camın da köşesi keskindir; `rounded` ölçeği yalnızca `none` içerir.

Kenarlık kart çevresinde kullanılmaz — bir bloğun sınırı arka plan tonunun değiştiği yerdir. `line` ve `line-strong` yalnızca gerçek ayraçlara ayrılmıştır: roadmap'in dikey rayı, bölüm ayracı.

### Named Rules

**The Square Edge Rule.** Hiçbir yüzey yuvarlatılmaz. Buton, kart, görsel, menü — hepsi keskin köşelidir.

**The No Card Border Rule.** Kartın kenarlığı yoktur. Kenarlık ihtiyacı hissediliyorsa ton farkı yeterince çalışmıyordur; çözüm çizgi değil ton.

## Components

### Kart (`Card`)

- **Malzeme:** `bg-surface` (fildişi kâğıt), kenarlıksız, kare köşe.
- **İç boşluk:** `p-6`, `md:p-8`.
- **Başlık:** İsteğe bağlı `title` → H2, altında `mb-4`.
- **Gölge:** Yok. Yalnızca `OverlapPair` içindeki üst blok temas gölgesi alır.

### Overlap (`OverlapPair`)

- **Yapı:** `md` ve üstünde iki sütunlu grid, `items-end` ile alttan hizalı. Üstteki içerik bloğu komşu sütuna `-ml-overlap` / `-mr-overlap` (geniş ekranda `overlap-lg`) taşarak ısırır.
- **Yön:** `reverse` yalnızca masaüstü sütununu değiştirir; DOM sırası sabit.
- **Mobil:** Tek sütun, `gap-6`. Taşma ve gölge yok.

### Görsel bloğu (media plane)

- **Malzeme:** `bg-surface-media` (buz camı). Görsel yüklenmeden önce de bu levha görünür; boş kutu bırakılmaz.
- **Görsel:** Her zaman `next/image`, `alt` zorunlu, dekoratifse `alt=""`. Katlanın üstündeki görselde `preload` — Next 16'da `priority` kullanımdan kaldırıldı.

### Linkler

- **Vurgu linki:** `text-raspberry-700`, `underline underline-offset-4`. Sitedeki tıklanabilir tek yüzey linktir; kart, fotoğraf ve metin bloğu asla anchor değildir.
- **İkon linki:** 44×44 dokunma hedefi, `aria-label` zorunlu. GitHub/LinkedIn `target="_blank" rel="noopener noreferrer"`; `mailto:` hiçbiri — yeni sekme boş sekme bırakır.

### Navigasyon

- **Navbar:** Solda sayfa linkleri, sağ üstte ikon grubu. Aktif linkte `aria-current="page"` ve `text-ink`; pasif link `text-ink-secondary`.
- **Mobil menü:** Radix Dialog. İkonlar mobilde de görünür kalır, yalnızca sayfa linkleri menüye taşınır — iletişim her ekranda tek dokunuş uzakta.

### Buton

- **Birincil:** `bg-raspberry-700`, `text-ink-inverse`, kare köşe, `px-5 py-3`. Sitede yalnızca hata kurtarma ("Yeniden dene") için vardır; form olmadığı için başka buton yoktur.

## Do's and Don'ts

### Do:

- **Do** metin bloğunu `surface`, görsel bloğunu `surface-media` yap; malzeme ayrımı sistemin belkemiği.
- **Do** hiyerarşiyi boyut, boşluk ve renkle kur.
- **Do** uzun metni `max-w-prose` ile 62ch'de sınırla.
- **Do** overlap kaymasını `overlap` / `overlap-lg` token'larıyla ver.
- **Do** her ikon linke `aria-label` yaz ve dokunma hedefini 44×44'te tut.
- **Do** animasyonlu her blokta `useReducedMotion` kontrol et ve `data-animated` işaretini koy.

### Don't:

- **Don't** `font-bold` / `font-semibold` yazma; sınıf üretilmiyor, sahte kalın çıkıyor.
- **Don't** kart çevresine kenarlık koyma; ayrım ton farkından okunur.
- **Don't** köşe yuvarlatma; kâğıt ve cam keskin köşelidir.
- **Don't** temas gölgesi dışında gölge ekleme.
- **Don't** `raspberry-500` üzerine metin koyma; AA altında kalıyor, metin için `raspberry-700` var.
- **Don't** renkli zemin üzerinde `ink-muted` kullanma.
- **Don't** ikinci bir overlap uygulaması yazma; `OverlapPair` tektir.
- **Don't** kartı, fotoğrafı veya metin bloğunu anchor yapma; tıklanabilir tek yüzey linktir.
