/**
 * Additional university-specific semester curricula sourced from blog
 * research notes kept in `src/data/sources/`. These supplement (and never
 * duplicate) the hand-verified entries in `university-curriculum.ts`.
 *
 * Keys: `${universitySlug}::${courseFamilyKey}`.
 */
import type { UniversityCurriculum } from "./university-curriculum";

const V = "2026-08-16";
const MANUAL = "Manually researched — source: official university website";

export const blogCurricula: Record<string, UniversityCurriculum> = {
  "lpu-online::online-mba": {
    note: "LPU's online MBA blog breaks the four semesters into core management courses first, moving into strategic and specialization electives before a final capstone project.",
    sourceLabel: MANUAL,
    verifiedOn: V,
    semesters: [
      {
        label: "Semester 1",
        subjects: [
          "Organizational Behaviour",
          "Managerial Economics",
          "Accounting for Managers",
          "Marketing Management",
          "Business Communication",
        ],
      },
      {
        label: "Semester 2",
        subjects: [
          "Human Resource Management",
          "Financial Management",
          "Operations Management",
          "Research Methodology",
          "Business Environment",
        ],
      },
      {
        label: "Semester 3",
        subjects: [
          "Strategic Management",
          "Business Analytics",
          "Specialization Subjects",
          "Elective Courses",
        ],
      },
      {
        label: "Semester 4",
        subjects: [
          "International Business",
          "Entrepreneurship Development",
          "Capstone Project",
          "Specialization Subjects",
        ],
      },
    ],
  },

  "du-sol::online-bca": {
    note: "DU SOL's online BCA curriculum note groups each semester around a learning theme, moving from IT fundamentals through web and database skills to a final project semester.",
    sourceLabel: MANUAL,
    sourceUrl: "https://sol.du.ac.in",
    verifiedOn: V,
    semesters: [
      {
        label: "Semester 1",
        subjects: [
          "Fundamentals of Information Technology",
          "Programming in C",
          "Mathematics I",
          "Digital Logic",
          "Communication Skills",
        ],
      },
      {
        label: "Semester 2",
        subjects: [
          "Data Structures",
          "Operating Systems",
          "Web Technologies",
          "Object-Oriented Programming (C++)",
          "Environmental Studies (AECC)",
        ],
      },
      {
        label: "Semester 3",
        subjects: [
          "Database Management Systems (DBMS)",
          "Software Engineering",
          "Data Communication and Computer Networks",
          "Java Programming",
          "Personality Development",
        ],
      },
      {
        label: "Semester 4",
        subjects: [
          "Mobile App Development",
          "Python Programming",
          "Internet of Things (IoT) (Elective)",
          "E-Commerce Technologies",
          "Quantitative Techniques",
        ],
      },
      {
        label: "Semester 5",
        subjects: [
          "Data Analytics",
          "Cloud Computing",
          "Cyber Security & Ethical Hacking",
          "Elective I (e.g., Blockchain Basics)",
          "Research Methodology",
        ],
      },
      {
        label: "Semester 6",
        subjects: [
          "Final Year Project / Internship",
          "Artificial Intelligence Basics (Elective)",
          "Entrepreneurship Development",
          "Elective II (e.g., Digital Marketing)",
          "Seminar & Viva",
        ],
      },
    ],
  },

  "shoolini-online::online-mca": {
    note: "Shoolini's online MCA programme structure note lists foundational computing courses in the first year and lets students pick a named specialisation track from the third semester onward.",
    sourceLabel: MANUAL,
    verifiedOn: V,
    semesters: [
      {
        label: "Semester 1",
        subjects: [
          "Functional English-1",
          "Problem-Solving with C",
          "Computational Mathematics",
          "Applied Database Management System",
          "Digital Marketing",
          "Principles of Management",
        ],
      },
      {
        label: "Semester 2",
        subjects: [
          "Web Technology",
          "Functional English-2",
          "Data Structure and Algorithm (C)",
          "Python Application Programming",
          "Saying it with Presentations",
          "Entrepreneurship",
        ],
      },
      {
        label: "Semester 3",
        subjects: [
          "Java Programming",
          "Object-Oriented Programming with C++",
          "Operating System Concepts",
          "Specialisation (AI/DS/FS)",
          "Specialisation (AI/DS/FS)",
        ],
      },
      {
        label: "Semester 4",
        subjects: [
          "Project Work",
          "Computer Networking",
          "Specialisation (AI/DS/FS)",
          "Specialisation (AI/DS/FS)",
          "Specialisation: Full Stack",
          "UX UI",
          "DevOps",
          "Software Architecture",
          "Prototyping",
        ],
      },
    ],
  },

  "shoolini-online::online-bba": {
    note: "Shoolini's online BBA syllabus note organises the six semesters year by year, pairing core business courses with journalism and finance electives that build up to third-year specialised electives.",
    sourceLabel: MANUAL,
    verifiedOn: V,
    semesters: [
      {
        label: "Semester 1",
        subjects: [
          "Functional English I",
          "Principles of Management",
          "Entrepreneurship",
          "Creativity Decoded",
          "Fundamentals of Journalism",
          "Digital and Technological Solutions",
        ],
      },
      {
        label: "Semester 2",
        subjects: [
          "Marketing Management",
          "Functional English II",
          "Human Resource Management",
          "Consumer Behaviour",
          "Saying it with Presentations",
          "Journalism in India – Historical Perspective",
        ],
      },
      {
        label: "Semester 3",
        subjects: [
          "Acing the Interviews through AI",
          "Financial Accounting",
          "Marketing Research",
          "Principles of Economics",
          "Critical Thinking and Problem Solving",
          "New Media",
        ],
      },
      {
        label: "Semester 4",
        subjects: [
          "Business Statistics",
          "Business Law",
          "Financial Management",
          "Organisational Behaviour",
          "Advertising",
          "Effective Negotiations",
        ],
      },
      {
        label: "Semester 5",
        subjects: [
          "Taxation",
          "Sales Management",
          "Cost Accounting",
          "Subject Area Electives",
          "Basics of Micro Finance",
          "Research Methodology",
        ],
      },
      {
        label: "Semester 6",
        subjects: [
          "Banking and Investment",
          "Subject Areas Elective I",
          "Subject Areas Elective II",
          "Subject Areas Elective III",
          "Advanced Micro Finance",
          "Stock Market and Investment",
        ],
      },
    ],
  },
};
