import type { ErrorDetails, ExperienceDetails, FoodDetails, StayDetails } from "@/lib/types";
import { formatDayLabel, formatRange, formatSpan } from "@/lib/dates";
import { ClockIcon, ImageIcon, LogoMark, RetryIcon } from "./icons";

// Phone: cards stack at up to 340px wide. Desktop (lg+): each card fills its grid column at equal height.
const cardShell = "w-full max-w-[340px] lg:h-full lg:max-w-none overflow-hidden rounded-2xl bg-white shadow-[0_6px_20px_rgba(0,0,0,0.08)]";

/** Stay — wide banner on top, logo top-left, dates are the biggest text, coral top border. */
export function StayCard({ d }: { d: StayDetails }) {
  return (
    <article className={`${cardShell} border-t-4 border-coral`} aria-label={`Stay: ${d.listingTitle}`}>
      <div className="relative flex h-36 flex-col items-center justify-center gap-1 bg-neutral-200 text-neutral-500">
        <span className="absolute left-3 top-3 grid h-8 w-8 place-items-center rounded-lg bg-white text-coral shadow-sm">
          <LogoMark className="h-5 w-5" />
        </span>
        <ImageIcon className="h-6 w-6" />
        <span className="text-[11px]">Listing photo</span>
      </div>
      <div className="space-y-1 p-4">
        <p className="text-2xl font-bold tracking-tight">{formatRange(d.checkIn, d.checkOut)}</p>
        <p className="text-sm font-medium text-muted">{formatSpan(d.checkIn, d.checkOut)}</p>
        <p className="pt-2 text-sm font-semibold">{d.listingTitle}</p>
        <p className="text-xs text-muted">{d.destination}</p>
        <p className="pt-2 text-base">
          <span className="font-bold">${d.nightlyPriceUsd} USD</span>
          <span className="text-muted"> / night</span>
        </p>
        <p className="pt-1 text-xs leading-relaxed text-neutral-700">{d.description}</p>
      </div>
    </article>
  );
}

/** Experience — tall strip on the left, activity name is the biggest text, purple day labels. */
export function ExperienceCard({ d }: { d: ExperienceDetails }) {
  return (
    <article className={`${cardShell} flex`} aria-label={`Experience: ${d.activityName}`}>
      <div className="flex w-[88px] shrink-0 flex-col items-center justify-center gap-1 bg-neutral-200 text-neutral-500">
        <ImageIcon className="h-5 w-5" />
        <span className="text-[11px]">Photo</span>
      </div>
      <div className="min-w-0 flex-1 p-4">
        <p className="text-lg font-bold leading-snug tracking-tight">{d.activityName}</p>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
          <ClockIcon className="h-3.5 w-3.5" />
          {d.duration}
          {d.soldOut && (
            <span className="ml-1 rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-neutral-600">
              Sold out
            </span>
          )}
        </p>
        <ul className="mt-3 space-y-3 border-t border-neutral-200 pt-3">
          {d.dayPlan.map((entry) => (
            <li key={entry.day}>
              <span className="inline-block rounded bg-violet-100 px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-violet-700">
                {formatDayLabel(entry.day)}
              </span>
              <p className="mt-1 text-xs leading-relaxed text-neutral-700">{entry.plan}</p>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

/** Food — small round thumbnail top right, restaurant name is the biggest text, amber meal/price label. */
export function FoodCard({ d }: { d: FoodDetails }) {
  return (
    <article className={`${cardShell} p-4`} aria-label={`Food: ${d.restaurantName}`}>
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-base font-bold leading-snug tracking-tight">{d.restaurantName}</p>
          <span className="mt-1.5 inline-block rounded-md bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-800">
            {d.mealType} · {d.priceRange}
          </span>
        </div>
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-neutral-200 text-neutral-500">
          <ImageIcon className="h-4 w-4" />
        </div>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-neutral-700">{d.description}</p>
    </article>
  );
}

/** Error bubble — no image, the message is the biggest text, plain white and grey. */
export function ErrorBubble({ d, onRetry, disabled }: { d: ErrorDetails; onRetry: () => void; disabled?: boolean }) {
  return (
    <div role="alert" className={`${cardShell} p-4`}>
      <p className="text-sm leading-relaxed">{d.message}</p>
      <div className="mt-3 flex justify-end">
        <button
          type="button"
          onClick={onRetry}
          disabled={disabled}
          className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-3.5 py-2 text-xs font-semibold hover:bg-neutral-50 active:scale-[0.97] disabled:opacity-50"
        >
          <RetryIcon className="h-3.5 w-3.5" />
          {d.buttonLabel}
        </button>
      </div>
    </div>
  );
}
