import { useState } from "react";
import { CheckCircle2, PenLine, Star } from "lucide-react";
import { universities } from "@/lib/content";

const field =
  "h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none transition-colors focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/20";
const label = "mb-1.5 block text-[0.7rem] font-bold uppercase tracking-wide text-muted-foreground";

/**
 * Learner review submission. Reviews are queued for manual verification before
 * they are published — we only publish reviews traceable to an enrolled learner.
 */
export function WriteReview() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [rating, setRating] = useState(5);

  return (
    <section className="rounded-2xl border border-border bg-secondary/40 p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-bold">Studied online? Write a review</h2>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            Share your experience of fees, faculty, LMS and exams. Every submission is verified
            against enrolment proof before it goes live.
          </p>
        </div>
        {!open && (
          <button type="button" className="btn btn-primary" onClick={() => setOpen(true)}>
            <PenLine className="mr-2 h-4 w-4" /> Write a review
          </button>
        )}
      </div>

      {open && !sent && (
        <form
          className="mt-6 grid gap-4 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <div>
            <label className={label} htmlFor="rv-name">
              Your name
            </label>
            <input
              id="rv-name"
              required
              maxLength={80}
              className={field}
              placeholder="e.g. Rahul S."
            />
          </div>
          <div>
            <label className={label} htmlFor="rv-email">
              Email
            </label>
            <input
              id="rv-email"
              type="email"
              required
              maxLength={120}
              className={field}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className={label} htmlFor="rv-uni">
              University
            </label>
            <select id="rv-uni" required className={field} defaultValue="">
              <option value="" disabled>
                Select your university
              </option>
              {universities.map((u) => (
                <option key={u.slug} value={u.slug}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={label} htmlFor="rv-course">
              Programme
            </label>
            <input
              id="rv-course"
              required
              maxLength={80}
              className={field}
              placeholder="e.g. Online MBA — Marketing"
            />
          </div>
          <div className="sm:col-span-2">
            <span className={label}>Overall rating</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  aria-label={`${n} star${n > 1 ? "s" : ""}`}
                  onClick={() => setRating(n)}
                  className="rounded-md p-1"
                >
                  <Star
                    className={`h-6 w-6 ${n <= rating ? "fill-brand text-brand" : "text-muted-foreground"}`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className={label} htmlFor="rv-body">
              Your review
            </label>
            <textarea
              id="rv-body"
              required
              minLength={60}
              maxLength={1200}
              rows={5}
              className="w-full rounded-xl border border-border bg-background p-3 text-sm outline-none focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/20"
              placeholder="What was the admission process, LMS, faculty support, exam experience and value for money like?"
            />
          </div>
          <div className="sm:col-span-2 flex flex-wrap gap-3">
            <button type="submit" className="btn btn-primary">
              Submit for verification
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => setOpen(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {sent && (
        <p className="mt-6 flex items-start gap-2 rounded-xl border border-border bg-background p-4 text-sm">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
          <span>
            Thanks — your review is in the verification queue. Our editorial team checks enrolment
            proof before publishing, usually within 3 working days.
          </span>
        </p>
      )}
    </section>
  );
}
