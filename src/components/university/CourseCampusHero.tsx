import { approvalIcon, campusImage, universityLogo } from "@/lib/assets";
import type { University } from "@/data";

/**
 * Campus banner used at the top of a university course page.
 * Renders the university's campus photo with a gradient overlay, the logo
 * chip, the programme name and the approval icons. Falls back to a clean
 * text-only card when we have no campus photo for the university.
 */
export function CourseCampusHero({
  university,
  programmeName,
  level,
}: {
  university: University;
  programmeName: string;
  level?: string;
}) {
  const campus = campusImage(university.slug);
  const logo = universityLogo(university.slug);

  return (
    <section className="relative overflow-hidden rounded-2xl border border-border bg-card">
      {campus ? (
        <>
          <img
            src={campus}
            alt={`${university.name} campus`}
            loading="eager"
            decoding="async"
            className="h-40 w-full object-cover sm:h-56 lg:h-64"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/10"
          />
        </>
      ) : null}

      <div
        className={
          campus
            ? "absolute inset-x-0 bottom-0 p-4 sm:p-6"
            : "bg-surface-2 p-4 sm:p-6"
        }
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl border border-border bg-card p-1.5 sm:h-16 sm:w-16">
            {logo ? (
              <img
                src={logo}
                alt={`${university.name} logo`}
                className="max-h-full max-w-full object-contain"
              />
            ) : (
              <span className="text-center font-display text-xs font-extrabold text-brand">
                {university.shortName}
              </span>
            )}
          </span>
          <div className="min-w-0">
            <p
              className={`truncate font-display text-base font-extrabold sm:text-xl ${
                campus ? "text-white" : "text-foreground"
              }`}
            >
              {university.name}
            </p>
            <p
              className={`truncate text-xs sm:text-sm ${
                campus ? "text-white/85" : "text-muted-foreground"
              }`}
            >
              {[programmeName, level, [university.city, university.state].filter(Boolean).join(", ")]
                .filter(Boolean)
                .join(" · ")}
            </p>
          </div>
        </div>

        {university.approvals.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-2">
            {university.approvals.slice(0, 6).map((a) => {
              const icon = approvalIcon(a.body);
              return (
                <li
                  key={a.body}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card/95 px-2 py-1"
                >
                  {icon && (
                    <img
                      src={icon}
                      alt=""
                      aria-hidden="true"
                      className="h-5 w-auto max-w-9 object-contain"
                    />
                  )}
                  <span className="text-[0.68rem] font-bold sm:text-xs" title={a.status}>
                    {a.body}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
