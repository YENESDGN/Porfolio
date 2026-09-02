// (Sonra bakılacak) Profil adresleri yer tutucu. `external: false` olan mailto aynı
// sekmede açılır; ikon bileşen değil yol dizesi ki config React'tan bağımsız kalsın.
export const socialLinks = [
  {
    key: "github",
    label: "GitHub",
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
