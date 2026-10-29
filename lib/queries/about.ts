import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { getRoadmap, type RoadmapEntry } from "./roadmap";

export const aboutSectionSelect = {
  id: true,
  content: true,
  photo: { select: { url: true, altText: true } },
} satisfies Prisma.AboutSectionSelect;

type AboutSectionEntry = Prisma.AboutSectionGetPayload<{
  select: typeof aboutSectionSelect;
}>;

export type AboutPageData = {
  sections: AboutSectionEntry[];
  // Yalnızca EDUCATION kayıtları; WORK tarafı /experience'a ait.
  roadmap: RoadmapEntry[];
};

export async function getAboutPage(): Promise<AboutPageData | null> {
  const [sections, roadmap] = await Promise.all([
    prisma.aboutSection.findMany({
      orderBy: { order: "asc" },
      select: aboutSectionSelect,
    }),
    getRoadmap("EDUCATION"),
  ]);
  if (sections.length === 0) return null;

  return { sections, roadmap };
}
