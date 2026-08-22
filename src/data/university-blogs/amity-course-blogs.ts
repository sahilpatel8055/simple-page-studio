/**
 * Amity Online course blog blueprint — one shared structure, six programmes.
 *
 * Content is lifted from the Degreekhojo Amity deep-master source files
 * (MBA, MCA, M.Com, BBA, BCA, B.Com). Every post follows the same heading
 * order so the reading experience is identical on mobile:
 *
 *   Admission 2026 → Eligibility (Indian + foreign) → Documents →
 *   Fee structure → EMI / scholarship handling → Learning experience →
 *   Career options → Salary (safe wording) → Skills required →
 *   Higher studies → Placement-support distinction → FAQs
 *
 * Fees, EMI and salary figures are reproduced as *supplied source figures*
 * with an explicit verification note — never as guarantees.
 */

import type { PostBlock, PostContent, PostSection } from "@/data/posts";
import type { Article } from "@/lib/content";

const base = { reviewer: "Kartik Ahuja", reviewerRole: "Education Research Lead, Degreekhojo" };
const UPDATED = "2026-08-16";

const VERIFY_NOTE =
  "Fee cards, EMI plans and scholarship offers change by intake and payment mode. Treat the figures below as the supplied source values and confirm the live India-specific amount on the official Amity Online admission flow before you pay.";

interface AmityBlogConfig {
  slug: string;
  title: string;
  seoExcerpt: string;
  category: string;
  categorySlug: string;
  tags: string[];
  readingTime: string;
  banner: string;
  /** Programme label used across headings, e.g. "Amity Online MBA". */
  name: string;
  short: string;
  intro: string;
  keyTakeaways: string[];
  overview: string[][];
  curriculum?: { caption: string; rows: string[][]; note?: string };
  specialisations?: { intro: string; head: string[]; rows: string[][] };
  admissionIntro: string;
  admissionSteps: string[];
  eligibilityIntro: string;
  eligibilityRows: string[][];
  documents: string[];
  feeIntro: string;
  feeRows: string[][];
  emi: string[];
  learning: string[];
  careerHead: string[];
  careerRows: string[][];
  salary: string[];
  skills: string[];
  higherStudies: string[];
  placement: string[];
  comparison?: { head: string[]; rows: string[][] };
  faqs: { question: string; answer: string }[];
  related: { label: string; href: string }[];
  sources: { label: string; href: string }[];
}

const enquiryCta = (name: string): PostBlock => ({
  kind: "cta",
  title: `Confirm the live ${name} fee before you pay`,
  body: "Share your details and an unbiased Degreekhojo counsellor will send the current fee sheet, EMI plan and scholarship eligibility for your intake — no spam, no pressure.",
  buttonLabel: "Get the 2026 fee sheet",
});

const promoBanner = (name: string): PostBlock => ({
  kind: "promo",
  title: `Free 1-1 counselling for ${name} 2026`,
  body: "Compare Amity against every other UGC-entitled online university on fees, curriculum and career support before you commit.",
  ctaLabel: "Book a free session",
  href: "/counselling",
});

function buildSections(c: AmityBlogConfig): PostSection[] {
  const sections: PostSection[] = [];

  sections.push({
    heading: `${c.name} at a glance`,
    blocks: [
      {
        kind: "table",
        caption: `${c.name} 2026 — key programme facts`,
        head: ["Parameter", "Details"],
        rows: c.overview,
      },
      {
        kind: "note",
        text: "Every figure on this page is a researched snapshot with a visible Last Updated date. Where Amity has not published a value, we say so instead of estimating it.",
      },
    ],
  });

  sections.push({
    heading: "Admission 2026",
    blocks: [
      { kind: "p", text: c.admissionIntro },
      { kind: "list", ordered: true, items: c.admissionSteps },
      promoBanner(c.name),
    ],
  });

  sections.push({
    heading: "Eligibility for Indian + foreign students",
    blocks: [
      { kind: "p", text: c.eligibilityIntro },
      {
        kind: "table",
        caption: `${c.short} eligibility by applicant type`,
        head: ["Applicant", "Requirement"],
        rows: c.eligibilityRows,
      },
    ],
  });

  sections.push({
    heading: "Documents",
    blocks: [
      {
        kind: "p",
        text: "Keep clear scans ready before you start the application — an incomplete upload is the most common reason an online admission stalls.",
      },
      { kind: "list", items: c.documents },
    ],
  });

  sections.push({
    heading: "Fee structure",
    blocks: [
      { kind: "p", text: c.feeIntro },
      {
        kind: "table",
        caption: `${c.name} fee items (supplied source figures)`,
        head: ["Fee item", "Supplied source figure", "How we publish it"],
        rows: c.feeRows,
      },
      { kind: "note", text: VERIFY_NOTE },
      enquiryCta(c.name),
    ],
  });

  sections.push({
    heading: "EMI / scholarship handling",
    blocks: [
      { kind: "list", items: c.emi },
      {
        kind: "note",
        text: "A scholarship or discount is only real when it appears on your own fee receipt. Ask for the applied amount in writing before the first instalment.",
      },
    ],
  });

  if (c.curriculum) {
    sections.push({
      heading: "Semester-wise curriculum",
      blocks: [
        {
          kind: "table",
          caption: c.curriculum.caption,
          head: ["Semester", "Subjects"],
          rows: c.curriculum.rows,
        },
        ...(c.curriculum.note ? [{ kind: "note", text: c.curriculum.note } as PostBlock] : []),
      ],
    });
  }

  if (c.specialisations) {
    sections.push({
      heading: "Specialisations & decision guide",
      blocks: [
        { kind: "p", text: c.specialisations.intro },
        {
          kind: "table",
          caption: `${c.short} specialisation routes`,
          head: c.specialisations.head,
          rows: c.specialisations.rows,
        },
      ],
    });
  }

  sections.push({
    heading: "Learning experience",
    blocks: [{ kind: "list", items: c.learning }],
  });

  sections.push({
    heading: "Career options",
    blocks: [
      {
        kind: "table",
        caption: `Where ${c.short} graduates typically start`,
        head: c.careerHead,
        rows: c.careerRows,
      },
      promoBanner(c.name),
    ],
  });

  sections.push({
    heading: "Salary expectations",
    blocks: [
      ...c.salary.map((text) => ({ kind: "p", text }) as PostBlock),
      {
        kind: "note",
        text: "These are indicative market ranges, not an Amity placement promise. Actual pay depends on city, employer, role, prior experience, skills and interview performance.",
      },
    ],
  });

  sections.push({
    heading: "Skills required",
    blocks: [
      {
        kind: "p",
        text: "The degree opens the door; these skills decide the offer. Build them in parallel with the semesters rather than after graduation.",
      },
      { kind: "list", items: c.skills },
    ],
  });

  sections.push({
    heading: "Higher studies",
    blocks: [{ kind: "list", items: c.higherStudies }],
  });

  sections.push({
    heading: "Placement support vs placement guarantee",
    blocks: [
      ...c.placement.map((text) => ({ kind: "p", text }) as PostBlock),
      {
        kind: "note",
        text: "Career support, resume help, job fairs and counselling are services. Unless the university issues a written, programme-specific guarantee, no online degree in India guarantees a job or a salary.",
      },
    ],
  });

  if (c.comparison) {
    sections.push({
      heading: `Online ${c.short} vs campus ${c.short}`,
      blocks: [
        {
          kind: "table",
          caption: "Decision factors side by side",
          head: c.comparison.head,
          rows: c.comparison.rows,
        },
      ],
    });
  }

  sections.push({
    heading: "Related guides",
    blocks: [
      { kind: "links", title: "Continue your research", items: c.related },
      enquiryCta(c.name),
    ],
  });

  return sections;
}

function buildArticle(c: AmityBlogConfig): Article {
  return {
    slug: c.slug,
    title: c.title,
    excerpt: c.seoExcerpt,
    category: c.category,
    categorySlug: c.categorySlug,
    tags: c.tags,
    author: "Kartik Ahuja",
    authorSlug: "kartik-ahuja",
    date: UPDATED,
    readingTime: c.readingTime,
    kind: "blog",
  };
}

function buildPost(c: AmityBlogConfig): PostContent {
  return {
    ...base,
    updated: UPDATED,
    banner: c.banner,
    intro: c.intro,
    keyTakeaways: c.keyTakeaways,
    sections: buildSections(c),
    faqs: c.faqs,
    sources: c.sources,
    related: c.related,
  };
}

/* -------------------------------------------------------------------------- */
/* Programme configurations                                                    */
/* -------------------------------------------------------------------------- */

const AMITY_SOURCES: Record<string, { label: string; href: string }[]> = {
  mba: [
    {
      label: "Amity Online MBA programme page",
      href: "https://amityonline.com/master-of-business-administration-online",
    },
    { label: "UGC DEB recognised online programmes", href: "https://deb.ugc.ac.in/" },
  ],
  mca: [
    {
      label: "Amity Online MCA programme page",
      href: "https://amityonline.com/master-of-computer-applications-online",
    },
    { label: "UGC DEB recognised online programmes", href: "https://deb.ugc.ac.in/" },
  ],
  mcom: [
    {
      label: "Amity Online M.Com programme page",
      href: "https://amityonline.com/master-of-commerce-online",
    },
    { label: "UGC DEB recognised online programmes", href: "https://deb.ugc.ac.in/" },
  ],
  bba: [
    {
      label: "Amity Online BBA programme page",
      href: "https://amityonline.com/bachelor-of-business-administration-online",
    },
    { label: "UGC DEB recognised online programmes", href: "https://deb.ugc.ac.in/" },
  ],
  bca: [
    {
      label: "Amity Online BCA programme page",
      href: "https://amityonline.com/bachelor-of-computer-applications-online",
    },
    { label: "UGC DEB recognised online programmes", href: "https://deb.ugc.ac.in/" },
  ],
  bcom: [
    {
      label: "Amity Online B.Com programme page",
      href: "https://amityonline.com/bachelor-of-commerce-online",
    },
    { label: "UGC DEB recognised online programmes", href: "https://deb.ugc.ac.in/" },
  ],
};

const COMMON_LEARNING = [
  "Live online classes supported by recorded sessions you can revisit around work hours.",
  "Digital study material and e-books through the university LMS instead of printed classroom notes only.",
  "Continuous assessment through assignments and projects alongside end-of-semester examinations.",
  "Career services described as resume assistance, virtual job fairs, job-search guidance and one-to-one counselling.",
  "Self-discipline matters more than in a campus programme — block fixed weekly study hours before you enrol.",
];

const FOREIGN_ROW = [
  "Foreign / NRI student",
  "Equivalent secondary or graduate qualification (O Level + A Level or equivalent), with AIU equivalence where required, plus English-language readiness",
];

const configs: AmityBlogConfig[] = [
  /* ------------------------------- MBA -------------------------------- */
  {
    slug: "amity-online-mba-2026-fees-eligibility-careers",
    title: "Amity Online MBA 2026: Fees, Eligibility, Syllabus & Careers",
    seoExcerpt:
      "Amity Online MBA 2026 guide — admission steps, eligibility for Indian and foreign students, documents, fee structure, EMI, curriculum, 14 specialisations, careers and salary context.",
    category: "Study Guides",
    categorySlug: "study-guides",
    tags: ["amity online mba", "amity mba fees", "online mba 2026", "amity mba eligibility"],
    readingTime: "16 min",
    banner: "online-mba",
    name: "Amity Online MBA",
    short: "MBA",
    intro:
      "Amity University Online's MBA is a two-year, four-semester postgraduate management programme built for graduates, working professionals and entrepreneurs who need a flexible online format. The current official programme information states graduation in any discipline with at least 40% marks for Indian students; candidates below 40% may have an admission-test route, and English proficiency is required. The programme combines management fundamentals, specialisation electives and minor/major project work.",
    keyTakeaways: [
      "Two years, four semesters — core management subjects, specialisation electives and a minor plus major project.",
      "Eligibility: graduation in any discipline, 40% minimum for Indian students; a test route may apply below 40%.",
      "Fourteen specialisation routes are currently listed, from Business Analytics to Construction Project Management.",
      "The official page shows USD pricing while Indian listings vary — always confirm the India-specific payable amount.",
      "Amity advertises placement assistance and AI-powered career support; that is support, not a job guarantee.",
    ],
    overview: [
      ["Programme", "Master of Business Administration (MBA)"],
      ["Mode", "Online"],
      ["Duration", "2 years / 4 semesters"],
      [
        "Eligibility",
        "Graduation in any discipline; official page states 40% minimum for Indian students, with a test route below 40%",
      ],
      ["Structure", "Core subjects + specialisation electives + minor and major project"],
      [
        "Career support",
        "Placement assistance and AI-powered career support — not a guaranteed job",
      ],
    ],
    curriculum: {
      caption: "Amity Online MBA semester-wise subjects",
      rows: [
        [
          "Semester 1",
          "Accounting for Managers; Managerial Economics; Marketing Management; Statistics for Management; Professional Communication",
        ],
        [
          "Semester 2",
          "Business Research Methods; Financial Management; Human Resource Management; Legal Aspects of Business; Conflict Resolution and Management",
        ],
        [
          "Semester 3",
          "Strategic Management; Minor Project; Professional Ethics; Specialisation electives",
        ],
        [
          "Semester 4",
          "Major Project; Management in Action — Social, Economic and Ethical Issues; Digital Marketing; Specialisation electives",
        ],
      ],
      note: "Treat this as a curriculum snapshot. Confirm the current structure for your specialisation on the official programme page before enrolling.",
    },
    specialisations: {
      intro:
        "Fourteen routes are currently listed: Business Analytics, Data Science, Digital Marketing Management, Entrepreneurship and Leadership Management, Finance and Accounting Management, Human Resource Management, Information Technology Management, International Business Management, International Finance (ACCA), Marketing & Sales Management, Production and Operations Management, Hospital and Healthcare Management, Construction Project Management and General Management.",
      head: ["Route", "Best aligned interests", "Career direction"],
      rows: [
        [
          "Finance & Accounting",
          "Finance, accounting, analysis",
          "Finance / accounting / FP&A pathways",
        ],
        [
          "Marketing & Sales",
          "Brand, sales, customer growth",
          "Marketing, sales, business development",
        ],
        ["Human Resource Management", "Talent, people, organisation", "HR and talent roles"],
        ["Business Analytics", "Data-led decisions", "Business analyst / analytics"],
        [
          "Data Science",
          "Statistics, coding, modelling",
          "Data / AI pathway; technical practice required",
        ],
        ["Digital Marketing", "Performance, social, search", "Digital and growth marketing"],
        ["Operations", "Processes, efficiency", "Operations / process roles"],
        ["IT Management", "Business plus technology", "IT and business-technology coordination"],
        ["International Business", "Global markets", "International business and trade"],
        ["Healthcare Management", "Healthcare operations", "Hospital / healthcare administration"],
        ["Construction Project Management", "Project delivery", "Construction project roles"],
      ],
    },
    admissionIntro:
      "Admission runs entirely through Amity's online portal. There is no campus visit; the practical work is choosing the right specialisation route and verifying eligibility before you pay.",
    admissionSteps: [
      "Select the MBA route and verify the current eligibility wording for your intake.",
      "Register on Amity's online admission portal with a valid mobile number and email.",
      "Complete personal and academic information exactly as it appears on your documents.",
      "Upload the requested documents in the specified format.",
      "Complete any required admission test or verification step (relevant if your graduation percentage is below 40%).",
      "Pay the applicable amount using the payment method shown on the portal.",
      "Receive enrolment and LMS details — save every receipt and the application reference.",
    ],
    eligibilityIntro:
      "The current official page states graduation in any discipline with a 40% minimum for Indian students. Applicants below that threshold may be routed through an admission test. Foreign applicants need equivalence documentation.",
    eligibilityRows: [
      [
        "Indian graduate",
        "Bachelor's degree in any discipline; official page states 40% minimum marks",
      ],
      [
        "Below 40% marks",
        "Admission-test route may apply — confirm the current test requirement for your intake",
      ],
      FOREIGN_ROW,
      ["Working professional", "No separate category; standard academic eligibility applies"],
    ],
    documents: [
      "Class 10 certificate / marksheet",
      "Class 12 certificate / marksheet",
      "Graduation degree and consolidated marksheets",
      "Government-issued identity proof",
      "Recent passport-size photograph",
      "Foreign-education equivalence documents (AIU) where applicable",
      "Payment confirmation and application reference number",
    ],
    feeIntro:
      "The fetched official Amity page currently displays USD pricing, while Indian third-party sources report INR structures that vary by route and cycle. Those values must never be merged. Degreekhojo publishes the manually researched India-specific payable amount with the research date attached.",
    feeRows: [
      [
        "Programme fee",
        "Varies by specialisation route (general vs ACCA / dual)",
        "Published only after the India-specific fee sheet is verified",
      ],
      ["Semester fee", "Route-dependent", "Recorded per semester with a Last Updated stamp"],
      [
        "Registration / examination charges",
        "Not separately published on the fetched page",
        "Shown as 'shared by the university' rather than estimated",
      ],
      [
        "EMI",
        "Offered on the admission flow",
        "Displayed only with current tenure and interest terms confirmed",
      ],
    ],
    emi: [
      "Amity's admission flow offers instalment plans; the tenure and per-month amount depend on the route and the intake, so ask for the plan in writing.",
      "A 'zero-cost' EMI still needs a written confirmation that no processing fee or interest is added by the lender.",
      "Scholarships and discounts are eligibility-based — defence, merit and early-bird schemes change every cycle.",
      "Compare the post-discount total payable, not the headline sticker fee, when you weigh Amity against another university.",
      "Confirm the refund and withdrawal policy before paying the first instalment.",
    ],
    learning: [
      "Digital learning with live and recorded sessions plus AI-enabled study support.",
      "Interactive practice, case discussions and management simulations through the LMS.",
      "A minor project in semester 3 and a major project in semester 4 convert theory into portfolio evidence.",
      "Specialisation electives run alongside core subjects from semester 3 onward.",
      "Career services are described as placement assistance rather than guaranteed employment.",
    ],
    careerHead: ["Career direction", "What the role commonly involves"],
    careerRows: [
      ["Management trainee", "Rotational exposure across business functions"],
      ["Business analyst", "Requirement gathering, reporting and data-led recommendations"],
      ["Marketing / sales", "Campaigns, customer acquisition, revenue targets"],
      ["Financial analyst", "Financial analysis, reporting and decision support"],
      ["HR roles", "Recruitment, HR operations and employee engagement"],
      ["Operations", "Process coordination, service delivery and efficiency"],
      ["Project management", "Scope, timelines, stakeholders and delivery"],
      ["Product management pathway", "Customer problems, roadmap and cross-team coordination"],
      ["Strategy / consulting pathway", "Structured problem solving and business analysis"],
      ["Entrepreneurship", "Applying management fundamentals to your own venture"],
    ],
    salary: [
      "Amity does not publish a verified programme-specific salary table for its online MBA, so this guide does not invent one. What we can say honestly is that an online MBA typically shifts your pay through the role you move into, not through the degree alone.",
      "Post-MBA compensation in India is driven by your prior work experience, the specialisation you chose, the city you work in and your interview performance. A candidate with four years of sales experience and a Marketing specialisation negotiates very differently from a fresher.",
    ],
    skills: [
      "Advanced Excel and financial modelling",
      "Business communication and presentation",
      "Data interpretation and dashboarding (Power BI or Tableau basics)",
      "Domain tools for your specialisation — CRM, performance marketing, SQL or ERP",
      "Structured problem solving and case practice",
      "Stakeholder management and negotiation",
      "A LinkedIn profile and network built during, not after, the programme",
    ],
    higherStudies: [
      "Doctoral or DBA routes for candidates aiming at research or teaching.",
      "Professional certifications aligned to the specialisation — CFA, PMP, digital marketing or analytics credentials.",
      "Executive short programmes from IIMs and other institutes to add campus-network exposure.",
      "Competitive examinations where a postgraduate degree is the eligibility criterion.",
    ],
    placement: [
      "Amity advertises placement assistance and AI-powered career support for online learners. That covers virtual job fairs, resume support, job-search guidance and counselling.",
      "Assistance is not employment. Outcomes depend on your skills, experience, role fit, location and interview performance — and eligibility rules for career services vary, so ask exactly who qualifies.",
    ],
    comparison: {
      head: ["Factor", "Online MBA", "Regular campus MBA"],
      rows: [
        ["Flexibility", "High", "Usually lower"],
        ["Location", "Remote", "Campus"],
        ["Working while studying", "More feasible", "Often harder"],
        ["Networking", "Digital and alumni", "In-person plus alumni"],
        ["Best fit", "Flexible learners", "Campus-immersion seekers"],
      ],
    },
    faqs: [
      {
        question: "Is the Amity Online MBA valid?",
        answer:
          "Amity Online presents the MBA as a UGC-entitled online degree. Validity should always be checked against the current entitlement for the exact programme and admission session on the UGC DEB portal, not against a generic claim.",
      },
      {
        question: "What is the duration of the Amity Online MBA?",
        answer: "Two years, delivered across four semesters.",
      },
      {
        question: "What is the eligibility?",
        answer:
          "Graduation in any discipline. The current official page states a 40% minimum for Indian students, and applicants below 40% may need to clear an admission test.",
      },
      {
        question: "Does it have specialisations?",
        answer:
          "Yes — fourteen routes are currently listed, including Business Analytics, Data Science, Finance and Accounting Management, HR, Marketing & Sales and International Finance (ACCA). Use only the current official list when you apply.",
      },
      {
        question: "Is placement guaranteed?",
        answer:
          "No. Amity provides placement assistance and career support. No online MBA in India guarantees a job or a salary.",
      },
      {
        question: "Can working professionals pursue it?",
        answer:
          "Yes. The online format is built for it, subject to managing the weekly study workload alongside your job.",
      },
    ],
    related: [
      {
        label: "Amity Online courses & fees 2026-27",
        href: "/blogs/amity-online-courses-fees-2026-27",
      },
      {
        label: "Amity Online MCA 2026 guide",
        href: "/blogs/amity-online-mca-2026-fees-eligibility-careers",
      },
      { label: "Compare every Online MBA university", href: "/compare/online-mba" },
      { label: "Online MBA course hub", href: "/courses/online-mba" },
      { label: "Book free counselling", href: "/counselling" },
    ],
    sources: AMITY_SOURCES["mba"]!,
  },

  /* ------------------------------- MCA -------------------------------- */
  {
    slug: "amity-online-mca-2026-fees-eligibility-careers",
    title: "Amity Online MCA 2026: Fees, Eligibility, Syllabus & Careers",
    seoExcerpt:
      "Amity Online MCA 2026 guide — admission process, bridge-course eligibility, documents, ₹49,800 per semester fee reference, syllabus, specialisation routes, careers and skills.",
    category: "Study Guides",
    categorySlug: "study-guides",
    tags: ["amity online mca", "amity mca fees", "online mca 2026", "mca bridge course"],
    readingTime: "15 min",
    banner: "online-mca",
    name: "Amity Online MCA",
    short: "MCA",
    intro:
      "Amity University Online's MCA is a two-year postgraduate technology programme for learners who want advanced knowledge in computer applications, software development and related technology domains through online study. The current official information accepts BCA and equivalent graduates, specified science, commerce and arts graduates with Mathematics at 10+2, and computer science or engineering graduates. Students without the required mathematics background may apply through the prescribed bridge-course route.",
    keyTakeaways: [
      "Two years, four semesters, fully online, with four specialisation routes.",
      "Non-BCA graduates are accepted; a mathematics condition applies and a bridge course exists for those without it.",
      "Supplied research references ₹49,800 per semester — verify the live India fee before paying.",
      "The syllabus covers Core Java, Advanced DBMS, DSA, Network Security, Cloud, Blockchain and AR/VR.",
      "Career support is assistance, never a guaranteed placement.",
    ],
    overview: [
      ["Programme", "Master of Computer Applications (MCA)"],
      ["Mode", "Online"],
      ["Duration", "2 years / 4 semesters"],
      [
        "Eligibility",
        "BCA or equivalent, or other accepted bachelor's routes; mathematics condition applies to specified routes",
      ],
      [
        "Bridge route",
        "Available for students without Mathematics at 10+2 or graduation, subject to qualifying the bridge course",
      ],
      [
        "Fee reference",
        "₹49,800 per semester in supplied research — verify the final current payable amount",
      ],
      ["Career support", "Assistance and support; never presented as guaranteed employment"],
    ],
    curriculum: {
      caption: "Amity Online MCA semester-wise syllabus",
      rows: [
        [
          "Semester 1",
          "Professional Communication; Core Java; Advanced DBMS; Advanced Software Engineering Principles; Graph Theory and Combinatorics",
        ],
        [
          "Semester 2",
          "Research Methodology; Data Structures and Algorithm Design; Cognitive Analytics and Social Skills for Professionals; Network Security and Cryptography",
        ],
        [
          "Semester 3",
          "Unix/Linux Programming; Seminar; Cloud Infrastructure and Services; Quantitative Aptitude; Professional Ethics",
        ],
        [
          "Semester 4",
          "Augmented Reality and Virtual Reality; Blockchain Technology and Management (Business); Blockchain Technology and Management (Technical Development); Electives; Machine Learning / ML & AI where applicable",
        ],
      ],
      note: "Specialisation subjects differ from the general MCA track. Do not assume a specialisation syllabus applies unless you have selected that route.",
    },
    specialisations: {
      intro: "Four specialisation routes are currently promoted alongside the general MCA.",
      head: ["Route", "Focus", "Potential direction"],
      rows: [
        [
          "Cyber Security",
          "Security, cryptography, risk",
          "Security analyst, SOC and security-engineering pathway",
        ],
        [
          "Software Engineering",
          "Software design, development, testing",
          "Software and application developer",
        ],
        [
          "Machine Learning & AI",
          "Models, data, intelligent systems",
          "ML, data and AI roles — strong maths and coding needed",
        ],
        [
          "FinTech & AI",
          "Digital finance plus technology",
          "FinTech analyst, product, data and technology roles",
        ],
      ],
    },
    admissionIntro:
      "The MCA admission flow adds one step most programmes do not have: the mathematics and bridge-course check. Settle that before you pay anything.",
    admissionSteps: [
      "Select the general MCA or a specialisation route.",
      "Verify the mathematics requirement and whether the bridge course applies to you.",
      "Register online on the Amity admission portal.",
      "Complete academic and personal details.",
      "Upload the requested documents.",
      "Complete any required bridge-course or test process.",
      "Pay the applicable amount.",
      "Receive enrolment and LMS details, and retain receipts.",
    ],
    eligibilityIntro:
      "Amity accepts several entry routes into the MCA. The deciding factor for non-BCA graduates is whether Mathematics was studied at 10+2 or graduation level.",
    eligibilityRows: [
      ["BCA or equivalent graduate", "Accepted directly under the current route rules"],
      ["Science / commerce / arts graduate", "Accepted where Mathematics was studied at 10+2"],
      ["Computer science or engineering graduate", "Accepted under the current route rules"],
      ["Applicant without Mathematics", "Prescribed bridge-course route, subject to qualifying it"],
      FOREIGN_ROW,
    ],
    documents: [
      "Class 10 certificate / marksheet",
      "Class 12 certificate / marksheet (mathematics evidence where the route requires it)",
      "Graduation degree and consolidated marksheets",
      "Government-issued identity proof",
      "Recent passport-size photograph",
      "Bridge-course confirmation where applicable",
      "Foreign-education equivalence documents (AIU) where applicable",
    ],
    feeIntro:
      "The supplied MCA research states ₹49,800 per semester, and current third-party 2026 listings also report this figure. Even with two sources agreeing, verify the active India-specific fee sheet at checkout before you commit.",
    feeRows: [
      [
        "Per semester",
        "₹49,800 (supplied research)",
        "Cross-checked against the live India fee before publication",
      ],
      [
        "Full programme",
        "Four semesters at the verified semester fee",
        "Total published only after the fee sheet is confirmed",
      ],
      [
        "Scholarship / discount",
        "Offered, eligibility-based",
        "Recorded per scheme with the applicable conditions",
      ],
      [
        "EMI",
        "Offered on the admission flow",
        "Published with tenure and interest terms confirmed",
      ],
      [
        "Additional charges",
        "Not separately published",
        "Shown as 'shared by the university' rather than estimated",
      ],
    ],
    emi: [
      "Ask for the instalment schedule in writing — number of instalments, per-month amount and whether any processing fee applies.",
      "If a bridge course is required, confirm whether its cost sits inside or outside the programme fee.",
      "Scholarship categories change per cycle; get the applied amount reflected on your own fee receipt.",
      "Compare the total four-semester payable against other UGC-entitled MCA providers before deciding.",
    ],
    learning: [
      "AI-powered learning tools with live and recorded sessions.",
      "Industry-linked specialisation development and real-world project work.",
      "Practical exposure through coding projects, database work, cloud exercises and security scenarios.",
      "A seminar in semester 3 and elective plus project work in semester 4.",
      "Portfolio evidence — code repositories, deployed applications, documentation — matters more than marks in tech hiring.",
    ],
    careerHead: ["Role", "Core work"],
    careerRows: [
      [
        "Software developer / engineer",
        "Programming, debugging, application development, version control",
      ],
      ["Web developer", "Frontend and backend development, APIs, databases, deployment"],
      ["Application developer", "Building and maintaining business applications"],
      ["Database administrator", "Database management, queries, backups, performance"],
      ["Systems analyst", "Requirements, systems design and process improvement"],
      ["IT consultant", "Advisory on technology selection and implementation"],
      ["Cybersecurity analyst", "Security monitoring, vulnerability awareness, incident support"],
      ["Cloud / cloud support", "Cloud fundamentals, deployment, monitoring and troubleshooting"],
      ["Network administrator", "Networking, infrastructure and troubleshooting"],
      ["Mobile app developer", "Mobile application development and release"],
      ["Data / AI / ML roles", "Where the ML & AI specialisation route is taken"],
    ],
    salary: [
      "There is no reliable, current, programme-specific Amity MCA salary table, so this guide does not publish one. Technology pay in India is set by demonstrated ability far more than by the degree certificate.",
      "Two MCA graduates from the same cohort routinely land very different offers: the difference is usually the portfolio, the depth in one programming language, data-structures preparation and interview practice.",
    ],
    skills: [
      "Programming plus data structures and algorithms",
      "SQL and database design",
      "Git and version control",
      "Web and REST API development",
      "Cloud fundamentals",
      "Linux and networking basics",
      "Security fundamentals",
      "Python and statistics for AI or data roles",
      "Communication and technical interview practice",
      "Two to four strong portfolio projects",
    ],
    higherStudies: [
      "PhD or M.Tech routes for research and specialist engineering directions.",
      "Vendor certifications — AWS, Azure, Google Cloud, security or data credentials.",
      "Specialised analytics and AI programmes where the career goal justifies it.",
      "Competitive examinations where a postgraduate degree is the eligibility criterion.",
    ],
    placement: [
      "Amity's MCA pages promote career assistance, industry-linked projects and AI-powered support. That is genuine help with resumes, job fairs and job-search direction.",
      "It is not a placement guarantee. Describe it — and evaluate it — as assistance; the hiring decision sits with the employer and rests on your technical performance.",
    ],
    comparison: {
      head: ["Factor", "Online MCA", "Regular MCA"],
      rows: [
        ["Flexibility", "High", "Usually lower"],
        ["Location", "Remote", "Campus"],
        ["Work alongside the degree", "More feasible", "Often harder"],
        ["Networking", "Digital and alumni", "In-person plus alumni"],
        ["Best fit", "Flexible learners", "Campus-immersion seekers"],
      ],
    },
    faqs: [
      {
        question: "What is the duration of the Amity Online MCA?",
        answer: "Two years, across four semesters.",
      },
      {
        question: "What is the eligibility?",
        answer:
          "BCA or an equivalent degree, or other accepted bachelor's routes. A mathematics condition applies to specified non-BCA routes.",
      },
      {
        question: "Can non-BCA graduates apply?",
        answer:
          "Yes, subject to the current route rules — typically science, commerce or arts graduates with Mathematics at 10+2, or via the bridge course.",
      },
      {
        question: "Is there a bridge course?",
        answer:
          "Yes. Amity provides a bridge route for students who lack the required mathematics background, subject to qualifying it.",
      },
      {
        question: "What is the Amity Online MCA fee?",
        answer:
          "Supplied research references ₹49,800 per semester and current third-party 2026 listings report the same figure. Always confirm the live India-specific amount at checkout.",
      },
      {
        question: "Does the MCA guarantee placement?",
        answer: "No. Career support is assistance, not a job guarantee.",
      },
    ],
    related: [
      {
        label: "Amity Online BCA 2026 guide",
        href: "/blogs/amity-online-bca-2026-fees-eligibility-careers",
      },
      {
        label: "Amity Online MBA 2026 guide",
        href: "/blogs/amity-online-mba-2026-fees-eligibility-careers",
      },
      { label: "Compare every Online MCA university", href: "/compare/online-mca" },
      { label: "Online MCA course hub", href: "/courses/online-mca" },
      { label: "Book free counselling", href: "/counselling" },
    ],
    sources: AMITY_SOURCES["mca"]!,
  },

  /* ------------------------------- M.Com ------------------------------- */
  {
    slug: "amity-online-mcom-2026-fees-eligibility-careers",
    title: "Amity Online M.Com 2026: Fees, Eligibility, Syllabus & Careers",
    seoExcerpt:
      "Amity Online M.Com 2026 guide — Financial Management and FinTech routes, admission steps, eligibility, documents, fee data-quality warning, curriculum, careers and skills.",
    category: "Study Guides",
    categorySlug: "study-guides",
    tags: ["amity online mcom", "amity mcom fees", "online mcom 2026", "mcom fintech"],
    readingTime: "14 min",
    banner: "online-bcom",
    name: "Amity Online M.Com",
    short: "M.Com",
    intro:
      "Amity University Online's M.Com is a two-year postgraduate commerce programme focused on advanced commerce, accounting and finance. The curriculum covers Advanced Financial Accounting, Financial Management, Statistics for Management, Risk Management, Security Analysis and Portfolio Management, Financial Reporting and Decision Making and Treasury Management, along with project and dissertation work. Current listings show two routes: M.Com in Financial Management and M.Com with a Financial Technology specialisation.",
    keyTakeaways: [
      "Two years, four semesters, with Financial Management and FinTech routes currently listed.",
      "The Financial Management page states graduation in any discipline — verify route-specific conditions.",
      "Published fee figures conflict across sources, so no single range should be trusted without verification.",
      "Semester 4 is Treasury Management plus a dissertation and project.",
      "Hiring-company lists should not be treated as M.Com-specific recruiter evidence.",
    ],
    overview: [
      ["Programme", "Master of Commerce (M.Com)"],
      ["Mode", "Online"],
      ["Duration", "2 years / 4 semesters"],
      [
        "Current routes",
        "M.Com in Financial Management; M.Com with Financial Technology specialisation",
      ],
      [
        "Eligibility",
        "Financial Management page states graduation in any discipline — verify route-specific conditions",
      ],
      ["Fee", "Sources conflict — use the verified India-specific figure only"],
    ],
    curriculum: {
      caption: "Amity Online M.Com semester-wise curriculum",
      rows: [
        [
          "Semester 1",
          "Advanced Financial Accounting; Managerial Economics; Financial Management; Statistics for Management; Professional Communication",
        ],
        [
          "Semester 2",
          "Risk Management; Business Research Methods; Cognitive Analytics and Social Skills for Professionals; Security Analysis and Portfolio Management; Financial Engineering",
        ],
        [
          "Semester 3",
          "Financial Reporting and Decision Making; Minor Project; Professional Ethics",
        ],
        ["Semester 4", "Treasury Management; Dissertation; Project"],
      ],
      note: "Use the route-specific curriculum snapshot — the FinTech specialisation differs from the Financial Management route.",
    },
    specialisations: {
      intro:
        "Two routes are currently listed. Choose on the basis of the finance function you want to work in, not the label.",
      head: ["Route", "Focus", "Potential direction"],
      rows: [
        [
          "Financial Management",
          "Planning, analysis, risk, reporting, treasury, portfolio concepts",
          "Finance analyst, corporate finance, banking and financial services",
        ],
        [
          "FinTech",
          "Digital finance, financial technology, digital banking, emerging systems",
          "FinTech analyst, digital banking, risk, product and data roles",
        ],
      ],
    },
    admissionIntro:
      "M.Com admission is straightforward, but the route selection matters: Financial Management and FinTech have different curricula and, potentially, different fees.",
    admissionSteps: [
      "Select the exact M.Com route — Financial Management or FinTech.",
      "Verify the current eligibility and fee for that specific route.",
      "Register online on the Amity admission portal.",
      "Complete personal and academic information.",
      "Upload the requested documents.",
      "Pay the applicable amount.",
      "Complete enrolment and save receipts and confirmations.",
    ],
    eligibilityIntro:
      "The current Amity Financial Management programme page states graduation in any discipline for Indian students. Some third-party sources mention a 50–60% requirement and final-semester candidates; verify those against the active admission form for the exact route.",
    eligibilityRows: [
      [
        "Indian graduate",
        "Graduation in any discipline as stated on the current Financial Management page",
      ],
      [
        "Final-semester candidate",
        "Mentioned in secondary sources — confirm against the active admission form",
      ],
      [
        "Minimum-marks condition",
        "A 50–60% range appears in secondary sources; treat as unverified until the official form confirms it",
      ],
      FOREIGN_ROW,
    ],
    documents: [
      "Class 10 certificate / marksheet",
      "Class 12 certificate / marksheet",
      "Graduation degree and consolidated marksheets",
      "Government-issued identity proof",
      "Recent passport-size photograph",
      "Foreign-education equivalence documents (AIU) where applicable",
      "Payment confirmation and application reference",
    ],
    feeIntro:
      "This programme carries a genuine data-quality problem. Supplied sources contain ₹1,20,000 in one place, ₹90,000–₹1,20,000 in a table and ₹60,000–₹70,000 elsewhere, while current third-party 2026 listings report around ₹1.5 lakh for M.Com Financial Management. These figures must not be averaged or merged into a range.",
    feeRows: [
      [
        "Total programme fee",
        "Conflicting values across sources",
        "Published only from the verified India-specific fee record",
      ],
      [
        "Per semester",
        "Not consistently reported",
        "Recorded once the official semester split is confirmed",
      ],
      [
        "Scholarship / discount",
        "Offered, eligibility-based",
        "Documented per scheme with conditions",
      ],
      [
        "EMI",
        "Offered on the admission flow",
        "Published with tenure and interest terms confirmed",
      ],
      [
        "Other charges",
        "Not separately published",
        "Shown as 'shared by the university' rather than estimated",
      ],
    ],
    emi: [
      "Because the published fee data conflicts, ask Amity for a written fee sheet naming the exact route before you consider any EMI plan.",
      "Confirm whether the quoted EMI applies to the discounted or the full fee.",
      "Ask what happens to the instalment schedule if you switch routes after semester 1.",
      "Scholarships are eligibility-based and cycle-specific; the receipt is the proof, not the brochure.",
    ],
    learning: [
      "Online delivery with live and recorded sessions and digital study resources.",
      "Project and dissertation components across semesters 3 and 4.",
      "The FinTech route promotes practical exercises and live industry projects.",
      "Assessment blends continuous assignments with end-of-semester examinations.",
      "Career assistance is offered as support, not guaranteed employment.",
    ],
    careerHead: ["Career direction", "What the role commonly involves"],
    careerRows: [
      ["Accountant / accounting operations", "Records, reconciliations, reporting support"],
      ["Financial analyst", "Financial analysis, reporting and decision support"],
      ["Tax-related roles", "Subject to applicable professional qualification requirements"],
      ["Audit / assurance pathway", "Audit support, compliance and controls"],
      ["Banking and financial services", "Operations, relationship and product roles"],
      ["Risk analyst", "Risk identification, monitoring and reporting"],
      ["Portfolio / investment support", "Research, analysis and portfolio administration"],
      ["Business analyst", "Data-led business and finance analysis"],
      ["Treasury-related roles", "Cash, liquidity and funding operations"],
      ["FinTech analyst", "Digital finance products, payments and data"],
      ["Finance operations", "Process, reporting and control activities"],
      [
        "Entrepreneurship / family-business finance",
        "Applying finance skills inside your own business",
      ],
    ],
    salary: [
      "Amity does not publish a verified M.Com-specific salary table, and this guide will not invent one. Commerce pay in India tracks the function you enter — accounting operations, analysis, risk or FinTech all pay differently.",
      "The reliable levers are a professional qualification alongside the degree, demonstrable Excel and modelling ability, and relevant internship or work experience.",
    ],
    skills: [
      "Advanced Excel",
      "Financial modelling",
      "Financial statement analysis",
      "Statistics and data interpretation",
      "ERP and accounting tools",
      "Power BI or a similar analytics tool",
      "Financial markets and risk fundamentals",
      "Communication and presentation",
      "Relevant professional certifications",
    ],
    higherStudies: [
      "PhD and research routes.",
      "Professional accounting and finance qualifications such as CA, CS, CMA or ACCA, subject to their own eligibility rules.",
      "Finance and analytics certifications.",
      "An MBA where the career goal justifies it.",
      "Competitive examinations where eligible.",
    ],
    placement: [
      "Amity describes placement assistance and career support for M.Com learners. Any hiring-company list you see should not be presented as a confirmed M.Com-specific recruiter list unless the university provides programme-specific evidence.",
      "Treat all of it as support services. The offer still depends on your qualifications, skills and interviews.",
    ],
    comparison: {
      head: ["Factor", "Online M.Com", "Regular M.Com"],
      rows: [
        ["Flexibility", "High", "Usually lower"],
        ["Campus exposure", "Limited / virtual", "Higher"],
        ["Working while studying", "More feasible", "Less feasible in a full-time format"],
        ["Networking", "Online and alumni", "In-person plus alumni"],
        ["Best fit", "Flexible learners", "Campus-immersion seekers"],
      ],
    },
    faqs: [
      {
        question: "What is the duration of the Amity Online M.Com?",
        answer: "Two years, across four semesters.",
      },
      {
        question: "What are the specialisations?",
        answer:
          "Current listings include M.Com in Financial Management and an M.Com with a Financial Technology (FinTech) specialisation. Verify the active route before applying.",
      },
      {
        question: "What is the fee?",
        answer:
          "Published figures conflict across sources — from ₹60,000–₹70,000 to around ₹1.5 lakh. Use the verified India-specific fee from Amity for your exact route rather than any published range.",
      },
      {
        question: "What subjects are taught?",
        answer:
          "Advanced Financial Accounting, Managerial Economics, Financial Management, Statistics, Risk Management, Security Analysis and Portfolio Management, Financial Engineering, Financial Reporting, Treasury Management and a dissertation.",
      },
      {
        question: "Can working professionals pursue it?",
        answer: "Yes — the online format is flexible, subject to managing the workload.",
      },
      {
        question: "Is placement guaranteed?",
        answer: "No. Amity offers career assistance; it is not a job guarantee.",
      },
    ],
    related: [
      {
        label: "Amity Online B.Com 2026 guide",
        href: "/blogs/amity-online-bcom-2026-fees-eligibility-careers",
      },
      {
        label: "Amity Online MBA 2026 guide",
        href: "/blogs/amity-online-mba-2026-fees-eligibility-careers",
      },
      { label: "Compare every Online M.Com university", href: "/compare/online-mcom" },
      { label: "Online M.Com course hub", href: "/courses/online-mcom" },
      { label: "Book free counselling", href: "/counselling" },
    ],
    sources: AMITY_SOURCES["mcom"]!,
  },

  /* ------------------------------- BBA -------------------------------- */
  {
    slug: "amity-online-bba-2026-fees-eligibility-careers",
    title: "Amity Online BBA 2026: Admission, Fees, Eligibility & Careers",
    seoExcerpt:
      "Amity Online BBA 2026 guide — admission steps, eligibility for Indian and foreign students, documents, ₹33,200 per semester fee reference, EMI, careers, salary context and skills.",
    category: "Admission Guidance",
    categorySlug: "admission-guidance",
    tags: ["amity online bba", "amity bba fees", "bba admission 2026", "amity bba eligibility"],
    readingTime: "14 min",
    banner: "online-bba",
    name: "Amity Online BBA",
    short: "BBA",
    intro:
      "Amity Online BBA is a three-year, six-semester undergraduate management programme for learners who want a foundation in business administration without a daily campus schedule. It is positioned for fresh 10+2 pass-outs, entrepreneurs and learners interested in management-facing areas such as HR, banking, accounting, marketing and operations. The supplied source lists ₹33,200 per semester and ₹1,99,000 for the full programme, with a 24-month EMI option.",
    keyTakeaways: [
      "Three years, six semesters, fully online, entry after Class 12.",
      "Supplied fee: ₹33,200 per semester and ₹1,99,000 full programme — verify the live India figure.",
      "EMI in the supplied source: ₹5,533 per month for 24 months, described as 0% interest.",
      "Indicative early-career ranges of ₹3–5 LPA are market context, not an Amity guarantee.",
      "A BBA works best when paired with internships, Excel, communication and a project portfolio.",
    ],
    overview: [
      ["Programme", "Bachelor of Business Administration (BBA)"],
      ["University", "Amity University / Amity Online"],
      ["Duration", "3 years / 6 semesters"],
      ["Mode", "Online"],
      ["Eligibility", "10+2 or equivalent; current programme criteria apply"],
      ["Supplied fee", "₹33,200 per semester; ₹1,99,000 full programme"],
      ["EMI in supplied source", "₹5,533/month for 24 months, described as 0% interest"],
      ["Learning tools", "Live classes, recorded content, e-books and the online portal"],
    ],
    curriculum: {
      caption: "What a BBA covers (supplied source is admission-focused, not a full semester map)",
      rows: [
        ["Management core", "Principles of management; business communication; entrepreneurship"],
        ["Marketing", "Marketing and consumer understanding, promotion and sales"],
        ["Finance", "Financial and accounting fundamentals"],
        ["People", "Human-resource management and organisational behaviour"],
        ["Operations", "Operations and business processes"],
        [
          "Applied",
          "Business analytics / digital business where included, plus projects and professional skills",
        ],
      ],
      note: "The supplied material is admission-focused rather than a complete semester curriculum. Use Amity's current published curriculum for a semester-wise breakdown before enrolling.",
    },
    admissionIntro:
      "Amity's current BBA page describes a five-step online admission flow; in practice it runs as seven checkpoints from programme selection to enrolment.",
    admissionSteps: [
      "Select the BBA programme and review the current specialisation options, fee structure and eligibility.",
      "Register with a valid mobile number and email, and verify your contact details.",
      "Complete the application with accurate personal, contact and academic information.",
      "Upload clear copies of marksheets, certificates, identity proof and photograph.",
      "Pay the programme or application fee through the current admission portal.",
      "Review the complete form — spellings, marks, dates and files — and submit.",
      "Complete enrolment after review and acceptance, then collect LMS access details.",
    ],
    eligibilityIntro:
      "Indian students who have completed Class 12 or an equivalent qualification can apply. The current Amity Online BBA page lists 10th and 12th certificates for Indian students and O-Level/A-Level plus AIU equivalence for foreign students. English-language readiness is expected.",
    eligibilityRows: [
      [
        "Indian student",
        "10th and 12th formal-schooling certificates; current programme-specific requirements apply",
      ],
      [
        "Foreign student",
        "O Level plus A Level or equivalent schooling as specified; AIU equivalence where required",
      ],
      ["Language", "Sufficient English understanding for the programme"],
      [
        "Entrepreneur / working learner",
        "No separate category replaces academic eligibility; standard admission criteria still apply",
      ],
    ],
    documents: [
      "Class 10 certificate / marksheet",
      "Class 12 certificate / marksheet",
      "Government ID where required",
      "Recent photograph",
      "Foreign-education equivalence documents where applicable",
      "Payment confirmation and application reference",
    ],
    feeIntro:
      "The supplied source gives a per-semester fee of ₹33,200 and a full-programme figure of ₹1,99,000, plus a 24-month EMI figure. The live fee card changes with intake, scholarship and payment plan, so the researched current India fee is the primary value with the research date shown.",
    feeRows: [
      ["Per semester", "₹33,200", "Verify the current intake fee"],
      [
        "Full programme",
        "₹1,99,000",
        "Verify the current total and whether all charges are included",
      ],
      ["EMI", "₹5,533/month for 24 months", "Display only with current terms confirmed"],
      [
        "Scholarships",
        "Available subject to eligibility",
        "No fixed discount is promised without current scheme evidence",
      ],
    ],
    emi: [
      "The supplied source describes a 24-month, 0% interest EMI at ₹5,533 per month — confirm the tenure, processing fee and lender before signing.",
      "Ask whether the EMI is calculated on the pre-discount or post-discount fee.",
      "Scholarships are eligibility-based; get the applied amount reflected on your own fee receipt.",
      "Check the refund policy for a mid-semester withdrawal before the first instalment.",
    ],
    learning: COMMON_LEARNING,
    careerHead: ["Job role", "What the role commonly involves"],
    careerRows: [
      [
        "Marketing Executive",
        "Campaign support, customer research, content and promotion coordination, market execution",
      ],
      [
        "Sales Executive",
        "Prospecting, customer interaction, sales targets and relationship management",
      ],
      [
        "HR Executive",
        "Recruitment coordination, employee records, HR operations and engagement support",
      ],
      ["Financial Analyst", "Basic financial analysis, reporting and business data interpretation"],
      [
        "Business Development Executive",
        "Lead generation, partnerships, client acquisition and market expansion",
      ],
      [
        "Operations Executive",
        "Process coordination, service delivery, reporting and operational support",
      ],
      [
        "Banking / insurance roles",
        "Customer service, relationship management, operations and product support",
      ],
      ["Entrepreneur", "Business planning, customer acquisition, finance, operations and growth"],
    ],
    salary: [
      "The supplied material gives indicative ranges of roughly ₹3–5 LPA for marketing, sales and business-development roles and ₹3–4.5 LPA for several entry-level operations and HR roles.",
      "Read these as indicative market ranges for early-career BBA graduates, not as Amity placement figures. City, employer, role, experience, skills and hiring conditions move them substantially.",
    ],
    skills: [
      "Advanced Excel",
      "PowerPoint and business presentations",
      "Business communication",
      "Digital marketing fundamentals",
      "CRM and sales tools",
      "Basic financial analysis",
      "Data visualisation / Power BI basics",
      "Interview preparation",
      "An internship or project portfolio",
      "Professional networking and a LinkedIn profile",
    ],
    higherStudies: [
      "MBA — the most common next step for BBA graduates.",
      "PGDM programmes where the institution's eligibility rules allow.",
      "Specialised professional certifications in marketing, finance, HR, analytics or international business.",
      "Entry into competitive examinations where a bachelor's degree is the eligibility criterion.",
    ],
    placement: [
      "The supplied source describes resume assistance, virtual job-search guidance and counselling for Amity Online BBA learners.",
      "None of that is a guaranteed job. Ask precisely what career services include and who is eligible for them before you treat placement support as part of the value you are paying for.",
    ],
    faqs: [
      {
        question: "Is the Amity Online BBA valid?",
        answer:
          "Amity presents the BBA as an online undergraduate degree. Verify the applicable current UGC entitlement for the exact programme and admission session on the UGC DEB portal.",
      },
      {
        question: "What is the duration of the Amity Online BBA?",
        answer: "Three years, across six semesters.",
      },
      {
        question: "What is the Amity Online BBA fee in 2026?",
        answer:
          "The supplied source lists ₹33,200 per semester and ₹1,99,000 for the full programme. Verify the live India fee for your intake before paying.",
      },
      {
        question: "Can I pursue BBA after Class 12 from any stream?",
        answer:
          "Amity's eligibility information focuses on completing 10+2 and English readiness rather than a commerce-only stream requirement.",
      },
      {
        question: "Does Amity guarantee a job after BBA?",
        answer:
          "No. Career and placement assistance should never be read as a guaranteed job unless an explicit written guarantee applies to your specific programme.",
      },
    ],
    related: [
      {
        label: "Amity Online BCA 2026 guide",
        href: "/blogs/amity-online-bca-2026-fees-eligibility-careers",
      },
      {
        label: "Amity Online B.Com 2026 guide",
        href: "/blogs/amity-online-bcom-2026-fees-eligibility-careers",
      },
      { label: "Compare every Online BBA university", href: "/compare/online-bba" },
      { label: "Online BBA course hub", href: "/courses/online-bba" },
      { label: "Book free counselling", href: "/counselling" },
    ],
    sources: AMITY_SOURCES["bba"]!,
  },

  /* ------------------------------- BCA -------------------------------- */
  {
    slug: "amity-online-bca-2026-fees-eligibility-careers",
    title: "Amity Online BCA 2026: Syllabus, Fees, Eligibility & Careers",
    seoExcerpt:
      "Amity Online BCA 2026 guide — semester-wise syllabus, ₹29,200 per semester fee reference, eligibility, admission steps, specialisation tracks, career support and IT job roles.",
    category: "Study Guides",
    categorySlug: "study-guides",
    tags: ["amity online bca", "amity bca fees", "amity bca syllabus", "bca admission 2026"],
    readingTime: "15 min",
    banner: "online-bca",
    name: "Amity Online BCA",
    short: "BCA",
    intro:
      "Amity Online BCA is a three-year, six-semester undergraduate programme for learners entering computer applications, software, IT and emerging technology domains through a flexible online format. The syllabus spans programming in C, data structures, operating systems, databases, Java, Python, cybersecurity, AI, IoT and blockchain, ending with a major project. The supplied source lists ₹29,200 per semester and ₹1,75,000 for the full programme.",
    keyTakeaways: [
      "Three years, six semesters, presented by Amity as a UGC-entitled online BCA.",
      "Supplied fee: ₹29,200 per semester and ₹1,75,000 full programme, with a 24-month zero-cost EMI of ₹6,881.",
      "The syllabus ends with AI, Data Warehousing, IoT, Blockchain and a major project.",
      "Specialisation tracks such as FinTech & AI are separate programme variants, not part of the general BCA.",
      "In tech hiring, your portfolio and DSA preparation decide the offer — not the certificate alone.",
    ],
    overview: [
      ["Programme", "Bachelor of Computer Applications (BCA)"],
      ["Duration", "3 years / 6 semesters"],
      ["Mode", "Online"],
      ["Eligibility", "10+2 or equivalent schooling; current programme criteria apply"],
      ["Supplied fee", "₹29,200 per semester; ₹1,75,000 full programme"],
      ["EMI in supplied source", "24-month zero-cost EMI; ₹6,881/month stated"],
      [
        "Academic focus",
        "Programming, data structures, databases, operating systems, software engineering, AI and emerging technologies",
      ],
      [
        "Career support",
        "Virtual job fairs, resume assistance, job-search support and counselling",
      ],
    ],
    curriculum: {
      caption: "Amity Online BCA syllabus 2026 (supplied source)",
      rows: [
        [
          "Semester 1",
          "Computer and Information Technology; Basic Mathematics; Programming in C; Business Communication; Human-Computer Interaction",
        ],
        [
          "Semester 2",
          "Data Structures in C; Operating System Concepts; Environmental Studies; Software Engineering",
        ],
        [
          "Semester 3",
          "Computational Statistics; Database Management; Green Computing; Java Programming",
        ],
        [
          "Semester 4",
          "Unix System & Shell Programming; Python Programming; Cyber Security; Digital Marketing",
        ],
        ["Semester 5", "Artificial Intelligence; Data Warehousing; Internet of Things (IoT)"],
        [
          "Semester 6",
          "Major Project; Blockchain Technologies; Human Resource Management; e-Governance",
        ],
      ],
      note: "This is a semester snapshot. Where a specialisation track is chosen, its subjects differ — keep the general curriculum and the specialisation curriculum separate.",
    },
    specialisations: {
      intro:
        "The supplied source describes a general BCA curriculum, while Amity Online also promotes specialised technology tracks. These are separate programme variants, not add-ons to the general degree.",
      head: ["Track / area", "Career-learning direction"],
      rows: [
        [
          "FinTech & AI",
          "Financial technology, AI, digital payments and emerging financial systems",
        ],
        [
          "Applied / emerging technology",
          "Application development, data and technology engineering, emerging digital systems",
        ],
        [
          "General BCA",
          "Programming, databases, systems, cybersecurity and emerging-technology foundations",
        ],
      ],
    },
    admissionIntro:
      "The BCA admission flow is fully online. Decide between the general BCA and a specialisation track before you register, because the curriculum and fee can differ.",
    admissionSteps: [
      "Choose BCA and review the current curriculum and any available specialisation track.",
      "Register an application account with valid contact details.",
      "Complete the application with personal and academic information.",
      "Upload the requested schooling certificates and identity or photo documents.",
      "Complete the current payment step shown by the university.",
      "Submit the application and complete the registration requirements.",
      "Await enrolment details and follow the LMS and academic onboarding instructions.",
    ],
    eligibilityIntro:
      "The current Amity Online BCA page lists 10+2 eligibility. Notably, the Amity-specific eligibility material does not state a mathematics requirement — use the official programme wording rather than the generic BCA rule you may have read elsewhere.",
    eligibilityRows: [
      [
        "Indian student",
        "10+2 or equivalent schooling from a recognised board; current programme criteria apply",
      ],
      [
        "Mathematics",
        "Amity's BCA eligibility material does not state a mathematics requirement — confirm on the official page",
      ],
      FOREIGN_ROW,
      ["Language", "Sufficient English understanding for the programme"],
    ],
    documents: [
      "Class 10 certificate / marksheet",
      "Class 12 certificate / marksheet",
      "Government-issued identity proof",
      "Recent passport-size photograph",
      "Foreign-education equivalence documents where applicable",
      "Payment confirmation and application reference",
    ],
    feeIntro:
      "The supplied material lists ₹29,200 per semester and ₹1,75,000 for the full programme, with a stated 24-month zero-cost EMI of ₹6,881 per month. The official live fee card is currency and localisation dependent, so the India-specific fee must be confirmed from the current Indian admission flow.",
    feeRows: [
      ["Per semester", "₹29,200", "Verify the current India fee"],
      ["Full programme", "₹1,75,000", "Verify the current total and included charges"],
      ["EMI", "₹6,881/month for 24 months", "Display only after current EMI terms are confirmed"],
      ["Scholarship", "Available", "Applied under the current eligibility and offer terms"],
    ],
    emi: [
      "The supplied source describes a 24-month zero-cost EMI at ₹6,881 per month — confirm interest, processing fee and lender in writing.",
      "If you choose a specialisation track, re-confirm the fee and EMI, because variants can be priced differently.",
      "Scholarship offers are eligibility-based and cycle-specific; the fee receipt is the only proof that matters.",
      "Compare the three-year total, not the monthly instalment, when weighing Amity against another online BCA.",
    ],
    learning: [
      "Live and recorded classes with digital study material through the university LMS.",
      "Programming, database and systems work applied through semester assignments.",
      "A major project in semester 6 that can anchor your portfolio.",
      "Career support described as virtual job fairs, resume assistance, job-search guidance and one-to-one counselling.",
      "Build GitHub repositories, deployed applications and technical certifications alongside the degree — these carry the interview.",
    ],
    careerHead: ["Role", "Core work / skills"],
    careerRows: [
      [
        "Software Developer",
        "Programming, debugging, application development and version-control workflows",
      ],
      ["Web Developer", "Frontend and backend development, APIs, databases and deployment"],
      [
        "Database Administrator / Associate",
        "Database management, queries, backups, access and performance basics",
      ],
      [
        "QA / Test Engineer",
        "Test planning, defect reporting, automation basics and quality processes",
      ],
      [
        "Information Security Analyst",
        "Security monitoring, vulnerability awareness and incident-support activities",
      ],
      [
        "Network Engineer / Support",
        "Networking fundamentals, troubleshooting and infrastructure support",
      ],
      ["Technical Support", "User support, issue diagnosis and system-administration basics"],
      ["Data / BI Analyst", "Data cleaning, SQL, spreadsheets, dashboards and analytical thinking"],
      [
        "Cloud Support Associate",
        "Cloud fundamentals, deployment concepts, monitoring and troubleshooting",
      ],
    ],
    salary: [
      "There is no reliable, current, role-by-role Amity BCA salary table, so this guide deliberately does not publish a salary promise.",
      "Entry-level IT pay in India varies widely with your programming portfolio, internships, technical-interview ability, location, employer and prior experience. Treat any single number you see online as marketing until you can source it.",
    ],
    skills: [
      "One primary programming language deeply — C, C++, Java or Python depending on the target role",
      "Data structures and algorithms",
      "SQL and database design",
      "HTML, CSS and JavaScript for web roles",
      "Git and GitHub",
      "REST APIs and basic backend development",
      "Linux and command-line fundamentals",
      "Cloud fundamentals",
      "Cybersecurity basics for security-oriented roles",
      "AI and data tools where relevant",
      "Interview preparation and portfolio projects",
    ],
    higherStudies: [
      "MCA — the standard postgraduate route after a BCA.",
      "M.Sc in Computer Science or Data Science, subject to the institution's eligibility rules.",
      "MBA where the goal is a business-technology or product career.",
      "Vendor certifications in cloud, security or data as a faster alternative to a second degree.",
    ],
    placement: [
      "The supplied material describes virtual job fairs, resume and CV assistance, job-search guidance and one-to-one career counselling. Company names sometimes attached to these claims should only be published where a reliable, current source confirms the association.",
      "Never convert 'hiring partner' or 'student outcome' language into a blanket placement guarantee. For BCA specifically, projects, code samples and deployed applications move the hiring needle far more than the placement-cell brochure.",
    ],
    comparison: {
      head: ["Factor", "Online BCA", "Campus BCA"],
      rows: [
        ["Learning location", "Remote / digital", "Physical campus"],
        ["Schedule", "Generally more flexible", "Usually a fixed class schedule"],
        ["Self-discipline", "High", "Moderate to high"],
        ["Campus exposure", "Limited / virtual", "Direct campus environment"],
        ["Cost structure", "Depends on the university", "Depends on the college and city"],
        [
          "Career outcome",
          "Depends strongly on skills plus programme quality",
          "Depends strongly on skills, institution and internships",
        ],
      ],
    },
    faqs: [
      {
        question: "What is the duration of the Amity Online BCA?",
        answer: "Three years, across six semesters.",
      },
      {
        question: "What is the Amity Online BCA fee?",
        answer:
          "The supplied source lists ₹29,200 per semester and ₹1,75,000 for the programme. Confirm the current India fee before paying.",
      },
      {
        question: "What subjects are included in the Amity Online BCA?",
        answer:
          "C programming, data structures, operating systems, software engineering, databases, Java, Python, cybersecurity, AI, IoT, blockchain and a major project.",
      },
      {
        question: "Is Mathematics required for the Amity Online BCA?",
        answer:
          "The Amity-specific eligibility material does not state a mathematics requirement. Use the current official programme eligibility wording rather than a generic BCA rule.",
      },
      {
        question: "Is the Amity Online BCA valid?",
        answer:
          "The current programme page presents the degree as UGC-entitled. Check the entitlement for your exact programme and admission session rather than relying on a 'valid forever' claim, and treat international recognition claims such as WES precisely — they are not an employment or immigration guarantee.",
      },
    ],
    related: [
      {
        label: "Amity Online MCA 2026 guide",
        href: "/blogs/amity-online-mca-2026-fees-eligibility-careers",
      },
      {
        label: "Amity Online BBA 2026 guide",
        href: "/blogs/amity-online-bba-2026-fees-eligibility-careers",
      },
      { label: "Compare every Online BCA university", href: "/compare/online-bca" },
      { label: "Online BCA course hub", href: "/courses/online-bca" },
      { label: "Book free counselling", href: "/counselling" },
    ],
    sources: AMITY_SOURCES["bca"]!,
  },

  /* ------------------------------- B.Com ------------------------------- */
  {
    slug: "amity-online-bcom-2026-fees-eligibility-careers",
    title: "Amity Online B.Com 2026: Fees, Eligibility, Syllabus & Careers",
    seoExcerpt:
      "Amity Online B.Com 2026 guide — ₹19,200 per semester fee reference, eligibility, admission steps, documents, semester-wise syllabus, careers, skills and higher-study routes.",
    category: "Study Guides",
    categorySlug: "study-guides",
    tags: ["amity online bcom", "amity bcom fees", "bcom admission 2026", "amity bcom syllabus"],
    readingTime: "14 min",
    banner: "online-bcom",
    name: "Amity Online B.Com",
    short: "B.Com",
    intro:
      "Amity Online B.Com is a three-year, six-semester commerce degree for learners who want accounting, finance, taxation, business law and banking foundations without daily campus attendance. The supplied source lists ₹19,200 per semester and ₹1,15,000 for the full programme, with EMI and scholarship options. For a 2026 decision, weigh the curriculum, examination process and career services alongside the headline fee.",
    keyTakeaways: [
      "Three years, six semesters, entry after Class 12 from a recognised board.",
      "Supplied fee: ₹19,200 per semester and ₹1,15,000 full programme — check the arithmetic against the official fee schedule.",
      "The syllabus runs from Financial Accounting I to Corporate Tax Planning, Investment Analysis and a major project.",
      "B.Com is a strong base for MBA, M.Com and professional routes such as CA, CS and CMA.",
      "Career support is a service, not a guaranteed job or salary.",
    ],
    overview: [
      ["University", "Amity University / Amity Online"],
      ["Programme", "Bachelor of Commerce (B.Com)"],
      ["Level", "Undergraduate"],
      ["Duration", "3 years / 6 semesters"],
      ["Mode", "Online"],
      ["Entry point", "10+2 or equivalent, subject to current university criteria"],
      [
        "Core academic areas",
        "Accounting, finance, taxation, business law, economics, statistics, management and commerce",
      ],
      [
        "Career directions",
        "Accounting, finance, taxation, banking, business operations and higher studies",
      ],
    ],
    curriculum: {
      caption: "Amity Online B.Com semester-wise syllabus",
      rows: [
        [
          "Semester 1",
          "Business Mathematics I; Financial Accounting I; Mercantile Law; Environmental Studies; Business Communication",
        ],
        [
          "Semester 2",
          "Business Mathematics II; Financial Accounting II; Fundamentals of Corporate Law; Macroeconomics; Principles of Marketing",
        ],
        [
          "Semester 3",
          "Individual Excellence and Social Dynamics; Corporate Accounting I; Cost Accounting; Direct Tax I; Business Statistics",
        ],
        [
          "Semester 4",
          "Auditing; Corporate Accounting II; Direct Tax II; Management Accounting; Research Methodology",
        ],
        [
          "Semester 5",
          "Business Organisation; Computerized Accounting System; Financial Reporting; Fundamentals of Financial Management; Indian Economy; Professional Ethics",
        ],
        [
          "Semester 6",
          "Ethics and Corporate Governance; Major Project; Corporate Tax Planning; International Financial Management; Investment Analysis and Portfolio Management",
        ],
      ],
      note: "Treat this as a curriculum snapshot rather than the 'latest' syllabus — confirm the current structure on the official programme page before enrolling.",
    },
    admissionIntro:
      "B.Com admission runs online end to end. The seven checkpoints below mirror Amity's current admission flow.",
    admissionSteps: [
      "Review the B.Com programme page — current fee, eligibility, curriculum and intake information.",
      "Create an application account with accurate contact information.",
      "Complete the form with personal and academic information exactly as shown on official documents.",
      "Upload the required academic, identity and photograph documents in the specified format.",
      "Pay the applicable fees and retain the transaction confirmation.",
      "Review spellings, marks, dates and uploaded files, then submit the application.",
      "Await enrolment confirmation and follow the registration, LMS access and onboarding instructions.",
    ],
    eligibilityIntro:
      "Class 12 completion from a recognised board is the basic requirement, along with English-language readiness. Amity's current programme information identifies 10+2 as the entry route and lists formal-schooling documentation for Indian and foreign learners.",
    eligibilityRows: [
      [
        "Indian learner",
        "10th and 12th certificates; 10+2 completion; current programme-specific eligibility must be checked",
      ],
      [
        "Foreign learner",
        "Equivalent secondary and senior-secondary qualifications, with AIU equivalence where applicable",
      ],
      ["Language", "Basic English proficiency / programme-language readiness"],
      ["Working learner", "No separate category; standard academic eligibility applies"],
    ],
    documents: [
      "Class 10 certificate / marksheet",
      "Class 12 certificate / marksheet",
      "Government or identity proof where required",
      "Passport-size photograph",
      "Foreign-education equivalence documents where applicable",
      "Any additional documents requested by the current admission portal",
    ],
    feeIntro:
      "The supplied source states ₹19,200 per semester and ₹1,15,000 for the full programme, with EMI and scholarship options. Fee cards change by intake, scholarship, payment mode and programme version, so the researched current fee is the primary value and the research date stays visible.",
    feeRows: [
      ["Per semester", "₹19,200", "Used only after current fee verification"],
      [
        "Full programme",
        "₹1,15,000",
        "Check the arithmetic and the current official fee schedule before relying on it",
      ],
      ["EMI", "Available", "Display the current amount and tenure only if confirmed"],
      [
        "Scholarships",
        "Available subject to eligibility",
        "No fixed discount is promised unless the current scheme is confirmed",
      ],
    ],
    emi: [
      "Note that six semesters at ₹19,200 does not reconcile neatly with the ₹1,15,000 programme figure — ask Amity for the official fee schedule and the exact number of payable instalments.",
      "Confirm the EMI tenure, monthly amount and any processing charge in writing before enrolling.",
      "Scholarships are eligibility-based; ask for the applied discount on your own fee receipt.",
      "Check refund and withdrawal terms before the first payment.",
    ],
    learning: COMMON_LEARNING,
    careerHead: ["Career path", "Typical work focus"],
    careerRows: [
      ["Accountant", "Bookkeeping, reconciliations, financial records and reporting support"],
      ["Financial Analyst", "Financial data analysis, reporting and business decision support"],
      ["Tax Consultant", "Tax compliance, documentation and tax-planning support"],
      [
        "Banking Executive",
        "Customer service, banking operations, relationship and product support",
      ],
      [
        "Business Development Executive",
        "Lead generation, client relationships, sales and partnerships",
      ],
      ["Entrepreneur", "Using commerce and business knowledge to run a venture"],
      ["Higher studies", "MBA, M.Com and relevant professional qualifications"],
    ],
    salary: [
      "The supplied B.Com material does not provide a verified role-by-role salary table, so none is published here. Early commerce salaries in India depend heavily on the function you enter and whether you hold or are pursuing a professional qualification.",
      "The strongest lever for a B.Com graduate is combining the degree with practical accounting software, Excel and a professional route such as CA, CS or CMA.",
    ],
    skills: [
      "Advanced Excel and spreadsheet modelling",
      "Accounting software and computerized accounting",
      "Financial statement analysis",
      "Business communication",
      "Tax and compliance fundamentals",
      "Power BI or basic business analytics",
      "Presentation and professional writing",
      "Internship or project experience",
    ],
    higherStudies: [
      "MBA for management and business-leadership directions.",
      "M.Com for advanced commerce, accounting and finance.",
      "Professional qualifications — CA, CS, CMA or ACCA — subject to their own eligibility rules.",
      "Analytics or finance certifications where a specialist role is the goal.",
    ],
    placement: [
      "Career support, job-search assistance, resume workshops, counselling and job fairs are services. They are not the same as a guaranteed job or a guaranteed salary.",
      "Use precise wording when you evaluate any university: 'placement assistance' and 'career support' mean help, and only an explicit published guarantee means more than that.",
    ],
    faqs: [
      {
        question: "Is the Amity Online B.Com valid?",
        answer:
          "Amity presents the B.Com as an online degree with published eligibility and programme information. Validity should be evaluated against the current UGC entitlement for the specific programme and admission session.",
      },
      {
        question: "What is the duration of the Amity Online B.Com?",
        answer: "Three years, across six semesters.",
      },
      {
        question: "What is the Amity Online B.Com fee?",
        answer:
          "The supplied source lists ₹19,200 per semester and ₹1,15,000 for the programme. Verify the current India fee before paying, as fee cards change by intake.",
      },
      {
        question: "What are the main subjects in the Amity Online B.Com?",
        answer:
          "Accounting, business mathematics, mercantile and corporate law, economics, taxation, auditing, management accounting, financial management, corporate governance and a major project.",
      },
      {
        question: "Can I pursue higher studies after an online B.Com?",
        answer:
          "Yes, subject to the eligibility rules of the next institution. Common routes are MBA, M.Com and professional qualifications such as CA, CS and CMA.",
      },
    ],
    related: [
      {
        label: "Amity Online M.Com 2026 guide",
        href: "/blogs/amity-online-mcom-2026-fees-eligibility-careers",
      },
      {
        label: "Amity Online BBA 2026 guide",
        href: "/blogs/amity-online-bba-2026-fees-eligibility-careers",
      },
      { label: "Compare every Online B.Com university", href: "/compare/online-bcom" },
      { label: "Online B.Com course hub", href: "/courses/online-bcom" },
      { label: "Book free counselling", href: "/counselling" },
    ],
    sources: AMITY_SOURCES["bcom"]!,
  },
];

export const amityCourseArticles: Article[] = configs.map(buildArticle);

export const amityCoursePosts: Record<string, PostContent> = Object.fromEntries(
  configs.map((c) => [c.slug, buildPost(c)]),
);
