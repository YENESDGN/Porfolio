import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Container,
  MediaPlane,
  OverlapPair,
  Reveal,
  RoadMap,
  Section,
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
    <main>
      {/* Her overlap çifti kendi ekranını doldurur; kayma payı token'dan gelir. */}
      {pairs.map((section, index) => (
        <Section key={section.id}>
          <Container>
            <Reveal direction={index % 2 === 1 ? "right" : "left"}>
              <OverlapPair
                reverse={index % 2 === 1}
                media={
                  <MediaPlane
                    photo={section.photo}
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="aspect-plate"
                  />
                }
                content={
                  <TextCard content={section.content} className="md:p-10" />
                }
              />
            </Reveal>
          </Container>
        </Section>
      ))}

      <Section>
        <Container>
          <Reveal>
            <div className="grid gap-10 md:grid-cols-5 md:gap-12">
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
        </Container>
      </Section>
    </main>
  );
}
