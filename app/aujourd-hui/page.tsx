"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PartyPopper, Plane, CalendarHeart } from "lucide-react";
import { getTripPhase, todayISO, TRIP_START, formatLongDate, type TripPhase } from "@/lib/date";
import { getDayByNumber, days } from "@/data/days";
import DayTimeline from "@/components/DayTimeline";
import HeroWave from "@/components/HeroWave";
import { cityGradient } from "@/lib/cities";

export default function AujourdhuiPage() {
  // La phase dépend de la date du device → calcul côté client après montage
  // pour éviter tout décalage d'hydratation.
  const [phase, setPhase] = useState<TripPhase | null>(null);

  useEffect(() => {
    setPhase(getTripPhase(todayISO()));
  }, []);

  if (!phase) {
    return (
      <div className="space-y-4">
        <div className="h-32 animate-pulse rounded-2xl bg-card" />
        <div className="h-20 animate-pulse rounded-2xl bg-card/70" />
        <div className="h-40 animate-pulse rounded-2xl bg-card/50" />
      </div>
    );
  }

  if (phase.phase === "before") {
    return <BeforeTrip daysUntil={phase.daysUntil} />;
  }

  if (phase.phase === "after") {
    return <AfterTrip />;
  }

  const day = getDayByNumber(phase.dayNumber);
  if (!day) return <AfterTrip />;
  return <DayTimeline day={day} />;
}

function BeforeTrip({ daysUntil }: { daysUntil: number }) {
  return (
    <div className="space-y-5">
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sea via-sea to-turquoise p-6 text-center text-white shadow-card">
        <HeroWave />
        <div className="relative">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-inset ring-white/25 backdrop-blur-sm">
            <Plane className="h-7 w-7" aria-hidden />
          </span>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
            Avant le départ
          </p>
          <p className="mt-2 font-display text-6xl font-bold leading-none">
            J-{daysUntil}
          </p>
          <p className="mt-3 text-sm text-white/90">
            Rendez-vous le{" "}
            <span className="font-semibold first-letter:uppercase">
              {formatLongDate(TRIP_START)}
            </span>{" "}
            à Split 🇭🇷
          </p>
        </div>
      </section>

      <section>
        <div className="mb-2 flex items-center gap-2 px-1 text-turquoise">
          <CalendarHeart className="h-5 w-5" aria-hidden />
          <h2 className="font-display text-lg font-semibold">Aperçu du voyage</h2>
        </div>
        <ul className="space-y-2">
          {days.map((d) => (
            <li key={d.id}>
              <Link
                href={`/jour/${d.id}`}
                className="flex items-center gap-3 rounded-2xl border border-line bg-card p-3 shadow-soft transition-colors hover:border-turquoise/40"
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${cityGradient(
                    d.city
                  )} text-lg text-white shadow-soft`}
                >
                  {d.emoji}
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-turquoise">
                    Jour {d.dayNumber} · {d.city}
                  </p>
                  <p className="truncate font-medium text-ink">{d.title}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function AfterTrip() {
  return (
    <div className="space-y-5">
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sea via-sea to-turquoise p-8 text-center text-white shadow-card">
        <HeroWave />
        <div className="relative">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-inset ring-white/25 backdrop-blur-sm">
            <PartyPopper className="h-8 w-8" aria-hidden />
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold">Voyage terminé 🎉</h1>
          <p className="mt-2 text-white/90">
            8 jours en Croatie, des souvenirs plein la tête. À refaire !
          </p>
        </div>
      </section>

      <section>
        <h2 className="mb-2 px-1 font-display text-lg font-semibold text-ink">
          Revivre le voyage
        </h2>
        <ul className="space-y-2">
          {days.map((d) => (
            <li key={d.id}>
              <Link
                href={`/jour/${d.id}`}
                className="flex items-center gap-3 rounded-2xl border border-line bg-card p-3 shadow-soft transition-colors hover:border-turquoise/40"
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${cityGradient(
                    d.city
                  )} text-lg text-white shadow-soft`}
                >
                  {d.emoji}
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-turquoise">
                    Jour {d.dayNumber} · {d.city}
                  </p>
                  <p className="truncate font-medium text-ink">{d.title}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
