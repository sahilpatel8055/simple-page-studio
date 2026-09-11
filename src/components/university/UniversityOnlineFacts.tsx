import { CheckCircle2 } from "lucide-react";

const onlineFacts: Record<string, string[]> = {
  "sharda-online": [
    "Sharda's education group dates to 1996 in Uttar Pradesh and offers undergraduate, postgraduate, diploma and certificate study in online and campus-based formats.",
    "Its campuses are located in Agra, Greater Noida and Mathura. The main campus covers about 180 acres, with 3.5 million square feet of infrastructure.",
    "Sharda is recognised by the University Grants Commission under the UGC Act, 1956 as a university rather than a deemed-to-be university.",
    "The university holds a NAAC A+ grade and reports recognition or membership involving bodies such as AIU, BCI, NMC, DCI, COA, NCTE and INC, depending on the discipline.",
    "Its academic portfolio spans engineering, sciences, agriculture, humanities, health sciences, design, architecture, nursing, media, law, medicine, dentistry, pharmacy and education.",
    "Its stated online undergraduate options include general BBA, BCA and BA programmes.",
  ],
  "shoolini-online": [
    "Shoolini extended its established campus teaching into online education with programmes recognised or entitled by the relevant higher-education authorities.",
    "Online learners use the university's learning platform to reach lectures, course material and other programme resources.",
    "The online degree is presented as carrying the same academic value as the corresponding campus degree.",
    "Its pay-after-placement model allows eligible learners to defer 50% of tuition until they receive a placement offer or admission to a preferred overseas university.",
    "Examinations are held online and monitored through remote-proctoring software.",
    "Career support includes AI-assisted interview preparation, résumé sessions and employer links that include organisations such as Zydus, Biocon, Hindustan Unilever, LG and L&T.",
  ],
  "parul-online": [
    "Parul University is based in Vadodara, Gujarat, was founded in 2009 and offers more than 250 undergraduate, postgraduate and doctoral programmes across the institution.",
    "Parul University Online reports UGC recognition, a NAAC A++ grade and a presence in NIRF rankings.",
    "The university reports a highest placement package of ₹45.98 lakh per annum and an average package of ₹8 lakh per annum; these institution-level figures are not guaranteed outcomes for online learners.",
    "Its learning approach combines an interactive platform with entrepreneur sessions and mentoring from management faculty associated with leading institutes.",
    "Parul has received an ASSOCHAM recognition for placement and describes employability and professional preparation as important parts of its academic model.",
    "Industrial visits, workshops and seminars are used across the institution to connect academic learning with workplace expectations.",
  ],
  "uttaranchal-online": [
    "Uttaranchal University is UGC-entitled to offer fully online degree programmes and holds a NAAC A+ grade.",
    "Its five stated online degrees are MBA, BBA, MCA, BCA and BA.",
    "Students receive access to a learning management system and a virtual library for classes and study resources.",
    "The university conducts virtual job fairs specifically for learners enrolled in its online programmes.",
    "Its reported academic and industry collaborations include organisations such as IBM, ACCA and ISDC.",
  ],
  "nmims-online": [
    "After building its presence in campus and open-distance education, NMIMS expanded into online learning through NMIMS CDOE.",
    "NMIMS has UGC-DEB entitlement for eligible online programmes, holds a NAAC A++ grade and received UGC Category-I autonomy status in 2018.",
    "The institution reports a network of more than 500 hiring partners and offers one-to-one career-coaching sessions to help learners prepare for interviews.",
    "Assessment can combine online examinations, assignments and project reports rather than relying on a single final test.",
    "Its learning design uses multiple digital resources and a universal-design-for-learning approach to make online study more accessible and interactive.",
    "Programme design follows a Knowledge–Skill–Attitude framework intended to help working professionals apply learning in the workplace.",
  ],
  "lpu-online": [
    "LPU is UGC-DEB entitled to offer specified undergraduate and postgraduate degrees in online mode.",
    "Its learning management system is also available through a mobile app, giving students access to classes and resources away from a computer.",
    "Online examinations use remote proctoring supported by artificial-intelligence tools.",
    "Learners can use additional resources such as case studies, scholarly articles and journals.",
    "The university also offers supplementary online certifications that students may use to strengthen their résumés.",
    "Research facilities, seminars, workshops, mock interviews and webinars with industry speakers support academic and professional development.",
  ],
  "amity-online": [
    "Amity University Online reports recognition from UGC and WES and is a member of the Digital Education Council.",
    "Amity's MBA appeared in the 101–150 band of the 2025 QS World University Rankings by Subject.",
    "The wider university was placed in the 1001–1200 band of the QS World University Rankings 2025 and ranked 33rd in the Southern Asia category of the Asian University Rankings.",
    "WES recognition supports credential evaluation in the United States and Canada, while international faculty contribute to the programmes' global exposure.",
    "Industry relationships with organisations such as HCLTech and TCS iON are used to add employment-focused learning to the online experience.",
    "Classes and examinations are delivered online through Amity's learning platform.",
    "The university reports access to more than 100,000 job and placement opportunities through hiring partners and virtual career fairs; availability does not guarantee an individual placement.",
  ],
  "chandigarh-university-online": [
    "Chandigarh University is UGC-DEB entitled to offer specified online degree programmes and holds a NAAC A+ grade.",
    "The university states that its A+ result places it among the top 5% of Indian institutions holding that NAAC grade.",
    "Its online-learning operation holds E-Learning Excellence for Academic Digitisation certification.",
    "Online learners receive access to a university-backed job portal that reports more than 5,000 newly updated openings each month and a network of over 300 hiring partners.",
    "Interview opportunities may continue for up to six months after programme completion, although selection remains employer-led.",
    "The online MBA includes several specialisation choices, including dual-specialisation combinations.",
    "Selected MBA Business Analytics and BBA Business Analytics pathways include Harvard certification content and KPMG modules.",
  ],
};

export function UniversityOnlineFacts({
  universitySlug,
  universityShort,
}: {
  universitySlug: string;
  universityShort: string;
}) {
  const facts = onlineFacts[universitySlug];
  if (!facts?.length) return null;

  return (
    <section aria-labelledby={`${universitySlug}-online-facts`}>
      <h3 id={`${universitySlug}-online-facts`} className="text-base font-bold sm:text-lg">
        {universityShort} Online Facts
      </h3>
      <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
        {facts.map((fact) => (
          <li
            key={fact}
            className="flex min-w-0 items-start gap-2.5 rounded-lg border border-border bg-card p-3 text-sm leading-relaxed text-foreground"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
            <span>{fact}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}