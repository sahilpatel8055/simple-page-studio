import type { ComparisonPack } from "./types";

const specialisationCareerAlignment = {
  heading: "Specialisations: Which One Gives Better Career Alignment?",
  body: "The right specialisation depends on the job you want—not simply on which option sounds newest.",
  table: {
    head: ["Career Goal", "Strong Specialisation Direction"],
    rows: [
      ["Full-stack developer", "Full Stack Web Development / Software Engineering"],
      ["AI engineer", "AI & ML / Machine Learning"],
      ["Data analyst/data scientist", "Data Science / AI & Data Science"],
      ["Cybersecurity professional", "Cybersecurity"],
      ["Cloud/DevOps path", "Cloud Computing"],
      ["Game/immersive technology", "AR/VR or Game Development"],
      ["Broad technology career", "Comprehensive/general MCA"],
    ],
  },
};

const curriculumSyllabus = {
  heading: "Curriculum & Syllabus Comparison",
  body: "A strong online MCA should build from fundamentals to advanced application development.\n\nCore areas students should compare: Programming and object-oriented programming; Data structures and algorithms; Database management systems; Computer networks; Operating systems; Software engineering; Web technologies; Cloud computing; Artificial intelligence and machine learning; Data analytics/data science; Cybersecurity; Project development.\n\nWhat to look for beyond the subject names: two programmes can list similar subjects but still provide very different learning experiences.",
  bullets: [
    "depth of practical assignments",
    "coding and lab work",
    "project complexity",
    "current programming languages",
    "industry tools",
    "elective freedom",
    "assessment method",
    "faculty expertise",
    "capstone/project supervision",
  ],
};

const examsAssessment = {
  heading: "Exams & Assessment",
  body: "Before admission, students should understand how they will be evaluated. Important questions include:",
  bullets: [
    "Are examinations conducted online?",
    "Are assignments included in the final grade?",
    "Are projects compulsory?",
    "How are practical/coding skills assessed?",
    "Is there a proctored examination system?",
    "What is the re-examination policy?",
  ],
};

const projectsExposure = {
  heading: "Projects & Practical Exposure",
  body: "For MCA students, the degree certificate alone is rarely enough to demonstrate technical ability. A strong learner portfolio can include:",
  bullets: [
    "full-stack web applications",
    "database-driven applications",
    "Python/AI projects",
    "data analytics dashboards",
    "cloud deployments",
    "cybersecurity projects",
    "Git/GitHub repositories",
    "capstone projects",
    "internship experience",
  ],
  verdict: "Use the MCA as a framework for building a public technical portfolio. The university provides the academic structure; the learner must continuously practise and build.",
};

const placementCareerSupport = {
  heading: "Placement & Career Support",
  body: "Both universities provide career/placement assistance, but students should understand the difference between placement assistance and a guaranteed job. Look for:",
  bullets: [
    "hiring-partner access",
    "job fairs",
    "interview preparation",
    "resume building",
    "aptitude training",
    "technical interview preparation",
    "career counselling",
    "internships",
    "industry projects",
    "alumni/networking opportunities",
  ],
};

const careerRoles = {
  heading: "Career Roles After an Online MCA",
  body: "Depending on skills and specialisation, graduates can target:",
  table: {
    head: ["Role", "Relevant Skill Area"],
    rows: [
      ["Software Developer", "Programming + software engineering"],
      ["Full Stack Developer", "Frontend + backend + databases"],
      ["Data Analyst", "SQL + Python + analytics"],
      ["Data Scientist", "Statistics + Python + ML"],
      ["ML Engineer", "Python + ML + deployment"],
      ["Cloud Engineer", "Cloud + networking + DevOps"],
      ["Cybersecurity Analyst", "Security + networking"],
      ["Database Administrator", "DBMS + SQL"],
      ["QA/Automation Engineer", "Testing + programming"],
      ["Business/Systems Analyst", "Requirements + technology + analytics"],
    ],
  },
};

const onlineVsRegular = {
  heading: "Online MCA vs Traditional MCA",
  body: "An online MCA can be useful for learners who need flexibility, but the learning mode does not remove the need for self-discipline.",
  table: {
    head: ["Factor", "Online MCA", "Regular MCA"],
    rows: [
      ["Flexibility", "High", "Lower"],
      ["Physical campus", "No/limited", "Yes"],
      ["Self-learning requirement", "High", "Moderate"],
      ["Location independence", "High", "Lower"],
      ["Networking", "Primarily digital", "Primarily campus-based"],
      ["Working while studying", "Easier", "More difficult"],
      ["Practical exposure", "Depends heavily on learner/programme", "Usually more structured"],
    ],
  },
};

const decisionScorecard = {
  heading: "Decision Scorecard",
  table: {
    head: ["Factor", "Weight", "What to prioritise"],
    rows: [
      ["Curriculum", "20%", "Core CS + advanced technology"],
      ["Specialisation", "15%", "Match with target job"],
      ["Practical learning", "15%", "Projects, labs, coding"],
      ["University recognition", "15%", "Current regulatory status"],
      ["Fees", "10%", "Total payable cost"],
      ["LMS & flexibility", "10%", "Live + recorded + support"],
      ["Career services", "10%", "Actual preparation and hiring access"],
      ["Eligibility fit", "5%", "Your academic background"],
    ],
  },
};

const commonFaqs = (aLabel: string, bLabel: string) => [
  {
    question: `Which is better: ${aLabel} vs ${bLabel} Online MCA?`,
    answer: "It depends on your career goal, specialisation preference, budget and eligibility. There is no universal winner.",
  },
  {
    question: "Is an online MCA valid?",
    answer: "A student should verify the university and programme's current UGC entitlement/recognition status for the admission session before enrolling.",
  },
  {
    question: "Can I pursue an online MCA after BCA?",
    answer: "Yes, BCA is a common pathway into MCA, subject to the specific university's current eligibility rules.",
  },
  {
    question: "Can a non-computer graduate pursue an online MCA?",
    answer: "Some universities permit non-computer graduates if they meet mathematics/computer-subject requirements or complete prescribed bridge courses. Always verify the current university rules.",
  },
  {
    question: "Which MCA specialisation is best in 2026?",
    answer: "AI/ML, data science, cybersecurity, cloud computing and full-stack development are strong technology directions, but the best option depends on your skills and target role.",
  },
  {
    question: "Is an online MCA good for a working professional?",
    answer: "Yes, if the programme's schedule, LMS, examinations and support fit your work commitments.",
  },
  {
    question: "Does an online MCA guarantee a job?",
    answer: "No. Placement assistance is not the same as guaranteed employment. Skills, projects, internships, communication and interview performance remain important.",
  },
];

const introText =
  "Choosing an online MCA is not simply a question of which university has the lower fee. The better choice depends on the kind of technology career you want to build, the academic eligibility you meet, the specialisation you prefer, the depth of technical learning, the learning platform, assessment pattern, project exposure and the career support available after graduation.";

const scopeNoteText =
  "Fees, specialisations, offers and admission rules can change by session. The comparison below uses currently available 2026 programme information and distinguishes university claims from practical interpretation.";

export const mcaPacks: ComparisonPack[] = [
  {
    course: "mca",
    aSlug: "chandigarh-university-online",
    bSlug: "lpu-online",
    aLabel: "Chandigarh University",
    bLabel: "LPU Online MCA",
    title:
      "Chandigarh University vs LPU Online MCA: Fees, Eligibility, Specialisations, Syllabus & Career Scope 2026",
    metaDescription:
      "Compare Chandigarh University vs LPU Online MCA on fees, eligibility, specialisations, curriculum, learning model, exams, projects, career support, placements and ideal learner profile. Find out which online MCA may suit your goals in 2026.",
    intro: introText,
    scopeNote: scopeNoteText,
    factors: [
      { label: "University type", a: "Private university", b: "Private university" },
      { label: "Programme", a: "Online MCA", b: "Online MCA" },
      { label: "Duration", a: "2 years", b: "2 years" },
      { label: "Mode", a: "Online; live/recorded learning", b: "Online; live/recorded learning" },
      { label: "Current fee position", a: "Check current programme page for exact payable fee", b: "Check current programme page for exact payable fee" },
      { label: "Specialisation approach", a: "Technology-focused options", b: "Technology-focused options" },
      { label: "Core technical areas", a: "Programming, databases, web, AI/data/cloud depending on track", b: "Programming, databases, emerging technology depending on track" },
      { label: "Eligibility", a: "Depends on prior degree and mathematics/computer background", b: "Depends on prior degree and programme rules" },
      { label: "Assessment", a: "Online assessment/examinations", b: "Online assessment/examinations" },
      { label: "Projects", a: "Programme-dependent practical work", b: "Programme-dependent practical work" },
      { label: "Career support", a: "Placement/career assistance", b: "Placement/career assistance" },
      { label: "Best suited for", a: "Learners seeking a structured online technology degree", b: "Learners seeking a structured online technology degree" },
    ],
    sections: [
      {
        heading: "Chandigarh University: Programme Snapshot",
        body: "Chandigarh University Online MCA: 2 years; current program highlights include Agentic AI and Microsoft-powered options; core eligibility includes computer-related graduation or other graduation with relevant math/programming/statistics background.",
        bullets: [
          "Technical orientation: Evaluate whether the available curriculum matches your target role rather than choosing only by the number of specialisations.",
          "Emerging technology exposure: Check whether AI, data, cloud, cybersecurity, full-stack development and related tools are embedded in credit-bearing coursework.",
          "Learning flexibility: Review the balance of live classes, recorded material, LMS resources and self-paced learning.",
          "Practical learning: Look for coding exercises, projects, case-based assignments, labs and portfolio-building opportunities.",
          "Career support: Placement assistance can help with access and preparation, but employment outcomes still depend heavily on the learner's technical skills, projects and interview readiness.",
        ],
      },
      {
        heading: "LPU Online MCA: Programme Snapshot",
        body: "LPU Online MCA: 2 years/4 semesters, ₹32,400 per semester on the current page; 5 specializations: Cybersecurity, Full Stack Web Development, AR/VR (Game Development), Machine Learning & AI, Data Science; 104 credits.",
        bullets: [
          "Specialisation depth: A good specialisation should lead to relevant subjects, projects and skills rather than being only a label.",
          "Technical curriculum: Compare programming, algorithms, databases, cloud, AI/ML, cybersecurity and software-development coverage.",
          "Learning ecosystem: Consider LMS quality, faculty interaction, recorded content, live sessions and learner support.",
          "Industry exposure: Check for industry sessions, certifications, technology partners, projects and practical assignments.",
          "Career support: Assess the actual services offered—resume preparation, interview preparation, job listings, hiring events and career counselling.",
        ],
      },
      {
        heading: "Fees: Which Online MCA Is More Budget-Friendly?",
        body: "Fee comparison should be made using the actual payable programme fee, not only a headline scholarship price. Students should also check registration charges, examination fees, taxes where applicable, study-material charges, re-examination charges and whether discounts are conditional.",
        table: {
          head: ["Fee Factor", "Chandigarh University", "LPU Online MCA"],
          rows: [
            ["Programme duration", "2 years", "2 years"],
            ["Semester payment", "Check current official fee page", "Check current official fee page"],
            ["Total programme fee", "Check current official fee page", "Check current official fee page"],
            ["EMI availability", "Available/subject to current terms", "Available/subject to current terms"],
            ["Scholarships/discounts", "Session/category dependent", "Session/category dependent"],
            ["Important check", "Final payable amount", "Final payable amount"],
          ],
        },
        verdict: "Do not select an MCA solely because one university advertises a lower initial price. Compare the complete cost against curriculum depth, technical specialisation, learning resources and career support.",
      },
      {
        heading: "Eligibility Comparison",
        body: "Eligibility is especially important for MCA aspirants because universities can differ in how they treat BCA, B.Sc. Computer Science/IT, B.Tech and non-computer graduates.",
        table: {
          head: ["Eligibility Factor", "Chandigarh University", "LPU Online MCA"],
          rows: [
            ["Bachelor's degree required", "Yes", "Yes"],
            ["Computer/IT background", "Programme-specific", "Programme-specific"],
            ["Mathematics requirement", "Check current programme rules", "Check current programme rules"],
            ["Non-computer graduate route", "May be possible with required background/bridge requirements", "Depends on programme"],
            ["Minimum marks", "Programme-specific", "Programme-specific"],
            ["Age restriction", "Check current admission rules", "Check current admission rules"],
          ],
        },
        verdict: "If you are from BCA/B.Sc. CS/IT, eligibility is usually more straightforward. If you are from B.Com., BBA, BA or another non-computer background, verify mathematics/computer-subject and bridge-course requirements before paying the admission fee.",
      },
      specialisationCareerAlignment,
      {
        heading: "Specialisation Comparison",
        body: "Chandigarh University: Compare the available technology tracks for depth, elective flexibility and project work.\n\nLPU Online MCA: Compare whether the programme offers the technology area you want and whether the curriculum includes enough advanced subjects to build a portfolio.",
        verdict: "There is no universal winner. The winner is the university whose current specialisation matches your intended technology career.",
      },
      curriculumSyllabus,
      {
        heading: "Learning Experience & LMS",
        body: "Online MCA students need more than recorded videos. Compare the complete digital learning ecosystem.",
        table: {
          head: ["Factor", "Chandigarh University", "LPU Online MCA"],
          rows: [
            ["Live classes", "Available/subject to schedule", "Available/subject to schedule"],
            ["Recorded lectures", "Yes", "Yes"],
            ["LMS", "Digital learning platform", "Digital learning platform"],
            ["Faculty interaction", "Online", "Online"],
            ["Discussion/support", "Programme dependent", "Programme dependent"],
            ["Self-paced learning", "Supported", "Supported"],
            ["Industry sessions", "Available as offered", "Available as offered"],
          ],
        },
      },
      examsAssessment,
      projectsExposure,
      placementCareerSupport,
      careerRoles,
      {
        heading: "Which Is Better for Freshers?",
        body: "For a fresher, the better programme is generally the one that gives you: strong programming fundamentals; enough practical coding; project guidance; access to technical electives; career preparation; manageable learning workload. Do not choose based only on university popularity. A fresher who completes an MCA but has no coding portfolio may still struggle to compete with candidates who have strong projects and internships.",
      },
      {
        heading: "Which Is Better for Working Professionals?",
        body: "Working professionals should give additional weight to: weekend/live-class schedules; recorded lecture availability; flexible examination arrangements; LMS quality; academic support; EMI/payment flexibility; specialisations relevant to their existing career. For a working professional, the \"best\" university is often the one that fits the person's schedule while providing a specialisation that can directly improve their current role.",
      },
      onlineVsRegular,
      decisionScorecard,
    ],
    aBestFor: ["Its current specialisation, curriculum, fee and learning model better match your career target."],
    bBestFor: ["Its programme structure, technical track, eligibility and overall cost better fit your situation."],
    verdict:
      "There is no single winner for every MCA aspirant. Choose Chandigarh University if its current specialisation, curriculum, fee and learning model better match your career target. Choose LPU Online MCA if its programme structure, technical track, eligibility and overall cost better fit your situation. The right online MCA should be selected as a career investment, not merely as a degree purchase. Compare the two universities across recognition, eligibility, complete fee, curriculum, specialisation, technical depth, projects, LMS, assessment and career support. Before enrolling, verify the latest official fee, admission deadline, programme eligibility, specialisation availability and regulatory status for the current session.",
    faqs: commonFaqs("Chandigarh University", "LPU"),
  },
  {
    course: "mca",
    aSlug: "lpu-online",
    bSlug: "amity-online",
    aLabel: "LPU",
    bLabel: "Amity Online MCA",
    title:
      "LPU vs Amity Online MCA: Fees, Eligibility, Specialisations, Syllabus & Career Scope 2026",
    metaDescription:
      "Compare LPU vs Amity Online MCA on fees, eligibility, specialisations, curriculum, learning model, exams, projects, career support, placements and ideal learner profile. Find out which online MCA may suit your goals in 2026.",
    intro: introText,
    scopeNote: scopeNoteText,
    factors: [
      { label: "University type", a: "Private university", b: "Private university" },
      { label: "Programme", a: "Online MCA", b: "Online MCA" },
      { label: "Duration", a: "2 years", b: "2 years" },
      { label: "Mode", a: "Online; live/recorded learning", b: "Online; live/recorded learning" },
      { label: "Current fee position", a: "Check current programme page for exact payable fee", b: "Check current programme page for exact payable fee" },
      { label: "Specialisation approach", a: "Technology-focused options", b: "Technology-focused options" },
      { label: "Core technical areas", a: "Programming, databases, web, AI/data/cloud depending on track", b: "Programming, databases, emerging technology depending on track" },
      { label: "Eligibility", a: "Depends on prior degree and mathematics/computer background", b: "Depends on prior degree and programme rules" },
      { label: "Assessment", a: "Online assessment/examinations", b: "Online assessment/examinations" },
      { label: "Projects", a: "Programme-dependent practical work", b: "Programme-dependent practical work" },
      { label: "Career support", a: "Placement/career assistance", b: "Placement/career assistance" },
      { label: "Best suited for", a: "Learners seeking a structured online technology degree", b: "Learners seeking a structured online technology degree" },
    ],
    sections: [
      {
        heading: "LPU: Programme Snapshot",
        body: "LPU Online MCA: 2 years/4 semesters, ₹32,400 per semester on the current page; 5 specializations: Cybersecurity, Full Stack Web Development, AR/VR (Game Development), Machine Learning & AI, Data Science; 104 credits.",
        bullets: [
          "Technical orientation: Evaluate whether the available curriculum matches your target role rather than choosing only by the number of specialisations.",
          "Emerging technology exposure: Check whether AI, data, cloud, cybersecurity, full-stack development and related tools are embedded in credit-bearing coursework.",
          "Learning flexibility: Review the balance of live classes, recorded material, LMS resources and self-paced learning.",
          "Practical learning: Look for coding exercises, projects, case-based assignments, labs and portfolio-building opportunities.",
          "Career support: Placement assistance can help with access and preparation, but employment outcomes still depend heavily on the learner's technical skills, projects and interview readiness.",
        ],
      },
      {
        heading: "Amity Online MCA: Programme Snapshot",
        body: "Amity Online MCA: 2 years; current offerings include Software Engineering, Blockchain Technology & Management, Machine Learning & AI, Cyber Security and other technology-focused variants. Current official pages show differing fees by program/collaboration, so the comparison treats fee as program-specific rather than assuming one universal MCA fee.",
        bullets: [
          "Specialisation depth: A good specialisation should lead to relevant subjects, projects and skills rather than being only a label.",
          "Technical curriculum: Compare programming, algorithms, databases, cloud, AI/ML, cybersecurity and software-development coverage.",
          "Learning ecosystem: Consider LMS quality, faculty interaction, recorded content, live sessions and learner support.",
          "Industry exposure: Check for industry sessions, certifications, technology partners, projects and practical assignments.",
          "Career support: Assess the actual services offered—resume preparation, interview preparation, job listings, hiring events and career counselling.",
        ],
      },
      {
        heading: "Fees: Which Online MCA Is More Budget-Friendly?",
        body: "Fee comparison should be made using the actual payable programme fee, not only a headline scholarship price. Students should also check registration charges, examination fees, taxes where applicable, study-material charges, re-examination charges and whether discounts are conditional.",
        table: {
          head: ["Fee Factor", "LPU", "Amity Online MCA"],
          rows: [
            ["Programme duration", "2 years", "2 years"],
            ["Semester payment", "Check current official fee page", "Check current official fee page"],
            ["Total programme fee", "Check current official fee page", "Check current official fee page"],
            ["EMI availability", "Available/subject to current terms", "Available/subject to current terms"],
            ["Scholarships/discounts", "Session/category dependent", "Session/category dependent"],
            ["Important check", "Final payable amount", "Final payable amount"],
          ],
        },
        verdict: "Do not select an MCA solely because one university advertises a lower initial price. Compare the complete cost against curriculum depth, technical specialisation, learning resources and career support.",
      },
      {
        heading: "Eligibility Comparison",
        body: "Eligibility is especially important for MCA aspirants because universities can differ in how they treat BCA, B.Sc. Computer Science/IT, B.Tech and non-computer graduates.",
        table: {
          head: ["Eligibility Factor", "LPU", "Amity Online MCA"],
          rows: [
            ["Bachelor's degree required", "Yes", "Yes"],
            ["Computer/IT background", "Programme-specific", "Programme-specific"],
            ["Mathematics requirement", "Check current programme rules", "Check current programme rules"],
            ["Non-computer graduate route", "May be possible with required background/bridge requirements", "Depends on programme"],
            ["Minimum marks", "Programme-specific", "Programme-specific"],
            ["Age restriction", "Check current admission rules", "Check current admission rules"],
          ],
        },
        verdict: "If you are from BCA/B.Sc. CS/IT, eligibility is usually more straightforward. If you are from B.Com., BBA, BA or another non-computer background, verify mathematics/computer-subject and bridge-course requirements before paying the admission fee.",
      },
      specialisationCareerAlignment,
      {
        heading: "Specialisation Comparison",
        body: "LPU: Compare the available technology tracks for depth, elective flexibility and project work.\n\nAmity Online MCA: Compare whether the programme offers the technology area you want and whether the curriculum includes enough advanced subjects to build a portfolio.",
        verdict: "There is no universal winner. The winner is the university whose current specialisation matches your intended technology career.",
      },
      curriculumSyllabus,
      {
        heading: "Learning Experience & LMS",
        body: "Online MCA students need more than recorded videos. Compare the complete digital learning ecosystem.",
        table: {
          head: ["Factor", "LPU", "Amity Online MCA"],
          rows: [
            ["Live classes", "Available/subject to schedule", "Available/subject to schedule"],
            ["Recorded lectures", "Yes", "Yes"],
            ["LMS", "Digital learning platform", "Digital learning platform"],
            ["Faculty interaction", "Online", "Online"],
            ["Discussion/support", "Programme dependent", "Programme dependent"],
            ["Self-paced learning", "Supported", "Supported"],
            ["Industry sessions", "Available as offered", "Available as offered"],
          ],
        },
      },
      examsAssessment,
      projectsExposure,
      placementCareerSupport,
      careerRoles,
      {
        heading: "Which Is Better for Freshers?",
        body: "For a fresher, the better programme is generally the one that gives you: strong programming fundamentals; enough practical coding; project guidance; access to technical electives; career preparation; manageable learning workload. Do not choose based only on university popularity. A fresher who completes an MCA but has no coding portfolio may still struggle to compete with candidates who have strong projects and internships.",
      },
      {
        heading: "Which Is Better for Working Professionals?",
        body: "Working professionals should give additional weight to: weekend/live-class schedules; recorded lecture availability; flexible examination arrangements; LMS quality; academic support; EMI/payment flexibility; specialisations relevant to their existing career. For a working professional, the \"best\" university is often the one that fits the person's schedule while providing a specialisation that can directly improve their current role.",
      },
      onlineVsRegular,
      decisionScorecard,
    ],
    aBestFor: ["Its current specialisation, curriculum, fee and learning model better match your career target."],
    bBestFor: ["Its programme structure, technical track, eligibility and overall cost better fit your situation."],
    verdict:
      "There is no single winner for every MCA aspirant. Choose LPU if its current specialisation, curriculum, fee and learning model better match your career target. Choose Amity Online MCA if its programme structure, technical track, eligibility and overall cost better fit your situation. The right online MCA should be selected as a career investment, not merely as a degree purchase. Compare the two universities across recognition, eligibility, complete fee, curriculum, specialisation, technical depth, projects, LMS, assessment and career support. Before enrolling, verify the latest official fee, admission deadline, programme eligibility, specialisation availability and regulatory status for the current session.",
    faqs: commonFaqs("LPU", "Amity"),
  },
  {
    course: "mca",
    aSlug: "chandigarh-university-online",
    bSlug: "manipal-university-jaipur",
    aLabel: "Chandigarh University",
    bLabel: "Manipal Online MCA",
    title:
      "Chandigarh University vs Manipal Online MCA: Fees, Eligibility, Specialisations, Syllabus & Career Scope 2026",
    metaDescription:
      "Compare Chandigarh University vs Manipal Online MCA on fees, eligibility, specialisations, curriculum, learning model, exams, projects, career support, placements and ideal learner profile. Find out which online MCA may suit your goals in 2026.",
    intro: introText,
    scopeNote: scopeNoteText,
    factors: [
      { label: "University type", a: "Private university", b: "Private university" },
      { label: "Programme", a: "Online MCA", b: "Online MCA" },
      { label: "Duration", a: "2 years", b: "2 years" },
      { label: "Mode", a: "Online; live/recorded learning", b: "Online; live/recorded learning" },
      { label: "Current fee position", a: "Check current programme page for exact payable fee", b: "Check current programme page for exact payable fee" },
      { label: "Specialisation approach", a: "Technology-focused options", b: "Technology-focused options" },
      { label: "Core technical areas", a: "Programming, databases, web, AI/data/cloud depending on track", b: "Programming, databases, emerging technology depending on track" },
      { label: "Eligibility", a: "Depends on prior degree and mathematics/computer background", b: "Depends on prior degree and programme rules" },
      { label: "Assessment", a: "Online assessment/examinations", b: "Online assessment/examinations" },
      { label: "Projects", a: "Programme-dependent practical work", b: "Programme-dependent practical work" },
      { label: "Career support", a: "Placement/career assistance", b: "Placement/career assistance" },
      { label: "Best suited for", a: "Learners seeking a structured online technology degree", b: "Learners seeking a structured online technology degree" },
    ],
    sections: [
      {
        heading: "Chandigarh University: Programme Snapshot",
        body: "Chandigarh University Online MCA: 2 years; current program highlights include Agentic AI and Microsoft-powered options; core eligibility includes computer-related graduation or other graduation with relevant math/programming/statistics background.",
        bullets: [
          "Technical orientation: Evaluate whether the available curriculum matches your target role rather than choosing only by the number of specialisations.",
          "Emerging technology exposure: Check whether AI, data, cloud, cybersecurity, full-stack development and related tools are embedded in credit-bearing coursework.",
          "Learning flexibility: Review the balance of live classes, recorded material, LMS resources and self-paced learning.",
          "Practical learning: Look for coding exercises, projects, case-based assignments, labs and portfolio-building opportunities.",
          "Career support: Placement assistance can help with access and preparation, but employment outcomes still depend heavily on the learner's technical skills, projects and interview readiness.",
        ],
      },
      {
        heading: "Manipal Online MCA: Programme Snapshot",
        body: "Online Manipal / Manipal University Jaipur Online MCA: 24 months/4 semesters, current listed fee ₹1,58,000, ₹39,500/semester before applicable offers; eligibility currently lists minimum 50% graduation, with electives/specializations including AI & Data Science, Cloud Computing, Cybersecurity, Comprehensive Emerging Technologies and AI & ML.",
        bullets: [
          "Specialisation depth: A good specialisation should lead to relevant subjects, projects and skills rather than being only a label.",
          "Technical curriculum: Compare programming, algorithms, databases, cloud, AI/ML, cybersecurity and software-development coverage.",
          "Learning ecosystem: Consider LMS quality, faculty interaction, recorded content, live sessions and learner support.",
          "Industry exposure: Check for industry sessions, certifications, technology partners, projects and practical assignments.",
          "Career support: Assess the actual services offered—resume preparation, interview preparation, job listings, hiring events and career counselling.",
        ],
      },
      {
        heading: "Fees: Which Online MCA Is More Budget-Friendly?",
        body: "Fee comparison should be made using the actual payable programme fee, not only a headline scholarship price. Students should also check registration charges, examination fees, taxes where applicable, study-material charges, re-examination charges and whether discounts are conditional.",
        table: {
          head: ["Fee Factor", "Chandigarh University", "Manipal Online MCA"],
          rows: [
            ["Programme duration", "2 years", "2 years"],
            ["Semester payment", "Check current official fee page", "Check current official fee page"],
            ["Total programme fee", "Check current official fee page", "Check current official fee page"],
            ["EMI availability", "Available/subject to current terms", "Available/subject to current terms"],
            ["Scholarships/discounts", "Session/category dependent", "Session/category dependent"],
            ["Important check", "Final payable amount", "Final payable amount"],
          ],
        },
        verdict: "Do not select an MCA solely because one university advertises a lower initial price. Compare the complete cost against curriculum depth, technical specialisation, learning resources and career support.",
      },
      {
        heading: "Eligibility Comparison",
        body: "Eligibility is especially important for MCA aspirants because universities can differ in how they treat BCA, B.Sc. Computer Science/IT, B.Tech and non-computer graduates.",
        table: {
          head: ["Eligibility Factor", "Chandigarh University", "Manipal Online MCA"],
          rows: [
            ["Bachelor's degree required", "Yes", "Yes"],
            ["Computer/IT background", "Programme-specific", "Programme-specific"],
            ["Mathematics requirement", "Check current programme rules", "Check current programme rules"],
            ["Non-computer graduate route", "May be possible with required background/bridge requirements", "Depends on programme"],
            ["Minimum marks", "Programme-specific", "Programme-specific"],
            ["Age restriction", "Check current admission rules", "Check current admission rules"],
          ],
        },
        verdict: "If you are from BCA/B.Sc. CS/IT, eligibility is usually more straightforward. If you are from B.Com., BBA, BA or another non-computer background, verify mathematics/computer-subject and bridge-course requirements before paying the admission fee.",
      },
      specialisationCareerAlignment,
      {
        heading: "Specialisation Comparison",
        body: "Chandigarh University: Compare the available technology tracks for depth, elective flexibility and project work.\n\nManipal Online MCA: Compare whether the programme offers the technology area you want and whether the curriculum includes enough advanced subjects to build a portfolio.",
        verdict: "There is no universal winner. The winner is the university whose current specialisation matches your intended technology career.",
      },
      curriculumSyllabus,
      {
        heading: "Learning Experience & LMS",
        body: "Online MCA students need more than recorded videos. Compare the complete digital learning ecosystem.",
        table: {
          head: ["Factor", "Chandigarh University", "Manipal Online MCA"],
          rows: [
            ["Live classes", "Available/subject to schedule", "Available/subject to schedule"],
            ["Recorded lectures", "Yes", "Yes"],
            ["LMS", "Digital learning platform", "Digital learning platform"],
            ["Faculty interaction", "Online", "Online"],
            ["Discussion/support", "Programme dependent", "Programme dependent"],
            ["Self-paced learning", "Supported", "Supported"],
            ["Industry sessions", "Available as offered", "Available as offered"],
          ],
        },
      },
      examsAssessment,
      projectsExposure,
      placementCareerSupport,
      careerRoles,
      {
        heading: "Which Is Better for Freshers?",
        body: "For a fresher, the better programme is generally the one that gives you: strong programming fundamentals; enough practical coding; project guidance; access to technical electives; career preparation; manageable learning workload. Do not choose based only on university popularity. A fresher who completes an MCA but has no coding portfolio may still struggle to compete with candidates who have strong projects and internships.",
      },
      {
        heading: "Which Is Better for Working Professionals?",
        body: "Working professionals should give additional weight to: weekend/live-class schedules; recorded lecture availability; flexible examination arrangements; LMS quality; academic support; EMI/payment flexibility; specialisations relevant to their existing career. For a working professional, the \"best\" university is often the one that fits the person's schedule while providing a specialisation that can directly improve their current role.",
      },
      onlineVsRegular,
      decisionScorecard,
    ],
    aBestFor: ["Its current specialisation, curriculum, fee and learning model better match your career target."],
    bBestFor: ["Its programme structure, technical track, eligibility and overall cost better fit your situation."],
    verdict:
      "There is no single winner for every MCA aspirant. Choose Chandigarh University if its current specialisation, curriculum, fee and learning model better match your career target. Choose Manipal Online MCA if its programme structure, technical track, eligibility and overall cost better fit your situation. The right online MCA should be selected as a career investment, not merely as a degree purchase. Compare the two universities across recognition, eligibility, complete fee, curriculum, specialisation, technical depth, projects, LMS, assessment and career support. Before enrolling, verify the latest official fee, admission deadline, programme eligibility, specialisation availability and regulatory status for the current session.",
    faqs: commonFaqs("Chandigarh University", "Manipal"),
  },
  {
    course: "mca",
    aSlug: "lpu-online",
    bSlug: "manipal-university-jaipur",
    aLabel: "LPU",
    bLabel: "Manipal Online MCA",
    title:
      "LPU vs Manipal Online MCA: Fees, Eligibility, Specialisations, Syllabus & Career Scope 2026",
    metaDescription:
      "Compare LPU vs Manipal Online MCA on fees, eligibility, specialisations, curriculum, learning model, exams, projects, career support, placements and ideal learner profile. Find out which online MCA may suit your goals in 2026.",
    intro: introText,
    scopeNote: scopeNoteText,
    factors: [
      { label: "University type", a: "Private university", b: "Private university" },
      { label: "Programme", a: "Online MCA", b: "Online MCA" },
      { label: "Duration", a: "2 years", b: "2 years" },
      { label: "Mode", a: "Online; live/recorded learning", b: "Online; live/recorded learning" },
      { label: "Current fee position", a: "Check current programme page for exact payable fee", b: "Check current programme page for exact payable fee" },
      { label: "Specialisation approach", a: "Technology-focused options", b: "Technology-focused options" },
      { label: "Core technical areas", a: "Programming, databases, web, AI/data/cloud depending on track", b: "Programming, databases, emerging technology depending on track" },
      { label: "Eligibility", a: "Depends on prior degree and mathematics/computer background", b: "Depends on prior degree and programme rules" },
      { label: "Assessment", a: "Online assessment/examinations", b: "Online assessment/examinations" },
      { label: "Projects", a: "Programme-dependent practical work", b: "Programme-dependent practical work" },
      { label: "Career support", a: "Placement/career assistance", b: "Placement/career assistance" },
      { label: "Best suited for", a: "Learners seeking a structured online technology degree", b: "Learners seeking a structured online technology degree" },
    ],
    sections: [
      {
        heading: "LPU: Programme Snapshot",
        body: "LPU Online MCA: 2 years/4 semesters, ₹32,400 per semester on the current page; 5 specializations: Cybersecurity, Full Stack Web Development, AR/VR (Game Development), Machine Learning & AI, Data Science; 104 credits.",
        bullets: [
          "Technical orientation: Evaluate whether the available curriculum matches your target role rather than choosing only by the number of specialisations.",
          "Emerging technology exposure: Check whether AI, data, cloud, cybersecurity, full-stack development and related tools are embedded in credit-bearing coursework.",
          "Learning flexibility: Review the balance of live classes, recorded material, LMS resources and self-paced learning.",
          "Practical learning: Look for coding exercises, projects, case-based assignments, labs and portfolio-building opportunities.",
          "Career support: Placement assistance can help with access and preparation, but employment outcomes still depend heavily on the learner's technical skills, projects and interview readiness.",
        ],
      },
      {
        heading: "Manipal Online MCA: Programme Snapshot",
        body: "Online Manipal / Manipal University Jaipur Online MCA: 24 months/4 semesters, current listed fee ₹1,58,000, ₹39,500/semester before applicable offers; eligibility currently lists minimum 50% graduation, with electives/specializations including AI & Data Science, Cloud Computing, Cybersecurity, Comprehensive Emerging Technologies and AI & ML.",
        bullets: [
          "Specialisation depth: A good specialisation should lead to relevant subjects, projects and skills rather than being only a label.",
          "Technical curriculum: Compare programming, algorithms, databases, cloud, AI/ML, cybersecurity and software-development coverage.",
          "Learning ecosystem: Consider LMS quality, faculty interaction, recorded content, live sessions and learner support.",
          "Industry exposure: Check for industry sessions, certifications, technology partners, projects and practical assignments.",
          "Career support: Assess the actual services offered—resume preparation, interview preparation, job listings, hiring events and career counselling.",
        ],
      },
      {
        heading: "Fees: Which Online MCA Is More Budget-Friendly?",
        body: "Fee comparison should be made using the actual payable programme fee, not only a headline scholarship price. Students should also check registration charges, examination fees, taxes where applicable, study-material charges, re-examination charges and whether discounts are conditional.",
        table: {
          head: ["Fee Factor", "LPU", "Manipal Online MCA"],
          rows: [
            ["Programme duration", "2 years", "2 years"],
            ["Semester payment", "Check current official fee page", "Check current official fee page"],
            ["Total programme fee", "Check current official fee page", "Check current official fee page"],
            ["EMI availability", "Available/subject to current terms", "Available/subject to current terms"],
            ["Scholarships/discounts", "Session/category dependent", "Session/category dependent"],
            ["Important check", "Final payable amount", "Final payable amount"],
          ],
        },
        verdict: "Do not select an MCA solely because one university advertises a lower initial price. Compare the complete cost against curriculum depth, technical specialisation, learning resources and career support.",
      },
      {
        heading: "Eligibility Comparison",
        body: "Eligibility is especially important for MCA aspirants because universities can differ in how they treat BCA, B.Sc. Computer Science/IT, B.Tech and non-computer graduates.",
        table: {
          head: ["Eligibility Factor", "LPU", "Manipal Online MCA"],
          rows: [
            ["Bachelor's degree required", "Yes", "Yes"],
            ["Computer/IT background", "Programme-specific", "Programme-specific"],
            ["Mathematics requirement", "Check current programme rules", "Check current programme rules"],
            ["Non-computer graduate route", "May be possible with required background/bridge requirements", "Depends on programme"],
            ["Minimum marks", "Programme-specific", "Programme-specific"],
            ["Age restriction", "Check current admission rules", "Check current admission rules"],
          ],
        },
        verdict: "If you are from BCA/B.Sc. CS/IT, eligibility is usually more straightforward. If you are from B.Com., BBA, BA or another non-computer background, verify mathematics/computer-subject and bridge-course requirements before paying the admission fee.",
      },
      specialisationCareerAlignment,
      {
        heading: "Specialisation Comparison",
        body: "LPU: Compare the available technology tracks for depth, elective flexibility and project work.\n\nManipal Online MCA: Compare whether the programme offers the technology area you want and whether the curriculum includes enough advanced subjects to build a portfolio.",
        verdict: "There is no universal winner. The winner is the university whose current specialisation matches your intended technology career.",
      },
      curriculumSyllabus,
      {
        heading: "Learning Experience & LMS",
        body: "Online MCA students need more than recorded videos. Compare the complete digital learning ecosystem.",
        table: {
          head: ["Factor", "LPU", "Manipal Online MCA"],
          rows: [
            ["Live classes", "Available/subject to schedule", "Available/subject to schedule"],
            ["Recorded lectures", "Yes", "Yes"],
            ["LMS", "Digital learning platform", "Digital learning platform"],
            ["Faculty interaction", "Online", "Online"],
            ["Discussion/support", "Programme dependent", "Programme dependent"],
            ["Self-paced learning", "Supported", "Supported"],
            ["Industry sessions", "Available as offered", "Available as offered"],
          ],
        },
      },
      examsAssessment,
      projectsExposure,
      placementCareerSupport,
      careerRoles,
      {
        heading: "Which Is Better for Freshers?",
        body: "For a fresher, the better programme is generally the one that gives you: strong programming fundamentals; enough practical coding; project guidance; access to technical electives; career preparation; manageable learning workload. Do not choose based only on university popularity. A fresher who completes an MCA but has no coding portfolio may still struggle to compete with candidates who have strong projects and internships.",
      },
      {
        heading: "Which Is Better for Working Professionals?",
        body: "Working professionals should give additional weight to: weekend/live-class schedules; recorded lecture availability; flexible examination arrangements; LMS quality; academic support; EMI/payment flexibility; specialisations relevant to their existing career. For a working professional, the \"best\" university is often the one that fits the person's schedule while providing a specialisation that can directly improve their current role.",
      },
      onlineVsRegular,
      decisionScorecard,
    ],
    aBestFor: ["Its current specialisation, curriculum, fee and learning model better match your career target."],
    bBestFor: ["Its programme structure, technical track, eligibility and overall cost better fit your situation."],
    verdict:
      "There is no single winner for every MCA aspirant. Choose LPU if its current specialisation, curriculum, fee and learning model better match your career target. Choose Manipal Online MCA if its programme structure, technical track, eligibility and overall cost better fit your situation. The right online MCA should be selected as a career investment, not merely as a degree purchase. Compare the two universities across recognition, eligibility, complete fee, curriculum, specialisation, technical depth, projects, LMS, assessment and career support. Before enrolling, verify the latest official fee, admission deadline, programme eligibility, specialisation availability and regulatory status for the current session.",
    faqs: commonFaqs("LPU", "Manipal"),
  },
  {
    course: "mca",
    aSlug: "amity-online",
    bSlug: "manipal-university-jaipur",
    aLabel: "Amity",
    bLabel: "Manipal Online MCA",
    title:
      "Amity vs Manipal Online MCA: Fees, Eligibility, Specialisations, Syllabus & Career Scope 2026",
    metaDescription:
      "Compare Amity vs Manipal Online MCA on fees, eligibility, specialisations, curriculum, learning model, exams, projects, career support, placements and ideal learner profile. Find out which online MCA may suit your goals in 2026.",
    intro: introText,
    scopeNote: scopeNoteText,
    factors: [
      { label: "University type", a: "Private university", b: "Private university" },
      { label: "Programme", a: "Online MCA", b: "Online MCA" },
      { label: "Duration", a: "2 years", b: "2 years" },
      { label: "Mode", a: "Online; live/recorded learning", b: "Online; live/recorded learning" },
      { label: "Current fee position", a: "Check current programme page for exact payable fee", b: "Check current programme page for exact payable fee" },
      { label: "Specialisation approach", a: "Technology-focused options", b: "Technology-focused options" },
      { label: "Core technical areas", a: "Programming, databases, web, AI/data/cloud depending on track", b: "Programming, databases, emerging technology depending on track" },
      { label: "Eligibility", a: "Depends on prior degree and mathematics/computer background", b: "Depends on prior degree and programme rules" },
      { label: "Assessment", a: "Online assessment/examinations", b: "Online assessment/examinations" },
      { label: "Projects", a: "Programme-dependent practical work", b: "Programme-dependent practical work" },
      { label: "Career support", a: "Placement/career assistance", b: "Placement/career assistance" },
      { label: "Best suited for", a: "Learners seeking a structured online technology degree", b: "Learners seeking a structured online technology degree" },
    ],
    sections: [
      {
        heading: "Amity: Programme Snapshot",
        body: "Amity Online MCA: 2 years; current offerings include Software Engineering, Blockchain Technology & Management, Machine Learning & AI, Cyber Security and other technology-focused variants. Current official pages show differing fees by program/collaboration, so the comparison treats fee as program-specific rather than assuming one universal MCA fee.",
        bullets: [
          "Technical orientation: Evaluate whether the available curriculum matches your target role rather than choosing only by the number of specialisations.",
          "Emerging technology exposure: Check whether AI, data, cloud, cybersecurity, full-stack development and related tools are embedded in credit-bearing coursework.",
          "Learning flexibility: Review the balance of live classes, recorded material, LMS resources and self-paced learning.",
          "Practical learning: Look for coding exercises, projects, case-based assignments, labs and portfolio-building opportunities.",
          "Career support: Placement assistance can help with access and preparation, but employment outcomes still depend heavily on the learner's technical skills, projects and interview readiness.",
        ],
      },
      {
        heading: "Manipal Online MCA: Programme Snapshot",
        body: "Online Manipal / Manipal University Jaipur Online MCA: 24 months/4 semesters, current listed fee ₹1,58,000, ₹39,500/semester before applicable offers; eligibility currently lists minimum 50% graduation, with electives/specializations including AI & Data Science, Cloud Computing, Cybersecurity, Comprehensive Emerging Technologies and AI & ML.",
        bullets: [
          "Specialisation depth: A good specialisation should lead to relevant subjects, projects and skills rather than being only a label.",
          "Technical curriculum: Compare programming, algorithms, databases, cloud, AI/ML, cybersecurity and software-development coverage.",
          "Learning ecosystem: Consider LMS quality, faculty interaction, recorded content, live sessions and learner support.",
          "Industry exposure: Check for industry sessions, certifications, technology partners, projects and practical assignments.",
          "Career support: Assess the actual services offered—resume preparation, interview preparation, job listings, hiring events and career counselling.",
        ],
      },
      {
        heading: "Fees: Which Online MCA Is More Budget-Friendly?",
        body: "Fee comparison should be made using the actual payable programme fee, not only a headline scholarship price. Students should also check registration charges, examination fees, taxes where applicable, study-material charges, re-examination charges and whether discounts are conditional.",
        table: {
          head: ["Fee Factor", "Amity", "Manipal Online MCA"],
          rows: [
            ["Programme duration", "2 years", "2 years"],
            ["Semester payment", "Check current official fee page", "Check current official fee page"],
            ["Total programme fee", "Check current official fee page", "Check current official fee page"],
            ["EMI availability", "Available/subject to current terms", "Available/subject to current terms"],
            ["Scholarships/discounts", "Session/category dependent", "Session/category dependent"],
            ["Important check", "Final payable amount", "Final payable amount"],
          ],
        },
        verdict: "Do not select an MCA solely because one university advertises a lower initial price. Compare the complete cost against curriculum depth, technical specialisation, learning resources and career support.",
      },
      {
        heading: "Eligibility Comparison",
        body: "Eligibility is especially important for MCA aspirants because universities can differ in how they treat BCA, B.Sc. Computer Science/IT, B.Tech and non-computer graduates.",
        table: {
          head: ["Eligibility Factor", "Amity", "Manipal Online MCA"],
          rows: [
            ["Bachelor's degree required", "Yes", "Yes"],
            ["Computer/IT background", "Programme-specific", "Programme-specific"],
            ["Mathematics requirement", "Check current programme rules", "Check current programme rules"],
            ["Non-computer graduate route", "May be possible with required background/bridge requirements", "Depends on programme"],
            ["Minimum marks", "Programme-specific", "Programme-specific"],
            ["Age restriction", "Check current admission rules", "Check current admission rules"],
          ],
        },
        verdict: "If you are from BCA/B.Sc. CS/IT, eligibility is usually more straightforward. If you are from B.Com., BBA, BA or another non-computer background, verify mathematics/computer-subject and bridge-course requirements before paying the admission fee.",
      },
      specialisationCareerAlignment,
      {
        heading: "Specialisation Comparison",
        body: "Amity: Compare the available technology tracks for depth, elective flexibility and project work.\n\nManipal Online MCA: Compare whether the programme offers the technology area you want and whether the curriculum includes enough advanced subjects to build a portfolio.",
        verdict: "There is no universal winner. The winner is the university whose current specialisation matches your intended technology career.",
      },
      curriculumSyllabus,
      {
        heading: "Learning Experience & LMS",
        body: "Online MCA students need more than recorded videos. Compare the complete digital learning ecosystem.",
        table: {
          head: ["Factor", "Amity", "Manipal Online MCA"],
          rows: [
            ["Live classes", "Available/subject to schedule", "Available/subject to schedule"],
            ["Recorded lectures", "Yes", "Yes"],
            ["LMS", "Digital learning platform", "Digital learning platform"],
            ["Faculty interaction", "Online", "Online"],
            ["Discussion/support", "Programme dependent", "Programme dependent"],
            ["Self-paced learning", "Supported", "Supported"],
            ["Industry sessions", "Available as offered", "Available as offered"],
          ],
        },
      },
      examsAssessment,
      projectsExposure,
      placementCareerSupport,
      careerRoles,
      {
        heading: "Which Is Better for Freshers?",
        body: "For a fresher, the better programme is generally the one that gives you: strong programming fundamentals; enough practical coding; project guidance; access to technical electives; career preparation; manageable learning workload. Do not choose based only on university popularity. A fresher who completes an MCA but has no coding portfolio may still struggle to compete with candidates who have strong projects and internships.",
      },
      {
        heading: "Which Is Better for Working Professionals?",
        body: "Working professionals should give additional weight to: weekend/live-class schedules; recorded lecture availability; flexible examination arrangements; LMS quality; academic support; EMI/payment flexibility; specialisations relevant to their existing career. For a working professional, the \"best\" university is often the one that fits the person's schedule while providing a specialisation that can directly improve their current role.",
      },
      onlineVsRegular,
      decisionScorecard,
    ],
    aBestFor: ["Its current specialisation, curriculum, fee and learning model better match your career target."],
    bBestFor: ["Its programme structure, technical track, eligibility and overall cost better fit your situation."],
    verdict:
      "There is no single winner for every MCA aspirant. Choose Amity if its current specialisation, curriculum, fee and learning model better match your career target. Choose Manipal Online MCA if its programme structure, technical track, eligibility and overall cost better fit your situation. The right online MCA should be selected as a career investment, not merely as a degree purchase. Compare the two universities across recognition, eligibility, complete fee, curriculum, specialisation, technical depth, projects, LMS, assessment and career support. Before enrolling, verify the latest official fee, admission deadline, programme eligibility, specialisation availability and regulatory status for the current session.",
    faqs: commonFaqs("Amity", "Manipal"),
  },
];
