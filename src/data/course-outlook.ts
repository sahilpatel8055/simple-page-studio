/**
 * Forward-looking editorial for each course family: where the degree is headed
 * in India over the next decade, and what the qualification actually unlocks.
 *
 * Written once per family and reused on the course pillar pages and on the
 * university × course pages, so the same claim never drifts between pages.
 * Nothing here quotes a university figure — fees, placement and eligibility
 * numbers always come from the verified dataset elsewhere on the page.
 */

export interface CourseOutlook {
  /** 2-3 paragraphs on the next 10 years. */
  future: string[];
  /** Short, scannable trend lines shown as chips under the paragraphs. */
  trends: string[];
  /** "An Online X degree can offer you the following" bullets. */
  offers: string[];
}

const OUTLOOK: Record<string, CourseOutlook> = {
  MBA: {
    future: [
      "Management hiring in India is shifting from generalist degrees to managers who can read data, run digital operations and work with distributed teams. Over the next decade the online MBA is likely to become the default route for working professionals seeking that shift, because it is the only format that lets someone keep earning while retraining.",
      "UGC-entitled online degrees now hold the same academic standing as their on-campus equivalents, and employer familiarity has grown sharply since 2021. As more universities publish outcome data and industry-designed electives, the question is moving from whether an online MBA is accepted to which specialisation and which university fit a particular career.",
      "Expect specialisations to keep narrowing — business analytics, fintech, product management, healthcare and supply chain are growing far faster than the traditional generalist track — and expect fees to stay materially below campus programmes as competition between universities increases.",
    ],
    trends: [
      "Analytics and AI literacy in the core syllabus",
      "Industry-designed electives and certifications",
      "Employer acceptance of UGC-entitled online degrees",
      "Cohort-based live learning replacing recorded-only delivery",
      "Specialised MBAs growing faster than generalist ones",
    ],
    offers: [
      "A managerial track from executive or individual-contributor roles into team leadership.",
      "Entry into business analysis, marketing, HR, finance and operations functions.",
      "Eligibility for internal promotions that require a recognised PG qualification.",
      "A domain specialisation — analytics, fintech, healthcare, supply chain — that hiring managers screen for.",
      "Eligibility for PSU, government and PhD routes that require a UGC-entitled master's degree.",
    ],
  },
  MCA: {
    future: [
      "India's IT services and product ecosystem continues to add technical roles faster than any other sector, and the MCA remains the most direct postgraduate qualification for software engineering careers for graduates who did not take a B.Tech route.",
      "Over the next ten years the curriculum will keep moving towards cloud-native development, data engineering, applied AI and security — the areas where hiring is concentrated. Online delivery matters here because the tooling is already remote: code, cloud consoles and version control need no campus lab.",
      "As government and PSU IT recruitment continues to require a recognised master's degree, and as universities publish AI and cybersecurity electives, the online MCA is likely to see the strongest specialisation growth of any PG programme in the country.",
    ],
    trends: [
      "Cloud, DevOps and platform engineering in the core syllabus",
      "AI/ML and data engineering electives expanding fastest",
      "Cybersecurity demand outpacing supply of qualified graduates",
      "Project and portfolio work replacing theory-only assessment",
      "Recognised PG degree still mandatory for many government IT posts",
    ],
    offers: [
      "Entry into software development, data and cloud roles.",
      "Progression from junior to senior technical positions.",
      "Access to high-demand fields like AI, cybersecurity and DevOps.",
      "Stronger candidature for government IT and PSU roles.",
      "A recognised PG qualification for teaching, PhD or further research routes.",
    ],
  },
  "M.Com": {
    future: [
      "Finance and accounting work in India is being reshaped by GST maturity, digital audit trails and automation of routine bookkeeping. What is growing instead is analysis, compliance and advisory work — and that is where a commerce master's degree stays relevant.",
      "The next decade should see the online M.Com used mainly by two groups: working accountants who need a PG qualification for promotion or a professional exam exemption, and graduates preparing for banking, taxation and government examinations while working.",
      "Expect curricula to add data tools, financial modelling and compliance technology alongside the traditional accounting, taxation and corporate law core.",
    ],
    trends: [
      "Compliance and advisory roles growing as bookkeeping automates",
      "Financial analytics tools entering the syllabus",
      "PG degree used alongside CA/CS/CMA preparation",
      "Steady demand from banking and government examinations",
      "Taxation and audit specialisations gaining depth",
    ],
    offers: [
      "Progression from accounts executive to finance or audit lead roles.",
      "Entry into taxation, compliance, audit and financial analysis functions.",
      "Eligibility for banking, insurance and government examinations requiring a PG degree.",
      "A base for professional routes such as CA, CS, CMA or a PhD in commerce.",
      "Eligibility for assistant-professor pathways when combined with NET/SET.",
    ],
  },
  "M.Sc": {
    future: [
      "Science postgraduate work in India is splitting into two tracks: research-heavy laboratory disciplines that need campus infrastructure, and computational or applied disciplines — mathematics, statistics, data science, environmental science, psychology — that transfer well to online delivery.",
      "Over the next decade the online M.Sc is likely to concentrate in those computational and applied subjects, where the industry demand is strongest and where a laptop is the laboratory.",
      "Universities are increasingly pairing the degree with analytics tooling and research methodology, which keeps both the industry route and the PhD route open.",
    ],
    trends: [
      "Data-oriented specialisations dominating online M.Sc intakes",
      "Research methodology and statistics as core skills",
      "Applied science roles in health, environment and analytics",
      "PG degree required for teaching and research eligibility",
      "Laboratory-heavy branches remaining campus-first",
    ],
    offers: [
      "Entry into analyst, research associate and applied-science roles.",
      "A recognised PG qualification for teaching and PhD admission routes.",
      "Specialised depth in a subject rather than a general degree.",
      "Eligibility for government scientific and statistical service examinations.",
      "A route into data and research careers for science graduates already working.",
    ],
  },
  MA: {
    future: [
      "Postgraduate arts and humanities study in India is increasingly chosen for two concrete reasons: eligibility — for teaching, civil services and PhD routes — and communication-heavy careers in content, policy, HR, psychology and public affairs.",
      "Online delivery suits these disciplines particularly well because the coursework is reading, writing and discussion rather than laboratory time. Expect enrolment to keep rising among working professionals and aspirants preparing for competitive examinations.",
      "The next decade should bring stronger elective depth — public policy, journalism, applied psychology, economics — and closer alignment with NET and state examination syllabi.",
    ],
    trends: [
      "PG degree needed for NET, teaching and PhD eligibility",
      "Strong overlap with civil services preparation",
      "Growth in psychology, economics and public policy electives",
      "Content, communication and policy roles hiring humanities graduates",
      "Fully online delivery a natural fit for reading-led disciplines",
    ],
    offers: [
      "Eligibility for UGC NET, assistant professor and PhD routes.",
      "A recognised PG qualification for civil services and state examinations.",
      "Entry into content, communication, policy, HR and counselling-adjacent roles.",
      "Subject depth in economics, English, psychology, political science or sociology.",
      "A part-time study route for teachers and working professionals.",
    ],
  },
  BBA: {
    future: [
      "The BBA has become the standard undergraduate entry into business roles, and the online version is growing fastest among students who are simultaneously working, running a family business or preparing for professional examinations.",
      "Over the next decade expect the degree to be treated less as a standalone qualification and more as the first half of a BBA + MBA pathway, with universities designing the two to connect directly.",
      "Digital marketing, analytics and entrepreneurship electives are expanding quickly, and employers increasingly look at internships and project work alongside the degree itself.",
    ],
    trends: [
      "BBA to MBA pathways designed as one route",
      "Digital marketing and analytics electives expanding",
      "Employers weighing internships alongside the degree",
      "Family-business and entrepreneurship tracks growing",
      "Online UG accepted for PG admission at recognised universities",
    ],
    offers: [
      "Entry-level roles in sales, marketing, operations, HR and business support.",
      "A recognised UG degree for MBA and other PG admissions.",
      "Business fundamentals — finance, marketing, analytics — applied from the first year.",
      "The ability to study while working or running a family business.",
      "Eligibility for government examinations that require a bachelor's degree.",
    ],
  },
  BCA: {
    future: [
      "The BCA is India's most accessible undergraduate route into software work for students without an engineering seat, and hiring for junior developer, support and QA roles continues to draw heavily from it.",
      "Over the next ten years the syllabus will keep tracking industry tooling — web and mobile development, cloud basics, databases, and increasingly applied AI. Portfolio and project work will matter as much as the marksheet.",
      "Most BCA graduates continue to an MCA or a specialised master's, and universities are building that progression explicitly into their online programmes.",
    ],
    trends: [
      "Project portfolios weighed alongside marks by employers",
      "Cloud and full-stack tooling entering the UG syllabus",
      "Applied AI basics appearing in final-year electives",
      "BCA to MCA progression built into university pathways",
      "Remote-friendly learning matching remote-friendly work",
    ],
    offers: [
      "Entry into junior developer, support, testing and IT operations roles.",
      "A recognised UG degree for MCA and other PG admissions.",
      "Practical programming, database and web development skills.",
      "A route into technology careers without an engineering entrance exam.",
      "Eligibility for government examinations that require a bachelor's degree.",
    ],
  },
  "B.Com": {
    future: [
      "The B.Com remains the widest undergraduate qualification in India and the standard base for accounting, banking and professional-examination routes. The online version is chosen mostly by students who are working, articling or preparing for CA, CS or CMA at the same time.",
      "Routine bookkeeping is automating, so the next decade will favour graduates who add analysis, taxation and compliance skills on top of the core degree.",
      "Expect universities to keep aligning the syllabus with GST, digital accounting systems and financial analytics tools.",
    ],
    trends: [
      "Studied alongside CA, CS and CMA preparation",
      "GST and digital accounting embedded in the syllabus",
      "Analysis and compliance skills replacing manual bookkeeping",
      "Steady demand from banking and government examinations",
      "Standard base for M.Com and MBA admissions",
    ],
    offers: [
      "Entry into accounts, taxation, banking and back-office finance roles.",
      "A recognised UG degree for M.Com, MBA and professional-course routes.",
      "The flexibility to study while articling or working in a firm.",
      "Eligibility for banking, SSC and state government examinations.",
      "A foundation in accounting, taxation, law and business finance.",
    ],
  },
  BA: {
    future: [
      "The BA is the most common undergraduate degree in India and, for most students, the qualification that opens competitive examinations, teaching routes and postgraduate study.",
      "Online delivery has made it realistic to finish the degree while preparing for state or civil services examinations, which is now the dominant reason people enrol.",
      "Over the next decade expect stronger elective depth in economics, psychology, political science and journalism, and closer alignment between the syllabus and examination patterns.",
    ],
    trends: [
      "Studied alongside civil services and state exam preparation",
      "Psychology, economics and journalism electives growing",
      "UG degree required for most government examinations",
      "Flexible study for working candidates and caregivers",
      "Direct progression into MA and B.Ed routes",
    ],
    offers: [
      "Eligibility for government, SSC, banking and state examinations.",
      "A recognised UG degree for MA, MBA and B.Ed admissions.",
      "Entry into content, administration, teaching-support and communication roles.",
      "Subject depth in humanities and social sciences.",
      "A study route that fits around a job or exam preparation.",
    ],
  },
};

const FALLBACK: CourseOutlook = {
  future: [
    "Online degrees from UGC-entitled universities now carry the same academic standing as their on-campus equivalents, and employer familiarity has grown steadily since 2021. Over the next decade the format is likely to become the normal route for working professionals rather than an alternative one.",
    "Expect deeper specialisations, more industry-designed electives and clearer published outcome data as universities compete for the same applicants.",
  ],
  trends: [
    "UGC-entitled online degrees treated on par with campus degrees",
    "Deeper, industry-aligned specialisations",
    "Live cohort teaching replacing recorded-only delivery",
    "More published outcome and placement data",
  ],
  offers: [
    "A recognised degree accepted for jobs, promotions and further study.",
    "Study that fits around a full-time job.",
    "Specialisation choices aligned to current hiring.",
    "Eligibility for examinations and roles that require the qualification.",
  ],
};

/** Outlook for a course family, by short name (MBA, MCA, B.Com …). */
export function courseOutlook(shortName: string): CourseOutlook {
  return OUTLOOK[shortName] ?? FALLBACK;
}

/** Match a free-text programme name to a family short name. */
export function outlookForProgrammeName(name: string): CourseOutlook {
  const n = name.toUpperCase();
  const key = ["MBA", "MCA", "M.Com", "M.Sc", "BBA", "BCA", "B.Com", "MA", "BA"].find((k) => {
    const bare = k.toUpperCase().replace(/\./g, "\\.?\\s?");
    return new RegExp(`\\b${bare}\\b`).test(n);
  });
  return courseOutlook(key ?? "");
}
