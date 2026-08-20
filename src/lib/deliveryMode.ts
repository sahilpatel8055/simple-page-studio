/**
 * Delivery / learning mode resolution.
 *
 * The mode a programme is actually delivered in comes from the master dataset
 * (`mode` on the university and programme records) — it is never assumed to be
 * "Online". Course structured data and any mode-dependent output must read it
 * from here so schema always matches the visible programme facts.
 */
import { allProgrammePairs, siteSlugForMasterSlug } from "@/lib/universityData";

export type DeliveryMode = "Online" | "Distance" | "Hybrid";

/** Normalises a raw dataset mode string into the modes it actually covers. */
export function normaliseMode(raw?: string | null): DeliveryMode[] {
  const m = (raw ?? "").trim().toLowerCase();
  if (!m) return [];
  if (m === "both") return ["Online", "Distance"];
  if (m.includes("hybrid") || m.includes("blended")) return ["Hybrid"];
  const distance = m.includes("distance") || m.includes("odl");
  const online = m.includes("online");
  if (distance && online) return ["Online", "Distance"];
  if (distance) return ["Distance"];
  if (online) return ["Online"];
  return [];

}

const uniq = (modes: DeliveryMode[]): DeliveryMode[] => [...new Set(modes)];

/** Modes for one university × programme pair, using the dataset records. */
export function offeringModes(universitySlug: string, programmeSlug: string): DeliveryMode[] {
  const wanted = siteSlugForMasterSlug(universitySlug) ?? universitySlug;
  const pair = allProgrammePairs().find(
    (p) =>
      p.programme.slug === programmeSlug &&
      (p.university.slug === universitySlug ||
        p.university.slug === wanted ||
        siteSlugForMasterSlug(p.university.slug) === universitySlug),
  );
  if (!pair) return [];
  const modes = normaliseMode(pair.programme.mode);
  return modes.length ? modes : normaliseMode(pair.university.mode);
}

/** Union of the modes every university uses to deliver this programme. */
export function programmeModes(programmeSlug: string): DeliveryMode[] {
  const modes = allProgrammePairs()
    .filter((p) => p.programme.slug === programmeSlug)
    .flatMap((p) => {
      const m = normaliseMode(p.programme.mode);
      return m.length ? m : normaliseMode(p.university.mode);
    });
  return uniq(modes);
}

/** Union of the modes across a set of programme slugs (course family pages). */
export function familyModes(programmeSlugs: readonly string[]): DeliveryMode[] {
  return uniq(programmeSlugs.flatMap((slug) => programmeModes(slug)));
}
