import Link from "next/link";
import { cn } from "@/lib/cn";

type TextLinkProps = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
  "aria-current"?: "page";
  onClick?: () => void;
};

// Sitedeki tek işaretçi durumu: sözcük kalkar, çizgi soldan açılıp sağa toplanır.
// NavLink de bunu giyer; çizgi iç sarmalayıcıya bağlı ki dış padding onu kaydırmasın.
export function TextLink({
  href,
  children,
  external = false,
  className,
  "aria-current": ariaCurrent,
  onClick,
}: TextLinkProps) {
  const classes = cn(
    "group relative inline-block text-body text-raspberry-400",
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-raspberry-400",
    className,
  );

  const content = (
    <span className="relative inline-block">
      <span
        className={cn(
          "inline-block transition-transform duration-300 ease-out",
          "group-hover:-translate-y-0.5 group-focus-visible:-translate-y-0.5",
          "motion-reduce:transform-none motion-reduce:transition-none",
        )}
      >
        {children}
      </span>
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
    </span>
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
    <Link
      href={href}
      aria-current={ariaCurrent}
      onClick={onClick}
      className={classes}
    >
      {content}
    </Link>
  );
}
