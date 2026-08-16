/**
 * Verified fee overrides for the state / national open universities.
 *
 * Every row below is transcribed literally from a document supplied by the
 * AVEDU fee desk (see `source` on each row). Nothing is derived or estimated:
 * where a document does not state a programme-total, `total` stays `null` so
 * the UI shows the "not published" label instead of an invented number.
 *
 * Documents used (verified 2026-08-14):
 *  - IGNOU / DU SOL / BAOU  -> supplied fee spreadsheet
 *  - NSOU                   -> "Fee Structure for the different courses run by
 *                              the University", Netaji Subhas Open University
 *  - KSOU                   -> "KSOU Fee Structure", Karnataka State Open
 *                              University, Mysuru
 */

export type FeeBasis = "total" | "year" | "semester";

export interface OpenUniFee {
  /** Programme total in INR, or null when the document does not state one. */
  total: number | null;
  perYear: number | null;
  perSemester: number | null;
  registrationFee: number | null;
  examFee: number | null;
  prospectusFee: number | null;
  /** What the published amount actually represents. */
  basis: FeeBasis;
  source: string;
  note: string;
}

const IGNOU_SRC = "IGNOU programme fee sheet (supplied fee desk document)";
const SOL_SRC = "DU SOL programme fee sheet (supplied fee desk document)";
const BAOU_SRC = "BAOU programme fee sheet (supplied fee desk document)";
const NSOU_SRC = "NSOU official fee structure (wbnsou.ac.in fee structure PDF)";
const KSOU_SRC = "KSOU official fee structure PDF (Karnataka State Open University, Mysuru)";

type Row = Partial<OpenUniFee> & { source: string };

function row(r: Row): OpenUniFee {
  return {
    total: r.total ?? null,
    perYear: r.perYear ?? null,
    perSemester: r.perSemester ?? null,
    registrationFee: r.registrationFee ?? null,
    examFee: r.examFee ?? null,
    prospectusFee: r.prospectusFee ?? null,
    basis: r.basis ?? "total",
    source: r.source,
    note: r.note ?? "",
  };
}

/** Total published per year across `years`. */
function yearly(perYear: number, years: number, source: string, note = ""): OpenUniFee {
  return row({
    total: perYear * years,
    perYear,
    perSemester: Math.round(perYear / 2),
    basis: "year",
    source,
    note: note || `Published as ₹${perYear.toLocaleString("en-IN")} per year for ${years} years.`,
  });
}

/** Published programme total, split evenly for display only. */
function programme(total: number, years: number, source: string, note = ""): OpenUniFee {
  return row({
    total,
    perYear: Math.round(total / years),
    perSemester: Math.round(total / (years * 2)),
    basis: "total",
    source,
    note: note || "Published as a full programme fee; yearly split shown for guidance only.",
  });
}

/* ------------------------------------------------------------------ IGNOU */

const ignou: Record<string, OpenUniFee> = {
  "master-of-commerce": yearly(9300, 2, IGNOU_SRC),
  "master-of-business-administration": yearly(31000, 2, IGNOU_SRC),
  "master-of-computer-applications": yearly(25000, 2, IGNOU_SRC),
  "bachelor-of-arts": programme(13200, 3, IGNOU_SRC),
  "bachelor-of-commerce": programme(17600, 3, IGNOU_SRC),
  "bachelor-of-computer-applications": programme(23700, 3, IGNOU_SRC),
};

/* ----------------------------------------------------------------- DU SOL */

const solUgBase = 30360;
const solUgHons = 31860;
const solUgApplied = 39360;
const solManagement = 63360;

const duSol: Record<string, OpenUniFee> = {
  "b-com": programme(solUgBase, 3, SOL_SRC),
  "b-com-hons": programme(solUgHons, 3, SOL_SRC),
  "b-a-hons-english": programme(solUgHons, 3, SOL_SRC),
  "b-a-hons-political-science": programme(solUgHons, 3, SOL_SRC),
  "b-a-hons-economics": programme(solUgHons, 3, SOL_SRC),
  "b-a-programme-with-english": programme(solUgBase, 3, SOL_SRC),
  "b-a-programme-with-hindi": programme(solUgBase, 3, SOL_SRC),
  "b-a-programme-with-history": programme(solUgBase, 3, SOL_SRC),
  "b-a-programme-with-political-science": programme(solUgBase, 3, SOL_SRC),
  "b-a-programme-with-economics": programme(solUgBase, 3, SOL_SRC),
  "b-a-programme-with-mathematics": programme(solUgBase, 3, SOL_SRC),
  "b-a-programme-with-education": programme(solUgBase, 3, SOL_SRC),
  "b-a-programme-with-sanskrit": programme(solUgBase, 3, SOL_SRC),
  "b-a-programme-with-urdu": programme(solUgBase, 3, SOL_SRC),
  "b-a-programme-with-computer-applications": programme(solUgApplied, 3, SOL_SRC),
  "bachelor-of-management-studies": programme(solManagement, 3, SOL_SRC),
  "bachelor-of-business-administration-fia": programme(solManagement, 3, SOL_SRC),
  "m-a-political-science": programme(10870, 2, SOL_SRC),
  "m-a-history": programme(10870, 2, SOL_SRC),
  "m-a-sanskrit": programme(10870, 2, SOL_SRC),
  "m-a-hindi": programme(11170, 2, SOL_SRC),
  "m-com": programme(11170, 2, SOL_SRC),
  "master-of-business-administration-mba": programme(110440, 2, SOL_SRC),
};

/* ------------------------------------------------------------------- BAOU */

const baouNote =
  "Published in the supplied BAOU fee sheet as the annual programme fee; the programme total is the annual fee across the standard programme duration.";

const baou: Record<string, OpenUniFee> = {
  /* Undergraduate */
  "bachelor-of-arts-ba": yearly(3200, 3, BAOU_SRC, baouNote),
  "bachelor-of-commerce-b-com-hons": yearly(3200, 3, BAOU_SRC, baouNote),
  "bachelor-of-science-b-sc": yearly(3200, 3, BAOU_SRC, baouNote),
  "bachelor-of-library-and-information-science-blisc": yearly(5300, 1, BAOU_SRC, baouNote),
  "bachelor-of-education-b-ed": yearly(40000, 1, BAOU_SRC, baouNote),
  /* Postgraduate — arts & commerce */
  "master-of-arts-in-history": yearly(5300, 2, BAOU_SRC, baouNote),
  "master-of-arts-in-economics": yearly(5300, 2, BAOU_SRC, baouNote),
  "master-of-arts-in-political-science": yearly(5300, 2, BAOU_SRC, baouNote),
  "master-of-arts-in-public-administration": yearly(5300, 2, BAOU_SRC, baouNote),
  "master-of-arts-in-sociology-mso": yearly(5300, 2, BAOU_SRC, baouNote),
  "master-of-arts-in-journalism-and-mass-communication-majmc": yearly(7800, 2, BAOU_SRC, baouNote),
  "master-of-arts-in-english-meg": yearly(5300, 2, BAOU_SRC, baouNote),
  "master-of-arts-in-telugu": yearly(5300, 2, BAOU_SRC, baouNote),
  "master-of-arts-in-hindi-mhd": yearly(5300, 2, BAOU_SRC, baouNote),
  "master-of-arts-in-urdu": yearly(5300, 2, BAOU_SRC, baouNote),
  "master-of-commerce-m-com": yearly(7800, 2, BAOU_SRC, baouNote),
  /* Postgraduate — science */
  "master-of-science-in-psychology": yearly(15300, 2, BAOU_SRC, baouNote),
  "master-of-science-in-botany": yearly(15300, 2, BAOU_SRC, baouNote),
  "master-of-science-in-physics": yearly(15300, 2, BAOU_SRC, baouNote),
  "master-of-science-in-zoology": yearly(15300, 2, BAOU_SRC, baouNote),
  "master-of-science-in-mathematics": yearly(7800, 2, BAOU_SRC, baouNote),
  "master-of-science-in-environmental-science": yearly(15300, 2, BAOU_SRC, baouNote),
  "master-of-science-in-chemistry": yearly(18300, 2, BAOU_SRC, baouNote),
  "master-of-library-and-information-science-mlis": yearly(10300, 1, BAOU_SRC, baouNote),
  /* Management */
  "master-of-business-administration-mba": yearly(15300, 2, BAOU_SRC, baouNote),
  "master-of-business-administration-hospital-healthcare-management": yearly(120000, 1, BAOU_SRC, baouNote),
};

/* ------------------------------------------------------------------- NSOU */

const nsou: Record<string, OpenUniFee> = {
  /* Bachelor of Arts (Hons.) — ₹3,300 per year across 3 years */
  "b-a-in-bengali-hons": yearly(3300, 3, NSOU_SRC),
  "b-a-in-english-hons": yearly(3300, 3, NSOU_SRC),
  "b-a-in-history-hons": yearly(3300, 3, NSOU_SRC),
  "b-a-in-political-science-hons": yearly(3300, 3, NSOU_SRC),
  "b-a-in-public-administration-hons": yearly(3300, 3, NSOU_SRC),
  "b-a-in-sociology-hons": yearly(3300, 3, NSOU_SRC),
  "b-a-in-education-hons": yearly(3300, 3, NSOU_SRC),
  "b-a-in-economics-hons": yearly(3300, 3, NSOU_SRC),
  /* Commerce & Science (Hons.) */
  "b-com-hons": yearly(3300, 3, NSOU_SRC),
  "b-sc-in-mathematics-hons": yearly(4600, 3, NSOU_SRC),
  "b-sc-in-physics-hons": yearly(5200, 3, NSOU_SRC),
  "b-sc-in-chemistry-hons": yearly(5200, 3, NSOU_SRC),
  "b-sc-in-zoology-hons": yearly(5200, 3, NSOU_SRC),
  "b-sc-in-botany-hons": yearly(5000, 3, NSOU_SRC),
  "b-sc-in-geography-hons": yearly(5000, 3, NSOU_SRC),
  /* Library science & education */
  "b-lib-i-sc": yearly(5000, 1, NSOU_SRC),
  "b-ed-special-education-odl": yearly(20000, 2, NSOU_SRC),
  /* Master of Arts */
  "m-a-in-bengali": yearly(3800, 2, NSOU_SRC),
  "m-a-in-english": yearly(3800, 2, NSOU_SRC),
  "m-a-in-english-language-teaching": yearly(3800, 2, NSOU_SRC),
  "m-a-in-journalism-and-mass-communication": yearly(13000, 2, NSOU_SRC),
  "m-a-in-history": yearly(3800, 2, NSOU_SRC),
  "m-a-in-political-science": yearly(3800, 2, NSOU_SRC),
  "m-a-in-public-administration": yearly(3800, 2, NSOU_SRC),
  "m-a-in-education": yearly(3800, 2, NSOU_SRC),
  "m-a-in-economics": yearly(3800, 2, NSOU_SRC),
  /* Master of Science */
  "m-sc-in-mathematics": yearly(5200, 2, NSOU_SRC),
  "m-sc-in-zoology": yearly(18000, 2, NSOU_SRC),
  "m-sc-in-geography": yearly(18000, 2, NSOU_SRC),
  "m-sc-in-environmental-science": yearly(18000, 2, NSOU_SRC),
  /* Commerce, social work, library science */
  "m-com": yearly(3800, 2, NSOU_SRC),
  msw: yearly(5200, 2, NSOU_SRC),
  "m-lib-i-sc": yearly(10000, 1, NSOU_SRC),
  /* Semester-based programmes */
  "m-ed-special-education-odl": row({
    total: 85000,
    perSemester: 17000,
    perYear: 34000,
    basis: "semester",
    source: NSOU_SRC,
    note: "Published as ₹17,000 per semester across 5 semesters (₹85,000 programme fee).",
  }),
  "master-of-business-administration-mba": row({
    total: 100000,
    perSemester: 25000,
    perYear: 50000,
    basis: "semester",
    source: NSOU_SRC,
    note: "Published as ₹25,000 per semester across 4 semesters (₹1,00,000 programme fee).",
  }),
};

/* ------------------------------------------------------------------- KSOU */

/**
 * KSOU publishes a year-wise "Total Fee for Other Students" in its Revised Fee
 * Notification 2025-26 (July / January cycle, dated 07.01.2026). Each row below
 * lists those yearly totals verbatim; the programme total is the sum of the
 * university's own year-wise amounts.
 */
function ksouYears(years: number[], note?: string): OpenUniFee {
  const total = years.reduce((a, b) => a + b, 0);
  const label = years.map((y) => `₹${y.toLocaleString("en-IN")}`).join(" + ");
  return row({
    total,
    perYear: years[0] ?? null,
    perSemester: null,
    registrationFee: null,
    examFee: null,
    prospectusFee: null,
    basis: years.length > 1 ? "year" : "total",
    source: KSOU_SRC,
    note:
      note ??
      `Revised Fee Notification 2025-26 (07.01.2026): year-wise total fee ${label} for general category students. BPL (women), defence and ex-servicemen, auto/cab drivers and their families, and KSRTC/BMTC/NWKRTC/KKRTC staff receive a 10% concession on tuition fee.`,
  });
}

const ksou: Record<string, OpenUniFee> = {
  /* Undergraduate — year-wise total fee */
  ba: ksouYears([9240, 8690, 8690]),
  "b-com": ksouYears([9790, 9240, 9240]),
  "b-sc-general": ksouYears([26290, 25740, 25740]),
  "b-sc-information-technology": ksouYears([26290, 25740, 25740]),
  bca: ksouYears([26290, 25740, 25740]),
  bba: ksouYears([13640, 13090, 13090]),
  bsw: ksouYears([14190, 13860, 13860]),
  "b-lib-i-sc": ksouYears([13640]),
  /* Postgraduate */
  ma: ksouYears([11660, 11110]),
  "m-com": ksouYears([13640, 13090]),
  mba: ksouYears([32890, 32120]),
  "m-sc": ksouYears([32670, 32120]),
  mca: ksouYears([32670, 32120]),
  msw: ksouYears([23430, 23100]),
  "m-lib-i-sc": ksouYears([19965]),
  /* Diploma programmes (10+2 based) — single published total fee */
  "diploma-in-kannada": ksouYears([7040]),
  "diploma-in-journalism": ksouYears([8690]),
  "diploma-in-information-technology": ksouYears([8800]),
  "diploma-in-computer-application": ksouYears([9240]),
  "diploma-in-early-childhood-care-and-education": ksouYears([19360]),
  "diploma-in-translation-studies": ksouYears([7810]),
};

const SHOOLINI_SRC = "Shoolini Online official programme fee page";

/** Shoolini publishes a programme total plus a per-semester amount. */
const shoolini: Record<string, OpenUniFee> = {
  "master-of-business-administration-mba": row({
    total: 200000,
    perSemester: 25000,
    perYear: 100000,
    basis: "total",
    source: SHOOLINI_SRC,
    note: "Published regular programme fee ₹2,00,000; ₹1,50,000 payable with the university scholarship.",
  }),
  "bachelor-of-commerce-b-com": row({
    total: 120000,
    perSemester: 20000,
    perYear: 40000,
    basis: "total",
    source: SHOOLINI_SRC,
    note: "Published regular programme fee ₹1,20,000; ₹90,000 payable with the university scholarship.",
  }),
  "bachelor-of-business-administration-bba": row({
    total: 100000,
    perSemester: 12500,
    perYear: 33333,
    basis: "total",
    source: SHOOLINI_SRC,
    note: "Standard BBA track: ₹1,00,000 total, ₹12,500 per semester. The pay-after-placement track is published at ₹1,20,000 (₹10,500 per semester).",
  }),
};

const table: Record<string, Record<string, OpenUniFee>> = {
  ignou,
  "du-sol": duSol,
  baou,
  nsou,
  "ksou-mysuru": ksou,
  "shoolini-online": shoolini,
};

/** Verified open-university fee for a university × programme, if documented. */
export function openUniversityFee(
  universitySlug: string,
  programmeSlug: string,
): OpenUniFee | undefined {
  return table[universitySlug]?.[programmeSlug];
}

/** True when the university's fees come from a supplied official document. */
export function hasOpenUniversityFeeSheet(universitySlug: string): boolean {
  return universitySlug in table;
}
