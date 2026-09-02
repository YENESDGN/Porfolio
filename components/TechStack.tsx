import Image from "next/image";
import type { TechStackEntry } from "@/lib/queries";
import { cn } from "@/lib/cn";

type TechStackProps = {
  items: TechStackEntry[];
  className?: string;
};

// İşaretler yalnızca görsel; ad sr-only olarak taşınır, title ile de görünür.
// Başlık çizilmediği için listenin kimliği aria-label ile duruyor.
export function TechStack({ items, className }: TechStackProps) {
  if (items.length === 0) return null;

  return (
    <ul
      aria-label="Teknolojiler"
      className={cn("grid grid-cols-3 gap-2 md:gap-4", className)}
    >
      {items.map((item) => (
        <li
          key={item.id}
          title={item.name}
          className={cn(
            "group relative isolate flex items-center justify-center px-4 pt-4 pb-5",
            "before:absolute before:inset-0 before:-z-10 before:bg-surface before:opacity-0",
            "before:transition before:duration-300 before:ease-out",
            "hover:before:opacity-100 hover:before:shadow-contact",
            "motion-reduce:before:transition-none",
            "after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-line",
            "after:transition-colors after:duration-300",
            "hover:after:bg-raspberry-400",
            "motion-reduce:after:transition-none",
          )}
        >
          <Image
            src={item.icon}
            alt=""
            width={80}
            height={80}
            unoptimized
            className={cn(
              "size-16 transition-transform duration-300 ease-out md:size-20",
              "group-hover:-translate-y-0.5",
              "motion-reduce:transform-none motion-reduce:transition-none",
            )}
          />
          <span className="sr-only">{item.name}</span>
        </li>
      ))}
    </ul>
  );
}
