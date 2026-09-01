import { notFound } from "next/navigation";
import {
  Container,
  ProfileImage,
  Reveal,
  Section,
  StatCard,
  TechStack,
  TextCard,
  WelcomeSection,
} from "@/components";
import { site } from "@/config";
import { getLandingPage } from "@/lib/queries";

// Partial FadeIn-Left&Right&Up: sol sütun soldan, sağdaki uzun görsel sağdan,
// karşılama bloğu aşağıdan girer.
export default async function LandingPage() {
  const data = await getLandingPage();
  if (!data) notFound();

  return (
    <main>
      {/* İlk ekran: metin sütunu ölçüyü tutar, portre sayfanın sağ kenarına
          kadar taşar — bu yüzden burada Container yok. */}
      <Section align="start" className="py-0">
        <div className="flex flex-1 flex-col md:grid md:grid-cols-2">
          <div className="flex gap-4 px-6 pt-12 pb-10 md:gap-6 md:py-16 md:pl-10">
            <span
              aria-hidden="true"
              className="hidden rotate-180 self-center text-caption text-ink-muted text-vertical md:block"
            >
              {site.role}
            </span>

            <div className="flex flex-1 flex-col justify-between gap-12">
              <Reveal direction="left">
                <StatCard
                  value={data.projectCount}
                  label="Proje"
                  variant="bare"
                />
              </Reveal>

              <Reveal direction="up" delay={0.06}>
                <WelcomeSection />
              </Reveal>

              <p className="text-caption text-ink-muted">Aşağı kaydır ↓</p>
            </div>
          </div>

          <Reveal direction="right" className="md:h-full">
            <ProfileImage photo={data.content.photo} className="h-full" />
          </Reveal>
        </div>
      </Section>

      <Section className="bg-page-deep">
        <Container className="flex flex-1 flex-col py-12 md:py-16">
          <div className="grid flex-1 gap-10 md:grid-cols-2 md:gap-16">
            <Reveal direction="left" className="flex flex-col justify-center">
              <TextCard
                title="Merhaba"
                content={data.content.welcomeText}
                variant="bare"
              />
            </Reveal>

            <Reveal
              direction="right"
              delay={0.06}
              className="flex min-h-0 flex-col"
            >
              <TechStack items={data.techStack} className="flex-1" />
            </Reveal>
          </div>
        </Container>
      </Section>
    </main>
  );
}
