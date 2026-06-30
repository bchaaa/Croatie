import { Sparkles } from "lucide-react";
import type { Day } from "@/data/types";
import { getAccommodation } from "@/data/accommodations";
import { estimatedDayTotalForTwo } from "@/lib/budget";
import { formatLongDate } from "@/lib/date";
import ActivityCard from "./ActivityCard";
import TransportCard from "./TransportCard";
import AccommodationCard from "./AccommodationCard";
import BudgetBadge from "./BudgetBadge";

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
      <header className="rounded-2xl bg-gradient-to-br from-sea to-turquoise p-5 text-white shadow-card">
        <p className="text-sm font-medium uppercase tracking-wide text-white/80">
          Jour {day.dayNumber} / 8 — {day.city}
        </p>
        <h1 className="mt-1 font-display text-2xl font-bold leading-tight">
          {day.emoji} {day.title}
        </h1>
        <p className="mt-1 text-sm text-white/80 first-letter:uppercase">
          {formatLongDate(day.date)}
        </p>
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
