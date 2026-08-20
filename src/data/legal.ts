export interface LegalBlock {
  h: string;
  p?: string[];
  list?: string[];
  after?: string[];
}

export interface LegalDoc {
  slug: string;
  path: string;
  label: string;
  title: string;
  metaTitle: string;
  description: string;
  updated: string;
  intro: string[];
  sections: LegalBlock[];
}

export const FOOTER_DISCLAIMER =
  "DegreeKhojo is an independent education information and guidance platform. We do not directly conduct academic programmes or award degrees. University admissions, eligibility, fees, curriculum, examinations, recognition, scholarships and placement policies are determined by the respective institutions and may change. Information on DegreeKhojo is provided for general informational purposes and should be verified with the relevant university or official authority before making an academic or financial decision.";

export const disclaimerDoc: LegalDoc = {
  slug: "disclaimer",
  path: "/disclaimer",
  label: "Disclaimer",
  title: "Website Disclaimer",
  metaTitle: "Disclaimer",
  description:
    "How to interpret university, course, fee, ranking and placement information published on DegreeKhojo, and what we do not guarantee.",
  updated: "10/08/2026",
  intro: [
    "DegreeKhojo is an independent education information, comparison and guidance platform designed to help students, working professionals and other learners research and compare universities, colleges, courses, programmes, fees, eligibility requirements, admission information and related educational opportunities.",
    "DegreeKhojo does not itself conduct academic programmes, teach courses, conduct university examinations, issue degrees, diplomas, certificates or transcripts, or determine admission eligibility. Academic programmes, admissions, examinations, certifications, fee structures, scholarships, curriculum, academic policies and placement policies are determined and administered by the respective universities, institutions and regulatory authorities.",
  ],
  sections: [
    {
      h: "1. Information for General Guidance",
      p: ["The information published on DegreeKhojo, including:"],
      list: [
        "University information",
        "Course information",
        "Eligibility criteria",
        "Admission dates",
        "Fees",
        "Duration",
        "Rankings",
        "Cut-offs",
        "Placement information",
        "Career information",
        "Articles and blogs",
        "Comparisons",
        "Images and graphics",
        "University logos and trademarks",
        "Admission guidance",
      ],
      after: [
        "is provided primarily for general informational and educational purposes.",
        "While we make reasonable efforts to research, review and update information, educational information can change because of university notifications, regulatory decisions, admission-cycle changes, fee revisions, programme modifications or other circumstances.",
        "Therefore, users should verify important information directly with the respective university or relevant official authority before making an admission, financial or academic decision.",
      ],
    },
    {
      h: "2. University Information",
      p: [
        "DegreeKhojo may publish information relating to universities and educational institutions for comparison and informational purposes.",
        "Unless expressly stated otherwise, the appearance of a university, course, programme or institution on DegreeKhojo does not by itself constitute an endorsement, accreditation, partnership, affiliation or representation by that university.",
        "Official recognition, accreditation, approval, programme availability and eligibility should always be confirmed from the relevant institution or regulatory authority.",
      ],
    },
    {
      h: "3. Fees and Admission Information",
      p: [
        "Fees, admission dates, eligibility criteria, seat availability, examination schedules, scholarships and other programme-related information may change.",
        "Any fee displayed on DegreeKhojo should be treated as indicative unless explicitly identified as an official current fee published by the institution.",
        "Users should confirm the final payable amount and applicable admission requirements directly with the university before making payment.",
      ],
    },
    {
      h: "4. Rankings, Comparisons and Recommendations",
      p: [
        "Any ranking, comparison, rating, recommendation or \u201cbest university/course\u201d statement published on DegreeKhojo is based on the methodology, data and criteria described on the relevant page, where applicable.",
        "Such information should not be interpreted as an absolute guarantee of academic quality, employment, salary, admission, placement or career outcome.",
        "Individual results may vary depending on the learner's qualifications, skills, experience, location, market conditions and other factors.",
      ],
    },
    {
      h: "5. Placement and Career Claims",
      p: [
        "Placement statistics, salary figures, highest packages, average packages, employment outcomes and career information may originate from institutions, publicly available information or other identified sources.",
        "Such figures should not be interpreted as a guarantee that a particular learner will receive a specific salary, placement or employment opportunity.",
      ],
    },
    {
      h: "6. Third-Party Websites",
      p: [
        "DegreeKhojo may contain links to university websites, government websites, payment gateways, educational platforms, social media platforms and other third-party websites.",
        "DegreeKhojo does not control third-party websites and is not responsible for their content, availability, security, privacy practices, policies or transactions.",
        "Users should review the terms and privacy policies of third-party websites before using their services.",
      ],
    },
    {
      h: "7. No Guarantee",
      p: [
        "To the maximum extent permitted by applicable law, DegreeKhojo does not guarantee that information published on the website will always be:",
      ],
      list: [
        "Complete",
        "Accurate",
        "Current",
        "Error-free",
        "Uninterrupted",
        "Suitable for a particular purpose",
      ],
      after: [
        "Users are responsible for independently verifying material information before relying upon it.",
      ],
    },
    {
      h: "8. Intellectual Property",
      p: [
        "University names, logos, trademarks and other institutional marks appearing on DegreeKhojo belong to their respective owners.",
        "Their use on the platform is intended for identification, informational, editorial and comparative purposes and does not necessarily indicate ownership, affiliation or endorsement.",
        "DegreeKhojo's original content, branding, design, graphics, text and other proprietary materials remain protected by applicable intellectual-property laws.",
      ],
    },
    {
      h: "9. Changes to Information",
      p: [
        "DegreeKhojo may update, correct, modify or remove information at any time when new information becomes available or when an error is identified.",
      ],
    },
    {
      h: "10. Contact",
      p: [
        "For corrections, factual updates, complaints or questions regarding information published on DegreeKhojo:",
        "Email: support@degreekhojo.com",
        "Website: https://degreekhojo.com/",
      ],
    },
  ],
};

export const termsDoc: LegalDoc = {
  slug: "terms-and-conditions",
  path: "/terms-and-conditions",
  label: "Terms & Conditions",
  title: "Terms & Conditions",
  metaTitle: "Terms and Conditions",
  description:
    "The terms that govern your access to and use of the DegreeKhojo education information and guidance platform.",
  updated: "10/08/2026",
  intro: [
    "Welcome to DegreeKhojo. These Terms & Conditions govern your access to and use of the DegreeKhojo website and its services.",
    "By accessing or using the website, you acknowledge that you have read, understood and agreed to these Terms & Conditions.",
    "If you do not agree with these terms, please discontinue use of the website.",
  ],
  sections: [
    {
      h: "1. About DegreeKhojo",
      p: [
        "DegreeKhojo operates as an independent education information and guidance platform.",
        "The platform may provide:",
      ],
      list: [
        "University information",
        "Course comparisons",
        "Admission information",
        "Educational articles",
        "Career guidance",
        "University and course comparisons",
        "Lead-generation or enquiry facilities",
        "Educational resources",
        "Other related informational services",
      ],
      after: [
        "DegreeKhojo is not a university, college, examination board, accreditation authority or degree-granting institution.",
        "DegreeKhojo does not independently award academic qualifications.",
      ],
    },
    {
      h: "2. Educational Information",
      p: [
        "Information available on the website is provided to assist users in researching educational opportunities.",
        "Universities and institutions independently determine their:",
      ],
      list: [
        "Admission requirements",
        "Eligibility",
        "Fees",
        "Curriculum",
        "Examinations",
        "Academic policies",
        "Scholarships",
        "Recognition",
        "Placements",
        "Certifications",
      ],
      after: [
        "Users should verify important information with the relevant institution before making decisions.",
      ],
    },
    {
      h: "3. User Responsibility",
      p: [
        "Users agree to provide accurate information when submitting forms, enquiries or requests through DegreeKhojo.",
        "Users must not:",
      ],
      list: [
        "Provide false or misleading information.",
        "Impersonate another person.",
        "Attempt unauthorised access to the website.",
        "Interfere with website security.",
        "Upload malicious software.",
        "Scrape or reproduce substantial website content without permission.",
        "Use the website for unlawful purposes.",
        "Misuse enquiry or counselling facilities.",
        "Attempt to disrupt website operations.",
      ],
    },
    {
      h: "4. Educational Enquiries and Communications",
      p: [
        "If a user voluntarily submits an enquiry form, the information may be used to respond to the user's request and provide relevant educational guidance, subject to the website's Privacy Policy and applicable law.",
        "Where legally required, appropriate consent and communication preferences will be respected.",
        "Users may request to stop promotional communications through available unsubscribe or opt-out mechanisms.",
      ],
    },
    {
      h: "5. Third-Party Institutions and Services",
      p: [
        "DegreeKhojo may facilitate access to information about universities, colleges, education providers or other third parties.",
        "Unless expressly stated otherwise, DegreeKhojo does not control the independent policies, decisions or services of such third parties.",
        "Any admission, payment, enrolment or academic relationship ultimately exists between the learner and the relevant institution or service provider.",
      ],
    },
    {
      h: "6. Intellectual Property",
      p: [
        "Unless otherwise stated, the DegreeKhojo name, logo, website design, original text, graphics, databases, software, layout and other proprietary materials are owned by or licensed to DegreeKhojo.",
        "Users may not reproduce, redistribute, commercially exploit or republish substantial portions of proprietary content without prior written permission.",
        "University and third-party trademarks remain the property of their respective owners.",
      ],
    },
    {
      h: "7. User-Generated Content",
      p: [
        "Where users are permitted to submit reviews, comments, questions or other content, users are responsible for ensuring that their submissions are lawful, accurate and do not violate another person's rights.",
        "DegreeKhojo reserves the right to moderate, edit, restrict or remove content that is unlawful, misleading, abusive, defamatory, discriminatory, promotional or otherwise inappropriate.",
      ],
    },
    {
      h: "8. Website Availability",
      p: [
        "We attempt to maintain reliable website availability but do not guarantee uninterrupted or error-free access.",
        "The website may occasionally be unavailable because of maintenance, technical issues, security incidents, infrastructure failures or circumstances beyond our reasonable control.",
      ],
    },
    {
      h: "9. Disclaimer of Warranties",
      p: [
        "To the maximum extent permitted by applicable law, the website and its information are provided on an \u201cas available\u201d and \u201cas is\u201d basis.",
        "DegreeKhojo does not guarantee:",
      ],
      list: [
        "Admission to any university",
        "A specific academic result",
        "A scholarship",
        "A particular placement",
        "A particular salary",
        "Employment",
        "Course availability",
        "Continued recognition or accreditation",
        "Accuracy or completeness of every third-party statement",
      ],
    },
    {
      h: "10. Limitation of Liability",
      p: [
        "To the maximum extent permitted by applicable law, DegreeKhojo shall not be responsible for losses arising from reliance on third-party information, university decisions, admission outcomes, changes in fees, changes in eligibility, placement outcomes or the user's independent educational decisions.",
        "Nothing in these Terms is intended to exclude liability that cannot lawfully be excluded under applicable law.",
      ],
    },
    {
      h: "11. External Links",
      p: [
        "External links are provided for convenience and informational purposes.",
        "DegreeKhojo does not necessarily endorse or guarantee third-party websites, products or services.",
      ],
    },
    {
      h: "12. Changes to These Terms",
      p: [
        "DegreeKhojo may update these Terms & Conditions when necessary.",
        "The updated version will be published on this page with a revised \u201cLast Updated\u201d date.",
        "Continued use of the website after an update constitutes acceptance of the revised terms, subject to applicable law.",
      ],
    },
    {
      h: "13. Governing Law",
      p: [
        "These Terms & Conditions shall be governed by the applicable laws of India.",
        "Any dispute shall be subject to the jurisdiction of the competent courts having jurisdiction over DegreeKhojo's registered/operational office, subject to applicable law.",
      ],
    },
    {
      h: "14. Contact",
      p: [
        "For questions regarding these Terms:",
        "DegreeKhojo",
        "Email: Support@degreekhojo.com",
        "Website: https://degreekhojo.com/",
      ],
    },
  ],
};

export const editorialDoc: LegalDoc = {
  slug: "editorial-policy",
  path: "/editorial-policy",
  label: "Editorial Policy",
  title: "Editorial Policy",
  metaTitle: "Editorial Policy",
  description:
    "How DegreeKhojo researches, writes, reviews, updates and corrects university, course and admission content.",
  updated: "10/08/2026",
  intro: [
    "At DegreeKhojo, our objective is to provide learners with useful, understandable and responsibly presented information about universities, courses, admissions, online education, distance education and career-related topics.",
    "Our editorial policy explains how we research, create, review, update and correct content published on DegreeKhojo.",
  ],
  sections: [
    {
      h: "1. Our Editorial Purpose",
      p: ["DegreeKhojo creates educational content to help learners:"],
      list: [
        "Understand universities and programmes.",
        "Compare educational options.",
        "Understand eligibility requirements.",
        "Research fees and admission processes.",
        "Understand online and distance education.",
        "Make more informed education decisions.",
      ],
      after: [
        "Our content is intended to support research and should not replace official information issued by universities or regulatory authorities.",
      ],
    },
    {
      h: "2. Independent Educational Information",
      p: [
        "DegreeKhojo operates as an independent information and guidance platform.",
        "Our editorial content should not be interpreted as representing the official position of a university unless the content explicitly identifies an official university source.",
        "Where information is provided by a university or another organisation, we aim to identify or appropriately attribute the source where practical.",
      ],
    },
    {
      h: "3. Research and Sources",
      p: ["Depending on the topic, our editorial team may use:"],
      list: [
        "Official university websites",
        "Official admission notifications",
        "University prospectuses",
        "Regulatory and government websites",
        "Publicly available institutional information",
        "Official reports",
        "Other credible publicly available sources",
      ],
      after: [
        "For important admission information, readers are encouraged to verify the latest information directly with the relevant institution.",
      ],
    },
    {
      h: "4. Accuracy and Fact Checking",
      p: [
        "We make reasonable efforts to ensure that published information is accurate and useful.",
        "However, education-related information can change quickly.",
        "Admission dates, fees, eligibility criteria, course structures, recognition status, examination schedules and other details may be revised by institutions or regulators.",
        "When we identify an outdated or incorrect statement, we aim to review and update the relevant content.",
      ],
    },
    {
      h: "5. Content Updates",
      p: ["Content may be reviewed when:"],
      list: [
        "A new admission cycle begins.",
        "A university changes its programme structure.",
        "Fees are revised.",
        "Eligibility criteria change.",
        "Admission dates change.",
        "New official information becomes available.",
        "A factual error is reported.",
      ],
      after: ["The publication or update date may be displayed where appropriate."],
    },
    {
      h: "6. Corrections Policy",
      p: [
        "If you identify an inaccurate, outdated or misleading statement on DegreeKhojo, you can contact our editorial team.",
        "Please provide:",
      ],
      list: [
        "Page URL",
        "Specific information that appears incorrect",
        "Supporting source or official reference, if available",
      ],
      after: [
        "Our editorial team will review the claim and make an appropriate correction where necessary.",
        "Editorial Contact: info@degreekhojo.com",
      ],
    },
    {
      h: "7. Sponsored and Commercial Relationships",
      p: [
        "DegreeKhojo may have commercial relationships with educational institutions, service providers or other organisations.",
        "Where content is sponsored, paid, promotional or commercially influenced, it should be appropriately disclosed in accordance with applicable requirements.",
        "Commercial relationships should not be presented as independent editorial endorsements.",
      ],
    },
    {
      h: "8. Affiliate Links and Lead Generation",
      p: [
        "Some pages may contain enquiry forms, referral links, advertisements or other commercial elements.",
        "Where applicable, users will be informed through appropriate disclosures.",
        "Submitting an enquiry does not guarantee admission, scholarship, placement, employment or acceptance by any institution.",
      ],
    },
    {
      h: "9. Rankings and Comparisons",
      p: [
        "DegreeKhojo may publish rankings, comparisons or recommendations.",
        "Where a ranking or comparison is presented, we aim to explain the relevant criteria or methodology.",
        "A ranking should not be interpreted as an absolute measure of educational quality or as a guarantee of a particular academic or career outcome.",
      ],
    },
    {
      h: "10. AI-Assisted Content",
      p: [
        "DegreeKhojo may use technology, including AI-assisted tools, during certain stages of research, drafting, formatting or content production.",
        "AI-assisted material is subject to human review and editorial oversight before publication.",
        "We do not intend to publish automatically generated content without appropriate editorial review.",
      ],
    },
    {
      h: "11. University Logos, Images and Trademarks",
      p: [
        "University names, logos, photographs and trademarks may appear in educational and editorial content for identification and informational purposes.",
        "Ownership of such third-party intellectual property remains with the respective rights holders.",
        "Where a rights holder believes material has been used incorrectly, they may contact DegreeKhojo for review.",
      ],
    },
    {
      h: "12. No Guaranteed Outcomes",
      p: ["Editorial content does not guarantee:"],
      list: [
        "Admission",
        "Employment",
        "Salary",
        "Placement",
        "Scholarship",
        "Academic success",
        "Immigration or visa outcomes",
        "Professional licensing",
        "Any particular career result",
      ],
      after: ["Individual outcomes depend on multiple factors."],
    },
    {
      h: "13. Editorial Independence",
      p: [
        "Editorial decisions should be based on usefulness, relevance, accuracy and educational value.",
        "Commercial relationships should not be used to deliberately present misleading information as objective fact.",
      ],
    },
    {
      h: "14. Reader Responsibility",
      p: [
        "Readers should verify critical information directly from the relevant university or regulatory authority before:",
      ],
      list: [
        "Paying fees",
        "Applying for admission",
        "Selecting a programme",
        "Relying on eligibility information",
        "Making financial commitments",
        "Making career decisions",
      ],
    },
    {
      h: "15. Contact the Editorial Team",
      p: [
        "For corrections, source suggestions, factual concerns or editorial questions:",
        "DegreeKhojo Editorial Team",
        "Email: info@degreekhojo.com",
        "Website: https://degreekhojo.com/",
      ],
    },
  ],
};

export const privacyDoc: LegalDoc = {
  slug: "privacy-policy",
  path: "/privacy-policy",
  label: "Privacy Policy",
  title: "Privacy Policy",
  metaTitle: "Privacy Policy",
  description:
    "How DegreeKhojo collects, uses, shares, stores and protects the personal information you share through our website and enquiry forms.",
  updated: "10/08/2026",
  intro: [
    "At DegreeKhojo, we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how DegreeKhojo collects, uses, stores, and protects information when you visit or use our website, services, forms, and other digital platforms.",
    "By accessing or using DegreeKhojo.com, you agree to the practices described in this Privacy Policy. If you do not agree with any part of this policy, please discontinue use of the website.",
  ],
  sections: [
    {
      h: "1. About DegreeKhojo",
      p: [
        "DegreeKhojo is an independent education guidance and information platform that helps students and learners research, compare, and understand universities, colleges, online education, distance education, courses, admissions, fees, eligibility, and related educational opportunities.",
        "DegreeKhojo does not itself provide academic degrees or conduct university programmes unless explicitly stated on a particular page. Academic programmes, admissions, fees, examinations, curriculum, recognition, scholarships, placements, and related academic decisions are governed by the respective university or institution.",
      ],
    },
    {
      h: "2. Information We Collect",
      p: [
        "Depending on how you interact with our website, we may collect the following information:",
        "Information You Provide Directly",
        "When you submit a form, request counselling, contact us, or otherwise communicate with us, we may collect:",
      ],
      list: [
        "Name",
        "Mobile number",
        "Email address",
        "City or location",
        "Educational qualification",
        "Course or programme of interest",
        "University or institution of interest",
        "Preferred mode of education",
        "Other information voluntarily provided by you",
      ],
      after: [
        "You should provide only information that is necessary and accurate for the purpose for which it is submitted.",
        "Information Collected Automatically",
        "When you visit DegreeKhojo.com, certain technical information may automatically be collected, including IP address, browser type and version, device type, operating system, pages visited, referring pages, date and time of visits, approximate geographic information, and website interaction and usage information.",
        "This information helps us understand website performance, improve user experience, identify technical issues, and maintain website security.",
      ],
    },
    {
      h: "3. How We Use Your Information",
      p: [
        "We may use collected information for legitimate business and website-related purposes, including:",
      ],
      list: [
        "Responding to your enquiries",
        "Providing education guidance or counselling",
        "Connecting you with relevant education experts or university representatives, where applicable",
        "Understanding your course and university interests",
        "Improving our website, content, and services",
        "Personalising your experience",
        "Sending requested information or updates",
        "Communicating regarding enquiries submitted through our website",
        "Maintaining website security",
        "Detecting and preventing fraudulent, abusive, or unauthorised activity",
        "Analysing website traffic and performance",
        "Measuring advertising and marketing effectiveness",
        "Complying with applicable legal and regulatory requirements",
      ],
      after: [
        "We do not use personal information for purposes that are materially different from those described in this Privacy Policy without an appropriate legal basis or, where required, your consent.",
      ],
    },
    {
      h: "4. Enquiry Forms and Counselling Requests",
      p: [
        "If you submit your information through a DegreeKhojo enquiry or counselling form, your information may be used to respond to your request.",
        "Depending on the nature of your enquiry, we may share relevant information with:",
      ],
      list: [
        "Education counsellors",
        "Service providers assisting us with enquiry management",
        "Relevant universities or educational institutions",
        "Authorised education partners",
      ],
      after: [
        "Such sharing is intended to help address your enquiry or provide the information or assistance you requested.",
        "Submitting an enquiry does not guarantee admission, scholarship, placement, fee concession, or any other outcome. Final admission and academic decisions are made by the respective university or institution.",
      ],
    },
    {
      h: "5. Cookies and Similar Technologies",
      p: ["DegreeKhojo may use cookies and similar technologies to:"],
      list: [
        "Operate essential website functions",
        "Remember user preferences",
        "Understand website usage",
        "Improve website performance",
        "Measure traffic and engagement",
        "Support advertising and marketing activities",
      ],
      after: [
        "Third-party services used on our website may also place their own cookies or similar technologies in accordance with their respective policies.",
        "You can manage or disable cookies through your browser settings. However, disabling certain cookies may affect some website functionality.",
      ],
    },
    {
      h: "6. Analytics and Third-Party Services",
      p: [
        "We may use third-party tools and services for website analytics, performance measurement, advertising, communication, security, and other operational purposes.",
        "These services may collect information about your interaction with our website according to their own privacy policies.",
        "Examples may include analytics, advertising, payment, communication, hosting, CRM, security, or other technology providers.",
        "DegreeKhojo does not control the privacy practices of independent third-party services. We encourage users to review the privacy policies of such services where appropriate.",
      ],
    },
    {
      h: "7. Advertising",
      p: [
        "DegreeKhojo may display advertisements provided by third-party advertising platforms.",
        "Advertising providers may use cookies, identifiers, contextual information, or similar technologies to deliver, measure, and improve advertisements.",
        "DegreeKhojo does not guarantee or endorse every product, service, advertisement, or third-party website displayed through advertising networks.",
        "Users should independently evaluate third-party offers before making any purchase, admission, financial commitment, or other decision.",
      ],
    },
    {
      h: "8. Google Advertising and Analytics",
      p: [
        "Where Google services are used on DegreeKhojo, information may be processed according to Google's applicable policies.",
        "Google and other advertising partners may use cookies or similar technologies to understand interactions with websites and provide or measure relevant advertising.",
        "Users may manage certain advertising preferences through the controls provided by the relevant advertising provider and their browser or device.",
      ],
    },
    {
      h: "9. Sharing of Personal Information",
      p: ["We may share information where reasonably necessary with:"],
      list: [
        "Universities and educational institutions",
        "Education counselling partners",
        "Technology and hosting providers",
        "CRM and communication service providers",
        "Analytics and advertising providers",
        "Professional advisers and service providers",
        "Government authorities or law-enforcement agencies where legally required",
      ],
      after: [
        "We do not sell personal information as a general business practice.",
        "Where third parties process information on our behalf, we seek to use appropriate contractual, organisational, or technical safeguards as reasonably appropriate.",
      ],
    },
    {
      h: "10. Data Security",
      p: [
        "We take reasonable technical and organisational measures designed to protect personal information from unauthorised access, alteration, disclosure, misuse, or destruction.",
        "However, no website, internet transmission, database, or electronic storage system can be guaranteed to be completely secure.",
        "Therefore, while we take reasonable precautions, we cannot guarantee absolute security of information transmitted to or stored by us.",
      ],
    },
    {
      h: "11. Data Retention",
      p: [
        "We retain personal information only for as long as reasonably necessary for the purposes described in this Privacy Policy, including:",
      ],
      list: [
        "Providing requested services or assistance",
        "Maintaining business and communication records",
        "Improving our services",
        "Resolving disputes",
        "Preventing fraud or misuse",
        "Complying with applicable legal, tax, accounting, or regulatory obligations",
      ],
      after: [
        "When information is no longer reasonably required, it may be deleted, anonymised, or securely disposed of, subject to applicable legal requirements.",
      ],
    },
    {
      h: "12. Your Privacy Choices",
      p: [
        "Depending on applicable law, you may have rights regarding your personal information, which may include:",
      ],
      list: [
        "Requesting access to certain personal information",
        "Requesting correction of inaccurate information",
        "Requesting deletion where legally applicable",
        "Withdrawing consent where processing is based on consent",
        "Opting out of certain marketing communications",
        "Raising concerns regarding the processing of your information",
      ],
      after: [
        "To make a privacy-related request, contact us using the details provided in the Contact Us section.",
        "We may need to verify your identity before processing certain requests.",
      ],
    },
    {
      h: "13. Marketing Communications",
      p: [
        "If you provide your contact information for an enquiry or counselling request, we may contact you regarding your enquiry, educational opportunities, courses, universities, admissions, or related services.",
        "Where required by applicable law, we will provide appropriate consent and opt-out mechanisms.",
        "You may request that we stop sending non-essential promotional communications at any time.",
        "Please note that even after opting out of promotional communication, we may still send necessary transactional or service-related communications.",
      ],
    },
    {
      h: "14. Children's Privacy",
      p: [
        "DegreeKhojo is intended primarily for students, learners, parents, working professionals, and other individuals seeking higher-education information.",
        "We do not knowingly request or intentionally collect personal information from children where such collection is prohibited by applicable law.",
        "If you believe that a child has provided personal information to us in circumstances where such collection should not have occurred, please contact us so that we can review and take appropriate action.",
      ],
    },
    {
      h: "15. External Links",
      p: [
        "Our website may contain links to university websites, educational institutions, government websites, third-party services, advertisements, or other external websites.",
        "These websites operate independently and may have their own privacy policies and terms.",
        "DegreeKhojo is not responsible for the privacy practices, security, content, or policies of external websites.",
        "We recommend reviewing the privacy policy of any third-party website before submitting personal information.",
      ],
    },
    {
      h: "16. University Information and Educational Content",
      p: [
        "DegreeKhojo publishes educational information including university profiles, course information, eligibility, fees, admission information, rankings, comparisons, articles, guides, and other educational content.",
        "Such information is provided for general informational and guidance purposes.",
        "University fees, admission dates, eligibility requirements, course structures, recognition, examination schedules, placement information, and other academic details may change.",
        "Users should verify important information with the respective university or official authority before making an admission or financial decision.",
      ],
    },
    {
      h: "17. Data of Existing Users",
      p: [
        "If you have previously submitted information to DegreeKhojo, this Privacy Policy also applies to the processing of that information, subject to the terms and legal requirements applicable at the time of collection.",
      ],
    },
    {
      h: "18. Changes to This Privacy Policy",
      p: ["We may update this Privacy Policy from time to time to reflect changes in:"],
      list: [
        "Our services",
        "Website functionality",
        "Technology",
        "Legal or regulatory requirements",
        "Data-processing practices",
      ],
      after: [
        "When changes are made, the updated Last Updated date will be displayed at the beginning of this policy.",
        "We encourage users to review this page periodically.",
      ],
    },
    {
      h: "19. Contact Us",
      p: [
        "If you have questions, concerns, requests, or complaints regarding this Privacy Policy or the handling of your personal information, you can contact us:",
        "DegreeKhojo",
        "Website: DegreeKhojo.com",
        "Email: Admin@degreekhojo.com",
        "Phone: +91 87700 12496",
        "We will make reasonable efforts to review and respond to privacy-related requests within an appropriate period.",
      ],
    },
    {
      h: "20. Consent",
      p: [
        "By using DegreeKhojo.com and voluntarily submitting your information through our website, you acknowledge that you have read and understood this Privacy Policy and agree to the collection and use of information as described herein, subject to applicable law.",
      ],
    },
  ],
};

export const legalDocs: LegalDoc[] = [disclaimerDoc, termsDoc, editorialDoc, privacyDoc];
