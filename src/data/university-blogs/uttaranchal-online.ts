import type { PostContent } from "@/data/posts";
import type { Article } from "@/lib/content";

const base = { reviewer: "Kartik Ahuja", reviewerRole: "Education Research Lead, DegreeKhojo" };
const UPDATED = "2026-08-18";

export const uttaranchalOnlineArticles: Article[] = [
  {
    slug: "uttaranchal-university-online-fees-2026",
    title: "Uttaranchal University Online Fees 2026: MBA, MCA, BCA, BBA & BA",
    excerpt:
      "Course-wise Uttaranchal University Online fee structure for 2026 — MBA, MCA, BCA, BBA and BA, with scholarships, EMI and international fees.",
    category: "Fees & Scholarships",
    categorySlug: "fees-scholarships",
    tags: ["uttaranchal-university-online", "online-degree-fees", "online-mba-fees", "online-mca-fees"],
    author: "Kartik Ahuja",
    authorSlug: "kartik-ahuja",
    date: "2026-08-18",
    readingTime: "12 min",
    kind: "blog",
  },
  {
    slug: "uttaranchal-university-online-mba-mca-fees-2026",
    title: "Uttaranchal University Online MBA & MCA Fees 2026: Full Guide",
    excerpt:
      "A side-by-side look at Uttaranchal University Online MBA and MCA fees, specialisations, eligibility, admission steps and career paths for 2026.",
    category: "Admission Guidance",
    categorySlug: "admission-guidance",
    tags: ["uttaranchal-university-online", "online-mba", "online-mca", "admission-process"],
    author: "Kartik Ahuja",
    authorSlug: "kartik-ahuja",
    date: "2026-08-18",
    readingTime: "13 min",
    kind: "blog",
  },
  {
    slug: "uttaranchal-university-online-bba-fees-2026",
    title: "Uttaranchal University Online BBA Fees 2026: Curriculum & Careers",
    excerpt:
      "Uttaranchal University Online BBA fee structure, eligibility, semester-wise subjects, specialisations and placement support for 2026.",
    category: "Study Guides",
    categorySlug: "study-guides",
    tags: ["uttaranchal-university-online", "online-bba", "online-bba-fees", "online-degree-eligibility"],
    author: "Kartik Ahuja",
    authorSlug: "kartik-ahuja",
    date: "2026-08-18",
    readingTime: "12 min",
    kind: "blog",
  },
];

export const uttaranchalOnlinePosts: Record<string, PostContent> = {
  /* ============================ POST 1: University-wide fees ============================ */
  "uttaranchal-university-online-fees-2026": {
    ...base,
    updated: UPDATED,
    intro:
      "Uttaranchal University Online currently runs five UGC-entitled online programmes — MBA, MCA, BBA, BCA and BA — and every one of them is listed on the university's fee page with an early-bird scholarship already applied. This guide lays out the course-wise fee structure for 2026, the semester and annual payment options, international fees in USD, and the points worth confirming before you pay.",
    keyTakeaways: [
      "Discounted total programme fees range from ₹61,200 for the Online BA to ₹1,02,000 for the Online BBA and BCA.",
      "Online MBA is priced at ₹98,000 after a 30% early-bird scholarship, and Online MCA at ₹96,000 after a 20% scholarship.",
      "BBA, BCA and BA each carry a 15% early-bird scholarship on their published regular fee.",
      "Every programme fee shown includes an examination fee of ₹2,500 per semester on the current fee page.",
      "International students are billed separately in USD, from USD 300/semester for BA to USD 600/semester for MBA.",
      "An Online B.Com is not part of the current Online UU programme list and should not be assumed to exist.",
    ],
    sections: [
      {
        heading: "Uttaranchal University Online fees at a glance",
        blocks: [
          {
            kind: "table",
            caption: "2026 fee overview by programme",
            head: ["Programme", "Level", "Duration", "Semester Fee", "Annual Fee", "Published Total After Scholarship"],
            rows: [
              ["Online MBA", "PG", "2 Years", "₹24,500", "₹47,000", "₹98,000"],
              ["Online MCA", "PG", "2 Years", "₹24,000", "₹46,000", "₹96,000"],
              ["Online BBA", "UG", "3 Years", "₹17,000", "₹32,000", "₹1,02,000"],
              ["Online BCA", "UG", "3 Years", "₹17,000", "₹32,000", "₹1,02,000"],
              ["Online BA", "UG", "3 Years", "₹10,200", "₹18,400", "₹61,200"],
            ],
          },
          {
            kind: "note",
            text: "The published pages currently show scholarship / early-bird pricing. Fees and concessions can change by admission cycle, so confirm the final payable amount with the university before you pay.",
          },
        ],
      },
      {
        heading: "Online MBA fee breakdown",
        blocks: [
          {
            kind: "p",
            text: "The two-year Online MBA carries a 30% early-bird scholarship on the regular fee of ₹1,40,000, bringing the discounted total programme fee to ₹98,000. The examination fee of ₹2,500 per semester is already included in the published figure.",
          },
          {
            kind: "table",
            caption: "Online MBA payment options",
            head: ["Payment Option", "Published Amount"],
            rows: [
              ["Regular Programme Fee", "₹1,40,000"],
              ["Early-Bird Scholarship", "30%"],
              ["Discounted Total Programme Fee", "₹98,000"],
              ["One-Time Payment", "₹94,000"],
              ["Annual Payment", "₹47,000"],
              ["Semester Payment", "₹24,500"],
              ["Examination Fee", "₹2,500 per semester (included)"],
            ],
          },
        ],
      },
      {
        heading: "Online MCA fee breakdown",
        blocks: [
          {
            kind: "table",
            caption: "Online MCA payment options",
            head: ["Payment Option", "Published Amount"],
            rows: [
              ["Regular Programme Fee", "₹1,20,000"],
              ["Early-Bird Scholarship", "20%"],
              ["Discounted Total Programme Fee", "₹96,000"],
              ["One-Time Payment", "₹92,000"],
              ["Annual Payment", "₹46,000"],
              ["Semester Payment", "₹24,000"],
              ["Examination Fee", "₹2,500 per semester (included)"],
            ],
          },
          {
            kind: "cta",
            title: "Confirm the current Online MCA scholarship",
            body: "Early-bird rates are time-bound. Share your intake and we will check whether the 20% MCA scholarship still applies.",
            buttonLabel: "Check my fee",
          },
        ],
      },
      {
        heading: "Online BCA, BBA and BA fee breakdown",
        blocks: [
          {
            kind: "table",
            caption: "Online BCA fee",
            head: ["Payment Option", "Published Amount"],
            rows: [
              ["Regular Programme Fee", "₹1,20,000"],
              ["Early-Bird Scholarship", "15%"],
              ["Discounted Total Programme Fee", "₹1,02,000"],
              ["One-Time Payment", "₹96,000"],
              ["Annual Payment", "₹32,000"],
              ["Semester Payment", "₹17,000"],
              ["No-Cost EMI", "Available; amount depends on tenure/plan"],
            ],
          },
          {
            kind: "table",
            caption: "Online BBA fee",
            head: ["Payment Option", "Published Amount"],
            rows: [
              ["Regular Programme Fee", "₹1,20,000"],
              ["Early-Bird Scholarship", "15%"],
              ["Discounted Total Programme Fee", "₹1,02,000"],
              ["One-Time Payment", "₹96,000"],
              ["Annual Payment", "₹32,000"],
              ["Semester Payment", "₹17,000"],
              ["No-Cost EMI", "Available; amount depends on tenure/plan"],
            ],
          },
          {
            kind: "table",
            caption: "Online BA fee",
            head: ["Payment Option", "Published Amount"],
            rows: [
              ["Regular Programme Fee", "₹72,000"],
              ["Early-Bird Scholarship", "15%"],
              ["Discounted Total Programme Fee", "₹61,200"],
              ["One-Time Payment", "₹55,200"],
              ["Annual Payment", "₹18,400"],
              ["Semester Payment", "₹10,200"],
              ["No-Cost EMI", "Available; amount depends on tenure/plan"],
            ],
          },
        ],
      },
      {
        heading: "International student fees",
        blocks: [
          {
            kind: "p",
            text: "For international applicants, the university publishes separate fee figures in US dollars. Treat these as programme-level published figures and verify them at the time of admission since scholarship rules, exchange rates and payment requirements can change.",
          },
          {
            kind: "table",
            caption: "International fee schedule",
            head: ["Programme", "Semester Fee", "Annual Fee"],
            rows: [
              ["Online MBA", "USD 600", "USD 1,200"],
              ["Online MCA", "USD 550", "USD 1,100"],
              ["Online BBA", "USD 400", "USD 800"],
              ["Online BCA", "USD 400", "USD 800"],
              ["Online BA", "USD 300", "USD 600"],
            ],
          },
        ],
      },
      {
        heading: "What the published fee covers",
        blocks: [
          {
            kind: "list",
            items: [
              "Online academic learning and programme delivery.",
              "Live and recorded learning content.",
              "Learning Management System (LMS) access.",
              "Examination / evaluation component as specified by the university.",
              "Academic support and student services.",
              "Career assistance such as CV workshops and mock interviews.",
            ],
          },
          {
            kind: "note",
            text: "Students should still verify any additional one-time or administrative charges, if applicable, before making payment.",
          },
        ],
      },
      {
        heading: "Who should choose which programme",
        blocks: [
          {
            kind: "table",
            caption: "Goal-to-programme mapping",
            head: ["Goal", "Suitable Online Programme"],
            rows: [
              ["Management, leadership, business growth", "Online MBA"],
              ["Software, applications and advanced computing", "Online MCA"],
              ["Business, management and entrepreneurship after Class 12", "Online BBA"],
              ["Programming, IT and computer applications after Class 12", "Online BCA"],
              ["Arts, humanities, communication and social-science study", "Online BA"],
            ],
          },
          {
            kind: "promo",
            title: "Compare Uttaranchal Online with other universities",
            body: "See how these fees stack up against other UGC-entitled online universities before you commit.",
            ctaLabel: "Compare universities",
            href: "/compare",
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
              "Register on the official Online UU admission portal.",
              "Complete the online application form and select the desired programme.",
              "Upload the required academic and identity documents.",
              "Pay the applicable programme/application fee through the authorised payment gateway.",
              "Wait for university document verification and admission approval.",
              "Receive student registration/LMS credentials and begin online learning.",
            ],
          },
          {
            kind: "note",
            text: "The current official Online UU programme list does not include an Online B.Com. The UG portfolio lists BA, BBA and BCA, and the PG portfolio lists MBA and MCA — a B.Com fee should not be assumed unless the university officially lists the programme.",
          },
          {
            kind: "links",
            title: "Related reading",
            items: [
              { label: "Uttaranchal Online MBA & MCA fees in detail", href: "/blogs/uttaranchal-university-online-mba-mca-fees-2026" },
              { label: "Uttaranchal Online BBA fees, curriculum and careers", href: "/blogs/uttaranchal-university-online-bba-fees-2026" },
              { label: "Explore Uttaranchal University Online", href: "/universities/uttaranchal-online" },
            ],
          },
        ],
      },
      {
        heading: "Is the fee affordable",
        blocks: [
          {
            kind: "p",
            text: "The published discounted online programmes sit below many traditional residential degree options because students avoid hostel, relocation and daily campus-commuting expenses. For working professionals, studying online can also reduce the opportunity cost of leaving a job for a full-time programme.",
          },
          {
            kind: "cta",
            title: "Get your exact fee confirmed",
            body: "Tell us which programme and intake you're considering and we will verify the current scholarship and payable amount.",
            buttonLabel: "Confirm my fee",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "What is the Online MBA fee at Uttaranchal University after scholarship?",
        answer:
          "The regular fee is ₹1,40,000. With the current 30% early-bird scholarship, the discounted total programme fee is ₹98,000, payable as ₹24,500 per semester or ₹47,000 annually.",
      },
      {
        question: "How much does the Online MCA cost?",
        answer:
          "The regular fee of ₹1,20,000 reduces to ₹96,000 with the 20% early-bird scholarship, working out to ₹24,000 per semester or ₹46,000 annually.",
      },
      {
        question: "What is the cheapest Online UU programme?",
        answer:
          "The Online BA is the lowest published discounted fee among the listed programmes, at ₹61,200 total after a 15% scholarship.",
      },
      {
        question: "Does Uttaranchal University Online offer a B.Com?",
        answer:
          "No. The current official programme list does not include an Online B.Com — the UG portfolio lists BA, BBA and BCA only.",
      },
      {
        question: "Are examination fees separate from the semester fee?",
        answer:
          "No, the examination fee of ₹2,500 per semester is included in the published semester figures for each programme.",
      },
      {
        question: "What fee do international students pay?",
        answer:
          "International students are billed in USD separately, ranging from USD 300 per semester for the BA to USD 600 per semester for the MBA.",
      },
    ],
    sources: [
      { label: "Official Online UU programme and recognition page", href: "https://www.onlineuu.in/index.php" },
      { label: "Official Online UU fee/admission page", href: "https://www.onlineuu.in/apply.php" },
      { label: "Official Online UU FAQ", href: "https://www.onlineuu.in/faqs.php" },
    ],
    related: [
      { label: "Uttaranchal Online MBA & MCA fees", href: "/blogs/uttaranchal-university-online-mba-mca-fees-2026" },
      { label: "Uttaranchal Online BBA fees", href: "/blogs/uttaranchal-university-online-bba-fees-2026" },
      { label: "Compare online universities", href: "/compare" },
    ],
    cta: "Want your exact Online UU fee confirmed for the current admission cycle? Share your programme choice and we will verify it against the official fee page.",
  },

  /* ============================ POST 2: MBA vs MCA ============================ */
  "uttaranchal-university-online-mba-mca-fees-2026": {
    ...base,
    updated: UPDATED,
    intro:
      "Uttaranchal University Online offers a two-year MBA and a two-year MCA, and the two programmes serve very different career directions even though both run fully online. This guide bifurcates the MBA and MCA on fees, eligibility, admission steps, specialisations and career outcomes so you can decide which one matches your goal.",
    keyTakeaways: [
      "Online MBA annual tuition is ₹47,000 plus ₹2,500 examination fee per semester, for a total programme fee of ₹98,000 with up to 30% scholarship.",
      "MBA EMI starts at ₹3,956 per month according to the published fee information.",
      "MBA specialisations include Marketing, Finance, HR, Business Analytics, IT, Digital Marketing, International Business and Logistics & Supply Chain Management.",
      "The supplied MCA source does not publish a specific tuition, examination or total fee figure — these are not fabricated here.",
      "MBA eligibility is a bachelor's degree with 50% marks (General) / 45% (Reserved); MCA eligibility favours BCA graduates or those with Mathematics at 10+2 or graduation level.",
      "MCA opens roles like Software Developer, Full Stack Developer, Cloud Engineer and Cybersecurity Analyst; MBA opens management, marketing, HR, finance and analytics roles.",
    ],
    sections: [
      {
        heading: "1. Uttaranchal University Online MBA",
        blocks: [
          {
            kind: "p",
            text: "The Online MBA is a two-year, four-semester postgraduate programme delivered fully online through live and recorded classes, positioned for graduates and working professionals building management, leadership and business skills.",
          },
          {
            kind: "table",
            caption: "MBA fee snapshot",
            head: ["Particular", "Detail"],
            rows: [
              ["Duration", "2 Years (4 Semesters)"],
              ["Annual Tuition", "₹47,000"],
              ["Examination Fee", "₹2,500 per semester"],
              ["Total Course Fee", "₹98,000"],
              ["Scholarship", "Up to 30% fee waiver"],
              ["EMI", "Starting at ₹3,956/month"],
            ],
          },
        ],
      },
      {
        heading: "MBA specialisations, eligibility and documents",
        blocks: [
          {
            kind: "h3",
            text: "Specialisations",
          },
          {
            kind: "list",
            items: [
              "Marketing Management",
              "Financial Management",
              "Human Resource Management",
              "Business Analytics",
              "Information Technology",
              "Digital Marketing",
              "International Business",
              "Logistics & Supply Chain Management",
            ],
          },
          {
            kind: "h3",
            text: "Eligibility",
          },
          {
            kind: "p",
            text: "A bachelor's degree from a recognised university with at least 50% marks for General Category candidates and 45% for Reserved Category candidates.",
          },
          {
            kind: "h3",
            text: "Documents required",
          },
          {
            kind: "list",
            items: [
              "Graduation marksheet / certificate",
              "Class 10 marksheet",
              "Class 12 marksheet",
              "Passport-size photograph",
              "Valid government ID proof",
              "Signature",
            ],
          },
        ],
      },
      {
        heading: "2. Uttaranchal University Online MCA",
        blocks: [
          {
            kind: "p",
            text: "The Online MCA is a two-year, four-semester postgraduate programme aimed at graduates and working professionals seeking technical knowledge in software development, cloud computing, data analytics, artificial intelligence and other IT domains.",
          },
          {
            kind: "table",
            caption: "MCA programme snapshot",
            head: ["Particular", "Detail"],
            rows: [
              ["Course Level", "Postgraduate"],
              ["Duration", "2 Years"],
              ["Total Semesters", "4"],
              ["Learning Mode", "Fully Online"],
              ["Classes", "Live & Recorded"],
              ["Admission Mode", "Online"],
            ],
          },
          {
            kind: "note",
            text: "The supplied MCA source does not provide a specific tuition fee, examination fee, total programme fee, EMI amount or scholarship percentage. These figures have intentionally not been invented and should be confirmed directly with the university before applying.",
          },
          {
            kind: "cta",
            title: "Get the current MCA fee sheet",
            body: "We will check the latest Online UU MCA fee, scholarship and EMI terms for your intake and send it to you directly.",
            buttonLabel: "Request MCA fee details",
          },
        ],
      },
      {
        heading: "MCA eligibility, documents and career opportunities",
        blocks: [
          {
            kind: "p",
            text: "Applicants should hold a bachelor's degree from a recognised institution. Candidates with a BCA or equivalent qualification are described as eligible, while graduates from other disciplines who studied Mathematics at 10+2 or graduation level may also be considered eligible under university rules.",
          },
          {
            kind: "list",
            items: [
              "Class 10 marksheet",
              "Class 12 marksheet",
              "Graduation marksheet and degree certificate",
              "Government-issued photo identity proof",
              "Recent passport-size photograph",
              "Candidate signature",
              "Category certificate (if applicable)",
            ],
          },
          {
            kind: "h3",
            text: "MCA career opportunities",
          },
          {
            kind: "list",
            items: [
              "Software Developer",
              "Full Stack Developer",
              "Web Developer",
              "Mobile Application Developer",
              "Database Administrator",
              "Cloud Engineer",
              "Cybersecurity Analyst",
              "Data Analyst",
              "System Analyst",
              "Network Administrator",
              "IT Consultant",
              "Project Coordinator",
            ],
          },
        ],
      },
      {
        heading: "MBA vs MCA: side-by-side comparison",
        blocks: [
          {
            kind: "table",
            caption: "Fee and programme comparison",
            head: ["Aspect", "Online MBA", "Online MCA"],
            rows: [
              ["Level", "Postgraduate", "Postgraduate"],
              ["Duration", "2 Years / 4 Semesters", "2 Years / 4 Semesters"],
              ["Mode", "Fully Online", "Fully Online"],
              ["Tuition Fee", "₹47,000 per year", "Not specified in supplied source"],
              ["Examination Fee", "₹2,500 per semester", "Not specified in supplied source"],
              ["Total Fee", "₹98,000", "Not specified in supplied source"],
              ["Scholarship", "Up to 30% fee waiver", "Not specified in supplied source"],
              ["EMI", "Starting at ₹3,956/month", "Not specified in supplied source"],
              ["Primary Focus", "Management, leadership & business", "Computing, software & IT"],
            ],
          },
          {
            kind: "table",
            caption: "Which programme fits your goal",
            head: ["If your goal is…", "Consider"],
            rows: [
              ["Management or leadership roles", "Online MBA"],
              ["Marketing, HR, finance or business analytics", "Online MBA"],
              ["Software development or full-stack development", "Online MCA"],
              ["Cloud, cybersecurity or data-oriented IT roles", "Online MCA"],
            ],
          },
        ],
      },
      {
        heading: "Admission process for both programmes",
        blocks: [
          {
            kind: "list",
            ordered: true,
            items: [
              "Register on the official online admission portal.",
              "Fill in the online application form with personal and academic details.",
              "Upload academic and identity documents.",
              "Pay the applicable programme fee online.",
              "Submit the application for verification.",
              "Complete document verification.",
              "Receive admission confirmation and LMS access.",
            ],
          },
          {
            kind: "links",
            title: "Continue your research",
            items: [
              { label: "Full Online UU fee structure across all programmes", href: "/blogs/uttaranchal-university-online-fees-2026" },
              { label: "Uttaranchal Online BBA fees and curriculum", href: "/blogs/uttaranchal-university-online-bba-fees-2026" },
              { label: "Explore online MBA programmes", href: "/courses/online-mba" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: "What is the total Uttaranchal Online MBA fee?",
        answer:
          "The total programme fee is ₹98,000, made up of ₹47,000 annual tuition plus ₹2,500 examination fee per semester, with up to a 30% scholarship already reflected.",
      },
      {
        question: "Does Uttaranchal University publish an MCA fee?",
        answer:
          "The supplied MCA source does not include a specific tuition, examination, total fee, EMI or scholarship figure. Confirm the current MCA fee directly with the university before applying.",
      },
      {
        question: "Who is eligible for the Online MCA?",
        answer:
          "Graduates with a BCA or equivalent qualification are eligible, and graduates from other disciplines who studied Mathematics at 10+2 or graduation level may also be considered under university rules.",
      },
      {
        question: "What specialisations does the Online MBA offer?",
        answer:
          "Marketing Management, Financial Management, Human Resource Management, Business Analytics, Information Technology, Digital Marketing, International Business and Logistics & Supply Chain Management.",
      },
      {
        question: "Should I choose the MBA or the MCA?",
        answer:
          "Choose the MBA for management, leadership, marketing, HR, finance or analytics career goals, and the MCA for software development, cloud, cybersecurity or data-oriented IT roles.",
      },
    ],
    sources: [
      { label: "Official Online UU MBA page", href: "https://www.onlineuu.in/mba.php" },
      { label: "Official Online UU admission process", href: "https://www.onlineuu.in/how-to-apply.php" },
    ],
    related: [
      { label: "Uttaranchal Online fee structure (all programmes)", href: "/blogs/uttaranchal-university-online-fees-2026" },
      { label: "Online MBA universities and fees", href: "/courses/online-mba" },
      { label: "Compare online universities", href: "/compare" },
    ],
  },

  /* ============================ POST 3: BBA ============================ */
  "uttaranchal-university-online-bba-fees-2026": {
    ...base,
    updated: UPDATED,
    intro:
      "Uttaranchal University Online BBA is a three-year, six-semester undergraduate management programme with 120 credits, built around live sessions, TA sessions, case studies and projects. This guide covers the BBA-specific fee structure, eligibility, curriculum, specialisations, skills and career support for 2026, kept separate from the MBA and MCA figures.",
    keyTakeaways: [
      "The Online BBA carries a 15% scholarship, bringing the one-time fee to ₹1,14,000, with annual (₹38,000) and semester (₹20,000) options.",
      "No-cost EMI starts from ₹2,693, and the examination fee of ₹2,500 per semester is stated as included.",
      "Eligibility is 10+2 from a recognised board with no age restriction or minimum-mark requirement stated.",
      "The programme carries 120 credits across 6 semesters, with 120+ TA sessions, 60+ live sessions and 30+ case studies/projects.",
      "Specialisations — Marketing, Finance and Human Resources — are taken in Semesters 5 and 6.",
      "Stated recruiters include Airtel, Wipro, ITC, Royal Enfield, HCL, Mahindra, DELL, Tech Mahindra, Google and Amazon.",
    ],
    sections: [
      {
        heading: "Online BBA — quick overview",
        blocks: [
          {
            kind: "table",
            caption: "Programme snapshot",
            head: ["Particular", "Details"],
            rows: [
              ["Programme", "Uttaranchal University Online BBA"],
              ["Level", "Undergraduate"],
              ["Duration", "3 Years"],
              ["Semesters", "6"],
              ["Credits", "120"],
              ["Mode", "Fully Online"],
              ["Learning Support", "Smart LMS, live sessions, TA sessions, case studies and projects"],
              ["Specialisations", "Marketing, Finance, Human Resources"],
              ["Eligibility", "10+2 from a recognised board"],
            ],
          },
          {
            kind: "note",
            text: "The university is described in the source material as UGC-recognised, AICTE-approved and NAAC A+ graded — verify current recognition status before applying.",
          },
        ],
      },
      {
        heading: "BBA fee structure 2026",
        blocks: [
          {
            kind: "p",
            text: "The Online BBA is positioned as a relatively affordable programme with multiple payment options. The fee includes an examination fee of ₹2,500 per semester, and a 15% scholarship on the programme fee is available.",
          },
          {
            kind: "table",
            caption: "BBA payment options",
            head: ["Payment Option", "Fee / Amount"],
            rows: [
              ["One-Time Fee", "₹1,14,000"],
              ["Annual Fee", "₹38,000"],
              ["Semester Fee", "₹20,000"],
              ["No-Cost EMI", "Starting from ₹2,693"],
              ["Examination Fee", "₹2,500 per semester (stated as included)"],
              ["Scholarship", "15% on programme fee"],
            ],
          },
          {
            kind: "cta",
            title: "Confirm the current BBA scholarship",
            body: "Scholarship terms can change by admission cycle. Share your intake and we will verify the live BBA fee for you.",
            buttonLabel: "Verify my BBA fee",
          },
        ],
      },
      {
        heading: "Eligibility and admission process",
        blocks: [
          {
            kind: "p",
            text: "Candidates must have cleared 10+2 from a recognised board. The source states there is no age restriction or minimum-mark requirement — candidates should verify the latest eligibility conditions with the university before applying.",
          },
          {
            kind: "list",
            ordered: true,
            items: [
              "Register through the official online university portal.",
              "Complete the application form with personal, contact and qualification details.",
              "Upload the relevant documents and pay the programme/application fee through available online payment methods.",
              "Submit the application and wait for university approval.",
              "After document verification, receive the enrolment letter and LMS credentials by email.",
            ],
          },
          {
            kind: "h3",
            text: "Mandatory documents",
          },
          {
            kind: "list",
            items: [
              "Scanned passport-size coloured photograph",
              "Scanned signature",
              "Scanned Class 10 and Class 12 marksheets and certificates",
              "Scanned valid government-authorised ID proof",
              "Scanned address proof, if different from the ID proof",
            ],
          },
        ],
      },
      {
        heading: "Semester-wise curriculum",
        blocks: [
          {
            kind: "table",
            caption: "Year 1 subjects",
            head: ["Semester 1", "Semester 2"],
            rows: [
              ["Managerial Economics", "Financial Management"],
              ["Business Law", "Strategic Management"],
              ["Communicative English", "Company Law"],
              ["Fundamentals of Accounting", "Environment Studies"],
              ["Fundamentals of Computing", "Principles of Management"],
            ],
          },
          {
            kind: "table",
            caption: "Year 2 subjects",
            head: ["Semester 3", "Semester 4"],
            rows: [
              ["Macroeconomics", "Business Mathematics"],
              ["Marketing of Services", "Human Resource Management"],
              ["Risk and Insurance Management", "International Business"],
              ["Business Statistics", "Research Methods in Business Management"],
              ["Production and Operations Management", "Personality Development"],
              ["E-Commerce", "Advertisement and Sales Promotion"],
            ],
          },
          {
            kind: "table",
            caption: "Year 3 subjects",
            head: ["Semester 5", "Semester 6"],
            rows: [
              ["Quantitative Techniques for Management", "Compensation Management"],
              ["Management Accounting", "Management Information System"],
              ["Specialisation Paper 1", "Specialisation Paper 1"],
              ["Specialisation Paper 2", "Specialisation Paper 2"],
              ["Project Report – I and Presentation", "Project Report – II and Presentation"],
            ],
          },
        ],
      },
      {
        heading: "Specialisations offered in Semesters 5 and 6",
        blocks: [
          {
            kind: "h3",
            text: "Marketing",
          },
          {
            kind: "table",
            caption: "Marketing specialisation papers",
            head: ["Semester 5", "Semester 6"],
            rows: [
              ["Personal Selling and Sales Force Management", "International Marketing"],
              ["Retail Management", "Distribution and Supply Chain Management"],
            ],
          },
          {
            kind: "h3",
            text: "Finance",
          },
          {
            kind: "table",
            caption: "Finance specialisation papers",
            head: ["Semester 5", "Semester 6"],
            rows: [
              ["International Finance", "Cost Accounting"],
              ["Investment Banking and Financial Services", "Business Analysis and Valuation"],
            ],
          },
          {
            kind: "h3",
            text: "Human Resources",
          },
          {
            kind: "table",
            caption: "HR specialisation papers",
            head: ["Semester 5", "Semester 6"],
            rows: [
              ["HRD – System and Strategies", "Cross-Cultural HRM"],
              ["Management of Industrial Relations", "Training and Development"],
            ],
          },
        ],
      },
      {
        heading: "Skills developed and career outcomes",
        blocks: [
          {
            kind: "h3",
            text: "Technical skills",
          },
          {
            kind: "list",
            items: ["Entrepreneurial Mindset", "Data Interpretation", "Digital Literacy", "Financial Literacy", "Business Writing"],
          },
          {
            kind: "h3",
            text: "Soft skills",
          },
          {
            kind: "list",
            items: ["Communication", "Networking", "Problem Solving", "Critical Analysis"],
          },
          {
            kind: "p",
            text: "The BBA provides a foundation for business and management-oriented careers. Depending on specialisation, skills and experience, graduates may explore marketing and sales, finance and accounting, human resource management, business operations, business development, entrepreneurship, customer and relationship management, and administrative or management functions.",
          },
          {
            kind: "table",
            caption: "Recruiters named in the source material",
            head: ["Recruiters", "Recruiters"],
            rows: [
              ["Airtel", "Mahindra"],
              ["Wipro", "DELL"],
              ["ITC", "Tech Mahindra"],
              ["Royal Enfield", "Google"],
              ["HCL", "Amazon"],
            ],
          },
          {
            kind: "note",
            text: "Placement assistance, industry connections and career guidance are stated as part of the programme's career support — these are services, not a placement guarantee.",
          },
        ],
      },
      {
        heading: "Fee and value perspective",
        blocks: [
          {
            kind: "table",
            caption: "Value factors",
            head: ["Value Factor", "Uttaranchal University Online BBA"],
            rows: [
              ["Programme Duration", "3 Years"],
              ["Payment Flexibility", "One-time, annual, semester and no-cost EMI"],
              ["Scholarship", "15% stated in supplied source"],
              ["Practical Learning", "60+ live sessions, 30+ case studies/projects"],
              ["Specialisation", "Marketing, Finance, Human Resources"],
              ["Digital Learning", "Smart LMS and e-books"],
            ],
          },
          {
            kind: "links",
            title: "Related reading",
            items: [
              { label: "Full Online UU fee structure across all programmes", href: "/blogs/uttaranchal-university-online-fees-2026" },
              { label: "Uttaranchal Online MBA & MCA fees", href: "/blogs/uttaranchal-university-online-mba-mca-fees-2026" },
              { label: "Explore Uttaranchal University Online", href: "/universities/uttaranchal-online" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: "What is the Online BBA fee at Uttaranchal University?",
        answer:
          "The one-time fee is ₹1,14,000 after a 15% scholarship, with annual (₹38,000) and semester (₹20,000) options, plus no-cost EMI starting from ₹2,693.",
      },
      {
        question: "What is the eligibility for the Online BBA?",
        answer:
          "Candidates must have cleared 10+2 from a recognised board. The source states no age restriction or minimum-mark requirement, but eligibility should be verified with the university before applying.",
      },
      {
        question: "What specialisations does the Online BBA offer?",
        answer:
          "Marketing, Finance and Human Resources, taken as specialisation papers in Semesters 5 and 6.",
      },
      {
        question: "Does the BBA fee include examination charges?",
        answer:
          "Yes, the examination fee of ₹2,500 per semester is stated as included in the published BBA fee.",
      },
      {
        question: "Which companies recruit Online BBA graduates?",
        answer:
          "The source names Airtel, Wipro, ITC, Royal Enfield, HCL, Mahindra, DELL, Tech Mahindra, Google and Amazon as example recruiters, alongside general placement assistance.",
      },
    ],
    sources: [
      { label: "Official Online UU BCA page", href: "https://www.onlineuu.in/bca.php" },
      { label: "Official Online UU fee/admission page", href: "https://www.onlineuu.in/apply.php" },
    ],
    related: [
      { label: "Full Online UU fee structure", href: "/blogs/uttaranchal-university-online-fees-2026" },
      { label: "Online BBA admission guide", href: "/courses/online-bba" },
      { label: "Compare online universities", href: "/compare" },
    ],
    cta: "Considering the Uttaranchal Online BBA? Share your target specialisation and we will confirm the current scholarship and EMI plan for you.",
  },
};
