import type { Prisma, RoadmapKind } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

// Öğrenim ve iş hayatı roadmap'i aynı tabloda, aynı şekilde okunuyor:
// select tek yerde durur, ayıran alan yalnızca `kind`.
export const roadmapItemSelect = {
  id: true,
  title: true,
  description: true,
  startDate: true,
  endDate: true,
} satisfies Prisma.RoadmapItemSelect;

export type RoadmapEntry = Prisma.RoadmapItemGetPayload<{
  select: typeof roadmapItemSelect;
}>;

export async function getRoadmap(kind: RoadmapKind): Promise<RoadmapEntry[]> {
  return prisma.roadmapItem.findMany({
    where: { kind },
    orderBy: { order: "asc" },
    select: roadmapItemSelect,
  });
}
