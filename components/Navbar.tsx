import { navLinks } from "@/config";
import { Container } from "./Container";
import { MobileMenu } from "./MobileMenu";
import { NavLink } from "./NavLink";
import { SocialLinks } from "./SocialLinks";

// Kâğıt bant tam genişlikte; ölçüyü içerideki Container taşır. Sayfa
// zemininden ayrımı ton farkı kurar — kenarlık ya da gölge yok.
// İkonlar mobilde de görünür kalır, yalnızca sayfa linkleri menüye taşınır:
// iletişim her ekranda tek dokunuş uzakta.
// h-nav sabit: bölüm yüksekliği bu değeri düştüğü için bandın büyümesi ilk
// ekranı taşırırdı. sticky bandı tam ekran bölümler boyunca üstte tutar.
export function Navbar() {
  return (
    <header className="sticky top-0 z-40 h-nav bg-surface py-3.75">
      <Container width="wide">
        <nav
          aria-label="Ana gezinme"
          className="flex items-center justify-between gap-5.25"
        >
          {/* Negatif kenarlar ikonu sayfa kenarına optik hizalar, hedefi
              küçültmeden: iki yanda da 48px kutuda 6px iç boşluk. */}
          <div className="-ml-1.5 md:hidden">
            <MobileMenu />
          </div>

          <ul className="hidden items-center gap-10.5 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <NavLink href={link.href} label={link.label} />
              </li>
            ))}
          </ul>

          <SocialLinks className="-mr-1.5" />
        </nav>
      </Container>
    </header>
  );
}
