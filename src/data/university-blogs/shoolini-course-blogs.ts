import type { PostContent } from "@/data/posts";
import type { Article } from "@/lib/content";

const base = { reviewer: "Kartik Ahuja", reviewerRole: "Education Research Lead, Degreekhojo" };
const UPDATED = "2026-08-18";

export const shooliniCourseArticles: Article[] = [
  {
    slug: "shoolini-online-mba-2026-fees-eligibility-careers",
    title: "Shoolini Online MBA 2026: Specialisations, Eligibility & Careers",
    excerpt:
      "A course-level look at the Shoolini University Online MBA — specialisations, eligibility, curriculum, admission steps and the roles graduates typically target.",
    category: "Career Growth",
    categorySlug: "career-growth",
    tags: ["shoolini-university-online", "online-mba", "mba-specialisations", "online-mba-careers"],
    author: "Kartik Ahuja",
    authorSlug: "kartik-ahuja",
    date: "2026-08-18",
    readingTime: "12 min",
    kind: "blog",
  },
  {
    slug: "shoolini-online-bca-2026-fees-eligibility-careers",
    title: "Shoolini Online BCA 2026: Curriculum, Fees & Career Paths",
    excerpt:
      "Semester-wise curriculum, eligibility, fee structure and entry-level career routes for the Shoolini University Online BCA.",
    category: "Admission Guidance",
    categorySlug: "admission-guidance",
    tags: ["shoolini-university-online", "online-bca", "bca-curriculum", "bca-fees"],
    author: "Kartik Ahuja",
    authorSlug: "kartik-ahuja",
    date: "2026-08-18",
    readingTime: "12 min",
    kind: "blog",
  },
  {
    slug: "shoolini-online-bcom-honours-2026-guide",
    title: "Shoolini Online B.Com (Honours) 2026: Complete Course Guide",
    excerpt:
      "Eligibility, semester subjects, fees and career scope for the Shoolini University Online B.Com (Honours) programme.",
    category: "Study Guides",
    categorySlug: "study-guides",
    tags: ["shoolini-university-online", "online-bcom-honours", "commerce-degree", "bcom-fees"],
    author: "Kartik Ahuja",
    authorSlug: "kartik-ahuja",
    date: "2026-08-18",
    readingTime: "11 min",
    kind: "blog",
  },
  {
    slug: "shoolini-online-fees-2026-complete-breakdown",
    title: "Shoolini University Online Fees 2026: Full Course-Wise Breakdown",
    excerpt:
      "Semester fees, payment options, Pay-After-Placement terms and scholarships across every Shoolini University Online programme.",
    category: "Fees & Scholarships",
    categorySlug: "fees-scholarships",
    tags: [
      "shoolini-university-online",
      "shoolini-fees-2026",
      "pay-after-placement",
      "online-degree-fees",
    ],
    author: "Kartik Ahuja",
    authorSlug: "kartik-ahuja",
    date: "2026-08-18",
    readingTime: "13 min",
    kind: "blog",
  },
];

export const shooliniCoursePosts: Record<string, PostContent> = {
  /* ============================ POST 1: Online MBA ============================ */
  "shoolini-online-mba-2026-fees-eligibility-careers": {
    ...base,
    updated: UPDATED,
    intro:
      "The Shoolini University Online MBA is a two-year postgraduate management degree built for graduates and working professionals who want structured business education without stepping away from their job. Delivered through live and recorded classes with digital study material, it lets students choose from specialisations such as Marketing, Finance, HR, Business Analytics, Digital Marketing, Operations and International Business. This guide walks through eligibility, admission, curriculum and the career roles the programme is positioned around.",
    keyTakeaways: [
      "The Online MBA is a 2-year postgraduate programme delivered fully online, with a bachelor's degree from a recognised university as the base eligibility requirement.",
      "Specialisations on offer include Marketing Management, Finance Management, Human Resource Management, Business Analytics, Digital Marketing, Operations Management and International Business.",
      "Both fresh graduates and working professionals are considered eligible; graduation can be from any academic background subject to current university rules.",
      "Admission runs through five steps: registration, application form, document upload, fee payment and verification/confirmation.",
      "Career support includes resume building, career counselling, interview preparation, skill-development workshops and placement assistance — described as support, not a guaranteed job.",
      "Indicative job roles include Marketing Manager, HR Manager, Financial Analyst, Business Analyst, Operations Manager, Sales Manager and Project Manager, with salary ranges varying by experience and employer.",
    ],
    sections: [
      {
        heading: "Who the Online MBA is built for",
        blocks: [
          {
            kind: "p",
            text: "The programme targets learners who want to build management knowledge in finance, marketing, human resources, operations, business strategy and emerging business trends while keeping their job or other commitments running. It is delivered through the Centre for Distance and Online Education's digital learning environment, with live classes, recorded lectures, discussion forums, online tests and academic support standing in for a physical campus.",
          },
          {
            kind: "list",
            items: [
              "Working professionals seeking career advancement without leaving employment.",
              "Fresh graduates planning a management career.",
              "Entrepreneurs wanting stronger business-management knowledge.",
              "Professionals targeting leadership or managerial responsibilities.",
              "Learners transitioning into management-oriented functions.",
            ],
          },
        ],
      },
      {
        heading: "Course snapshot",
        blocks: [
          {
            kind: "table",
            caption: "Shoolini Online MBA at a glance",
            head: ["Particulars", "Details"],
            rows: [
              ["Course level", "Postgraduate"],
              ["Duration", "2 years"],
              ["Mode of learning", "Fully online"],
              ["Eligibility", "Bachelor's degree from a recognised university"],
              ["Learning method", "Live and recorded classes"],
              ["Study material", "Digital learning resources"],
              ["Admission mode", "Online application"],
              ["Placement support", "Available"],
            ],
          },
        ],
      },
      {
        heading: "Eligibility criteria",
        blocks: [
          {
            kind: "p",
            text: "A bachelor's or master's degree from an accredited or recognised university is the baseline requirement, and graduation is mandatory. Candidates from different academic backgrounds can apply, and both fresh graduates and working professionals may be considered.",
          },
          {
            kind: "table",
            caption: "Eligibility checklist",
            head: ["Eligibility point", "Requirement / guidance"],
            rows: [
              [
                "Academic qualification",
                "Bachelor's or master's degree from a recognised/accredited university",
              ],
              [
                "Discipline",
                "Graduation can be from different academic backgrounds, subject to university rules",
              ],
              ["Fresh graduates", "Can be considered"],
              ["Working professionals", "Can be considered"],
              ["Final check", "Verify the latest admission notice before applying"],
            ],
          },
          {
            kind: "note",
            text: "Exact eligibility conditions and any minimum-marks requirement for your session should be confirmed on the current admission notice before you apply.",
          },
        ],
      },
      {
        heading: "Specialisations available",
        blocks: [
          {
            kind: "list",
            items: [
              "Marketing Management — marketing, branding, sales and customer-focused roles.",
              "Finance Management — financial analysis, corporate finance and finance-related business functions.",
              "Human Resource Management — recruitment, employee relations and people management.",
              "Business Analytics — data-supported business decision-making.",
              "Digital Marketing — digital campaigns, online acquisition, content and performance marketing.",
              "Operations Management — processes, efficiency, supply chain and operational decisions.",
              "International Business — global business environments and cross-border management.",
            ],
          },
          {
            kind: "note",
            text: "Confirm which specialisations are actually open for your admission session before you shortlist one.",
          },
        ],
      },
      {
        heading: "Curriculum and subject areas",
        blocks: [
          {
            kind: "p",
            text: "The curriculum is built around core management concepts plus specialisation-oriented learning, with accounting, business management, finance, marketing, human resource management, organisational behaviour, operations, business strategy and emerging business trends forming the core subject areas. Assignments, projects and case-based activities connect these concepts to practical business situations.",
          },
          {
            kind: "table",
            caption: "Core subject areas and focus",
            head: ["Subject area", "Learning focus"],
            rows: [
              ["Accounting", "Business accounting and financial information"],
              ["Finance", "Financial decision-making and management concepts"],
              ["Marketing", "Marketing strategy, customers and market decisions"],
              ["Human Resources", "People management and organisational practices"],
              ["Operations", "Processes, efficiency and operational decisions"],
              ["Organisational Behaviour", "People, teams and workplace behaviour"],
              ["Business Strategy", "Strategic planning and competitive decisions"],
              ["Emerging Trends", "Contemporary business practices and new management trends"],
            ],
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
              "Online registration — register on the university admission portal with basic details.",
              "Application form — enter personal, academic and communication information carefully.",
              "Document upload — upload graduation documents, ID proof, photograph, signature and other applicable documents.",
              "Fee payment — pay the applicable admission or semester fee through the available online payment method.",
              "Verification and confirmation — once the university verifies your submission, admission confirmation and LMS access follow.",
            ],
          },
          {
            kind: "cta",
            title: "Check your eligibility before you apply",
            body: "Share your qualification and target specialisation and we will confirm whether you meet the current admission criteria.",
            buttonLabel: "Check eligibility",
          },
        ],
      },
      {
        heading: "How classes and assessments work",
        blocks: [
          {
            kind: "list",
            items: [
              "Live interactive online classes",
              "Recorded video lectures",
              "Digital study material and e-books",
              "Online assignments and case study discussions",
              "Doubt-clearing sessions",
              "Online examinations through the LMS, as applicable",
            ],
          },
        ],
      },
      {
        heading: "Career support and roles graduates target",
        blocks: [
          {
            kind: "p",
            text: "The university positions career and placement support as resume-building assistance, career counselling, interview preparation, skill-development workshops, industry interaction and placement assistance. These are support initiatives rather than a guaranteed job — outcomes still depend on specialisation, prior experience, skills, interview performance and market conditions.",
          },
          {
            kind: "table",
            caption: "Indicative roles and salary ranges (source-provided, not guaranteed)",
            head: ["Job role", "Salary range"],
            rows: [
              ["Marketing Manager", "INR 6-12 LPA"],
              ["HR Manager", "INR 5-10 LPA"],
              ["Financial Analyst", "INR 5-11 LPA"],
              ["Business Analyst", "INR 6-12 LPA"],
              ["Operations Manager", "INR 7-14 LPA"],
              ["Sales Manager", "INR 6-12 LPA"],
              ["Project Manager", "INR 8-18 LPA"],
            ],
          },
          {
            kind: "note",
            text: "These are indicative source-provided ranges, not guarantees. Actual compensation depends on experience, skills, organisation and location.",
          },
        ],
      },
      {
        heading: "Online MBA vs regular MBA",
        blocks: [
          {
            kind: "table",
            caption: "Feature comparison",
            head: ["Feature", "Online MBA", "Regular MBA"],
            rows: [
              ["Learning mode", "Online", "Classroom"],
              ["Flexibility", "High", "Limited"],
              ["Working professionals", "Yes", "Generally difficult alongside full-time study"],
              ["Location", "Study from anywhere", "Campus attendance required"],
              ["Schedule", "Flexible", "Fixed timetable"],
              ["Cost", "Generally more affordable", "Usually higher"],
              ["Campus networking", "More limited", "Generally stronger"],
            ],
          },
          {
            kind: "links",
            title: "Continue researching",
            items: [
              {
                label: "Shoolini Online fees, full breakdown",
                href: "/blogs/shoolini-online-fees-2026-complete-breakdown",
              },
              {
                label: "Explore Shoolini University Online",
                href: "/universities/shoolini-online",
              },
              { label: "Online MBA fees across universities", href: "/courses/online-mba" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: "What is the duration of the Shoolini University Online MBA?",
        answer: "The programme runs for 2 years.",
      },
      {
        question: "Who is eligible for the Shoolini Online MBA?",
        answer:
          "Graduates with a bachelor's or master's degree from a recognised or accredited university can be considered, subject to the current admission rules. Both fresh graduates and working professionals are eligible.",
      },
      {
        question: "Is it suitable for working professionals?",
        answer:
          "Yes; the programme is presented as a flexible online format designed to accommodate work and other commitments.",
      },
      {
        question: "What specialisations are offered?",
        answer:
          "Marketing Management, Finance Management, Human Resource Management, Business Analytics, Digital Marketing, Operations Management and International Business.",
      },
      {
        question: "Does the university provide placement support?",
        answer:
          "Career and placement assistance is available through resume building, counselling, interview preparation and industry interaction, but this should not be read as a guaranteed job.",
      },
      {
        question: "What documents are required for admission?",
        answer:
          "Graduation marksheets and degree certificate, government ID proof, photograph, signature, and category certificate if applicable.",
      },
    ],
    sources: [
      { label: "Shoolini University official website", href: "https://shooliniuniversity.com/" },
    ],
    related: [
      { label: "Shoolini University Online", href: "/universities/shoolini-online" },
      { label: "Online MBA course guide", href: "/courses/online-mba" },
      { label: "Compare universities", href: "/compare" },
    ],
    cta: "Want to know if your background fits a specific MBA specialisation? Tell us your goal and we will map the right one for you.",
  },

  /* ============================ POST 2: Online BCA ============================ */
  "shoolini-online-bca-2026-fees-eligibility-careers": {
    ...base,
    updated: UPDATED,
    intro:
      "Shoolini University Online BCA is a three-year undergraduate degree that takes learners from programming fundamentals through databases, web technology, software engineering, Python, Java and cloud computing, capped with a final-year project. Delivered through the university's Centre for Distance and Online Education, it suits Class 12 pass-outs and working learners who want a flexible route into IT. This guide covers eligibility, the full semester-wise curriculum, fees and the entry-level roles it opens up.",
    keyTakeaways: [
      "Eligibility is 10+2 or equivalent in any stream from a recognised board — no specific subject requirement is listed.",
      "The course runs 3 years across 6 semesters, moving from programming basics to DBMS, Python, Java, cloud computing and a major project.",
      "Standard BCA fee after scholarship is INR 90,000 (INR 15,000/semester); the pay-after-placement route works out to INR 1,06,500 after a smaller scholarship, split as INR 85,200 payable before placement and INR 21,300 after.",
      "A 10 percent merit scholarship applies for students scoring above 90 percent in the qualifying exam, plus 10 percent lumpsum and 5 percent annual-payment discounts.",
      "International fees are separate: USD 2,000-2,500 standard, reducing to USD 1,500 after scholarship, billed at USD 250 per semester.",
      "Career outcomes are entry-level IT roles such as Junior Software Developer, Web Developer and Technical Support Executive, plus the option to pursue an MCA afterward.",
    ],
    sections: [
      {
        heading: "Course overview",
        blocks: [
          {
            kind: "p",
            text: "The Online BCA builds foundational computing education across programming, data structures, databases, web technologies, software development and practical project work. It is delivered through Shoolini's Centre for Distance and Online Education (SCDOE) with digital learning resources and a semester-based structure, aimed at learners who want a flexible BCA without a conventional campus schedule.",
          },
          {
            kind: "table",
            caption: "Eligibility at a glance",
            head: ["Parameter", "Eligibility"],
            rows: [
              ["Minimum qualification", "10+2 or equivalent"],
              ["Stream", "Any stream"],
              ["Recognition", "Recognised Board / University / Council"],
              ["Duration", "3 years / 6 semesters"],
              ["Important check", "Verify current-session admission requirements before applying"],
            ],
          },
        ],
      },
      {
        heading: "Semester-wise curriculum",
        blocks: [
          {
            kind: "p",
            text: "The curriculum moves from programming and analytical foundations to databases, operating systems, software engineering, Python, Java, cloud computing and project work, with open and subject-area electives adding flexibility along the way.",
          },
          {
            kind: "table",
            caption: "Semester-wise core areas",
            head: ["Semester", "Core academic areas", "Learning focus"],
            rows: [
              [
                "Semester 1",
                "Functional English 1; Problem Solving with Programming; Mathematics; Creativity Decoded; Open Electives; Fundamentals of Journalism; Principles of Management",
                "Programming foundation, quantitative thinking, communication and management",
              ],
              [
                "Semester 2",
                "Entrepreneurship; Functional English 2; Data Structures with C; Web Technology; Open Electives; Presentations",
                "Data structures, web basics, communication and entrepreneurship",
              ],
              [
                "Semester 3",
                "Acing Interviews with AI; Operating System; OOP with C++; Software Engineering; Open Electives; Critical Thinking; New Media",
                "Systems, object-oriented programming, software development and employability",
              ],
              [
                "Semester 4",
                "DBMS; Python Programming; Digital Marketing; Organisational Behaviour; Open Electives; Advertising; Effective Negotiations",
                "Databases, Python, business understanding and communication",
              ],
              [
                "Semester 5",
                "Java Programming; Subject Area Elective; Cloud Computing; Minor Project; Open Electives; Emotional Intelligence; Public Relations",
                "Java, cloud concepts, project experience and professional skills",
              ],
              [
                "Semester 6",
                "Major Project; Project Management; Subject Area Electives; Open Elective; Corporate Communication; Stock Market & Investment",
                "Capstone/project execution, management and professional readiness",
              ],
            ],
          },
          {
            kind: "h3",
            text: "What you actually learn",
          },
          {
            kind: "list",
            items: [
              "Programming and problem-solving fundamentals",
              "Data structures and algorithms",
              "Object-oriented programming",
              "Web technologies",
              "Database management systems",
              "Operating systems",
              "Python and Java programming",
              "Software engineering",
              "Cloud computing",
              "Project and professional communication skills",
            ],
          },
        ],
      },
      {
        heading: "Fees for Indian students",
        blocks: [
          {
            kind: "table",
            caption: "Online BCA fee structure (Indian students)",
            head: ["Fee component", "Pay after placement", "Standard BCA"],
            rows: [
              ["Application fee", "INR 500*", "INR 500*"],
              ["Regular fee", "INR 1,20,000", "INR 1,20,000"],
              ["Scholarship amount", "INR 13,500", "INR 30,000"],
              ["Fee after scholarship", "INR 1,06,500", "INR 90,000"],
              ["Fee per semester", "INR 14,200", "INR 15,000"],
              ["Payable before placement", "INR 85,200", "INR 15,000 × 6"],
              ["Payable after placement", "INR 21,300", "Not applicable"],
              [
                "Merit scholarship",
                "10% for >90% in qualifying criteria",
                "10% for >90% in qualifying criteria",
              ],
              [
                "Other options",
                "10% one-time payment discount; 5% annual payment discount; EMI/loan options",
                "10% one-time payment discount; 5% annual payment discount; EMI/loan options",
              ],
            ],
          },
          {
            kind: "note",
            text: "Application fee is non-refundable. Fee figures are admission-cycle specific — recheck them on the current admission portal before paying.",
          },
        ],
      },
      {
        heading: "Fees for international students",
        blocks: [
          {
            kind: "table",
            caption: "International Online BCA fee",
            head: [
              "Region",
              "Standard fee",
              "Scholarship",
              "Fee after scholarship",
              "Per semester",
            ],
            rows: [
              ["Africa", "$2,500", "$1,000", "$1,500", "$250"],
              ["Other listed regions", "$2,000", "$500", "$1,500", "$250"],
              ["Application fee", "$50", "—", "—", "—"],
            ],
          },
        ],
      },
      {
        heading: "Admission process",
        blocks: [
          {
            kind: "list",
            ordered: true,
            items: [
              "Explore the programme — review curriculum, eligibility, fees, learning model and career objectives.",
              "Register and apply — submit personal and academic information.",
              "Upload documents — academic, identity and supporting documents.",
              "Pay the application fee.",
              "Document verification by the university.",
              "Admission confirmation and portal access.",
              "Start learning — orientation, LMS access and semester modules.",
            ],
          },
          {
            kind: "cta",
            title: "Get the current BCA fee for your admission cycle",
            body: "Fees and scholarships change per session — share your details and we will confirm the exact figures.",
            buttonLabel: "Get fee details",
          },
        ],
      },
      {
        heading: "Career opportunities after Online BCA",
        blocks: [
          {
            kind: "p",
            text: "A BCA is primarily a foundation-level technology degree, so outcomes depend on technical skill, projects, internships, communication and portfolio quality as much as on the degree itself.",
          },
          {
            kind: "table",
            caption: "Career areas and roles",
            head: ["Career area", "Possible roles"],
            rows: [
              ["Software development", "Junior Software Developer, Application Developer"],
              ["Web development", "Web Developer, Front-End Developer"],
              ["Database & systems", "Database Support Executive, System Support Associate"],
              ["IT support", "Technical Support Executive, IT Support Associate"],
              ["Analysis & operations", "Junior System Analyst, Operations/Technology Associate"],
              [
                "Further education",
                "MCA, specialised certifications or other eligible postgraduate programmes",
              ],
            ],
          },
          {
            kind: "links",
            title: "Related reading",
            items: [
              {
                label: "Shoolini Online fees, full breakdown",
                href: "/blogs/shoolini-online-fees-2026-complete-breakdown",
              },
              { label: "Online BCA course guide", href: "/courses/online-bca" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: "What is the eligibility for Shoolini Online BCA?",
        answer:
          "10+2 or equivalent in any stream from a recognised board, subject to the applicable admission rules for the academic session.",
      },
      {
        question: "What is the fee for Shoolini Online BCA?",
        answer:
          "The standard fee is INR 1,20,000, reducing to INR 90,000 after a INR 30,000 scholarship, paid as INR 15,000 per semester. Under pay-after-placement, the fee after a INR 13,500 scholarship is INR 1,06,500, with INR 85,200 payable before placement and INR 21,300 after.",
      },
      {
        question: "Is there an international fee for the BCA?",
        answer:
          "Yes — USD 2,000-2,500 standard depending on region, reducing to USD 1,500 after scholarship, billed at USD 250 per semester, plus a USD 50 application fee.",
      },
      {
        question: "What will I learn in the BCA?",
        answer:
          "Programming fundamentals, data structures, OOP, web technologies, DBMS, operating systems, Python, Java, software engineering, cloud computing and project work.",
      },
      {
        question: "What jobs can I get after this BCA?",
        answer:
          "Entry-level roles such as Junior Software Developer, Web Developer, Database Support Executive and Technical Support Executive, or progression to an MCA.",
      },
    ],
    sources: [
      { label: "Shoolini University official website", href: "https://shooliniuniversity.com/" },
    ],
    related: [
      { label: "Shoolini University Online", href: "/universities/shoolini-online" },
      { label: "Online BCA course guide", href: "/courses/online-bca" },
      {
        label: "Shoolini Online fees breakdown",
        href: "/blogs/shoolini-online-fees-2026-complete-breakdown",
      },
    ],
    cta: "Comparing BCA options across universities? Send us your budget and we will shortlist the ones that fit.",
  },

  /* ============================ POST 3: Online B.Com (Honours) ============================ */
  "shoolini-online-bcom-honours-2026-guide": {
    ...base,
    updated: UPDATED,
    intro:
      "Shoolini University Online B.Com (Honours) is a three-year commerce degree covering accounting, finance, taxation, business law, marketing and management, built for Class 12 pass-outs who want a structured commerce foundation without relocating. This guide sets out the eligibility, semester-wise subjects, fee structure and the entry-level commerce roles the degree is meant to support.",
    keyTakeaways: [
      "Eligibility is 10+2 in any discipline with a minimum of 40 percent marks for Indian applicants (60 percent for international applicants).",
      "The programme runs 3 years across 6 semesters, from financial accounting and management fundamentals to taxation, financial management, business law and research methodology.",
      "Fee for Indian students is INR 1,20,000 before scholarship, reducing to INR 90,000 after a INR 30,000 scholarship — INR 15,000 per semester.",
      "A merit scholarship of 10 percent is available for students scoring above 90 percent in Class 12.",
      "International students pay USD 2,000-2,500 depending on region, reducing to USD 1,500 after scholarship at USD 250 per semester.",
      "Career scope spans accounting, finance, banking, taxation, business operations and sales, plus eligibility for an MBA or M.Com afterward.",
    ],
    sections: [
      {
        heading: "Fees first: what the degree costs",
        blocks: [
          {
            kind: "table",
            caption: "Online B.Com (Honours) fee structure — Indian students",
            head: ["Component", "Indian students"],
            rows: [
              ["Application fee", "INR 500*"],
              ["Regular programme fee", "INR 1,20,000"],
              ["Scholarship amount", "INR 30,000"],
              ["Fee after scholarship", "INR 90,000"],
              ["Fee per semester", "INR 15,000"],
              ["Duration", "6 semesters / 3 years"],
              ["Merit scholarship", "10% for >90% in Class 12, as published"],
              ["Payment options", "Semester / annual / full-fee options subject to current terms"],
              ["EMI", "No-interest EMI/loan options are listed, subject to terms"],
            ],
          },
          {
            kind: "table",
            caption: "International Online B.Com fee",
            head: [
              "Region",
              "Standard fee",
              "Scholarship",
              "Fee after scholarship",
              "Per semester",
            ],
            rows: [
              ["Africa", "$2,500", "$1,000", "$1,500", "$250"],
              ["Other listed regions", "$2,000", "$500", "$1,500", "$250"],
              ["Application fee", "$50", "—", "—", "—"],
            ],
          },
          {
            kind: "note",
            text: "Application fee is non-refundable. Confirm the final fee and scholarship eligibility with the current admission portal before paying.",
          },
        ],
      },
      {
        heading: "Eligibility",
        blocks: [
          {
            kind: "table",
            caption: "Eligibility criteria",
            head: ["Parameter", "Eligibility"],
            rows: [
              ["Qualification", "10+2 / equivalent"],
              ["Stream", "Any discipline"],
              ["Indian applicants", "Minimum 40% in the last qualifying examination"],
              [
                "International applicants",
                "Minimum 60% in the qualifying examination, as published",
              ],
              ["Duration", "3 years / 6 semesters"],
              ["Mode", "Fully online"],
            ],
          },
        ],
      },
      {
        heading: "What the six semesters cover",
        blocks: [
          {
            kind: "p",
            text: "The curriculum moves progressively from accounting, economics and management fundamentals to corporate accounting, taxation, financial management, business law, auditing, strategic management and research/project work — a connected foundation for careers in accounting, finance, banking, taxation and business operations.",
          },
          {
            kind: "table",
            caption: "Semester-wise subjects",
            head: ["Semester", "Major subjects", "Learning focus"],
            rows: [
              [
                "Semester 1",
                "Functional English 1; Principles of Management; Financial Accounting; Creativity Decoded; Open Electives",
                "Commerce fundamentals, accounting, management and communication",
              ],
              [
                "Semester 2",
                "Entrepreneurship; Functional English 2; Computerized Accounting Systems; Human Resource Management; Open Electives",
                "Accounting technology, HR, entrepreneurship and professional communication",
              ],
              [
                "Semester 3",
                "Acing Interviews through AI; Marketing Management; Marketing Research; Principles of Economics; Open Electives",
                "Marketing, economics, research and employability",
              ],
              [
                "Semester 4",
                "Business Statistics; Business Law; Financial Management; Organisational Behaviour; Open Elective",
                "Quantitative business analysis, finance, law and people management",
              ],
              [
                "Semester 5",
                "Taxation; Sales Management; Cost Accounting; Subject Area Elective; Open Electives",
                "Tax, sales, cost control and applied commerce",
              ],
              [
                "Semester 6",
                "Subject Area Electives; Research Methodology; Open Electives; Effective Negotiations & Conflict Management",
                "Research, advanced electives, negotiation and final academic application",
              ],
            ],
          },
          {
            kind: "h3",
            text: "Core learning areas",
          },
          {
            kind: "list",
            items: [
              "Financial accounting and computerized accounting",
              "Cost accounting and taxation",
              "Business economics and statistics",
              "Financial management",
              "Business law",
              "Marketing and sales management",
              "Human resource and organisational behaviour",
              "Entrepreneurship",
              "Research methodology",
              "Business communication and negotiation",
            ],
          },
        ],
      },
      {
        heading: "Admission steps",
        blocks: [
          {
            kind: "list",
            ordered: true,
            items: [
              "Explore the programme — review curriculum, eligibility, fees and career direction.",
              "Register online with personal and academic information.",
              "Submit documents — academic and identity documents.",
              "Pay the application fee (non-refundable).",
              "Verification by the university.",
              "Admission confirmation and learner-portal access.",
              "Start classes — orientation, LMS access and semester begins.",
            ],
          },
          {
            kind: "cta",
            title: "Not sure if B.Com Honours or a general B.Com fits better?",
            body: "Tell us your target field — accounting, finance, banking or taxation — and we will point you to the right subject mix.",
            buttonLabel: "Get guidance",
          },
        ],
      },
      {
        heading: "Career scope after graduation",
        blocks: [
          {
            kind: "table",
            caption: "Career domains and roles",
            head: ["Career domain", "Possible roles"],
            rows: [
              ["Accounting", "Accounts Executive, Junior Accountant, Accounting Associate"],
              ["Finance", "Finance Operations Associate, Junior Financial Analyst"],
              ["Banking", "Banking Operations Associate, Relationship/Service Executive"],
              ["Taxation", "Tax Assistant, GST/Tax Support Executive"],
              ["Business operations", "Business Operations Associate, Process Executive"],
              ["Sales & marketing", "Sales Executive, Marketing Associate"],
              [
                "Entrepreneurship",
                "Small business/freelance business services, startup operations",
              ],
              [
                "Higher studies",
                "MBA, M.Com or other eligible postgraduate/professional programmes",
              ],
            ],
          },
          {
            kind: "note",
            text: "Career progression depends on practical skills, professional certifications, internships and experience — the degree is a foundation, not a guarantee.",
          },
          {
            kind: "links",
            title: "Keep exploring",
            items: [
              {
                label: "Shoolini Online fees, full breakdown",
                href: "/blogs/shoolini-online-fees-2026-complete-breakdown",
              },
              { label: "Online B.Com course guide", href: "/courses/online-bcom" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: "What is the eligibility for Shoolini Online B.Com (Honours)?",
        answer:
          "10+2 in any discipline with a minimum of 40% marks for Indian applicants, or 60% for international applicants, in the qualifying examination.",
      },
      {
        question: "What is the fee after scholarship?",
        answer:
          "INR 90,000 after the standard INR 30,000 scholarship on a total fee of INR 1,20,000, paid as INR 15,000 per semester across 6 semesters.",
      },
      {
        question: "Is there a merit scholarship?",
        answer:
          "Yes, 10% for students scoring above 90% in Class 12, as published by the university.",
      },
      {
        question: "What subjects will I study?",
        answer:
          "Financial accounting, computerized accounting, marketing management, business statistics, business law, financial management, taxation, cost accounting and research methodology, among others across six semesters.",
      },
      {
        question: "What can I do after this B.Com?",
        answer:
          "Entry-level roles in accounting, finance, banking, taxation, business operations and sales, or progression to an MBA or M.Com.",
      },
    ],
    sources: [
      { label: "Shoolini University official website", href: "https://shooliniuniversity.com/" },
    ],
    related: [
      { label: "Shoolini University Online", href: "/universities/shoolini-online" },
      { label: "Online B.Com course guide", href: "/courses/online-bcom" },
      {
        label: "Shoolini Online fees breakdown",
        href: "/blogs/shoolini-online-fees-2026-complete-breakdown",
      },
    ],
    cta: "Want the exact B.Com fee for your admission cycle confirmed before you pay? Reach out and we will verify it for you.",
  },

  /* ============================ POST 4: Fees 2026 (university-wide) ============================ */
  "shoolini-online-fees-2026-complete-breakdown": {
    ...base,
    updated: UPDATED,
    intro:
      "Shoolini University Online publishes semester-wise fees across five programmes — Online BBA, BCA, B.Com (Honours), MBA and MA — with EMI, scholarships and a Pay-After-Placement option layered on top. This is the course-wise fee pillar: use it to compare every Shoolini Online programme side by side before you commit to one.",
    keyTakeaways: [
      "Semester fees: Online BBA and BCA are INR 17,500 each, B.Com (Honours) and MA are INR 15,000 each, and MBA is INR 35,500 — all with EMI available.",
      "UG programmes (BBA, BCA, B.Com Honours) run 3 years; PG programmes (MBA, MA) run 2 years.",
      "The Pay-After-Placement (PAP) model lets eligible students pay 70 percent of tuition upfront and the remaining 30 percent after securing employment.",
      "Students who opt out of PAP get a 20 percent course-cost reduction; a further 10 percent applies for one-time full payment and 5 percent for annual payment.",
      "Fees do not include application charges, examination-related charges or other admission-cycle-specific costs — these are billed separately.",
      "Admission runs through five steps: register, apply and upload documents, verification, fee payment, and confirmation with LMS access.",
    ],
    sections: [
      {
        heading: "Course-wise fee comparison",
        blocks: [
          {
            kind: "table",
            caption: "Shoolini University Online — course-wise fee comparison",
            head: ["Course", "Degree type", "Duration", "Semester fee"],
            rows: [
              ["Online MBA", "Master's", "2 years", "INR 35,500"],
              ["Online MA", "Master's", "2 years", "INR 15,000"],
              ["Online BBA", "Bachelor's", "3 years", "INR 17,500"],
              ["Online BCA", "Bachelor's", "3 years", "INR 17,500"],
              ["Online B.Com (Hons.)", "Bachelor's", "3 years", "INR 15,000"],
            ],
          },
          {
            kind: "note",
            text: "These are the university-published semester fees. Course-specific offers, scholarships and pay-after-placement terms can bring the effective fee down further — see the dedicated course pages for those figures.",
          },
        ],
      },
      {
        heading: "Undergraduate fee structure",
        blocks: [
          {
            kind: "p",
            text: "Undergraduate programmes are designed for students who have completed 10+2 and want a bachelor's degree through flexible online learning.",
          },
          {
            kind: "table",
            caption: "Online UG fee structure",
            head: ["Course", "Duration", "Semester fee", "EMI available"],
            rows: [
              ["Online BBA", "3 years", "INR 17,500", "Yes"],
              ["Online BCA", "3 years", "INR 17,500", "Yes"],
              ["Online B.Com (Hons.)", "3 years", "INR 15,000", "Yes"],
            ],
          },
        ],
      },
      {
        heading: "Postgraduate fee structure",
        blocks: [
          {
            kind: "p",
            text: "Postgraduate learners can choose between the Online MBA and Online MA, priced very differently per semester.",
          },
          {
            kind: "table",
            caption: "Online PG fee structure",
            head: ["Course", "Duration", "Semester fee", "EMI available"],
            rows: [
              ["Online MBA", "2 years", "INR 35,500", "Yes"],
              ["Online MA", "2 years", "INR 15,000", "Yes"],
            ],
          },
          {
            kind: "cta",
            title: "Compare Shoolini fees against other universities",
            body: "See how these semester fees stack up against other UGC-entitled online universities before you decide.",
            buttonLabel: "Compare universities",
          },
        ],
      },
      {
        heading: "Payment options: EMI, discounts and Pay-After-Placement",
        blocks: [
          {
            kind: "list",
            items: [
              "No-interest EMI and education-loan support across listed programmes.",
              "Semester-based instalments as the default payment structure.",
              "Pay-After-Placement (PAP): eligible students pay 70% of tuition upfront and the remaining 30% after securing employment.",
              "20% course-cost reduction for students who opt out of the PAP route.",
              "10% discount for one-time full-course payment.",
              "Additional 5% discount for annual payment.",
            ],
          },
          {
            kind: "note",
            text: "Availability and exact terms of PAP, scholarships and discounts should be verified at the time of admission — they can change by cycle.",
          },
        ],
      },
      {
        heading: "What the fee does not include",
        blocks: [
          {
            kind: "p",
            text: "Before paying, check the latest university-published fee schedule, applicable scholarships, payment-plan eligibility, application charges, examination-related charges, refund rules, and any conditions attached to Pay-After-Placement or discount offers.",
          },
          {
            kind: "list",
            items: [
              "Application fee is billed separately and is typically non-refundable.",
              "Examination charges are published separately by the university.",
              "Refund terms differ by admission cycle — confirm before paying.",
            ],
          },
        ],
      },
      {
        heading: "Admission and fee payment process",
        blocks: [
          {
            kind: "list",
            ordered: true,
            items: [
              "Register online with personal and academic information.",
              "Complete the application and upload the required documents.",
              "The university reviews the submitted information and supporting documents.",
              "Pay the applicable semester or course fee using the available payment method.",
              "Receive admission confirmation and LMS access to begin learning.",
            ],
          },
          {
            kind: "links",
            title: "Go deeper on a specific course",
            items: [
              {
                label: "Online MBA: specialisations, eligibility, careers",
                href: "/blogs/shoolini-online-mba-2026-fees-eligibility-careers",
              },
              {
                label: "Online BCA: curriculum and fees",
                href: "/blogs/shoolini-online-bca-2026-fees-eligibility-careers",
              },
              {
                label: "Online B.Com (Honours) guide",
                href: "/blogs/shoolini-online-bcom-honours-2026-guide",
              },
            ],
          },
        ],
      },
      {
        heading: "Who this fee structure suits",
        blocks: [
          {
            kind: "p",
            text: "The model works well for professionals studying alongside work, recent graduates seeking further qualifications, entrepreneurs building business knowledge, and learners who need flexible payment options such as EMI or Pay-After-Placement rather than a large upfront outlay.",
          },
          {
            kind: "promo",
            title: "See the full Shoolini Online university profile",
            body: "Recognition, programmes and admission timelines for Shoolini University Online in one place.",
            ctaLabel: "View Shoolini University Online",
            href: "/universities/shoolini-online",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "What is the semester fee for Shoolini University Online BCA?",
        answer: "INR 17,500 per semester.",
      },
      {
        question: "What is the semester fee for Shoolini University Online BBA?",
        answer: "INR 17,500 per semester.",
      },
      {
        question: "What is the semester fee for Online B.Com (Hons.)?",
        answer: "INR 15,000 per semester.",
      },
      {
        question: "What is the semester fee for Shoolini University Online MBA?",
        answer: "INR 35,500 per semester.",
      },
      {
        question: "What is the semester fee for Online MA?",
        answer: "INR 15,000 per semester.",
      },
      {
        question: "Are EMI options available?",
        answer: "Yes, EMI is marked as available for all five listed programmes.",
      },
      {
        question: "Does Shoolini University Online offer a Pay-After-Placement option?",
        answer:
          "Yes, for eligible students, with 70% of tuition paid upfront and 30% paid after securing employment. Exact terms should be confirmed at admission.",
      },
      {
        question: "Is there a discount for paying the full course fee at once?",
        answer:
          "Yes, a 10% one-time payment discount is offered, plus an additional 5% discount for annual payment.",
      },
      {
        question: "Does the fee structure remain the same for every course?",
        answer:
          "No. Semester fees vary by programme, so check the specific course fee before applying.",
      },
    ],
    sources: [
      { label: "Shoolini University official website", href: "https://shooliniuniversity.com/" },
    ],
    related: [
      { label: "Shoolini University Online", href: "/universities/shoolini-online" },
      { label: "Online MBA course guide", href: "/courses/online-mba" },
      { label: "Compare universities", href: "/compare" },
    ],
    cta: "Need the current fee and scholarship confirmed for your exact programme? Share your details and we will verify it against the official fee page.",
  },
};
