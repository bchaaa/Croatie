"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChecklistItem } from "@/data/checklist";

interface Persisted {
  checked: Record<string, boolean>;
  custom: ChecklistItem[];
}

/**
 * Liste cochable générique (valise, avant le départ…). État + items ajoutés
 * persistés en localStorage, par clé. Fonctionne hors-ligne.
 */
export default function Checklist({
  title,
  storageKey,
  items,
}: {
  title: string;
  storageKey: string;
  items: ChecklistItem[];
}) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [custom, setCustom] = useState<ChecklistItem[]>([]);
  const [draft, setDraft] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const data = JSON.parse(raw) as Persisted;
        setChecked(data.checked ?? {});
        setCustom(data.custom ?? []);
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, [storageKey]);

  useEffect(() => {
    if (hydrated) {
      const data: Persisted = { checked, custom };
      localStorage.setItem(storageKey, JSON.stringify(data));
    }
  }, [checked, custom, hydrated, storageKey]);

  const allItems = useMemo(() => [...items, ...custom], [items, custom]);
  const doneCount = allItems.filter((i) => checked[i.id]).length;

  function toggle(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function addItem(e: React.FormEvent) {
    e.preventDefault();
    const label = draft.trim();
    if (!label) return;
    const id = `custom-${crypto.randomUUID()}`;
    setCustom((prev) => [...prev, { id, label }]);
    setDraft("");
  }

  function removeCustom(id: string) {
    setCustom((prev) => prev.filter((i) => i.id !== id));
    setChecked((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }

  return (
    <section className="rounded-2xl border border-line bg-card p-4 shadow-soft">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="font-display text-base font-semibold text-ink">{title}</h2>
        <span className="rounded-full bg-elevated px-2.5 py-0.5 text-xs font-semibold text-muted">
          {doneCount}/{allItems.length}
        </span>
      </div>

      {/* Barre de progression */}
      <div className="mb-3 h-1.5 w-full overflow-hidden rounded-full bg-elevated">
        <div
          className="h-full rounded-full bg-turquoise transition-all"
          style={{
            width: `${allItems.length ? (doneCount / allItems.length) * 100 : 0}%`,
          }}
        />
      </div>

      <ul className="space-y-1">
        {allItems.map((item) => {
          const isChecked = !!checked[item.id];
          const isCustom = item.id.startsWith("custom-");
          return (
            <li key={item.id} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => toggle(item.id)}
                className="flex flex-1 items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-elevated/40"
                aria-pressed={isChecked}
              >
                <span
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors",
                    isChecked
                      ? "border-turquoise bg-turquoise text-night"
                      : "border-line bg-transparent"
                  )}
                >
                  {isChecked && <Check className="h-3.5 w-3.5" aria-hidden />}
                </span>
                <span
                  className={cn(
                    "text-sm",
                    isChecked ? "text-muted line-through" : "text-ink"
                  )}
                >
                  {item.label}
                </span>
              </button>
              {isCustom && (
                <button
                  type="button"
                  onClick={() => removeCustom(item.id)}
                  className="rounded-lg p-1.5 text-muted/60 transition-colors hover:bg-coral/10 hover:text-coral"
                  aria-label={`Supprimer ${item.label}`}
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              )}
            </li>
          );
        })}
      </ul>

      {/* Ajout d'un élément perso */}
      <form onSubmit={addItem} className="mt-3 flex gap-2">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Ajouter un élément…"
          className="flex-1 rounded-xl border border-line bg-elevated/50 px-3 py-2 text-sm text-ink outline-none focus:border-turquoise"
        />
        <button
          type="submit"
          className="inline-flex items-center gap-1 rounded-xl bg-turquoise px-3 py-2 text-sm font-bold text-night transition-colors hover:bg-turquoise/90"
        >
          <Plus className="h-4 w-4" aria-hidden />
        </button>
      </form>
    </section>
  );
}
