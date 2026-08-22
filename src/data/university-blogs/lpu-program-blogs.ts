/**
 * LPU programme blueprint blogs (2026-27).
 *
 * One in-depth blog per LPU programme — MBA, MCA, BBA, BCA, MCom and BCom
 * Distance — each following the same six-part blueprint:
 *   1. Overview & 2026-27 details
 *   2. Admission & eligibility
 *   3. Fees, scholarships & EMI
 *   4. Courses, curriculum & specialisations
 *   5. Recognition & accreditation
 *   6. Placements, recruiters, careers & salary
 *
 * Data is transcribed from the supplied LPU source documents in
 * `src/data/blogs data/LPU_*.md`. Figures are presented as source-stated and
 * indicative, never as guaranteed outcomes.
 */

import type { PostBlock, PostContent, PostSection } from "@/data/posts";
import type { Article } from "@/lib/content";

const base = { reviewer: "Kartik Ahuja", reviewerRole: "Education Research Lead, Degreekhojo" };
const UPDATED = "2026-08-17";
const UNI = "/universities/lpu-online";

const courseLinks = (programme: string, slug: string): PostBlock => ({
  kind: "links",
  title: `LPU ${programme} pages on Degreekhojo`,
  items: [
    { label: `LPU Online ${programme} course page`, href: `${UNI}/courses/${slug}` },
    { label: `${programme} fees at LPU`, href: `${UNI}/courses/${slug}/fees` },
    { label: "LPU Online university overview", href: UNI },
    { label: "LPU admission process", href: `${UNI}/admission` },
    { label: "LPU placements", href: `${UNI}/placement` },
    { label: "LPU scholarships", href: `${UNI}/scholarships` },
  ],
});

const counselCta = (programme: string): PostBlock => ({
  kind: "cta",
  title: `Check your ${programme} eligibility in 2 minutes`,
  body: "Share your details and a counsellor will confirm eligibility, the current fee slab and the documents you need.",
  buttonLabel: "Get free guidance",
});

const feePromo = (programme: string, slug: string): PostBlock => ({
  kind: "promo",
  title: `Compare LPU ${programme} fees with other universities`,
  body: "See the semester fee, total cost and EMI options side by side before you pay the registration fee.",
  ctaLabel: "Open the comparison",
  href: `/compare/${slug}`,
});

const verifyNote = (what: string): PostBlock => ({
  kind: "note",
  text: `${what} are reproduced from LPU's published programme material. Fee slabs, grants and admission rules change between cycles, so reconfirm the current figures with the university before you pay.`,
});

/* ------------------------------- articles ------------------------------- */

export const lpuProgramArticles: Article[] = [
  {
    slug: "lpu-online-mba-2026-27-complete-guide",
    title: "LPU Online MBA 2026-27: Fees, Admission, Curriculum & Careers",
    excerpt:
      "Complete LPU Online MBA blueprint — semester fees, eligibility routes including CA/CS/CMA, four-semester curriculum, approvals and career roles.",
    category: "Study Guides",
    categorySlug: "study-guides",
    tags: ["lpu-online", "mba", "fees", "admission", "curriculum", "2026-27"],
    author: "Kartik Ahuja",
    authorSlug: "kartik-ahuja",
    date: UPDATED,
    readingTime: "16 min",
    kind: "blog",
  },
  {
    slug: "lpu-online-mca-2026-27-complete-guide",
    title: "LPU Online MCA 2026-27: Fees, Eligibility, Syllabus & Jobs",
    excerpt:
      "LPU Online MCA in depth — Rs 1,08,000 total fee, maths eligibility rule, semester-wise syllabus, specialisation areas and IT career paths.",
    category: "Study Guides",
    categorySlug: "study-guides",
    tags: ["lpu-online", "mca", "fees", "syllabus", "careers", "2026-27"],
    author: "Kartik Ahuja",
    authorSlug: "kartik-ahuja",
    date: UPDATED,
    readingTime: "17 min",
    kind: "blog",
  },
  {
    slug: "lpu-online-bba-2026-27-complete-guide",
    title: "LPU Online BBA 2026-27: Fees, Admission, Subjects & Careers",
    excerpt:
      "LPU Online BBA guide — Rs 20,000 per semester, Rs 1,20,000 total, 10+2 eligibility with no age limit, subject list and management career paths.",
    category: "Study Guides",
    categorySlug: "study-guides",
    tags: ["lpu-online", "bba", "fees", "admission", "careers", "2026-27"],
    author: "Kartik Ahuja",
    authorSlug: "kartik-ahuja",
    date: UPDATED,
    readingTime: "14 min",
    kind: "blog",
  },
  {
    slug: "lpu-online-bca-2026-27-complete-guide",
    title: "LPU Online BCA 2026-27: Fees, Semester Syllabus & Careers",
    excerpt:
      "LPU Online BCA explained — semester fee and grant history, semester-wise syllabus from programming to AI, recognition and IT career options.",
    category: "Study Guides",
    categorySlug: "study-guides",
    tags: ["lpu-online", "bca", "fees", "syllabus", "careers", "2026-27"],
    author: "Kartik Ahuja",
    authorSlug: "kartik-ahuja",
    date: UPDATED,
    readingTime: "15 min",
    kind: "blog",
  },
  {
    slug: "lpu-online-mcom-2026-27-complete-guide",
    title: "LPU Online MCom 2026-27: Fees, Curriculum, Recruiters & Salary",
    excerpt:
      "LPU Online MCom blueprint — Rs 25,000 semester fee, four-semester commerce curriculum, recruiter list and indicative salary ranges by role.",
    category: "Study Guides",
    categorySlug: "study-guides",
    tags: ["lpu-online", "mcom", "fees", "curriculum", "salary", "2026-27"],
    author: "Kartik Ahuja",
    authorSlug: "kartik-ahuja",
    date: UPDATED,
    readingTime: "16 min",
    kind: "blog",
  },
  {
    slug: "lpu-bcom-distance-education-2026-27-complete-guide",
    title: "LPU BCom Distance Education 2026-27: Fees, Subjects & Salary",
    excerpt:
      "LPU BCom distance learning guide — Rs 10,500 semester / Rs 57,000 lump-sum fee, subject list, career areas and indicative salary bands.",
    category: "Study Guides",
    categorySlug: "study-guides",
    tags: ["lpu-online", "bcom", "distance", "fees", "salary", "2026-27"],
    author: "Kartik Ahuja",
    authorSlug: "kartik-ahuja",
    date: UPDATED,
    readingTime: "14 min",
    kind: "blog",
  },
];

/* -------------------------------- bodies -------------------------------- */

const mbaSections: PostSection[] = [
  {
    heading: "Overview & 2026-27 details",
    blocks: [
      {
        kind: "p",
        text: "LPU's Online MBA is a postgraduate management programme built for students and working professionals who need flexibility alongside advanced business education. The programme focuses on leadership, analytical thinking, decision-making, finance, marketing, human resources, operations, business analytics and entrepreneurship.",
      },
      {
        kind: "table",
        caption: "LPU Online MBA at a glance",
        head: ["Particular", "Details"],
        rows: [
          ["Course", "Master of Business Administration (MBA)"],
          ["Level", "Postgraduate"],
          ["Duration", "2 years / 4 semesters"],
          ["Mode", "Online"],
          ["Learning", "Live + recorded lectures"],
          ["Learning support", "LMS, digital content and faculty support"],
          ["Career support", "Placement assistance and professional enhancement"],
          ["Semester fee in source", "Rs 49,000 in highlights; Rs 40,400 in fee table"],
        ],
      },
      {
        kind: "p",
        text: "The source material lists UGC entitlement, NAAC A++ accreditation and AICTE approval for the university. Those are institution-level credentials, so confirm the exact status attached to the Online MBA for the session you are joining.",
      },
      courseLinks("Online MBA", "online-mba"),
    ],
  },
  {
    heading: "Admission & eligibility",
    blocks: [
      { kind: "h3", text: "Who is eligible" },
      {
        kind: "list",
        items: [
          "A bachelor's degree in any discipline from a recognised university.",
          "CS qualification from ICSI.",
          "CA or CMA qualification, subject to applicable university rules.",
        ],
      },
      { kind: "h3", text: "Step-by-step admission process" },
      {
        kind: "list",
        ordered: true,
        items: [
          "Visit the LPU Online admission portal.",
          "Select the Online MBA programme.",
          "Register with your mobile number and email ID.",
          "Complete the application form with personal and academic details.",
          "Upload the required documents.",
          "Pay the applicable registration and programme fee.",
          "Submit the application.",
          "Complete document verification and wait for admission confirmation.",
        ],
      },
      { kind: "h3", text: "Documents required" },
      {
        kind: "list",
        items: [
          "Passport-size photograph",
          "Scanned signature",
          "Graduation marksheets and degree certificate",
          "Valid identity proof",
          "Address proof",
        ],
      },
      counselCta("LPU Online MBA"),
    ],
  },
  {
    heading: "Fees, scholarships & EMI",
    blocks: [
      {
        kind: "p",
        text: "LPU's published MBA material carries two different semester-fee figures, so both are shown here separately rather than merged into one claim.",
      },
      {
        kind: "table",
        caption: "LPU Online MBA fee figures",
        head: ["Fee item", "Figure stated"],
        rows: [
          ["Semester fee in course highlights", "Rs 49,000"],
          ["Course fee in fee table", "Rs 40,400 per semester"],
          ["Registration fee", "Rs 1,000 one-time"],
          ["Examination fee", "Included in the semester fee"],
          ["Total programme fee in fee table", "Rs 1,61,600"],
        ],
      },
      verifyNote("These MBA fee figures"),
      {
        kind: "p",
        text: "Because the fee is charged per semester, the cash outflow at admission is one semester's fee plus the one-time registration charge rather than the full programme cost. Ask the counselling desk whether a no-cost EMI plan is running for the current intake before you choose annual or lump-sum payment.",
      },
      feePromo("MBA", "online-mba"),
    ],
  },
  {
    heading: "Courses, curriculum & specialisations",
    blocks: [
      { kind: "h3", text: "Semester 1" },
      {
        kind: "list",
        items: [
          "Organisational Behaviour",
          "Managerial Economics",
          "Accounting for Managers",
          "Marketing Management",
          "Business Communication",
        ],
      },
      { kind: "h3", text: "Semester 2" },
      {
        kind: "list",
        items: [
          "Human Resource Management",
          "Financial Management",
          "Operations Management",
          "Research Methodology",
          "Business Environment",
        ],
      },
      { kind: "h3", text: "Semester 3" },
      {
        kind: "list",
        items: [
          "Strategic Management",
          "Business Analytics",
          "Specialisation subjects",
          "Elective courses",
        ],
      },
      { kind: "h3", text: "Semester 4" },
      {
        kind: "list",
        items: [
          "International Business",
          "Entrepreneurship Development",
          "Capstone Project",
          "Specialisation subjects",
        ],
      },
      {
        kind: "note",
        text: "LPU states that the Online MBA offers multiple career-focused specialisations but does not publish a complete list for 2026-27. Confirm the exact electives available in your intake before choosing a track.",
      },
    ],
  },
  {
    heading: "Recognition & accreditation",
    blocks: [
      {
        kind: "table",
        caption: "Credentials referenced for LPU",
        head: ["Credential", "What it applies to"],
        rows: [
          ["UGC entitlement", "Permission to offer degrees in online mode"],
          ["NAAC A++", "University-level accreditation"],
          ["AICTE approval", "Management/technical programme approval at institution level"],
          ["AIU membership", "Association of Indian Universities membership"],
          ["Global recognition", "Claimed in university material; scope varies by country"],
        ],
      },
      {
        kind: "p",
        text: "University accreditation, programme entitlement and professional approval are three different things. A UGC-entitled online degree carries the same standing as an on-campus degree under the 2020 equivalence notification, but that equivalence applies to the entitled programme, not to every claim made around it.",
      },
    ],
  },
  {
    heading: "Placements, recruiters, careers & salary",
    blocks: [
      { kind: "h3", text: "Roles graduates target" },
      {
        kind: "list",
        items: [
          "Marketing Manager",
          "Financial Analyst",
          "Human Resource Manager",
          "Operations Manager",
          "Business Development Manager",
          "Project Manager",
          "Business Analyst",
          "Management Consultant",
          "Product Manager",
          "Entrepreneur",
        ],
      },
      { kind: "h3", text: "Placement support" },
      {
        kind: "p",
        text: "LPU describes placement assistance and professional development support for online learners — career guidance, skill development, interview preparation and industry-oriented activities. Placement assistance is support, not a job guarantee.",
      },
      {
        kind: "note",
        text: "LPU does not publish a programme-specific salary table for the Online MBA. Pay depends on prior experience, specialisation, skills, employer, location and market conditions, so treat any circulating figure as indicative market data rather than an LPU outcome.",
      },
      counselCta("LPU Online MBA"),
    ],
  },
];

const mcaSections: PostSection[] = [
  {
    heading: "Overview & 2026-27 details",
    blocks: [
      {
        kind: "p",
        text: "LPU's Online MCA combines computing fundamentals with advanced technical concepts and practical work, aimed at graduates moving into software development, data, cloud computing and cybersecurity roles.",
      },
      {
        kind: "table",
        caption: "LPU Online MCA at a glance",
        head: ["Particular", "Details"],
        rows: [
          ["Course name", "Master of Computer Applications (MCA)"],
          ["University", "Lovely Professional University"],
          ["Duration", "2 years"],
          ["Total semesters", "4"],
          ["Learning mode", "Online"],
          ["Eligibility", "Bachelor's degree with Mathematics at 10+2 or graduation level"],
          ["Total fees", "Rs 1,08,000"],
          ["Approvals", "UGC entitled"],
          ["Examination mode", "Online"],
          ["Admission process", "Online application"],
        ],
      },
      { kind: "h3", text: "Why learners pick LPU for an MCA" },
      {
        kind: "list",
        items: [
          "UGC-recognised university with an established academic profile",
          "Professionally relevant curriculum",
          "Practical assignments, projects and case studies",
          "Flexible online learning support",
          "Digital study materials",
          "Career guidance and placement assistance",
          "Exposure to technologies used in the software industry",
        ],
      },
      courseLinks("Online MCA", "online-mca"),
    ],
  },
  {
    heading: "Admission & eligibility",
    blocks: [
      { kind: "h3", text: "Eligibility criteria" },
      {
        kind: "list",
        items: [
          "A bachelor's degree from a recognised institution.",
          "Mathematics studied at 10+2 level or during graduation.",
          "Minimum qualification requirements prescribed by the university must be met.",
          "Students from different academic backgrounds may apply if they satisfy the applicable conditions.",
        ],
      },
      {
        kind: "note",
        text: "The Mathematics requirement is the condition that most often blocks an MCA application. Check your 10+2 and degree transcripts before you pay the registration fee.",
      },
      { kind: "h3", text: "Admission process" },
      {
        kind: "list",
        ordered: true,
        items: [
          "Register on the admission portal with your email ID and mobile number.",
          "Fill the application form with personal and educational details.",
          "Upload photograph, signature, graduation marksheets and identity proof.",
          "Pay the applicable registration fee online.",
          "Complete document verification.",
          "Receive admission confirmation and access to the student learning portal.",
        ],
      },
      counselCta("LPU Online MCA"),
    ],
  },
  {
    heading: "Fees, scholarships & EMI",
    blocks: [
      {
        kind: "table",
        caption: "LPU Online MCA fee structure",
        head: ["Fee particular", "Amount"],
        rows: [
          ["Registration fee", "Rs 600 (one-time)"],
          ["Examination fee", "Rs 2,000 per semester"],
          ["Semester fee", "Rs 28,000 per semester"],
          ["Annual fee", "Rs 54,000"],
          ["Total programme fee", "Rs 1,08,000"],
          ["Duration", "2 years (4 semesters)"],
        ],
      },
      {
        kind: "p",
        text: "Fees can be paid semester-wise or annually depending on the options open at the time of admission, which keeps the entry cost close to Rs 30,000 rather than the full programme fee.",
      },
      { kind: "h3", text: "Scholarships mentioned" },
      {
        kind: "list",
        items: [
          "Merit-based scholarships",
          "LPUNEST-based scholarships",
          "Scholarships for outstanding academic achievements",
          "Special financial assistance schemes offered by the university",
        ],
      },
      verifyNote("These MCA fee and scholarship figures"),
      feePromo("MCA", "online-mca"),
    ],
  },
  {
    heading: "Courses, curriculum & specialisations",
    blocks: [
      {
        kind: "table",
        caption: "LPU Online MCA semester-wise curriculum",
        head: ["Semester", "Subjects"],
        rows: [
          [
            "Semester I",
            "Programming Fundamentals, Database Management Systems, Computer Organization, Operating Systems, Software Engineering",
          ],
          [
            "Semester II",
            "Data Structures, Computer Networks, Web Technologies, Object-Oriented Programming, Design and Analysis of Algorithms",
          ],
          [
            "Semester III",
            "Cloud Computing, Artificial Intelligence, Data Analytics, Mobile Application Development, Machine Learning",
          ],
          [
            "Semester IV",
            "Major Project, Cyber Security, Emerging Technologies, Software Testing, Industry-Oriented Electives",
          ],
        ],
      },
      { kind: "h3", text: "Specialisation areas" },
      {
        kind: "list",
        items: [
          "Artificial Intelligence",
          "Data Science",
          "Cyber Security",
          "Cloud Computing",
          "Full Stack Development",
          "Software Engineering",
          "Database Management",
          "Machine Learning concepts",
        ],
      },
      {
        kind: "p",
        text: "The structure moves from programming and systems fundamentals in year one to cloud, AI, analytics and a major project in year two, so the portfolio you build in semesters III and IV is what employers actually assess.",
      },
    ],
  },
  {
    heading: "Recognition & accreditation",
    blocks: [
      {
        kind: "table",
        caption: "What applies to the Online MCA",
        head: ["Item", "Status in LPU material"],
        rows: [
          ["Online MCA entitlement", "UGC entitled"],
          ["University accreditation", "NAAC A++ (institution level)"],
          ["Examination mode", "Online"],
          [
            "Degree equivalence",
            "Online degrees treated on par with conventional degrees under UGC rules",
          ],
        ],
      },
      {
        kind: "p",
        text: "Before enrolling, confirm that the MCA appears in the UGC/DEB entitled programme list for the session you are joining — entitlement is granted per programme, per mode and per session.",
      },
    ],
  },
  {
    heading: "Placements, recruiters, careers & salary",
    blocks: [
      { kind: "h3", text: "Roles after an MCA" },
      {
        kind: "list",
        items: [
          "Software Developer",
          "Full Stack Developer",
          "Data Analyst",
          "System Analyst",
          "Cloud Engineer",
          "Cyber Security Analyst",
          "Database Administrator",
          "Web Developer",
          "Mobile Application Developer",
          "AI & Machine Learning Associate",
        ],
      },
      { kind: "h3", text: "Placement support offered" },
      {
        kind: "list",
        items: [
          "Career guidance sessions",
          "Placement drives",
          "Industry interactions",
          "Training programmes",
          "Technical skill development",
          "Live projects",
          "Internship exposure",
          "Programming and practical exercises",
        ],
      },
      {
        kind: "note",
        text: "LPU does not publish a verified salary table for the Online MCA, so no average or highest package is stated here. Outcomes depend on technical skills, projects, experience, interview performance, employer and location.",
      },
      counselCta("LPU Online MCA"),
    ],
  },
];

const bbaSections: PostSection[] = [
  {
    heading: "Overview & 2026-27 details",
    blocks: [
      {
        kind: "p",
        text: "LPU's Online BBA is an undergraduate management degree for learners who want business fundamentals — management, finance, marketing, human resources, entrepreneurship and business communication — in a flexible format.",
      },
      {
        kind: "table",
        caption: "LPU Online BBA at a glance",
        head: ["Particular", "Details"],
        rows: [
          ["Course", "Online Bachelor of Business Administration (BBA)"],
          ["University", "Lovely Professional University"],
          ["Duration", "3 years / 6 semesters"],
          ["Mode", "Fully online"],
          ["Eligibility", "10+2 or equivalent, subject to current university rules"],
          ["Learning support", "LMS, live classes, recorded lectures and digital study material"],
          ["Suitable for", "Freshers, working learners, entrepreneurs and business aspirants"],
        ],
      },
      {
        kind: "p",
        text: "Delivery is LMS-based with live online classes, recorded lectures, digital study material, online assessments and academic support — designed so you can take an undergraduate management degree without relocating.",
      },
      courseLinks("Online BBA", "online-bba"),
    ],
  },
  {
    heading: "Admission & eligibility",
    blocks: [
      {
        kind: "p",
        text: "Applicants need 10+2 or an equivalent qualification from a recognised board. Students from any stream may be eligible subject to the university's current rules, and LPU states there is no maximum age restriction for the Online BBA.",
      },
      { kind: "h3", text: "Five-step admission" },
      {
        kind: "list",
        ordered: true,
        items: [
          "Registration — register through the LPU admission portal.",
          "Application form — enter personal, contact and educational details.",
          "Upload documents — academic certificates, photograph, signature and identity proof.",
          "Fee payment — pay the registration and programme fee using the available options.",
          "Verification & confirmation — after verification the university confirms admission and releases learning access.",
        ],
      },
      { kind: "h3", text: "Documents commonly required" },
      {
        kind: "list",
        items: [
          "Class 10 and 12 academic documents",
          "Identity proof",
          "Passport-size photograph",
          "Scanned signature",
          "Any other documents requested by the university",
        ],
      },
      counselCta("LPU Online BBA"),
    ],
  },
  {
    heading: "Fees, scholarships & EMI",
    blocks: [
      {
        kind: "table",
        caption: "LPU Online BBA fee structure",
        head: ["Fee component", "Amount"],
        rows: [
          ["Registration fee", "Rs 600 one-time"],
          ["Semester fee", "Rs 20,000"],
          ["Annual fee", "Rs 40,000"],
          ["Total programme fee", "Rs 1,20,000"],
          ["EMI", "Available as per LPU's published options"],
        ],
      },
      {
        kind: "p",
        text: "Semester-wise, annual, full-programme and EMI payment routes are offered. The programme fee is described as covering live classes, recorded sessions, digital study material, LMS access, assignments and tests, academic assistance and online examination support.",
      },
      verifyNote("These BBA fee and EMI figures"),
      feePromo("BBA", "online-bba"),
    ],
  },
  {
    heading: "Courses, curriculum & specialisations",
    blocks: [
      {
        kind: "table",
        caption: "Core BBA subject areas",
        head: ["Foundation subjects", "Advanced subjects"],
        rows: [
          ["Principles of Management", "Financial Management"],
          ["Financial Accounting", "Consumer Behaviour"],
          ["Business Economics", "Business Law"],
          ["Marketing Management", "Digital Marketing"],
          ["Human Resource Management", "Strategic Management"],
          ["Organisational Behaviour", "Operations Management"],
          ["Business Communication", "Entrepreneurship Development"],
          ["Business Statistics", "Project Work"],
        ],
      },
      {
        kind: "p",
        text: "The curriculum is built to develop analytical thinking, communication, leadership and decision-making alongside business knowledge, closing with project work in the final year.",
      },
      {
        kind: "note",
        text: "LPU does not publish a complete 2026-27 BBA specialisation list. Confirm the elective tracks available in your intake before enrolling if a specific specialisation matters to you.",
      },
    ],
  },
  {
    heading: "Recognition & accreditation",
    blocks: [
      {
        kind: "p",
        text: "LPU describes the Online BBA as a UGC-entitled online degree offered by a NAAC A++ accredited university. Read those two credentials separately: accreditation is institutional, entitlement is what lets the university award this degree online.",
      },
      {
        kind: "list",
        items: [
          "University-level accreditation — NAAC grade for the institution",
          "Online programme entitlement — UGC permission for the online mode",
          "Applicable online education regulations for the session",
          "Degree recognition and equivalence where officially stated",
        ],
      },
      {
        kind: "note",
        text: "No university can promise guaranteed acceptance by a specific employer or higher-education institution. Verify the current regulatory status from official sources before you apply.",
      },
    ],
  },
  {
    heading: "Placements, recruiters, careers & salary",
    blocks: [
      { kind: "h3", text: "Career areas" },
      {
        kind: "list",
        items: [
          "Business Development",
          "Marketing",
          "Human Resources",
          "Sales",
          "Finance",
          "Operations",
          "Customer Relationship Management",
          "Entrepreneurship",
          "Management support functions",
        ],
      },
      {
        kind: "p",
        text: "LPU lists career support including resume preparation, interview preparation, skill-development programmes and career guidance for online learners.",
      },
      {
        kind: "note",
        text: "There is no reliable BBA-specific salary table published for 2026-27, so none is invented here. Pay depends on role, skills, experience, location, employer and market conditions — and placement support is not a guaranteed job.",
      },
      { kind: "h3", text: "Who the programme suits" },
      {
        kind: "list",
        items: [
          "Students who have completed 10+2",
          "Working learners who need a bachelor's degree",
          "Students planning an MBA next",
          "Aspiring entrepreneurs",
          "Anyone who needs flexible business education",
        ],
      },
      counselCta("LPU Online BBA"),
    ],
  },
];

const bcaSections: PostSection[] = [
  {
    heading: "Overview & 2026-27 details",
    blocks: [
      {
        kind: "p",
        text: "LPU's Online BCA is a flexible undergraduate computing degree covering programming, databases, web development, data structures, operating systems, software engineering and artificial intelligence.",
      },
      {
        kind: "table",
        caption: "LPU Online BCA at a glance",
        head: ["Particular", "Details"],
        rows: [
          ["Course", "Online Bachelor of Computer Applications (BCA)"],
          ["University", "Lovely Professional University"],
          ["Duration", "3 years"],
          ["Mode", "Online"],
          ["Eligibility", "10+2 or equivalent, subject to current university rules"],
          ["Learning", "Live and recorded sessions"],
          ["Support", "LMS, digital resources, academic guidance and projects"],
        ],
      },
      courseLinks("Online BCA", "online-bca"),
    ],
  },
  {
    heading: "Admission & eligibility",
    blocks: [
      {
        kind: "p",
        text: "Candidates with 10+2 or an equivalent qualification can apply, and eligibility is described as open to students from any stream subject to university rules.",
      },
      {
        kind: "list",
        ordered: true,
        items: [
          "Register on the admission portal.",
          "Complete the application form.",
          "Enter personal and educational information.",
          "Upload the required documents.",
          "Pay the applicable registration or programme fee.",
          "Complete verification.",
          "Receive admission confirmation and learning-platform access.",
        ],
      },
      {
        kind: "p",
        text: "Documents typically requested are academic marksheets, identity proof, a passport-size photograph and a scanned signature.",
      },
      counselCta("LPU Online BCA"),
    ],
  },
  {
    heading: "Fees, scholarships & EMI",
    blocks: [
      {
        kind: "table",
        caption: "BCA fee figures published by LPU",
        head: ["Fee type", "Amount"],
        rows: [
          ["Actual fee per semester", "Rs 30,000"],
          ["20% student grant fee", "Rs 24,400 per semester"],
          ["20% grant + no-cost EMI", "Rs 6,100/month for 24 months"],
          ["Grant + 10% extra waiver, lump sum", "Rs 1,32,960 total"],
        ],
      },
      {
        kind: "note",
        text: "The 20% student grant in this fee sheet was valid until 28 February 2025. Treat these as historical promotional figures, not as a live 2026-27 offer, and ask for the current fee slab and EMI terms before paying.",
      },
      {
        kind: "p",
        text: "The useful takeaway is the pricing shape rather than the exact number: LPU prices the BCA per semester, layers a percentage grant on top, and offers a no-cost EMI plan plus an extra waiver for lump-sum payment. Ask which of those three levers is running in your intake.",
      },
      feePromo("BCA", "online-bca"),
    ],
  },
  {
    heading: "Courses, curriculum & specialisations",
    blocks: [
      {
        kind: "table",
        caption: "LPU Online BCA semester-wise subjects",
        head: ["Semester", "Subjects"],
        rows: [
          [
            "Semester 1",
            "Fundamentals of IT, Programming Methodology, Discrete Structures, English Communication Skills, Environmental Sciences",
          ],
          [
            "Semester 2",
            "Database Management Systems, Object-Oriented Programming, Computer Networks, Computer System Architecture, Advanced English Communication Skills",
          ],
          [
            "Semester 3",
            "Fundamentals of Web Programming, Data Structures, Community Development Project, Operating System",
          ],
          [
            "Semester 4",
            "Software Engineering, Artificial Intelligence, Skill Enhancement Course I, Generic Elective I",
          ],
          [
            "Semesters 5 and 6",
            "Discipline-specific electives, skill-enhancement courses, generic electives and a field project",
          ],
        ],
      },
      {
        kind: "p",
        text: "Semesters 1 to 4 are fixed core computing; the last year is where you choose electives and build a field project, which is the part recruiters look at.",
      },
    ],
  },
  {
    heading: "Recognition & accreditation",
    blocks: [
      {
        kind: "table",
        caption: "Credentials referenced for the BCA",
        head: ["Credential", "Scope"],
        rows: [
          ["NAAC A++", "University accreditation"],
          ["UGC-DEB approval", "Online/distance programme regulatory status"],
          ["Degree equivalence", "Online degrees on par with conventional degrees"],
          ["Rankings", "Historical references — always read the ranking year"],
        ],
      },
      {
        kind: "note",
        text: "Ranking references in LPU's BCA material are historical. Only current, session-applicable regulatory information should influence your decision.",
      },
    ],
  },
  {
    heading: "Placements, recruiters, careers & salary",
    blocks: [
      { kind: "h3", text: "Career pathways" },
      {
        kind: "list",
        items: [
          "Software Development",
          "Full Stack Development",
          "Web Development",
          "Data Analysis",
          "Database Administration",
          "Cloud Computing",
          "Cybersecurity",
          "Software Testing",
          "AI/ML-related roles",
          "IT support and systems roles",
        ],
      },
      {
        kind: "p",
        text: "LPU lists placement assistance, internships and live projects, career workshops and industry exposure for BCA learners, and references exposure to recruiters including Amazon, TCS, Microsoft and Wipro alongside a 2,000+ recruiter figure.",
      },
      {
        kind: "note",
        text: "Those recruiter references are university-wide, not Online BCA placement guarantees, and no verified BCA salary table is published. Judge the programme on curriculum and flexibility, then build skills and projects to drive the outcome.",
      },
      counselCta("LPU Online BCA"),
    ],
  },
];

const mcomSections: PostSection[] = [
  {
    heading: "Overview & 2026-27 details",
    blocks: [
      {
        kind: "p",
        text: "LPU's Online MCom is a postgraduate commerce degree covering accounting, finance, banking, taxation, management and international business. LPU is a private university established in 2005 and began offering online programmes in November 2021.",
      },
      {
        kind: "table",
        caption: "LPU Online MCom at a glance",
        head: ["Particular", "Details"],
        rows: [
          ["Course", "Online MCom"],
          ["Duration", "2 years"],
          ["Semesters", "4"],
          ["Mode", "Online"],
          ["Registration fee", "Rs 600"],
          ["Semester fee", "Rs 25,000"],
          ["Focus", "Commerce and finance"],
        ],
      },
      courseLinks("Online MCom", "online-m-com"),
    ],
  },
  {
    heading: "Admission & eligibility",
    blocks: [
      {
        kind: "list",
        items: [
          "10+2 completed from a recognised board.",
          "A bachelor's degree in Commerce, Management, Economics, Accounts or Mathematics.",
          "One of the specified subjects, or an equivalent course, studied at degree level.",
        ],
      },
      { kind: "h3", text: "Admission process" },
      {
        kind: "list",
        ordered: true,
        items: [
          "Register and pay the registration fee.",
          "Complete the application form.",
          "Upload the required documents.",
          "Pay the applicable programme fee.",
          "Wait for document review.",
          "Receive admission confirmation and LMS login details.",
        ],
      },
      counselCta("LPU Online MCom"),
    ],
  },
  {
    heading: "Fees, scholarships & EMI",
    blocks: [
      {
        kind: "table",
        caption: "MCom fee figures published by LPU",
        head: ["Fee detail", "Amount"],
        rows: [
          ["Semester fee", "Rs 25,000"],
          ["Standard fee", "Rs 90,800 total / Rs 22,700 per semester"],
          ["Lump-sum programme fee", "Rs 1,00,000"],
          ["Up to 25% student grant", "Rs 81,600 total"],
          ["Alternate grant figure stated", "Rs 74,240 total"],
          ["Registration fee", "Rs 600"],
        ],
      },
      {
        kind: "note",
        text: "These overlapping figures come from different LPU fee sheets and one promotion was marked valid until 10 January 2025. Ask for a single written fee schedule for your intake rather than relying on any one of these numbers.",
      },
      feePromo("MCom", "online-m-com"),
    ],
  },
  {
    heading: "Courses, curriculum & specialisations",
    blocks: [
      {
        kind: "table",
        caption: "LPU Online MCom semester-wise curriculum",
        head: ["Semester", "Subjects"],
        rows: [
          [
            "Semester 1",
            "Managerial Economics; Organisational Behaviour and Human Resource Dynamics; Financial Reporting, Statements and Analysis; Fundamentals of Research; Fundamentals of Information Technology",
          ],
          [
            "Semester 2",
            "Corporate Tax Structure and Planning; Research Methodology; International Business Environment; Marketing Management; Generic Elective I",
          ],
          [
            "Semester 3",
            "Corporate Strategy and Entrepreneurship; Forensic Accounting and Fraud Examination; International Banking and Forex Management; International Accounting; Project or GE basket course",
          ],
          [
            "Semester 4",
            "Management Science; International Financial Management; Generic Elective III; Generic Elective IV; Term Paper or elective basket course",
          ],
        ],
      },
      { kind: "h3", text: "Skills the programme builds" },
      {
        kind: "table",
        caption: "Skill areas listed by LPU",
        head: ["Finance & accounting", "Strategy & analysis"],
        rows: [
          ["Financial analysis", "Strategic planning"],
          ["Advanced accounting", "Economic forecasting"],
          ["Taxation", "Data interpretation"],
          ["Auditing", "Market research"],
          ["Budgeting and forecasting", "Risk management"],
          ["Financial reporting", "Investment management"],
          ["Business communication", "Decision-making"],
          ["Leadership", "—"],
        ],
      },
    ],
  },
  {
    heading: "Recognition & accreditation",
    blocks: [
      {
        kind: "table",
        caption: "Credentials referenced for LPU",
        head: ["Credential", "Detail"],
        rows: [
          ["NAAC", "Grade A++ with a stated score of 3.68/4"],
          ["UGC entitlement", "For online programmes"],
          ["Category 1 status", "Graded autonomy"],
          ["AICTE approval", "Referenced for MBA and MCA"],
          ["WES", "Recognition references"],
          ["Rankings", "Historical NIRF and Times Higher Education references"],
        ],
      },
      {
        kind: "note",
        text: "Not every accreditation or ranking applies specifically to the Online MCom. AICTE approval, for instance, is referenced for MBA and MCA. Historical rankings should always be read with their ranking year.",
      },
    ],
  },
  {
    heading: "Placements, recruiters, careers & salary",
    blocks: [
      { kind: "h3", text: "Placement services" },
      {
        kind: "list",
        items: [
          "Career development",
          "Skill enhancement",
          "Placement drives",
          "Job opportunity assistance",
          "Interview preparation",
          "Industry networking",
          "Career workshops",
        ],
      },
      { kind: "h3", text: "Recruiters named in LPU material" },
      {
        kind: "table",
        caption: "Recruiters listed",
        head: ["Company", "Company"],
        rows: [
          ["LIC", "Paytm"],
          ["OYO", "Max Life"],
          ["Wipro", "Amazon"],
          ["Vistara", "Royal Bank of Scotland"],
          ["Tata Services", "Indigo"],
          ["Pantaloons", "Globe Toyota"],
        ],
      },
      {
        kind: "note",
        text: "This is a university-level recruiter list, not a guaranteed Online MCom recruiter panel.",
      },
      { kind: "h3", text: "Indicative salary ranges by role" },
      {
        kind: "table",
        caption: "Indicative salary ranges stated in LPU material",
        head: ["Job role", "Average", "Highest"],
        rows: [
          ["Financial Analyst", "Rs 6 LPA", "Rs 12 LPA"],
          ["Account Manager", "Rs 7 LPA", "Rs 14 LPA"],
          ["Investment Banker", "Rs 8 LPA", "Rs 15 LPA"],
          ["Business Consultant", "Rs 6.5 LPA", "Rs 13 LPA"],
          ["Tax Consultant", "Rs 5.5 LPA", "Rs 11 LPA"],
          ["Risk Manager", "Rs 7 LPA", "Rs 13.5 LPA"],
          ["Financial Planner", "Rs 6 LPA", "Rs 12 LPA"],
          ["Auditor", "Rs 5 LPA", "Rs 10 LPA"],
          ["Budget Analyst", "Rs 6 LPA", "Rs 11 LPA"],
          ["Corporate Treasurer", "Rs 8 LPA", "Rs 16 LPA"],
        ],
      },
      {
        kind: "note",
        text: "These are indicative market ranges quoted in programme material, not guaranteed salaries for LPU Online MCom graduates.",
      },
      counselCta("LPU Online MCom"),
    ],
  },
];

const bcomSections: PostSection[] = [
  {
    heading: "Overview & 2026-27 details",
    blocks: [
      {
        kind: "p",
        text: "LPU's BCom Distance Education is a three-year undergraduate commerce degree covering accounting, finance, economics, taxation and business, aimed at learners balancing work, family responsibilities or competitive-exam preparation.",
      },
      {
        kind: "table",
        caption: "LPU BCom Distance Education at a glance",
        head: ["Particular", "Details"],
        rows: [
          ["Course", "BCom Distance Education"],
          ["University", "Lovely Professional University"],
          ["Duration", "3 years"],
          ["Mode", "Distance learning"],
          ["Medium", "English"],
          ["Eligibility", "10+2 or equivalent"],
          ["Admission", "Online"],
          ["Registration fee", "Rs 600"],
        ],
      },
      {
        kind: "p",
        text: "The programme is supported by digital study resources, academic support and flexible learning schedules.",
      },
      courseLinks("BCom", "online-b-com"),
    ],
  },
  {
    heading: "Admission & eligibility",
    blocks: [
      {
        kind: "p",
        text: "Candidates need 10+2 or an equivalent qualification from a recognised board. Applicants from different streams may be eligible subject to university rules, and the programme is open to both freshers and working professionals.",
      },
      { kind: "h3", text: "Admission steps" },
      {
        kind: "list",
        ordered: true,
        items: [
          "Visit the admission portal.",
          "Register with your mobile number and email ID.",
          "Complete the application form.",
          "Enter personal and academic details.",
          "Upload the required documents.",
          "Pay the registration and programme fees.",
          "Submit the application.",
          "Complete document verification and receive confirmation.",
        ],
      },
      { kind: "h3", text: "Documents required" },
      {
        kind: "list",
        items: [
          "Class 10 marksheet",
          "Class 12 marksheet",
          "Passport-size photograph",
          "Scanned signature",
          "Aadhaar card or government ID",
          "Address proof",
          "Category certificate, if applicable",
        ],
      },
      counselCta("LPU BCom Distance"),
    ],
  },
  {
    heading: "Fees, scholarships & EMI",
    blocks: [
      {
        kind: "table",
        caption: "LPU BCom Distance fee structure",
        head: ["Fee component", "Amount"],
        rows: [
          ["Semester fee", "Rs 10,500"],
          ["Annual fee", "Rs 20,000"],
          ["Lump-sum fee", "Rs 57,000"],
          ["Registration fee", "Rs 600 (non-refundable)"],
        ],
      },
      {
        kind: "p",
        text: "Payment modes listed are debit card, credit card, UPI, wallets, net banking and demand draft. Demand drafts are drawn in favour of \u201cLovely Centre for Distance and Online Education\u201d, payable at Jalandhar.",
      },
      {
        kind: "note",
        text: "Paying the lump-sum fee of Rs 57,000 is cheaper than three annual instalments of Rs 20,000 in this fee sheet. Confirm both slabs in writing for the current cycle before choosing.",
      },
      feePromo("BCom", "online-b-com"),
    ],
  },
  {
    heading: "Courses, curriculum & specialisations",
    blocks: [
      {
        kind: "table",
        caption: "Major BCom subjects",
        head: ["Accounting & taxation", "Business & finance"],
        rows: [
          ["Financial Accounting", "Business Economics"],
          ["Corporate Accounting", "Business Law"],
          ["Cost Accounting", "Financial Management"],
          ["Income Tax", "Banking and Insurance"],
          ["Auditing", "Marketing Management"],
          ["Business Statistics", "Entrepreneurship Development"],
        ],
      },
      {
        kind: "p",
        text: "Together these subjects build a foundation in accounting, finance, taxation, banking and business operations — the base most CA, CS and CMA aspirants need alongside their professional papers.",
      },
      {
        kind: "note",
        text: "A complete semester-wise syllabus and specialisation list for 2026-27 is not published in LPU's distance BCom material; check the latest curriculum before planning electives.",
      },
    ],
  },
  {
    heading: "Recognition & accreditation",
    blocks: [
      {
        kind: "p",
        text: "The programme is presented as a recognised distance-learning qualification from LPU. As with any distance degree, separate the four layers before you decide:",
      },
      {
        kind: "list",
        items: [
          "University accreditation",
          "Distance education regulatory status for the programme",
          "Degree recognition or equivalence where officially applicable",
          "Rankings, read with their year",
        ],
      },
      {
        kind: "note",
        text: "General university recognition should not be read as approval of every individual programme. Check the DEB listing for BCom in distance mode for your admission session.",
      },
    ],
  },
  {
    heading: "Placements, recruiters, careers & salary",
    blocks: [
      { kind: "h3", text: "Career areas" },
      {
        kind: "list",
        items: [
          "Banking",
          "Finance",
          "Insurance",
          "Taxation",
          "Retail",
          "Consulting",
          "Corporate business",
        ],
      },
      {
        kind: "table",
        caption: "Indicative salary ranges by role",
        head: ["Job role", "Indicative salary range"],
        rows: [
          ["Accountant", "Rs 3-6 LPA"],
          ["Financial Analyst", "Rs 5-9 LPA"],
          ["Tax Consultant", "Rs 4-8 LPA"],
          ["Banking Executive", "Rs 3-7 LPA"],
          ["Auditor", "Rs 4-8 LPA"],
          ["Accounts Executive", "Rs 3-5 LPA"],
        ],
      },
      {
        kind: "note",
        text: "These are indicative market ranges, not guaranteed LPU placement outcomes. Actual pay varies by employer, location, skills, experience and role.",
      },
      { kind: "h3", text: "Higher education after BCom" },
      {
        kind: "list",
        items: [
          "MBA",
          "MCom",
          "Chartered Accountancy (CA)",
          "Company Secretary (CS)",
          "Cost and Management Accountancy (CMA)",
          "CFA",
          "PG Diploma in Finance",
          "Banking and financial-services certifications",
        ],
      },
      counselCta("LPU BCom Distance"),
    ],
  },
];

const relatedLinks = [
  { label: "LPU Online overview", href: UNI },
  { label: "LPU Online MBA", href: `${UNI}/courses/online-mba` },
  { label: "LPU Online MCA", href: `${UNI}/courses/online-mca` },
  { label: "LPU Online BBA", href: `${UNI}/courses/online-bba` },
  { label: "LPU Online BCA", href: `${UNI}/courses/online-bca` },
  { label: "LPU Online MCom", href: `${UNI}/courses/online-m-com` },
  { label: "LPU Online BCom", href: `${UNI}/courses/online-b-com` },
];

export const lpuProgramPosts: Record<string, PostContent> = {
  "lpu-online-mba-2026-27-complete-guide": {
    ...base,
    updated: UPDATED,
    intro:
      "The LPU Online MBA is a two-year, four-semester postgraduate management degree delivered fully online with live and recorded classes. LPU's own material quotes two semester-fee figures — Rs 49,000 in the programme highlights and Rs 40,400 in the fee table (Rs 1,61,600 total) — plus a Rs 1,000 one-time registration fee. Eligibility runs through a bachelor's degree in any discipline or a CS, CA or CMA qualification. This guide lays out the full blueprint: overview, admission, fees, curriculum, recognition and careers.",
    keyTakeaways: [
      "Duration is 2 years across 4 semesters, fully online with live plus recorded lectures.",
      "Fee table states Rs 40,400 per semester and Rs 1,61,600 total; highlights elsewhere state Rs 49,000 per semester — verify before paying.",
      "Registration fee is Rs 1,000 one-time and the examination fee is included in the semester fee.",
      "Eligibility: bachelor's degree in any discipline, or ICSI CS, or CA/CMA subject to university rules.",
      "Specialisation subjects start in semester 3 and the programme closes with a capstone project.",
      "UGC entitlement, NAAC A++ and AICTE approval are referenced — read them as separate credentials, not one blanket claim.",
    ],
    sections: mbaSections,
    faqs: [
      {
        question: "What is the total fee for the LPU Online MBA?",
        answer:
          "LPU's fee table shows Rs 40,400 per semester and a total programme fee of Rs 1,61,600 across four semesters, plus a one-time registration fee of Rs 1,000. A separate highlights section quotes Rs 49,000 per semester, so confirm the applicable slab for your intake in writing.",
      },
      {
        question: "Can a CA or CS candidate join the LPU Online MBA without a bachelor's degree?",
        answer:
          "LPU lists CS from ICSI and CA or CMA qualifications as eligibility routes alongside a bachelor's degree in any discipline, subject to the university's current rules.",
      },
      {
        question: "Is the LPU Online MBA valid for government jobs?",
        answer:
          "A UGC-entitled online degree carries the same recognition as an on-campus degree under the 2020 equivalence notification. Confirm that the MBA appears in the UGC/DEB entitled list for your admission session.",
      },
      {
        question: "Does LPU guarantee placement after the Online MBA?",
        answer:
          "No. LPU offers placement assistance — career guidance, skill development, interview preparation and industry activities. That is support, not a guaranteed job or salary.",
      },
    ],
    related: relatedLinks,
  },

  "lpu-online-mca-2026-27-complete-guide": {
    ...base,
    updated: UPDATED,
    intro:
      "The LPU Online MCA is a two-year, four-semester postgraduate computing degree with a total programme fee of Rs 1,08,000 — Rs 28,000 per semester plus a Rs 2,000 per-semester examination fee and a Rs 600 one-time registration fee. Eligibility requires a bachelor's degree with Mathematics studied at 10+2 or graduation level. The curriculum moves from programming fundamentals to cloud, AI, analytics and a major project, with specialisation areas across AI, data science, cyber security and full stack development.",
    keyTakeaways: [
      "Total programme fee is Rs 1,08,000 over 4 semesters; annual fee is Rs 54,000.",
      "Semester fee is Rs 28,000 plus a Rs 2,000 examination fee per semester, and registration is Rs 600 one-time.",
      "Mathematics at 10+2 or graduation level is a hard eligibility requirement.",
      "Specialisation areas include AI, data science, cyber security, cloud computing and full stack development.",
      "Examinations are conducted online and the programme is UGC entitled.",
      "Merit and LPUNEST-based scholarships are mentioned; availability changes each cycle.",
    ],
    sections: mcaSections,
    faqs: [
      {
        question: "What is the LPU Online MCA fee for 2026-27?",
        answer:
          "LPU's published structure is Rs 28,000 per semester plus a Rs 2,000 examination fee per semester, an annual fee of Rs 54,000 and a total programme fee of Rs 1,08,000, with a one-time registration fee of Rs 600.",
      },
      {
        question: "Can I do the LPU Online MCA without Mathematics?",
        answer:
          "LPU's stated eligibility requires Mathematics at 10+2 level or during graduation along with a bachelor's degree from a recognised institution. Candidates without it should confirm directly with the university before applying.",
      },
      {
        question: "Are exams for the LPU Online MCA conducted online?",
        answer: "Yes, the examination mode listed for the Online MCA is online.",
      },
      {
        question: "What jobs can I get after an LPU Online MCA?",
        answer:
          "Typical target roles include software developer, full stack developer, data analyst, system analyst, cloud engineer, cyber security analyst, database administrator and AI/ML associate. Outcomes depend on your skills, projects and interview performance.",
      },
    ],
    related: relatedLinks,
  },

  "lpu-online-bba-2026-27-complete-guide": {
    ...base,
    updated: UPDATED,
    intro:
      "The LPU Online BBA is a three-year, six-semester undergraduate management degree priced at Rs 20,000 per semester — Rs 40,000 a year and Rs 1,20,000 in total — with a Rs 600 one-time registration fee and EMI options. Eligibility is 10+2 from a recognised board with no maximum age limit, and the curriculum runs from management and accounting fundamentals to digital marketing, strategic management and project work.",
    keyTakeaways: [
      "Fee is Rs 20,000 per semester, Rs 40,000 per year and Rs 1,20,000 in total across 6 semesters.",
      "Registration fee is Rs 600 one-time; semester, annual, full-payment and EMI routes are available.",
      "Eligibility is 10+2 or equivalent from any stream, with no maximum age restriction.",
      "The fee covers live classes, recorded sessions, digital material, LMS access, assessments and exam support.",
      "Subjects span management, accounting, economics, HR, digital marketing and strategic management, ending with project work.",
      "No BBA-specific salary table is published — placement support is assistance, not a guarantee.",
    ],
    sections: bbaSections,
    faqs: [
      {
        question: "What is the total LPU Online BBA fee?",
        answer:
          "Rs 1,20,000 for the full three-year programme — Rs 20,000 per semester or Rs 40,000 per year — plus a one-time registration fee of Rs 600.",
      },
      {
        question: "Is there an age limit for the LPU Online BBA?",
        answer:
          "LPU states there is no maximum age restriction; the requirement is 10+2 or an equivalent qualification.",
      },
      {
        question: "Can I pay the LPU Online BBA fee in EMIs?",
        answer:
          "Yes, EMI is listed alongside semester-wise, annual and full-programme payment. Confirm the current EMI provider and terms at admission.",
      },
      {
        question: "Can I do an MBA after the LPU Online BBA?",
        answer:
          "Yes. A UGC-entitled online BBA is treated on par with a conventional bachelor's degree, so it satisfies the graduation requirement for MBA admission.",
      },
    ],
    related: relatedLinks,
  },

  "lpu-online-bca-2026-27-complete-guide": {
    ...base,
    updated: UPDATED,
    intro:
      "The LPU Online BCA is a three-year undergraduate computing degree open to 10+2 students from any stream. LPU's published fee sheet lists Rs 30,000 per semester with a 20% student grant bringing it to Rs 24,400 per semester, a no-cost EMI of Rs 6,100 a month for 24 months, and a Rs 1,32,960 lump-sum option — but that grant was marked valid only until 28 February 2025, so the current slab must be confirmed. The syllabus runs from programming methodology and DBMS to software engineering, AI and a final-year field project.",
    keyTakeaways: [
      "Duration is 3 years, fully online, open to 10+2 candidates from any stream.",
      "Listed fee is Rs 30,000 per semester; the 20% grant slab of Rs 24,400 expired on 28 February 2025.",
      "A no-cost EMI of Rs 6,100/month for 24 months and a Rs 1,32,960 lump-sum option are referenced.",
      "Semesters 1-4 are core computing; semesters 5-6 add electives, skill courses and a field project.",
      "NAAC A++ and UGC-DEB references are university-level; ranking references are historical.",
      "Recruiter names such as Amazon, TCS, Microsoft and Wipro are university-wide, not BCA placement guarantees.",
    ],
    sections: bcaSections,
    faqs: [
      {
        question: "What is the LPU Online BCA fee per semester?",
        answer:
          "The published actual fee is Rs 30,000 per semester. A 20% student grant slab of Rs 24,400 per semester appears in LPU's material but was valid only until 28 February 2025, so ask for the current slab.",
      },
      {
        question: "Is a no-cost EMI available for the LPU Online BCA?",
        answer:
          "LPU's fee sheet references a no-cost EMI of Rs 6,100 per month for 24 months under the grant slab. Confirm whether the same plan is running for your intake.",
      },
      {
        question: "Can commerce or arts students take the LPU Online BCA?",
        answer:
          "Yes. Eligibility is described as 10+2 or equivalent from any stream, subject to the university's current admission rules.",
      },
      {
        question: "What is taught in the final year of the LPU Online BCA?",
        answer:
          "Semesters 5 and 6 cover discipline-specific electives, skill-enhancement courses, generic electives and a field project.",
      },
    ],
    related: relatedLinks,
  },

  "lpu-online-mcom-2026-27-complete-guide": {
    ...base,
    updated: UPDATED,
    intro:
      "The LPU Online MCom is a two-year, four-semester postgraduate commerce degree covering accounting, finance, banking, taxation and international business. LPU's material lists a Rs 25,000 semester fee alongside a standard slab of Rs 90,800 (Rs 22,700 per semester), a Rs 1,00,000 lump-sum figure and expired grant slabs of Rs 81,600 and Rs 74,240. Eligibility requires a bachelor's degree in commerce, management, economics, accounts or mathematics. The curriculum includes forensic accounting, international banking and international financial management.",
    keyTakeaways: [
      "Duration is 2 years across 4 semesters, delivered online, with a Rs 600 registration fee.",
      "Semester fee is stated as Rs 25,000, with a separate standard slab of Rs 22,700 per semester (Rs 90,800 total).",
      "Grant slabs of Rs 81,600 and Rs 74,240 relate to a promotion valid until 10 January 2025.",
      "Eligibility needs a bachelor's degree in Commerce, Management, Economics, Accounts or Mathematics.",
      "Curriculum includes forensic accounting, international banking and forex, and international financial management.",
      "Indicative role salaries range from Rs 5 LPA (auditor) to Rs 8 LPA average for investment banker and corporate treasurer.",
    ],
    sections: mcomSections,
    faqs: [
      {
        question: "What is the LPU Online MCom fee?",
        answer:
          "LPU's sheets show a Rs 25,000 semester fee and a standard slab of Rs 22,700 per semester (Rs 90,800 total), with a Rs 1,00,000 lump-sum figure and a Rs 600 registration fee. The grant slabs of Rs 81,600 and Rs 74,240 relate to an offer valid until 10 January 2025.",
      },
      {
        question: "Who is eligible for the LPU Online MCom?",
        answer:
          "Candidates should have completed 10+2 and hold a bachelor's degree in Commerce, Management, Economics, Accounts or Mathematics, or an equivalent course.",
      },
      {
        question: "Which recruiters are listed for LPU commerce graduates?",
        answer:
          "LPU's material names LIC, Paytm, OYO, Max Life, Wipro, Amazon, Vistara, Royal Bank of Scotland, Tata Services, Indigo, Pantaloons and Globe Toyota. This is a university-level list, not an Online MCom placement guarantee.",
      },
      {
        question: "What salary can an MCom graduate expect?",
        answer:
          "Indicative ranges quoted in programme material run from around Rs 5 LPA for an auditor to Rs 8 LPA average for investment banking and corporate treasury roles, with highest figures up to Rs 16 LPA. These are market indications, not guaranteed outcomes.",
      },
    ],
    related: relatedLinks,
  },

  "lpu-bcom-distance-education-2026-27-complete-guide": {
    ...base,
    updated: UPDATED,
    intro:
      "LPU's BCom Distance Education is a three-year undergraduate commerce degree taught in English and open to 10+2 candidates. The published fee sheet lists Rs 10,500 per semester, Rs 20,000 per year or Rs 57,000 as a lump sum, with a non-refundable Rs 600 registration fee. Subjects span financial and corporate accounting, cost accounting, income tax, auditing, banking and insurance, and the degree feeds naturally into CA, CS, CMA, MCom and MBA routes.",
    keyTakeaways: [
      "Three-year distance BCom in English mode with online admission and a Rs 600 non-refundable registration fee.",
      "Fee options are Rs 10,500 per semester, Rs 20,000 per year or Rs 57,000 lump sum — the lump sum is the cheapest route in this sheet.",
      "Eligibility is 10+2 or equivalent from a recognised board, open to freshers and working professionals.",
      "Core subjects cover financial, corporate and cost accounting, income tax, auditing, banking and insurance.",
      "Payments accepted by card, UPI, wallets, net banking or demand draft payable at Jalandhar.",
      "Indicative role salaries range from Rs 3-5 LPA for accounts executives to Rs 5-9 LPA for financial analysts.",
    ],
    sections: bcomSections,
    faqs: [
      {
        question: "What is the LPU BCom distance education fee?",
        answer:
          "The published sheet lists Rs 10,500 per semester, Rs 20,000 per year or Rs 57,000 as a lump-sum programme fee, plus a non-refundable registration fee of Rs 600.",
      },
      {
        question: "Is the LPU distance BCom open to working professionals?",
        answer:
          "Yes. The programme is described as open to both freshers and working professionals who need flexible study alongside their job.",
      },
      {
        question: "Can I take CA or CS alongside the LPU distance BCom?",
        answer:
          "Many learners do. The subject list — accounting, cost accounting, income tax and auditing — overlaps with CA, CS and CMA foundations, and LPU lists those as higher-study routes after the degree.",
      },
      {
        question: "How do I pay the LPU BCom fee by demand draft?",
        answer:
          "Demand drafts are drawn in favour of \u201cLovely Centre for Distance and Online Education\u201d, payable at Jalandhar. Card, UPI, wallet and net banking payments are also accepted.",
      },
    ],
    related: relatedLinks,
  },
};
