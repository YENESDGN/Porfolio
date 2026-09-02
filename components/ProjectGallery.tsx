import type { ProjectDetail } from "@/lib/queries";
import { Card } from "./Card";
import { MediaPlane } from "./MediaPlane";

// Görsel yoksa hiç çizilmez: RoadMap ve TechStack ile aynı davranış.
export function ProjectGallery({
  images,
  title,
  className,
}: {
  images: ProjectDetail["images"];
  title?: string;
  className?: string;
}) {
  if (images.length === 0) return null;

  return (
    <Card variant="bare" title={title} className={className}>
      <ul className="grid gap-8 md:grid-cols-2 md:gap-10">
        {images.map((image) => (
          <li key={image.id}>
            <MediaPlane
              photo={image.media}
              sizes="(min-width: 768px) 45vw, 100vw"
              className="aspect-plate"
            />
            {image.caption ? (
              <p className="mt-3 text-caption text-ink-muted">
                {image.caption}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </Card>
  );
}
