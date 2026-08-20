import type { Approval } from "./types";

/**
 * Curated, verified approval lists keyed by university slug.
 *
 * The master JSON only stores free-text recognition notes, which means bodies
 * such as AICTE, NAAC, AIU and WES were being dropped from the approval strip.
 * When a slug appears here, this list replaces the derived one verbatim.
 */
export const approvalOverrides: Record<string, Approval[]> = {
  "amity-online": [
    {
      body: "UGC",
      status: "First recognised online university in India, with session-wise entitlements",
    },
    { body: "UGC-DEB", status: "Entitled for online degree programmes" },
    { body: "NAAC", status: "Accredited with A+ grade" },
    { body: "AICTE", status: "Management and technical programmes approved" },
    { body: "AIU", status: "Member of the Association of Indian Universities" },
    { body: "WES", status: "Degrees evaluated by World Education Services" },
  ],
  "manipal-university-jaipur": [
    { body: "UGC-DEB", status: "Entitled — online degrees equivalent to on-campus courses" },
    {
      body: "NAAC",
      status: "MAHE A++; Manipal University Jaipur / Sikkim Manipal University A+",
    },
    { body: "AICTE", status: "Select professional and management programmes recognised" },
    { body: "WES", status: "Evaluated by World Education Services" },
    { body: "ICAS", status: "Internationally evaluated" },
    { body: "IQAS", status: "Internationally evaluated" },
  ],
  "smu-online": [
    { body: "UGC-DEB", status: "Entitled — online degrees equivalent to on-campus courses" },
    { body: "NAAC", status: "Sikkim Manipal University accredited A+" },
    { body: "AICTE", status: "Select professional and management programmes recognised" },
    { body: "WES", status: "Evaluated by World Education Services" },
  ],
  "chandigarh-university-online": [
    { body: "UGC-DEB", status: "Entitled under UGC online learning regulations" },
    { body: "NAAC", status: "Accredited with A+ grade" },
    { body: "AICTE", status: "MBA and MCA approved" },
    { body: "AIU", status: "Recognised by the Association of Indian Universities" },
  ],
  "dpu-online": [
    { body: "UGC-DEB", status: "Entitled for online MBA, MCA, BBA and BCA" },
    { body: "AICTE", status: "Approved for technical and management online programmes" },
    { body: "NAAC", status: "Accredited with A++ grade" },
    { body: "NIRF", status: "Ranked in the 41–44 bracket, University category" },
    { body: "WES", status: "Accepted by World Education Services" },
  ],
  "sharda-online": [
    { body: "UGC-DEB", status: "Entitled for online / distance-mode delivery" },
    { body: "NAAC", status: "Accredited with A+ grade" },
    { body: "AICTE", status: "Recognised for professional programmes such as MBA and MCA" },
    { body: "WES", status: "Evaluated by World Education Services" },
  ],
  "uttaranchal-online": [
    { body: "UGC-DEB", status: "Entitled to offer online degree programmes" },
    {
      body: "NAAC",
      status: "A+ grade — first private university in Uttarakhand to do so in its first cycle",
    },
    { body: "WES", status: "Evaluated by World Education Services" },
  ],
  "kurukshetra-university": [
    { body: "UGC", status: "Recognised by the University Grants Commission" },
    { body: "UGC-DEB", status: "Distance Education Bureau recognised" },
    { body: "AICTE", status: "Approved programmes" },
    { body: "NAAC", status: "Accredited with A++ grade" },
    { body: "WES", status: "Evaluated by World Education Services" },
  ],
  vgu: [
    { body: "UGC-DEB", status: "Entitled for online UG and PG degree programmes" },
    { body: "NAAC", status: "Accredited with A+ grade (3.29/4)" },
    { body: "AICTE", status: "Online MBA and MCA approved" },
    { body: "AIU", status: "Member of the Association of Indian Universities" },
  ],
  "lpu-online": [
    { body: "UGC-DEB", status: "Entitled for UG and PG programmes in online mode" },
    { body: "AICTE", status: "MBA and MCA hold council approvals" },
    { body: "NAAC", status: "Accredited with A++ grade (3.68/4)" },
    { body: "WES", status: "Recognised for study and employment in the US and Canada" },
  ],
  "nmims-online": [
    { body: "UGC-DEB", status: "Approved and entitled for online and distance degrees" },
    { body: "NAAC", status: "Accredited with A++ grade (3.67 CGPA)" },
    { body: "AICTE", status: "Recognised programmes" },
    { body: "NIRF", status: "Ranked under national education frameworks" },
    { body: "WES", status: "Valid for credential evaluation in the US and Canada" },
  ],
  ignou: [
    { body: "UGC", status: "Recognised by the University Grants Commission" },
    { body: "UGC-DEB", status: "Distance Education Bureau recognised" },
    { body: "AICTE", status: "Approved programmes" },
    { body: "NAAC", status: "NAAC accredited" },
  ],
  "du-sol": [
    { body: "UGC", status: "Recognised by the University Grants Commission" },
    { body: "UGC-DEB", status: "Distance Education Bureau recognised" },
    { body: "AICTE", status: "Approved programmes" },
    { body: "NAAC", status: "NAAC accredited" },
  ],
  "ksou-mysuru": [
    { body: "UGC", status: "Recognised by the University Grants Commission" },
    { body: "UGC-DEB", status: "Distance Education Bureau recognised" },
    { body: "AICTE", status: "Approved programmes" },
    { body: "NAAC", status: "NAAC accredited" },
  ],
  nsou: [
    { body: "UGC", status: "Recognised by the University Grants Commission" },
    { body: "UGC-DEB", status: "Distance Education Bureau recognised" },
    { body: "AICTE", status: "Approved programmes" },
    { body: "NAAC", status: "NAAC accredited" },
  ],
};
