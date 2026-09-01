import Image from "next/image";
import type { TechStackEntry } from "@/lib/queries";
import { cn } from "@/lib/cn";

type TechStackProps = {
  items: TechStackEntry[];
  className?: string;
};

// İşaretler yalnızca görsel; ad sr-only olarak taşınır, logoyu tanımayan
// ziyaretçi de title ile karşılığını görür.
export function TechStack({ items, className }: TechStackProps) {
  if (items.length === 0) return null;

  return (
    <div className={cn(className)}>
      <h2 className="text-caption text-ink-muted">Tech Stack</h2>
      <ul className="mt-4 flex flex-wrap items-center gap-5">
        {items.map((item) => (
          <li key={item.id} title={item.name} className="flex items-center">
            {/* SVG optimize edilmez: vektörde kazanç yok ve unoptimized
                Next'in SVG kısıtını da atlar. */}
            <Image
              src={item.icon}
              alt=""
              width={28}
              height={28}
              unoptimized
              className="size-7"
            />
            <span className="sr-only">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
