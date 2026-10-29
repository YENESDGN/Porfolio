import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export const landingSelect = {
  welcomeText: true,
  photo: { select: { url: true, altText: true } },
} satisfies Prisma.LandingPageSelect;

export const techStackSelect = {
  id: true,
  name: true,
  icon: true,
} satisfies Prisma.TechStackItemSelect;

type LandingContent = Prisma.LandingPageGetPayload<{
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
  const [content, techStack, projectCount] = await Promise.all([
    prisma.landingPage.findFirst({ select: landingSelect }),
    prisma.techStackItem.findMany({
      orderBy: { order: "asc" },
      select: techStackSelect,
    }),
    prisma.project.count({ where: { isPublished: true } }),
  ]);
  if (!content) return null;

  return { content, techStack, projectCount };
}
