// İkon bileşeni burada tutulmaz; SocialLinks `key` üzerinden eşler, config React'tan bağımsız kalır.
// `external: false` olan mailto aynı sekmede açılır — target="_blank" boş sekme bırakır.
export const socialLinks = [
  {
    key: "github",
    label: "GitHub",
    // (Sonra bakılacak) Gerçek profil adresleriyle değiştirilecek.
    href: "https://github.com/kullanici",
    external: true,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kullanici",
    external: true,
  },
  {
    key: "mail",
    label: "E-posta",
    href: "mailto:ornek@example.com",
    external: false,
  },
] as const;

export type SocialLink = (typeof socialLinks)[number];
export type SocialKey = SocialLink["key"];
