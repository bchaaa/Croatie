import { BedDouble, Moon } from "lucide-react";
import type { Accommodation } from "@/data/types";
import { MapsButton } from "./ui";

export default function AccommodationCard({
  accommodation,
}: {
  accommodation: Accommodation;
}) {
  return (
    <section className="rounded-2xl border border-coral/30 bg-coral/[0.07] p-4 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-coral">
            <BedDouble className="h-3.5 w-3.5" aria-hidden />
            Hébergement du soir
          </p>
          <h2 className="mt-1 font-display text-lg font-semibold leading-tight text-ink">
            {accommodation.name}
          </h2>
          <p className="mt-0.5 text-sm text-muted">{accommodation.address}</p>
          <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted/80">
            <Moon className="h-3.5 w-3.5" aria-hidden />
            {accommodation.nights} nuit{accommodation.nights > 1 ? "s" : ""}
          </p>
        </div>
      </div>
      <div className="mt-3">
        <MapsButton url={accommodation.mapsUrl} label="Itinéraire Maps" />
      </div>
    </section>
  );
}
