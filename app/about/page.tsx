import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  MediaPlane,
  OverlapPair,
  Reveal,
  RoadMap,
  TextCard,
} from "@/components";
import { getAboutPage } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Hakkımda",
  description: "Kim olduğum ve öğrenim yolculuğum.",
};

export default async function AboutPage() {
  const data = await getAboutPage();
  if (!data) notFound();

  // İlk iki bölüm overlap çiftlerini kurar; üçüncüsü varsa roadmap'in yanına
  // geçer. Sıralama verinin kendisinden gelir, kodda yeniden dizilmez.
  const pairs = data.sections.slice(0, 2);
  const aside = data.sections[2];

  return (
    <main className="py-section">
      <h1 className="text-h1 text-ink">Hakkımda</h1>

      <div className="mt-12 flex flex-col gap-16 md:gap-20">
        {pairs.map((section, index) => (
          <Reveal
            key={section.id}
            direction={index % 2 === 1 ? "right" : "left"}
          >
            <OverlapPair
              reverse={index % 2 === 1}
              media={
                <MediaPlane
                  photo={section.photo}
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="aspect-plate"
                />
              }
              content={<TextCard content={section.content} />}
            />
          </Reveal>
        ))}

        <Reveal>
          <div className="grid gap-8 md:grid-cols-5 md:gap-10">
            <RoadMap
              items={data.roadmap}
              title="Öğrenim"
              className="md:col-span-3"
            />
            {aside ? (
              <TextCard content={aside.content} className="md:col-span-2" />
            ) : null}
          </div>
        </Reveal>
      </div>
    </main>
  );
}
