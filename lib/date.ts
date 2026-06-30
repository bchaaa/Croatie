// Dates clés du voyage (fuseau Europe/Zagreb ~ heure locale, on raisonne en jours).
export const TRIP_START = "2026-07-01";
export const TRIP_END = "2026-07-08";

/** Renvoie la date du jour au format ISO (YYYY-MM-DD), heure locale. */
export function todayISO(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Nombre de jours entiers entre deux dates ISO (b - a). */
export function daysBetween(a: string, b: string): number {
  const da = new Date(`${a}T00:00:00`);
  const db = new Date(`${b}T00:00:00`);
  return Math.round((db.getTime() - da.getTime()) / 86_400_000);
}

export type TripPhase =
  | { phase: "before"; daysUntil: number }
  | { phase: "during"; dayNumber: number }
  | { phase: "after" };

/**
 * Détermine la phase du voyage à partir d'une date ISO.
 * - before : avant le 1er juillet (compte à rebours)
 * - during : entre le 1er et le 8 juillet (dayNumber de 1 à 8)
 * - after  : après le 8 juillet
 */
export function getTripPhase(iso: string): TripPhase {
  if (iso < TRIP_START) {
    return { phase: "before", daysUntil: daysBetween(iso, TRIP_START) };
  }
  if (iso > TRIP_END) {
    return { phase: "after" };
  }
  return { phase: "during", dayNumber: daysBetween(TRIP_START, iso) + 1 };
}

const WEEKDAYS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
const MONTHS = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

/** Ex: "mercredi 1 juillet" */
export function formatLongDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return `${WEEKDAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}`;
}

/** Ex: "1 juil." */
export function formatShortDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return `${d.getDate()} ${MONTHS[d.getMonth()].slice(0, 4)}.`;
}
