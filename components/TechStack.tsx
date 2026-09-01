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
      <ul className="mt-6 flex flex-wrap items-center gap-6 md:gap-8">
        {items.map((item) => (
          <li key={item.id} title={item.name} className="flex items-center">
            {/* SVG optimize edilmez: vektörde kazanç yok ve unoptimized
                Next'in SVG kısıtını da atlar. */}
            <Image
              src={item.icon}
              alt=""
              width={40}
              height={40}
              unoptimized
              className="size-8 md:size-10"
            />
            <span className="sr-only">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
