"use client";

import { useState } from "react";
import {
  Info,
  ChevronDown,
  Star,
  Clock,
  MapPin,
  Euro,
  ExternalLink,
} from "lucide-react";
import { cn, formatEUR } from "@/lib/utils";
import type { BookingOption } from "@/data/types";

/**
 * Bouton ⓘ « Comparer & réserver » : déplie un panneau comparant plusieurs
 * offres (prix, durée, lieu, avis) avec le lien de réservation de chacune.
 */
export default function BookingCompare({
  options,
}: {
  options: BookingOption[];
}) {
  const [open, setOpen] = useState(false);

  // L'offre « best » (ou la moins chère) sert de réservation rapide.
  const best =
    options.find((o) => o.best) ??
    [...options].sort((a, b) => a.pricePerPerson - b.pricePerPerson)[0];

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center gap-2">
        {/* Réservation rapide sur la meilleure offre */}
        <a
          href={best.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-coral/60 bg-coral/10 px-3 py-1.5 text-xs font-semibold text-coral transition-colors hover:bg-coral hover:text-white"
        >
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          Réserver · {best.provider.split(" (")[0]}
        </a>

        {/* Bouton info / comparaison */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded-full bg-elevated px-3 py-1.5 text-xs font-semibold text-turquoise transition-colors hover:bg-elevated/70"
          aria-expanded={open}
        >
          <Info className="h-3.5 w-3.5" aria-hidden />
          Comparer ({options.length})
          <ChevronDown
            className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")}
            aria-hidden
          />
        </button>
      </div>

      {open && (
        <div className="mt-3 animate-fade-in space-y-2">
          {options.map((o) => (
            <div
              key={o.id}
              className={cn(
                "rounded-xl border p-3",
                o.best ? "border-turquoise/50 bg-turquoise/[0.07]" : "border-line bg-elevated/50"
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold text-ink">{o.provider}</p>
                {o.best && (
                  <span className="rounded-full bg-turquoise/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-turquoise">
                    Recommandé
                  </span>
                )}
              </div>

              {/* Différenciateurs : prix / durée / lieu / avis */}
              <dl className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs">
                <Row icon={<Euro className="h-3.5 w-3.5" />}>
                  <span className="font-semibold text-turquoise">
                    {formatEUR(o.pricePerPerson)}/pers
                  </span>{" "}
                  <span className="text-muted">· {formatEUR(o.pricePerPerson * 2)} ×2</span>
                </Row>
                {o.durationLabel && (
                  <Row icon={<Clock className="h-3.5 w-3.5" />}>{o.durationLabel}</Row>
                )}
                {o.rating != null && (
                  <Row icon={<Star className="h-3.5 w-3.5 fill-current text-amber-300" />}>
                    <span className="font-semibold text-ink">{o.rating.toFixed(1)}</span>
                    {o.reviews != null && (
                      <span className="text-muted"> · {o.reviews} avis</span>
                    )}
                  </Row>
                )}
                {o.location && (
                  <Row icon={<MapPin className="h-3.5 w-3.5" />}>{o.location}</Row>
                )}
              </dl>

              {o.priceNote && (
                <p className="mt-1.5 text-xs text-muted">{o.priceNote}</p>
              )}
              {o.highlight && (
                <p className="mt-1.5 rounded-lg bg-sand/10 px-2 py-1.5 text-xs text-sand">
                  {o.highlight}
                </p>
              )}

              <a
                href={o.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-coral px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-coral/90"
              >
                <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                Réserver sur {o.provider.split(" (")[0]}
              </a>
            </div>
          ))}

          <p className="px-1 text-[11px] leading-relaxed text-muted/70">
            Prix &amp; avis indicatifs (été 2026) — à confirmer sur chaque site avant de
            réserver.
          </p>
        </div>
      )}
    </div>
  );
}

function Row({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-1.5 text-muted">
      <span className="shrink-0 text-muted" aria-hidden>
        {icon}
      </span>
      <span className="min-w-0">{children}</span>
    </div>
  );
}
