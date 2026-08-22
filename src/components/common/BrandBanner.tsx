import { campusImage, universityLogo } from "@/lib/assets";
import studyPhoto from "@/assets/blog/banner-student-study.jpg";
import careerPhoto from "@/assets/blog/banner-student-career.jpg";
import admissionPhoto from "@/assets/blog/banner-student-admission.jpg";

const brandLogoSrc = "/degreekhojo-logo.png";

const stockPhotos: Record<string, string> = {
  "study-guides": studyPhoto,
  "career-growth": careerPhoto,
  "admission-guidance": admissionPhoto,
  "fees-scholarships": studyPhoto,
};

/** Deterministic stock photo for a blog that has no university campus image. */
export function bannerPhoto(categorySlug: string | undefined, slug: string): string {
  const byCategory = categorySlug ? stockPhotos[categorySlug] : undefined;
  if (byCategory) return byCategory;
  const pool = [studyPhoto, careerPhoto, admissionPhoto];
  const i = slug.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % pool.length;
  return pool[i]!;
}

/**
 * Splits a headline the way our designed banners do: the part before the first
 * `:` or `–` stays white, the rest is highlighted in gold.
 */
export function splitHeadline(title: string): { lead: string; highlight?: string } {
  const m = title.match(/^(.*?)[:–—-]\s+(.*)$/);
  if (!m) return { lead: title };
  return { lead: m[1]!.trim(), highlight: m[2]!.trim() };
}

function LogoChip({ src, alt, compact = false }: { src: string; alt: string; compact?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-lg bg-white shadow-sm ${compact ? "px-1.5 py-1" : "px-2.5 py-1.5"}`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={compact ? "h-4 w-auto object-contain" : "h-6 w-auto object-contain sm:h-8"}
      />
    </span>
  );
}

export interface BrandBannerProps {
  title: string;
  /** Small pills under the headline. */
  pills?: undefined | string[];
  /** Right-hand photo (campus or student). */
  photo?: undefined | string;
  /** Optional partner logo shown next to the Degreekhojo logo. */
  partnerLogo?: undefined | string;
  partnerName?: undefined | string;
  /** Campus strip used by comparison banners (3–4 images). */
  campusStrip?: undefined | string[];
  /** Card-sized rendering used in blog listings. */
  compact?: boolean;
  className?: string;
}

/**
 * Brand banner used as the hero artwork on blog and comparison pages.
 * Recreates our designed banner concept (navy panel + Degreekhojo logo +
 * gold-highlighted headline + pills) with real page data, so every page gets a
 * consistent, on-brand banner.
 */
export function BrandBanner({
  title,
  pills = [],
  photo,
  partnerLogo,
  partnerName,
  campusStrip,
  compact = false,
  className = "",
}: BrandBannerProps) {
  const { lead, highlight } = splitHeadline(title);
  const strip = campusStrip?.filter(Boolean).slice(0, 4) ?? [];

  return (
    <div
      className={`relative isolate overflow-hidden ${compact ? "" : "rounded-2xl border border-border"} bg-[#0b1f4b] ${className}`}
    >
      {/* Right-hand imagery */}
      {strip.length > 0 ? (
        <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 sm:grid-cols-4">
          {strip.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover opacity-60"
            />
          ))}
        </div>
      ) : photo ? (
        <img
          src={photo}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className={`absolute inset-y-0 right-0 h-full w-[58%] object-cover object-[50%_28%] ${compact ? "" : "hidden sm:block"}`}
        />
      ) : null}

      {/* Navy wash so the headline always stays readable */}
      <div
        aria-hidden="true"
        className={
          strip.length > 0
            ? "absolute inset-0 bg-[#0b1f4b]/80"
            : "absolute inset-0 bg-gradient-to-r from-[#0b1f4b] from-40% via-[#0b1f4b]/85 via-60% to-transparent to-90%"
        }
      />
      <span
        aria-hidden="true"
        className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-[#f2b021]/10"
      />

      <div
        className={
          compact
            ? "relative flex h-full max-w-[64%] flex-col justify-center px-4 py-4"
            : "relative px-5 py-6 sm:max-w-[62%] sm:px-8 sm:py-9"
        }
      >
        <div className="flex flex-wrap items-center gap-2">
          <LogoChip src={brandLogoSrc} alt="Degreekhojo" compact={compact} />
          {partnerLogo && <LogoChip src={partnerLogo} alt={partnerName ?? ""} compact={compact} />}
        </div>

        <h2
          className={
            compact
              ? "mt-2.5 line-clamp-3 font-display text-[0.8rem] font-extrabold leading-snug text-white"
              : "mt-5 font-display text-xl font-extrabold leading-tight text-white sm:text-3xl"
          }
        >
          {lead}
          {highlight && (
            <>
              <br />
              <span className="text-[#f2b021]">{highlight}</span>
            </>
          )}
        </h2>

        {!compact && pills.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {pills.map((p) => (
              <li
                key={p}
                className="rounded-full border border-[#f2b021]/60 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-[#f2b021] sm:text-[0.7rem]"
              >
                {p}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}


/** Blog-page banner: campus photo when the blog belongs to a university. */
export function BlogBanner({
  title,
  categorySlug,
  slug,
  universitySlug,
  universityName,
  pills,
  compact = false,
}: {
  title: string;
  categorySlug?: undefined | string;
  slug: string;
  universitySlug?: undefined | string;
  universityName?: undefined | string;
  pills?: undefined | string[];
  compact?: boolean;
}) {
  const campus = universitySlug ? campusImage(universitySlug) : undefined;
  return (
    <BrandBanner
      title={title}
      photo={campus ?? bannerPhoto(categorySlug, slug)}
      partnerLogo={universitySlug ? universityLogo(universitySlug) : undefined}
      partnerName={universityName}
      pills={pills ?? ["UGC Entitled Degree", "Flexible Learning", "Career Focused"]}
      compact={compact}
      className={compact ? "h-full" : ""}
    />
  );
}
