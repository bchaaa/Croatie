"use client";

import { useState } from "react";
import { ChevronDown, Lightbulb, Clock, Star } from "lucide-react";
import { cn, formatEUR } from "@/lib/utils";
import type { Activity } from "@/data/types";
import {
  TypeBadge,
  MapsButton,
  BookButton,
  MustBookBadge,
  StudentBadge,
} from "./ui";
import BookingCompare from "./BookingCompare";

function priceLabel(pricePerPerson: number, priceNote?: string) {
  if (pricePerPerson <= 0) {
    return priceNote ?? "Gratuit";
  }
  return `${formatEUR(pricePerPerson)}/pers · ${formatEUR(pricePerPerson * 2)} pour deux`;
}

export default function ActivityCard({ activity }: { activity: Activity }) {
  const [showTips, setShowTips] = useState(false);
  const [showAlts, setShowAlts] = useState(false);

  const hasAlternatives = (activity.alternatives?.length ?? 0) > 0;
  const hasBookingOptions = (activity.bookingOptions?.length ?? 0) > 0;

  return (
    <article
      className={cn(
        "rounded-2xl border bg-card p-4 shadow-soft transition-shadow",
        activity.mustDo ? "border-turquoise/40" : "border-line"
      )}
    >
      {/* En-tête : badges */}
      <div className="mb-2 flex flex-wrap items-center gap-1.5">
        <TypeBadge type={activity.type} />
        {activity.mustDo && (
          <span className="inline-flex items-center gap-1 rounded-full bg-turquoise/15 px-2.5 py-0.5 text-[11px] font-semibold text-turquoise">
            <Star className="h-3 w-3 fill-current" aria-hidden />
            Incontournable
          </span>
        )}
        {activity.mustBook && <MustBookBadge />}
        {activity.studentDiscount && <StudentBadge />}
      </div>

      {/* Titre */}
      <h3 className="font-display text-lg font-semibold leading-tight text-ink">
        {activity.name}
      </h3>

      {/* Métadonnées prix + durée */}
      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
        <span className="font-semibold text-turquoise">
          {priceLabel(activity.pricePerPerson, activity.priceNote)}
        </span>
        {activity.durationMinutes ? (
          <span className="inline-flex items-center gap-1 text-muted">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            {formatDuration(activity.durationMinutes)}
          </span>
        ) : null}
      </div>

      {/* Description */}
      {activity.description && (
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {activity.description}
        </p>
      )}
      {activity.address && (
        <p className="mt-1 text-xs text-muted/70">{activity.address}</p>
      )}

      {/* Actions */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {activity.mapsUrl && <MapsButton url={activity.mapsUrl} />}
        {!hasBookingOptions && activity.bookingUrl && (
          <BookButton url={activity.bookingUrl} />
        )}
        {activity.tips && (
          <button
            type="button"
            onClick={() => setShowTips((v) => !v)}
            className="inline-flex items-center gap-1 rounded-full bg-elevated px-3 py-1.5 text-xs font-semibold text-sand transition-colors hover:bg-elevated/70"
            aria-expanded={showTips}
          >
            <Lightbulb className="h-3.5 w-3.5" aria-hidden />
            Astuce
            <ChevronDown
              className={cn("h-3.5 w-3.5 transition-transform", showTips && "rotate-180")}
              aria-hidden
            />
          </button>
        )}
      </div>

      {/* Comparaison des offres de réservation */}
      {hasBookingOptions && (
        <div className="mt-2">
          <BookingCompare options={activity.bookingOptions!} />
        </div>
      )}

      {/* Tips repliable */}
      {activity.tips && showTips && (
        <div className="mt-2 animate-fade-in rounded-xl bg-sand/10 p-3 text-sm leading-relaxed text-sand">
          {activity.tips}
        </div>
      )}

      {/* Alternatives repliables */}
      {hasAlternatives && (
        <div className="mt-3 border-t border-line pt-3">
          <button
            type="button"
            onClick={() => setShowAlts((v) => !v)}
            className="flex w-full items-center justify-between text-xs font-semibold text-turquoise"
            aria-expanded={showAlts}
          >
            <span>
              Alternatives ({activity.alternatives!.length})
            </span>
            <ChevronDown
              className={cn("h-4 w-4 transition-transform", showAlts && "rotate-180")}
              aria-hidden
            />
          </button>

          {showAlts && (
            <ul className="mt-2 space-y-2 animate-fade-in">
              {activity.alternatives!.map((alt) => (
                <li
                  key={alt.id}
                  className="rounded-xl bg-elevated/60 p-3 text-sm"
                >
                  <div className="mb-1 flex items-center gap-1.5">
                    <TypeBadge type={alt.type} />
                  </div>
                  <p className="font-semibold text-ink">{alt.name}</p>
                  <p className="text-xs font-medium text-turquoise">
                    {priceLabel(alt.pricePerPerson, alt.priceNote)}
                  </p>
                  {alt.description && (
                    <p className="mt-1 text-xs text-muted">{alt.description}</p>
                  )}
                  {alt.mapsUrl && (
                    <div className="mt-2">
                      <MapsButton url={alt.mapsUrl} />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </article>
  );
}

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h}h` : `${h}h${String(m).padStart(2, "0")}`;
}
