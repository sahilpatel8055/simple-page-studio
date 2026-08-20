/**
 * Official 2026-27 application / registration fees, university by university.
 * `amount` is the amount a candidate pays to apply (INR). `note` explains any
 * special condition (partial payment, category slabs, fee adjusted later).
 */
export type ApplicationFee = { amount: number; note?: string };

export const applicationFees: Record<string, ApplicationFee> = {
  "amity-online": {
    amount: 1100,
    note: "₹1,100 application fee — included in (adjusted against) the programme fee.",
  },
  "lpu-online": { amount: 1000 },
  "manipal-university-jaipur": { amount: 500 },
  "smu-online": { amount: 500 },
  baou: { amount: 300 },
  "uttaranchal-online": {
    amount: 5000,
    note: "₹5,000 is a partial payment at application and is adjusted against the programme fee.",
  },
  vgu: { amount: 1000 },
  "nmims-online": {
    amount: 11200,
    note: "₹11,200 at application — ₹1,200 application fee plus ₹10,000 partial fee payment.",
  },
  "chandigarh-university-online": { amount: 1000 },
  "dpu-online": { amount: 1500 },
  "ksou-mysuru": { amount: 300 },
  ignou: { amount: 300 },
  "du-sol": {
    amount: 500,
    note: "₹500 for General/OBC/EWS candidates and ₹250 for SC/ST/PwD candidates.",
  },
};

export const applicationFee = (slug: string): ApplicationFee | undefined => applicationFees[slug];
