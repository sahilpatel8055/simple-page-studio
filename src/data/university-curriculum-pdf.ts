import type { UniversityCurriculum } from "./university-curriculum";

const V = "2026-08-16";
const MANUAL = "Manually researched — source: official university website";

export const pdfCurricula: Record<string, UniversityCurriculum> = {
  "smu-online::online-mba": {
    note: "SMU's online MBA front-loads core management subjects in the first two semesters and lets students pick two elective specialisation tracks running through semesters three and four alongside project work.",
    sourceLabel: MANUAL,
    verifiedOn: V,
    semesters: [
      {
        label: "Semester 1",
        subjects: [
          "Marketing Management",
          "Business Economics",
          "Principles of Management and Organisational Behaviour",
          "Business Communication",
          "Accounting for Managers",
          "Legal Aspects of Business",
          "Computer Application in Management",
        ],
      },
      {
        label: "Semester 2",
        subjects: [
          "Human Resource Management",
          "Productions and Operations Management",
          "Research Methodology and Statistical Techniques",
          "Quantitative Methods in Management",
          "Global Economic Environment and Policy",
          "Financial Management",
          "Management Information Systems",
        ],
      },
      {
        label: "Semester 3",
        subjects: [
          "Business Strategy",
          "Project Management",
          "Specialisation 1 Elective 1",
          "Specialisation 1 Elective 2",
          "Specialisation 2 Elective 1",
          "Specialisation 2 Elective 2",
        ],
      },
      {
        label: "Semester 4",
        subjects: [
          "Banking and Insurance Management",
          "Project Work",
          "Specialisation 1 Elective 1",
          "Specialisation 1 Elective 2",
          "Specialisation 2 Elective 1",
          "Specialisation 2 Elective 2",
        ],
      },
    ],
  },

  "smu-online::online-bcom": {
    note: "SMU's online BCom is a six-semester, AICTE-accredited commerce degree that pairs accounting subjects with business law, economics and taxation courses in the early semesters.",
    sourceLabel: MANUAL,
    verifiedOn: V,
    semesters: [
      {
        label: "Semester 1",
        subjects: [
          "Financial Accounting",
          "Business Mathematics and Statistics",
          "Microeconomics",
          "Business Environment",
        ],
      },
      {
        label: "Semester 2",
        subjects: [
          "Business Communication",
          "Business Law",
          "Indian Economy",
          "Computer Applications in Business",
        ],
      },
      {
        label: "Semester 3",
        subjects: ["Cost Accounting", "Management Accounting", "Auditing", "Taxation"],
      },
    ],
  },

  "smu-online::online-bba": {
    note: "SMU's online BBA runs across four documented semesters shown in its published syllabus, moving from management and accounting fundamentals into marketing, finance and international business.",
    sourceLabel: MANUAL,
    verifiedOn: V,
    semesters: [
      {
        label: "Semester 1",
        subjects: [
          "Principles and Practice of Management",
          "Financial Accounting",
          "Business Economics",
          "Business Law",
          "Business Communication",
        ],
      },
      {
        label: "Semester 2",
        subjects: [
          "Human Resources & Organizational Behaviour",
          "Business Environment",
          "Business Finance",
          "Business Statistics",
          "Marketing Management",
        ],
      },
      {
        label: "Semester 3",
        subjects: [
          "International Business",
          "Rural Marketing",
          "Entrepreneurship and Small Business",
          "Accounting for Management",
          "Management of Financial Services",
        ],
      },
      {
        label: "Semester 4",
        subjects: ["Business Policy and Strategy"],
      },
    ],
  },

  "smu-online::online-ba": {
    note: "SMU's online BA (Sociology specialisation track) spans six semesters and layers sociology, political science and English literature papers together with communication and values courses each term.",
    sourceLabel: MANUAL,
    verifiedOn: V,
    semesters: [
      {
        label: "Semester 1",
        subjects: [
          "Introduction to Sociology",
          "Foundations of Political Science",
          "Indian English Literature",
          "Communicative English",
          "Natural Science",
        ],
      },
      {
        label: "Semester 2",
        subjects: [
          "Sociology in India",
          "Political Theory",
          "World Literature",
          "Functional English",
          "Environmental Studies",
        ],
      },
      {
        label: "Semester 3",
        subjects: [
          "Rural Sociology",
          "Comparative Political Analysis",
          "Essays and Poetry",
          "Universal Human Values",
          "Digital Fluency",
        ],
      },
      {
        label: "Semester 4",
        subjects: [
          "Urban Sociology",
          "Family, Kinship, and Marriage",
          "Principle of Sociology",
          "Classical Indian Political Thought",
        ],
      },
    ],
  },

  "smu-online::online-mca": {
    note: "SMU's online MCA opens with programming, mathematics and systems fundamentals in semester one before moving into networks, software engineering and data structures with dedicated lab papers in semester two.",
    sourceLabel: MANUAL,
    verifiedOn: V,
    semesters: [
      {
        label: "Semester 1",
        subjects: [
          "Fundamentals of Computers and IT",
          "Fundamentals of Mathematics",
          "Computational Mathematics",
          "Java Programming",
          "Operating Systems",
          "Database Management System",
          "Database Management System Lab",
          "Java Programming Lab",
        ],
      },
      {
        label: "Semester 2",
        subjects: [
          "Python Programming",
          "Computer Organisation and Architecture",
          "Software Engineering and Unified Modelling Language",
          "Data Structures and Algorithms",
          "Data Structures and Algorithms Lab",
          "Python Programming Lab",
        ],
      },
    ],
  },

  "smu-online::online-mcom": {
    note: "SMU's online MCom begins with management, marketing and financial accounting foundations in semester one, followed by advanced corporate accounting, business law and HR papers in semester two.",
    sourceLabel: MANUAL,
    verifiedOn: V,
    semesters: [
      {
        label: "Semester 1",
        subjects: [
          "Management Concepts and Organisational Behaviour",
          "Marketing Management",
          "Financial Accounting & Reporting",
          "Economics for Managers",
          "Corporate Financial Management",
        ],
      },
      {
        label: "Semester 2",
        subjects: [
          "Advanced Corporate Accounting",
          "Business and Economic Laws",
          "Cost Analysis & Control",
          "Human Resource Management",
          "Audit & Assurance",
        ],
      },
    ],
  },

  "smu-online::online-ma": {
    note: "SMU's online MA (English specialisation) is organised around literature and literary-theory papers that deepen from drama and poetry in semester one to genre electives and criticism in later semesters.",
    sourceLabel: MANUAL,
    verifiedOn: V,
    semesters: [
      {
        label: "Semester 1",
        subjects: ["Drama – I", "Poetry – I", "Fiction – I", "Literary Theory and Criticism – I"],
      },
      {
        label: "Semester 2",
        subjects: [
          "Drama – II",
          "Poetry – II",
          "Fiction – II",
          "Literary Theory and Criticism – II",
        ],
      },
      {
        label: "Semester 3",
        subjects: [
          "American Literature",
          "Indian English Literature",
          "Commonwealth Literature",
          "Choose any 2 electives",
        ],
      },
    ],
  },

  "parul-online::online-mca": {
    note: "Parul's online MCA groups its four semesters by stage — foundation, core applied computing, specialisation deep-dive, and a final capstone/project semester — rather than listing a fixed elective every term.",
    sourceLabel: MANUAL,
    verifiedOn: V,
    semesters: [
      {
        label: "Semester 1",
        subjects: [
          "Programming with Python (advanced)",
          "Data Structures and Algorithms",
          "Computer Organisation and Architecture",
          "Database Management Systems (DBMS)",
          "Software Engineering Principles",
          "Discrete Mathematics",
          "Digital Assignment Set 1",
        ],
      },
      {
        label: "Semester 2",
        subjects: [
          "Operating Systems and System Software",
          "Computer Networks and TCP/IP Architecture",
          "Web Technologies and Application Development",
          "Object-Oriented Programming (Java or C++)",
          "Specialization Foundation Subject",
          "Elective 1",
          "Mid-Program Assessment",
        ],
      },
      {
        label: "Semester 3",
        subjects: [
          "Advanced Specialization Subject 1",
          "Advanced Specialization Subject 2",
          "Machine Learning or Cloud Applications (Specialization-Aligned)",
          "Elective 2",
          "Capstone Project Phase 1 (Problem Definition and Literature Review)",
        ],
      },
      {
        label: "Semester 4",
        subjects: [
          "Capstone Project Final Submission and Viva Voce",
          "Advanced Specialization Subject 3",
          "Industry Project Report or Research Publication",
          "Digital Convocation Registration",
        ],
      },
    ],
  },

  "parul-online::online-bca": {
    note: "Parul's online BCA is a six-semester programme that reserves the final two semesters for a chosen specialisation track — DevOps, Full Stack, Data Science, Cyber Security, Cloud, or IT Management.",
    sourceLabel: MANUAL,
    verifiedOn: V,
    semesters: [
      {
        label: "Semester 1",
        subjects: [
          "Programming Fundamentals (C/C++)",
          "Mathematics For Computing",
          "Digital Electronics And Computer Organization",
          "Communication Skills For IT Professionals",
          "Introduction To Information Technology",
          "Environmental Studies",
        ],
      },
      {
        label: "Semester 2",
        subjects: [
          "Data Structures Using C",
          "Database Management Systems (DBMS)",
          "Operating System Concepts",
          "Web Designing Fundamentals (HTML, CSS)",
          "Discrete Mathematics",
          "Software Engineering Introduction",
        ],
      },
      {
        label: "Semester 3",
        subjects: [
          "Object-Oriented Programming Using Java",
          "Computer Networks And Data Communication",
          "Advanced DBMS",
          "Web Development (JavaScript, PHP)",
          "Python Programming",
          "System Analysis And Design",
        ],
      },
      {
        label: "Semester 4",
        subjects: [
          "Advanced Java Or Python",
          "Software Testing And Quality Assurance",
          "Linux Administration Fundamentals",
          "Cloud Computing Concepts",
          "Data Science Introduction",
          "Project Management For IT",
        ],
      },
      {
        label: "Semester 5",
        subjects: [
          "Specialization-Specific Subjects (Based On Chosen Track: DevOps, Full Stack, Data Science, Cyber Security, Cloud, Or IT Management)",
          "Advanced Web Technologies",
          "Agile And Scrum Methodology",
          "Internet Of Things Basics",
        ],
      },
      {
        label: "Semester 6",
        subjects: [
          "Advanced Specialization Papers (Continuation)",
          "Final Project / Capstone Project",
          "Entrepreneurship For IT Professionals",
          "Comprehensive Viva-Voce",
        ],
      },
    ],
  },

  "parul-online::online-bba": {
    note: "Parul's online BBA syllabus is published in paired-semester blocks — business foundation, functional management, then specialisation and strategy — across its six-semester structure.",
    sourceLabel: MANUAL,
    verifiedOn: V,
    semesters: [
      {
        label: "Semester 1–2",
        subjects: [
          "Principles of Management and Organisational Behaviour",
          "Business Economics (Micro and Macro)",
          "Financial Accounting and Book-Keeping",
          "Marketing Management Basics",
          "Business Communication and Professional Writing",
          "Business Statistics and Quantitative Methods",
          "Computer Applications in Business",
          "Business Environment and Corporate Governance",
          "Practical Assignment Set 1",
        ],
      },
      {
        label: "Semester 3–4",
        subjects: [
          "Human Resource Management",
          "Corporate Finance and Financial Management",
          "Operations and Production Management",
          "Consumer Behaviour and Market Research",
          "Business Law and Legal Environment",
          "Entrepreneurship Development",
          "Management Accounting",
          "Research Methods for Business",
          "Specialization Elective 1 (selected at enrollment)",
          "Mid-Program Assessment and Online Proctored Exams",
        ],
      },
      {
        label: "Semester 5–6",
        subjects: [
          "Advanced Specialization Subject 1 and 2",
          "Strategic Management and Business Policy",
          "International Business and Global Markets",
          "Project Management and Operations Strategy",
          "Industry Live Project or Case Study Analysis",
          "Business Ethics and Corporate Social Responsibility",
          "Capstone Project Submission",
          "Final Online Proctored Examinations",
        ],
      },
    ],
  },
};
