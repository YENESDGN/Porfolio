import type { Prisma } from "@/generated/prisma/client";
import { landingFixture } from "./fixtures";

export const landingSelect = {
  welcomeText: true,
  photo: { select: { url: true, altText: true } },
} satisfies Prisma.LandingPageSelect;

// icon, public/images/tech/ altındaki işaretin yolunu tutar.
export const techStackSelect = {
  id: true,
  name: true,
  icon: true,
} satisfies Prisma.TechStackItemSelect;

export type LandingContent = Prisma.LandingPageGetPayload<{
  select: typeof landingSelect;
}>;

export type TechStackEntry = Prisma.TechStackItemGetPayload<{
  select: typeof techStackSelect;
}>;

export type LandingPageData = {
  content: LandingContent;
  techStack: TechStackEntry[];
  // "Projeler + (sayısı)" bloğu ayrı kolon değil, projects tablosundan COUNT.
  projectCount: number;
};

export async function getLandingPage(): Promise<LandingPageData | null> {
  return landingFixture;
}
