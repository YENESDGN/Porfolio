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
              "flex size-11 items-center justify-center opacity-80 transition-opacity",
              // Marka renkleri görselin içinde: CSS rengi görsele geçmediği için
              // vurgu renkle değil opaklıkla veriliyor.
              "hover:opacity-100",
              "focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-raspberry-700",
            )}
          >
            <Image
              src={link.icon}
              alt=""
              width={20}
              height={20}
              unoptimized
              className="size-5"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
