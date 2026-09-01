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
- **Gmail zemini daire yapıldı.** Resmi işaret yuvarlatılmış kare (squircle)
  zemin taşır; LinkedIn diskiyle aynı aileye girsin diye daireye çevrildi
  (`<circle cx="16" cy="16" r="14.93">`, LinkedIn ile aynı oran: yarıçap /
  kutu = 20/48). Zarf şeklinin en uç köşesi 13.97 yarıçapta, kırpılmıyor.
  Resmi işaretten bilinçli tek sapma budur.
- `GitHubLink` (proje kartındaki metin linki) bu dosyayı **kullanmaz**:
  orada ikon metnin rengini alması gerektiği için `components/BrandIcons.tsx`
  içindeki `currentColor` sürümü çiziliyor.
