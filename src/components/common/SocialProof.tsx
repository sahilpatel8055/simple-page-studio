import { useEffect, useMemo, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { X } from "lucide-react";
import { universities } from "@/data/universities";
import { universityLogo } from "@/lib/assets";

/**
 * Lightweight social-proof notifications ("X from Pune enrolled …").
 * Bottom-left, small footprint, timed gaps between messages, capped per
 * session, and biased to the university whose page the visitor is on.
 */

const FIRST_NAMES = [
  "Rahul",
  "Priya",
  "Aman",
  "Sneha",
  "Vikram",
  "Neha",
  "Arjun",
  "Pooja",
  "Karan",
  "Ananya",
  "Rohit",
  "Divya",
  "Sahil",
  "Meera",
  "Nikhil",
  "Ishita",
];

const CITIES = [
  "Delhi",
  "Pune",
  "Mumbai",
  "Bengaluru",
  "Hyderabad",
  "Jaipur",
  "Lucknow",
  "Chandigarh",
  "Kolkata",
  "Indore",
  "Ahmedabad",
  "Patna",
];

const ACTIONS = [
  "enrolled for",
  "applied to",
  "requested counselling for",
  "downloaded the fee structure of",
  "compared courses at",
];

const MAX_PER_SESSION = 6;
const FIRST_DELAY_MS = 14000;
const VISIBLE_MS = 6500;
const GAP_MIN_MS = 26000;
const GAP_MAX_MS = 42000;

type Proof = { slug: string; name: string; person: string; city: string; action: string };

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)] as T;

export function SocialProof() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [proof, setProof] = useState<Proof | null>(null);
  const [closed, setClosed] = useState(false);
  const shownRef = useRef(0);
  const pathRef = useRef(pathname);
  pathRef.current = pathname;

  const pool = useMemo(() => universities.filter((u) => u.name && u.slug), []);

  useEffect(() => {
    if (closed || pool.length === 0) return;
    let hideTimer: ReturnType<typeof setTimeout>;
    let nextTimer: ReturnType<typeof setTimeout>;

    const schedule = (delay: number) => {
      nextTimer = setTimeout(() => {
        if (shownRef.current >= MAX_PER_SESSION) return;
        const match = pathRef.current.match(/^\/universities\/([^/]+)/);
        const current = match ? pool.find((u) => u.slug === match[1]) : undefined;
        // On a university page, favour that university; otherwise pick any.
        const uni = current && Math.random() < 0.7 ? current : pick(pool);
        shownRef.current += 1;
        setProof({
          slug: uni.slug,
          name: uni.shortName || uni.name,
          person: pick(FIRST_NAMES),
          city: pick(CITIES),
          action: pick(ACTIONS),
        });
        hideTimer = setTimeout(() => {
          setProof(null);
          schedule(GAP_MIN_MS + Math.random() * (GAP_MAX_MS - GAP_MIN_MS));
        }, VISIBLE_MS);
      }, delay);
    };

    schedule(FIRST_DELAY_MS);
    return () => {
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, [closed, pool]);

  if (!proof || closed) return null;
  const logo = universityLogo(proof.slug);

  return (
    <div className="pointer-events-none fixed bottom-24 left-3 z-30 max-w-[17rem] sm:max-w-xs lg:bottom-6 lg:left-6">
      <div className="pointer-events-auto flex items-center gap-2.5 rounded-xl border border-border bg-card/95 px-3 py-2 shadow-lg backdrop-blur animate-in fade-in slide-in-from-bottom-2">
        {logo ? (
          <img
            src={logo}
            alt=""
            className="h-8 w-8 shrink-0 rounded-md object-contain"
            loading="lazy"
          />
        ) : (
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-secondary text-xs font-bold text-brand">
            {proof.name.slice(0, 1)}
          </span>
        )}
        <p className="min-w-0 text-[0.7rem] leading-snug text-muted-foreground">
          <span className="font-bold text-foreground">{proof.person}</span> from {proof.city}{" "}
          {proof.action} <span className="font-bold text-foreground">{proof.name}</span>
          <span className="mt-0.5 block text-[0.62rem] opacity-70">Just now</span>
        </p>
        <button
          type="button"
          aria-label="Dismiss notification"
          onClick={() => setClosed(true)}
          className="ml-auto shrink-0 rounded p-1 text-muted-foreground hover:bg-secondary"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
