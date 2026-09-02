"use client";

import { usePathname } from "next/navigation";
import type { NavLinkItem } from "@/config";
import { cn } from "@/lib/cn";
import { TextLink } from "./TextLink";

type NavLinkProps = {
  href: NavLinkItem["href"];
  label: string;
  className?: string;
  onNavigate?: () => void;
};

// Navbar'ın client olması gereken tek parçası: aktif route'u yalnızca usePathname söyleyebilir.
export function NavLink({ href, label, className, onNavigate }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <TextLink
      href={href}
      aria-current={isActive ? "page" : undefined}
      onClick={onNavigate}
      className={cn(
        "py-2 text-lead transition-colors duration-300",
        isActive ? "text-ink" : "text-ink-secondary hover:text-raspberry-400",
        className,
      )}
    >
      {label}
    </TextLink>
  );
}
