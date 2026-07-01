import { days } from "@/data/days";
import { accommodations } from "@/data/accommodations";
import { restaurantsByBase } from "@/data/restaurants";
import { PHRASES } from "@/data/guide";
import { emergencyNumbers, practicalTips, practicalFacts } from "@/data/infos";
import type { Activity } from "@/data/types";

function priceLabel(a: Pick<Activity, "pricePerPerson" | "priceNote">): string {
  if (a.pricePerPerson > 0) return `${a.pricePerPerson} €/pers`;
  return a.priceNote || "gratuit";
}

function activityLine(a: Activity): string {
  const meta: string[] = [priceLabel(a)];
  if (a.durationMinutes) meta.push(`${a.durationMinutes} min`);
  if (a.mustBook) meta.push("À RÉSERVER à l'avance");
  if (a.studentDiscount) meta.push("réduc étudiant possible");
  let s = `  • ${a.name} (${meta.join(", ")})`;
  if (a.description) s += ` — ${a.description}`;
  if (a.tips) s += ` [Astuce : ${a.tips}]`;
  if (a.alternatives?.length) {
    s += ` [Alternatives : ${a.alternatives.map((x) => x.name).join(", ")}]`;
  }
  return s;
}

/**
 * Construit un résumé texte complet du voyage, injecté dans le prompt du
 * concierge IA pour des réponses précises (prix, réservations, itinéraires,
 * restos, infos pratiques, mots de croate…).
 */
export function buildTripContext(): string {
  const l: string[] = [];
  l.push("VOYAGE : Croatie, du 1er au 8 juillet 2026, à deux (Bâton & Jean).");

  l.push("\n=== HÉBERGEMENTS ===");
  for (const a of accommodations) {
    l.push(
      `- ${a.name} — ${a.address} (arrivée ${a.checkin}, départ ${a.checkout}, ${a.nights} nuit(s))${a.phone ? `, tél ${a.phone}` : ""}`
    );
  }

  l.push("\n=== PROGRAMME JOUR PAR JOUR ===");
  for (const d of days) {
    l.push(`\nJOUR ${d.dayNumber} (${d.date}) — ${d.city} : ${d.title}`);
    if (d.transport) {
      const t = d.transport;
      const bits = [t.mode, t.durationLabel, `~${t.pricePerPerson} €/pers`];
      if (t.recommendedTime) bits.push(`horaire conseillé : ${t.recommendedTime}`);
      l.push(`  Transport : ${t.from} → ${t.to} (${bits.join(", ")}).`);
      if (t.priceNote) l.push(`    Prix : ${t.priceNote}.`);
      if (t.notes) l.push(`    Note : ${t.notes}`);
      if (t.bookingUrl) l.push(`    Réservation : ${t.bookingUrl}`);
    }
    l.push("  Plan de base :");
    for (const a of d.activities) l.push(activityLine(a));
    if (d.extras?.length) {
      l.push("  En option (selon envie/budget) :");
      for (const a of d.extras) l.push(activityLine(a));
    }
    l.push(`  Budget indicatif du jour : ${d.budgetEstimate}.`);
  }

  l.push("\n=== RESTAURANTS (carnet d'adresses par ville) ===");
  for (const b of restaurantsByBase) {
    l.push(`\n${b.city} (près de « ${b.accommodation} ») — ${b.specialty}`);
    for (const r of b.restaurants) {
      l.push(
        `  - ${r.name} (${r.category}, ${"€".repeat(r.price)}, ${r.priceNote}) — ${r.area}, ${r.address}. ${r.description}`
      );
    }
  }

  l.push("\n=== INFOS PRATIQUES ===");
  l.push(
    "Urgences : " +
      emergencyNumbers.map((e) => `${e.label} ${e.number}`).join(" · ")
  );
  for (const f of practicalFacts) l.push(`- ${f.label} : ${f.value}`);
  l.push("Bons réflexes :");
  for (const t of practicalTips) l.push(`  • ${t}`);

  l.push("\n=== QUELQUES MOTS DE CROATE ===");
  for (const p of PHRASES) l.push(`- ${p.fr} = ${p.hr} [${p.say}]`);

  return l.join("\n");
}
