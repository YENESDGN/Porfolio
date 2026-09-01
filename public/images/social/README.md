# Sosyal işaretler

`config/social.ts` her bağlantının `icon` alanında buradaki dosyanın yolunu
tutar. `SocialLinks` bileşeni `next/image` ile `unoptimized` çizer.

| Dosya          | Karşılığı       | viewBox                   |
| -------------- | --------------- | ------------------------- |
| `github.svg`   | GitHub          | `0 0 20 20`               |
| `linkedin.svg` | LinkedIn        | `0 0 48 48`               |
| `gmail.svg`    | E-posta (Gmail) | `-1.92 -1.92 35.84 35.84` |

Hepsi resmi marka işareti, kendi renkleriyle. `DESIGN.md`, The Borrowed Ink
Exception kapsamındalar.

## Bilinmesi gerekenler

- **Hover rengi yok.** `next/image` bir `<img>` çizer; CSS rengi görsele
  geçmez. Vurgu artık opaklıkla veriliyor (`opacity-80` → `opacity-100`).
  Odak halkası `<a>` üzerinde, etkilenmiyor.
- **Gmail işareti beyaz bir kart taşır.** Navbar kâğıt bandı fildişi
  (`#f6f7eb`) olduğu için bu kart hafif daha parlak bir kutu olarak okunur.
  Marka işaretinin kendi tasarımı; kaldırmak logoyu bozar.
- `GitHubLink` (proje kartındaki metin linki) bu dosyayı **kullanmaz**:
  orada ikon metnin rengini alması gerektiği için `components/BrandIcons.tsx`
  içindeki `currentColor` sürümü çiziliyor.
