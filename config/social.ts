// İkon bir yol dizesi olarak burada durur, bileşen olarak değil — config
// React'tan bağımsız kalır. Dosyalar: public/images/social/.
// `external: false` olan mailto aynı sekmede açılır — target="_blank" boş sekme bırakır.
export const socialLinks = [
  {
    key: "github",
    label: "GitHub",
    // (Sonra bakılacak) Gerçek profil adresleriyle değiştirilecek.
    href: "https://github.com/kullanici",
    icon: "/images/social/github.svg",
    external: true,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kullanici",
    icon: "/images/social/linkedin.svg",
    external: true,
  },
  {
    key: "mail",
    label: "E-posta",
    href: "mailto:ornek@example.com",
    icon: "/images/social/gmail.svg",
    external: false,
  },
] as const;

export type SocialLink = (typeof socialLinks)[number];
export type SocialKey = SocialLink["key"];
