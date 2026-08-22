/**
 * Data layer for the NEW university comparison experience (/compare/universities).
 *
 * Read-only: it reshapes the existing master dataset + existing University
 * records. It never invents a value — anything missing becomes `null` and the
 * UI prints "Not available".
 */
import { universities as universityRecords } from "@/data";
import type { University } from "@/data";
import {
  formatFee,
  getUniversityBySlug,
  programmesOf,
  scholarshipsOf,
  type UniversityRecordJson,
} from "@/lib/universityData";

export const NOT_AVAILABLE = "Not available";

export interface CompareUniversity {
  slug: string;
  name: string;
  shortName: string;
  record: University;
  json: UniversityRecordJson | undefined;
  /** Lowest published total programme fee, INR. */
  lowestFee: number | null;
  specialisationCount: number;
  programmeCount: number;
  rating: number | undefined;
  path: string;
}

export interface CompareRow {
  label: string;
  /** Cell text per university, in the same order as the selection. */
  value: (u: CompareUniversity) => string | null;
  /** "lower" / "higher" numeric highlight, when a meaningful winner exists. */
  better?: "lower" | "higher";
  /** Numeric basis for the highlight. */
  numeric?: (u: CompareUniversity) => number | null;
  /** Label shown on the winning cell. */
  hint?: string;
}

export interface CompareGroup {
  id: string;
  title: string;
  /** Short line describing what the block answers. */
  blurb?: string;
  /** Locked blocks stay blurred until the visitor unlocks the full report. */
  locked?: boolean;
  rows: CompareRow[];
}


const uniqueSpecialisations = (slug: string) => {
  const names = new Set<string>();
  for (const p of programmesOf(slug)) {
    for (const s of p.specializations) names.add(s.specialisation_name);
  }
  return names.size;
};

const lowestTotalFee = (slug: string): number | null => {
  const totals = programmesOf(slug)
    .map((p) => p.fees.total_programme_fee ?? p.fees.normal)
    .filter((v): v is number => typeof v === "number" && v > 0);
  return totals.length ? Math.min(...totals) : null;
};

export function compareUniverse(): CompareUniversity[] {
  return universityRecords
    .map((record) => {
      const json = getUniversityBySlug(record.slug);
      const entry: CompareUniversity = {
        slug: record.slug,
        name: record.name,
        shortName: record.shortName,
        record,
        json,
        lowestFee: lowestTotalFee(record.slug),
        specialisationCount: uniqueSpecialisations(record.slug),
        programmeCount: json?.programmes.length ?? 0,
        rating: record.rating,
        path: `/universities/${record.slug}`,
      };
      return entry;
    })
    .sort((a, b) => a.shortName.localeCompare(b.shortName));
}

const list = (values: (string | null | undefined)[], max = 3) => {
  const clean = [...new Set(values.filter((v): v is string => !!v && v.trim().length > 0))];
  if (!clean.length) return null;
  return clean.length > max ? `${clean.slice(0, max).join(", ")} +${clean.length - max} more` : clean.join(", ");
};

const programmes = (u: CompareUniversity) => u.json?.programmes ?? [];

const durations = (u: CompareUniversity) => list(programmes(u).map((p) => p.duration));

const eligibility = (u: CompareUniversity) =>
  programmes(u).find((p) => p.eligibility.summary)?.eligibility.summary ?? null;

const entranceExam = (u: CompareUniversity) =>
  u.json?.admissions.entrance_exam ??
  programmes(u).find((p) => p.eligibility.entrance_exam)?.eligibility.entrance_exam ??
  null;

const countByLevel = (u: CompareUniversity, level: string) =>
  programmes(u).filter((p) => String(p.level).toUpperCase() === level).length;

const lowestFeeForLevel = (u: CompareUniversity, level: string) => {
  const totals = programmes(u)
    .filter((p) => String(p.level).toUpperCase() === level)
    .map((p) => p.fees.total_programme_fee ?? p.fees.normal)
    .filter((v): v is number => typeof v === "number" && v > 0);
  return totals.length ? Math.min(...totals) : null;
};

const feeSpread = (u: CompareUniversity) => {
  const totals = programmes(u)
    .map((p) => p.fees.total_programme_fee ?? p.fees.normal)
    .filter((v): v is number => typeof v === "number" && v > 0);
  if (!totals.length) return null;
  return `${formatFee(Math.min(...totals))} – ${formatFee(Math.max(...totals))}`;
};

const emiFrom = (u: CompareUniversity) => {
  const emis = programmes(u)
    .map((p) => p.fees.emi ?? p.fees.monthly)
    .filter((v): v is number => typeof v === "number" && v > 0);
  return emis.length ? `${formatFee(Math.min(...emis))} / month` : null;
};

const topSpecialisations = (u: CompareUniversity) =>
  list(
    programmes(u).flatMap((p) => p.specializations.map((s) => s.specialisation_name)),
    4,
  );

const semesterRange = (u: CompareUniversity) => {
  const sems = programmes(u)
    .map((p) => p.semesters)
    .filter((v): v is number => typeof v === "number" && v > 0);
  if (!sems.length) return null;
  const min = Math.min(...sems);
  const max = Math.max(...sems);
  return min === max ? `${min} semesters` : `${min}–${max} semesters`;
};

const uniqueFrom = (u: CompareUniversity, pick: (p: ReturnType<typeof programmes>[number]) => string[]) => {
  const set = new Set<string>();
  for (const p of programmes(u)) for (const v of pick(p)) if (v) set.add(v);
  return set;
};

const verifiedSources = (u: CompareUniversity) =>
  new Set(
    programmes(u)
      .map((p) => p.official_source.programme_url ?? p.official_source.fee_url)
      .filter((v): v is string => !!v),
  ).size;

export const compareGroups: CompareGroup[] = [
  {
    id: "identity",
    title: "Basics",
    blurb: "Who the university is and how it teaches.",
    rows: [
      { label: "Rating", value: (u) => (u.rating ? `${u.rating}/5` : null) },
      {
        label: "Location",
        value: (u) => [u.record.city, u.record.state].filter(Boolean).join(", ") || null,
      },
      {
        label: "Established",
        value: (u) => (u.record.establishedYear ? String(u.record.establishedYear) : null),
      },
      { label: "Type", value: (u) => u.record.type ?? null },
      { label: "Learning mode", value: (u) => u.record.modes.join(" / ") || null },
      { label: "Official website", value: (u) => u.json?.basic_information.official_website ?? null },
    ],
  },
  {
    id: "recognition",
    title: "Recognition & approvals",
    blurb: "Regulatory position — always verify at programme level before paying.",
    rows: [
      { label: "UGC status", value: (u) => u.json?.recognition.UGC_status ?? null },
      { label: "UGC-DEB", value: (u) => u.json?.recognition.UGC_DEB_status ?? null },
      { label: "NAAC", value: (u) => u.json?.recognition.NAAC_status ?? null },
      { label: "NIRF", value: (u) => u.json?.recognition.NIRF_information ?? null },
      { label: "Accreditation", value: (u) => u.json?.recognition.accreditation ?? null },
      {
        label: "Approvals listed",
        value: (u) =>
          list(
            u.record.approvals.map((a) => `${a.body}${a.status ? ` — ${a.status}` : ""}`),
            4,
          ),
        better: "higher",
        numeric: (u) => u.record.approvals.length || null,
        hint: "More approvals",
      },
    ],
  },
  {
    id: "fees",
    title: "Fees & affordability",
    blurb: "Published figures only. Session-dependent — check the current prospectus.",
    rows: [
      {
        label: "Lowest total fee",
        value: (u) => formatFee(u.lowestFee),
        better: "lower",
        numeric: (u) => u.lowestFee,
        hint: "Lower fee",
      },
      { label: "Fee range", value: feeSpread },
      { label: "Fee band", value: (u) => u.record.feeRangeLabel || null },
      {
        label: "Application fee",
        value: (u) => formatFee(u.json?.admissions.application_fee ?? null),
        better: "lower",
        numeric: (u) => u.json?.admissions.application_fee ?? null,
        hint: "Cheaper to apply",
      },
      {
        label: "Scholarships",
        value: (u) => {
          const n = scholarshipsOf(u.slug).length;
          return n ? `${n} published` : null;
        },
        better: "higher",
        numeric: (u) => scholarshipsOf(u.slug).length || null,
        hint: "More schemes",
      },
    ],
  },
  {
    id: "academics",
    title: "Programmes & specialisations",
    blurb: "The full UG and PG portfolio, not one cherry-picked course.",
    locked: true,
    rows: [
      {
        label: "Programmes",
        value: (u) => (u.programmeCount ? String(u.programmeCount) : null),
        better: "higher",
        numeric: (u) => u.programmeCount || null,
        hint: "More choice",
      },
      {
        label: "UG programmes",
        value: (u) => (countByLevel(u, "UG") ? String(countByLevel(u, "UG")) : null),
        better: "higher",
        numeric: (u) => countByLevel(u, "UG") || null,
        hint: "Wider UG menu",
      },
      {
        label: "PG programmes",
        value: (u) => (countByLevel(u, "PG") ? String(countByLevel(u, "PG")) : null),
        better: "higher",
        numeric: (u) => countByLevel(u, "PG") || null,
        hint: "Wider PG menu",
      },
      {
        label: "Specialisations",
        value: (u) => (u.specialisationCount ? String(u.specialisationCount) : null),
        better: "higher",
        numeric: (u) => u.specialisationCount || null,
        hint: "More options",
      },
      { label: "Popular specialisations", value: topSpecialisations },
      { label: "Duration", value: durations },
      { label: "Semesters", value: semesterRange },
      { label: "Lowest UG fee", value: (u) => formatFee(lowestFeeForLevel(u, "UG")) },
      { label: "Lowest PG fee", value: (u) => formatFee(lowestFeeForLevel(u, "PG")) },
      { label: "EMI starts at", value: emiFrom },
    ],
  },
  {
    id: "admission",
    title: "Admission & eligibility",
    blurb: "Cycle, selection route and the paperwork you need ready.",
    locked: true,
    rows: [
      { label: "Next intake", value: (u) => u.json?.admissions.next_expected_intake ?? null },
      { label: "Admission cycle", value: (u) => u.json?.admissions.admission_cycle ?? null },
      { label: "Admission window", value: (u) => list([u.json?.admissions.admission_start_date, u.json?.admissions.admission_end_date], 2) },
      { label: "Selection process", value: (u) => u.json?.admissions.selection_process ?? null },
      { label: "Entrance exam", value: entranceExam },
      { label: "Eligibility", value: eligibility },
      {
        label: "Admission steps",
        value: (u) =>
          u.record.admissionProcess.length ? `${u.record.admissionProcess.length} steps` : null,
      },
      {
        label: "Documents required",
        value: (u) => list(u.record.documentsRequired, 4),
      },
      { label: "Examination pattern", value: (u) => u.record.examPattern ?? null },
    ],
  },
  {
    id: "career",
    title: "Career outcomes",
    blurb: "Roles and industries the university itself lists. No salary guesses.",
    locked: true,
    rows: [
      {
        label: "Career roles listed",
        value: (u) => {
          const n = uniqueFrom(u, (p) => p.career.roles).size;
          return n ? String(n) : null;
        },
        better: "higher",
        numeric: (u) => uniqueFrom(u, (p) => p.career.roles).size || null,
        hint: "More roles",
      },
      { label: "Example roles", value: (u) => list([...uniqueFrom(u, (p) => p.career.roles)], 4) },
      { label: "Industries", value: (u) => list([...uniqueFrom(u, (p) => p.career.industries)], 4) },
      {
        label: "Higher study paths",
        value: (u) => {
          const n = uniqueFrom(u, (p) => p.career.higher_study).size;
          return n ? String(n) : null;
        },
      },
    ],
  },
  {
    id: "editorial",
    title: "Degreekhojo editorial view",
    blurb: "What our team rates and flags after reading the official sources.",
    locked: true,
    rows: [
      { label: "Strengths", value: (u) => list(u.record.pros, 3) },
      { label: "Watch-outs", value: (u) => list(u.record.cons, 3) },
      { label: "Highlights", value: (u) => list(u.record.highlights, 3) },
      { label: "Editorial verdict", value: (u) => u.record.verdict ?? null },
    ],
  },
  {
    id: "verification",
    title: "Data verification",
    blurb: "Where each figure came from and when we last checked it.",
    locked: true,
    rows: [
      { label: "Data status", value: (u) => u.json?.data_status ?? null },
      { label: "Last verified", value: (u) => u.json?.last_verified ?? u.record.lastUpdated ?? null },
      {
        label: "Official sources linked",
        value: (u) => (verifiedSources(u) ? `${verifiedSources(u)} programme sources` : null),
        better: "higher",
        numeric: (u) => verifiedSources(u) || null,
        hint: "Better sourced",
      },
      {
        label: "Prospectus",
        value: (u) => u.json?.basic_information.official_prospectus_url ?? null,
      },
    ],
  },
];


export interface Verdict {
  label: string;
  winner: string;
  detail: string;
}

/** Factual "best for" lines — only emitted when the data supports them. */
export function quickVerdicts(selected: CompareUniversity[]): Verdict[] {
  if (selected.length < 2) return [];
  const out: Verdict[] = [];

  const feeRanked = selected.filter((u) => typeof u.lowestFee === "number");
  if (feeRanked.length >= 2) {
    const best = feeRanked.reduce((a, b) => (a.lowestFee! <= b.lowestFee! ? a : b));
    if (feeRanked.some((u) => u.lowestFee !== best.lowestFee)) {
      out.push({
        label: "Lower published fee",
        winner: best.shortName,
        detail: formatFee(best.lowestFee) ?? "",
      });
    }
  }

  const specRanked = selected.filter((u) => u.specialisationCount > 0);
  if (specRanked.length >= 2) {
    const best = specRanked.reduce((a, b) =>
      a.specialisationCount >= b.specialisationCount ? a : b,
    );
    if (specRanked.some((u) => u.specialisationCount !== best.specialisationCount)) {
      out.push({
        label: "More specialisations",
        winner: best.shortName,
        detail: `${best.specialisationCount} listed`,
      });
    }
  }

  const progRanked = selected.filter((u) => u.programmeCount > 0);
  if (progRanked.length >= 2) {
    const best = progRanked.reduce((a, b) => (a.programmeCount >= b.programmeCount ? a : b));
    if (progRanked.some((u) => u.programmeCount !== best.programmeCount)) {
      out.push({
        label: "Wider programme range",
        winner: best.shortName,
        detail: `${best.programmeCount} programmes`,
      });
    }
  }

  return out.slice(0, 3);
}

/** Slugs whose cells win a highlighted row. */
export function winnersFor(row: CompareRow, selected: CompareUniversity[]): Set<string> {
  if (!row.better || !row.numeric) return new Set();
  const pairs = selected
    .map((u) => ({ slug: u.slug, n: row.numeric!(u) }))
    .filter((p): p is { slug: string; n: number } => typeof p.n === "number");
  if (pairs.length < 2) return new Set();
  const target =
    row.better === "lower"
      ? Math.min(...pairs.map((p) => p.n))
      : Math.max(...pairs.map((p) => p.n));
  if (pairs.every((p) => p.n === target)) return new Set();
  return new Set(pairs.filter((p) => p.n === target).map((p) => p.slug));
}
