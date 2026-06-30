import Checklist from "@/components/Checklist";
import { PACKING, DEPARTURE } from "@/data/checklist";

export const metadata = {
  title: "Préparatifs — Croatie 2026",
};

export default function PrepaPage() {
  return (
    <div className="space-y-4">
      <header className="px-1">
        <h1 className="font-display text-2xl font-bold text-ink">Préparatifs</h1>
        <p className="text-sm text-muted">
          Valise &amp; to-do avant le départ — tout hors-ligne.
        </p>
      </header>

      <Checklist
        title="Avant le départ"
        storageKey="croatie-2026-check-depart"
        items={DEPARTURE}
      />

      <Checklist
        title="Valise"
        storageKey="croatie-2026-check-valise"
        items={PACKING}
      />
    </div>
  );
}
