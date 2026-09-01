import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Reveal, RoadMap, TextCard } from "@/components";
import { getExperiencePage } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Tecrübe",
  description: "İş hayatı yolculuğum.",
};

export default async function ExperiencePage() {
  const data = await getExperiencePage();
  if (!data) notFound();

  return (
    <main className="py-section">
      <Container>
        <h1 className="text-h1 text-ink">Tecrübe</h1>

        <div className="mt-12 grid gap-10 md:grid-cols-5 md:gap-12">
          <Reveal direction="left" className="md:col-span-2">
            <RoadMap items={data.roadmap} title="İş hayatı" />
          </Reveal>

          <div className="flex flex-col gap-6 md:col-span-3">
            {data.sections.map((section, index) => (
              <Reveal key={section.id} direction="right" delay={index * 0.06}>
                <TextCard content={section.content} />
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}
