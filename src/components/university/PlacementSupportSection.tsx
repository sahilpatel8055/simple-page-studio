import { InfoBoxGrid } from "@/components/course/CourseSections";
import { SectionBanner } from "@/components/common/SectionBanner";
import { HiringPartners } from "@/components/university/HiringPartners";
import { defaultPlacementServices } from "@/data/course-pages/types";
import { placementFacts } from "@/data/university-placement-facts";

/**
 * Placement support block — the same service boxes used on the course pillar
 * pages, reused on university × course pages above career opportunities.
 */
export function PlacementSupportSection({
  universitySlug,
  universityShort,
}: {
  universitySlug: string;
  universityShort: string;
}) {
  const facts = placementFacts(universitySlug);
  return (
    <div className="space-y-4">
      <h3 className="font-display text-base font-bold text-foreground">
        Placement support at {universityShort}
      </h3>
      <SectionBanner kind="placement" size="lg" />
      {facts ? (
        <div className="surface-card space-y-4 p-4 sm:p-5">
          <p className="text-sm leading-relaxed text-foreground">{facts.summary}</p>

          {facts.stats.length > 0 ? (
            <table className="w-full table-fixed border-collapse text-left">
              <tbody>
                {facts.stats.map((s) => (
                  <tr key={s.label} className="border-b border-border/60 last:border-0">
                    <th
                      scope="row"
                      className="w-1/2 py-2 pr-3 align-top text-xs font-semibold text-muted-foreground sm:text-sm"
                    >
                      {s.label}
                    </th>
                    <td className="py-2 align-top text-xs font-bold text-foreground sm:text-sm">
                      {s.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}

          {facts.support.length > 0 ? (
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                What the career service includes
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-foreground">
                {facts.support.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {facts.recruiters.length > 0 ? (
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Recruiters named in the university's material
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {facts.recruiters.map((r) => (
                  <span
                    key={r}
                    className="rounded-full border border-border bg-secondary px-2.5 py-1 text-[0.7rem] font-medium text-secondary-foreground"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {facts.approvals.length > 0 ? (
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Approvals & recognition
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {facts.approvals.map((a) => (
                  <span
                    key={a}
                    className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[0.7rem] font-semibold text-primary"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          <p className="text-[0.7rem] text-muted-foreground">{facts.sourceNote}</p>
        </div>
      ) : null}
      <InfoBoxGrid items={defaultPlacementServices()} />
      <p className="text-xs leading-relaxed text-muted-foreground">
        Placement assistance is not the same as guaranteed placement. Ask {universityShort} in
        writing what its career service actually includes for online learners.
      </p>
      <HiringPartners universitySlug={universitySlug} universityShort={universityShort} />
    </div>
  );
}
