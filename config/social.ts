// `external: false` olan mailto aynı sekmede açılır; ikon bileşen değil yol dizesi
// ki config React'tan bağımsız kalsın.
export const socialLinks = [
  {
    key: "github",
    label: "GitHub",
    href: "https://github.com/YENESDGN",
    icon: "/images/social/github.svg",
    external: true,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/yagiz-enes-dogan",
    icon: "/images/social/linkedin.svg",
    external: true,
  },
  {
    key: "mail",
    label: "E-posta",
    href: "mailto:yenesdogan@outlook.com.tr",
    icon: "/images/social/gmail.svg",
    external: false,
  },
] as const;
