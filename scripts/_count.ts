import { offerings } from "../src/data/offerings";
const set = new Set(offerings.map(o=>`${o.universitySlug}/${o.programmeSlug}`));
console.log("offerings", offerings.length, "unique", set.size);
const byU: Record<string,number> = {};
for (const o of offerings) byU[o.universitySlug]=(byU[o.universitySlug]||0)+1;
console.log(JSON.stringify(byU,null,1));
