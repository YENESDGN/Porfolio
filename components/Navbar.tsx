import { navLinks } from "@/config";
import { MobileMenu } from "./MobileMenu";
import { NavLink } from "./NavLink";
import { SocialLinks } from "./SocialLinks";

// İkonlar mobilde de görünür kalır, yalnızca sayfa linkleri menüye taşınır:
// iletişim her ekranda tek dokunuş uzakta.
export function Navbar() {
  return (
    <header className="pt-6">
      <nav
        aria-label="Ana gezinme"
        className="flex items-center justify-between gap-4"
      >
        {/* -ml-3 / -mr-3: 44px dokunma kutusunun içindeki ikonu sayfa
            kenarına optik olarak hizalar, hedefi küçültmeden. */}
        <div className="-ml-3 md:hidden">
          <MobileMenu />
        </div>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <NavLink href={link.href} label={link.label} />
            </li>
          ))}
        </ul>

        <SocialLinks className="-mr-3" />
      </nav>
    </header>
  );
}
