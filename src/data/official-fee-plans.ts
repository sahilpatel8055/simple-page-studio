/**
 * Course-wise official fee plans, transcribed verbatim from the fee documents
 * supplied by the Degreekhojo fee desk for universities that publish an offer
 * structure (early-bird discount bands, pay-after-placement tracks).
 *
 * Nothing here is computed: every rupee figure below is exactly as published.
 */

export interface FeePlanOffer {
  /** Offer headline, e.g. "30% Early Bird Discount" or "Pay After Placement". */
  label: string;
  /** Published regular / list fee for the full programme. */
  regularFee: number;
  /** Fee actually payable after the discount or scholarship. */
  payableFee: number;
  /** Amount taken off the regular fee. */
  discountAmount?: number;
  /** e.g. "You save 30%". */
  savingLabel?: string;
  /** One-time (full payment) amount, when published separately. */
  oneTime?: number;
  perSemester?: number;
  perYear?: number;
  emiFrom?: number;
  /** Payment schedule line, e.g. "Per semester (32,500 x 4)". */
  schedule?: string;
  /** Amount payable before placement on a pay-after-placement track. */
  payableBeforePlacement?: string;
  /** Amount payable only after placement, or "Not applicable". */
  payAfterPlacement?: string;
  /** Marks the recommended / headline offer. */
  highlight?: boolean;
}

export interface CourseFeePlan {
  /** Programme slug in the master dataset, when the plan maps to one. */
  programmeSlug?: string;
  course: string;
  duration?: string;
  offers: FeePlanOffer[];
  note?: string;
}

export interface UniversityFeePlans {
  intro: string;
  source: string;
  verifiedOn: string;
  scholarshipNote?: string;
  courses: CourseFeePlan[];
}

const UU_SOURCE = "Uttaranchal University Online official fee sheet 2026-27";
const SHOOLINI_SOURCE = "Shoolini Online official programme fee pages 2026-27";

const uttaranchal: UniversityFeePlans = {
  intro:
    "Uttaranchal University Online publishes a normal fee and an early-bird discounted fee for every programme — 30% off on postgraduate programmes and 15% off on undergraduate programmes. The one-time, semester-wise, annual and EMI figures below are the amounts payable after the early-bird discount.",
  source: UU_SOURCE,
  verifiedOn: "2026-08-23",
  scholarshipNote:
    "The early-bird discount applies to admissions confirmed within the announced early-bird window of the 2026-27 session. EMI figures marked with * are the no-cost EMI plans offered through the university's finance partners.",
  courses: [
    {
      programmeSlug: "master-of-business-administration-mba",
      course: "Online MBA",
      duration: "2 years",
      offers: [
        {
          label: "30% Early Bird Discount",
          regularFee: 140000,
          payableFee: 98000,
          discountAmount: 42000,
          savingLabel: "You save 30%",
          oneTime: 94000,
          perSemester: 24500,
          perYear: 47000,
          emiFrom: 3956,
          highlight: true,
        },
      ],
    },
    {
      programmeSlug: "master-of-computer-applications-mca",
      course: "Online MCA",
      duration: "2 years",
      offers: [
        {
          label: "Early Bird Discount",
          regularFee: 120000,
          payableFee: 96000,
          discountAmount: 24000,
          savingLabel: "You save 20%",
          oneTime: 92000,
          perSemester: 24000,
          perYear: 46000,
          emiFrom: 3872,
          highlight: true,
        },
      ],
    },
    {
      programmeSlug: "bachelor-of-business-administration-bba",
      course: "Online BBA",
      duration: "3 years",
      offers: [
        {
          label: "15% Early Bird Discount",
          regularFee: 120000,
          payableFee: 102000,
          discountAmount: 18000,
          savingLabel: "You save 15%",
          oneTime: 96000,
          perSemester: 17000,
          perYear: 32000,
          emiFrom: 2693,
          highlight: true,
        },
      ],
    },
    {
      programmeSlug: "bachelor-of-computer-applications-bca",
      course: "Online BCA",
      duration: "3 years",
      offers: [
        {
          label: "15% Early Bird Discount",
          regularFee: 120000,
          payableFee: 102000,
          discountAmount: 18000,
          savingLabel: "You save 15%",
          oneTime: 96000,
          perSemester: 17000,
          perYear: 32000,
          emiFrom: 2693,
          highlight: true,
        },
      ],
    },
    {
      programmeSlug: "bachelor-of-arts-ba",
      course: "Online BA",
      duration: "3 years",
      offers: [
        {
          label: "15% Early Bird Discount",
          regularFee: 72000,
          payableFee: 61200,
          discountAmount: 10800,
          savingLabel: "You save 15%",
          oneTime: 55200,
          perSemester: 10200,
          perYear: 55200,
          emiFrom: 3097,
          highlight: true,
        },
      ],
    },
  ],
};

const MERIT_PG =
  "Special Merit Scholarship: an extra 10% scholarship if you scored more than 90% in your UG degree (for PG admission).";
const MERIT_UG =
  "Special Merit Scholarship: an extra 10% scholarship if you scored more than 90% in Class 12 (for UG admission).";

const shoolini: UniversityFeePlans = {
  intro:
    "Shoolini Online publishes two tracks for its flagship programmes — a Pay After Placement track, where a part of the fee is paid only after you are placed, and a standard track with a larger scholarship. Both tracks are shown below exactly as the university publishes them.",
  source: SHOOLINI_SOURCE,
  verifiedOn: "2026-08-23",
  scholarshipNote: "Application fee: ₹500 per programme.",
  courses: [
    {
      programmeSlug: "master-of-business-administration-mba",
      course: "Online MBA",
      duration: "2 years (4 semesters)",
      note: MERIT_PG,
      offers: [
        {
          label: "Offer 1 — MBA with Pay After Placement",
          regularFee: 200000,
          payableFee: 158000,
          discountAmount: 42000,
          savingLabel: "You save 21%",
          perSemester: 31600,
          payableBeforePlacement: "₹1,26,400 (₹31,600 × 4)",
          payAfterPlacement: "₹31,600 after placement",
          highlight: true,
        },
        {
          label: "Offer 2 — MBA without Pay After Placement",
          regularFee: 200000,
          payableFee: 130000,
          discountAmount: 70000,
          savingLabel: "You save 35%",
          perSemester: 32500,
          schedule: "Per semester (₹32,500 × 4)",
          payAfterPlacement: "Not applicable on this track",
        },
      ],
    },
    {
      programmeSlug: "master-of-computer-applications-mca",
      course: "Online MCA",
      duration: "2 years (4 semesters)",
      note: MERIT_PG,
      offers: [
        {
          label: "Offer 1 — MCA with Pay After Placement",
          regularFee: 200000,
          payableFee: 150000,
          discountAmount: 50000,
          savingLabel: "You save 25%",
          perSemester: 30000,
          payableBeforePlacement: "₹1,20,000 (₹30,000 × 4)",
          payAfterPlacement: "₹30,000 after placement",
          highlight: true,
        },
        {
          label: "Offer 2 — Standard MCA",
          regularFee: 200000,
          payableFee: 130000,
          discountAmount: 70000,
          savingLabel: "You save 35%",
          perSemester: 32500,
          schedule: "Per semester (₹32,500 × 4)",
          payAfterPlacement: "Not applicable on this track",
        },
      ],
    },
    {
      programmeSlug: "bachelor-of-computer-applications-bca",
      course: "Online BCA",
      duration: "3 years (6 semesters)",
      note: MERIT_UG,
      offers: [
        {
          label: "Offer 1 — BCA with Pay After Placement",
          regularFee: 135000,
          payableFee: 112500,
          discountAmount: 22500,
          savingLabel: "You save 17%",
          perSemester: 15000,
          payableBeforePlacement: "₹90,000 (₹15,000 × 6)",
          payAfterPlacement: "₹22,500 after placement",
          highlight: true,
        },
        {
          label: "Offer 2 — Standard BCA",
          regularFee: 135000,
          payableFee: 96000,
          discountAmount: 39000,
          savingLabel: "You save 29%",
          perSemester: 16000,
          schedule: "Per semester (₹16,000 × 6)",
          payAfterPlacement: "Not applicable on this track",
        },
      ],
    },
    {
      programmeSlug: "bachelor-of-business-administration-bba",
      course: "Online BBA",
      duration: "3 years (6 semesters)",
      note: MERIT_UG,
      offers: [
        {
          label: "Offer 1 — BBA with Pay After Placement",
          regularFee: 135000,
          payableFee: 112500,
          discountAmount: 22500,
          savingLabel: "You save 17%",
          perSemester: 15000,
          payableBeforePlacement: "₹90,000 (₹15,000 × 6)",
          payAfterPlacement: "₹22,500 after placement",
          highlight: true,
        },
        {
          label: "Offer 2 — Standard BBA",
          regularFee: 135000,
          payableFee: 96000,
          discountAmount: 39000,
          savingLabel: "You save 29%",
          perSemester: 16000,
          schedule: "Per semester (₹16,000 × 6)",
          payAfterPlacement: "Not applicable on this track",
        },
      ],
    },
    {
      programmeSlug: "bachelor-of-commerce-b-com",
      course: "Online B.Com",
      duration: "3 years (6 semesters)",
      note: MERIT_UG,
      offers: [
        {
          label: "Indian students — scholarship fee",
          regularFee: 120000,
          payableFee: 90000,
          discountAmount: 30000,
          savingLabel: "You save 25%",
          perSemester: 15000,
          schedule: "Per semester (₹15,000 × 6)",
          payAfterPlacement: "Not applicable on this programme",
          highlight: true,
        },
      ],
    },
    {
      programmeSlug: "master-of-arts-ma",
      course: "Online MA",
      duration: "2 years (4 semesters)",
      note: MERIT_PG,
      offers: [
        {
          label: "Indian students — scholarship fee",
          regularFee: 84000,
          payableFee: 60000,
          discountAmount: 24000,
          savingLabel: "You save 29%",
          perSemester: 15000,
          schedule: "Per semester (₹15,000 × 4)",
          payAfterPlacement: "Not applicable on this programme",
          highlight: true,
        },
        {
          label: "MA Journalism & Mass Communication",
          regularFee: 133333,
          payableFee: 80000,
          discountAmount: 53333,
          savingLabel: "You save 40%",
          perSemester: 20000,
          schedule: "Per semester (₹20,000 × 4)",
          payAfterPlacement: "Not applicable on this programme",
        },
      ],
    },
    {
      course: "Online M.Sc Data Science",
      duration: "2 years (4 semesters)",
      note: MERIT_PG,
      offers: [
        {
          label: "Indian students — scholarship fee",
          regularFee: 160000,
          payableFee: 120000,
          discountAmount: 40000,
          savingLabel: "You save 25%",
          perSemester: 30000,
          schedule: "Per semester (₹30,000 × 4)",
          payAfterPlacement: "Not applicable on this programme",
          highlight: true,
        },
      ],
    },
  ],
};

export const officialFeePlans: Record<string, UniversityFeePlans> = {
  "uttaranchal-online": uttaranchal,
  "shoolini-online": shoolini,
};

/** Full published fee-plan set for a university, when one is documented. */
export function feePlansFor(universitySlug: string): UniversityFeePlans | undefined {
  return officialFeePlans[universitySlug];
}

/** Published fee plan for one university × programme, when documented. */
export function coursePlanFor(
  universitySlug: string,
  programmeSlug: string,
): CourseFeePlan | undefined {
  return officialFeePlans[universitySlug]?.courses.find((c) => c.programmeSlug === programmeSlug);
}
