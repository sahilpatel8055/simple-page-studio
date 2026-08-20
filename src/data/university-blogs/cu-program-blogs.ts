/**
 * Chandigarh University Online programme blogs (2026-27).
 *
 * One in-depth guide per CU Online programme — MCA, MBA, BCA, MSc and BBA.
 * Content is transcribed from the supplied CU source documents in
 * `src/data/blogs data/0*_CU_*_IN_DEPTH.md`. Figures are presented as
 * source-stated and indicative, never as guaranteed outcomes.
 *
 * The blocks reuse the shared post renderer (same look as every other
 * university blog) — only the content differs. Each guide interleaves links to
 * the CU university/course pages and lead CTAs between sections so mobile
 * readers always have a next step in view.
 */

import type { PostBlock, PostContent, PostSection } from "@/data/posts";
import type { Article } from "@/lib/content";

const base = { reviewer: "Kartik Ahuja", reviewerRole: "Education Research Lead, DegreeKhojo" };
const UPDATED = "2026-08-17";
const UNI = "/universities/chandigarh-university-online";

const courseLinks = (programme: string, slug: string): PostBlock => ({
  kind: "links",
  title: `CU Online ${programme} pages on DegreeKhojo`,
  items: [
    { label: `CU Online ${programme} course page`, href: `${UNI}/courses/${slug}` },
    {
      label: `${programme} fees at Chandigarh University Online`,
      href: `${UNI}/courses/${slug}/fees`,
    },
    { label: "Chandigarh University Online overview", href: UNI },
    { label: "CU Online admission process", href: `${UNI}/admission` },
    { label: "CU Online placements", href: `${UNI}/placement` },
    { label: "CU Online scholarships", href: `${UNI}/scholarships` },
  ],
});

const counselCta = (programme: string): PostBlock => ({
  kind: "cta",
  title: `Check your CU Online ${programme} eligibility in 2 minutes`,
  body: "Share your details and a counsellor will confirm eligibility, the live fee slab and the documents you need for this intake.",
  buttonLabel: "Get free guidance",
});

const comparePromo = (programme: string, slug: string): PostBlock => ({
  kind: "promo",
  title: `Compare CU Online ${programme} fees with other universities`,
  body: "See the semester fee, total cost, approvals and EMI options side by side before you pay anything.",
  ctaLabel: "Open the comparison",
  href: `/compare/${slug}`,
});

const verifyNote = (what: string): PostBlock => ({
  kind: "note",
  text: `${what} are reproduced from Chandigarh University Online's supplied programme material. Fees, early-bird scholarships and admission rules change between cycles, so reconfirm the current 2026-27 figures with the university before you pay.`,
});

const noGuarantee: PostBlock = {
  kind: "note",
  text: "Salary bands here are indicative market ranges cited in the source material (Glassdoor-style ranges). They are career-assistance references, not guaranteed university placement packages.",
};

const relatedLinks = [
  { label: "Chandigarh University Online overview", href: UNI },
  { label: "Compare online universities", href: "/compare" },
  { label: "All online courses", href: "/courses" },
  { label: "All guides", href: "/blogs" },
];

/* ------------------------------- articles ------------------------------- */

export const cuProgramArticles: Article[] = [
  {
    slug: "cu-online-mca-2026-27-complete-guide",
    title: "CU Online MCA 2026-27: Fees, Eligibility, Syllabus & Careers",
    excerpt:
      "Chandigarh University Online MCA in depth — ₹1,55,000 fee with early-bird figure, 80 credits, five specialisations including Agentic AI, syllabus and salary bands.",
    category: "Study Guides",
    categorySlug: "study-guides",
    tags: ["chandigarh-university-online", "mca", "fees", "syllabus", "careers", "2026-27"],
    author: "Kartik Ahuja",
    authorSlug: "kartik-ahuja",
    date: UPDATED,
    readingTime: "17 min",
    kind: "blog",
  },
  {
    slug: "cu-online-mba-2026-27-complete-guide",
    title: "CU Online MBA 2026-27: Fees, Dual Specialisations & Admission",
    excerpt:
      "Chandigarh University Online MBA guide — ₹41,250 per semester, dual specialisation across 23 stated options, live + recorded learning and career support.",
    category: "Study Guides",
    categorySlug: "study-guides",
    tags: [
      "chandigarh-university-online",
      "mba",
      "fees",
      "admission",
      "specialisations",
      "2026-27",
    ],
    author: "Kartik Ahuja",
    authorSlug: "kartik-ahuja",
    date: UPDATED,
    readingTime: "16 min",
    kind: "blog",
  },
  {
    slug: "cu-online-bca-2026-27-complete-guide",
    title: "CU Online BCA 2026-27: Fees, Syllabus, Maths Rule & Careers",
    excerpt:
      "Chandigarh University Online BCA explained — Mathematics not mandatory, ₹1,77,000 fee with early-bird figure, six-semester syllabus and five specialisations.",
    category: "Study Guides",
    categorySlug: "study-guides",
    tags: ["chandigarh-university-online", "bca", "fees", "syllabus", "careers", "2026-27"],
    author: "Kartik Ahuja",
    authorSlug: "kartik-ahuja",
    date: UPDATED,
    readingTime: "16 min",
    kind: "blog",
  },
  {
    slug: "cu-online-msc-2026-27-complete-guide",
    title: "CU Online MSc 2026-27: Data Science vs Mathematics Guide",
    excerpt:
      "Chandigarh University Online MSc compared — Mathematics at ₹1,00,000 and Data Science at ₹1,46,668, semester-wise curriculum, AI elective groups and careers.",
    category: "Study Guides",
    categorySlug: "study-guides",
    tags: ["chandigarh-university-online", "msc", "data-science", "mathematics", "fees", "2026-27"],
    author: "Kartik Ahuja",
    authorSlug: "kartik-ahuja",
    date: UPDATED,
    readingTime: "15 min",
    kind: "blog",
  },
  {
    slug: "cu-online-bba-2026-27-complete-guide",
    title: "CU Online BBA 2026-27: Dual Specialisations, Fees & Careers",
    excerpt:
      "Chandigarh University Online BBA guide — dual specialisation model, ₹1,75,000 fee with early-bird figure, six-semester syllabus and business career paths.",
    category: "Study Guides",
    categorySlug: "study-guides",
    tags: ["chandigarh-university-online", "bba", "fees", "specialisations", "careers", "2026-27"],
    author: "Kartik Ahuja",
    authorSlug: "kartik-ahuja",
    date: UPDATED,
    readingTime: "15 min",
    kind: "blog",
  },
];

/* -------------------------------- MCA ---------------------------------- */

const mcaSections: PostSection[] = [
  {
    heading: "CU Online MCA 2026-27 at a glance",
    blocks: [
      {
        kind: "p",
        text: "An online MCA is most useful when it goes beyond a degree label and gives you a structured foundation in programming, databases, networks, software development and modern computing. Chandigarh University Online positions its MCA as a two-year postgraduate course for technology graduates as well as certain non-technical graduates who satisfy the subject prerequisite.",
      },
      {
        kind: "p",
        text: "The supplied material describes five specialisation paths — Cloud Computing, Data Analytics, Agentic AI, Full Stack Development, and AI & Machine Learning. The programme is described as 80 credits, with the first year focused on core computing and the second year moving into specialisation-based learning.",
      },
      {
        kind: "table",
        caption: "Quick facts — CU Online MCA",
        head: ["Particular", "Details"],
        rows: [
          ["Degree", "Master of Computer Applications"],
          ["Level / mode", "Postgraduate · Online"],
          ["Duration", "2 years / 4 semesters"],
          ["Credits", "80"],
          ["Fee in supplied source", "₹1,55,000"],
          ["Early-bird fee in source", "₹1,16,250"],
          ["Specialisations", "5"],
          ["Learning", "Live + recorded + expert sessions"],
          ["Assessment", "On-demand examination mentioned"],
          ["Career support", "Placement, internship, resume, LinkedIn, interviews"],
        ],
      },
      courseLinks("MCA", "online-mca"),
    ],
  },
  {
    heading: "Who can apply for CU Online MCA?",
    blocks: [
      {
        kind: "p",
        text: "Eligibility is broader than simply \u201cBCA required\u201d. The supplied source lists technical degrees and also opens the door to other graduates who studied a qualifying quantitative subject.",
      },
      {
        kind: "list",
        items: [
          "BCA",
          "B.Sc. Computer Science",
          "B.Sc. IT",
          "B.E. CSE / B.Tech CSE",
          "B.E. IT / B.Tech IT",
        ],
      },
      {
        kind: "p",
        text: "Candidates with other graduation degrees may qualify if they studied Mathematics, Business Mathematics, Programming or Statistics at either the 10+2 or graduation level. That matters for B.Com, B.A., B.Sc. and B.Voc applicants — but the prerequisite must be checked against the current admission rules before applying.",
      },
      counselCta("MCA"),
    ],
  },
  {
    heading: "Is CU Online MCA recognised?",
    blocks: [
      {
        kind: "list",
        items: [
          "UGC recognition / entitlement stated in the source",
          "AICTE approval stated in the source",
          "NAAC A+ accreditation",
          "WES recognition mentioned in the source",
        ],
      },
      {
        kind: "p",
        text: "Regulatory language should always be tied to the current academic session and to the exact programme and mode. Treat an accreditation statement as session-specific rather than a blanket permanent approval.",
      },
    ],
  },
  {
    heading: "CU Online MCA fees 2026-27",
    blocks: [
      {
        kind: "table",
        caption: "Fee components stated in the supplied source",
        head: ["Fee component", "Amount"],
        rows: [
          ["Application fee", "₹500"],
          ["Total programme fee", "₹1,55,000"],
          ["Programme fee after early-bird discount", "₹1,16,250"],
          ["Annual payment after discount", "₹58,125"],
          ["Semester payment after discount", "₹29,063"],
        ],
      },
      {
        kind: "p",
        text: "The source states that the programme can be paid annually or semester-wise, and that a no-cost EMI option is available.",
      },
      { kind: "h3", text: "What you should verify before paying" },
      {
        kind: "list",
        ordered: true,
        items: [
          "Current total programme fee",
          "Whether the early-bird percentage is still active",
          "Scholarship validity period",
          "Application / registration charges",
          "Examination charges, if any",
          "EMI terms",
          "Refund rules",
          "Current admission cycle",
        ],
      },
      verifyNote("These MCA fee figures"),
      comparePromo("MCA", "online-mca"),
    ],
  },
  {
    heading: "Duration, structure and semester-wise syllabus",
    blocks: [
      {
        kind: "p",
        text: "The MCA runs across two years and four semesters. Year 1 builds the computing foundation; Year 2 moves into specialisation, advanced application and a capstone.",
      },
      {
        kind: "table",
        caption: "First-year core subjects",
        head: ["Semester 1", "Semester 2"],
        rows: [
          ["Advanced Database Management System", "Advanced Internet Programming"],
          ["Advanced Computer Networks", "Design and Analysis of Algorithms"],
          ["Web Programming", "Software Testing"],
          ["Python Programming", "Web Application Development"],
          ["Network Security and Cryptography", "Cyber Security"],
        ],
      },
      {
        kind: "p",
        text: "These subjects create the common technical base every specialisation builds on in the second year.",
      },
    ],
  },
  {
    heading: "Five MCA specialisations",
    blocks: [
      { kind: "h3", text: "1. Cloud Computing" },
      {
        kind: "list",
        items: [
          "Introduction to Cloud Computing",
          "Amazon Web Services",
          "Microsoft Azure",
          "Cloud Programming",
          "Cloud Virtualisation",
          "Google Cloud Services",
          "IBM Cloud Services",
        ],
      },
      { kind: "h3", text: "2. Data Analytics" },
      {
        kind: "list",
        items: [
          "Data Analytics using Python",
          "SQL for Data Analytics",
          "Web Analytics",
          "Digital Media Analytics",
          "IoT and Data Analytics",
          "Data Analytics using R",
          "Data Analytics for Decision Making",
        ],
      },
      { kind: "h3", text: "3. Agentic AI" },
      {
        kind: "list",
        items: [
          "Advanced NLP & Language Model",
          "Agentic AI & Multi-Agent Systems",
          "RAG Systems & Knowledge Engineering",
          "Large Language Model Engineering",
          "AI for FinTech",
          "AI for Governance, Ethics & Research Methods",
          "AI for Product Management",
        ],
      },
      { kind: "h3", text: "4. Full Stack Development" },
      {
        kind: "list",
        items: [
          "HTML, CSS, JavaScript and UI/UX",
          "DevOps with Git, Jenkins and Docker",
          "Software Architecture and REST APIs",
          "ReactJS and NodeJS",
          "Ansible, Puppet and Nagios",
        ],
      },
      { kind: "h3", text: "5. AI and Machine Learning" },
      {
        kind: "list",
        items: [
          "Machine Learning in Python",
          "Statistics and Python in ML",
          "Business Application of ML",
          "Deep Learning and NLP",
          "Big Data Hadoop",
          "AI for Enterprise",
        ],
      },
      {
        kind: "table",
        caption: "Which MCA specialisation fits your target role?",
        head: ["Target", "Consider"],
        rows: [
          ["Cloud / DevOps", "Cloud Computing"],
          ["Data / BI", "Data Analytics"],
          ["GenAI / AI agents", "Agentic AI"],
          ["MERN / web development", "Full Stack Development"],
          ["ML / AI", "AI and Machine Learning"],
        ],
      },
      courseLinks("MCA", "online-mca"),
    ],
  },
  {
    heading: "Semester 4 and capstone work",
    blocks: [
      {
        kind: "list",
        items: [
          "Cloud Computing → Google/IBM cloud + capstone",
          "Data Analytics → R and decision-making analytics + capstone",
          "Full Stack Development → REST API, ReactJS, NodeJS and DevOps + capstone",
          "AI/ML → Hadoop and enterprise AI + capstone",
          "Agentic AI → governance/ethics and AI product management + capstone",
        ],
      },
      {
        kind: "p",
        text: "A major project matters because an MCA graduate needs demonstrable work, not just course completion.",
      },
    ],
  },
  {
    heading: "Admission process, step by step",
    blocks: [
      {
        kind: "list",
        ordered: true,
        items: [
          "Submit the application with personal and academic details.",
          "Upload scanned academic records and identity documents.",
          "Pay the ₹500 application fee stated in the source.",
          "Wait for admission confirmation after payment and verification.",
          "Secure the seat — the source states ₹10,000 to book a seat, or pay the programme fee to finalise enrolment.",
          "Receive LMS access and learning resources.",
        ],
      },
      counselCta("MCA"),
    ],
  },
  {
    heading: "Career support, roles and salary bands",
    blocks: [
      {
        kind: "list",
        items: [
          "End-to-end placement support",
          "LinkedIn masterclass",
          "Internship support",
          "Resume-writing workshops",
          "Mock interviews and career coaching",
          "Networking opportunities",
        ],
      },
      { kind: "h3", text: "Build a technical portfolio alongside the MCA" },
      {
        kind: "list",
        items: [
          "GitHub projects and full-stack applications",
          "Data analytics dashboards",
          "Cloud deployments",
          "AI/ML projects and RAG or agentic AI prototypes",
          "Database projects and internship experience",
        ],
      },
      {
        kind: "table",
        caption: "Indicative annual salary ranges cited in the source",
        head: ["Role", "Salary range"],
        rows: [
          ["Software Developer", "₹4–8 LPA"],
          ["Data Analyst", "₹4.5–10 LPA"],
          ["System Analyst", "₹4–13 LPA"],
          ["Network Administrator", "₹3–6 LPA"],
          ["Database Administrator", "₹4.5–9 LPA"],
          ["Business Intelligence Analyst", "₹5–12 LPA"],
          ["Cloud Engineer", "₹4–10 LPA"],
          ["Project Manager", "₹8–20 LPA"],
          ["IT Consultant", "₹6–14 LPA"],
          ["Cybersecurity Analyst", "₹4–8 LPA"],
        ],
      },
      noGuarantee,
    ],
  },
  {
    heading: "Online MCA vs regular MCA, and your admission checklist",
    blocks: [
      {
        kind: "p",
        text: "An online MCA provides flexibility and removes daily commuting; a regular MCA gives more direct campus interaction. Neither format is universally better. For a working professional, online delivery is often the practical choice; for a fresher, the deciding factor should be practical exposure, projects, internships and effort invested outside the syllabus.",
      },
      {
        kind: "list",
        items: [
          "Confirm your graduation eligibility",
          "Check the Mathematics / Programming / Statistics requirement if applicable",
          "Verify the current fee and specialisation availability",
          "Understand scholarship and EMI terms",
          "Prepare academic documents and check the examination model",
          "Understand what placement assistance actually covers",
          "Plan a portfolio before graduation",
        ],
      },
      comparePromo("MCA", "online-mca"),
    ],
  },
];

/* -------------------------------- MBA ---------------------------------- */

const mbaSections: PostSection[] = [
  {
    heading: "CU Online MBA 2026-27 at a glance",
    blocks: [
      {
        kind: "p",
        text: "Choosing an online MBA is less about finding a two-year postgraduate degree and more about matching the programme with your career direction, schedule, budget and preferred management domain. Chandigarh University Online positions its MBA as a fully online management programme for graduates, working professionals and career switchers who do not want to relocate.",
      },
      {
        kind: "p",
        text: "The source describes a two-year MBA delivered through live and recorded learning, real-world projects, dual-specialisation choices and industry-linked certification content, with UGC entitlement and NAAC A+ accreditation stated. Work experience is not mandatory.",
      },
      {
        kind: "table",
        caption: "Quick snapshot — CU Online MBA",
        head: ["Particular", "Details"],
        rows: [
          ["Degree", "Master of Business Administration"],
          ["Mode / duration", "100% online · 2 years · 4 semesters"],
          ["Eligibility", "Bachelor's degree from a recognised university"],
          ["Entrance exam", "Not required"],
          ["Fee in supplied source", "₹41,250 per semester"],
          ["Specialisation model", "Dual specialisation · 23 options stated"],
          ["Learning", "Live + recorded sessions"],
          ["Career support", "Placement assistance, resume, interviews, internships"],
        ],
      },
      courseLinks("MBA", "online-mba"),
    ],
  },
  {
    heading: "What makes the CU Online MBA different?",
    blocks: [
      { kind: "h3", text: "A management degree without relocating" },
      {
        kind: "p",
        text: "The programme is designed for learners who cannot commit to a conventional classroom MBA. Working professionals can continue employment while studying; fresh graduates can pursue postgraduate management education without moving city.",
      },
      { kind: "h3", text: "Live and recorded learning" },
      {
        kind: "p",
        text: "The source states each semester includes 40+ live sessions, recorded lectures, 20+ case studies and real-world projects, and 80+ Teaching Assistant sessions.",
      },
      { kind: "h3", text: "Dual specialisation" },
      {
        kind: "p",
        text: "Rather than one narrow area, CU Online describes a dual-specialisation structure with 23 options, letting you combine two domains that support a single career direction.",
      },
      { kind: "h3", text: "Industry-linked certification content" },
      {
        kind: "p",
        text: "The source identifies certification content associated with PwC India, PMI and Harvard Business Publishing. Treat these as source claims to reverify for the current cycle.",
      },
    ],
  },
  {
    heading: "Who should consider it, and eligibility",
    blocks: [
      {
        kind: "list",
        items: [
          "Fresh graduates seeking a management qualification",
          "Working professionals who cannot leave their jobs",
          "Business owners who want structured management knowledge",
          "Career switchers moving toward management or leadership",
          "Learners who prefer flexible online study",
          "Professionals building a second management skill area through dual specialisation",
        ],
      },
      {
        kind: "p",
        text: "A bachelor's degree in any discipline from a recognised university is sufficient for the standard MBA, and professional qualifications such as CA or ICWA are accepted. Work experience is not compulsory, and no CAT/MAT/XAT score is required for the standard online MBA.",
      },
      {
        kind: "list",
        items: [
          "Graduation marksheets",
          "Degree or provisional certificate",
          "Class 10 and Class 12 marksheets",
          "Government identity proof and passport-size photograph",
          "Active email ID and mobile number",
        ],
      },
      counselCta("MBA"),
    ],
  },
  {
    heading: "CU Online MBA fees 2026-27",
    blocks: [
      {
        kind: "table",
        caption: "Fee information stated in the supplied source",
        head: ["Fee item", "Amount / information"],
        rows: [
          ["Semester fee", "₹41,250"],
          ["Approx. four-semester tuition at this rate", "₹1,65,000"],
          ["Payment mode", "Semester-wise, online modes"],
          ["No-cost EMI", "Mentioned in source"],
          ["Scholarship / refund terms", "Check for the current cycle"],
        ],
      },
      {
        kind: "p",
        text: "Do not mix this ₹41,250 figure with older CU fee figures floating around the web. Use one verified current fee record and read it in its academic-year context.",
      },
      { kind: "h3", text: "Compare total cost, not headline tuition" },
      {
        kind: "list",
        items: [
          "Application or registration charges",
          "Examination charges, if separate",
          "Certification charges, if any",
          "EMI terms and scholarship conditions",
          "Refund rules",
          "Additional academic or project charges",
        ],
      },
      verifyNote("These MBA fee figures"),
      comparePromo("MBA", "online-mba"),
    ],
  },
  {
    heading: "Admission process and common mistakes",
    blocks: [
      {
        kind: "list",
        ordered: true,
        items: [
          "Visit the official CU Online admission portal and select the MBA.",
          "Register with name, email, mobile, programme and date of birth.",
          "Receive login credentials by SMS/email.",
          "Complete the application form with personal, contact and qualification details.",
          "Pay the fee — cards, net banking and RTGS/NEFT, with a no-cost EMI option.",
          "Upload documents (the source notes upload activates after successful payment).",
          "Submit and wait for verification and admission confirmation.",
        ],
      },
      {
        kind: "list",
        items: [
          "Incorrect mobile number or email",
          "Blurred marksheets",
          "Wrong programme selection",
          "Incomplete qualification details",
          "Forgetting document upload after payment",
          "Using outdated scholarship or refund information",
        ],
      },
    ],
  },
  {
    heading: "MBA specialisations and how to pick",
    blocks: [
      {
        kind: "list",
        items: [
          "Marketing",
          "Finance",
          "Human Resource Management",
          "Business Analytics",
          "IT Management",
          "International Business",
          "Banking and Insurance",
          "Logistics and Supply Chain",
          "General Management",
          "Other options listed by the university for the current intake",
        ],
      },
      {
        kind: "table",
        caption: "Career direction to specialisation map",
        head: ["Career direction", "Relevant specialisation"],
        rows: [
          ["Banking / finance", "Finance"],
          ["Sales / brand / marketing", "Marketing"],
          ["Recruitment / people management", "HR"],
          ["Analytics / reporting", "Business Analytics"],
          ["Global trade", "International Business"],
          ["Technology-management roles", "IT Management"],
          ["Supply-chain careers", "Logistics & Supply Chain"],
          ["Broad management", "General Management"],
        ],
      },
      {
        kind: "p",
        text: "Specialisation availability changes by academic cycle, so verify the live list before you lock a combination.",
      },
      courseLinks("MBA", "online-mba"),
    ],
  },
  {
    heading: "Learning model, career support and roles",
    blocks: [
      {
        kind: "list",
        items: [
          "40+ live sessions per semester",
          "Recorded lectures and LMS-based learning",
          "20+ case studies and real-world projects",
          "80+ Teaching Assistant sessions",
          "Industry expert sessions",
          "Flexible examination arrangements",
        ],
      },
      {
        kind: "p",
        text: "The source lists placement assistance, resume preparation, interview coaching, internships, career counselling, LinkedIn support and networking, with more than 300 hiring partners connected to the programme. This is career assistance, not a job guarantee.",
      },
      {
        kind: "list",
        items: [
          "Marketing Manager / Executive",
          "Financial Analyst",
          "HR Manager / HR Executive",
          "Business Development Manager",
          "Business Analyst",
          "Operations Manager and Project Manager",
          "Management Consultant",
          "Product or programme roles",
          "Supply chain, banking and insurance roles",
          "Entrepreneur / business owner",
        ],
      },
      { kind: "h3", text: "Skills that improve MBA employability" },
      {
        kind: "list",
        items: [
          "Excel and financial modelling",
          "Power BI / analytics",
          "CRM tools and digital marketing",
          "Business communication and presentation skills",
          "Project management tools and data interpretation",
          "Industry certifications, internships and live projects",
        ],
      },
      counselCta("MBA"),
    ],
  },
  {
    heading: "Who gets the most value, and your checklist",
    blocks: [
      {
        kind: "p",
        text: "The strongest fit is a learner who needs flexibility but is willing to build practical skills alongside the degree. A working professional gains by combining experience with formal management knowledge; a fresher should prioritise internships, projects and communication. Never choose an online MBA only because it is cheaper or easier to attend.",
      },
      {
        kind: "list",
        items: [
          "Current 2026-27 eligibility and total fee",
          "Semester fee, scholarship and EMI conditions",
          "Current specialisation list",
          "Examination method and learning schedule",
          "Placement-support terms and required documents",
          "Refund policy and current programme-level recognition",
        ],
      },
      comparePromo("MBA", "online-mba"),
    ],
  },
];

/* -------------------------------- BCA ---------------------------------- */

const bcaSections: PostSection[] = [
  {
    heading: "CU Online BCA 2026-27 at a glance",
    blocks: [
      {
        kind: "p",
        text: "CU Online BCA is a three-year undergraduate programme for students entering computer applications and IT through an online model. The supplied source highlights an important admission advantage: Mathematics is not mandatory, although it makes some technical concepts easier.",
      },
      {
        kind: "table",
        caption: "Course snapshot — CU Online BCA",
        head: ["Particular", "Details"],
        rows: [
          ["Degree", "Bachelor of Computer Applications"],
          ["Mode / duration", "Online · 3 years · 6 semesters"],
          ["Credits", "120"],
          ["Eligibility", "10+2 or equivalent"],
          ["Mathematics", "Not mandatory per supplied source"],
          ["Fee in supplied source", "₹1,77,000"],
          ["Early-bird figure", "₹1,41,600"],
          ["Specialisations", "5"],
          ["Career support", "Resume, LinkedIn, mock interviews, internships"],
        ],
      },
      courseLinks("BCA", "online-bca"),
    ],
  },
  {
    heading: "Is Mathematics required for CU Online BCA?",
    blocks: [
      {
        kind: "p",
        text: "The supplied CU material states Mathematics is not mandatory for admission. Students from Science, Commerce and Arts backgrounds can apply if they meet the 10+2 requirement.",
      },
      {
        kind: "list",
        items: [
          "Programming logic",
          "Data structures and algorithms",
          "Statistics and probability",
          "Linear algebra and optimisation",
          "Some AI and data concepts",
        ],
      },
      {
        kind: "p",
        text: "So there is a gap between admission eligibility and academic usefulness. Not having Mathematics should not stop an eligible student, but be ready to build basic quantitative skills.",
      },
      counselCta("BCA"),
    ],
  },
  {
    heading: "Eligibility and fees 2026-27",
    blocks: [
      {
        kind: "list",
        items: [
          "10+2 or equivalent from a recognised board/university/council",
          "No stream restriction in the described eligibility",
          "Merit-based admission without an entrance examination",
        ],
      },
      {
        kind: "p",
        text: "One supplied source mentions a general 45–50% reference while another states only the 10+2 qualification, so verify the current minimum marks and age rules on the official portal.",
      },
      {
        kind: "table",
        caption: "Fee detail stated in the supplied source",
        head: ["Fee detail", "Amount"],
        rows: [
          ["Admission fee", "₹500"],
          ["Total course fee", "₹1,77,000"],
          ["After early-bird scholarship", "₹1,41,600"],
          ["Annual payment after discount", "₹47,200"],
          ["Semester payment after discount", "₹23,600"],
        ],
      },
      verifyNote("These BCA fee figures"),
      comparePromo("BCA", "online-bca"),
    ],
  },
  {
    heading: "Semester-wise BCA curriculum",
    blocks: [
      {
        kind: "table",
        caption: "Years 1 and 2 core subjects",
        head: ["Semester 1", "Semester 2", "Semester 3", "Semester 4"],
        rows: [
          [
            "Computer Programming",
            "Object-Oriented Programming",
            "Design and Analysis of Algorithms",
            "Python Programming",
          ],
          [
            "Finance & Economics",
            "Data Structures and Algorithms",
            "Software Engineering",
            "Computer Graphics",
          ],
          [
            "Discrete Mathematics",
            "Introduction to Management & Leadership",
            "Database Management Systems",
            "Machine Learning",
          ],
          ["Communication Skills", "Soft Skills", "Operating Systems", "Computer Networks"],
          [
            "Electrical and Electronic Circuits",
            "Computer Systems Architecture",
            "Web Applications",
            "Probability & Statistics",
          ],
        ],
      },
      {
        kind: "table",
        caption: "Year 3 subjects",
        head: ["Semester 5", "Semester 6"],
        rows: [
          ["Data Visualisation", "AI Governance, Ethics & Safety"],
          ["Linear Algebra and Optimisation", "Cloud Native Development"],
          ["Data Warehousing and Data Mining", "Capstone Project with Live Industry Project"],
          ["Cloud Computing", "—"],
          ["RAG System & Knowledge Engineering", "—"],
        ],
      },
      {
        kind: "p",
        text: "The structure moves from fundamentals to modern computing and applied project work: programming, data structures, databases, networks, operating systems, web development, Python/AI/ML, cloud and finally projects that prove you can apply it.",
      },
    ],
  },
  {
    heading: "Five CU Online BCA specialisations",
    blocks: [
      {
        kind: "table",
        caption: "Specialisation and who it suits",
        head: ["Specialisation", "Best suited to"],
        rows: [
          ["Data Science", "Data analysis, machine learning, visualisation"],
          [
            "Cloud Computing & Cyber Security",
            "Cloud infrastructure, networks, security operations",
          ],
          ["Agentic AI", "Intelligent systems and AI applications"],
          ["UI/UX Design", "Interface, experience and product design"],
          ["AR & VR (Meta)", "Immersive and extended-reality applications"],
        ],
      },
      courseLinks("BCA", "online-bca"),
    ],
  },
  {
    heading: "Admission process, career support and hiring partners",
    blocks: [
      {
        kind: "list",
        ordered: true,
        items: [
          "Register online on the CU Online portal.",
          "Fill personal and academic information.",
          "Upload photograph, qualifying marksheet/certificate and date-of-birth proof.",
          "Pay the applicable programme/application amount online.",
          "Verification and admission confirmation.",
          "Receive LMS access and begin learning.",
        ],
      },
      {
        kind: "list",
        items: [
          "Resume-writing workshops and LinkedIn masterclasses",
          "Mock interviews and career coaching",
          "Internship/job support and mentor support",
        ],
      },
      {
        kind: "p",
        text: "Hiring/industry partners named in the source include Amazon, Hitachi, Dell, Cognizant, John Deere, HCL, Schindler, Hewlett Packard, Zomato, Google, Emergent and Everest. These are partners mentioned in the material, not a guarantee of employment.",
      },
      counselCta("BCA"),
    ],
  },
  {
    heading: "Careers, salary bands and skills to add",
    blocks: [
      {
        kind: "table",
        caption: "Indicative salary ranges cited in the source",
        head: ["Job role", "Salary range"],
        rows: [
          ["Software Developer", "₹4–9 LPA"],
          ["Web Developer", "₹3–6 LPA"],
          ["System Analyst", "₹5–13.4 LPA"],
          ["Database Administrator", "₹4–10 LPA"],
          ["IT Consultant", "₹4–12.4 LPA"],
          ["Project Manager", "₹5–12.5 LPA"],
          ["Technical Support Engineer", "₹3–8 LPA"],
          ["Network Administrator", "₹3–7 LPA"],
        ],
      },
      noGuarantee,
      { kind: "h3", text: "What to learn outside the syllabus" },
      {
        kind: "table",
        caption: "Skill stacks by target role",
        head: ["Target", "Add these skills"],
        rows: [
          [
            "Software development",
            "HTML/CSS/JS, React, Node.js, SQL, MongoDB, Git, REST APIs, DSA, cloud basics, testing",
          ],
          [
            "Data science",
            "Python, statistics, SQL, Pandas/NumPy, visualisation, machine learning, portfolio projects",
          ],
          ["UI/UX", "Figma, design systems, user research, prototyping, usability testing"],
          ["AI", "Python, ML fundamentals, LLM concepts, RAG, prompt design, AI app development"],
        ],
      },
    ],
  },
  {
    heading: "Online BCA vs regular BCA, and who should choose it",
    blocks: [
      {
        kind: "table",
        caption: "Mode comparison",
        head: ["Factor", "Online BCA", "Regular BCA"],
        rows: [
          ["Learning", "Online", "Classroom"],
          ["Schedule", "More flexible", "Fixed"],
          ["Commute", "Not required", "Usually required"],
          ["Campus exposure", "Limited", "Higher"],
          ["Working alongside study", "Easier", "More difficult"],
          ["Practical learning", "Requires self-discipline", "More direct campus access"],
        ],
      },
      {
        kind: "list",
        items: [
          "Class 12 graduates and Commerce/Arts students interested in technology",
          "Students without Mathematics who meet eligibility",
          "Working learners and career changers",
          "Learners who plan to continue toward an MCA later",
        ],
      },
      comparePromo("BCA", "online-bca"),
    ],
  },
];

/* -------------------------------- MSc ---------------------------------- */

const mscSections: PostSection[] = [
  {
    heading: "CU Online MSc 2026-27 at a glance",
    blocks: [
      {
        kind: "p",
        text: "CU Online's MSc is a two-year postgraduate programme with two very different pathways: MSc Mathematics and MSc Data Science. Mathematics centres on advanced theory, analysis and specialised mathematical areas. Data Science combines programming, statistics, machine learning, big data and newer AI-oriented electives.",
      },
      {
        kind: "table",
        caption: "Quick overview — CU Online MSc",
        head: ["Particular", "Details"],
        rows: [
          ["Degree", "Master of Science"],
          ["Mode / duration", "Online · 2 years · 4 semesters"],
          ["Credits", "80"],
          ["Specialisations", "Mathematics; Data Science"],
          ["Fee range in source", "₹1,00,000–₹1,46,668"],
          ["Early-bird discount", "25% mentioned"],
          ["Learning", "LMS, live/recorded learning and expert sessions"],
          ["Career support", "Placement assistance, internships, career guidance"],
        ],
      },
      {
        kind: "list",
        items: [
          "UGC-recognised/entitled online programmes",
          "Harvard and KPMG-powered course content mentioned in the source",
          "24×7 learner support and flexible/on-demand examinations",
          "Expert-led industry sessions on an LMS-based platform",
          "No-cost EMI and a seat-booking option mentioned in the source",
        ],
      },
      courseLinks("MSc", "online-msc"),
    ],
  },
  {
    heading: "MSc Mathematics: eligibility, fee and curriculum",
    blocks: [
      {
        kind: "p",
        text: "The supplied source states a bachelor's degree with Mathematics as a compulsory subject is required for this pathway.",
      },
      {
        kind: "table",
        caption: "MSc Mathematics fee stated in the source",
        head: ["Fee detail", "Amount"],
        rows: [
          ["Total fee", "₹1,00,000"],
          ["After 25% early-bird discount", "₹75,000"],
          ["Annual payment after discount", "₹37,500"],
          ["Semester payment after discount", "₹18,750"],
        ],
      },
      {
        kind: "table",
        caption: "MSc Mathematics semester-wise curriculum",
        head: ["Semester 1", "Semester 2", "Semester 3", "Semester 4"],
        rows: [
          [
            "Real Analysis I",
            "Functional Analysis",
            "Optimisation Techniques",
            "Fundamentals of LaTeX",
          ],
          ["Linear Algebra", "Abstract Algebra", "AI for All", "Programme Elective I"],
          [
            "Differential Equations",
            "Integral Equations & Calculus of Variations",
            "Programme Elective I",
            "Programme Elective II",
          ],
          ["Complex Analysis", "Topology", "Programme Elective II", "Programme Elective III"],
          [
            "Statistical Methods",
            "Numerical Analysis",
            "Programme Elective III",
            "Programme Elective IV",
          ],
        ],
      },
      {
        kind: "p",
        text: "The programme moves from broad mathematical areas toward computational, applied and pure mathematics through electives, building advanced reasoning, modelling, numerical methods, statistics, optimisation and mathematical documentation.",
      },
      counselCta("MSc"),
    ],
  },
  {
    heading: "MSc Data Science: eligibility, fee and curriculum",
    blocks: [
      {
        kind: "p",
        text: "The Data Science pathway is more technology-oriented, covering programming, algorithms, SQL, statistics, machine learning, big data, visualisation, deep learning and AI electives. Eligible backgrounds listed include B.A., BCA, B.Sc. in Statistics/Mathematics/Computer Science, B.E. and B.Tech, or an equivalent degree with Computer Science, Mathematics or Statistics.",
      },
      {
        kind: "table",
        caption: "MSc Data Science fee stated in the source",
        head: ["Fee detail", "Amount"],
        rows: [
          ["Total fee", "₹1,46,668"],
          ["After 25% early-bird discount", "₹1,10,001"],
          ["Annual payment after discount", "₹55,001"],
          ["Semester payment after discount", "₹27,500"],
        ],
      },
      {
        kind: "table",
        caption: "MSc Data Science semester-wise curriculum",
        head: ["Semester 1", "Semester 2", "Semesters 3–4"],
        rows: [
          [
            "Fundamentals of Programming – Python",
            "Software Engineering for Data Science",
            "Deep Learning",
          ],
          [
            "Design and Analysis of Algorithm",
            "Data Visualisation",
            "Electives by specialisation group",
          ],
          [
            "Evolutionary Algorithms and Numerical Optimisation",
            "Machine Learning",
            "Major Project",
          ],
          ["SQL Programming", "Big Data", "—"],
          ["Statistical Methods", "Statistical Inference", "—"],
        ],
      },
      {
        kind: "p",
        text: "Four elective groups are described — Data Analysis, Agentic AI, Applied AI and Generative AI — which pushes the programme beyond a traditional statistics course into current AI directions.",
      },
      verifyNote("These MSc fee figures"),
      comparePromo("MSc", "online-msc"),
    ],
  },
  {
    heading: "Mathematics vs Data Science: how to choose",
    blocks: [
      {
        kind: "table",
        caption: "Pathway comparison",
        head: ["Factor", "MSc Mathematics", "MSc Data Science"],
        rows: [
          ["Main focus", "Advanced mathematics", "Data + computing"],
          ["Programming", "Lower emphasis", "Strong emphasis"],
          ["Statistics", "Included", "Core area"],
          ["AI/ML", "Limited / elective exposure", "Stronger"],
          ["Python", "Not central", "Core"],
          ["Analytics career alignment", "Moderate to strong", "Strong"],
          ["Best for", "Mathematics-focused learners", "Tech/data-focused learners"],
        ],
      },
      {
        kind: "p",
        text: "Choose Mathematics if you enjoy mathematical theory, analysis, research, teaching or quantitative work. Choose Data Science if you want programming, analytics, machine learning, data engineering or AI-related work.",
      },
      courseLinks("MSc", "online-msc"),
    ],
  },
  {
    heading: "Admission process",
    blocks: [
      {
        kind: "list",
        ordered: true,
        items: [
          "Register on the CU Online portal.",
          "Open the MSc application form and pick the specialisation.",
          "Fill academic and personal details.",
          "Upload documents and pay the registration/application amount.",
          "Confirm admission — the source mentions ₹10,000 as a seat-booking amount.",
          "Receive LMS access and learning resources.",
        ],
      },
      {
        kind: "p",
        text: "The supplied MSc source describes direct online admission without an entrance exam.",
      },
      counselCta("MSc"),
    ],
  },
  {
    heading: "Careers, salary bands and placement support",
    blocks: [
      {
        kind: "table",
        caption: "Roles and indicative ranges cited in the source",
        head: ["Job role", "Salary range"],
        rows: [
          ["Data Engineer", "₹7–30 LPA"],
          ["Data Scientist", "₹8–26 LPA"],
          ["Financial Analyst", "₹7–25 LPA"],
          ["Research Scientist", "₹8–30 LPA"],
          ["Accountant", "₹8–25 LPA"],
        ],
      },
      noGuarantee,
      {
        kind: "list",
        items: [
          "Placement assistance and internship opportunities",
          "Career planning and industry partnerships",
          "Expert sessions, resume and interview support",
        ],
      },
      { kind: "h3", text: "Portfolio to build before you graduate" },
      {
        kind: "table",
        caption: "Portfolio by pathway",
        head: ["Pathway", "Build these"],
        rows: [
          [
            "Data Science",
            "Python and SQL projects, Power BI/Tableau dashboards, ML models, data-cleaning and end-to-end analytics projects",
          ],
          [
            "Mathematics",
            "Research work, mathematical modelling, statistical projects, computational mathematics, publications where relevant",
          ],
        ],
      },
    ],
  },
  {
    heading: "Is it worth it? Your MSc checklist",
    blocks: [
      {
        kind: "p",
        text: "The answer depends on the specialisation. Mathematics is stronger for learners who plan research, teaching, analytics or further academic study. Data Science connects more directly to the technology job market, but the degree must be supplemented with programming and portfolio work. Compare curriculum depth, practical work, assessment, faculty support, LMS, career services, current recognition and total cost against your own career target.",
      },
      {
        kind: "list",
        items: [
          "Confirm the exact specialisation and subject prerequisites",
          "Check the current fee and early-bird validity",
          "Verify EMI terms",
          "Review the semester-wise syllabus and elective groups",
          "Check project requirements and career services",
          "Verify current programme recognition",
        ],
      },
      comparePromo("MSc", "online-msc"),
    ],
  },
];

/* -------------------------------- BBA ---------------------------------- */

const bbaSections: PostSection[] = [
  {
    heading: "CU Online BBA 2026-27 at a glance",
    blocks: [
      {
        kind: "p",
        text: "For a BBA student the degree is only a starting point — the bigger decision is which business domain you build expertise in. CU Online's BBA material places heavy emphasis on specialisation and describes a dual-specialisation structure where you select two areas, from Marketing and HR to FinTech, Business Analytics, Artificial Intelligence and Entrepreneurship.",
      },
      {
        kind: "table",
        caption: "Course snapshot — CU Online BBA",
        head: ["Particular", "Details"],
        rows: [
          ["Degree", "Bachelor of Business Administration"],
          ["Mode / duration", "Online · 3 years · 6 semesters"],
          ["Eligibility", "10+2 or equivalent, any stream"],
          ["Specialisation model", "Dual specialisation · 15 stated"],
          ["Fee in supplied source", "₹1,75,000"],
          ["Early-bird figure", "₹1,31,250"],
          ["Payment", "Semester / annual / EMI"],
          ["Career support", "Placement assistance, internships, projects"],
        ],
      },
      courseLinks("BBA", "online-bba"),
    ],
  },
  {
    heading: "Why specialisation matters in a BBA",
    blocks: [
      {
        kind: "p",
        text: "A general BBA introduces management, marketing, finance, HR, operations and business communication. A specialisation goes deeper into one or more areas — and that choice shapes the skills you build, the internships you pursue, the projects on your CV, the entry-level jobs you can target, the certifications worth adding and your higher-study direction.",
      },
      {
        kind: "list",
        ordered: true,
        items: [
          "General BBA",
          "Marketing",
          "Digital Marketing",
          "Human Resource Management",
          "Banking and Finance",
          "FinTech",
          "International Business",
          "Entrepreneurship",
          "Family Business",
          "Artificial Intelligence",
          "Business Analytics",
        ],
      },
      {
        kind: "note",
        text: "The source describes 15 specialisation choices but explicitly names only these 11 areas. Verify the live university list before relying on the count.",
      },
      counselCta("BBA"),
    ],
  },
  {
    heading: "Dual specialisation combinations that work",
    blocks: [
      {
        kind: "table",
        caption: "Examples given in the supplied source",
        head: ["Combination", "What it builds"],
        rows: [
          [
            "Marketing + Digital Marketing",
            "Brand, digital campaign and customer-acquisition skills",
          ],
          [
            "Banking & Finance + Business Analytics",
            "Financial knowledge combined with data interpretation",
          ],
        ],
      },
      {
        kind: "p",
        text: "Pick the combination from your target role backwards, not by choosing two popular names.",
      },
    ],
  },
  {
    heading: "CU Online BBA fees and eligibility 2026-27",
    blocks: [
      {
        kind: "table",
        caption: "Fee components stated in the supplied source",
        head: ["Fee component", "Amount"],
        rows: [
          ["Standard programme fee", "₹1,75,000"],
          ["After early-bird scholarship", "₹1,31,250"],
          ["Approx. semester payment after scholarship", "₹21,875"],
          ["Approx. annual payment after scholarship", "₹43,750"],
          ["Early-bird scholarship", "Up to 25% in supplied source"],
          ["EMI", "No-cost EMI mentioned"],
        ],
      },
      {
        kind: "note",
        text: "An older CU source gives ₹1,68,000 before discount and ₹1,26,000 after. Because these conflict, use one current verified fee record for 2026-27 rather than both.",
      },
      {
        kind: "list",
        items: [
          "10+2 or equivalent, any stream",
          "Recognised board/university/council",
          "No entrance examination",
          "No specific age restriction stated in the source",
        ],
      },
      comparePromo("BBA", "online-bba"),
    ],
  },
  {
    heading: "Admission process and six-semester curriculum",
    blocks: [
      {
        kind: "list",
        ordered: true,
        items: [
          "Register on the online admission portal.",
          "Complete the application with personal and academic details.",
          "Upload Class 10/12 marksheets, identity proof and photograph.",
          "Pay the applicable fee online or through the EMI arrangement.",
          "Receive confirmation and LMS credentials after verification.",
        ],
      },
      {
        kind: "table",
        caption: "Years 1 and 2 subjects",
        head: ["Semester 1", "Semester 2", "Semester 3", "Semester 4"],
        rows: [
          [
            "Microeconomics",
            "Macroeconomics",
            "Logistics and Supply Chain Management",
            "Operations Research",
          ],
          [
            "Marketing Management",
            "Human Resource Management",
            "Research Methodology",
            "Commercial & Company Law",
          ],
          [
            "Accounting for Managers",
            "Business Mathematics and Statistics",
            "Universal Human Values, Ethics & Life Skills II",
            "Consumer Behaviour",
          ],
          [
            "Management Principles and Organisational Behaviour",
            "Professional Communication Skills",
            "Two specialisation electives",
            "Two specialisation electives",
          ],
          [
            "Communication Skills; Human Values, Ethics & Life Skills I",
            "Financial Management",
            "—",
            "—",
          ],
        ],
      },
      {
        kind: "table",
        caption: "Year 3 subjects",
        head: ["Semester 5", "Semester 6"],
        rows: [
          ["Strategic Management", "Industrial Relation and Labour Law"],
          ["Business Environment", "Dissertation / Capstone Project"],
          ["Banking & Insurance", "Two specialisation electives"],
          ["Stress Management", "—"],
          ["Two specialisation electives", "—"],
        ],
      },
      courseLinks("BBA", "online-bba"),
    ],
  },
  {
    heading: "Careers, placement support and salary bands",
    blocks: [
      {
        kind: "list",
        items: [
          "Placement assistance and career guidance",
          "Internships, case studies and project-based learning",
          "Capstone work, resume building and mock interviews",
          "Industry expert sessions across BFSI, FMCG, e-commerce and ITES",
        ],
      },
      {
        kind: "table",
        caption: "Career areas and example roles",
        head: ["Career area", "Example roles"],
        rows: [
          ["Marketing", "Marketing Executive, Brand Associate"],
          ["Digital Marketing", "Digital Marketing Executive, Social Media Manager"],
          ["HR", "HR Executive, Recruitment Associate"],
          ["Finance", "Financial Analyst, Banking Associate"],
          ["FinTech", "FinTech Analyst, Digital Banking Associate"],
          ["Business Analytics", "Data Analyst, BI Associate"],
          ["Entrepreneurship", "Founder, Business Consultant"],
          ["General Management", "Business Development Executive"],
        ],
      },
      {
        kind: "table",
        caption: "Indicative salary ranges cited in the source",
        head: ["Role", "Salary range"],
        rows: [
          ["Business Analyst", "₹4–19 LPA"],
          ["Marketing Manager", "₹4.5–18 LPA"],
          ["HR Specialist", "₹3–21 LPA"],
          ["Financial Analyst", "₹3–21.4 LPA"],
          ["Operations Manager", "₹4.5–18.8 LPA"],
          ["Project Coordinator", "₹6–24.6 LPA"],
          ["Management Consultant", "₹5.5–23.8 LPA"],
        ],
      },
      noGuarantee,
      counselCta("BBA"),
    ],
  },
  {
    heading: "Online vs regular BBA, skills and checklist",
    blocks: [
      {
        kind: "table",
        caption: "Mode comparison",
        head: ["Feature", "Online BBA", "Regular BBA"],
        rows: [
          ["Learning mode", "Online", "Classroom"],
          ["Flexibility", "High", "Lower"],
          ["Daily travel", "Not required", "Usually required"],
          ["Hostel", "Not required", "May be required"],
          ["Working alongside study", "Easier", "Less convenient"],
          ["Campus exposure", "Limited", "Higher"],
        ],
      },
      {
        kind: "table",
        caption: "Skills to build alongside the BBA",
        head: ["Direction", "Skills"],
        rows: [
          [
            "Business",
            "Excel, PowerPoint, business communication, presentations, financial basics, CRM tools",
          ],
          ["Analytics", "Advanced Excel, SQL, Power BI, basic statistics"],
          ["Marketing", "SEO, social media, Google Ads, content strategy, analytics"],
          [
            "Finance",
            "Financial modelling, accounting software, Excel, financial statement analysis",
          ],
        ],
      },
      {
        kind: "list",
        items: [
          "Confirm 10+2 eligibility and the current fee",
          "Verify the current specialisation list and dual-specialisation rules",
          "Check scholarship validity and EMI conditions",
          "Read the current syllabus and placement support terms",
          "Prepare academic documents and compare with alternatives",
        ],
      },
      comparePromo("BBA", "online-bba"),
    ],
  },
];

/* -------------------------------- posts --------------------------------- */

export const cuProgramPosts: Record<string, PostContent> = {
  "cu-online-mca-2026-27-complete-guide": {
    ...base,
    updated: UPDATED,
    intro:
      "Chandigarh University Online's MCA is a two-year, 80-credit postgraduate programme with five specialisation paths — Cloud Computing, Data Analytics, Agentic AI, Full Stack Development and AI & Machine Learning. The supplied source lists a total programme fee of ₹1,55,000, reduced to ₹1,16,250 under the stated early-bird discount, with annual and semester payment options plus no-cost EMI. Eligibility extends beyond BCA to any graduate who studied Mathematics, Business Mathematics, Programming or Statistics at 10+2 or graduation level.",
    keyTakeaways: [
      "Two years, four semesters, 80 credits with a common first-year computing core.",
      "Five specialisations, including a modern Agentic AI pathway covering LLM engineering and RAG systems.",
      "Source fee: ₹1,55,000, or ₹1,16,250 after the stated early-bird discount (₹29,063 per semester).",
      "Non-technical graduates can qualify with a Mathematics / Programming / Statistics subject at 10+2 or degree level.",
      "Application fee ₹500; ₹10,000 can be paid to secure the seat per the source.",
      "Indicative role salaries run from ₹3–6 LPA for network administration to ₹8–20 LPA for project management.",
    ],
    sections: mcaSections,
    faqs: [
      {
        question: "Is BCA compulsory for CU Online MCA?",
        answer:
          "No. The supplied eligibility also permits other graduation backgrounds when the Mathematics, Business Mathematics, Programming or Statistics condition is met at 10+2 or graduation level.",
      },
      {
        question: "What is the CU Online MCA fee?",
        answer:
          "The supplied source lists ₹1,55,000 before the early-bird reduction and ₹1,16,250 after it, which works out to ₹58,125 per year or ₹29,063 per semester. Reconfirm the live 2026-27 figure before paying.",
      },
      {
        question: "How many specialisations are offered?",
        answer:
          "Five: Cloud Computing, Data Analytics, Agentic AI, Full Stack Development, and AI & Machine Learning.",
      },
      {
        question: "Does the programme include AI and projects?",
        answer:
          "Yes. AI/ML and Agentic AI are both specialisation pathways, and the structure includes capstone/major project work in the final semester.",
      },
      {
        question: "Is placement guaranteed?",
        answer:
          "No. The university provides placement assistance, internships, resume support and mock interviews, but no job or salary guarantee.",
      },
      {
        question: "Can a B.Com graduate apply?",
        answer:
          "The supplied eligibility indicates a non-technical graduation can qualify if the required subject was studied at 10+2 or graduation level. Verify the current university rule before applying.",
      },
    ],
    related: relatedLinks,
  },

  "cu-online-mba-2026-27-complete-guide": {
    ...base,
    updated: UPDATED,
    intro:
      "Chandigarh University Online's MBA is a two-year, four-semester online management degree open to any graduate, with no CAT/MAT/XAT requirement and no mandatory work experience. The supplied source lists a semester fee of ₹41,250 (about ₹1,65,000 across four semesters), a dual-specialisation model with 23 stated options, 40+ live sessions and 80+ TA sessions per semester, and certification content linked to PwC India, PMI and Harvard Business Publishing.",
    keyTakeaways: [
      "Two-year, four-semester online MBA — bachelor's degree in any discipline is enough; CA/ICWA accepted.",
      "No national entrance exam and no compulsory work experience for the standard online MBA.",
      "Source fee: ₹41,250 per semester, roughly ₹1,65,000 of tuition across the programme, with no-cost EMI mentioned.",
      "Dual specialisation across 23 stated options — combine two domains around one career target.",
      "Learning model: 40+ live sessions, 20+ case studies and 80+ Teaching Assistant sessions each semester.",
      "300+ hiring partners are stated; treat this as placement assistance, not a job guarantee.",
    ],
    sections: mbaSections,
    faqs: [
      {
        question: "Is the Chandigarh University Online MBA two years?",
        answer: "Yes — the supplied programme information describes a two-year, four-semester MBA.",
      },
      {
        question: "Is an entrance exam required?",
        answer:
          "No. The supplied admission guide states no national entrance exam such as CAT, MAT or XAT is required for the standard online MBA; admission is based on the qualifying degree.",
      },
      {
        question: "What is the CU Online MBA semester fee?",
        answer:
          "The supplied source gives ₹41,250 per semester, approximately ₹1,65,000 of tuition across four semesters. Verify the current 2026-27 fee before you pay.",
      },
      {
        question: "Does CU Online offer dual specialisation?",
        answer:
          "Yes. The source describes a dual-specialisation model with 23 options, so you can pair two areas such as Marketing with Business Analytics.",
      },
      {
        question: "Is work experience compulsory?",
        answer: "No. The source states fresh graduates and working professionals can both apply.",
      },
      {
        question: "What documents are needed?",
        answer:
          "Typically graduation marksheets and degree certificate, Class 10 and 12 marksheets, government ID, a passport photograph, and an active email and mobile number.",
      },
    ],
    related: relatedLinks,
  },

  "cu-online-bca-2026-27-complete-guide": {
    ...base,
    updated: UPDATED,
    intro:
      "Chandigarh University Online's BCA is a three-year, six-semester, 120-credit undergraduate degree in computer applications, and the supplied source states Mathematics is not mandatory for admission — Science, Commerce and Arts students who clear 10+2 can apply. The source lists a total course fee of ₹1,77,000, reduced to ₹1,41,600 under the stated early-bird scholarship, and five specialisations: Data Science, Cloud Computing & Cyber Security, Agentic AI, UI/UX Design and AR & VR (Meta).",
    keyTakeaways: [
      "Three years, six semesters, 120 credits; 10+2 in any stream is the stated eligibility.",
      "Mathematics is not mandatory for admission, though it helps with logic, DSA and statistics.",
      "Source fee: ₹1,77,000 total, or ₹1,41,600 after the early-bird scholarship (₹23,600 per semester).",
      "Five specialisations including Agentic AI, UI/UX Design and AR & VR (Meta).",
      "Syllabus runs from programming and DBMS to machine learning, cloud native development and a live-industry capstone.",
      "Indicative role salaries range from ₹3–6 LPA for web development to ₹5–13.4 LPA for system analysis.",
    ],
    sections: bcaSections,
    faqs: [
      {
        question: "Is Mathematics compulsory for CU Online BCA?",
        answer:
          "No. The supplied source describes Mathematics as preferred and helpful rather than mandatory, so Commerce and Arts students who meet the 10+2 requirement can apply.",
      },
      {
        question: "What is the CU Online BCA total fee?",
        answer:
          "The supplied current source gives ₹1,77,000, with an early-bird figure of ₹1,41,600 — ₹47,200 per year or ₹23,600 per semester. Another older source differs, so verify the live 2026-27 fee.",
      },
      {
        question: "How many specialisations are listed?",
        answer:
          "Five: Data Science, Cloud Computing & Cyber Security, Agentic AI, UI/UX Design, and AR & VR (Meta).",
      },
      {
        question: "Is there a capstone project?",
        answer: "Yes. Semester 6 lists a capstone project with a live industry project.",
      },
      {
        question: "Can I pursue an MCA after this BCA?",
        answer:
          "BCA provides the undergraduate foundation commonly used for MCA admission, but eligibility must be checked with the specific MCA university — including any Mathematics or programming subject condition.",
      },
      {
        question: "Does CU guarantee a job?",
        answer:
          "No. Career assistance and hiring-partner access do not guarantee employment; outcomes depend on your skills, projects and interviews.",
      },
    ],
    related: relatedLinks,
  },

  "cu-online-msc-2026-27-complete-guide": {
    ...base,
    updated: UPDATED,
    intro:
      "Chandigarh University Online's MSc is a two-year, 80-credit postgraduate degree offered on two very different pathways. MSc Mathematics is priced at ₹1,00,000 in the supplied source (₹75,000 after the stated 25% early-bird discount) and requires a bachelor's degree with Mathematics as a compulsory subject. MSc Data Science is ₹1,46,668 (₹1,10,001 after discount) and accepts B.A., BCA, relevant B.Sc., B.E. and B.Tech backgrounds, with elective groups in Data Analysis, Agentic AI, Applied AI and Generative AI.",
    keyTakeaways: [
      "Two specialisations — Mathematics and Data Science — across two years, four semesters and 80 credits.",
      "Mathematics: ₹1,00,000 in source, ₹75,000 after the stated 25% early-bird discount (₹18,750 per semester).",
      "Data Science: ₹1,46,668 in source, ₹1,10,001 after discount (₹27,500 per semester).",
      "Data Science electives cover Data Analysis, Agentic AI, Applied AI and Generative AI, plus a major project.",
      "Direct online admission without an entrance exam; ₹10,000 seat-booking amount mentioned.",
      "Indicative role ranges cited: Data Engineer ₹7–30 LPA, Data Scientist ₹8–26 LPA, Research Scientist ₹8–30 LPA.",
    ],
    sections: mscSections,
    faqs: [
      {
        question: "What are the CU Online MSc specialisations?",
        answer: "The supplied source lists two: Mathematics and Data Science.",
      },
      {
        question: "What is the eligibility for MSc Mathematics?",
        answer:
          "A bachelor's degree with Mathematics as a compulsory subject, per the supplied source.",
      },
      {
        question: "Who can apply for MSc Data Science?",
        answer:
          "The source lists B.A., BCA, relevant B.Sc. (Statistics, Mathematics or Computer Science), B.E., B.Tech and equivalent degrees with Mathematics, Statistics or Computer Science.",
      },
      {
        question: "What are the MSc fees?",
        answer:
          "Mathematics is ₹1,00,000 and Data Science is ₹1,46,668 before the stated 25% early-bird discount, becoming ₹75,000 and ₹1,10,001 respectively after it.",
      },
      {
        question: "Does the Data Science pathway include AI?",
        answer:
          "Yes. The curriculum includes deep learning and elective groups covering agentic AI, applied AI and generative AI.",
      },
      {
        question: "Which MSc is better?",
        answer:
          "Neither is universally better. Mathematics suits academic, research and quantitative directions; Data Science suits technology, analytics and AI careers.",
      },
    ],
    related: relatedLinks,
  },

  "cu-online-bba-2026-27-complete-guide": {
    ...base,
    updated: UPDATED,
    intro:
      "Chandigarh University Online's BBA is a three-year, six-semester online undergraduate management degree built around a dual-specialisation model — students pick two business domains from a list that includes Marketing, Digital Marketing, HR, Banking and Finance, FinTech, International Business, Entrepreneurship, Family Business, Artificial Intelligence and Business Analytics. The supplied source lists a programme fee of ₹1,75,000, reduced to ₹1,31,250 under the stated early-bird scholarship, with 10+2 in any stream as the eligibility and no entrance examination.",
    keyTakeaways: [
      "Three years, six semesters, fully online, with 10+2 in any stream and no entrance exam.",
      "Dual specialisation: pick two domains — the source states 15 options and names 11 explicitly.",
      "Source fee: ₹1,75,000, or ₹1,31,250 after the stated early-bird scholarship (₹21,875 per semester).",
      "An older CU source gives ₹1,68,000 / ₹1,26,000 — use one verified current record, not both.",
      "Curriculum moves from economics and accounting into strategy, law and a final-semester dissertation/capstone.",
      "Placement ecosystem described across BFSI, FMCG, e-commerce and ITES with internships and mock interviews.",
    ],
    sections: bbaSections,
    faqs: [
      {
        question: "How many specialisations does CU Online BBA offer?",
        answer:
          "The supplied source says 15, but only 11 are explicitly named in the supplied table. Verify the live list before relying on the number.",
      },
      {
        question: "Can students choose two specialisations?",
        answer:
          "Yes. The source describes a dual-specialisation model, with examples such as Marketing + Digital Marketing and Banking & Finance + Business Analytics.",
      },
      {
        question: "What is the CU Online BBA fee?",
        answer:
          "The current-style source gives ₹1,75,000 before the early-bird scholarship and ₹1,31,250 after it — about ₹21,875 per semester. Verify the current figure before publication or payment.",
      },
      {
        question: "Is an entrance exam required?",
        answer:
          "No. The supplied source states admission is online and merit-based with no entrance examination.",
      },
      {
        question: "Does the course include a project?",
        answer:
          "Yes. The final semester includes dissertation/capstone work alongside two specialisation electives.",
      },
      {
        question: "Which BBA specialisation is best?",
        answer:
          "There is no universal best option. Define the target role first, check real hiring demand, then read the actual electives and projects for that specialisation.",
      },
    ],
    related: relatedLinks,
  },
};
