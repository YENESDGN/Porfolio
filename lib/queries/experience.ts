import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { getRoadmap, type RoadmapEntry } from "./roadmap";

export const experienceSectionSelect = {
  id: true,
  content: true,
} satisfies Prisma.ExperienceSectionSelect;

type ExperienceSectionEntry = Prisma.ExperienceSectionGetPayload<{
  select: typeof experienceSectionSelect;
}>;

export type ExperiencePageData = {
  sections: ExperienceSectionEntry[];
  // Yalnızca WORK kayıtları; EDUCATION tarafı /about'a ait.
  roadmap: RoadmapEntry[];
};

export async function getExperiencePage(): Promise<ExperiencePageData | null> {
  const [sections, roadmap] = await Promise.all([
    prisma.experienceSection.findMany({
      orderBy: { order: "asc" },
      select: experienceSectionSelect,
    }),
    getRoadmap("WORK"),
  ]);
  if (sections.length === 0) return null;

  return { sections, roadmap };
}
