import type { Day } from "@/data/types";

/** Les deux voyageurs (logique type Tricount). */
export const MEMBERS = [
  { id: "baton", name: "Bâton" },
  { id: "jean", name: "Jean" },
] as const;

export type MemberId = (typeof MEMBERS)[number]["id"];

export function memberName(id: MemberId): string {
  return MEMBERS.find((m) => m.id === id)?.name ?? id;
}

/** Budget cible par jour pour deux personnes (€). */
export const DAILY_TARGET_FOR_TWO = 100;

/**
 * Somme estimée pour DEUX personnes si toutes les activités du jour étaient
 * réalisées (les alternatives ne sont pas comptées). Inclut le transport.
 */
export function estimatedDayTotalForTwo(day: Day): number {
  const activities = day.activities.reduce(
    (sum, a) => sum + a.pricePerPerson * 2,
    0
  );
  const transport = day.transport ? day.transport.pricePerPerson * 2 : 0;
  return activities + transport;
}

/** Budget cible total du voyage pour deux (8 jours). */
export function tripTargetForTwo(daysCount: number): number {
  return DAILY_TARGET_FOR_TWO * daysCount;
}
