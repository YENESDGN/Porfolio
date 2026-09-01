import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Reveal, RoadMap, Section, TextCard } from "@/components";
import { getExperiencePage } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Tecrübe",
  description: "İş hayatı yolculuğum.",
};

export default async function ExperiencePage() {
  const data = await getExperiencePage();
  if (!data) notFound();

  return (
    <main>
      {/* Ray ve metinler tek bölümde kalır: ikisi birbirini okutuyor. */}
      <Section>
        <Container>
          <div className="grid gap-12 md:grid-cols-5 md:gap-16">
            <Reveal direction="left" className="md:col-span-2">
              <RoadMap items={data.roadmap} title="İş hayatı" />
            </Reveal>

            <div className="flex flex-col gap-8 md:col-span-3">
              {data.sections.map((section, index) => (
                <Reveal key={section.id} direction="right" delay={index * 0.06}>
                  <TextCard content={section.content} />
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
