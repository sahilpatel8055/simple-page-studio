/**
 * Placement & recognition facts extracted from the university documents stored
 * in `src/data/sources/pdf/`. Every entry is written in its own words for that
 * one university — nothing here is a shared template sentence.
 */
export type PlacementFacts = {
  summary: string;
  stats: { label: string; value: string }[];
  recruiters: string[];
  support: string[];
  approvals: string[];
  sourceNote: string;
};

export const universityPlacementFacts: Record<string, PlacementFacts> = {
  "amity-online": {
    summary:
      "Amity's online career cell runs the same recruitment calendar it uses for its campus learners, so the support is built around profile readiness rather than a single placement week.",
    stats: [
      { label: "Highest package reported", value: "Around INR 18 LPA" },
      { label: "Hiring partner network", value: "500+ companies" },
    ],
    recruiters: [],
    support: [
      "Resume and profile review before recruiter drives",
      "Interview preparation and career-tool access for enrolled learners",
      "Degrees evaluated by WES for learners planning to work or study abroad",
    ],
    approvals: ["UGC-entitled online degrees", "WES evaluation accepted"],
    sourceNote: "Manually researched — source: Amity Online placement & approvals document.",
  },
  "lpu-online": {
    summary:
      "LPU publishes actual hiring statistics rather than a generic promise, and its placement cell works sector by sector — IT, BFSI, retail, telecom, consulting, insurance, edtech, hospitality and manufacturing each have their own recruiter pool.",
    stats: [
      { label: "Highest salary package", value: "INR 23 LPA" },
      { label: "Average salary (top 10%)", value: "INR 12.19 LPA" },
      { label: "Top-quartile average", value: "INR 10.23 LPA" },
      { label: "Recruiters engaged", value: "2,225+ companies" },
    ],
    recruiters: [
      "Amazon",
      "Microsoft",
      "Google",
      "Wipro",
      "Infosys",
      "TCS",
      "Capgemini",
      "Cognizant",
      "HCL Technologies",
      "HDFC Bank",
      "ICICI Bank",
      "Kotak Mahindra Bank",
      "Axis Bank",
      "Bajaj Finserv",
      "Flipkart",
      "Reliance Retail",
      "Airtel",
      "Jio",
      "Deloitte",
      "EY",
      "KPMG",
      "Genpact",
      "LIC",
      "Max Life Insurance",
      "Paytm",
      "Tally",
      "IndiGo Airlines",
      "Maruti Suzuki",
      "Hero MotoCorp",
      "Asian Paints",
    ],
    support: [
      "Sector-wise recruiter mapping through the central placement cell",
      "Career guidance and interview grooming ahead of drives",
    ],
    approvals: ["AICTE", "UGC-DEB", "NAAC A++", "AIU membership"],
    sourceNote: "Manually researched — source: LPU Online placement & approvals document.",
  },
  "manipal-university-jaipur": {
    summary:
      "Online Manipal treats placement as a term-long programme: readiness sessions first, alumni interaction next, then recruitment drives with its own partner companies.",
    stats: [{ label: "Hiring partners", value: "500+" }],
    recruiters: [
      "Capgemini",
      "Diageo",
      "Hexa Health",
      "Goldman Sachs",
      "HDFC Ergo",
      "Intellipaat",
      "Accenture",
      "IBM",
      "Deloitte",
      "LTIMindtree",
      "EY",
      "Allstate",
      "Infosys",
      "CarDekho",
      "Tata Communications",
      "Infinity Learn",
      "HP",
      "Bambino",
    ],
    support: [
      "Resume-building workshops led by HR practitioners",
      "Alumni interaction sessions that continue after graduation",
      "Industry-readiness training on recruiter expectations and workplace skills",
    ],
    approvals: [
      "UGC-entitled online degrees",
      "NAAC A+",
      "AICTE-approved professional programmes",
      "WES recognition",
      "NBA",
      "AIU",
    ],
    sourceNote: "Manually researched — source: Online Manipal placement & approvals document.",
  },
  "nmims-online": {
    summary:
      "NMIMS keeps individual salary data confidential, so the honest picture is a published band rather than a headline number, backed by profile-development services and a recruiter marketplace with six months of access.",
    stats: [
      { label: "Hiring partners", value: "500+" },
      {
        label: "Online MBA package band",
        value: "INR 3.5–6 LPA, higher packages up to about INR 9 LPA",
      },
    ],
    recruiters: [
      "Medikabazaar",
      "Wockhardt",
      "ReachLocal",
      "Brimstone Creative",
      "Vaya",
      "Milk Basket",
      "Vivo India",
      "Bajaj Electricals",
      "HSBC",
      "Essel Packaging",
      "Shubham",
      "Max Stack Labs",
    ],
    support: [
      "Profile-development service for professional and job-platform presence",
      "Six-month access to the recruiter portal for search, apply and interview",
    ],
    approvals: ["UGC-DEB", "NAAC A++"],
    sourceNote: "Manually researched — source: NMIMS Online placement & approvals document.",
  },
  "jain-online": {
    summary:
      "JAIN runs one of the widest recruiter networks in this comparison set, and its student career advisory team is the reason the company count has grown year on year.",
    stats: [
      { label: "Recruiters on record", value: "2,000+" },
      { label: "Reported salary range", value: "INR 8.0–25.0 LPA" },
      { label: "Average secured (reported)", value: "INR 10.80 LPA" },
    ],
    recruiters: [
      "Accenture",
      "Nestlé",
      "Bosch",
      "Oracle",
      "Cognizant",
      "PwC",
      "Dell India",
      "Quess Corp",
      "EY",
      "Reliance Industries",
      "Flipkart",
      "Samsung",
      "Grant Thornton India",
      "TCS",
      "HP",
      "UnitedHealth Group",
      "IBM",
      "Visa",
      "JP Morgan",
      "Wipro",
      "KPMG",
      "Xchanging",
      "Lenovo",
      "Yamaha",
      "MTR Foods",
      "Zomato",
    ],
    support: [
      "Student career advisory and placement support team",
      "Recruiter drives across IT, BFSI, FMCG and consulting",
    ],
    approvals: ["UGC and UGC-DEB entitlement", "AICTE", "NAAC A++", "NIRF ranked", "WES"],
    sourceNote: "Manually researched — source: JAIN Online placement & approvals document.",
  },
  "dpu-online": {
    summary:
      "DY Patil's online MBA reporting is role-led: instead of one average, it publishes the salary ranges attached to specific management roles its alumni move into.",
    stats: [
      { label: "Hiring partners", value: "300+" },
      { label: "Reported MBA package band", value: "INR 5.5–20 LPA" },
      { label: "Financial analyst range", value: "INR 10–26 LPA" },
      { label: "Sales manager range", value: "INR 8.8–27 LPA" },
    ],
    recruiters: ["TCS", "EY", "MRF", "Team Computers", "NoBroker", "Birlasoft", "Tata Motors"],
    support: [
      "Role-wise career mapping for management specialisations",
      "Recruiter tie-ups across IT, manufacturing and services",
    ],
    approvals: ["UGC-DEB entitled", "NAAC A++ (3.64 CGPA)", "AICTE", "AIU", "WES"],
    sourceNote: "Manually researched — source: DY Patil Online placement & approvals document.",
  },
  "shoolini-online": {
    summary:
      "Shoolini positions its online MBA around mentorship from senior industry practitioners, and its recruiter board leans towards consulting, BFSI and FMCG employers.",
    stats: [],
    recruiters: [
      "Accenture",
      "Deloitte",
      "Ericsson",
      "ICICI Bank",
      "KPMG",
      "Nestlé",
      "Mercer",
      "Adani",
      "L'Oréal",
      "Bank of America",
      "Genpact",
      "American Express",
      "Grant Thornton",
      "Hindustan Unilever",
      "The Oberoi Group",
      "Mankind Pharma",
      "Airtel",
      "Yes Bank",
    ],
    support: [
      "Programme mentoring by senior industry professionals",
      "Global alumni network access for current learners",
    ],
    approvals: ["UGC-DEB entitled online degrees"],
    sourceNote: "Manually researched — source: Shoolini Online approvals & placement document.",
  },
};

export function placementFacts(slug: string): PlacementFacts | undefined {
  return universityPlacementFacts[slug];
}
