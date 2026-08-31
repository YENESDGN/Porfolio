// Route'lar İngilizce, etiketler Türkçe — bilinçli ayrım.
export const navLinks = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/projects", label: "Projeler" },
  { href: "/about", label: "Hakkımda" },
  { href: "/experience", label: "Tecrübe" },
] as const;

export type NavLinkItem = (typeof navLinks)[number];
