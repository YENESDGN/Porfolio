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

- **Hover: ahududu dolgu.** Dinlenirken şeffaf; üzerine gelindiğinde ahududu
  daireyi alttan doldurur ve işaret beyaz silüete döner. Beyaza dönüş CSS
  rengiyle değil `brightness-0 invert` filtresiyle kurulur — marka rengi
  dosyanın içinde ve CSS rengi görsele geçmiyor.
- **Gmail işareti beyaz bir kart taşır.** Dinlenirken fildişi bant üzerinde
  hafif daha parlak okunur; hover halinde filtre onu da beyaza çevirdiği için
  ahududu üstünde sorun çıkarmaz. Marka işaretinin kendi tasarımı; kaldırmak
  logoyu bozar.
- `GitHubLink` (proje kartındaki metin linki) bu dosyayı **kullanmaz**:
  orada ikon metnin rengini alması gerektiği için `components/BrandIcons.tsx`
  içindeki `currentColor` sürümü çiziliyor.
