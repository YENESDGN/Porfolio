import { Mail } from "lucide-react";
import { socialLinks, type SocialKey } from "@/config";
import { cn } from "@/lib/cn";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";

type IconComponent = React.ComponentType<{
  className?: string;
  strokeWidth?: number;
  "aria-hidden"?: boolean | "true" | "false";
}>;

// İkon bileşeni config'de değil burada: config React'tan bağımsız kalsın diye
// eşleme `key` üzerinden yapılır.
const icons: Record<SocialKey, IconComponent> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  mail: Mail,
};

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center", className)}>
      {socialLinks.map((link) => {
        const Icon = icons[link.key];

        return (
          <li key={link.key}>
            <a
              href={link.href}
              aria-label={link.label}
              // mailto'ya target="_blank" verilmez: boş bir sekme açıp bırakır.
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className={cn(
                "flex size-11 items-center justify-center text-ink-secondary transition-colors",
                "hover:text-raspberry-700",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-raspberry-700",
              )}
            >
              <Icon aria-hidden="true" strokeWidth={1.5} className="size-5" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
