/**
 * University-specific semester curricula.
 *
 * Every entry below was transcribed by hand from the university source
 * documents kept in `src/data/sources/` and cross-checked against the
 * university's own published programme/syllabus page. Nothing is inferred:
 * if a semester is not published, it is simply absent here and the page falls
 * back to the common course structure with a clear note.
 *
 * Keys: `${universitySlug}::${courseFamilyKey}` (e.g. `lpu-online::online-mca`).
 */

export interface UniversityCurriculum {
  semesters: { label: string; subjects: string[] }[];
  /** Short university-specific framing sentence shown above the semesters. */
  note: string;
  sourceLabel: string;
  sourceUrl?: string;
  verifiedOn: string;
}

import { pdfCurricula } from "./university-curriculum-pdf";
import { blogCurricula } from "./university-curriculum-blogs";

const V = "2026-08-14";
const MANUAL = "Manually researched — source: official university website";

export const universityCurricula: Record<string, UniversityCurriculum> = {
  "lpu-online::online-mca": {
    note: "LPU publishes a four-semester MCA structure that builds from programming and systems fundamentals to cloud, AI and a major project.",
    sourceLabel: MANUAL,
    sourceUrl: "https://www.lpuonline.com/online-mca/",
    verifiedOn: V,
    semesters: [
      {
        label: "Semester 1",
        subjects: [
          "Programming Fundamentals",
          "Database Management Systems",
          "Computer Organization",
          "Operating Systems",
          "Software Engineering",
        ],
      },
      {
        label: "Semester 2",
        subjects: [
          "Data Structures",
          "Computer Networks",
          "Web Technologies",
          "Object-Oriented Programming",
          "Design and Analysis of Algorithms",
        ],
      },
      {
        label: "Semester 3",
        subjects: [
          "Cloud Computing",
          "Artificial Intelligence",
          "Data Analytics",
          "Mobile Application Development",
          "Machine Learning",
        ],
      },
      {
        label: "Semester 4",
        subjects: [
          "Major Project",
          "Cyber Security",
          "Emerging Technologies",
          "Software Testing",
          "Industry-Oriented Electives",
        ],
      },
    ],
  },

  "chandigarh-university-online::online-bca": {
    note: "Chandigarh University runs the online BCA across six semesters and 120 credits: core computing in year one, then specialisation-driven subjects in years two and three.",
    sourceLabel: MANUAL,
    sourceUrl: "https://www.cuonline.ac.in/online-bca/",
    verifiedOn: V,
    semesters: [
      {
        label: "Semester 1",
        subjects: [
          "Computer Programming",
          "Finance & Economics",
          "Discrete Mathematics",
          "Communication Skills",
          "Electrical and Electronic Circuits",
        ],
      },
      {
        label: "Semester 2",
        subjects: [
          "Object-Oriented Programming",
          "Data Structures and Algorithms",
          "Introduction to Management & Leadership",
          "Soft Skills",
          "Computer Systems Architecture",
        ],
      },
      {
        label: "Semester 3",
        subjects: [
          "Design and Analysis of Algorithms",
          "Software Engineering",
          "Database Management Systems",
          "Operating Systems",
          "Web Applications",
        ],
      },
      {
        label: "Semester 4",
        subjects: [
          "Python Programming",
          "Computer Graphics",
          "Machine Learning",
          "Computer Networks",
          "Probability & Statistics",
        ],
      },
      {
        label: "Semester 5",
        subjects: [
          "Data Visualisation",
          "Linear Algebra and Optimisation",
          "Data Warehousing and Data Mining",
          "Cloud Computing",
        ],
      },
      {
        label: "Semester 6",
        subjects: [
          "AI Governance, Ethics & Safety",
          "Cloud Native Development",
          "Capstone Project (with live industry project)",
        ],
      },
    ],
  },

  "chandigarh-university-online::online-bba": {
    note: "Chandigarh University's online BBA runs over six semesters, with specialisation electives entering from semester three onwards.",
    sourceLabel: MANUAL,
    sourceUrl: "https://www.cuonline.ac.in/online-bba/",
    verifiedOn: V,
    semesters: [
      {
        label: "Semester 1",
        subjects: [
          "Microeconomics",
          "Marketing Management",
          "Accounting for Managers",
          "Management Principles and Organisational Behaviour",
          "Communication Skills",
          "Universal Human Values, Ethics & Life Skills – I",
        ],
      },
      {
        label: "Semester 2",
        subjects: [
          "Macroeconomics",
          "Human Resource Management",
          "Business Mathematics and Statistics",
          "Professional Communication Skills",
          "Financial Management",
        ],
      },
      {
        label: "Semester 3",
        subjects: [
          "Logistics and Supply Chain Management",
          "Research Methodology",
          "Universal Human Values, Ethics & Life Skills – II",
          "Two electives as per specialisation",
        ],
      },
      {
        label: "Semester 4",
        subjects: [
          "Operations Research",
          "Commercial & Company Law",
          "Consumer Behaviour",
          "Two electives as per specialisation",
        ],
      },
      {
        label: "Semester 5",
        subjects: [
          "Strategic Management",
          "Business Environment",
          "Banking & Insurance",
          "Stress Management",
          "Two electives as per specialisation",
        ],
      },
      {
        label: "Semester 6",
        subjects: [
          "Industrial Relations and Labour Law",
          "Dissertation / Capstone Project",
          "Two electives as per specialisation",
        ],
      },
    ],
  },

  "chandigarh-university-online::online-mca": {
    note: "Chandigarh University's online MCA is a two-year, 80-credit programme: core IT subjects in year one, then specialisation electives (cloud computing, full stack, data analytics, agentic AI, AI & ML) in year two.",
    sourceLabel: MANUAL,
    sourceUrl: "https://www.cuonline.ac.in/online-mca/",
    verifiedOn: V,
    semesters: [
      {
        label: "Semester 1",
        subjects: [
          "Advanced Database Management System",
          "Advanced Computer Networks",
          "Web Programming",
          "Python Programming",
          "Network Security and Cryptography",
        ],
      },
      {
        label: "Semester 2",
        subjects: [
          "Advanced Internet Programming",
          "Design and Analysis of Algorithms",
          "Software Testing",
          "Web Application Development",
          "Cyber Security",
        ],
      },
      {
        label: "Semester 3",
        subjects: ["Specialisation elective subjects (chosen specialisation track)"],
      },
      {
        label: "Semester 4",
        subjects: ["Specialisation elective subjects", "Major Project"],
      },
    ],
  },

  "shoolini-online::online-mba": {
    note: "Shoolini's online MBA Power Programme runs across four semesters with open electives every semester, major and minor specialisation courses in year two, an eight-week internship and two research projects.",
    sourceLabel: MANUAL,
    sourceUrl: "https://onlineshoolini.com/online-mba/",
    verifiedOn: V,
    semesters: [
      {
        label: "Semester 1",
        subjects: [
          "Financial Accounting",
          "Entrepreneurship",
          "Organisational Behaviour",
          "Marketing Management",
          "Creativity Decoded",
          "One open elective",
        ],
      },
      {
        label: "Semester 2",
        subjects: [
          "Financial Management",
          "Marketing Research",
          "Managerial Economics",
          "Human Resource Management",
          "Research Project – I",
          "One open elective",
        ],
      },
      {
        label: "Semester 3",
        subjects: [
          "Legal Aspects of Business",
          "Statistics for Management",
          "Two major specialisation courses",
          "One minor specialisation course",
          "Internship (8 weeks)",
          "One open elective",
        ],
      },
      {
        label: "Semester 4",
        subjects: [
          "Strategic Management",
          "Sales Management",
          "Two major specialisation courses",
          "One minor specialisation course",
          "Research Project – II",
          "One open elective",
        ],
      },
    ],
  },

  "du-sol::online-bcom": {
    note: "DU SOL follows the NEP 2020 semester structure for B.Com across three years, closing with project work and elective courses.",
    sourceLabel: MANUAL,
    sourceUrl: "https://sol.du.ac.in/",
    verifiedOn: V,
    semesters: [
      {
        label: "Semester 1",
        subjects: [
          "Financial Accounting",
          "Business Law",
          "Business Mathematics",
          "Business Communication",
        ],
      },
      {
        label: "Semester 2",
        subjects: [
          "Corporate Accounting",
          "Microeconomics",
          "Business Statistics",
          "Environmental Studies",
        ],
      },
      {
        label: "Semester 3",
        subjects: [
          "Cost Accounting",
          "Macroeconomics",
          "Income Tax Law and Practice",
          "Business Ethics",
        ],
      },
      {
        label: "Semester 4",
        subjects: ["Auditing", "Management Principles", "E-commerce", "Entrepreneurship"],
      },
      {
        label: "Semester 5",
        subjects: ["Banking and Insurance", "Marketing Management", "Human Resource Management"],
      },
      { label: "Semester 6", subjects: ["Project Work", "Elective courses"] },
    ],
  },

  "ignou::online-bcom": {
    note: "IGNOU's B.Com is structured semester-wise in the programme guide, mixing commerce core courses with language and computer-application courses.",
    sourceLabel: MANUAL,
    sourceUrl: "https://www.ignou.ac.in/",
    verifiedOn: V,
    semesters: [
      {
        label: "Semester 1",
        subjects: [
          "Environmental Studies",
          "Financial Accounting",
          "Business Organisation and Management",
          "English in Daily Life",
        ],
      },
      {
        label: "Semester 2",
        subjects: [
          "English Communication Skills",
          "Business Law",
          "Business Mathematics and Statistics",
        ],
      },
      {
        label: "Semester 3",
        subjects: [
          "Company Law",
          "Income Tax Law and Practice",
          "Language through Literature",
          "Computer Application in Business",
        ],
      },
      {
        label: "Semester 4",
        subjects: [
          "Business Communication",
          "Corporate Accounting",
          "Cost Accounting",
          "E-Commerce",
        ],
      },
      {
        label: "Semester 5",
        subjects: [
          "Principles of Marketing",
          "Fundamentals of Financial Management",
          "Entrepreneurship",
          "Principles of Micro Economics",
        ],
      },
      {
        label: "Semester 6",
        subjects: [
          "Management Accounting",
          "Office Management and Secretarial Practice",
          "Personal Selling and Salesmanship",
          "Indian Economy",
        ],
      },
    ],
  },

  "ignou::online-mba": {
    note: "IGNOU's MBA is delivered semester-wise, with a project course in semester three and advanced strategy, ethics and quality courses in semester four.",
    sourceLabel: MANUAL,
    sourceUrl: "https://www.ignou.ac.in/",
    verifiedOn: V,
    semesters: [
      {
        label: "Semester 1",
        subjects: [
          "Human Resource Management",
          "Business Environment",
          "Quantitative Analysis for Managerial Applications",
          "Marketing Management",
          "Business Communication",
        ],
      },
      {
        label: "Semester 2",
        subjects: [
          "Information Systems for Managers",
          "Management of Machines and Materials",
          "Managerial Economics",
          "Social Processes and Behavioural Issues",
          "Strategic Management",
          "Business Laws",
          "Financial Management",
        ],
      },
      {
        label: "Semester 3",
        subjects: [
          "Research Methodology for Management Decisions",
          "International Business",
          "Project Course (equivalent to two courses)",
        ],
      },
      {
        label: "Semester 4",
        subjects: [
          "Advanced Strategic Management",
          "Entrepreneurship",
          "Total Quality Management",
          "Business Ethics and CSR",
        ],
      },
    ],
  },

  "ignou::online-mca": {
    note: "IGNOU's MCA carries 20 credits per semester, pairing theory courses with mandatory labs as published in the official programme guide.",
    sourceLabel: MANUAL,
    sourceUrl: "https://www.ignou.ac.in/",
    verifiedOn: V,
    semesters: [
      {
        label: "Semester 1",
        subjects: [
          "Design and Analysis of Algorithms",
          "Discrete Mathematics",
          "Software Engineering",
          "Professional Skills and Ethics",
          "Security and Cyber Laws",
          "DAA and Web Design Lab",
          "Software Engineering Lab",
        ],
      },
      {
        label: "Semester 2",
        subjects: [
          "Data Communication and Computer Networks",
          "Object-Oriented Analysis and Design",
          "Web Technologies",
          "Data Warehousing and Data Mining",
          "OOAD and Web Technologies Lab",
          "Computer Networks and Data Mining Lab",
        ],
      },
    ],
  },
};

export function getUniversityCurriculum(
  universitySlug: string,
  courseKey: string | undefined,
): UniversityCurriculum | undefined {
  if (!courseKey) return undefined;
  const key = `${universitySlug}::${courseKey}`;
  return universityCurricula[key] ?? pdfCurricula[key] ?? blogCurricula[key];
}
