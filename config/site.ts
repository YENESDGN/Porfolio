// Sabit site kimliği. Değişen içerik DB'de; burası yalnızca ayar tutar.
export const site = {
  name: "Yağız Doğan",
  title: "Yağız Doğan — Portfolyo",
  description:
    "Yazılım geliştirici. Projeler, öğrenim yolculuğu ve iş tecrübesi.",
  locale: "tr_TR",
  // (Sonra bakılacak) Gerçek alan adı belli olunca güncellenecek; metadataBase buradan okur.
  url: "https://example.com",
} as const;
