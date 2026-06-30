import { MapPin, Ticket, AlertTriangle, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { toMapsAppUrl } from "@/lib/maps";
import type { ActivityType } from "@/data/types";

const TYPE_STYLES: Record<
  ActivityType,
  { label: string; className: string }
> = {
  gratuit: { label: "Gratuit", className: "bg-emerald-400/15 text-emerald-300" },
  payant: { label: "Payant", className: "bg-amber-400/15 text-amber-300" },
  transport: { label: "Transport", className: "bg-sky-400/15 text-sky-300" },
  repas: { label: "Repas", className: "bg-orange-400/15 text-orange-300" },
  optionnel: { label: "Optionnel", className: "bg-violet-400/15 text-violet-300" },
};

/** Badge coloré indiquant le type d'activité. */
export function TypeBadge({ type }: { type: ActivityType }) {
  const s = TYPE_STYLES[type];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
        s.className
      )}
    >
      {s.label}
    </span>
  );
}

/** Badge rouge « À RÉSERVER ». */
export function MustBookBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-coral px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white">
      <AlertTriangle className="h-3 w-3" aria-hidden />
      À réserver
    </span>
  );
}

/** Badge réduction étudiante. */
export function StudentBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-turquoise/15 px-2.5 py-0.5 text-[11px] font-semibold text-turquoise">
      <GraduationCap className="h-3 w-3" aria-hidden />
      Réduc étudiant
    </span>
  );
}

/** Bouton ouvrant Google Maps dans un nouvel onglet. */
export function MapsButton({
  url,
  label = "Maps",
  className,
}: {
  url: string;
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={toMapsAppUrl(url)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-turquoise px-3 py-1.5 text-xs font-bold text-night transition-colors hover:bg-turquoise/90 active:scale-[0.98]",
        className
      )}
    >
      <MapPin className="h-3.5 w-3.5" aria-hidden />
      {label}
    </a>
  );
}

/** Bouton de réservation (si booking_url disponible). */
export function BookButton({ url }: { url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-full border border-coral/60 bg-coral/10 px-3 py-1.5 text-xs font-semibold text-coral transition-colors hover:bg-coral hover:text-white active:scale-[0.98]"
    >
      <Ticket className="h-3.5 w-3.5" aria-hidden />
      Réserver
    </a>
  );
}
