/**
 * Role-wise indicative salary table for Indian online-degree outcomes.
 *
 * Every band is an INR LPA range compiled from public Indian salary
 * aggregators (Glassdoor, AmbitionBox, Naukri) for the 2025-26 hiring year —
 * the same provenance recorded in `careerSalaries.ts`. These are role averages
 * for the Indian market, never a university placement promise.
 */

export interface RoleSalaryRow {
  role: string;
  /** Course family slugs this role is commonly hired from. */
  courses: string[];
  /** [min, max] INR LPA with 0-2 years of relevant experience. */
  fresher: [number, number];
  /** [min, max] INR LPA at roughly 3-5 years. */
  mid: [number, number];
  /** [min, max] INR LPA at roughly 8+ years. */
  senior: [number, number];
  /** Industries that hire this role in volume. */
  industries: string[];
  /** The skill that most moves pay inside this role. */
  payDriver: string;
}

const MBA = "online-mba";
const MCA = "online-mca";
const MCOM = "online-mcom";
const MSC = "online-msc";
const MA = "online-ma";
const BBA = "online-bba";
const BCA = "online-bca";
const BCOM = "online-bcom";
const BA = "online-ba";

export const roleSalaries: RoleSalaryRow[] = [
  // ---- Management / MBA track ----
  {
    role: "Business Analyst",
    courses: [MBA, BBA, MCA],
    fresher: [4.5, 7],
    mid: [8, 14],
    senior: [16, 28],
    industries: ["IT services", "BFSI", "Consulting"],
    payDriver: "SQL plus a domain (payments, insurance, supply chain)",
  },
  {
    role: "Marketing Manager",
    courses: [MBA, BBA],
    fresher: [4, 7],
    mid: [8, 15],
    senior: [18, 32],
    industries: ["FMCG", "E-commerce", "EdTech"],
    payDriver: "Owning a revenue number, not just campaigns",
  },
  {
    role: "Digital Marketing Manager",
    courses: [MBA, BBA, BA],
    fresher: [3.5, 6.5],
    mid: [7, 13],
    senior: [14, 24],
    industries: ["D2C brands", "Agencies", "SaaS"],
    payDriver: "Performance media budgets managed per month",
  },
  {
    role: "Operations Manager",
    courses: [MBA, BBA],
    fresher: [4, 7],
    mid: [8, 14],
    senior: [16, 28],
    industries: ["Logistics", "Manufacturing", "Q-commerce"],
    payDriver: "Cost-per-unit and SLA ownership at site scale",
  },
  {
    role: "Supply Chain Manager",
    courses: [MBA],
    fresher: [4.5, 7.5],
    mid: [9, 16],
    senior: [18, 30],
    industries: ["Retail", "Pharma", "Auto"],
    payDriver: "Network planning and vendor negotiation record",
  },
  {
    role: "Human Resource Manager",
    courses: [MBA, BBA, MA],
    fresher: [3.5, 6],
    mid: [7, 12],
    senior: [14, 26],
    industries: ["IT services", "BPM", "Manufacturing"],
    payDriver: "Move from HR generalist to HRBP for a P&L",
  },
  {
    role: "Talent Acquisition Lead",
    courses: [MBA, BBA],
    fresher: [3.5, 6],
    mid: [7, 12],
    senior: [13, 22],
    industries: ["IT services", "Staffing", "Startups"],
    payDriver: "Niche tech or leadership hiring closes",
  },
  {
    role: "Project Manager",
    courses: [MBA, MCA],
    fresher: [5, 8],
    mid: [10, 18],
    senior: [20, 34],
    industries: ["IT services", "Construction", "BFSI"],
    payDriver: "PMP/Agile certification plus multi-crore project scope",
  },
  {
    role: "Product Manager",
    courses: [MBA, MCA],
    fresher: [6, 10],
    mid: [12, 22],
    senior: [24, 45],
    industries: ["SaaS", "Fintech", "Consumer internet"],
    payDriver: "Shipped products with measurable adoption",
  },
  {
    role: "Management Consultant",
    courses: [MBA],
    fresher: [5, 9],
    mid: [10, 20],
    senior: [22, 40],
    industries: ["Consulting", "Advisory", "Strategy units"],
    payDriver: "Sector specialisation and client-facing record",
  },
  {
    role: "Business Development Manager",
    courses: [MBA, BBA],
    fresher: [3.5, 6.5],
    mid: [7, 14],
    senior: [15, 28],
    industries: ["SaaS", "EdTech", "Real estate"],
    payDriver: "Quota attainment and deal size, not tenure",
  },
  {
    role: "Sales Executive",
    courses: [BBA, BCOM, BA],
    fresher: [2.4, 4.5],
    mid: [5, 9],
    senior: [10, 18],
    industries: ["Insurance", "Retail", "EdTech"],
    payDriver: "Variable pay component and territory size",
  },
  {
    role: "Retail Store Manager",
    courses: [MBA, BBA],
    fresher: [3, 5.5],
    mid: [6, 11],
    senior: [12, 20],
    industries: ["Retail chains", "QSR", "Fashion"],
    payDriver: "Store revenue tier and multi-store charge",
  },
  {
    role: "Hospital Administrator",
    courses: [MBA],
    fresher: [3.5, 6],
    mid: [7, 13],
    senior: [14, 24],
    industries: ["Hospital chains", "Diagnostics", "Health insurance"],
    payDriver: "NABH accreditation and multi-department charge",
  },

  // ---- Finance / commerce track ----
  {
    role: "Financial Analyst",
    courses: [MBA, MCOM, BCOM],
    fresher: [4, 7],
    mid: [8, 15],
    senior: [16, 30],
    industries: ["BFSI", "Capital markets", "Corporate finance"],
    payDriver: "Modelling depth plus CFA/NISM credentials",
  },
  {
    role: "Finance Manager",
    courses: [MBA, MCOM],
    fresher: [4.5, 8],
    mid: [9, 16],
    senior: [18, 32],
    industries: ["Manufacturing", "IT", "NBFC"],
    payDriver: "Controllership and statutory reporting ownership",
  },
  {
    role: "Accountant",
    courses: [BCOM, MCOM],
    fresher: [2.4, 4],
    mid: [4.5, 8],
    senior: [9, 15],
    industries: ["SMEs", "CA firms", "Shared services"],
    payDriver: "GST, TDS and ERP (Tally/SAP) fluency",
  },
  {
    role: "Taxation Executive",
    courses: [MCOM, BCOM],
    fresher: [2.8, 4.5],
    mid: [5, 9],
    senior: [10, 17],
    industries: ["CA firms", "Consulting", "Corporates"],
    payDriver: "Direct plus indirect tax handling and litigation support",
  },
  {
    role: "Internal Auditor",
    courses: [MCOM, MBA, BCOM],
    fresher: [3, 5],
    mid: [6, 11],
    senior: [12, 22],
    industries: ["Big-4 and mid-tier audit", "Banks", "PSUs"],
    payDriver: "Risk and controls frameworks (SOX, IFC)",
  },
  {
    role: "Credit Analyst",
    courses: [MBA, MCOM],
    fresher: [3.5, 6],
    mid: [7, 12],
    senior: [13, 24],
    industries: ["Banks", "NBFC", "Rating agencies"],
    payDriver: "Corporate versus retail book exposure",
  },
  {
    role: "Investment Banking Associate",
    courses: [MBA],
    fresher: [8, 14],
    mid: [16, 28],
    senior: [30, 60],
    industries: ["Investment banks", "PE/VC", "Boutique advisory"],
    payDriver: "Deal sheet and league-table exposure",
  },
  {
    role: "Relationship Manager (Banking)",
    courses: [MBA, BBA, BCOM],
    fresher: [3, 5.5],
    mid: [6, 11],
    senior: [12, 22],
    industries: ["Private banks", "Wealth management", "NBFC"],
    payDriver: "Book size (AUM) you carry across",
  },

  // ---- Technology track ----
  {
    role: "Software Developer",
    courses: [MCA, BCA, MSC],
    fresher: [3.5, 7],
    mid: [8, 18],
    senior: [20, 40],
    industries: ["IT services", "Product companies", "Startups"],
    payDriver: "Product-company move; stack scarcity beats years served",
  },
  {
    role: "Full Stack Engineer",
    courses: [MCA, BCA],
    fresher: [4, 8],
    mid: [9, 20],
    senior: [22, 42],
    industries: ["SaaS", "Fintech", "Agencies"],
    payDriver: "A public portfolio of shipped, live systems",
  },
  {
    role: "Data Analyst",
    courses: [MCA, MSC, MBA, BCA],
    fresher: [3.5, 6.5],
    mid: [7, 14],
    senior: [15, 26],
    industries: ["BFSI", "E-commerce", "Healthcare"],
    payDriver: "SQL and Python plus one BI tool at production depth",
  },
  {
    role: "Data Scientist",
    courses: [MSC, MCA],
    fresher: [5, 10],
    mid: [12, 22],
    senior: [24, 45],
    industries: ["Fintech", "Consumer internet", "Analytics firms"],
    payDriver: "Models actually deployed, not notebooks",
  },
  {
    role: "Cloud Engineer",
    courses: [MCA, BCA, MSC],
    fresher: [4, 8],
    mid: [10, 20],
    senior: [22, 40],
    industries: ["IT services", "Cloud partners", "Enterprises"],
    payDriver: "AWS/Azure professional-level certification",
  },
  {
    role: "DevOps Engineer",
    courses: [MCA, BCA],
    fresher: [4.5, 8],
    mid: [10, 20],
    senior: [22, 38],
    industries: ["Product firms", "IT services", "Startups"],
    payDriver: "Kubernetes, IaC and on-call ownership",
  },
  {
    role: "Cybersecurity Analyst",
    courses: [MCA, MSC, BCA],
    fresher: [4, 7.5],
    mid: [9, 18],
    senior: [20, 36],
    industries: ["BFSI", "Managed security", "Consulting"],
    payDriver: "SOC experience plus CEH/CISSP-track certification",
  },
  {
    role: "QA / Test Engineer",
    courses: [BCA, MCA],
    fresher: [3, 5.5],
    mid: [6, 12],
    senior: [13, 22],
    industries: ["IT services", "Product firms", "BFSI"],
    payDriver: "Automation frameworks over manual testing",
  },
  {
    role: "System Administrator",
    courses: [BCA, MCA],
    fresher: [2.8, 5],
    mid: [5.5, 10],
    senior: [11, 18],
    industries: ["Enterprises", "Data centres", "Government projects"],
    payDriver: "Linux plus cloud migration exposure",
  },
  {
    role: "IT Support Engineer",
    courses: [BCA],
    fresher: [2.4, 4],
    mid: [4.5, 8],
    senior: [9, 14],
    industries: ["IT services", "BPM", "Enterprise IT"],
    payDriver: "Moving from L1 to L2/L3 escalation ownership",
  },
  {
    role: "Web Developer",
    courses: [BCA, MCA],
    fresher: [2.8, 5.5],
    mid: [6, 12],
    senior: [13, 22],
    industries: ["Agencies", "D2C", "Startups"],
    payDriver: "Modern framework depth and freelance portfolio",
  },
  {
    role: "AI / Machine Learning Engineer",
    courses: [MCA, MSC],
    fresher: [6, 11],
    mid: [13, 24],
    senior: [26, 50],
    industries: ["Product firms", "Research labs", "Fintech"],
    payDriver: "Production ML pipelines and MLOps",
  },
  {
    role: "Database Administrator",
    courses: [MCA, BCA],
    fresher: [3.5, 6],
    mid: [7, 13],
    senior: [14, 26],
    industries: ["BFSI", "Telecom", "Enterprises"],
    payDriver: "Performance tuning on large transactional systems",
  },

  // ---- Arts / science / education track ----
  {
    role: "Content Writer",
    courses: [BA, MA, BCOM],
    fresher: [2.4, 4.5],
    mid: [5, 9],
    senior: [10, 18],
    industries: ["Agencies", "SaaS", "Media"],
    payDriver: "SEO plus a technical or financial niche",
  },
  {
    role: "Public Relations Executive",
    courses: [BA, MA, MBA],
    fresher: [2.8, 5],
    mid: [5.5, 10],
    senior: [11, 20],
    industries: ["PR agencies", "Corporates", "Startups"],
    payDriver: "Tier-1 media relationships",
  },
  {
    role: "Teacher / Faculty",
    courses: [MA, MSC, BA],
    fresher: [2.4, 4.5],
    mid: [5, 8.5],
    senior: [9, 16],
    industries: ["Schools", "Colleges", "EdTech"],
    payDriver: "NET/SET or a doctorate for higher-education grades",
  },
  {
    role: "Counsellor / Psychologist",
    courses: [MA, BA],
    fresher: [2.5, 4.5],
    mid: [5, 9],
    senior: [10, 18],
    industries: ["Clinics", "Schools", "Corporate wellness"],
    payDriver: "RCI registration and supervised practice hours",
  },
  {
    role: "Research Associate",
    courses: [MA, MSC],
    fresher: [3, 5.5],
    mid: [6, 11],
    senior: [12, 20],
    industries: ["Think tanks", "Market research", "Universities"],
    payDriver: "Quantitative methods and publication record",
  },
  {
    role: "Instructional Designer",
    courses: [MA, MSC, MBA],
    fresher: [3.5, 6],
    mid: [7, 12],
    senior: [13, 22],
    industries: ["EdTech", "Corporate L&D", "Publishing"],
    payDriver: "Authoring tools plus measurable learning outcomes",
  },
  {
    role: "Environmental / Lab Analyst",
    courses: [MSC],
    fresher: [2.8, 5],
    mid: [5.5, 10],
    senior: [11, 18],
    industries: ["Pharma", "Testing labs", "Manufacturing QC"],
    payDriver: "Regulatory (GLP/GMP) accreditation experience",
  },

  // ---- Cross-course operations ----
  {
    role: "Operations Executive",
    courses: [BBA, BCOM, BA],
    fresher: [2.4, 4.2],
    mid: [4.5, 8],
    senior: [9, 15],
    industries: ["Logistics", "BPM", "E-commerce"],
    payDriver: "Process-improvement wins you can quantify",
  },
  {
    role: "Customer Success Manager",
    courses: [MBA, BBA, BCA],
    fresher: [3.5, 6],
    mid: [7, 13],
    senior: [14, 26],
    industries: ["SaaS", "Fintech", "EdTech"],
    payDriver: "Net revenue retention on the accounts you own",
  },
];

/** Course filter options, in the order shown on the tool. */
export const salaryCourseFilters: Array<{ slug: string; label: string; short: string }> = [
  { slug: MBA, label: "Online MBA", short: "MBA" },
  { slug: MCA, label: "Online MCA", short: "MCA" },
  { slug: MCOM, label: "Online M.Com", short: "M.Com" },
  { slug: MSC, label: "Online M.Sc", short: "M.Sc" },
  { slug: MA, label: "Online MA", short: "MA" },
  { slug: BBA, label: "Online BBA", short: "BBA" },
  { slug: BCA, label: "Online BCA", short: "BCA" },
  { slug: BCOM, label: "Online B.Com", short: "B.Com" },
  { slug: BA, label: "Online BA", short: "BA" },
];

export const lpaRange = (r: [number, number]) => `₹${r[0]} – ₹${r[1]} LPA`;
export const midOf = (r: [number, number]) => (r[0] + r[1]) / 2;

/** City-tier multipliers applied to the national role band. */
export const cityFactors = [
  { city: "Bengaluru", tier: "Metro / tech hub", factor: 1.2 },
  { city: "Mumbai", tier: "Metro / BFSI hub", factor: 1.18 },
  { city: "Delhi NCR (Gurugram, Noida)", tier: "Metro", factor: 1.15 },
  { city: "Hyderabad", tier: "Metro / tech hub", factor: 1.12 },
  { city: "Pune", tier: "Metro", factor: 1.08 },
  { city: "Chennai", tier: "Metro", factor: 1.05 },
  { city: "Ahmedabad, Jaipur, Kochi, Indore", tier: "Tier-2", factor: 0.95 },
  { city: "Tier-3 city or small town", tier: "Tier-3", factor: 0.85 },
  { city: "Fully remote (India payroll)", tier: "Remote", factor: 1.05 },
];

/** Experience-stage uplift pattern seen across the roles above. */
export const experienceLadder = [
  {
    stage: "0 – 2 years",
    label: "Entry",
    note: "Degree plus one demonstrable skill decides the offer. Online-degree freshers start at the same band as regular-mode freshers when the skill test is cleared, but they lose the campus-placement channel, so applications are self-driven.",
  },
  {
    stage: "3 – 5 years",
    label: "Mid",
    note: "The biggest single jump in the table. A PG degree completed while working is usually converted at the next appraisal or the next job change, typically three to nine months after the final result.",
  },
  {
    stage: "6 – 8 years",
    label: "Senior individual contributor",
    note: "Pay separates by specialisation, not by course. Two people with the same MBA sit 2x apart depending on whether they own a revenue or cost number.",
  },
  {
    stage: "8+ years",
    label: "Leadership",
    note: "The degree is a gate, not a driver: many senior roles list a PG qualification as mandatory, which is why working professionals complete one — the pay comes from scope.",
  },
];

export interface CourseSalarySnapshot {
  slug: string;
  label: string;
  short: string;
  roleCount: number;
  fresher: [number, number];
  mid: [number, number];
  senior: [number, number];
  topRole: string;
}

/** Course-wise aggregate, derived from the role table so the two never disagree. */
export function courseSalarySnapshots(): CourseSalarySnapshot[] {
  return salaryCourseFilters
    .map((c) => {
      const rows = roleSalaries.filter((r) => r.courses.includes(c.slug));
      if (!rows.length) return null;
      const agg = (key: "fresher" | "mid" | "senior"): [number, number] => [
        Math.min(...rows.map((r) => r[key][0])),
        Math.max(...rows.map((r) => r[key][1])),
      ];
      const topRole = rows.slice().sort((a, b) => midOf(b.senior) - midOf(a.senior))[0]!.role;
      return {
        slug: c.slug,
        label: c.label,
        short: c.short,
        roleCount: rows.length,
        fresher: agg("fresher"),
        mid: agg("mid"),
        senior: agg("senior"),
        topRole,
      };
    })
    .filter((x): x is CourseSalarySnapshot => x !== null);
}

/** Industries ranked by how many roles in the table hire into them. */
export function industryDemand(limit = 10) {
  const counts = new Map<string, { roles: string[]; pay: number[] }>();
  for (const r of roleSalaries) {
    for (const i of r.industries) {
      const e = counts.get(i) ?? { roles: [], pay: [] };
      e.roles.push(r.role);
      e.pay.push(midOf(r.mid));
      counts.set(i, e);
    }
  }
  return [...counts.entries()]
    .map(([industry, e]) => ({
      industry,
      roleCount: e.roles.length,
      sampleRoles: e.roles.slice(0, 3),
      medianMidPay: e.pay.slice().sort((a, b) => a - b)[Math.floor(e.pay.length / 2)] ?? 0,
    }))
    .sort((a, b) => b.roleCount - a.roleCount)
    .slice(0, limit);
}
