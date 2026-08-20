import type { PostContent } from "@/data/posts";
import type { Article } from "@/lib/content";

const base = { reviewer: "Kartik Ahuja", reviewerRole: "Education Research Lead, DegreeKhojo" };
const UPDATED = "2026-08-18";

export const parulOnlineArticles: Article[] = [
  {
    slug: "parul-university-online-learning-2026-guide",
    title: "Parul University Online Learning 2026: Courses, Fees & Accreditation",
    excerpt:
      "A complete guide to Parul University's online course portfolio, fees, accreditation, LMS, industry exposure and career support for 2026.",
    category: "Study Guides",
    categorySlug: "study-guides",
    tags: ["parul-university-online", "online-degree-fees", "online-degree-review"],
    author: "Kartik Ahuja",
    authorSlug: "kartik-ahuja",
    date: "2026-08-18",
    readingTime: "13 min",
    kind: "blog",
  },
  {
    slug: "parul-university-online-mba-admission-2026",
    title: "Parul University Online MBA Admission 2026: Fees & Specialisations",
    excerpt:
      "Parul University Online MBA fees, eligibility, admission process, 20 specialisations, subjects, salary ranges and placement support for 2026.",
    category: "Admission Guidance",
    categorySlug: "admission-guidance",
    tags: ["parul-university-online", "online-mba", "online-mba-fees", "admission-process"],
    author: "Kartik Ahuja",
    authorSlug: "kartik-ahuja",
    date: "2026-08-18",
    readingTime: "14 min",
    kind: "blog",
  },
];

export const parulOnlinePosts: Record<string, PostContent> = {
  /* ============================ POST 1: Online Learning overview ============================ */
  "parul-university-online-learning-2026-guide": {
    ...base,
    updated: UPDATED,
    intro:
      "Parul University runs a 150+ acre campus in Vadodara, Gujarat with a student community of 50,000+ learners, and its online portfolio spans undergraduate, postgraduate, PG diploma and diploma programmes across management, computer applications, arts and commerce. Fees on the online side range from ₹25,000 for a one-year diploma to ₹1,50,000 for the two-year MBA. Here is what the accreditation, course list, LMS and career support actually cover.",
    keyTakeaways: [
      "Parul University holds NAAC A++, UGC-DEB and QS I-GAUGE Diamond Rated status.",
      "Online UG programmes (BBA, BCA, BA) are each listed at INR 1,11,000 for 3 years.",
      "Online PG programmes range from INR 60,000 (M.A., M.Com, M.Sc. Applied Mathematics, MSW) to INR 1,50,000 (MBA); MCA is INR 80,000.",
      "Four one-year diploma programmes are priced at INR 25,000 each, and a PG diploma in Industrial Relations & Personnel Management is INR 30,000.",
      "The university reports 700+ industry collaborations, 2,200 recruiters, a highest package of 30 LPA and an average package of 8 LPA at the institutional level.",
      "Learning is delivered through live classes, a digital library, video resources, projects, case studies and an online examination platform.",
    ],
    sections: [
      {
        heading: "Parul University Online: overview and accreditation",
        blocks: [
          {
            kind: "table",
            caption: "Key highlights",
            head: ["Particular", "Details"],
            rows: [
              ["University", "Parul University"],
              ["Location", "Vadodara, Gujarat"],
              ["Campus", "150+ acres"],
              ["Student Community", "50,000+ students"],
              ["International Students", "3,500+ students from 68 countries"],
              ["NAAC Grade", "A++"],
              ["Industry Exposure", "700+ industry collaborations"],
            ],
          },
          {
            kind: "list",
            items: ["NAAC A++", "UGC-DEB", "QS I-GAUGE Diamond Rated"],
          },
          {
            kind: "note",
            text: "Recognition and accreditation are important considerations for online learners since they can influence the credibility and acceptance of a qualification — verify current status before applying.",
          },
        ],
      },
      {
        heading: "Online course fees by level",
        blocks: [
          {
            kind: "table",
            caption: "UG online courses",
            head: ["Course", "Duration", "Total Fees"],
            rows: [
              ["BBA", "3 Years", "INR 1,11,000"],
              ["BCA", "3 Years", "INR 1,11,000"],
              ["BA", "3 Years", "INR 1,11,000"],
            ],
          },
          {
            kind: "table",
            caption: "PG online courses",
            head: ["Course", "Duration", "Total Fees"],
            rows: [
              ["M.A.", "2 Years", "INR 60,000"],
              ["MBA", "2 Years", "INR 1,50,000"],
              ["M.Com", "2 Years", "INR 60,000"],
              ["MCA", "2 Years", "INR 80,000"],
              ["M.Sc. Applied Mathematics", "2 Years", "INR 60,000"],
              ["Master of Social Work (MSW)", "2 Years", "INR 60,000"],
            ],
          },
          {
            kind: "table",
            caption: "PG diploma and diploma courses",
            head: ["Course", "Duration", "Total Fees"],
            rows: [
              [
                "PG Diploma in Industrial Relations and Personnel Management",
                "1 Year",
                "INR 30,000",
              ],
              ["Diploma in Financial Services and Portfolio Management", "1 Year", "INR 25,000"],
              ["Diploma Programme in Business Analytics", "1 Year", "INR 25,000"],
              ["Diploma Programme in Blockchain Technology", "1 Year", "INR 25,000"],
              ["Diploma Programme in Digital Marketing", "1 Year", "INR 25,000"],
            ],
          },
          {
            kind: "note",
            text: "Fees range from INR 25,000 to INR 1,50,000 depending on programme level and type. Instalment and payment options are available; always check the programme-specific fee before admission.",
          },
        ],
      },
      {
        heading: "7 reasons applicants consider Parul Online",
        blocks: [
          {
            kind: "list",
            ordered: true,
            items: [
              "Flexible 100% online learning — lectures, examinations and viva-related activities accessed through the LMS.",
              "Faculty mentorship from experienced professors.",
              "Placement assistance and career development support.",
              "700+ industry collaborations for professional exposure.",
              "Entrepreneurship sessions and interaction with leading entrepreneurs.",
              "NAAC A++ recognition as an indicator of academic quality.",
              "Flexible payment options, including instalments.",
            ],
          },
          {
            kind: "promo",
            title: "See Parul's full online programme list",
            body: "Compare Parul's online MBA, MCA, BBA, BCA and diploma programmes on DegreeKhojo before you apply.",
            ctaLabel: "View Parul University Online",
            href: "/universities/parul-online",
          },
        ],
      },
      {
        heading: "Study material and LMS experience",
        blocks: [
          {
            kind: "p",
            text: "The online learning environment is built around interactive live classrooms, a digital library and video resources, so students can access academic material without depending on a physical classroom. The learning approach also incorporates practical simulations, projects and case studies, and the university uses a dedicated examination platform to evaluate student understanding.",
          },
        ],
      },
      {
        heading: "Career development, recruiters and research ecosystem",
        blocks: [
          {
            kind: "p",
            text: "Parul University reports an ASSOCHAM award for best university in placements, 2,200 recruiters, a highest package of 30 LPA and an average package of 8 LPA. These are university-level figures and should not be read as guaranteed outcomes for any specific online programme.",
          },
          {
            kind: "table",
            caption: "Top recruiters",
            head: ["Recruiter", "Recruiter", "Recruiter"],
            rows: [
              ["Amazon", "TCS", "L&T"],
              ["BYJU's", "Vodafone", "ABB"],
              ["Reliance Digital", "Code Nation", "Extra Marks"],
            ],
          },
          {
            kind: "list",
            items: [
              "INR 12+ crores granted for innovation, with 180+ startups incubated.",
              "15Cr+ in research grants and 500+ PhD research guides.",
              "320+ patents filed and granted.",
              "100+ visiting faculty and semester exchange / pathway programme opportunities.",
            ],
          },
        ],
      },
      {
        heading: "Who should consider it, and what to check first",
        blocks: [
          {
            kind: "list",
            items: [
              "Students seeking an undergraduate degree through online mode.",
              "Graduates looking for postgraduate education without relocating.",
              "Working professionals who need flexibility around professional commitments.",
              "Learners interested in management, computer applications, arts, commerce and related disciplines.",
              "Learners interested in entrepreneurship, industry exposure or global academic opportunities.",
            ],
          },
          {
            kind: "note",
            text: "Compare the current course fee, eligibility criteria, curriculum, examination pattern, specialisations, admission dates and scholarship or payment options for the specific programme you want, since university-level placement figures can vary by programme.",
          },
          {
            kind: "links",
            title: "Related reading",
            items: [
              {
                label: "Parul University Online MBA: fees, specialisations and careers",
                href: "/blogs/parul-university-online-mba-admission-2026",
              },
              { label: "Compare Parul with other online universities", href: "/compare" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Is Parul University recognised for online education?",
        answer:
          "Yes — the university holds NAAC A++, UGC-DEB and QS I-GAUGE Diamond Rated credentials.",
      },
      {
        question: "What online courses does Parul University offer?",
        answer:
          "BBA, BCA, BA, M.A., MBA, M.Com, MCA, M.Sc. Applied Mathematics, MSW, a PG diploma in Industrial Relations and Personnel Management, and diploma programmes in Financial Services, Business Analytics, Blockchain Technology and Digital Marketing.",
      },
      {
        question: "What is the fee range for Parul University online programmes?",
        answer:
          "Fees range from INR 25,000 for one-year diplomas to INR 1,50,000 for the two-year online MBA.",
      },
      {
        question: "Does Parul University provide placement support for online learners?",
        answer:
          "The university states it provides placement assistance, career development and placement training, alongside 700+ industry collaborations.",
      },
      {
        question: "How long are Parul University's online programmes?",
        answer:
          "Undergraduate programmes generally run 3 years, postgraduate programmes run 2 years, and the listed diploma programmes run 1 year.",
      },
    ],
    sources: [
      { label: "Parul University official website", href: "https://paruluniversity.ac.in/" },
      { label: "UGC DEB online education portal", href: "https://deb.ugc.ac.in/" },
    ],
    related: [
      {
        label: "Parul University Online MBA admission guide",
        href: "/blogs/parul-university-online-mba-admission-2026",
      },
      { label: "Explore Parul University Online", href: "/universities/parul-online" },
      { label: "Compare online universities", href: "/compare" },
    ],
    cta: "Weighing Parul against other online universities? Share your target programme and budget and we will map the right fit for you.",
  },

  /* ============================ POST 2: Online MBA admission ============================ */
  "parul-university-online-mba-admission-2026": {
    ...base,
    updated: UPDATED,
    intro:
      "Parul University Online MBA is a two-year postgraduate management programme delivered through an LMS with live classes, chat rooms and discussion boards, backed by UGC-DEB recognition, NAAC A++ accreditation and an NIRF rank. The published fee is INR 1,50,000 as a total programme fee, with lump-sum and yearly alternatives. Here is the full admission, fee, specialisation and career picture for 2026.",
    keyTakeaways: [
      "Total/programme fee is INR 1,50,000, with a lump-sum option of INR 99,000, a yearly option of INR 1,20,000 and a semester fee of INR 37,500.",
      "Eligibility: bachelor's degree with 50% marks (General) or 45% (Reserved Category); no upper age limit specified.",
      "20 specialisations are listed, from Agribusiness Management and Business Analytics to Public Policy and Tourism & Event Management.",
      "The programme runs across four semesters with a Comprehensive Project and Summer Internship Project built into Year 2.",
      "The university states 700+ hiring partners and placement assistance, with key recruiters including Reliance Digital, Amazon, L&T, Vodafone and TCS.",
      "Reported salary ranges span roughly INR 4 LPA to INR 18 LPA depending on function, and are indicative, not guaranteed.",
    ],
    sections: [
      {
        heading: "Programme highlights",
        blocks: [
          {
            kind: "table",
            caption: "Parul Online MBA at a glance",
            head: ["Category", "Details"],
            rows: [
              ["Ownership", "Private"],
              ["Course Name", "Online MBA"],
              ["Course Level", "Postgraduate (PG)"],
              ["Eligibility", "Bachelor's degree from a recognised university"],
              ["Course Duration", "2 years"],
              ["Exam Mode", "Online"],
              ["Lump Sum Fee", "INR 99,000"],
              ["Yearly Fee", "INR 1,20,000"],
              ["Semester-Wise Fee", "INR 37,500 per semester"],
              ["Key Recruiters", "Reliance Digital, Amazon, L&T, Vodafone, TCS"],
            ],
          },
          {
            kind: "list",
            items: ["UGC-DEB", "NAAC Grade A++", "NIRF Ranked"],
          },
        ],
      },
      {
        heading: "Eligibility and admission process",
        blocks: [
          {
            kind: "p",
            text: "Applicants need a bachelor's degree from a recognised university, with 50% marks in graduation for General Category candidates and 45% for Reserved Category candidates. No upper age restriction is specified, so the programme is open to fresh graduates and working professionals alike.",
          },
          {
            kind: "list",
            ordered: true,
            items: [
              "Visit the official Parul University online admission website and open the MBA application form.",
              "Enter personal, academic and communication details accurately.",
              "Upload the required documents according to the prescribed specifications.",
              "Pay the applicable registration/admission fee.",
              "Submit the application and complete the required verification process.",
            ],
          },
          {
            kind: "h3",
            text: "Documents required",
          },
          {
            kind: "list",
            items: [
              "Bachelor's degree / graduation certificate",
              "Graduation marksheets",
              "Class 10 and Class 12 marksheets",
              "Valid government-issued identity proof",
              "Recent passport-size photograph",
              "Signature and other documents requested during application",
            ],
          },
        ],
      },
      {
        heading: "Fee structure 2026",
        blocks: [
          {
            kind: "table",
            caption: "Payment options",
            head: ["Fee Option", "Amount"],
            rows: [
              ["Lump Sum Fee", "INR 99,000"],
              ["Total / Programme Fee", "INR 1,50,000"],
              ["Semester Fee", "INR 37,500 per semester"],
              ["Yearly Fee", "INR 1,20,000"],
              ["Flexible Payment", "Instalment / EMI options are mentioned in the source"],
            ],
          },
          {
            kind: "note",
            text: "Confirm the latest fee schedule, applicable examination charges, scholarships and payment terms with the university before making a payment.",
          },
          {
            kind: "cta",
            title: "Confirm the current Parul Online MBA fee",
            body: "Share your intake and category and we will verify the live lump-sum, yearly and semester fee for you.",
            buttonLabel: "Check my MBA fee",
          },
        ],
      },
      {
        heading: "20 MBA specialisations",
        blocks: [
          {
            kind: "list",
            items: [
              "Agribusiness Management",
              "Banking & Financial Services",
              "Business Analytics",
              "Digital Marketing & Sales",
              "Entrepreneurship & Innovation Management",
              "Family Managed Business",
              "Finance",
              "Forensic Accounting & Corporate Fraud Investigation",
              "Healthcare Management",
              "Human Resource Management",
              "Information Technology",
              "International Trade & Business",
              "Logistics & Supply Chain Management",
              "Marketing",
              "Operations Management",
              "Pharmaceutical Management",
              "Project Management",
              "Public Policy",
              "Retail Management",
              "Tourism & Event Management",
            ],
          },
        ],
      },
      {
        heading: "Semester-wise subjects",
        blocks: [
          {
            kind: "table",
            caption: "First year",
            head: ["Semester I", "Semester II"],
            rows: [
              ["Management Information System", "Cost and Management Accounting"],
              ["Principles of Management", "Financial Management"],
              ["Business Statistics", "Human Resource Management"],
              ["Accounting for Managers", "Research Methodology"],
              ["Business Economics & Environment", "Marketing Management"],
              ["Organisational Behaviour", "Operation Research"],
              ["Employability Skills – 1", "Employability Skills – 2"],
              ["Elective – 1 (Select any One)", "Elective – 2 (Select any One)"],
            ],
          },
          {
            kind: "table",
            caption: "Second year",
            head: ["Semester III", "Semester IV"],
            rows: [
              ["Legal Aspects of Business", "Strategic Management"],
              ["Comprehensive Project", "Summer Internship Project"],
              ["New Enterprise and Innovation Management", "Financial Markets and Services"],
              ["Financial Markets and Services", "Retail and Rural Banking"],
              ["Retail and Rural Banking", "Business Ethics and Corporate Governance"],
              ["Micro Finance", "Comprehensive Project"],
            ],
          },
        ],
      },
      {
        heading: "Placement support and career opportunities",
        blocks: [
          {
            kind: "p",
            text: "Students receive dedicated placement assistance and access to more than 700 hiring partners, according to the source. Career outcomes vary by experience, location, employer, skills and role.",
          },
          {
            kind: "table",
            caption: "Roles and indicative salary ranges",
            head: ["Job Role", "Typical Responsibilities", "Salary Range*"],
            rows: [
              [
                "Human Resources",
                "Recruitment, employee relations and benefits management.",
                "INR 4 LPA – 12 LPA",
              ],
              [
                "Management Consulting",
                "Advising organisations on efficiency, strategy and operations.",
                "INR 7 LPA – 18 LPA",
              ],
              [
                "Marketing Manager",
                "Developing and implementing marketing strategies and promoting products/services.",
                "INR 6 LPA – 15 LPA",
              ],
              [
                "Operations Manager",
                "Managing operations, supply chains and logistics.",
                "INR 4 LPA – 11 LPA",
              ],
              [
                "Entrepreneurship",
                "Building and managing a business based on market opportunities.",
                "Depends on business revenue",
              ],
              ["Finance", "Financial planning, analysis and reporting.", "INR 6 LPA – 18 LPA"],
              [
                "Healthcare",
                "Managing healthcare services, policies and programmes.",
                "INR 5 LPA – 10 LPA",
              ],
              [
                "Finance Manager",
                "Planning, budgeting, investments and organisational financial management.",
                "INR 8 LPA – 15 LPA",
              ],
              [
                "Information Technology",
                "Managing IT systems, infrastructure, data systems and emerging technologies.",
                "INR 6 LPA – 18 LPA",
              ],
            ],
          },
          {
            kind: "note",
            text: "Salary ranges are reproduced from the supplied source and should be treated as indicative, not guaranteed.",
          },
          {
            kind: "h3",
            text: "Key recruiters",
          },
          {
            kind: "list",
            items: [
              "Reliance Digital",
              "Amazon",
              "L&T",
              "Vodafone",
              "Tata Consultancy Services (TCS)",
            ],
          },
        ],
      },
      {
        heading: "Alumni feedback and who should apply",
        blocks: [
          {
            kind: "list",
            items: [
              "Neha: the programme's practical learning and industry exposure helped her move towards her desired management career.",
              "Amit: the global exposure and case-study-based approach helped build confidence in handling real-world business challenges.",
              "Priya: the flexible learning model and faculty support helped her upskill while continuing her career.",
            ],
          },
          {
            kind: "p",
            text: "The programme suits graduates seeking holistic business knowledge, working professionals studying alongside a job, and professionals planning a transition towards entrepreneurship or a specialised MBA pathway.",
          },
          {
            kind: "links",
            title: "Continue your research",
            items: [
              {
                label: "Parul University Online Learning: full course and fee guide",
                href: "/blogs/parul-university-online-learning-2026-guide",
              },
              { label: "Online MBA specialisations explained", href: "/courses/online-mba" },
              { label: "Compare online universities", href: "/compare" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Is Parul University Online MBA valid?",
        answer:
          "The programme carries UGC-DEB recognition and NAAC A++ accreditation. Verify the latest recognition status before admission.",
      },
      {
        question: "What is the duration of the Parul University Online MBA?",
        answer: "It is a two-year postgraduate programme divided into four semesters.",
      },
      {
        question: "What is the eligibility for the Parul University Online MBA?",
        answer:
          "A bachelor's degree from a recognised university, with 50% marks for General Category candidates and 45% for Reserved Category candidates.",
      },
      {
        question: "What is the Parul University Online MBA fee?",
        answer:
          "The total programme fee is INR 1,50,000, with a lump-sum option of INR 99,000, a yearly option of INR 1,20,000, and a semester fee of INR 37,500.",
      },
      {
        question: "How many specialisations does the Online MBA offer?",
        answer:
          "20 specialisations, including Finance, Marketing, Business Analytics, HR, IT, Operations, Healthcare Management, Public Policy and more.",
      },
      {
        question: "Is the Parul University Online MBA exam conducted online?",
        answer: "Yes, the examination mode is online.",
      },
    ],
    sources: [
      { label: "Parul University official website", href: "https://paruluniversity.ac.in/" },
      { label: "UGC DEB online education portal", href: "https://deb.ugc.ac.in/" },
    ],
    related: [
      {
        label: "Parul University Online Learning overview",
        href: "/blogs/parul-university-online-learning-2026-guide",
      },
      { label: "Online MBA fees across universities", href: "/courses/online-mba" },
      { label: "Compare online universities", href: "/compare" },
    ],
    cta: "Deciding on a specialisation for the Parul Online MBA? Tell us your target role and we'll help you shortlist the right track.",
  },
};
