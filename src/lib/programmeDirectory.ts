/**
 * Canonical programme directory — mirrors the sitemap's course-pillar rules so
 * every indexable /courses/:slug page is reachable through an HTML link.
 */
import { getProgramme, programmes } from "@/data";
import { courseContentBySlug } from "@/data/course-pages";
import { courseFamilyList, familyForProgrammeSlug } from "@/lib/courseFamily";
import { canonicalProgrammeSlug } from "@/lib/intentMap";

export interface ProgrammeLink {
  label: string;
  href: string;
}

/** Every canonical, 200-status course pillar path with a human label. */
export function canonicalProgrammeLinks(): ProgrammeLink[] {
  const slugs = [
    ...new Set([
      ...courseFamilyList()
        .filter((f) => Boolean(courseContentBySlug(f.slug)))
        .map((f) => f.slug),
      ...programmes
        .map((p) => p.slug)
        .filter((slug) => !courseContentBySlug(slug))
        .filter((slug) => !familyForProgrammeSlug(slug))
        .filter((slug) => canonicalProgrammeSlug(slug) === slug),
    ]),
  ];

  return slugs
    .map((slug) => {
      const family = courseFamilyList().find((f) => f.slug === slug);
      const label = family?.name ?? getProgramme(slug)?.name ?? slug.replace(/-/g, " ");
      return { label, href: `/courses/${slug}` };
    })
    .sort((a, b) => a.label.localeCompare(b.label));
}
