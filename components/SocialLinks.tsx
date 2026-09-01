import Image from "next/image";
import { socialLinks } from "@/config";
import { cn } from "@/lib/cn";

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center", className)}>
      {socialLinks.map((link) => (
        <li key={link.key}>
          <a
            href={link.href}
            aria-label={link.label}
            // mailto'ya target="_blank" verilmez: boş bir sekme açıp bırakır.
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            className={cn(
              "group relative isolate flex size-11 items-center justify-center overflow-hidden rounded-full",
              // Ahududu dolgu alttan yükselir. isolate olmadan -z-10 navbar'ın
              // arkasına kaçar; overflow-hidden dolguyu daireye kırpar.
              "before:absolute before:inset-x-0 before:top-full before:-z-10 before:h-full before:bg-raspberry-700 before:transition-all before:duration-500",
              "hover:before:top-0 focus-visible:before:top-0",
              "motion-reduce:before:transition-none",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-raspberry-700",
            )}
          >
            <Image
              src={link.icon}
              alt=""
              width={20}
              height={20}
              unoptimized
              className={cn(
                "size-5 transition-all duration-500 motion-reduce:transition-none",
                // Marka rengi dosyanın içinde; CSS rengi görsele geçmediği için
                // beyaz siluet filtreyle kuruluyor.
                "group-hover:brightness-0 group-hover:invert",
                "group-focus-visible:brightness-0 group-focus-visible:invert",
              )}
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
