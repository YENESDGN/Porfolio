# Ürün

Bu dosya **ne** ve **niçin** sorularına cevap verir. **Nasıl** (mimari, kod) → `docs/codemap.md`.

## Amaç

Kişisel portfolyo sitesi. Ziyaretçiye kim olduğumu, ne yaptığımı ve nasıl ulaşacağını görsel ağırlıklı, sakin bir akışta gösterir. Site bir vitrin; etkileşim yüzeyi bilinçli olarak dar.

## Kapsam

Dört sayfa. Route'lar İngilizce, arayüz metinleri Türkçe.

| Route         | Sayfa       | İçerik                                                              |
| ------------- | ----------- | ------------------------------------------------------------------- |
| `/`           | LandingPage | Hoşgeldin yazısı, fotoğraf, "Projeler + (sayısı)" bloğu, tech stack |
| `/projects`   | Projeler    | Proje kartları: fotoğraf + açıklama, varsa GitHub linki             |
| `/about`      | Hakkımda    | Fotoğraf + metin çiftleri, öğrenim roadmap'i                        |
| `/experience` | Tecrübe     | İş hayatı roadmap'i, metin blokları                                 |

Ek olarak `not-found`: geçersiz adres → sayfa bulunamadı mesajı + ana sayfaya dönüş. Navbar korunur.

## Kullanıcı akışı

Tek kullanıcı tipi var: ziyaretçi. Sequence diyagramından türetilen akış:

1. Siteyi açar → ana sayfa görünür (navbar, hoşgeldin yazısı, tech stack, fotoğraf).
2. Her gezinmede: navbar'dan sayfa seçer → sayfa geçiş animasyonuyla üst kısım görünür → aşağı kaydırdıkça bölümler scroll reveal ile belirir (fotoğraf, metin, roadmap, GitHub linki).
3. İletişim: sağ üstteki ikonlar. GitHub/LinkedIn yeni sekmede profil açar; Mail `mailto:` ile aynı sekmede istemciyi açar.
4. Geçersiz adres: not-found görünür, navbar korunur, ana sayfaya dönülür.

## Sınırlar — bilinçli olarak yok

- **Yazma arayüzü yok.** İçerik Prisma Studio veya `prisma/seed.ts` ile elle girilir; admin paneli, giriş ekranı, CMS yok.
- **Form yok.** İletişim ikon linkleriyle; iletişim formu, newsletter, yorum yok.
- **Kullanıcı hesabı, oturum, analitik yok.**
- **Tek dil.** i18n şimdilik kapsam dışı.
- **Blog yok.** İçerik dört sayfayla sınırlı.

## İçerik ritmi

İçerik ayda bir mertebesinde değişir. Bu yüzden sayfalar statik render edilir; güncelleme sonrası ilgili route revalidate edilir. Her istekte DB'ye gitmek bu ritimde gereksiz.

## Tasarım kimliği

- **Overlap layout** sitenin görsel imzası: görsel ve metin blokları birbirinin üstüne biner. Renk farkıyla okunur, kenarlıkla değil.
- **Tek font, üç ince ağırlık** (IBM Plex Serif 100/300/400). Hiyerarşi kalınlıkla değil; boyut, boşluk ve renkle kurulur.
- **Tek vurgu rengi** (ahududu). Sakin zemin, dar palet.
- **Dört animasyon kalıbı** dışına çıkılmaz; hareket dikkat çekmek için değil, geçişi yumuşatmak için.
