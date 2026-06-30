import { Bus, ArrowRight, Clock, Euro, Ticket, Info } from "lucide-react";
import { formatEUR } from "@/lib/utils";
import type { Transport } from "@/data/types";
import { MapsButton } from "./ui";

export default function TransportCard({ transport }: { transport: Transport }) {
  return (
    <section className="rounded-2xl border border-sky-400/30 bg-sky-400/[0.06] p-4 shadow-soft">
      <div className="mb-3 flex items-center gap-2 text-sky-300">
        <Bus className="h-5 w-5" aria-hidden />
        <h2 className="font-display text-base font-semibold">Transport du jour</h2>
      </div>

      {/* Départ → Arrivée */}
      <div className="flex items-stretch gap-2">
        <div className="flex-1 rounded-xl bg-card p-3 shadow-soft">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
            Départ
          </p>
          <p className="mt-0.5 text-sm font-medium leading-snug text-ink">
            {transport.from}
          </p>
          {transport.fromMapsUrl && (
            <div className="mt-2">
              <MapsButton url={transport.fromMapsUrl} label="Maps" />
            </div>
          )}
        </div>

        <div className="flex items-center text-sky-400">
          <ArrowRight className="h-5 w-5" aria-hidden />
        </div>

        <div className="flex-1 rounded-xl bg-card p-3 shadow-soft">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
            Arrivée
          </p>
          <p className="mt-0.5 text-sm font-medium leading-snug text-ink">
            {transport.to}
          </p>
          {transport.toMapsUrl && (
            <div className="mt-2">
              <MapsButton url={transport.toMapsUrl} label="Maps" />
            </div>
          )}
        </div>
      </div>

      {/* Détails */}
      <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
        <Detail icon={<Bus className="h-4 w-4" />} label="Moyen" value={transport.mode} />
        <Detail
          icon={<Clock className="h-4 w-4" />}
          label="Durée"
          value={transport.durationLabel}
        />
        {transport.recommendedTime && (
          <Detail
            icon={<Clock className="h-4 w-4" />}
            label="Horaire conseillé"
            value={transport.recommendedTime}
          />
        )}
        <Detail
          icon={<Euro className="h-4 w-4" />}
          label="Prix"
          value={`${formatEUR(transport.pricePerPerson)}/pers · ${formatEUR(
            transport.pricePerPerson * 2
          )} pour deux`}
        />
      </dl>

      {transport.priceNote && (
        <p className="mt-2 text-xs text-muted">{transport.priceNote}</p>
      )}

      {transport.notes && (
        <p className="mt-2 flex items-start gap-1.5 rounded-xl bg-sky-400/10 p-2.5 text-xs text-sky-200">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
          {transport.notes}
        </p>
      )}

      {transport.bookingUrl && (
        <a
          href={transport.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-sky-500 px-3 py-1.5 text-xs font-bold text-night transition-colors hover:bg-sky-400"
        >
          <Ticket className="h-3.5 w-3.5" aria-hidden />
          Acheter le billet
        </a>
      )}
    </section>
  );
}

function Detail({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2 rounded-xl bg-card/60 p-2">
      <span className="mt-0.5 text-sky-400" aria-hidden>
        {icon}
      </span>
      <div className="min-w-0">
        <dt className="text-[11px] font-semibold uppercase tracking-wide text-muted">
          {label}
        </dt>
        <dd className="text-sm font-medium leading-snug text-ink">{value}</dd>
      </div>
    </div>
  );
}
