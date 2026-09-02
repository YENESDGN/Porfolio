import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { GithubIcon } from "./BrandIcons";

// url yoksa hiç çizilmez: boş kutu bırakmaktansa blok yok sayılır.
export function GitHubLink({
  url,
  className,
}: {
  url: string | null;
  className?: string;
}) {
  if (!url) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative inline-flex items-center rounded-full bg-raspberry-700 py-2.5 pr-11 pl-5 text-body text-ink",
        "transition-colors duration-300 hover:bg-raspberry-600",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-raspberry-400",
        className,
      )}
    >
      <span
        className={cn(
          "inline-flex items-center gap-2 transition-transform duration-300 ease-out",
          "group-hover:-translate-x-1 group-focus-visible:-translate-x-1",
          "motion-reduce:transform-none motion-reduce:transition-none",
        )}
      >
        <GithubIcon aria-hidden="true" className="size-4" />
        GitHub&apos;da gör
      </span>

      <ArrowUpRight
        aria-hidden="true"
        strokeWidth={1.5}
        className={cn(
          "absolute right-5 size-4 translate-x-3 opacity-0 transition duration-300 ease-out",
          "group-hover:translate-x-0 group-hover:opacity-100",
          "group-focus-visible:translate-x-0 group-focus-visible:opacity-100",
          "motion-reduce:transform-none motion-reduce:transition-none",
        )}
      />
      <span className="sr-only"> (yeni sekmede açılır)</span>
    </a>
  );
}
