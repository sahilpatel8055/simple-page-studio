import { AppLink } from "@/components/common/AppLink";
import { packsForCourse, packsForUniversity, type ComparisonPack } from "@/data/comparison-packs";
import { courseSlug, masterPairBySlug } from "@/lib/comparisonMaster";
import { ArrowRight } from "lucide-react";

/** Canonical URL for a pack, using the generated dataset's pair id. */
export function packPath(pack: ComparisonPack): string | undefined {
  const pair = masterPairBySlug(`${pack.aSlug}-vs-${pack.bSlug}`);
  if (!pair) return undefined;
  const course = pair.common_courses.find((c) => courseSlug(c) === pack.course);
  if (!course) return undefined;
  return `/compare/${pack.course}/${pair.comparison_id}`;
}

function PackList({ packs, heading, id }: { packs: ComparisonPack[]; heading: string; id: string }) {
  const items = packs
    .map((p) => ({ pack: p, href: packPath(p) }))
    .filter((i): i is { pack: ComparisonPack; href: string } => Boolean(i.href));
  if (!items.length) return null;
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="text-base font-bold sm:text-lg">
        {heading}
      </h2>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {items.map(({ pack, href }) => (
          <li key={href}>
            <AppLink
              to={href}
              className="box-hover flex min-h-11 items-start justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3"
            >
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-foreground">
                  {pack.aLabel} vs {pack.bLabel}
                </span>
                <span className="mt-0.5 block text-[0.78rem] leading-snug text-muted-foreground">
                  Fees, eligibility, specialisations and career support compared
                </span>
              </span>
              <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
            </AppLink>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Head-to-head packs researched for a course family, e.g. "online-mba". */
export function CoursePackLinks({ familySlug }: { familySlug: string }) {
  const course = familySlug.replace(/^online-/, "");
  return (
    <PackList
      id="head-to-head"
      heading={`University vs university: online ${course.toUpperCase()} head-to-head guides`}
      packs={packsForCourse(course)}
    />
  );
}

/** Head-to-head packs that involve one university. */
export function UniversityPackLinks({ slug, course }: { slug: string; course?: string }) {
  const packs = packsForUniversity(slug).filter((p) => (course ? p.course === course : true));
  return <PackList id="uni-head-to-head" heading="Compare this university head-to-head" packs={packs} />;
}
