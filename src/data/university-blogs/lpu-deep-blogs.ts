/**
 * LPU deep-dive blogs (2026) — additive companions to lpu-program-blogs.ts.
 *
 * These posts only publish facts from the supplied "LPU ... Deep Blog" source
 * documents that are NOT already covered in lpu-program-blogs.ts / lpu-online.ts:
 * the full MBA specialisation-with-fee list, MBA career-skill breakdown, the
 * complete BCA course-code syllabus for semesters 5-6, BBA entry-level job
 * titles and the BBA-to-MBA pathway, and the cross-programme LPU course/fee/
 * salary comparison. The MCA source file was skipped — see the note at the
 * bottom of this file.
 */

import type { PostBlock, PostContent, PostSection } from "@/data/posts";
import type { Article } from "@/lib/content";

const base = { reviewer: "Kartik Ahuja", reviewerRole: "Education Research Lead, Degreekhojo" };
const UPDATED = "2026-08-18";
const UNI = "/universities/lpu-online";

const relatedLinks = [
  { label: "LPU Online university overview", href: UNI },
  { label: "LPU Online admission process", href: `${UNI}/admission` },
  { label: "LPU Online placements", href: `${UNI}/placement` },
  { label: "LPU Online scholarships", href: `${UNI}/scholarships` },
  { label: "Online MBA course pillar page", href: "/courses/online-mba" },
  { label: "Online MCA course pillar page", href: "/courses/online-mca" },
  { label: "Online BBA course pillar page", href: "/courses/online-bba" },
  { label: "Online BCA course pillar page", href: "/courses/online-bca" },
  { label: "LPU Online vs Amity Online", href: "/compare/lpu-online-vs-amity-online" },
];

const verifyNote = (what: string): PostBlock => ({
  kind: "note",
  text: `${what} are reproduced from LPU's supplied 2026 programme material. Fee slabs, specialisation lists and salary ranges shift between cycles and sources, so reconfirm current figures with the university before you pay.`,
});

const counselCta = (programme: string): PostBlock => ({
  kind: "cta",
  title: `Check your ${programme} eligibility in 2 minutes`,
  body: "Share your details and a counsellor will confirm eligibility, the live fee slab and the documents you need for this intake.",
  buttonLabel: "Get free guidance",
});

/* ------------------------------- articles ------------------------------- */

export const lpuDeepArticles: Article[] = [
  {
    slug: "lpu-online-mba-fees-subjects-specialisations-2026",
    title: "LPU Online MBA 2026: Full Specialisation List, Fees & Skills to Build",
    excerpt:
      "The complete LPU Online MBA specialisation list — HR, business analytics, digital marketing, data science, finance, IT, logistics, healthcare, international business and operations — plus the fee conflict to verify and the skills that make the degree pay off.",
    category: "Study Guides",
    categorySlug: "study-guides",
    tags: ["lpu-online", "mba", "specialisations", "fees", "skills", "2026"],
    author: "Kartik Ahuja",
    authorSlug: "kartik-ahuja",
    date: UPDATED,
    readingTime: "12 min",
    kind: "blog",
  },
  {
    slug: "lpu-online-bba-2026-deep-dive",
    title: "LPU Online BBA 2026: Entry-Level Roles, BBA-to-MBA Path & Checklist",
    excerpt:
      "Beyond the fee sheet — the specific entry-level job titles LPU's BBA material points to, how graduates use it as a step toward an MBA, and a 10-point checklist to run before you pay.",
    category: "Career Growth",
    categorySlug: "career-growth",
    tags: ["lpu-online", "bba", "careers", "mba-pathway", "2026"],
    author: "Kartik Ahuja",
    authorSlug: "kartik-ahuja",
    date: UPDATED,
    readingTime: "11 min",
    kind: "blog",
  },
  {
    slug: "lpu-online-bca-2026-deep-dive",
    title: "LPU Online BCA 2026: Full 6-Semester Syllabus With Course Codes",
    excerpt:
      "The complete LPU Online BCA syllabus down to course codes for all six semesters, including the discipline-specific electives in years 5 and 6, plus what to build after BCA.",
    category: "Study Guides",
    categorySlug: "study-guides",
    tags: ["lpu-online", "bca", "syllabus", "electives", "2026"],
    author: "Kartik Ahuja",
    authorSlug: "kartik-ahuja",
    date: UPDATED,
    readingTime: "13 min",
    kind: "blog",
  },
  {
    slug: "lpu-online-courses-2026-deep-dive",
    title: "LPU Online Courses 2026: Fees & Pay Ranges Across Every Programme",
    excerpt:
      "A full LPU Online course-and-fee map across management, computer applications, science, commerce and arts, with the job-role pay ranges LPU cites for BCA, BBA, BA, MBA, MCA, M.Com and MSc Mathematics.",
    category: "Fees & Scholarships",
    categorySlug: "fees-scholarships",
    tags: ["lpu-online", "fees", "salary", "courses", "2026"],
    author: "Kartik Ahuja",
    authorSlug: "kartik-ahuja",
    date: UPDATED,
    readingTime: "14 min",
    kind: "blog",
  },
];

/* -------------------------------- bodies -------------------------------- */

const mbaDeepSections: PostSection[] = [
  {
    heading: "The specialisation list LPU's own MBA page doesn't spell out",
    blocks: [
      {
        kind: "p",
        text: "LPU's core Online MBA programme page describes career-focused specialisations without listing them. The university's broader course catalogue does name them, and it's worth reading before you shortlist a track.",
      },
      {
        kind: "list",
        items: [
          "Human Resource Management",
          "Business Analytics",
          "Marketing",
          "Digital Marketing",
          "Data Science",
          "Finance",
          "Information Technology",
          "Logistics and Supply Chain Management",
          "Hospital and Healthcare Management",
          "International Business",
          "Operations Management",
        ],
      },
      {
        kind: "note",
        text: "LPU's material describes single and double specialisation options. Confirm which of these eleven tracks are actually open for your admission cycle — catalogue listings and live intake availability aren't always the same thing.",
      },
    ],
  },
  {
    heading: "The fee figure you should actually ask about",
    blocks: [
      {
        kind: "table",
        caption: "MBA specialisation fee referenced in LPU's wider course catalogue",
        head: ["Programme", "Catalogue fee"],
        rows: [
          ["MBA (general)", "Rs 2,00,000"],
          ["MBA with any of the 11 specialisations above", "Rs 2,00,000"],
        ],
      },
      {
        kind: "p",
        text: "This catalogue figure sits alongside two other MBA fee numbers already published for LPU — Rs 49,000 per semester in the programme highlights and Rs 40,400 per semester (Rs 1,61,600 total) in the programme's own fee table. Three different documents, three different totals: don't average them, ask the admission desk which one applies to your intake.",
      },
      verifyNote("These specialisation-linked fee figures"),
    ],
  },
  {
    heading: "Skills that turn the MBA into interview-ready capability",
    blocks: [
      { kind: "h3", text: "Business skills" },
      {
        kind: "list",
        items: [
          "Business communication",
          "Presentation",
          "Negotiation",
          "Leadership",
          "Decision-making",
          "Strategic thinking",
        ],
      },
      { kind: "h3", text: "Analytical skills" },
      {
        kind: "list",
        items: [
          "Excel",
          "Business analytics",
          "Data interpretation",
          "Financial analysis",
          "Market research",
        ],
      },
      { kind: "h3", text: "Digital skills (specialisation-dependent)" },
      {
        kind: "list",
        items: [
          "Digital marketing tools",
          "CRM platforms",
          "Business intelligence tools",
          "Product management tools",
          "Data and analytics platforms",
        ],
      },
      {
        kind: "p",
        text: "LPU frames the MBA's value as depending on how it connects to a learner's existing path — a working professional strengthens business knowledge with it, a fresher uses it as a management-role foundation. Pick a specialisation against your target career, current background, work experience, industry demand and long-term direction rather than by popularity.",
      },
    ],
  },
  {
    heading: "How this fits the rest of your MBA research",
    blocks: [
      {
        kind: "p",
        text: "For duration, eligibility (including the CS/CA/CMA entry routes), the semester-wise curriculum, admission steps, accreditation and the career-role table, see the main LPU Online MBA 2026-27 guide — this page only adds what that guide leaves out.",
      },
      {
        kind: "links",
        title: "Continue your MBA research",
        items: [
          {
            label: "LPU Online MBA 2026-27: full guide",
            href: "/blogs/lpu-online-mba-2026-27-complete-guide",
          },
          { label: "Online MBA course page", href: "/courses/online-mba" },
          { label: "LPU Online vs Amity Online", href: "/compare/lpu-online-vs-amity-online" },
        ],
      },
      counselCta("LPU Online MBA"),
    ],
  },
];

const bbaDeepSections: PostSection[] = [
  {
    heading: "Entry-level roles named in LPU's BBA material",
    blocks: [
      {
        kind: "p",
        text: "LPU's core BBA guide lists broad career areas — business development, marketing, HR, sales, finance, operations. Its 2026 material goes a step further and names the specific entry-level job titles graduates typically target.",
      },
      {
        kind: "list",
        items: [
          "Business Development Executive",
          "Marketing Executive",
          "Sales Executive",
          "HR Executive",
          "Operations Executive",
          "Customer Success Executive",
          "Business Analyst (entry-level)",
          "Digital Marketing Executive",
          "Financial Services Associate",
          "Entrepreneur",
        ],
      },
      {
        kind: "note",
        text: "These are executive/associate-level entry titles, not guaranteed placements. Actual outcomes depend on skills, internships, specialisation and the employer's own requirements.",
      },
    ],
  },
  {
    heading: "Using BBA as a step toward an MBA",
    blocks: [
      {
        kind: "p",
        text: "A large share of BBA graduates use the degree as a foundation for postgraduate management study rather than an end point. LPU's material lists the routes graduates commonly take next.",
      },
      {
        kind: "list",
        items: [
          "MBA",
          "PGDM",
          "Professional certifications",
          "Domain-specific courses",
          "Entrepreneurship",
          "Competitive examinations, subject to eligibility",
        ],
      },
      {
        kind: "p",
        text: "If an MBA is the plan, it's worth choosing BBA electives now that line up with the MBA specialisation you're likely to pick later — finance-leaning electives feed an MBA Finance track, and so on.",
      },
    ],
  },
  {
    heading: "How the curriculum builds up, stage by stage",
    blocks: [
      { kind: "h3", text: "Stage 1 — Business foundations" },
      {
        kind: "list",
        items: [
          "Management principles",
          "Business communication",
          "Accounting",
          "Economics",
          "Business environment",
          "Basic quantitative concepts",
        ],
      },
      { kind: "h3", text: "Stage 2 — Functional business knowledge" },
      {
        kind: "list",
        items: [
          "Marketing management",
          "Human resource management",
          "Financial management",
          "Operations",
          "Organisational behaviour",
          "Business research",
        ],
      },
      { kind: "h3", text: "Stage 3 — Application and career orientation" },
      {
        kind: "list",
        items: [
          "Strategic management",
          "Entrepreneurship",
          "Business analytics",
          "Electives",
          "Projects",
          "Industry-oriented applications",
        ],
      },
      {
        kind: "p",
        text: "This three-stage framing maps onto the same subject list published in the main BBA guide, but it's a useful lens for planning: foundations first, functional depth next, then application and electives in the final stretch.",
      },
    ],
  },
  {
    heading: "Ten checks before you pay",
    blocks: [
      {
        kind: "list",
        ordered: true,
        items: [
          "Current eligibility criteria",
          "Current programme fee",
          "Scholarship availability",
          "Exact semester-wise syllabus",
          "Examination pattern",
          "Learning platform and support",
          "Career services",
          "Internship opportunities",
          "Refund/cancellation policy",
          "Degree recognition and current regulatory status",
        ],
      },
      {
        kind: "links",
        title: "Continue your BBA research",
        items: [
          {
            label: "LPU Online BBA 2026-27: full guide",
            href: "/blogs/lpu-online-bba-2026-27-complete-guide",
          },
          { label: "Online BBA course page", href: "/courses/online-bba" },
          { label: "LPU Online admission process", href: `${UNI}/admission` },
        ],
      },
      counselCta("LPU Online BBA"),
    ],
  },
];

const bcaDeepSections: PostSection[] = [
  {
    heading: "Why the course-code level matters",
    blocks: [
      {
        kind: "p",
        text: "LPU's main BCA guide summarises the final two semesters as \"discipline-specific electives, skill-enhancement courses, generic electives and a field project.\" LPU's fuller 2026 syllabus document names the actual course codes for every semester, including years two and three — useful if you're checking transfer credit, comparing electives across universities, or just want to see what a generic elective slot actually contains.",
      },
    ],
  },
  {
    heading: "Full six-semester syllabus with course codes",
    blocks: [
      {
        kind: "table",
        caption: "Semester 1",
        head: ["Code", "Subject"],
        rows: [
          ["ECAP170", "Fundamentals of IT"],
          ["ECAP172", "Programming Methodology"],
          ["EMTH136", "Discrete Structures"],
          ["EENG139", "English Communication Skills"],
          ["ECHE110", "Environmental Sciences"],
        ],
      },
      {
        kind: "table",
        caption: "Semester 2",
        head: ["Code", "Subject"],
        rows: [
          ["ECAP200", "Database Management Systems"],
          ["ECAP202", "Object Oriented Programming"],
          ["ECAP256", "Computer Networks"],
          ["ECAP268", "Computer System Architecture"],
          ["EENG140", "Advanced English Communication Skills"],
        ],
      },
      {
        kind: "table",
        caption: "Semester 3",
        head: ["Code", "Subject"],
        rows: [
          ["ECAP214", "Fundamentals of Web Programming"],
          ["ECAP267", "Data Structures"],
          ["ECAP462", "Community Development Project"],
          ["ECAP560", "Operating System"],
        ],
      },
      {
        kind: "table",
        caption: "Semester 4",
        head: ["Code", "Subject"],
        rows: [
          ["ECAP509", "Software Engineering"],
          ["ECAP653", "Artificial Intelligence"],
          ["SEC-I", "Skill Enhancement Course I"],
          ["GE-I", "Generic Elective I"],
        ],
      },
      {
        kind: "table",
        caption: "Semester 5",
        head: ["Code", "Subject"],
        rows: [
          ["DSE-II", "Discipline Specific Elective II"],
          ["DSE-III", "Discipline Specific Elective III"],
          ["SEC-II", "Skill Enhancement Course II"],
          ["GE-III", "Generic Elective III"],
          ["ECAP463", "Field Project"],
        ],
      },
      {
        kind: "table",
        caption: "Semester 6",
        head: ["Code", "Subject"],
        rows: [
          ["DSE-IV", "Discipline Specific Elective IV"],
          ["SEC-III", "Skill Enhancement Course III"],
          ["SEC-IV", "Skill Enhancement Course IV"],
          ["GE-IV", "Generic Elective IV"],
        ],
      },
      {
        kind: "note",
        text: "Course codes, electives and the exact semester structure can change between sessions. Confirm the current syllabus with LPU's academic office before finalising elective choices.",
      },
    ],
  },
  {
    heading: "What to build after BCA",
    blocks: [
      {
        kind: "p",
        text: "LPU's material frames BCA as a foundation for postgraduate study as much as a job-ready qualification on its own.",
      },
      {
        kind: "list",
        items: [
          "MCA",
          "MSc in Computer Science / IT-related fields",
          "MBA in IT or technology management",
          "Data science programmes",
          "Artificial intelligence programmes",
          "Cloud computing certifications",
          "Cybersecurity certifications",
          "Software development specialisations",
        ],
      },
      { kind: "h3", text: "Entry-level roles named alongside the syllabus" },
      {
        kind: "list",
        items: [
          "Software Developer",
          "Web Developer",
          "Front-End Developer",
          "Back-End Developer",
          "Full Stack Developer",
          "Database Administrator (entry-level)",
          "System Support Executive",
          "Application Support Associate",
          "Software Testing Associate",
          "IT Support Executive",
          "Junior Data Analyst",
          "Technical Support Associate",
        ],
      },
      {
        kind: "links",
        title: "Continue your BCA research",
        items: [
          {
            label: "LPU Online BCA 2026-27: full guide",
            href: "/blogs/lpu-online-bca-2026-27-complete-guide",
          },
          { label: "Online BCA course page", href: "/courses/online-bca" },
          { label: "LPU Online placements", href: `${UNI}/placement` },
        ],
      },
      counselCta("LPU Online BCA"),
    ],
  },
];

const coursesDeepSections: PostSection[] = [
  {
    heading: "One fee sheet, every LPU Online course",
    blocks: [
      {
        kind: "p",
        text: "LPU's broader online-course catalogue prices every programme in one place, including MBA and MCA specialisation tracks individually. These figures come from a separate catalogue source and differ from the fee tables published on LPU's own programme-specific pages — treat this as one more reference point to reconcile, not a final number.",
      },
      {
        kind: "table",
        caption: "Management courses",
        head: ["Course", "Catalogue fee"],
        rows: [
          ["Bachelor of Business Administration", "Rs 1,50,000"],
          ["Diploma in Business Administration", "Rs 50,000"],
          ["Master of Business Administration (and each of its 11 specialisations)", "Rs 2,00,000"],
        ],
      },
      {
        kind: "table",
        caption: "Computer application courses",
        head: ["Course", "Catalogue fee"],
        rows: [
          ["Bachelor of Computer Applications", "Rs 1,50,000"],
          ["Diploma in Computer Application", "Rs 50,000"],
          ["Master of Computer Applications (general)", "Rs 1,48,000"],
          ["MCA — Data Science", "Rs 1,48,000"],
          ["MCA — Full Stack Web Development", "Rs 1,48,000"],
          ["MCA — Cybersecurity", "Rs 1,48,000"],
          ["MCA — Machine Learning & AI", "Rs 1,48,000"],
        ],
      },
      {
        kind: "table",
        caption: "Science, commerce and arts courses",
        head: ["Course", "Catalogue fee"],
        rows: [
          ["MSc Mathematics", "Rs 80,000"],
          ["MSc Economics", "Rs 80,000"],
          ["Master of Commerce", "Rs 1,00,000"],
          ["Bachelor of Arts", "Rs 1,20,000"],
          ["Master of Arts (general)", "Rs 80,000"],
          ["MA English", "Rs 80,000"],
          ["MA Sociology", "Rs 80,000"],
          ["MA Political Science", "Rs 80,000"],
        ],
      },
      verifyNote("Every fee figure above"),
    ],
  },
  {
    heading: "Pay ranges LPU cites, by course",
    blocks: [
      {
        kind: "p",
        text: "LPU's course catalogue attaches indicative job-role pay bands to several programmes. These are market ranges cited alongside the course, not LPU-guaranteed outcomes or placement averages — actual pay depends on the employer, role, location, skills and experience of the individual candidate.",
      },
      {
        kind: "table",
        caption: "BCA — cited roles and pay range",
        head: ["Role", "Pay range"],
        rows: [
          ["Software Developer", "Rs 2.0 LPA – Rs 16.0 LPA"],
          ["Programmer", "Rs 4.0 LPA – Rs 10.3 LPA"],
          ["Systems Analyst", "Rs 3.0 LPA – Rs 20.0 LPA"],
        ],
      },
      {
        kind: "table",
        caption: "BBA — cited roles and pay range",
        head: ["Role", "Pay range"],
        rows: [
          ["Marketing Manager", "Rs 2.5 LPA – Rs 13.74 LPA"],
          ["Retail Manager", "Rs 2.0 LPA – Rs 14.4 LPA"],
          ["Business Data Analyst", "Rs 4.0 LPA – Rs 10.5 LPA"],
        ],
      },
      {
        kind: "table",
        caption: "BA — cited roles and pay range",
        head: ["Role", "Pay range"],
        rows: [
          ["Economist", "Rs 8.0 LPA – Rs 20.0 LPA"],
          ["Journalist", "Rs 7.0 LPA – Rs 24.0 LPA"],
          ["Lawyer", "Rs 4.0 LPA – Rs 10.0 LPA"],
        ],
      },
      {
        kind: "table",
        caption: "MBA — cited roles and pay range",
        head: ["Role", "Pay range"],
        rows: [
          ["Marketing Manager", "Rs 2.4 LPA – Rs 25.0 LPA"],
          ["Marketing Analyst", "Rs 2.0 LPA – Rs 15.0 LPA"],
          ["Product Manager", "Rs 5.6 LPA – Rs 38.1 LPA"],
        ],
      },
      {
        kind: "table",
        caption: "MCA — cited roles and pay range",
        head: ["Role", "Pay range"],
        rows: [
          ["Software Developer", "Rs 4.0 LPA – Rs 10.0 LPA"],
          ["Data Scientist", "Rs 9.0 LPA – Rs 20.0 LPA"],
          ["Database Administrator", "Rs 5.0 LPA – Rs 12.0 LPA"],
        ],
      },
      {
        kind: "table",
        caption: "M.Com — cited roles and pay range",
        head: ["Role", "Pay range"],
        rows: [
          ["Tax Consultant", "Rs 6.0 LPA – Rs 8.0 LPA"],
          ["Chartered Accountant", "Rs 8.0 LPA – Rs 12.6 LPA"],
          ["Sales Analyst", "Rs 5.0 LPA – Rs 9.0 LPA"],
        ],
      },
      {
        kind: "table",
        caption: "MSc Mathematics — cited roles and pay range",
        head: ["Role", "Pay range"],
        rows: [
          ["Data Analyst", "Rs 4.0 LPA – Rs 11.5 LPA"],
          ["Software Engineer", "Rs 5.0 LPA – Rs 13.2 LPA"],
          ["Market Researcher", "Rs 3.0 LPA – Rs 7.0 LPA"],
        ],
      },
      {
        kind: "note",
        text: "No verified, LPU-specific placement salary table exists for any of these programmes. Read these ranges as broad market context for the role, not as an expected outcome of the LPU degree itself.",
      },
    ],
  },
  {
    heading: "Matching a career goal to a course",
    blocks: [
      {
        kind: "table",
        caption: "Career direction to course map",
        head: ["Career goal", "Relevant LPU courses"],
        rows: [
          ["Software development", "BCA, MCA"],
          ["Data & analytics", "BCA, MCA, MBA Business Analytics, MSc Mathematics"],
          ["Artificial intelligence", "MCA, MCA Machine Learning & AI"],
          ["Cybersecurity", "MCA Cybersecurity"],
          ["Business management", "BBA, MBA"],
          ["Marketing", "BBA, MBA Marketing, MBA Digital Marketing"],
          ["Finance", "BBA, MBA Finance, M.Com"],
          ["Human resources", "BBA, MBA HR"],
          ["Commerce & taxation", "M.Com"],
          ["Mathematics & analytics", "MSc Mathematics"],
          ["Arts & social sciences", "BA, MA, MA English, MA Sociology, MA Political Science"],
        ],
      },
      {
        kind: "p",
        text: "LPU's catalogue also lists Diploma in Business Administration (Rs 50,000) and Diploma in Computer Application (Rs 50,000) as shorter, lower-cost entry points if a full degree isn't the right fit yet.",
      },
      {
        kind: "links",
        title: "Reconcile fees against the programme-specific guides",
        items: [
          {
            label: "LPU Online MBA 2026-27: full guide",
            href: "/blogs/lpu-online-mba-2026-27-complete-guide",
          },
          {
            label: "LPU Online MCA 2026-27: full guide",
            href: "/blogs/lpu-online-mca-2026-27-complete-guide",
          },
          {
            label: "LPU Online BCA 2026-27: full guide",
            href: "/blogs/lpu-online-bca-2026-27-complete-guide",
          },
          {
            label: "LPU Online courses & fees 2026-27",
            href: "/blogs/lpu-online-courses-fees-2026-27",
          },
          { label: "LPU Online university overview", href: UNI },
        ],
      },
      counselCta("LPU Online course"),
    ],
  },
];

/* ------------------------------- content -------------------------------- */

export const lpuDeepPosts: Record<string, PostContent> = {
  "lpu-online-mba-fees-subjects-specialisations-2026": {
    ...base,
    updated: UPDATED,
    intro:
      "LPU's Online MBA programme page describes multiple career-focused specialisations without naming them. Its wider course catalogue does name all eleven — this guide brings that list together with the fee figure attached to it and the skills that make each specialisation employable, without repeating the eligibility, admission and semester-wise curriculum already covered in the main MBA guide.",
    keyTakeaways: [
      "LPU's catalogue names 11 MBA specialisations: HR, Business Analytics, Marketing, Digital Marketing, Data Science, Finance, IT, Logistics & SCM, Hospital & Healthcare Management, International Business and Operations Management.",
      "The catalogue prices the MBA — general or with any specialisation — at Rs 2,00,000, a third figure alongside the Rs 49,000/semester and Rs 40,400/semester (Rs 1,61,600 total) already published on LPU's own MBA page.",
      "LPU allows single and double specialisation combinations, subject to availability in your admission cycle.",
      "Business, analytical and digital skill-building alongside the coursework is what LPU's own material points to for stronger career outcomes.",
      "Always confirm the live specialisation list and fee slab with the admission desk — catalogue entries and current intake availability aren't guaranteed to match.",
    ],
    sections: mbaDeepSections,
    faqs: [
      {
        question: "Does LPU Online MBA offer a full list of specialisations?",
        answer:
          "Yes, though the list appears in LPU's broader course catalogue rather than the dedicated MBA programme page. It includes HR, Business Analytics, Marketing, Digital Marketing, Data Science, Finance, IT, Logistics & Supply Chain Management, Hospital & Healthcare Management, International Business and Operations Management.",
      },
      {
        question: "Which MBA fee figure should I trust — Rs 49,000, Rs 40,400 or Rs 2,00,000?",
        answer:
          "LPU's own material contains all three across different documents. Treat none of them as final and ask the admission desk directly which fee slab applies to your specific intake and specialisation before paying.",
      },
      {
        question: "Can I take two MBA specialisations at LPU?",
        answer:
          "LPU's material references single and double specialisation options, but availability depends on the admission cycle. Confirm this with the university before assuming a dual-specialisation route is open.",
      },
    ],
    related: relatedLinks,
    sources: [{ label: "LPU Online MBA Deep Blog (supplied source)", href: "#" }],
  },

  "lpu-online-bba-2026-deep-dive": {
    ...base,
    updated: UPDATED,
    intro:
      "The main LPU Online BBA guide covers fees, admission and the subject list. This companion piece adds what that guide leaves out: the specific entry-level job titles LPU's 2026 material points to, how graduates use the BBA as a step toward an MBA, and a pre-payment checklist.",
    keyTakeaways: [
      "LPU's 2026 BBA material names specific entry-level titles — Business Development Executive, Marketing Executive, Digital Marketing Executive, Financial Services Associate and more — beyond the broad career-area list already published.",
      "BBA is commonly used as a foundation for an MBA, PGDM, professional certifications or entrepreneurship rather than as a terminal qualification.",
      "The curriculum builds in three stages: business foundations, functional business knowledge, then application and specialisation.",
      "No LPU-specific BBA salary table exists — treat entry-level titles as direction, not a promised outcome.",
      "Run the 10-point checklist before paying: eligibility, fee, scholarships, syllabus, exam pattern, learning platform, career services, internships, refund policy and recognition status.",
    ],
    sections: bbaDeepSections,
    faqs: [
      {
        question: "What entry-level jobs does LPU's BBA material point to?",
        answer:
          "Business Development Executive, Marketing Executive, Sales Executive, HR Executive, Operations Executive, Customer Success Executive, entry-level Business Analyst, Digital Marketing Executive, Financial Services Associate and entrepreneurship.",
      },
      {
        question: "Should I do an MBA after LPU's Online BBA?",
        answer:
          "LPU's material lists MBA, PGDM, professional certifications, domain-specific courses, entrepreneurship and competitive examinations as common next steps. Whether an MBA makes sense depends on your target role and whether the BBA already covers what you need for it.",
      },
      {
        question: "Is there a guaranteed placement or salary after LPU's Online BBA?",
        answer:
          "No. LPU offers placement assistance and career support, but no verified BBA-specific salary table is published. Outcomes depend on skills, internships, communication and the hiring employer.",
      },
    ],
    related: relatedLinks,
    sources: [{ label: "LPU Online BBA 2026 Deep Blog (supplied source)", href: "#" }],
  },

  "lpu-online-bca-2026-deep-dive": {
    ...base,
    updated: UPDATED,
    intro:
      "LPU's main Online BCA guide gives a semester-wise subject list but summarises the final two semesters as elective slots. Its fuller 2026 syllabus document names the actual course code behind every subject across all six semesters — this guide reproduces that full syllabus along with the postgraduate pathways and entry-level roles named alongside it.",
    keyTakeaways: [
      "The full BCA syllabus runs to named course codes for all six semesters, including four elective/skill-enhancement slots in semesters 5 and 6 (DSE-II through DSE-IV, SEC-II through SEC-IV, GE-III and GE-IV).",
      "Semester 5 also carries a Field Project (ECAP463) alongside the electives.",
      "LPU frames BCA as a foundation for further study — MCA, MSc, MBA in IT, data science, AI, cloud and cybersecurity certifications are all named as common next steps.",
      "Entry-level roles named alongside the syllabus include Software Developer, Web Developer, Database Administrator (entry-level) and Junior Data Analyst.",
      "Course codes and electives can change between sessions — confirm the live syllabus before locking in an elective plan.",
    ],
    sections: bcaDeepSections,
    faqs: [
      {
        question: "What subjects are in LPU Online BCA semester 5 and 6?",
        answer:
          "Semester 5 covers Discipline Specific Elective II and III, Skill Enhancement Course II, Generic Elective III and a Field Project. Semester 6 covers Discipline Specific Elective IV, Skill Enhancement Courses III and IV, and Generic Elective IV. Exact elective options vary by session.",
      },
      {
        question: "What can I study after LPU Online BCA?",
        answer:
          "LPU's material lists MCA, MSc in Computer Science/IT, MBA in IT or technology management, data science programmes, AI programmes, and cloud computing or cybersecurity certifications as common next steps.",
      },
      {
        question: "Are LPU's BCA course codes fixed for every admission cycle?",
        answer:
          "No. LPU's own material notes that course codes, electives and semester structures can change, so the current official syllabus should be checked before finalising elective choices.",
      },
    ],
    related: relatedLinks,
    sources: [{ label: "LPU Online BCA 2026 Deep Blog (supplied source)", href: "#" }],
  },

  "lpu-online-courses-2026-deep-dive": {
    ...base,
    updated: UPDATED,
    intro:
      "LPU's wider online-course catalogue prices every UG, PG and diploma programme in one sheet and attaches indicative job-role pay ranges to several of them. Neither the per-course fee list nor the salary ranges appear in LPU's individual programme guides, so this piece brings both together as a single cross-programme reference.",
    keyTakeaways: [
      "The catalogue prices BBA and BCA at Rs 1,50,000 each, MBA (any specialisation) at Rs 2,00,000, and MCA (any specialisation) at Rs 1,48,000 — figures that differ from the semester-wise fee tables on LPU's own MBA and MCA pages.",
      "Diploma routes exist for both management (Rs 50,000) and computer applications (Rs 50,000) as lower-cost, shorter entry points.",
      "LPU cites job-role pay ranges for BCA, BBA, BA, MBA, MCA, M.Com and MSc Mathematics graduates — market context, not guaranteed or placement-verified figures.",
      "A career-direction table maps 11 common goals — from software development to arts and social sciences — to the specific LPU courses aligned with them.",
      "Because fee figures conflict across LPU's own documents, always verify the live number for your exact programme and specialisation before paying.",
    ],
    sections: coursesDeepSections,
    faqs: [
      {
        question: "Why does LPU show different fees for the same MBA or MCA programme?",
        answer:
          "LPU's supplied material comes from multiple documents — a general course catalogue and separate programme-specific pages — and they don't always agree. The catalogue lists MBA at Rs 2,00,000 and MCA at Rs 1,48,000, while the programme-specific pages state different semester-wise totals. Confirm the applicable figure with the admission desk before paying.",
      },
      {
        question: "Are the pay ranges LPU lists guaranteed for graduates?",
        answer:
          "No. These are market pay ranges cited alongside each course as indicative context, not placement averages or guarantees. Actual pay depends on the employer, role, location, skills and the candidate's experience.",
      },
      {
        question: "Does LPU offer diploma-level online courses?",
        answer:
          "Yes — Diploma in Business Administration and Diploma in Computer Application, both listed at Rs 50,000 in LPU's course catalogue, as shorter and lower-cost alternatives to the full degree.",
      },
    ],
    related: relatedLinks,
    sources: [{ label: "LPU Online Courses Deep Blog (supplied source)", href: "#" }],
  },
};

/**
 * LPU_MCA_Deep_Blog.md was reviewed and skipped: its course highlights, fee
 * table (Rs 600 registration + Rs 2,000 exam + Rs 28,000/semester = Rs
 * 1,08,000 total), semester-wise syllabus, specialisation-area list,
 * scholarship categories and career-role table are all already published
 * verbatim in lpu-program-blogs.ts's MCA section. The only additions —
 * generic "who should choose this" framing and a general employability-skills
 * list — did not meet the bar for a new page, so no MCA deep-dive post was
 * created.
 */
