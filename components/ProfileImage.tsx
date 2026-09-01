import { cn } from "@/lib/cn";
import { MediaPlane } from "./MediaPlane";

type ProfileImageProps = {
  photo: { url: string; altText: string | null } | null;
  className?: string;
};

// Ana sayfanın katlanın üstündeki uzun görseli: preload ile yüklenir.
// Next 16'da priority kullanımdan kaldırıldı.
export function ProfileImage({ photo, className }: ProfileImageProps) {
  return (
    <MediaPlane
      photo={photo}
      preload
      sizes="(min-width: 768px) 40vw, 100vw"
      className={cn("aspect-portrait md:aspect-auto md:h-full", className)}
    />
  );
}
