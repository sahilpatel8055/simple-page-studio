/**
 * Course-wise fee tables, transcribed verbatim from the fee sheet supplied by
 * the editorial team. Figures are shown exactly as published by each
 * university — nothing is computed or estimated here.
 */

export interface FeeTableRow {
  course: string;
  /** Specialisations covered by that fee line, when the university lists them. */
  specialisation?: string;
  fee: string;
  duration?: string;
}

export interface UniversityFeeTable {
  /** Note rendered under the table, e.g. what the fee covers. */
  note?: string;
  rows: FeeTableRow[];
}

export const universityFeeTables: Record<string, UniversityFeeTable> = {
  "amity-online": {
    note: "Fees are per semester as published by Amity University Online.",
    rows: [
      {
        course: "MBA",
        specialisation:
          "Digital Entrepreneurship, Business Analytics, Data Science, HR Analytics, Digital Marketing Management",
        fee: "₹49,750 / semester",
        duration: "2 Years",
      },
      { course: "MBA", specialisation: "International Finance", fee: "₹74,750 / semester", duration: "2 Years" },
      {
        course: "MCA",
        specialisation: "Blockchain, Machine Learning & Artificial Intelligence, AR & VR",
        fee: "₹42,500 / semester",
        duration: "2 Years",
      },
      {
        course: "MCA",
        specialisation: "Cyber Security, Software Engineering",
        fee: "₹62,500 / semester",
        duration: "2 Years",
      },
      { course: "MA", specialisation: "Journalism & Mass Communication", fee: "₹42,500 / semester", duration: "2 Years" },
      { course: "MA", specialisation: "Public Policy & Governance", fee: "₹32,500 / semester", duration: "2 Years" },
      { course: "MA", specialisation: "Psychology", fee: "₹62,500 / semester", duration: "2 Years" },
      { course: "M.Sc", specialisation: "Data Science", fee: "₹62,500 / semester", duration: "2 Years" },
      { course: "M.Com", specialisation: "General", fee: "₹30,000 / semester", duration: "2 Years" },
      { course: "BBA", specialisation: "General", fee: "₹27,500 / semester", duration: "3 Years" },
      { course: "BBA", specialisation: "Data Analytics", fee: "₹37,500 / semester", duration: "3 Years" },
      {
        course: "BCA",
        specialisation: "Data Analytics, Cloud & Security",
        fee: "₹25,000 / semester",
        duration: "3 Years",
      },
      {
        course: "BCA",
        specialisation: "Data Engineering, Software Engineering",
        fee: "₹37,500 / semester",
        duration: "3 Years",
      },
      {
        course: "B.Com",
        specialisation: "International Finance & Accounting",
        fee: "₹16,500 / semester",
        duration: "3 Years",
      },
      { course: "B.Com (Hons.)", specialisation: "General", fee: "₹27,500 / semester", duration: "3 Years" },
      {
        course: "BA",
        specialisation: "Sociology, Political Science, English, Economics",
        fee: "₹16,500 / semester",
        duration: "3 Years",
      },
      { course: "BA", specialisation: "Journalism & Mass Communication", fee: "₹29,000 / semester", duration: "3 Years" },
    ],
  },

  "chandigarh-university-online": {
    note: "Fees are per semester as published by Chandigarh University Online.",
    rows: [
      { course: "MBA", fee: "₹39,500 / semester", duration: "2 Years" },
      { course: "M.Sc", specialisation: "Data Science", fee: "₹27,500 / semester", duration: "2 Years" },
      { course: "M.Sc", specialisation: "Mathematics", fee: "₹18,750 / semester", duration: "2 Years" },
      { course: "MA", fee: "₹18,750 / semester", duration: "2 Years" },
      { course: "MCA", fee: "₹26,250 / semester", duration: "2 Years" },
      { course: "BCA", fee: "₹21,333 / semester", duration: "3 Years" },
      { course: "BBA", fee: "₹21,000 / semester", duration: "3 Years" },
      { course: "BBA", specialisation: "Business Analytics", fee: "₹27,550 / semester", duration: "3 Years" },
      { course: "BA", fee: "₹20,834 / semester", duration: "3 Years" },
    ],
  },

  "manipal-university-jaipur": {
    note: "Fees are per semester as published by Manipal University Jaipur (Online Manipal).",
    rows: [
      { course: "MBA", fee: "₹43,750 / semester", duration: "2 Years" },
      { course: "M.Com", fee: "₹27,000 / semester", duration: "2 Years" },
      { course: "MA", fee: "₹20,000 / semester", duration: "2 Years" },
      { course: "MCA", fee: "₹39,500 / semester", duration: "2 Years" },
      { course: "BCA", fee: "₹22,500 / semester", duration: "3 Years" },
      { course: "BBA", fee: "₹22,500 / semester", duration: "3 Years" },
      { course: "B.Com", fee: "₹16,500 / semester", duration: "3 Years" },
    ],
  },

  vgu: {
    note: "Fees are per semester as published by Vivekananda Global University.",
    rows: [
      { course: "BBA", fee: "₹22,000 / semester", duration: "3 Years" },
      { course: "BCA", fee: "₹22,000 / semester", duration: "3 Years" },
      { course: "BA", fee: "₹12,000 / semester", duration: "3 Years" },
      { course: "MBA", fee: "₹37,500 / semester", duration: "2 Years" },
      { course: "MCA", fee: "₹37,500 / semester", duration: "2 Years" },
      { course: "M.Sc", fee: "₹18,000 / semester", duration: "2 Years" },
      { course: "MA", fee: "₹18,000 / semester", duration: "2 Years" },
    ],
  },

  "lpu-online": {
    note: "Fees are per semester as published by LPU Online.",
    rows: [
      { course: "MBA", fee: "₹40,400 / semester", duration: "2 Years" },
      { course: "MCA", fee: "₹30,000 / semester", duration: "2 Years" },
      { course: "M.Com", fee: "₹20,400 / semester", duration: "2 Years" },
      { course: "MA", fee: "₹16,400 / semester", duration: "2 Years" },
      { course: "M.Sc", fee: "₹16,400 / semester", duration: "2 Years" },
      { course: "BBA", fee: "₹20,400 / semester", duration: "3 Years" },
      { course: "BCA", fee: "₹20,400 / semester", duration: "3 Years" },
      { course: "BA", fee: "₹16,400 / semester", duration: "3 Years" },
    ],
  },

  ignou: {
    note: "Programme fees as published by IGNOU.",
    rows: [
      { course: "MA Sustainability Science (MASS)", fee: "₹7,000 / year", duration: "2 Years" },
      { course: "M.Com", fee: "₹9,000 / year", duration: "2 Years" },
      { course: "MA", fee: "₹6,000 / year", duration: "2 Years" },
      { course: "MA Rural Development (MA-RD)", fee: "₹5,900 / year", duration: "2 Years" },
      { course: "MA Journalism & Mass Communication", fee: "₹12,500 / year", duration: "2 Years" },
      { course: "MBA", fee: "₹14,000 / year", duration: "2 Years" },
      { course: "MCA", fee: "₹12,700 / year", duration: "2 Years" },
      { course: "MA Translation Studies (MA-TS)", fee: "₹4,800 / year", duration: "2 Years" },
      { course: "MA (Hindi)", fee: "₹6,000 / year", duration: "2 Years" },
      { course: "MA Gandhi & Peace Studies (MA-GPS)", fee: "₹4,500 / year", duration: "2 Years" },
      { course: "Bachelor of Tourism & Travel Management", fee: "₹4,000 / year", duration: "3 Years" },
      { course: "BCA", fee: "₹6,000 / semester", duration: "3 Years" },
      { course: "Bachelor of Social Work", fee: "₹5,900 / year", duration: "3 Years" },
      { course: "B.Com", fee: "₹4,000 / year", duration: "3 Years" },
      { course: "BLIS", fee: "₹7,900 / year", duration: "1 Year" },
      { course: "Bachelor of Tourism", fee: "₹3,400 / year", duration: "3 Years" },
    ],
  },

  "du-sol": {
    note: "Annual programme fees as published by DU SOL.",
    rows: [
      { course: "BMS", specialisation: "General", fee: "₹18,970 / year", duration: "3 Years" },
      { course: "BBA", specialisation: "General", fee: "₹18,970 / year", duration: "3 Years" },
      { course: "BA", specialisation: "General", fee: "₹8,320 / year", duration: "3 Years" },
      { course: "BA", specialisation: "Psychology, Computer Applications", fee: "₹11,320 / year", duration: "3 Years" },
      { course: "BA", specialisation: "English, Political Science", fee: "₹8,320 / year", duration: "3 Years" },
      { course: "BA", specialisation: "Economics", fee: "₹8,820 / year", duration: "3 Years" },
      { course: "B.Com", specialisation: "General", fee: "₹8,320 / year", duration: "3 Years" },
      { course: "MBA", specialisation: "General", fee: "₹52,570 / year", duration: "2 Years" },
      { course: "BLISc", specialisation: "General", fee: "₹9,670 / year", duration: "1 Year" },
      { course: "MLISc", specialisation: "General", fee: "₹10,970 / year", duration: "1 Year" },
      {
        course: "MA",
        specialisation: "Hindi, Sanskrit, History, Political Science",
        fee: "₹9,370 / year",
        duration: "2 Years",
      },
      { course: "M.Com", specialisation: "General", fee: "₹9,370 / year", duration: "2 Years" },
    ],
  },

  "jain-online": {
    note: "Fees are per semester as published by Jain University Online.",
    rows: [
      {
        course: "MBA",
        specialisation: "General, Marketing, Finance, HRM, Systems & Operations Management",
        fee: "₹49,500 / semester",
        duration: "2 Years",
      },
      {
        course: "MBA",
        specialisation:
          "Dual (HRM & Finance, Finance & Marketing, Marketing & HRM, Logistics & Supply Chain), Project Management, IT Management, Healthcare Management, Business Intelligence & Analytics, Entrepreneurship & Leadership",
        fee: "₹49,500 / semester",
        duration: "2 Years",
      },
      { course: "MBA", specialisation: "International Finance", fee: "₹70,000 / semester", duration: "2 Years" },
      {
        course: "MBA",
        specialisation: "Data Science & Analytics, Digital Marketing & E-commerce",
        fee: "₹60,000 / semester",
        duration: "2 Years",
      },
      { course: "MBA", specialisation: "Banking & Finance", fee: "₹55,000 / semester", duration: "2 Years" },
      { course: "MCA", specialisation: "Computer Science & IT", fee: "₹37,500 / semester", duration: "2 Years" },
      { course: "MCA", specialisation: "Cyber Security, Data Analytics", fee: "₹40,000 / semester", duration: "2 Years" },
      { course: "M.Com", specialisation: "Accounting & Finance", fee: "₹32,500 / semester", duration: "2 Years" },
      { course: "M.Com", specialisation: "Professional Accounting & Finance", fee: "₹45,500 / semester", duration: "2 Years" },
      { course: "M.Com", specialisation: "International Finance", fee: "₹65,000 / semester", duration: "2 Years" },
      { course: "MA", specialisation: "General", fee: "₹22,500 / semester", duration: "2 Years" },
      {
        course: "BCA",
        specialisation:
          "Computer Science & IT, Data Science & Analytics, Cyber Security, Artificial Intelligence, Cloud Computing",
        fee: "₹22,500 – ₹27,500 / semester",
        duration: "3 Years",
      },
      { course: "B.Com", specialisation: "Corporate Accounting", fee: "₹21,250 / semester", duration: "3 Years" },
      {
        course: "B.Com",
        specialisation: "International Finance & Accounting",
        fee: "₹65,000 / semester",
        duration: "3 Years",
      },
      {
        course: "BBA",
        specialisation: "Digital Marketing, Data Science & Analytics",
        fee: "₹32,500 / semester",
        duration: "3 Years",
      },
      {
        course: "BBA",
        specialisation: "Human Resource, Finance, Marketing",
        fee: "₹32,500 / semester",
        duration: "3 Years",
      },
    ],
  },

  nsou: {
    note:
      "Programme fees exactly as published in the Netaji Subhas Open University fee structure (wbnsou.ac.in). Year-wise amounts are the university's own instalments; the programme fee is the university's stated total.",
    rows: [
      { course: "BA (Hons.)", specialisation: "Bengali, English, History, Political Science, Public Administration, Sociology, Economics, Education", fee: "₹3,300 / year · ₹9,900 total", duration: "3 Years" },
      { course: "B.Com (Hons.)", fee: "₹3,300 / year · ₹9,900 total", duration: "3 Years" },
      { course: "B.Sc (Hons.)", specialisation: "Mathematics", fee: "₹4,600 / year · ₹13,800 total", duration: "3 Years" },
      { course: "B.Sc (Hons.)", specialisation: "Physics, Chemistry, Zoology", fee: "₹5,200 / year · ₹15,600 total", duration: "3 Years" },
      { course: "B.Sc (Hons.)", specialisation: "Botany, Geography", fee: "₹5,000 / year · ₹15,000 total", duration: "3 Years" },
      { course: "B.Lib.I.Sc", fee: "₹5,000 total", duration: "1 Year" },
      { course: "B.Ed Special Education (ODL)", specialisation: "ID / HI / VI", fee: "₹20,000 / year · ₹40,000 total", duration: "2 Years" },
      { course: "MA", specialisation: "Bengali, English, English Language Teaching, History, Political Science, Public Administration, Education, Economics", fee: "₹3,800 / year · ₹7,600 total", duration: "2 Years" },
      { course: "MA", specialisation: "Journalism and Mass Communication", fee: "₹13,000 / year · ₹26,000 total", duration: "2 Years" },
      { course: "M.Sc", specialisation: "Mathematics", fee: "₹5,200 / year · ₹10,400 total", duration: "2 Years" },
      { course: "M.Sc", specialisation: "Zoology, Geography, Environmental Science", fee: "₹18,000 / year · ₹36,000 total", duration: "2 Years" },
      { course: "M.Com", fee: "₹3,800 / year · ₹7,600 total", duration: "2 Years" },
      { course: "MSW", fee: "₹5,200 / year · ₹10,400 total", duration: "2 Years" },
      { course: "M.Lib.I.Sc", fee: "₹10,000 total", duration: "1 Year" },
      { course: "M.Ed Special Education (ODL)", specialisation: "ID / HI", fee: "₹17,000 / semester · ₹85,000 total", duration: "5 Semesters" },
      { course: "MBA", fee: "₹25,000 / semester · ₹1,00,000 total", duration: "2 Years" },
    ],
  },

  "parul-online": {
    note: "Parul University Online 2026-27 fee structure. Semester, annual, one-time and 12-month EMI payment options are published on the official online portal.",
    rows: [
      { course: "BBA", fee: "₹18,500 / semester · ₹1,11,000 total", duration: "3 Years" },
      { course: "BCA", fee: "₹18,500 / semester · ₹1,11,000 total", duration: "3 Years" },
      { course: "BA", specialisation: "Psychology, English, Journalism & Mass Communication", fee: "₹18,500 / semester · ₹1,11,000 total", duration: "3 Years" },
      { course: "MBA", specialisation: "20+ specialisations (Finance, Marketing, HR, Operations)", fee: "₹37,500 / semester · ₹1,50,000 total", duration: "2 Years" },
      { course: "MCA", fee: "₹30,000 / semester · ₹1,20,000 total", duration: "2 Years" },
      { course: "M.Com", specialisation: "Finance, taxation & corporate accounting", fee: "₹15,000 / semester · ₹60,000 total", duration: "2 Years" },
      { course: "M.Sc", specialisation: "Applied Mathematics", fee: "₹15,000 / semester · ₹60,000 total", duration: "2 Years" },
      { course: "MSW", fee: "₹15,000 / semester · ₹60,000 total", duration: "2 Years" },
      { course: "MA", specialisation: "English Language Teaching, Journalism & Mass Communication", fee: "₹15,000 / semester · ₹60,000 total", duration: "2 Years" },
    ],
  },

  "smu-online": {
    note: "Semester fee and total course fee as published on the official Online Manipal pages for Sikkim Manipal University. A non-refundable application fee of ₹500 applies at admission.",
    rows: [
      { course: "BA", specialisation: "English, Sociology, Political Science", fee: "₹12,500 / semester · ₹75,000 total", duration: "3 Years" },
      { course: "B.Com", fee: "₹12,500 / semester · ₹75,000 total", duration: "3 Years" },
      { course: "BBA", fee: "₹15,000 / semester · ₹90,000 total", duration: "3 Years" },
      { course: "MA", specialisation: "English, Sociology, Political Science", fee: "₹18,750 / semester · ₹75,000 total", duration: "2 Years" },
      { course: "M.Com", fee: "₹18,750 / semester · ₹75,000 total", duration: "2 Years" },
      { course: "MCA", fee: "₹27,500 / semester · ₹1,10,000 total", duration: "2 Years" },
      { course: "MBA", fee: "₹30,000 / semester · ₹1,20,000 total", duration: "2 Years" },
    ],
  },

  "ksou-mysuru": {
    note:
      "Karnataka State Open University Revised Fee Notification 2025-26 (July / January cycle, dated 07.01.2026). Amounts are the university's own year-wise total fee for general-category students and include admission processing, registration, study-material, library and alumni components. BPL (women), defence and ex-servicemen, auto/cab drivers and their families, and KSRTC/BMTC/NWKRTC/KKRTC staff pay 10% less on the tuition component.",
    rows: [
      { course: "BA", fee: "₹9,240 (1st yr) · ₹8,690 (2nd & 3rd yr) · ₹26,620 total", duration: "3 Years" },
      { course: "B.Com", fee: "₹9,790 (1st yr) · ₹9,240 (2nd & 3rd yr) · ₹28,270 total", duration: "3 Years" },
      { course: "BBA", fee: "₹13,640 (1st yr) · ₹13,090 (2nd & 3rd yr) · ₹39,820 total", duration: "3 Years" },
      { course: "BCA", fee: "₹26,290 (1st yr) · ₹25,740 (2nd & 3rd yr) · ₹77,770 total", duration: "3 Years" },
      {
        course: "B.Sc",
        specialisation: "General / Information Technology",
        fee: "₹26,290 (1st yr) · ₹25,740 (2nd & 3rd yr) · ₹77,770 total",
        duration: "3 Years",
      },
      { course: "BSW", fee: "₹14,190 (1st yr) · ₹13,860 (2nd & 3rd yr) · ₹41,910 total", duration: "3 Years" },
      { course: "B.Lib.I.Sc", fee: "₹13,640 total", duration: "1 Year" },
      { course: "B.Ed", fee: "₹39,270 (1st yr) · ₹38,500 (2nd yr) · ₹77,770 total", duration: "2 Years" },
      { course: "MA", fee: "₹11,660 (1st yr) · ₹11,110 (2nd yr) · ₹22,770 total", duration: "2 Years" },
      {
        course: "MA",
        specialisation: "Journalism & Mass Communication (MCJ)",
        fee: "₹17,820 (1st yr) · ₹17,160 (2nd yr) · ₹34,980 total",
        duration: "2 Years",
      },
      { course: "M.Com", fee: "₹13,640 (1st yr) · ₹13,090 (2nd yr) · ₹26,730 total", duration: "2 Years" },
      { course: "MBA", fee: "₹32,890 (1st yr) · ₹32,120 (2nd yr) · ₹65,010 total", duration: "2 Years" },
      { course: "MCA", fee: "₹32,670 (1st yr) · ₹32,120 (2nd yr) · ₹64,790 total", duration: "2 Years" },
      { course: "M.Sc", fee: "₹32,670 (1st yr) · ₹32,120 (2nd yr) · ₹64,790 total", duration: "2 Years" },
      { course: "MSW", fee: "₹23,430 (1st yr) · ₹23,100 (2nd yr) · ₹46,530 total", duration: "2 Years" },
      { course: "M.Lib.I.Sc", fee: "₹19,965 total", duration: "1 Year" },
      { course: "Diploma", specialisation: "Kannada", fee: "₹7,040 total", duration: "1 Year" },
      { course: "Diploma", specialisation: "Journalism", fee: "₹8,690 total", duration: "1 Year" },
      { course: "Diploma", specialisation: "Information Technology", fee: "₹8,800 total", duration: "1 Year" },
      { course: "Diploma", specialisation: "Computer Application", fee: "₹9,240 total", duration: "1 Year" },
      {
        course: "Diploma",
        specialisation: "Early Childhood Care & Education",
        fee: "₹19,360 total",
        duration: "1 Year",
      },
      { course: "Diploma", specialisation: "Translation Studies", fee: "₹7,810 total", duration: "1 Year" },
      {
        course: "PG Certificate",
        specialisation: "English, Communicative English, Business Administration, Kuvempu Sahitya, Ambedkar Studies, Linguistics",
        fee: "₹7,040 total",
        duration: "6 Months",
      },
      {
        course: "PG Certificate",
        specialisation: "Human Resource Management, Financial Management, Information Technology",
        fee: "₹11,990 total",
        duration: "6 Months",
      },
      {
        course: "PG Certificate",
        specialisation: "Journalism & Mass Communication",
        fee: "₹11,660 total",
        duration: "6 Months",
      },
      { course: "PG Certificate", specialisation: "Business Law", fee: "₹10,890 total", duration: "6 Months" },
      { course: "PG Certificate", specialisation: "Computer Application", fee: "₹12,430 total", duration: "6 Months" },
      { course: "PG Certificate", specialisation: "Marketing Management", fee: "₹7,810 total", duration: "6 Months" },
    ],
  },

  baou: {
    note: "Course-wise fees as published by the university. Amounts are the annual programme fee unless the university states otherwise.",
    rows: [
      { course: "BA", fee: "₹3,200", duration: "3 Years" },
      { course: "B.Com", fee: "₹3,200", duration: "3 Years" },
      { course: "B.Sc", fee: "₹3,200", duration: "3 Years" },
      { course: "BLISc", fee: "₹5,300", duration: "1 Year" },
      { course: "B.Ed", fee: "₹40,000", duration: "2 Years" },
      { course: "MA", specialisation: "History, Economics, Political Science, Public Administration, Sociology, English, Telugu, Hindi, Urdu", fee: "₹5,300", duration: "2 Years" },
      { course: "MA", specialisation: "Journalism & Mass Communication", fee: "₹7,800", duration: "2 Years" },
      { course: "M.Com", fee: "₹7,800", duration: "2 Years" },
      { course: "M.Sc", specialisation: "Psychology, Botany, Physics, Zoology, Environmental Science", fee: "₹15,300", duration: "2 Years" },
      { course: "M.Sc", specialisation: "Mathematics", fee: "₹7,800", duration: "2 Years" },
      { course: "M.Sc", specialisation: "Chemistry", fee: "₹18,300", duration: "2 Years" },
      { course: "MLISc", fee: "₹10,300", duration: "1 Year" },
      { course: "MBA", fee: "₹15,300", duration: "2 Years" },
      { course: "MBA", specialisation: "Hospital & Healthcare Management", fee: "₹1,20,000", duration: "2 Years" },
    ],
  },

  "sharda-online": {
    note: "Fees as published by Sharda University Online for Indian/SAARC students (2025-26). International fees and one-time registration/examination charges are listed separately by the university.",
    rows: [
      { course: "BBA", specialisation: "General", fee: "₹17,500 / semester · ₹1,05,000 total", duration: "3 Years" },
      { course: "BCA", specialisation: "General", fee: "₹17,500 / semester · ₹1,05,000 total", duration: "3 Years" },
      {
        course: "MBA",
        specialisation: "Marketing, Finance, Human Resource Management, Strategic HRM, Healthcare & Hospital Administration",
        fee: "₹35,000 / semester · ₹1,40,000 total",
        duration: "2 Years",
      },
      { course: "MBA", specialisation: "Data Science & Analytics", fee: "₹49,000 / semester · ₹1,96,000 total", duration: "2 Years" },
      { course: "MCA", specialisation: "General", fee: "₹30,000 / semester · ₹1,20,000 total", duration: "2 Years" },
    ],
  },

  "kurukshetra-university": {
    note: "Fees published by Kurukshetra University's Centre for Distance and Online Education. Semester amounts are indicative; the live fee portal is the final authority.",
    rows: [
      { course: "BA", fee: "₹12,000 / semester · ≈ ₹72,000 total", duration: "3 Years" },
      { course: "B.Com", fee: "₹12,000 / semester · ≈ ₹72,000 total", duration: "3 Years" },
      { course: "BBA", fee: "₹12,661 (Sem 1, incl. ₹1,000 registration), ₹12,000 / semester thereafter · ₹72,661 lump sum", duration: "3 Years" },
      { course: "MA", specialisation: "English, Political Science, Mass Communication", fee: "₹15,000 / semester · ≈ ₹60,000 total", duration: "2 Years" },
      { course: "M.Com", fee: "₹15,000 / semester · ≈ ₹60,000 total", duration: "2 Years" },
      { course: "MBA", fee: "₹25,500 / semester · ≈ ₹1,02,000 total", duration: "2 Years" },
      { course: "MCA", fee: "₹19,947 (Sem 1), ₹18,900 / semester thereafter · ₹76,647 lump sum", duration: "2 Years" },
    ],
  },

  ycmou: {
    note: "Fees as published by Yashwantrao Chavan Maharashtra Open University. Where the university does not publish a programme-wise amount, no figure is shown — confirm at the study centre before paying.",
    rows: [
      { course: "MBA", fee: "₹17,928 (Year 1) + ₹21,108 (Year 2) · ₹39,036 total", duration: "2 Years" },
      {
        course: "MCA",
        fee: "₹25,100 / year (tuition, exam, registration, development fund, UPF and study-centre fee) · ₹75,300 over 3 years",
        duration: "As per current programme structure",
      },
      { course: "MA", fee: "Not published programme-wise", duration: "2 Years" },
      { course: "M.Com", fee: "Not published programme-wise", duration: "2 Years" },
      { course: "M.Sc", fee: "Not published programme-wise", duration: "2 Years" },
    ],
  },
};

export const feeTableFor = (slug: string): UniversityFeeTable | undefined => universityFeeTables[slug];
