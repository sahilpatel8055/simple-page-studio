import { AppLink } from "@/components/common/AppLink";
import { DataTable } from "@/components/common/Blocks";
import { formatINR } from "@/data";
import { courseFeeSpread, skillCareerMap } from "@/lib/pageDifferentiation";

/** Specialisation → skills → roles, built from the specialisation dataset. */
export function SkillToCareerMap({
  programmeSlug,
  courseSlug,
  courseName,
}: {
  programmeSlug: string;
  courseSlug: string;
  courseName: string;
}) {
  const rows = skillCareerMap(programmeSlug, courseSlug);
  if (rows.length === 0) return null;
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Each {courseName} specialisation trains a different skill set, and that decides the roles
        you can realistically apply for. Use this to pick the specialisation, not the brochure.
      </p>
      <DataTable
        caption={`${courseName} specialisation, core subjects and role direction`}
        head={["Specialisation", "Core subjects", "Role direction"]}
        rows={rows.map((r) => [
          <AppLink key={r.href} to={r.href} className="font-semibold text-brand">
            {r.specialisation}
          </AppLink>,
          r.skills.join(", "),
          r.careers.join(", "),
        ])}
      />
      <p className="text-xs text-muted-foreground">
        Subjects and role directions come from the published specialisation records. No salary
        figures are stated because universities do not publish specialisation-wise salary data.
      </p>
    </div>
  );
}

/** What the published fee range actually means for the decision. */
export function CourseFeeValueBand({
  programmeSlug,
  courseName,
  courseSlug,
}: {
  programmeSlug: string;
  courseName: string;
  courseSlug: string;
}) {
  const spread = courseFeeSpread(programmeSlug);
  if (!spread) return null;
  return (
    <div className="space-y-3 rounded-2xl border border-border bg-card p-4">
      <p className="text-sm text-muted-foreground">
        Across {spread.count} universities that publish a total {courseName} fee, the range runs
        from <span className="font-semibold text-foreground">{formatINR(spread.lowest)}</span> to{" "}
        <span className="font-semibold text-foreground">{formatINR(spread.highest)}</span>, with a
        median of <span className="font-semibold text-foreground">{formatINR(spread.median)}</span>.
        The degree title is the same at every UGC-entitled university; the fee difference buys
        learning platform, support and placement services, not a different qualification.
      </p>
      <AppLink to={`/courses/${courseSlug}/fees`} className="text-sm font-semibold text-brand">
        See the university-wise fee table →
      </AppLink>
    </div>
  );
}
