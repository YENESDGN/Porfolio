import type { TechStackEntry } from "@/lib/queries";
import { cn } from "@/lib/cn";

type TechStackProps = {
  items: TechStackEntry[];
  className?: string;
};

export function TechStack({ items, className }: TechStackProps) {
  if (items.length === 0) return null;

  return (
    <div className={cn(className)}>
      <h2 className="text-caption text-ink-muted">Tech Stack</h2>
      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
        {items.map((item) => (
          <li key={item.id} className="text-small text-ink-secondary">
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
