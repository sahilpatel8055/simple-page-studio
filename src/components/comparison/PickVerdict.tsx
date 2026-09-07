import {
  courseSlug,
  datasetFeeTotal,
  type CourseSnapshotSide,
  type MasterUniversity,
} from "@/lib/comparisonMaster";

/**
 * "Which should you pick" — a decision verdict computed from the two
 * snapshots on this page (fee, specialisation breadth, entrance requirement,
 * recognition, duration). Every line is derived from published data, so no
 * page repeats another page's wording.
 */

function feeNumber(
  side: CourseSnapshotSide | undefined,
  slug: string | undefined,
  course: string | undefined,
): number | null {
  if (!side?.available) return null;
  if (typeof side.fee_total === "number" && side.fee_total > 0) return side.fee_total;
  return datasetFeeTotal(slug, course);
}

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

const naacScore = (u: MasterUniversity | undefined) => {
  const text = String(u?.recognition?.["NAAC_status"] ?? "");
  const m = /A\+{0,2}/.exec(text);
  if (!m) return 0;
  return m[0].length; // A=1, A+=2, A++=3
};

export function PickVerdict({
  aName,
  bName,
  uniA,
  uniB,
  sa,
  sb,
  course,
  aHref,
  bHref,
}: {
  aName: string;
  bName: string;
  uniA: MasterUniversity | undefined;
  uniB: MasterUniversity | undefined;
  sa: CourseSnapshotSide | undefined;
  sb: CourseSnapshotSide | undefined;
  course?: string | undefined;
  aHref: string;
  bHref: string;
}) {
  const feeA = feeNumber(sa, uniA?.slug, course);
  const feeB = feeNumber(sb, uniB?.slug, course);
  const specA = sa?.specialisations?.length ?? 0;
  const specB = sb?.specialisations?.length ?? 0;
  const entranceA = Boolean(sa?.entrance_exam && !/no|nil|not/i.test(sa.entrance_exam));
  const entranceB = Boolean(sb?.entrance_exam && !/no|nil|not/i.test(sb.entrance_exam));
  const naacA = naacScore(uniA);
  const naacB = naacScore(uniB);
  const progA = uniA?.programme_count ?? 0;
  const progB = uniB?.programme_count ?? 0;

  const aReasons: string[] = [];
  const bReasons: string[] = [];

  if (feeA !== null && feeB !== null && feeA !== feeB) {
    const diff = Math.abs(feeA - feeB);
    const pct = Math.round((diff / Math.max(feeA, feeB)) * 100);
    if (feeA < feeB)
      aReasons.push(
        `Fee is the deciding gap: ${inr(feeA)} against ${inr(feeB)} — ${inr(diff)} (${pct}%) less to pay across the full programme.`,
      );
    else
      bReasons.push(
        `Fee is the deciding gap: ${inr(feeB)} against ${inr(feeA)} — ${inr(diff)} (${pct}%) less to pay across the full programme.`,
      );
  }

  if (specA !== specB && (specA || specB)) {
    if (specA > specB)
      aReasons.push(
        `Wider specialisation choice — ${specA} published against ${specB || "none published"}, which matters if you want a niche track rather than a general degree.`,
      );
    else
      bReasons.push(
        `Wider specialisation choice — ${specB} published against ${specA || "none published"}, which matters if you want a niche track rather than a general degree.`,
      );
  }

  if (entranceA !== entranceB) {
    if (!entranceA)
      aReasons.push(
        `No entrance test listed for this programme, so admission turns on your marksheets alone${sb?.entrance_exam ? ` — ${bName} lists ${sb.entrance_exam}` : ""}.`,
      );
    else
      bReasons.push(
        `No entrance test listed for this programme, so admission turns on your marksheets alone${sa?.entrance_exam ? ` — ${aName} lists ${sa.entrance_exam}` : ""}.`,
      );
  }

  if (naacA !== naacB && (naacA || naacB)) {
    const better = naacA > naacB ? aReasons : bReasons;
    const u = naacA > naacB ? uniA : uniB;
    better.push(
      `Stronger accreditation on record — ${u?.recognition?.["NAAC_status"]}, useful when an employer or a foreign university screens the institution and not just the degree.`,
    );
  }

  if (progA !== progB) {
    const more = progA > progB ? aReasons : bReasons;
    more.push(
      `Larger online catalogue (${Math.max(progA, progB)} programmes tracked against ${Math.min(progA, progB)}), so switching course or adding a second qualification later stays inside the same university.`,
    );
  }

  if (sa?.duration && sb?.duration && sa.duration !== sb.duration) {
    aReasons.push(`Programme runs ${sa.duration}.`);
    bReasons.push(`Programme runs ${sb.duration}.`);
  }

  if (!aReasons.length)
    aReasons.push(
      `Choose ${aName} if its published fee schedule, session calendar and support model suit how you plan to study.`,
    );
  if (!bReasons.length)
    bReasons.push(
      `Choose ${bName} if its published fee schedule, session calendar and support model suit how you plan to study.`,
    );

  const headline = (() => {
    const scope = course ? `online ${course}` : "an online degree";
    if (feeA !== null && feeB !== null && feeA !== feeB) {
      const cheaper = feeA < feeB ? aName : bName;
      const richer = specA === specB ? null : specA > specB ? aName : bName;
      return richer && richer !== cheaper
        ? `On ${scope}, ${cheaper} is the lower-cost route and ${richer} gives the wider specialisation choice — the decision is cost against curriculum breadth, not quality.`
        : `On ${scope}, ${cheaper} costs less for a comparable published programme, so it is the default pick unless a specific specialisation pulls you the other way.`;
    }
    if (specA !== specB) {
      const richer = specA > specB ? aName : bName;
      return `Both universities publish a comparable ${scope} at a similar cost, so ${richer} leads on specialisation choice — pick on the track you actually want to study.`;
    }
    return `Both universities publish a UGC-entitled ${scope} on comparable terms, so decide on the specialisation you want, the intake you can start in, and the support you will actually use.`;
  })();

  const Card = ({ name, reasons, href }: { name: string; reasons: string[]; href: string }) => (
    <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
      <h3 className="font-display text-base font-bold text-foreground">Pick {name} if…</h3>
      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
        {reasons.map((r) => (
          <li key={r} className="flex gap-2">
            <span aria-hidden className="mt-1 text-brand">
              ✓
            </span>
            <span>{r}</span>
          </li>
        ))}
      </ul>
      <a href={href} className="mt-4 inline-block text-sm font-semibold text-brand hover:underline">
        See the full {name} profile →
      </a>
    </div>
  );

  return (
    <section aria-labelledby="which-should-you-pick" className="my-8">
      <h2 id="which-should-you-pick" className="font-display text-xl font-bold">
        Which should you pick?
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{headline}</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Card name={aName} reasons={aReasons} href={aHref} />
        <Card name={bName} reasons={bReasons} href={bHref} />
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Verdict computed from the published figures on this page
        {course ? ` for ${courseSlug(course).toUpperCase()}` : ""} — fee, specialisation count,
        entrance requirement and accreditation. It is guidance, not a ranking.
      </p>
    </section>
  );
}
