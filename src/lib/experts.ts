/**
 * Photos of the Degreekhojo editorial team.
 *
 * Kept separate from `src/lib/content.ts` so the author records stay plain
 * data and only the UI layer pulls in the image bundles.
 */
import arjun from "@/assets/experts/arjun-mehta.webp";
import kartik from "@/assets/experts/kartik-ahuja.webp";
import neha from "@/assets/experts/neha-verma.webp";
import ritika from "@/assets/experts/ritika-sharma.webp";

const photos: Record<string, string> = {
  "arjun-mehta": arjun,
  "kartik-ahuja": kartik,
  "neha-verma": neha,
  "ritika-sharma": ritika,
};

/** Portrait for an author slug, when we have shot one. */
export const expertPhoto = (slug: string): string | undefined => photos[slug];
