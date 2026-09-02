import { cn } from "@/lib/cn";
import { MediaPlane, type MediaPlanePhoto } from "./MediaPlane";

type ProfileImageProps = {
  photo: MediaPlanePhoto | null;
  className?: string;
};

export function ProfileImage({ photo, className }: ProfileImageProps) {
  return (
    <MediaPlane
      photo={photo}
      preload
      sizes="(min-width: 768px) 50vw, 100vw"
      className={cn("aspect-portrait md:aspect-auto md:h-full", className)}
    />
  );
}
