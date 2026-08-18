/**
 * Registry of the hand-researched comparison packs.
 *
 * Lookup is order-insensitive: a pack written as "A vs B" also serves the
 * "B vs A" URL, and the pack keeps its own A/B orientation when rendered.
 */

import type { ComparisonPack } from "./types";
import { mbaPacks } from "./mba";
import { mcaPacks } from "./mca";
import { bcaPacks } from "./bca";

export type { ComparisonPack, PackFactor, PackSection } from "./types";

export const comparisonPacks: ComparisonPack[] = [...mbaPacks, ...mcaPacks, ...bcaPacks];

const key = (course: string, a: string, b: string) =>
  `${course.toLowerCase()}::${[a, b].sort().join("|")}`;

const index = new Map(comparisonPacks.map((p) => [key(p.course, p.aSlug, p.bSlug), p]));

/** Editorial pack for a course + university pair, if one has been researched. */
export function packFor(course: string, aSlug: string, bSlug: string): ComparisonPack | undefined {
  return index.get(key(course, aSlug, bSlug));
}

/** Every pack that involves a university, newest course first. */
export const packsForUniversity = (slug: string): ComparisonPack[] =>
  comparisonPacks.filter((p) => p.aSlug === slug || p.bSlug === slug);

/** Every pack for a course family slug such as "mba". */
export const packsForCourse = (course: string): ComparisonPack[] =>
  comparisonPacks.filter((p) => p.course === course.toLowerCase());
