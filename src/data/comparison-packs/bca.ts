import type { ComparisonPack } from "./types";

function buildFactors(aName: string, bName: string) {
  return [
    { label: "University type", a: "Private university", b: "Private university" },
    { label: "Degree", a: "Online BCA", b: "Online BCA" },
    { label: "Typical duration", a: "3 years / 6 semesters", b: "3 years / 6 semesters" },
    {
      label: "Eligibility",
      a: "10+2 or equivalent; verify current programme rules",
      b: "10+2 or equivalent; verify current programme rules",
    },
    {
      label: "Recognition",
      a: "UGC entitlement/DEB status should be checked for the current session",
      b: "UGC entitlement/DEB status should be checked for the current session",
    },
    {
      label: "Fee position",
      a: "Compare current official fee + exam/other charges",
      b: "Compare current official fee + exam/other charges",
    },
    {
      label: "Specialisation breadth",
      a: "Depends on current intake",
      b: "Depends on current intake",
    },
    {
      label: "Learning model",
      a: "LMS + digital/self-learning + live/recorded components may vary",
      b: "LMS + digital/self-learning + live/recorded components may vary",
    },
    {
      label: "Career support",
      a: "Placement/career assistance; distinguish assistance from guaranteed placement",
      b: "Placement/career assistance; distinguish assistance from guaranteed placement",
    },
    {
      label: "Best suited for",
      a: `Students prioritising the strengths of ${aName}'s BCA ecosystem`,
      b: `Students prioritising the strengths of ${bName}'s BCA ecosystem`,
    },
    {
      label: "Advertised tuition",
      a: "Verify current official figure",
      b: "Verify current official figure",
    },
    { label: "Semester payment", a: "Verify", b: "Verify" },
    { label: "Annual payment", a: "Verify", b: "Verify" },
    { label: "One-time/lumpsum option", a: "Verify", b: "Verify" },
    { label: "Examination/other charges", a: "Verify", b: "Verify" },
    {
      label: "Scholarship/discount",
      a: "Verify current intake offer",
      b: "Verify current intake offer",
    },
    { label: "EMI", a: "Check current terms", b: "Check current terms" },
    { label: "Recognition/credibility (scorecard)", a: "★★★★☆", b: "★★★★☆" },
    { label: "Curriculum relevance (scorecard)", a: "★★★★☆", b: "★★★★☆" },
    { label: "Technical depth (scorecard)", a: "★★★★☆", b: "★★★★☆" },
    { label: "Specialisation choice (scorecard)", a: "★★★★☆", b: "★★★★☆" },
    { label: "Learning flexibility (scorecard)", a: "★★★★☆", b: "★★★★☆" },
    { label: "Practical/project exposure (scorecard)", a: "★★★★☆", b: "★★★★☆" },
    { label: "Career support (scorecard)", a: "★★★★☆", b: "★★★★☆" },
    { label: "Affordability (scorecard)", a: "★★★★☆", b: "★★★★☆" },
    { label: "Overall fit", a: "Depends on student goal", b: "Depends on student goal" },
  ];
}

function buildSections(aName: string, bName: string) {
  return [
    {
      heading: "Editorial Positioning",
      body: "This comparison is designed for prospective students evaluating two online BCA degrees. It is intentionally decision-focused rather than a thin university profile. Fees, eligibility, recognition, curriculum, specialisations, learning experience, examinations, career support, and value for money should be verified against the latest university admission page before publication because online-programme details can change by intake.",
    },
    {
      heading: `${aName}: What Makes Its Online BCA Different?`,
      body: `The strongest reason to shortlist ${aName} should not be reduced to its university brand. Students should examine the BCA curriculum, programming depth, practical assignments, project work, faculty interaction, LMS experience, assessment pattern and career services together. A university can be a better fit for one learner because of specialisation choices or career orientation while another learner may prefer a lower total cost or a different learning structure.`,
    },
    {
      heading: "Curriculum & Technical Learning (A)",
      body: "Evaluate programming fundamentals, database management, web technologies, software engineering, computer networks, operating systems, data structures, cloud/AI/data-oriented subjects and the balance between theory and practical work. The important question is not simply how many subjects are listed, but whether the programme gives repeated opportunities to build and demonstrate technical skills.",
    },
    {
      heading: "Specialisations (A)",
      body: "Check the specialisations available in the current admission cycle. Compare whether the options align with goals such as AI/data science, cybersecurity, cloud computing, full-stack development, digital applications or a general BCA pathway.",
    },
    {
      heading: "Learning Experience (A)",
      body: "Assess live classes, recorded lectures, LMS navigation, e-books, discussion forums, doubt support, academic mentorship and access to practical resources. Flexibility matters particularly for students who are working or preparing for competitive exams alongside the degree.",
    },
    {
      heading: `${bName}: What Makes Its Online BCA Different?`,
      body: `${bName} should be evaluated on the same criteria so that the comparison remains fair. Its potential advantage may come from curriculum design, technology-focused electives, affordability, learning support, university ecosystem or career services. Students should look beyond promotional claims and compare what is actually included in the programme.`,
    },
    {
      heading: "Curriculum & Technical Learning (B)",
      body: "Review the semester-wise syllabus for programming, databases, web development, software engineering, operating systems, networking, mathematics/statistics and emerging technology subjects. Practical projects and continuous assessment can be particularly valuable for students targeting entry-level IT roles.",
    },
    {
      heading: "Specialisations (B)",
      body: "Compare the available tracks with the learner's target role. A specialised BCA can be useful when the student already has a clear direction; a broader curriculum may suit students who want to explore multiple IT domains before specialising through certifications or projects.",
    },
    {
      heading: "Learning Experience (B)",
      body: "Compare the LMS, class schedule, recordings, study material, faculty interaction, assessments and support services. The best option is the one whose learning system the student can consistently use for three years.",
    },
    {
      heading: "Fees: Which Online BCA Offers Better Value?",
      body: "Do not compare only the advertised tuition number. Calculate the effective programme cost after considering semester/yearly payment options, examination fees, registration charges, study material charges if any, and available scholarships or EMI plans.",
      verdict:
        "Value-for-money test: If the fee difference is significant, ask whether the higher-priced programme provides materially stronger curriculum depth, specialisation choices, academic support, career services or brand value for the student's specific goal.",
    },
    {
      heading: "Eligibility & Admission",
      body: "Both programmes should be compared on the following, and the exact current admission rule should be published only after checking the university's official programme page:",
      bullets: [
        "10+2 qualification and accepted streams.",
        "Minimum marks, if any.",
        "Whether a diploma/equivalent route is accepted.",
        "Age restrictions.",
        "Entrance-test requirement, if applicable.",
        "Document requirements.",
        "Admission cycle and application deadlines.",
        "Payment and confirmation process.",
      ],
    },
    {
      heading: "Syllabus & Practical Exposure",
      body: "A strong online BCA should move beyond introductory computer concepts. Compare the following, explaining what the difference means for a student rather than merely reproducing subject lists:",
      bullets: [
        "Programming and problem solving",
        "Data structures and algorithms",
        "DBMS and SQL",
        "Web development",
        "Operating systems",
        "Computer networks",
        "Software engineering",
        "Cloud computing",
        "AI/data-related subjects",
        "Cybersecurity",
        "Capstone/project work",
        "Industry-oriented electives",
      ],
    },
    {
      heading: "Exams, Assignments & Evaluation",
      body: "Compare examination frequency, online-proctored or other assessment methods, assignments, quizzes, projects, attendance/class participation requirements and re-examination rules. Assessment flexibility can be a major differentiator for working learners.",
    },
    {
      heading: "Placement & Career Support",
      body: "Placement claims should be interpreted carefully. Placement assistance is not the same as a guaranteed job. Compare career counselling, resume support, mock interviews, job portals, hiring drives, employer interactions, internships and skill-building sessions.",
    },
    {
      heading: "Career Outcomes After Online BCA",
      body: "Graduates can target roles such as:",
      bullets: [
        "Junior Software Developer",
        "Web Developer",
        "Front-End Developer",
        "Back-End Developer",
        "QA/Testing Associate",
        "Technical Support Executive",
        "Database/SQL Trainee",
        "IT Operations Associate",
        "Data/BI Trainee",
        "Cybersecurity Trainee",
      ],
    },
    {
      heading: "Freshers vs Working Professionals",
      table: {
        head: ["Student profile", "Better choice depends on"],
        rows: [
          [
            "12th-pass fresher",
            "Academic support, programming foundation, projects and affordability",
          ],
          ["Career switcher", "Technical depth, practical projects and career services"],
          ["Working professional", "Flexibility, recordings, LMS and assessment convenience"],
          [
            "Entrepreneur/freelancer",
            "Broad business + technology exposure and project-based learning",
          ],
          [
            "Student targeting software development",
            "Programming, DSA, web development, Git/project portfolio and internships",
          ],
          [
            "Student targeting data/AI",
            "Statistics, Python, databases, ML/data electives and external projects",
          ],
        ],
      },
    },
    {
      heading: "ROI: What Should Students Actually Compare?",
      body: "A useful BCA ROI framework is: ROI = Degree value + technical skills + portfolio + career support + affordability + flexibility. A university with a slightly higher fee may still be better value if its curriculum and support match the student's career objective. Conversely, paying a premium for a brand without using its learning and career ecosystem may reduce practical ROI.",
    },
  ];
}

function buildFaqs(aName: string, bName: string) {
  return [
    {
      question: `Which is better for online BCA: ${aName} or ${bName}?`,
      answer:
        "It depends on your target specialisation, budget, preferred learning model and career plans. Compare the current syllabus and fee before deciding.",
    },
    {
      question: "Are both online BCA degrees valid?",
      answer:
        "Check the university's current UGC/DEB entitlement for the specific programme and academic session before admission.",
    },
    {
      question: "Which has better placements?",
      answer:
        "Compare placement assistance, hiring drives, career services and documented outcomes. Neither university should be treated as guaranteeing a job unless an explicit written guarantee exists.",
    },
    {
      question: "Which online BCA is more affordable?",
      answer:
        "Use the current official total cost, including examination and other mandatory charges, rather than relying on a headline tuition figure.",
    },
    {
      question: "Can I pursue an online BCA while working?",
      answer:
        "Yes, online BCA programmes are generally designed to provide flexibility, but class schedules and assessment requirements should be checked before enrolling.",
    },
    {
      question: "Which is better for a software developer career?",
      answer:
        "Choose the programme with the stronger combination of programming, DSA, web/software development, projects and career support; supplement the degree with a strong GitHub/portfolio and interview preparation.",
    },
  ];
}

function buildVerdict(aName: string, bName: string) {
  return `There is no universal winner for every BCA student. Choose ${aName} when its verified current curriculum, specialisations, learning structure, fee and career ecosystem better match your target. Choose ${bName} when its programme provides the stronger combination for your budget, technical interests and preferred learning style. For a student whose priority is software development, the decisive factors should be programming depth, DSA, projects and internships. For a student focused on affordability, total cost and payment flexibility deserve greater weight. For a working professional, LMS usability, recordings and assessment flexibility may matter more.`;
}

function buildBestFor(name: string) {
  return [`Students prioritising the strengths of ${name}'s BCA ecosystem`];
}

const jainVsParul: ComparisonPack = {
  course: "bca",
  aSlug: "jain-online",
  bSlug: "parul-online",
  aLabel: "Jain University Online BCA",
  bLabel: "Parul University Online BCA",
  title: "Jain University Online BCA vs Parul University Online BCA — 2026 Deep Comparison",
  metaDescription:
    "A decision-focused comparison of Jain University Online BCA and Parul University Online BCA covering fees, eligibility, recognition, curriculum, specialisations, learning experience, exams, career support and value for money.",
  intro:
    "This comparison is designed for prospective students evaluating two online BCA degrees. It is intentionally decision-focused rather than a thin university profile. Fees, eligibility, recognition, curriculum, specialisations, learning experience, examinations, career support, and value for money should be verified against the latest university admission page before publication because online-programme details can change by intake.",
  factors: buildFactors("Jain University Online BCA", "Parul University Online BCA"),
  sections: buildSections("Jain University Online BCA", "Parul University Online BCA"),
  aBestFor: buildBestFor("Jain University Online BCA"),
  bBestFor: buildBestFor("Parul University Online BCA"),
  verdict: buildVerdict("Jain University Online BCA", "Parul University Online BCA"),
  faqs: buildFaqs("Jain University Online BCA", "Parul University Online BCA"),
};

const manipalVsParul: ComparisonPack = {
  course: "bca",
  aSlug: "manipal-university-jaipur",
  bSlug: "parul-online",
  aLabel: "Manipal University Jaipur Online BCA",
  bLabel: "Parul University Online BCA",
  title:
    "Manipal University Jaipur Online BCA vs Parul University Online BCA — 2026 Deep Comparison",
  metaDescription:
    "A decision-focused comparison of Manipal University Jaipur Online BCA and Parul University Online BCA covering fees, eligibility, recognition, curriculum, specialisations, learning experience, exams, career support and value for money.",
  intro:
    "This comparison is designed for prospective students evaluating two online BCA degrees. It is intentionally decision-focused rather than a thin university profile. Fees, eligibility, recognition, curriculum, specialisations, learning experience, examinations, career support, and value for money should be verified against the latest university admission page before publication because online-programme details can change by intake.",
  factors: buildFactors("Manipal University Jaipur Online BCA", "Parul University Online BCA"),
  sections: buildSections("Manipal University Jaipur Online BCA", "Parul University Online BCA"),
  aBestFor: buildBestFor("Manipal University Jaipur Online BCA"),
  bBestFor: buildBestFor("Parul University Online BCA"),
  verdict: buildVerdict("Manipal University Jaipur Online BCA", "Parul University Online BCA"),
  faqs: buildFaqs("Manipal University Jaipur Online BCA", "Parul University Online BCA"),
};

const amityVsJain: ComparisonPack = {
  course: "bca",
  aSlug: "amity-online",
  bSlug: "jain-online",
  aLabel: "Amity Online BCA",
  bLabel: "Jain University Online BCA",
  title: "Amity Online BCA vs Jain University Online BCA — 2026 Deep Comparison",
  metaDescription:
    "A decision-focused comparison of Amity Online BCA and Jain University Online BCA covering fees, eligibility, recognition, curriculum, specialisations, learning experience, exams, career support and value for money.",
  intro:
    "This comparison is designed for prospective students evaluating two online BCA degrees. It is intentionally decision-focused rather than a thin university profile. Fees, eligibility, recognition, curriculum, specialisations, learning experience, examinations, career support, and value for money should be verified against the latest university admission page before publication because online-programme details can change by intake.",
  factors: buildFactors("Amity Online BCA", "Jain University Online BCA"),
  sections: buildSections("Amity Online BCA", "Jain University Online BCA"),
  aBestFor: buildBestFor("Amity Online BCA"),
  bBestFor: buildBestFor("Jain University Online BCA"),
  verdict: buildVerdict("Amity Online BCA", "Jain University Online BCA"),
  faqs: buildFaqs("Amity Online BCA", "Jain University Online BCA"),
};

const parulVsSharda: ComparisonPack = {
  course: "bca",
  aSlug: "parul-online",
  bSlug: "sharda-online",
  aLabel: "Parul University Online BCA",
  bLabel: "Sharda University Online BCA",
  title: "Parul University Online BCA vs Sharda University Online BCA — 2026 Deep Comparison",
  metaDescription:
    "A decision-focused comparison of Parul University Online BCA and Sharda University Online BCA covering fees, eligibility, recognition, curriculum, specialisations, learning experience, exams, career support and value for money.",
  intro:
    "This comparison is designed for prospective students evaluating two online BCA degrees. It is intentionally decision-focused rather than a thin university profile. Fees, eligibility, recognition, curriculum, specialisations, learning experience, examinations, career support, and value for money should be verified against the latest university admission page before publication because online-programme details can change by intake.",
  factors: buildFactors("Parul University Online BCA", "Sharda University Online BCA"),
  sections: buildSections("Parul University Online BCA", "Sharda University Online BCA"),
  aBestFor: buildBestFor("Parul University Online BCA"),
  bBestFor: buildBestFor("Sharda University Online BCA"),
  verdict: buildVerdict("Parul University Online BCA", "Sharda University Online BCA"),
  faqs: buildFaqs("Parul University Online BCA", "Sharda University Online BCA"),
};

const manipalVsJain: ComparisonPack = {
  course: "bca",
  aSlug: "manipal-university-jaipur",
  bSlug: "jain-online",
  aLabel: "Manipal University Jaipur Online BCA",
  bLabel: "Jain University Online BCA",
  title:
    "Manipal University Jaipur Online BCA vs Jain University Online BCA — 2026 Deep Comparison",
  metaDescription:
    "A decision-focused comparison of Manipal University Jaipur Online BCA and Jain University Online BCA covering fees, eligibility, recognition, curriculum, specialisations, learning experience, exams, career support and value for money.",
  intro:
    "This comparison is designed for prospective students evaluating two online BCA degrees. It is intentionally decision-focused rather than a thin university profile. Fees, eligibility, recognition, curriculum, specialisations, learning experience, examinations, career support, and value for money should be verified against the latest university admission page before publication because online-programme details can change by intake.",
  factors: buildFactors("Manipal University Jaipur Online BCA", "Jain University Online BCA"),
  sections: buildSections("Manipal University Jaipur Online BCA", "Jain University Online BCA"),
  aBestFor: buildBestFor("Manipal University Jaipur Online BCA"),
  bBestFor: buildBestFor("Jain University Online BCA"),
  verdict: buildVerdict("Manipal University Jaipur Online BCA", "Jain University Online BCA"),
  faqs: buildFaqs("Manipal University Jaipur Online BCA", "Jain University Online BCA"),
};

export const bcaPacks: ComparisonPack[] = [
  jainVsParul,
  manipalVsParul,
  amityVsJain,
  parulVsSharda,
  manipalVsJain,
];
