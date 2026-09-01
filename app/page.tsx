import { notFound } from "next/navigation";
import {
  ProfileImage,
  Reveal,
  StatCard,
  TechStack,
  WelcomeSection,
} from "@/components";
import { getLandingPage } from "@/lib/queries";

// Partial FadeIn-Left&Right&Up: sol sütun soldan, sağdaki uzun görsel sağdan,
// hoşgeldin yazısı aşağıdan girer.
export default async function LandingPage() {
  const data = await getLandingPage();
  if (!data) notFound();

  return (
    <main className="py-section">
      <div className="grid gap-10 md:grid-cols-2 md:gap-12">
        <div className="flex flex-col gap-10">
          <Reveal direction="left">
            <StatCard value={data.projectCount} label="Proje" />
          </Reveal>

          <Reveal direction="up">
            <WelcomeSection text={data.content.welcomeText} />
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <TechStack items={data.techStack} />
          </Reveal>
        </div>

        <Reveal direction="right" className="md:h-full">
          <ProfileImage photo={data.content.photo} className="md:h-full" />
        </Reveal>
      </div>
    </main>
  );
}
