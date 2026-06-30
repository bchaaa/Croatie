import Link from "next/link";
import { ChevronRight, MapPin } from "lucide-react";
import { days } from "@/data/days";
import { estimatedDayTotalForTwo } from "@/lib/budget";
import { formatShortDate } from "@/lib/date";
import { formatEUR } from "@/lib/utils";

export const metadata = {
  title: "Programme — Croatie 2026",
};

export default function ProgrammePage() {
  return (
    <div className="space-y-4">
      <header className="px-1">
        <h1 className="font-display text-2xl font-bold text-ink">Programme</h1>
        <p className="text-sm text-muted">8 jours · 1-8 juillet 2026</p>
      </header>

      <ul className="space-y-3">
        {days.map((d) => (
          <li key={d.id}>
            <Link
              href={`/jour/${d.id}`}
              className="block rounded-2xl border border-line bg-card p-4 shadow-soft transition-all hover:border-turquoise/40 hover:shadow-card active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sea to-turquoise text-xl text-white">
                  {d.emoji}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-turquoise">
                      Jour {d.dayNumber} · {formatShortDate(d.date)}
                    </p>
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted/50" aria-hidden />
                  </div>
                  <h2 className="truncate font-display text-base font-semibold text-ink">
                    {d.title}
                  </h2>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-muted">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" aria-hidden />
                      {d.city}
                    </span>
                    <span aria-hidden>·</span>
                    <span>
                      ~{formatEUR(estimatedDayTotalForTwo(d))} pour deux
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
