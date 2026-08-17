import { useEffect, useState } from "react";
import { X, CalendarDays, Clock, ShieldCheck } from "lucide-react";
import { usePopupSurface } from "@/components/common/PopupManager";
import { getLeadContext, whatsappLink } from "@/lib/leadContext";
/** Tonight's midnight — the actual offer cut-off shown on the clock. */
function nextMidnight(now = Date.now()) {
  const d = new Date(now);
  d.setHours(24, 0, 0, 0);
  return d.getTime();
}



/** Fixed 3-day admission cycle anchored to a stable epoch, in the user's local time. */
const CYCLE_DAYS = 3;
const ANCHOR = new Date(2026, 0, 1).getTime();

/** Next midnight that lands on the rolling 3-day cycle. */
function nextDeadline(now = Date.now()) {
  const midnight = new Date(now);
  midnight.setHours(0, 0, 0, 0);
  const dayMs = 86400000;
  const daysSinceAnchor = Math.floor((midnight.getTime() - ANCHOR) / dayMs);
  const offset = ((CYCLE_DAYS - (daysSinceAnchor % CYCLE_DAYS)) % CYCLE_DAYS) || CYCLE_DAYS;
  return midnight.getTime() + offset * dayMs;
}

const pad = (n: number) => String(n).padStart(2, "0");

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function AdmissionPopup({ onClose }: { onClose: () => void }) {
  const { openCounselling } = usePopupSurface();
  const [deadline, setDeadline] = useState(() => nextMidnight());
  const [left, setLeft] = useState(() => nextMidnight() - Date.now());
  const [ctx, setCtx] = useState<{ universityName?: string; courseLabel?: string }>({});

  useEffect(() => setCtx(getLeadContext()), []);

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      let end = deadline;
      // Countdown finished — roll over to the following midnight automatically.
      if (now >= end) {
        end = nextMidnight(now);
        setDeadline(end);
      }
      setLeft(end - now);
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [deadline]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const total = Math.max(0, Math.floor(left / 1000));
  const hrs = Math.floor(total / 3600);
  const mins = Math.floor((total % 3600) / 60);
  const secs = total % 60;

  const d = new Date(nextDeadline());
  const lastDate = `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
  const dayFraction = Math.min(1, Math.max(0, total / 86400));
  const headline = ctx.universityName
    ? `${ctx.universityName} 2026 admissions closing soon.`
    : ctx.courseLabel
      ? `${ctx.courseLabel} 2026 batch admissions closing soon.`
      : "2026 Batch Admissions Closing Soon.";

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center overflow-y-auto bg-black/55 p-3 backdrop-blur-sm sm:p-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="2026 batch admissions closing soon"
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-[#7f1813]/25 bg-white shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-[#3b0b08] shadow ring-1 ring-black/5 transition-colors hover:bg-white"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative bg-gradient-to-br from-[#fdf3f3] via-white to-[#fbeaea] px-5 pb-4 pt-5 sm:px-7 sm:pt-6">
          {/* Girl artwork — decorative, sits at the right on all sizes */}
          <img
            src="/banner-girl.png"
            alt=""
            aria-hidden="true"
            loading="lazy"
            width={1024}
            height={1536}
            className="pointer-events-none absolute right-1 top-4 h-[30%] w-auto select-none object-contain object-top sm:top-5 sm:h-[34%]"
          />

          <div className="relative z-10 w-[62%] sm:w-[64%]">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#7f1813]/10 px-3 py-1.5 text-[0.68rem] font-bold text-[#7f1813] sm:text-[0.75rem]">
              <CalendarDays className="h-3.5 w-3.5" /> Last Date: {lastDate}
            </span>

            <h2 className="mt-3 break-words font-display text-[1.15rem] font-extrabold leading-[1.18] text-[#111] sm:text-2xl">
              <span className="block text-[#7f1813]">Don&apos;t Miss!</span>
              {headline}
            </h2>
          </div>

          <div className="relative z-10 mt-4">
            <div className="rounded-2xl bg-white/95 p-3 shadow-[0_10px_30px_-18px_rgba(127,24,19,0.7)] ring-1 ring-[#7f1813]/12 sm:p-4">
              <p className="text-[0.72rem] font-bold text-[#333] sm:text-[0.85rem]">
                Offer ends tonight at <span className="text-[#7f1813]">12:00 AM</span>
              </p>
              <div className="mt-2.5 flex items-center gap-1.5 sm:gap-2">
                {[
                  { v: pad(hrs), l: "HRS" },
                  { v: pad(mins), l: "MINS" },
                  { v: pad(secs), l: "SECS" },
                ].map((u, i) => (
                  <div key={u.l} className="flex items-center gap-1.5 sm:gap-2">
                    {i > 0 && (
                      <span className="animate-pulse text-base font-extrabold text-[#7f1813]">:</span>
                    )}
                    <div className="relative min-w-[2.6rem] overflow-hidden rounded-xl bg-gradient-to-b from-[#a11f19] to-[#69100c] px-2 py-1 text-center text-white shadow-lg ring-1 ring-white/15 sm:min-w-[3rem] sm:py-1.5">
                      <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-white/12" />
                      <span className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-black/25" />
                      <span className="relative block font-display text-base font-extrabold leading-none tabular-nums sm:text-xl">
                        {u.v}
                      </span>
                      <span className="relative mt-0.5 block text-[0.5rem] font-bold tracking-wider text-white/80 sm:text-[0.58rem]">
                        {u.l}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[#7f1813]/12">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#a11f19] to-[#e0a24a] transition-[width] duration-1000 ease-linear"
                  style={{ width: `${Math.round(dayFraction * 100)}%` }}
                />
              </div>
              <p className="mt-2.5 flex items-center gap-1.5 border-t border-[#7f1813]/10 pt-2.5 text-[0.7rem] font-semibold text-[#555] sm:text-[0.78rem]">
                <Clock className="h-3.5 w-3.5 text-[#7f1813]" /> Hurry! Seats are filling fast.
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-4 flex w-full flex-col gap-2 sm:mt-5">
            <button
              type="button"
              onClick={() => {
                onClose();
                openCounselling();
              }}
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#7f1813] text-[0.95rem] font-bold text-white shadow-lg transition-opacity hover:opacity-90"
            >
              Secure Your Seat Now <span aria-hidden="true">›</span>
            </button>
            <a
              href={whatsappLink(
                ctx.universityName
                  ? `Hi, I want 2026 admission details and fees for ${ctx.universityName}.`
                  : "Hi, I want 2026 admission details and fees.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[#7f1813]/25 bg-white text-[0.9rem] font-bold text-[#7f1813]"
            >
              <img src="/whatsapp-icon.png" alt="" className="h-5 w-5 object-contain" /> Get fees on WhatsApp
            </a>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 border-t border-[#7f1813]/10 bg-[#fdf3f3] px-4 py-3 text-center">
          <span className="inline-flex items-center gap-1.5 text-[0.72rem] font-bold text-[#7f1813] sm:text-[0.8rem]">
            <ShieldCheck className="h-4 w-4" /> Verified information
          </span>
          <span className="h-4 w-px bg-[#7f1813]/20" />
          <span className="text-[0.72rem] font-semibold text-[#555] sm:text-[0.8rem]">
            Trusted by thousands of learners
          </span>
        </div>
      </div>
    </div>
  );
}
