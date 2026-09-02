import Link from "next/link";
import { cn } from "@/lib/cn";

type TextLinkProps = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
};

// Sitedeki iç vurgu bağlantısı. Hareket NavLink'in altı çizgisiyle aynı:
// üçüncü bir işaretçi durumu icat etmemek için kural aynen tekrarlanır.
export function TextLink({
  href,
  children,
  external = false,
  className,
}: TextLinkProps) {
  const content = (
    <>
      <span
        className={cn(
          "inline-block transition-transform duration-300 ease-out",
          "group-hover:-translate-y-0.5 group-focus-visible:-translate-y-0.5",
          "motion-reduce:transform-none motion-reduce:transition-none",
        )}
      >
        {children}
      </span>

      {/* Çizgi soldan açılır, çıkışta sağa toplanır: NavLink ile aynı yön. */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 -bottom-0.5 h-px origin-right scale-x-0 bg-raspberry-400",
          "transition-transform duration-300 ease-out",
          "group-hover:origin-left group-hover:scale-x-100",
          "group-focus-visible:origin-left group-focus-visible:scale-x-100",
          "motion-reduce:transition-none",
        )}
      />
      {external ? (
        <span className="sr-only"> (yeni sekmede açılır)</span>
      ) : null}
    </>
  );

  // raspberry-400 koyu zeminde metin taşır: 700 orada 3.4:1 ile AA altında.
  const classes = cn(
    "group relative inline-block text-body text-raspberry-400",
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-raspberry-400",
    className,
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
