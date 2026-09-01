import Image from "next/image";
import { socialLinks } from "@/config";
import { cn } from "@/lib/cn";

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-4", className)}>
      {socialLinks.map((link) => (
        <li key={link.key}>
          <a
            href={link.href}
            aria-label={link.label}
            // mailto'ya target="_blank" verilmez: boş bir sekme açıp bırakır.
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            className={cn(
              "group relative isolate flex size-12 items-center justify-center overflow-hidden rounded-full",
              // Ahududu dolgu alttan yükselir ve işaretlerin arkasında kalır.
              // isolate olmadan -z-10 navbar'ın arkasına kaçar; overflow-hidden
              // dolguyu daireye kırpar.
              "before:absolute before:inset-x-0 before:top-full before:-z-10 before:h-full before:bg-raspberry-700 before:transition-all before:duration-500",
              "hover:before:top-0 focus-visible:before:top-0",
              "motion-reduce:before:transition-none",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-raspberry-400",
            )}
          >
            <Image
              src={link.icon}
              alt=""
              width={55}
              height={55}
              unoptimized
              className="size-9"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
