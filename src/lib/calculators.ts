/**
 * Maths + baselines behind the public calculators (/tools).
 *
 * Rules: nothing here invents a university fee — fees always come from the
 * master dataset via `courseFamilyList()`. Salary baselines are indicative
 * ranges compiled from public aggregators and from the placement documents
 * stored in `src/data/sources/pdf/` (see `university-placement-facts.ts`);
 * they are labelled as indicative everywhere they are rendered.
 */

export const INR = (n: number) =>
  `₹${Math.round(n).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

export const LPA = (n: number) => `₹${(n / 100000).toFixed(1)} LPA`;

/** Equated monthly instalment. `annualRate` in percent; 0 = no-cost EMI. */
export function emi(principal: number, annualRate: number, months: number): number {
  if (principal <= 0 || months <= 0) return 0;
  const r = annualRate / 12 / 100;
  if (r === 0) return principal / months;
  const f = Math.pow(1 + r, months);
  return (principal * r * f) / (f - 1);
}

export interface EmiPlan {
  monthly: number;
  totalPayable: number;
  totalInterest: number;
}

export function emiPlan(principal: number, annualRate: number, months: number): EmiPlan {
  const monthly = emi(principal, annualRate, months);
  const totalPayable = monthly * months;
  return { monthly, totalPayable, totalInterest: Math.max(0, totalPayable - principal) };
}

export interface RoiResult {
  /** Extra annual income once the degree is completed. */
  annualGain: number;
  /** Months of post-completion earning needed to recover the fee outlay. */
  paybackMonths: number | null;
  /** Net gain over the chosen horizon, after the total cost of the degree. */
  netGain: number;
  roiPercent: number | null;
}

export function roi(params: {
  totalCost: number;
  currentSalary: number;
  expectedSalary: number;
  horizonYears: number;
}): RoiResult {
  const { totalCost, currentSalary, expectedSalary, horizonYears } = params;
  const annualGain = Math.max(0, expectedSalary - currentSalary);
  const paybackMonths = annualGain > 0 ? (totalCost / annualGain) * 12 : null;
  const netGain = annualGain * horizonYears - totalCost;
  const roiPercent = totalCost > 0 ? (netGain / totalCost) * 100 : null;
  return { annualGain, paybackMonths, netGain, roiPercent };
}

/**
 * Indicative post-degree salary bands by course family (INR per annum).
 * `fresher` = first role after completion with little experience,
 * `experienced` = typical band 3–5 years after completion.
 */
export interface CourseSalaryBaseline {
  familySlug: string;
  label: string;
  fresherMin: number;
  fresherMax: number;
  experiencedMin: number;
  experiencedMax: number;
  /** Typical uplift reported by working learners who finish while employed. */
  typicalUpliftPercent: number;
  roles: string[];
}

export const courseSalaryBaselines: CourseSalaryBaseline[] = [
  {
    familySlug: "online-mba",
    label: "Online MBA",
    fresherMin: 400000,
    fresherMax: 800000,
    experiencedMin: 900000,
    experiencedMax: 1800000,
    typicalUpliftPercent: 35,
    roles: [
      "Business Analyst",
      "Marketing Manager",
      "Operations Manager",
      "Finance Manager",
      "HR Manager",
    ],
  },
  {
    familySlug: "online-mca",
    label: "Online MCA",
    fresherMin: 350000,
    fresherMax: 700000,
    experiencedMin: 800000,
    experiencedMax: 1600000,
    typicalUpliftPercent: 32,
    roles: [
      "Software Developer",
      "Data Analyst",
      "Cloud Engineer",
      "DevOps Engineer",
      "System Analyst",
    ],
  },
  {
    familySlug: "online-mcom",
    label: "Online M.Com",
    fresherMin: 300000,
    fresherMax: 550000,
    experiencedMin: 600000,
    experiencedMax: 1100000,
    typicalUpliftPercent: 25,
    roles: ["Accounts Manager", "Taxation Executive", "Audit Associate", "Finance Executive"],
  },
  {
    familySlug: "online-msc",
    label: "Online M.Sc",
    fresherMin: 350000,
    fresherMax: 650000,
    experiencedMin: 700000,
    experiencedMax: 1400000,
    typicalUpliftPercent: 28,
    roles: ["Data Scientist", "Research Associate", "Analytics Consultant", "Lecturer"],
  },
  {
    familySlug: "online-ma",
    label: "Online MA",
    fresherMin: 250000,
    fresherMax: 500000,
    experiencedMin: 500000,
    experiencedMax: 950000,
    typicalUpliftPercent: 22,
    roles: ["Content Manager", "Policy Associate", "Teacher / Faculty", "Communications Executive"],
  },
  {
    familySlug: "online-bba",
    label: "Online BBA",
    fresherMin: 250000,
    fresherMax: 450000,
    experiencedMin: 500000,
    experiencedMax: 900000,
    typicalUpliftPercent: 20,
    roles: ["Sales Executive", "Business Development Executive", "Operations Associate"],
  },
  {
    familySlug: "online-bca",
    label: "Online BCA",
    fresherMin: 250000,
    fresherMax: 500000,
    experiencedMin: 550000,
    experiencedMax: 1000000,
    typicalUpliftPercent: 24,
    roles: ["Junior Developer", "QA Engineer", "Support Engineer", "Web Developer"],
  },
  {
    familySlug: "online-bcom",
    label: "Online B.Com",
    fresherMin: 220000,
    fresherMax: 420000,
    experiencedMin: 450000,
    experiencedMax: 850000,
    typicalUpliftPercent: 18,
    roles: ["Accounts Executive", "GST / Tax Assistant", "Billing Analyst"],
  },
  {
    familySlug: "online-ba",
    label: "Online BA",
    fresherMin: 200000,
    fresherMax: 400000,
    experiencedMin: 420000,
    experiencedMax: 800000,
    typicalUpliftPercent: 16,
    roles: ["Executive Assistant", "Content Writer", "Customer Success Executive"],
  },
];

export const baselineFor = (familySlug: string): CourseSalaryBaseline | undefined =>
  courseSalaryBaselines.find((b) => b.familySlug === familySlug);

/** Simple experience weighting between the fresher and experienced bands. */
export function projectedBand(
  b: CourseSalaryBaseline,
  years: number,
): { min: number; max: number } {
  const t = Math.min(1, Math.max(0, years / 5));
  return {
    min: b.fresherMin + (b.experiencedMin - b.fresherMin) * t,
    max: b.fresherMax + (b.experiencedMax - b.fresherMax) * t,
  };
}
