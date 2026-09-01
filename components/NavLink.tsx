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
        "inline-block py-2 text-body transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-raspberry-700",
        isActive ? "text-ink" : "text-ink-secondary hover:text-ink",
        className,
      )}
    >
      {label}
    </Link>
  );
}
