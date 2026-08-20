/**
 * Single source of truth for company / trust facts shown on About, Counsellors,
 * How-we-work, legal pages and in Organization structured data.
 *
 * Production values only. Nothing here should state a certification or
 * compliance claim that the business cannot evidence.
 */

export const company = {
  brand: "DegreeKhojo",
  alternateNames: ["Degree Khojo", "DegreeKhojo.com", "Degreekhojo"],
  legalName: "DegreeKhojo",
  domain: "degreekhojo.com",
  url: "https://degreekhojo.com",
  tagline: "India's online & distance education knowledge platform",
  foundedYear: "2021",
  registeredOffice: {
    line1: "Office No. 12, 2nd Floor",
    line2: "Sector 62",
    city: "Noida",
    state: "Uttar Pradesh",
    postalCode: "201301",
    country: "IN",
    countryName: "India",
  },

  contact: {
    email: "support@degreekhojo.com",
    editorial: "editor@degreekhojo.com",
    grievance: "grievance@degreekhojo.com",
    phone: "+91 87700 12496",
    hours: "Mon–Sat, 10:00 AM – 7:00 PM IST",
  },
  socials: [
    "https://www.linkedin.com/company/degreekhojo",
    "https://www.instagram.com/degreekhojo",
    "https://www.youtube.com/@degreekhojo",
    "https://twitter.com/degreekhojo",
  ],
} as const;

export const registeredOfficeLine = [
  company.registeredOffice.line1,
  company.registeredOffice.line2,
  `${company.registeredOffice.city} ${company.registeredOffice.postalCode}`,
  `${company.registeredOffice.state}, ${company.registeredOffice.countryName}`,
].join(", ");

/** Independence / transparency positioning shown on trust surfaces. */
export const trustPledges = [
  {
    title: "Universities do not pay us for rankings",
    body: "No university can buy a position, a rating or a recommendation. Comparison order is decided by the dataset — approvals, fee, delivery model and published outcomes — not by commercial relationships.",
  },
  {
    title: "We tell you when we earn",
    body: "Some universities pay a referral fee when a learner we counselled enrols. That fee never changes what we publish, and it never changes the fee you pay the university.",
  },
  {
    title: "Every fee is traced to an official source",
    body: "Fee, eligibility and approval figures are taken from the university's own published page or the UGC-DEB entitlement list, and re-checked each admission cycle.",
  },
  {
    title: "Reviews come from enrolled learners only",
    body: "A review is published only after we can trace it to an enrolment ID, fee receipt or LMS screenshot. Unverifiable submissions are rejected, including positive ones.",
  },
  {
    title: "We say 'don't enrol' when that is the answer",
    body: "If a programme is not entitled for online mode, or a learner's goal needs a regular degree, our counsellors say so on the call and it is recorded on the lead.",
  },
] as const;

/** How a published review is verified — shown on /reviews and /how-we-work. */
export const reviewVerificationSteps = [
  "Learner submits the review with the university, programme and batch.",
  "We ask for one proof of enrolment: enrolment ID, fee receipt or an LMS dashboard screenshot.",
  "Personal details are removed; the reviewer is published with first name and last initial only.",
  "The review is matched against the programme record so it appears on the right university page.",
  "Reviews are re-confirmed every session; anything we cannot re-verify is unpublished.",
] as const;
