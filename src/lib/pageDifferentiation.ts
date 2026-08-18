/**
 * Phase 2 — content differentiation.
 *
 * Derives page-specific decision content from the dataset that already exists
 * (approvals, modes, fees, offerings, specialisations). No page gets a bullet
 * unless the underlying record supports it, and no two universities produce the
 * same set of bullets unless their published facts are genuinely the same.
 */
import {
  formatINR,
  getProgramme,
  getUniversity,
  listOfferingsByProgramme,
  listOfferingsByUniversity,
  listSpecialisations,
  type Offering,
  type University,
} from "@/data";
import { intentProfile, pageIntent, type IntentProfile } from "@/lib/searchIntent";

export type Archetype = "open" | "central" | "state" | "deemed" | "private";

const OPEN_NAME = /(open university|school of open learning|open learning)/i;

export function archetypeOf(u: University): Archetype {
  if (u.type === "Open" || OPEN_NAME.test(u.name)) return "open";
  if (u.type === "Central") return "central";
  if (u.type === "State") return "state";
  if (u.type === "Deemed") return "deemed";
  return "private";
}

/** Public / open universities answer research intent; private ones answer buying intent. */
export function universityIntent(u: University): IntentProfile {
  const a = archetypeOf(u);
  const research = a === "open" || a === "central" || a === "state";
  return intentProfile(
    research ? pageIntent.openUniversityHub : pageIntent.universityHub,
    research
      ? `Is ${u.shortName} the right low-cost, recognised route for my degree?`
      : `Is ${u.shortName} worth its fee compared with other online universities?`,
  );
}

const median = (values: number[]) => {
  if (values.length === 0) return null;
  const s = [...values].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid]! : Math.round((s[mid - 1]! + s[mid]!) / 2);
};

const totals = (list: Offering[]) =>
  list.map((o) => o.fee.total).filter((n): n is number => typeof n === "number" && n > 0);

/* -------------------------- university decision -------------------------- */

export interface DecisionGuide {
  choose: string[];
  avoid: string[];
  /** Heading that fits this university, not a generic one. */
  heading: string;
}

export function universityDecision(slug: string): DecisionGuide | null {
  const u = getUniversity(slug);
  if (!u) return null;
  const a = archetypeOf(u);
  const offers = listOfferingsByUniversity(slug);
  const feeTotals = totals(offers);
  const cheapest = feeTotals.length ? Math.min(...feeTotals) : null;
  const dearest = feeTotals.length ? Math.max(...feeTotals) : null;
  const bodies = u.approvals.map((x) => x.body.toUpperCase());
  const levels = Array.from(new Set(offers.map((o) => getProgramme(o.programmeSlug)?.level).filter(Boolean)));
  const specCount = new Set(offers.flatMap((o) => o.specialisations)).size;
  const placement = offers.some((o) => o.placement?.supportAvailable);

  const choose: string[] = [];
  const avoid: string[] = [];

  if (cheapest !== null) {
    choose.push(
      `Your budget starts around ${formatINR(cheapest)} for the full programme — that is the lowest published total across ${u.shortName} programmes on this page.`,
    );
  }
  if (a === "open" || a === "state" || a === "central") {
    choose.push(
      `You want a government/open-university degree at published state fees rather than a private online programme priced for placement services.`,
    );
    avoid.push(
      `You expect recruiter drives, career coaching or an on-demand LMS experience — an open university's core promise is affordable, recognised study material and examinations.`,
    );
  } else {
    choose.push(
      `You want a structured online-learning platform with recorded lectures and admission support handled end to end.`,
    );
    if (dearest !== null)
      avoid.push(
        `Your maximum budget is below ${formatINR(cheapest ?? dearest)} — a state open university will cost far less for the same degree title.`,
      );
  }
  if (u.modes.includes("Online") && !u.modes.includes("Distance"))
    choose.push(`You need a fully online mode — ${u.shortName} runs its programmes online, not as postal distance study.`);
  if (u.modes.includes("Distance") && !u.modes.includes("Online"))
    avoid.push(`You want live/online classes — ${u.shortName} delivers in distance mode.`);
  if (bodies.some((b) => b.includes("AICTE")))
    choose.push(`You need an AICTE-recognised technical programme — that approval is on record for ${u.shortName}.`);
  else
    avoid.push(
      `Your employer specifically asks for AICTE approval on the programme — confirm that in writing with ${u.shortName} before paying.`,
    );
  if (bodies.some((b) => b.includes("WES")))
    choose.push(`You may study or work abroad later — ${u.shortName} degrees appear in WES evaluation records.`);
  if (levels.includes("PG") && levels.includes("UG"))
    choose.push(`You want to finish UG and continue PG at the same university without re-applying elsewhere.`);
  if (specCount >= 5)
    choose.push(`You want a choice of specialisations — ${specCount} are published across ${u.shortName} programmes.`);
  else if (specCount > 0)
    avoid.push(`You want a niche specialisation — only ${specCount} are published here; check the course pages first.`);
  if (!placement)
    avoid.push(`Placement assistance is a deciding factor for you — no placement support is published in the ${u.shortName} record.`);

  if (choose.length === 0 && avoid.length === 0) return null;
  return {
    choose,
    avoid,
    heading:
      a === "private" || a === "deemed"
        ? `Is ${u.shortName} worth the fee for you?`
        : `Should you choose ${u.shortName} over a private online university?`,
  };
}

/* ----------------------------- fee/value view ---------------------------- */

export interface FeeValueRow {
  programme: string;
  href: string;
  total: number;
  marketMedian: number;
  difference: number;
}

/** Compares each published total against the median for the same programme across the dataset. */
export function universityFeeValue(slug: string): { rows: FeeValueRow[]; note: string } | null {
  const u = getUniversity(slug);
  if (!u) return null;
  const rows: FeeValueRow[] = [];
  for (const o of listOfferingsByUniversity(slug)) {
    const total = o.fee.total;
    if (!total) continue;
    const peers = totals(listOfferingsByProgramme(o.programmeSlug).filter((p) => p.universitySlug !== slug));
    const m = median(peers);
    if (!m) continue;
    const programme = getProgramme(o.programmeSlug);
    if (!programme) continue;
    rows.push({
      programme: programme.name,
      href: `/universities/${slug}/courses/${o.programmeSlug}`,
      total,
      marketMedian: m,
      difference: total - m,
    });
  }
  if (rows.length === 0) return null;
  rows.sort((a, b) => a.difference - b.difference);
  const below = rows.filter((r) => r.difference < 0).length;
  return {
    rows,
    note: `${below} of ${rows.length} ${u.shortName} programmes are priced below the median published total for the same programme elsewhere on this site. Medians use published 2026-27 totals only — programmes with no published fee are excluded.`,
  };
}

/* -------------------------- university × course -------------------------- */

export interface OfferingValue {
  total: number | null;
  peerMedian: number | null;
  rank: number | null;
  peers: number;
  cheapest: { name: string; href: string; total: number } | null;
}

export function offeringValue(universitySlug: string, programmeSlug: string): OfferingValue | null {
  const all = listOfferingsByProgramme(programmeSlug);
  const mine = all.find((o) => o.universitySlug === universitySlug);
  if (!mine) return null;
  const priced = all.filter((o) => typeof o.fee.total === "number" && o.fee.total! > 0);
  const peerTotals = totals(priced.filter((o) => o.universitySlug !== universitySlug));
  const sorted = [...priced].sort((a, b) => (a.fee.total ?? 0) - (b.fee.total ?? 0));
  const idx = sorted.findIndex((o) => o.universitySlug === universitySlug);
  const cheapestOffer = sorted[0];
  const cheapestUni = cheapestOffer ? getUniversity(cheapestOffer.universitySlug) : undefined;
  return {
    total: mine.fee.total ?? null,
    peerMedian: median(peerTotals),
    rank: idx >= 0 ? idx + 1 : null,
    peers: priced.length,
    cheapest:
      cheapestOffer && cheapestUni
        ? {
            name: cheapestUni.shortName,
            href: `/universities/${cheapestUni.slug}/courses/${programmeSlug}`,
            total: cheapestOffer.fee.total!,
          }
        : null,
  };
}

/* ------------------------- course pillar helpers ------------------------- */

export interface SkillCareerRow {
  specialisation: string;
  skills: string[];
  careers: string[];
  href: string;
}

/** Skill-to-career mapping built from the specialisation dataset (no invented roles). */
export function skillCareerMap(programmeSlug: string, courseSlug: string): SkillCareerRow[] {
  return listSpecialisations(programmeSlug)
    .filter((s) => s.coreSubjects.length > 0 && s.careerPaths.length > 0)
    .slice(0, 8)
    .map((s) => ({
      specialisation: s.name,
      skills: s.coreSubjects.slice(0, 4),
      careers: s.careerPaths.slice(0, 4),
      href: `/courses/${courseSlug}/specialisation/${s.slug}`,
    }));
}

/** Published fee spread for a programme across universities. */
export function courseFeeSpread(programmeSlug: string) {
  const list = totals(listOfferingsByProgramme(programmeSlug));
  if (list.length < 2) return null;
  return {
    lowest: Math.min(...list),
    highest: Math.max(...list),
    median: median(list)!,
    count: list.length,
  };
}

/* ------------------------------- headings -------------------------------- */

/**
 * Title/H1 wording that matches the page's search intent instead of one shared
 * template. Research-intent universities lead with recognition and cost;
 * commercial-intent universities lead with fees and the value question.
 */
export function universityHeadings(input: {
  name: string;
  shortName: string;
  type?: University["type"];
  feeRangeLabel?: string;
}) {
  const research =
    input.type === "Open" ||
    input.type === "Central" ||
    input.type === "State" ||
    OPEN_NAME.test(input.name);
  if (research) {
    return {
      title: `${input.shortName} Online & Distance Programmes 2026: Fees, Approvals, Admission`,
      description: `${input.name} — programme-wise published fees, UGC-DEB recognition, eligibility, admission steps, examination pattern and what students should verify before enrolling.`,
      h1: `${input.name}: Programmes, Published Fees & Admission 2026`,
      eyebrowNote: "Student research guide",
    };
  }
  return {
    title: `${input.shortName} Online 2026: Fees, Courses, Approvals & Is It Worth It`,
    description: `${input.name}: programme-wise fees against the market median, UGC entitlement, admission process, learning platform, placement support and who the university actually suits.`,
    h1: `${input.name}: Fees, Courses, Approvals & Admission 2026`,
    eyebrowNote: "Fee & value review",
  };
}
