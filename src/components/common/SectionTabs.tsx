import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";
import type { PageGroup } from "@/lib/pageGroups";

type Ctx = {
  groups: readonly PageGroup[];
  active: string;
  showAll: boolean;
  open: (id: string) => void;
};

const SectionTabsContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "dk:read-full-page";

function useTabs() {
  const ctx = useContext(SectionTabsContext);
  if (!ctx) throw new Error("SectionPanel must be used inside SectionTabs");
  return ctx;
}

/**
 * Tabbed reading experience: the sticky bar under the header shows the group
 * names, and one group is visible at a time. Every group stays in the served
 * HTML — inactive panels are hidden with CSS only, so what search engines read
 * is identical to the long-scroll version.
 */
export function SectionTabs({
  groups,
  children,
}: {
  groups: readonly PageGroup[];
  children: ReactNode;
}) {
  const [active, setActive] = useState(groups[0]?.id ?? "");
  const [showAll, setShowAll] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);

  const open = useCallback(
    (id: string) => {
      setActive((prev) => {
        if (prev !== id) {
          const label = groups.find((g) => g.id === id)?.label ?? id;
          track("section_view", { section: label });
        }
        return id;
      });
    },
    [groups],
  );

  // Restore the "read the full page" preference.
  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") setShowAll(true);
    } catch {
      /* storage unavailable */
    }
  }, []);

  // Deep links: a hash may point at a group id or at any section inside a group.
  useEffect(() => {
    const applyHash = () => {
      const raw = decodeURIComponent(window.location.hash.replace("#", ""));
      if (!raw) return;
      if (groups.some((g) => g.id === raw)) {
        open(raw);
        return;
      }
      const el = document.getElementById(raw);
      const panel = el?.closest<HTMLElement>("[data-panel]");
      if (panel?.dataset["panel"]) {
        open(panel.dataset["panel"]);
        window.requestAnimationFrame(() =>
          el?.scrollIntoView({ behavior: "smooth", block: "start" }),
        );
      }
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, [groups, open]);

  // Keep the active chip visible inside the horizontal strip.
  useEffect(() => {
    const list = listRef.current;
    const chip = list?.querySelector<HTMLElement>(`[data-chip="${active}"]`);
    if (!list || !chip) return;
    const listRect = list.getBoundingClientRect();
    const chipRect = chip.getBoundingClientRect();
    const target =
      list.scrollLeft + (chipRect.left - listRect.left) - listRect.width / 2 + chipRect.width / 2;
    list.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, [active]);

  const select = (id: string) => {
    open(id);
    if (typeof history !== "undefined") history.replaceState(null, "", `#${id}`);
    document
      .querySelector<HTMLElement>("[data-section-tabs-top]")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = e.key === "ArrowRight" ? index + 1 : index - 1;
    const target = groups[(next + groups.length) % groups.length];
    if (!target) return;
    select(target.id);
    listRef.current
      ?.querySelector<HTMLElement>(`[data-chip="${target.id}"]`)
      ?.focus();
  };

  const toggleShowAll = () => {
    setShowAll((v) => {
      try {
        localStorage.setItem(STORAGE_KEY, v ? "0" : "1");
      } catch {
        /* storage unavailable */
      }
      return !v;
    });
  };

  const value = useMemo<Ctx>(
    () => ({ groups, active, showAll, open: select }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [groups, active, showAll],
  );

  return (
    <SectionTabsContext.Provider value={value}>
      <nav
        data-section-tabs-top
        aria-label="Page sections"
        className="sticky top-16 z-30 border-y border-border bg-card/95 backdrop-blur print:hidden lg:top-[4.5rem]"
      >
        <div className="container-page">
          <div className="flex items-center gap-3">
            <ul
              ref={listRef}
              role="tablist"
              className="-mx-1 flex flex-1 gap-2 overflow-x-auto px-1 py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {groups.map((g, i) => {
                const isActive = !showAll && g.id === active;
                return (
                  <li key={g.id} role="presentation">
                    <button
                      type="button"
                      role="tab"
                      id={`tab-${g.id}`}
                      data-chip={g.id}
                      aria-selected={isActive}
                      aria-controls={`panel-${g.id}`}
                      onClick={() => select(g.id)}
                      onKeyDown={(e) => onKeyDown(e, i)}
                      className={cn(
                        "flex min-h-11 items-center whitespace-nowrap rounded-lg px-3.5 text-[0.82rem] font-bold transition-colors sm:text-sm",
                        isActive
                          ? "bg-brand text-brand-foreground"
                          : "bg-secondary text-brand hover:bg-brand-soft",
                      )}
                    >
                      {g.label}
                    </button>
                  </li>
                );
              })}
            </ul>
            <button
              type="button"
              onClick={toggleShowAll}
              aria-pressed={showAll}
              className="hidden shrink-0 rounded-lg border border-border px-3 py-2 text-xs font-bold text-brand hover:bg-brand-soft lg:block"
            >
              {showAll ? "Show one section" : "Read the full page"}
            </button>
          </div>
        </div>
      </nav>
      {children}
      <div className="container-page pb-8 lg:hidden print:hidden">
        <button
          type="button"
          onClick={toggleShowAll}
          aria-pressed={showAll}
          className="w-full rounded-lg border border-border px-3 py-2.5 text-sm font-bold text-brand"
        >
          {showAll ? "Show one section at a time" : "Read the full page"}
        </button>
      </div>
    </SectionTabsContext.Provider>
  );
}

/** One group of sections. Always rendered; hidden with CSS when inactive. */
export function SectionPanel({
  id,
  children,
  footer = true,
}: {
  id: string;
  children: ReactNode;
  footer?: boolean;
}) {
  const { active, showAll } = useTabs();
  const isActive = showAll || active === id;
  // A group can be split into several panels when its sections are interleaved
  // with other groups; only the panel that owns the footer carries the DOM id
  // so `panel-<id>` stays unique.
  return (
    <div
      data-panel={id}
      data-active={isActive ? "true" : "false"}
      {...(footer ? { id: `panel-${id}` } : {})}
      role="tabpanel"
      aria-labelledby={`tab-${id}`}
      className="space-y-10 data-[active=false]:hidden"
    >
      {children}
      {footer && <SectionFooterNav id={id} />}
    </div>
  );
}

/** Guided "what to read next" controls at the bottom of a group. */
function SectionFooterNav({ id }: { id: string }) {
  const { groups, active, showAll, open } = useTabs();
  if (showAll) return null;
  const index = groups.findIndex((g) => g.id === id);
  if (index < 0 || active !== id) return null;
  const prev = index > 0 ? groups[index - 1] : undefined;
  const next = index < groups.length - 1 ? groups[index + 1] : undefined;
  if (!prev && !next) return null;
  return (
    <div className="rounded-2xl border border-brand/30 bg-brand-soft/40 p-4 sm:p-5 print:hidden">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
        Part {index + 1} of {groups.length} · You just finished “{groups[index]?.label}”
      </p>

      {next && (
        <>
          <p className="mt-2 text-base font-bold text-foreground">
            Next: {next.label}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Tap the button below to continue reading. Nothing is lost — you can come back any time.
          </p>
          <button
            type="button"
            onClick={() => open(next.id)}
            className="btn btn-primary mt-4 w-full justify-center"
          >
            Continue to {next.label} →
          </button>
        </>
      )}

      {!next && (
        <p className="mt-2 text-sm text-muted-foreground">
          That’s the last part of this page. Use the buttons below to revisit any section.
        </p>
      )}

      <div className="mt-4 border-t border-brand/20 pt-3">
        <p className="text-xs font-semibold text-muted-foreground">Or jump straight to:</p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {groups
            .filter((g) => g.id !== id && g.id !== next?.id)
            .map((g) => (
              <li key={g.id}>
                <button
                  type="button"
                  onClick={() => open(g.id)}
                  className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-bold text-brand hover:bg-brand-soft"
                >
                  {g.label}
                </button>
              </li>
            ))}
        </ul>
      </div>

      {prev && (
        <button
          type="button"
          onClick={() => open(prev.id)}
          className="mt-3 text-sm font-bold text-brand underline underline-offset-4"
        >
          ← Back to {prev.label}
        </button>
      )}
    </div>
  );
}

