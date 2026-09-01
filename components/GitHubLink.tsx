import { cn } from "@/lib/cn";
import { GithubIcon } from "./BrandIcons";

type GitHubLinkProps = {
  url: string | null;
  label?: string;
  className?: string;
};

// url yoksa hiç çizilmez: boş kutu bırakmaktansa blok yok sayılır.
export function GitHubLink({
  url,
  label = "GitHub'da gör",
  className,
}: GitHubLinkProps) {
  if (!url) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-2 py-2 text-body text-raspberry-700 underline underline-offset-4 transition-colors",
        "hover:text-raspberry-600",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-raspberry-700",
        className,
      )}
    >
      <GithubIcon aria-hidden="true" strokeWidth={1.5} className="size-4" />
      {label}
      <span className="sr-only"> (yeni sekmede açılır)</span>
    </a>
  );
}
