import Image from "next/image";
import { cn } from "@/lib/cn";

type MediaPlanePhoto = {
  url: string;
  altText: string | null;
};

type MediaPlaneProps = {
  photo: MediaPlanePhoto | null;
  sizes: string;
  preload?: boolean;
  className?: string;
};

// Cam levha. Fotoğraf henüz yoksa da levha durur: boş kutu bırakılmaz.
// Sitedeki tek görsel yüzeyi bu; ProfileImage ve ProjectCard bunu kullanır.
export function MediaPlane({
  photo,
  sizes,
  preload = false,
  className,
}: MediaPlaneProps) {
  return (
    <div className={cn("relative overflow-hidden bg-surface-media", className)}>
      {photo ? (
        <Image
          src={photo.url}
          alt={photo.altText ?? ""}
          fill
          sizes={sizes}
          preload={preload}
          className="object-cover"
        />
      ) : null}
    </div>
  );
}
