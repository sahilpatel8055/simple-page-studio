import type { PostContent } from "@/data/posts";
import type { Article } from "@/lib/content";

const base = { reviewer: "Kartik Ahuja", reviewerRole: "Education Research Lead, AVEDU" };
const UPDATED = "2026-08-18";

export const nsouCourseArticles: Article[] = [
  {
    slug: "nsou-mba-distance-course-fees-admission-2026",
    title: "NSOU MBA Distance Course 2026: Admission, Fees & Specialisations",
    excerpt:
      "Everything on the NSOU MBA distance programme — eligibility, fee range, specialisations, exams and the career roles it targets.",
    category: "Admission Guidance",
    categorySlug: "admission-guidance",
    tags: ["nsou-mba", "nsou-distance-mba", "nsou-admission", "distance-education"],
    author: "Kartik Ahuja",
    authorSlug: "kartik-ahuja",
    date: "2026-08-18",
    readingTime: "11 min",
    kind: "blog",
  },
  {
    slug: "nsou-mcom-distance-admission-process-2026",
    title: "NSOU Distance M.Com Admission Process 2026: ABC ID, DEB ID & Fees",
    excerpt:
      "The full NSOU M.Com admission workflow — eligibility, fee breakup, ABC/DEB ID requirements, documents and course structure.",
    category: "Admission Guidance",
    categorySlug: "admission-guidance",
    tags: ["nsou-mcom", "deb-id", "abc-id", "distance-mcom", "nsou-admission"],
    author: "Kartik Ahuja",
    authorSlug: "kartik-ahuja",
    date: "2026-08-18",
    readingTime: "10 min",
    kind: "blog",
  },
  {
    slug: "nsou-admission-form-2026-steps-documents",
    title: "NSOU Admission Form 2026: Direct Links, Steps & Documents",
    excerpt:
      "How to fill the NSOU admission form correctly in 2026 — official portals, the 10-step process, eligibility and common mistakes to avoid.",
    category: "Admission Guidance",
    categorySlug: "admission-guidance",
    tags: ["nsou-admission-form", "nsou-2026", "distance-education", "admission-steps"],
    author: "Kartik Ahuja",
    authorSlug: "kartik-ahuja",
    date: "2026-08-18",
    readingTime: "9 min",
    kind: "blog",
  },
  {
    slug: "nsou-courses-best-picks-for-jobs-career-scope",
    title: "Best NSOU Courses for Jobs: Career Scope Across Every Stream",
    excerpt:
      "From education and media to IT skills and healthcare management — a stream-wise look at which NSOU courses lead where.",
    category: "Career Growth",
    categorySlug: "career-growth",
    tags: ["nsou-courses", "career-scope", "distance-education", "job-oriented-courses"],
    author: "Kartik Ahuja",
    authorSlug: "kartik-ahuja",
    date: "2026-08-18",
    readingTime: "10 min",
    kind: "blog",
  },
];

export const nsouCoursePosts: Record<string, PostContent> = {
  /* ============================ POST 1: MBA Distance Course ============================ */
  "nsou-mba-distance-course-fees-admission-2026": {
    ...base,
    updated: UPDATED,
    intro:
      "The NSOU MBA Distance Course is built for working professionals and students who want management skills without attending regular classes — a UGC-DEB approved postgraduate programme running a minimum of 2 years, admitted online through the official university portal. This guide walks through eligibility, the approximate fee range, specialisations, learning support, exams and the career roles it targets, in the order you actually need to decide and apply.",
    keyTakeaways: [
      "Minimum duration is 2 years, delivered in distance mode with UGC-DEB approval and online admission.",
      "Eligibility is a bachelor's degree from a recognised university plus minimum qualifying marks as per university norms; work experience may be preferred but is not always mandatory.",
      "Total programme fee is approximately INR 30,000-50,000, or roughly INR 15,000-25,000 per year, with registration and examination fees charged separately.",
      "Specialisations offered: Marketing Management, Human Resource Management, Finance Management and Operations Management.",
      "Study support runs through Self-Learning Material (SLM), an LMS, and Learner Support Centres (LSCs) for counselling and academic help.",
      "Indicative career roles include Marketing Manager, HR Manager, Financial Analyst and Operations Manager, with salaries ranging roughly INR 4-12 LPA depending on role and experience.",
    ],
    sections: [
      {
        heading: "Programme snapshot",
        blocks: [
          {
            kind: "table",
            caption: "NSOU MBA Distance Course — key highlights",
            head: ["Key highlight", "Details"],
            rows: [
              ["University", "Netaji Subhas Open University"],
              ["Mode", "Distance learning"],
              ["Duration", "2 years (minimum)"],
              ["Approval", "UGC-DEB approved"],
              ["Admission mode", "Online"],
              ["Course type", "Professional postgraduate programme"],
            ],
          },
        ],
      },
      {
        heading: "Eligibility criteria",
        blocks: [
          {
            kind: "list",
            items: [
              "Bachelor's degree from a recognised university.",
              "Minimum qualifying marks as per university norms.",
              "Work experience may be preferred but is not always mandatory.",
            ],
          },
          {
            kind: "note",
            text: "Course-specific eligibility should always be checked in the latest university notification before applying.",
          },
        ],
      },
      {
        heading: "Admission process for 2026",
        blocks: [
          {
            kind: "p",
            text: "The 2026 admission cycle is expected to run entirely online through the official NSOU admission portal, open to candidates applying from anywhere in India, subject to the latest programme notification.",
          },
          {
            kind: "list",
            ordered: true,
            items: [
              "Visit the official NSOU admission portal.",
              "Register with a valid email ID and mobile number.",
              "Fill out the application form carefully.",
              "Upload photograph, signature and academic documents.",
              "Pay the applicable fee online.",
              "Submit the form and download confirmation.",
            ],
          },
          {
            kind: "note",
            text: "Any entrance or merit-based selection criteria should be checked in the latest university notification.",
          },
        ],
      },
      {
        heading: "Fee structure",
        blocks: [
          {
            kind: "table",
            caption: "NSOU MBA Distance Course fee structure (approximate)",
            head: ["Fee component", "Amount (approx.)"],
            rows: [
              ["Total programme fee", "INR 30,000-50,000"],
              ["Per-year fee", "INR 15,000-25,000"],
              ["Registration fee", "As per notification"],
              ["Examination fee", "Separate"],
            ],
          },
          {
            kind: "note",
            text: "Fees may vary with university updates and programme conditions — verify the exact amount from the current university notification.",
          },
          {
            kind: "cta",
            title: "Confirm the current NSOU MBA fee for your session",
            body: "Fee figures shift by session — tell us when you plan to apply and we will check the latest notification for you.",
            buttonLabel: "Confirm current fee",
          },
        ],
      },
      {
        heading: "Specialisations available",
        blocks: [
          {
            kind: "list",
            items: [
              "Marketing Management",
              "Human Resource Management",
              "Finance Management",
              "Operations Management",
            ],
          },
        ],
      },
      {
        heading: "Study material, LMS and learner support",
        blocks: [
          {
            kind: "list",
            items: [
              "Self-Learning Material (SLM) in print or digital form.",
              "Learning Management System (LMS) for online modules and updates.",
              "Learner Support Centres (LSCs) for counselling and academic help.",
              "Assignment and examination schedules communicated through official student updates.",
            ],
          },
        ],
      },
      {
        heading: "Examinations and evaluation",
        blocks: [
          {
            kind: "list",
            items: [
              "Many programmes require assignments before Term-End Examinations (TEE).",
              "TEE dates and admit cards are published through official notices.",
              "Evaluation may include theory examinations and assignments/projects depending on the programme.",
              "Results and grade cards are published through the university examination system.",
            ],
          },
        ],
      },
      {
        heading: "Career opportunities after the MBA",
        blocks: [
          {
            kind: "table",
            caption: "Indicative roles and average salary",
            head: ["Job role", "Average salary (INR)"],
            rows: [
              ["Marketing Manager", "5-10 LPA"],
              ["HR Manager", "4-8 LPA"],
              ["Financial Analyst", "5-9 LPA"],
              ["Operations Manager", "6-12 LPA"],
            ],
          },
          {
            kind: "note",
            text: "Actual salary depends on experience, employer, location, skills and role — treat these as indicative ranges only.",
          },
          {
            kind: "links",
            title: "Related reading",
            items: [
              { label: "NSOU admission form: steps and documents", href: "/blogs/nsou-admission-form-2026-steps-documents" },
              { label: "Best NSOU courses for jobs", href: "/blogs/nsou-courses-best-picks-for-jobs-career-scope" },
              { label: "Explore NSOU", href: "/universities/nsou" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: "What is the duration of the NSOU MBA Distance Course?",
        answer: "A minimum of 2 years.",
      },
      {
        question: "What is the approximate total MBA fee?",
        answer: "INR 30,000-50,000, subject to official updates for your admission cycle.",
      },
      {
        question: "Is admission online?",
        answer: "Yes, admission is conducted online through the official NSOU admission portal.",
      },
      {
        question: "What documents are generally needed?",
        answer: "Photograph, signature and academic documents are among the listed requirements; exact document lists should be checked against the current notification.",
      },
      {
        question: "What specialisations does the NSOU MBA offer?",
        answer: "Marketing Management, Human Resource Management, Finance Management and Operations Management.",
      },
    ],
    sources: [{ label: "NSOU official website", href: "https://www.wbnsou.ac.in" }],
    related: [
      { label: "NSOU university profile", href: "/universities/nsou" },
      { label: "Online MBA course guide", href: "/courses/online-mba" },
      { label: "Compare universities", href: "/compare" },
    ],
    cta: "Deciding between NSOU and another distance MBA? Share your budget and target specialisation and we will compare the options for you.",
  },

  /* ============================ POST 2: Distance MCom ============================ */
  "nsou-mcom-distance-admission-process-2026": {
    ...base,
    updated: UPDATED,
    intro:
      "NSOU's Distance M.Com (programme code PGCO) is a two-year postgraduate commerce degree run under the School of Professional Studies through Open and Distance Learning. Unlike many distance programmes, it has a confirmed, published fee — INR 7,600 total, with INR 4,550 payable in year one. This guide covers eligibility, the exact fee breakup, the ABC ID/DEB ID requirement and the full admission workflow.",
    keyTakeaways: [
      "Programme code PGCO, run by the School of Professional Studies, 2 years in Open and Distance Learning mode.",
      "Total programme fee is confirmed at INR 7,600, split as INR 4,550 in year one (INR 3,800 tuition + INR 750 other fee) and INR 3,800 in year two.",
      "Eligibility is B.Com, BBA or BBM (or equivalent commerce/business qualification) under the 10+2+3 pattern.",
      "Both an ABC ID and a DEB ID are required as part of the online admission process — the DEB ID is stated as mandatory for ODL learners.",
      "The 12-step admission process runs from reading the notification through to downloading the provisional enrolment certificate.",
      "The curriculum covers managerial accounting, financial management, corporate tax planning, strategic management, audit and research methodology.",
    ],
    sections: [
      {
        heading: "Programme overview",
        blocks: [
          {
            kind: "table",
            caption: "NSOU Distance M.Com — key particulars",
            head: ["Particular", "Details"],
            rows: [
              ["University name", "Netaji Subhas Open University"],
              ["Short name", "NSOU"],
              ["Course name", "Master of Commerce"],
              ["Programme code", "PGCO"],
              ["School", "School of Professional Studies"],
              ["Mode", "Open and Distance Learning"],
              ["Course level", "Postgraduate"],
              ["Duration", "2 years"],
              ["Eligibility", "B.Com, BBA, BBM, or equivalent commerce/business qualification under 10+2+3 pattern"],
              ["Programme fee", "INR 7,600"],
              ["First-year payable amount", "INR 4,550, excluding bank/payment gateway charges"],
              ["Admission mode", "Online application and verification"],
            ],
          },
          {
            kind: "p",
            text: "The programme covers advanced areas of commerce, accounting, finance, business management, taxation, corporate governance, auditing and research methods — intended for learners who want postgraduate commerce study without joining a regular college.",
          },
        ],
      },
      {
        heading: "Eligibility criteria",
        blocks: [
          {
            kind: "table",
            caption: "Eligibility for NSOU Distance M.Com",
            head: ["Eligibility type", "Requirement"],
            rows: [
              ["Non-CBCS qualification", "B.Com, BBA, or BBM under 10+2+3 pattern"],
              ["CBCS qualification", "Graduate under 10+2+3 with relevant Commerce, Business Administration or Business Management background"],
              ["Course level", "Postgraduate"],
              ["Admission mode", "Online application followed by verification"],
              ["Programme code", "PGCO"],
            ],
          },
        ],
      },
      {
        heading: "Fee breakup",
        blocks: [
          {
            kind: "table",
            caption: "NSOU Distance M.Com fees",
            head: ["Fee component", "Amount"],
            rows: [
              ["First-year programme fee", "INR 3,800"],
              ["Other fee", "INR 750"],
              ["First-year payable amount", "INR 4,550"],
              ["Second-year programme fee", "INR 3,800"],
              ["Total programme fee", "INR 7,600"],
              ["Extra charges", "Bank/payment gateway charges, if applicable"],
            ],
          },
          {
            kind: "note",
            text: "The 'other fee' covers enrolment, identity-cum-registration card, annual development, migration and application processing components.",
          },
        ],
      },
      {
        heading: "ABC ID and DEB ID: what you need before applying",
        blocks: [
          {
            kind: "table",
            caption: "ID and reference requirements",
            head: ["ID / reference", "Purpose"],
            rows: [
              ["ABC ID", "Academic credit record and online admission requirement where specified"],
              ["DEB ID", "Mandatory for ODL learners as stated in university material"],
              ["Anti-Ragging reference number", "Required during final admission process"],
              ["Application ID", "Login and admission-status tracking"],
            ],
          },
          {
            kind: "cta",
            title: "Not sure how to generate an ABC ID or DEB ID?",
            body: "We'll walk you through both before you start the NSOU M.Com application.",
            buttonLabel: "Get admission help",
          },
        ],
      },
      {
        heading: "Step-by-step admission process",
        blocks: [
          {
            kind: "list",
            ordered: true,
            items: [
              "Read the notification, eligibility, fee details and instructions.",
              "Create an ABC ID.",
              "Create a DEB ID.",
              "Visit the NSOU PG admission website.",
              "Register with correct personal details.",
              "Select M.Com / PGCO and complete the application.",
              "Upload photograph, signature and academic documents.",
              "Wait for online eligibility verification.",
              "Pay the programme fee after approval.",
              "Submit/verify the DEB ID and anti-ragging undertaking reference.",
              "Download the payment confirmation.",
              "Download the provisional enrolment certificate and SLM token when available.",
            ],
          },
        ],
      },
      {
        heading: "Documents required",
        blocks: [
          {
            kind: "list",
            items: [
              "Passport-size photograph",
              "Signature",
              "Class 10 certificate",
              "Class 12 marksheet",
              "Graduation marksheets",
              "B.Com/BBA/BBM degree or provisional certificate",
              "Category certificate, if applicable",
              "Non-Creamy Layer certificate, if applicable",
              "Valid ID proof",
              "ABC ID",
              "DEB ID",
              "Fee receipt",
              "Application form copy",
            ],
          },
        ],
      },
      {
        heading: "Verification, payment status and course structure",
        blocks: [
          {
            kind: "table",
            caption: "Online verification and fee payment status",
            head: ["Application status", "Student action"],
            rows: [
              ["Verified & approved", "Pay admission fee"],
              ["Re-edit required", "Correct details or upload proper documents"],
              ["Rejected", "Apply afresh if eligible and allowed"],
              ["Payment completed", "Submit DEB ID and anti-ragging reference"],
              ["Final confirmation", "Download payment receipt and provisional enrolment certificate"],
            ],
          },
          {
            kind: "table",
            caption: "M.Com course structure",
            head: ["Subject area", "Learning focus"],
            rows: [
              ["Accounting", "Managerial accounting, international accounting, financial statement analysis"],
              ["Finance", "Financial management, security analysis, portfolio management"],
              ["Taxation", "Corporate tax planning and management"],
              ["Management", "Strategic management, marketing management, human resource management"],
              ["Audit", "Audit and assurance service"],
              ["Research", "Research methodology"],
              ["Business technology", "Computer applications in business"],
            ],
          },
          {
            kind: "links",
            title: "Related reading",
            items: [
              { label: "NSOU admission form: steps and documents", href: "/blogs/nsou-admission-form-2026-steps-documents" },
              { label: "Explore NSOU", href: "/universities/nsou" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: "What is the programme code for NSOU Distance M.Com?",
        answer: "PGCO.",
      },
      {
        question: "What is the total programme fee?",
        answer: "INR 7,600, split as INR 4,550 payable in year one and INR 3,800 in year two.",
      },
      {
        question: "How much is payable in year one?",
        answer: "INR 4,550, excluding applicable bank or payment gateway charges.",
      },
      {
        question: "Is a DEB ID required?",
        answer: "Yes, it is stated as mandatory for ODL (Open and Distance Learning) learners.",
      },
      {
        question: "What is the eligibility for this M.Com?",
        answer: "B.Com, BBA or BBM (or an equivalent commerce/business qualification) under the 10+2+3 pattern.",
      },
    ],
    sources: [{ label: "NSOU official website", href: "https://www.wbnsou.ac.in" }],
    related: [
      { label: "NSOU university profile", href: "/universities/nsou" },
      { label: "Online M.Com course guide", href: "/courses/online-mcom" },
      { label: "Compare universities", href: "/compare" },
    ],
    cta: "Want help generating your ABC ID and DEB ID before the M.Com application deadline? Get in touch and we'll guide you through it.",
  },

  /* ============================ POST 3: Admission Form / Steps ============================ */
  "nsou-admission-form-2026-steps-documents": {
    ...base,
    updated: UPDATED,
    intro:
      "Filling the NSOU admission form correctly is the first hurdle for anyone applying to Netaji Subhas Open University in 2026. NSOU is a state open university in West Bengal offering undergraduate, postgraduate, diploma and certificate programmes through official programme-wise admission portals. This guide lays out the direct links, the 10-step form process, eligibility by level, required documents and the mistakes that most often delay an application.",
    keyTakeaways: [
      "NSOU offers BA, BSc, BCom, BLIS at UG level; MA, MSc, MCom, MLIS at PG level; plus diploma and certificate courses.",
      "The undergraduate admission portal is ug.wbnsouadmissions.com; the main university website is wbnsou.ac.in — use only official links.",
      "Eligibility is 10+2 or equivalent for UG programmes and a bachelor's degree from a recognised university for PG programmes; professional/specialised programmes may add subject or marks conditions.",
      "The admission form process runs across 10 defined steps, from portal registration to downloading the confirmation and payment proof.",
      "PG applicants specifically need graduation marksheets and a degree or provisional certificate ready before starting the form.",
      "The most common mistakes are incorrect academic details, unclear or oversized document uploads, waiting until the final date, skipping the final review, and using unofficial admission links.",
    ],
    sections: [
      {
        heading: "About NSOU",
        blocks: [
          {
            kind: "p",
            text: "NSOU is a state open university in West Bengal offering open and distance learning across undergraduate, postgraduate, diploma and certificate programmes, using official programme-wise admission portals rather than one single application system.",
          },
          {
            kind: "table",
            caption: "Programmes offered",
            head: ["Level", "Programmes mentioned"],
            rows: [
              ["Undergraduate", "BA, BSc, BCom, BLIS"],
              ["Postgraduate", "MA, MSc, MCom, MLIS"],
              ["Other", "Diploma and certificate courses"],
            ],
          },
        ],
      },
      {
        heading: "Direct links to the admission form",
        blocks: [
          {
            kind: "list",
            items: [
              "Undergraduate admission portal: https://ug.wbnsouadmissions.com",
              "Main university website: https://www.wbnsou.ac.in",
            ],
          },
          {
            kind: "note",
            text: "Use only official links and verify the current programme notification before submission.",
          },
        ],
      },
      {
        heading: "Step-by-step process to fill the form",
        blocks: [
          {
            kind: "list",
            ordered: true,
            items: [
              "Visit the official admission portal.",
              "New applicant registration.",
              "Login to the dashboard.",
              "Select the desired programme.",
              "Fill personal details.",
              "Enter academic qualifications.",
              "Upload required documents.",
              "Pay the admission fee.",
              "Review and submit.",
              "Download and save the confirmation/payment proof.",
            ],
          },
          {
            kind: "cta",
            title: "Get a document checklist before you start",
            body: "Tell us which NSOU programme you're applying to and we'll send the exact document list for it.",
            buttonLabel: "Get my checklist",
          },
        ],
      },
      {
        heading: "Eligibility by programme level",
        blocks: [
          {
            kind: "table",
            caption: "Eligibility for NSOU admission 2026",
            head: ["Programme type", "Eligibility mentioned"],
            rows: [
              ["Undergraduate", "10+2 or equivalent"],
              ["Postgraduate", "Bachelor's degree from a recognised university"],
              ["Professional/specialised", "May include subject background or minimum marks"],
            ],
          },
          {
            kind: "note",
            text: "Course-specific eligibility should always be checked in the latest official notification.",
          },
        ],
      },
      {
        heading: "Documents required",
        blocks: [
          {
            kind: "list",
            items: [
              "Recent passport-size photograph",
              "Scanned signature",
              "Class 10 marksheet and certificate",
              "Class 12 marksheet and certificate",
              "Graduation marksheets and degree certificate for PG applicants",
              "Valid photo ID proof",
              "Caste certificate, if applicable",
              "Any additional certificate mentioned in the prospectus",
            ],
          },
        ],
      },
      {
        heading: "Common mistakes to avoid",
        blocks: [
          {
            kind: "list",
            items: [
              "Entering incorrect academic details.",
              "Uploading unclear or oversized documents.",
              "Waiting until the final date.",
              "Skipping the final form review.",
              "Ignoring eligibility conditions.",
              "Using unofficial admission links.",
            ],
          },
          {
            kind: "links",
            title: "Related reading",
            items: [
              { label: "NSOU MBA distance course, admission and fees", href: "/blogs/nsou-mba-distance-course-fees-admission-2026" },
              { label: "NSOU M.Com admission process", href: "/blogs/nsou-mcom-distance-admission-process-2026" },
              { label: "Explore NSOU", href: "/universities/nsou" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Where should students apply?",
        answer: "Through the official programme-wise admission portal — for example, the UG portal at ug.wbnsouadmissions.com.",
      },
      {
        question: "What should PG applicants keep ready?",
        answer: "Graduation marksheets and a degree or provisional certificate, among other documents.",
      },
      {
        question: "Are offline applications normally used?",
        answer: "Online application is the normal process unless an official notification states otherwise.",
      },
      {
        question: "What programmes can I apply for?",
        answer: "BA, BSc, BCom, BLIS at UG level; MA, MSc, MCom, MLIS at PG level; plus diploma and certificate courses.",
      },
    ],
    sources: [{ label: "NSOU official website", href: "https://www.wbnsou.ac.in" }],
    related: [
      { label: "NSOU university profile", href: "/universities/nsou" },
      { label: "NSOU M.Com admission process", href: "/blogs/nsou-mcom-distance-admission-process-2026" },
      { label: "Admission guidance hub", href: "/admissions" },
    ],
    cta: "Filling the NSOU form for the first time? Send us a screenshot of any step you're stuck on and we'll help you fix it.",
  },

  /* ============================ POST 4: Career Scope Across Courses ============================ */
  "nsou-courses-best-picks-for-jobs-career-scope": {
    ...base,
    updated: UPDATED,
    intro:
      "Choosing the right NSOU course is less about the degree name and more about matching it to a career direction, schedule and skill gap. NSOU's catalogue spans education, languages, media, counselling, IT, business administration, healthcare and technical-service tracks — many combinable as a degree plus a skill-based certificate or diploma. This guide breaks the options down by career direction and gives a five-point framework for picking one.",
    keyTakeaways: [
      "NSOU pairs degree and vocational tracks across education, languages, media, counselling, IT, business administration, and health/safety/technical services.",
      "Education-focused picks include UG Honours in Education, M.A. in Education, B.Ed./M.Ed. Special Education and a Diploma in Inclusive Education.",
      "IT and digital skill tracks include Digital Marketing, Web Design and Development, Graphic Design, Video Editing, ERP/Digital Application Analyst training, IT Applications and Cyber Laws.",
      "Business and administration options include Business Administration, Entrepreneurship Development & Small Business Management, Modern Office Management and Hospital Front Office Management.",
      "Health, safety and technical-service tracks cover Fire Safety, Health Care Management, AC & Refrigeration Technician and Electrical Technician courses.",
      "The recommended approach is to choose one strong academic path and, where useful, pair it with a practical, job-ready skill.",
    ],
    sections: [
      {
        heading: "Why NSOU's course mix works for job-oriented learners",
        blocks: [
          {
            kind: "list",
            items: [
              "Multiple study areas across humanities, education and vocational learning.",
              "Degree plus skill-based certificate/diploma combinations.",
              "Programme listings organised by school.",
              "Flexible learning supported by study centres, PCP schedules and official notices.",
            ],
          },
        ],
      },
      {
        heading: "Teaching and education careers",
        blocks: [
          {
            kind: "table",
            caption: "Education-oriented programmes",
            head: ["NSOU pick", "Potential career direction"],
            rows: [
              ["UG Honours in Education (HED)", "Teaching support, education support, further studies"],
              ["M.A. in Education (PGED)", "Education support, academic pathways"],
              ["B.Ed. Special Education", "Special education support where eligible"],
              ["M.Ed. Special Education", "Advanced special education-related pathways"],
              ["One-Year Diploma in Inclusive Education", "Inclusive education support"],
            ],
          },
          {
            kind: "note",
            text: "Teaching and professional roles depend on eligibility and additional requirements beyond the degree itself.",
          },
        ],
      },
      {
        heading: "Language, writing and media careers",
        blocks: [
          {
            kind: "p",
            text: "Possible directions include content writing, editing, academic writing, language training and communication-focused corporate roles. Teaching roles depend on applicable eligibility requirements.",
          },
          {
            kind: "list",
            items: [
              "B.A. (BDP) Bengali (EBG)",
              "B.A. (BDP) English (EEG)",
              "M.A. Bengali (PGBG)",
              "M.A. English (PGEG)",
              "M.A. English Language Teaching (PGET)",
              "Diploma in English Language Teaching (DELT)",
            ],
          },
          {
            kind: "p",
            text: "For media, journalism, PR and communication, possible directions include journalism support, media research, content teams, PR support, social media content, branding support, advertising coordination and copywriting — where portfolio development matters most.",
          },
          {
            kind: "list",
            items: [
              "Advance Diploma in Journalism & Mass Communication (ADJMC)",
              "Advance Diploma in Public Relations and Advertising (ADPR&Ad.)",
            ],
          },
        ],
      },
      {
        heading: "Counselling, psychology and people-focused careers",
        blocks: [
          {
            kind: "p",
            text: "These programmes are positioned as skill-building options for counselling support, student guidance, NGO/community work and HR support.",
          },
          {
            kind: "list",
            items: [
              "Advanced Diploma in Psychological Counselling",
              "Advanced Diploma in Psychological Testing",
            ],
          },
          {
            kind: "note",
            text: "Clinical practice may require additional licensing or eligibility requirements beyond the diploma.",
          },
        ],
      },
      {
        heading: "IT, digital and job-ready skill tracks",
        blocks: [
          {
            kind: "table",
            caption: "IT and digital skill courses",
            head: ["Course / skill", "Potential direction"],
            rows: [
              ["Digital Marketing Certificate", "Digital marketing and social media support"],
              ["Web Design and Development Diploma", "Junior web/front-end support"],
              ["Graphic Design / Publishing", "Junior design and publishing support"],
              ["Video Editing", "Video editing assistant roles"],
              ["ERP / Digital Application Analyst training", "ERP/application support"],
              ["Information Technology Applications", "IT support-oriented skills"],
              ["Cyber Laws Certificate", "Cyber-law knowledge and support roles"],
            ],
          },
        ],
      },
      {
        heading: "Business, administration, health and technical-service careers",
        blocks: [
          {
            kind: "table",
            caption: "Business and administration programmes",
            head: ["Programme", "Potential direction"],
            rows: [
              ["Business Administration", "Office/business support"],
              ["Entrepreneurship Development & Small Business Management", "Small-business setup support"],
              ["Modern Office Management", "Office administration and operations"],
              ["Hospital Front Office Management", "Front-office and service-sector roles"],
            ],
          },
          {
            kind: "list",
            items: [
              "Fire Safety Skills and Security Management — safety/compliance support",
              "Fire and Safety Skills — entry-level safety support",
              "Health Care Management — healthcare administration support",
              "AC & Refrigeration Technician — technical service work",
              "Electrical Technician — technical service work",
            ],
          },
          {
            kind: "note",
            text: "Actual employment in these tracks depends on practical training, employer requirements and local demand.",
          },
          {
            kind: "cta",
            title: "Not sure which NSOU stream fits your goal?",
            body: "Tell us the job or sector you're targeting and we'll match it to the right NSOU course and skill pairing.",
            buttonLabel: "Get a course match",
          },
        ],
      },
      {
        heading: "A five-point framework to choose your course",
        blocks: [
          {
            kind: "table",
            caption: "How to choose the right NSOU course",
            head: ["Check", "Question to ask"],
            rows: [
              ["1. Job goal", "What role or sector do I want?"],
              ["2. Eligibility", "Do I meet course-specific qualification requirements?"],
              ["3. Duration", "Can I commit to the programme duration?"],
              ["4. Time", "Can I maintain weekly study targets?"],
              ["5. Skill pairing", "Should I combine a degree with a job-ready skill?"],
            ],
          },
          {
            kind: "links",
            title: "Related reading",
            items: [
              { label: "NSOU MBA distance course, admission and fees", href: "/blogs/nsou-mba-distance-course-fees-admission-2026" },
              { label: "NSOU admission form: steps and documents", href: "/blogs/nsou-admission-form-2026-steps-documents" },
              { label: "Explore NSOU", href: "/universities/nsou" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Which NSOU options are useful for IT skills?",
        answer: "Digital marketing, web design, graphic design, video editing, ERP/application training, IT applications and cyber laws.",
      },
      {
        question: "Which options support education careers?",
        answer: "Education UG/PG programmes and special education programmes, including B.Ed./M.Ed. Special Education and the Diploma in Inclusive Education.",
      },
      {
        question: "Is a degree alone enough for jobs?",
        answer: "Pairing academic study with a practical, job-ready skill is recommended wherever useful, rather than relying on the degree alone.",
      },
      {
        question: "Are there options for healthcare and technical service careers?",
        answer: "Yes — Health Care Management, Fire Safety and Security Management, AC & Refrigeration Technician and Electrical Technician courses.",
      },
    ],
    sources: [{ label: "NSOU official website", href: "https://www.wbnsou.ac.in" }],
    related: [
      { label: "NSOU university profile", href: "/universities/nsou" },
      { label: "Career guidance hub", href: "/career" },
      { label: "Compare universities", href: "/compare" },
    ],
    cta: "Want a shortlist of NSOU courses matched to a specific job goal? Share your target role and we will map it to the right combination.",
  },
};
