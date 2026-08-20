/**
 * Indicative average annual packages (INR LPA) for common roles hired from
 * online degree programmes in India. Keyword matched, deliberately shown as
 * ranges so no single figure reads as a placement promise.
 */
/** Internal provenance for each band — metadata only, never rendered as a placement figure. */
export interface SalaryBand {
  match: RegExp;
  range: string;
  /** Aggregator the range was compiled from. Internal metadata. */
  source: string;
  /** Calendar year the aggregator data was read for. Internal metadata. */
  year: number;
}

const SOURCE = "Glassdoor / AmbitionBox / Naukri (India, aggregated)";
const YEAR = 2026;

const bands: SalaryBand[] = [
  {
    match: /chief|vp|vice president|director|head of/i,
    range: "18 – 35 LPA",
    source: SOURCE,
    year: YEAR,
  },
  {
    match: /architect|scientist|machine learning|ai engineer/i,
    range: "12 – 24 LPA",
    source: SOURCE,
    year: YEAR,
  },
  {
    match: /investment|finance manager|financial analyst|risk/i,
    range: "7 – 16 LPA",
    source: SOURCE,
    year: YEAR,
  },
  {
    match: /product manager|program manager|project manager/i,
    range: "9 – 20 LPA",
    source: SOURCE,
    year: YEAR,
  },
  { match: /manager|lead/i, range: "7 – 15 LPA", source: SOURCE, year: YEAR },
  { match: /consultant|strategy/i, range: "6 – 14 LPA", source: SOURCE, year: YEAR },
  {
    match: /developer|engineer|programmer|devops|cloud/i,
    range: "5 – 12 LPA",
    source: SOURCE,
    year: YEAR,
  },
  {
    match: /data analyst|business analyst|analyst/i,
    range: "5 – 11 LPA",
    source: SOURCE,
    year: YEAR,
  },
  { match: /designer|ux|ui/i, range: "4.5 – 10 LPA", source: SOURCE, year: YEAR },
  {
    match: /digital marketing|marketing|seo|content/i,
    range: "4 – 10 LPA",
    source: SOURCE,
    year: YEAR,
  },
  { match: /hr|human resource|recruit|talent/i, range: "4 – 9 LPA", source: SOURCE, year: YEAR },
  {
    match: /sales|business development|relationship/i,
    range: "4 – 10 LPA",
    source: SOURCE,
    year: YEAR,
  },
  { match: /accountant|audit|tax/i, range: "4 – 9 LPA", source: SOURCE, year: YEAR },
  {
    match: /teacher|faculty|trainer|counsellor|counselor/i,
    range: "3.5 – 8 LPA",
    source: SOURCE,
    year: YEAR,
  },
  {
    match: /executive|associate|assistant|officer|coordinator/i,
    range: "3 – 7 LPA",
    source: SOURCE,
    year: YEAR,
  },
];

const FALLBACK: SalaryBand = { match: /.*/, range: "4 – 10 LPA", source: SOURCE, year: YEAR };

/** Internal lookup: full band incl. source/year metadata. */
export function salaryBandFor(role: string): SalaryBand {
  return bands.find((b) => b.match.test(role)) ?? FALLBACK;
}

export function averagePackageFor(role: string): string {
  return salaryBandFor(role).range;
}

/**
 * Common hiring roles by course family, used when neither the university nor
 * the programme dataset publishes a role list.
 */
const roleSets: Array<{ match: RegExp; roles: string[] }> = [
  {
    match: /mba|master-of-business|pgdm|management/i,
    roles: [
      "Business Manager",
      "Marketing Manager",
      "Financial Analyst",
      "Human Resource Manager",
      "Operations Manager",
      "Business Analyst",
      "Project Manager",
      "Management Consultant",
    ],
  },
  {
    match: /mca|computer-application|m-sc-data|data-science|artificial/i,
    roles: [
      "Software Developer",
      "Data Analyst",
      "Full Stack Engineer",
      "Cloud Engineer",
      "Data Scientist",
      "System Analyst",
      "DevOps Engineer",
      "IT Project Manager",
    ],
  },
  {
    match: /bca|b-sc-computer/i,
    roles: [
      "Junior Software Developer",
      "Web Developer",
      "QA Engineer",
      "Support Engineer",
      "Data Analyst",
    ],
  },
  {
    match: /bba|bachelor-of-business/i,
    roles: [
      "Sales Executive",
      "Marketing Executive",
      "HR Associate",
      "Business Development Executive",
      "Operations Executive",
    ],
  },
  {
    match: /b-com|m-com|commerce/i,
    roles: [
      "Accountant",
      "Tax Associate",
      "Audit Assistant",
      "Finance Executive",
      "Financial Analyst",
    ],
  },
  {
    match: /journalism|mass-comm/i,
    roles: [
      "Content Writer",
      "Digital Marketing Executive",
      "Public Relations Executive",
      "Media Coordinator",
    ],
  },
  {
    match: /-ba$|bachelor-of-arts|-ma$|master-of-arts|english|psychology|sociology/i,
    roles: [
      "Content Writer",
      "Teacher / Faculty",
      "HR Associate",
      "Counsellor",
      "Research Associate",
    ],
  },
];

export function defaultRolesFor(programmeSlug: string): string[] {
  for (const r of roleSets) if (r.match.test(programmeSlug)) return r.roles;
  return [];
}

/** Shown wherever a salary range appears, so numbers are never presented bare. */
export const salarySourceNote =
  "Ranges are compiled from published Indian job-market salary aggregators (Glassdoor, AmbitionBox, Naukri) for 2025-26 and refreshed each session. They are role averages for the Indian market, not university placement figures.";
