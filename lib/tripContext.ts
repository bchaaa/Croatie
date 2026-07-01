import { days } from "@/data/days";
import { accommodations } from "@/data/accommodations";
import { restaurantsByBase } from "@/data/restaurants";

/**
 * Construit un résumé texte du voyage, injecté dans le prompt du concierge IA
 * pour qu'il réponde de façon contextuelle (restos, itinéraires, transports…).
 */
export function buildTripContext(): string {
  const l: string[] = [];
  l.push("VOYAGE : Croatie, du 1er au 8 juillet 2026, à deux (Bâton & Jean).");

  l.push("\nHÉBERGEMENTS :");
  for (const a of accommodations) {
    l.push(
      `- ${a.name} — ${a.address} (arrivée ${a.checkin}, départ ${a.checkout}, ${a.nights} nuit(s))`
    );
  }

  l.push("\nPROGRAMME JOUR PAR JOUR :");
  for (const d of days) {
    l.push(`\nJour ${d.dayNumber} (${d.date}) — ${d.city} : ${d.title}`);
    if (d.transport) {
      const t = d.transport;
      l.push(
        `  Transport : ${t.from} → ${t.to} (${t.mode}, ${t.durationLabel}, ~${t.pricePerPerson} €/pers).`
      );
    }
    const acts = d.activities.map((a) => a.name).join(", ");
    if (acts) l.push(`  Plan de base : ${acts}.`);
    if (d.extras?.length) {
      l.push(`  En option : ${d.extras.map((a) => a.name).join(", ")}.`);
    }
    l.push(`  Budget indicatif : ${d.budgetEstimate}.`);
  }

  l.push("\nRESTAURANTS (carnet d'adresses par ville) :");
  for (const b of restaurantsByBase) {
    l.push(`\n${b.city} (près de « ${b.accommodation} ») — ${b.specialty}`);
    for (const r of b.restaurants) {
      l.push(
        `  - ${r.name} (${r.category}, ${"€".repeat(r.price)}, ${r.priceNote}) — ${r.area}, ${r.address}. ${r.description}`
      );
    }
  }

  return l.join("\n");
}
