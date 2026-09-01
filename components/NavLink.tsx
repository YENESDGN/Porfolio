"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavLinkItem } from "@/config";
import { cn } from "@/lib/cn";

type NavLinkProps = {
  href: NavLinkItem["href"];
  label: string;
  className?: string;
  onNavigate?: () => void;
};

// Navbar'ın client olması gereken tek parçası: aktif route'u yalnızca
// usePathname söyleyebilir.
export function NavLink({ href, label, className, onNavigate }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      onClick={onNavigate}
      className={cn(
        "group relative inline-block py-2 text-lead transition-colors duration-300",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-raspberry-700",
        // raspberry-500 metin taşımaz: kâğıt zeminde 4.00:1 ile AA'nın altında.
        isActive ? "text-ink" : "text-ink-secondary hover:text-raspberry-700",
        className,
      )}
    >
      {/* Sözcük çizgiden hafifçe kalkar: transform, satırı kıpırdatmaz. */}
      <span
        className={cn(
          "inline-block transition-transform duration-300 ease-out",
          "group-hover:-translate-y-0.5 group-focus-visible:-translate-y-0.5",
          "motion-reduce:transform-none motion-reduce:transition-none",
        )}
      >
        {label}
      </span>

      {/* Çizgi girişte soldan açılır, çıkışta sağa toplanır: origin değişimi
          hareketi tek yönlü tutar, gidiş geri sarma gibi görünmez. */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 bottom-1 h-px origin-right scale-x-0 bg-raspberry-700",
          "transition-transform duration-300 ease-out",
          "group-hover:origin-left group-hover:scale-x-100",
          "group-focus-visible:origin-left group-focus-visible:scale-x-100",
          "motion-reduce:transition-none",
        )}
      />
    </Link>
  );
}
