import { Sparkles } from "lucide-react";
import type { Day } from "@/data/types";
import { getAccommodation } from "@/data/accommodations";
import { estimatedDayTotalForTwo } from "@/lib/budget";
import { formatLongDate } from "@/lib/date";
import { days } from "@/data/days";
import ActivityCard from "./ActivityCard";
import TransportCard from "./TransportCard";
import AccommodationCard from "./AccommodationCard";
import BudgetBadge from "./BudgetBadge";
import HeroWave from "./HeroWave";

/**
 * Affiche le contenu complet d'un jour : en-tête, transport, hébergement,
 * timeline verticale des activités et budget estimé.
 */
export default function DayTimeline({ day }: { day: Day }) {
  const accommodation = getAccommodation(day.accommodationId);
  const estimated = estimatedDayTotalForTwo(day);

  return (
    <div className="space-y-4">
      {/* En-tête du jour */}
      <header className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sea via-sea to-turquoise p-5 text-white shadow-card">
        <HeroWave />
        <div className="relative">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-2xl ring-1 ring-inset ring-white/25 backdrop-blur-sm">
              {day.emoji}
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/85">
                Jour {day.dayNumber} · {day.city}
              </p>
              <p className="text-[11px] text-white/70 first-letter:uppercase">
                {formatLongDate(day.date)}
              </p>
            </div>
          </div>

          <h1 className="mt-3 font-display text-[26px] font-bold leading-tight">
            {day.title}
          </h1>

          {/* Progression du voyage : un point par jour */}
          <div className="mt-4 flex items-center gap-1.5" aria-hidden>
            {days.map((d) => (
              <span
                key={d.id}
                className={
                  d.dayNumber === day.dayNumber
                    ? "h-1.5 w-5 rounded-full bg-white"
                    : d.dayNumber < day.dayNumber
                    ? "h-1.5 w-1.5 rounded-full bg-white/80"
                    : "h-1.5 w-1.5 rounded-full bg-white/30"
                }
              />
            ))}
          </div>
        </div>
      </header>

      <BudgetBadge estimatedForTwo={estimated} className="w-full justify-start" />

      {day.transport && <TransportCard transport={day.transport} />}

      {accommodation && <AccommodationCard accommodation={accommodation} />}

      {/* Plan de base : itinéraire recommandé du jour */}
      <section>
        <div className="mb-3 px-1">
          <h2 className="font-display text-lg font-semibold text-ink">Plan de base</h2>
          <p className="text-xs text-muted">L'itinéraire recommandé pour la journée.</p>
        </div>
        <ol className="relative space-y-4 border-l-2 border-line pl-5">
          {day.activities.map((activity) => (
            <li key={activity.id} className="relative">
              <span
                className="absolute -left-[27px] top-5 h-3 w-3 rounded-full border-2 border-night bg-turquoise shadow"
                aria-hidden
              />
              <ActivityCard activity={activity} />
            </li>
          ))}
        </ol>
      </section>

      {/* Extras : activités & loisirs en option */}
      {day.extras && day.extras.length > 0 && (
        <section className="rounded-2xl border border-dashed border-turquoise/30 bg-turquoise/[0.04] p-4">
          <div className="mb-3 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-turquoise" aria-hidden />
            <div>
              <h2 className="font-display text-lg font-semibold text-ink">
                Envie de plus&nbsp;?
              </h2>
              <p className="text-xs text-muted">
                Activités &amp; loisirs en option, à piocher selon l'humeur et le budget.
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {day.extras.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        </section>
      )}

      <p className="px-1 pb-2 text-center text-xs text-muted/70">
        Budget indicatif : {day.budgetEstimate}
      </p>
    </div>
  );
}
