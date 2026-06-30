"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Trash2, Scale, ArrowRight, Info } from "lucide-react";
import { formatEUR } from "@/lib/utils";
import {
  DAILY_TARGET_FOR_TWO,
  tripTargetForTwo,
  MEMBERS,
  memberName,
  type MemberId,
} from "@/lib/budget";
import { days } from "@/data/days";

/** Pour qui la dépense compte : les deux (50/50) ou une seule personne. */
type Split = "both" | MemberId;

interface Expense {
  id: string;
  label: string;
  amount: number; // montant total payé
  paidBy: MemberId;
  split: Split;
  date: string; // ISO de saisie
}

const STORAGE_KEY = "croatie-2026-tricount";
const TRIP_TARGET = tripTargetForTwo(days.length); // 800 € pour deux

export default function BudgetPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState<MemberId>("baton");
  const [split, setSplit] = useState<Split>("both");

  // Chargement (offline, localStorage — pas de backend).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setExpenses(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses, hydrated]);

  const total = useMemo(
    () => expenses.reduce((s, e) => s + e.amount, 0),
    [expenses]
  );

  /**
   * Solde de chacun = ce qu'il a payé − ce qu'il doit réellement.
   * > 0 : on lui doit de l'argent ; < 0 : il doit de l'argent.
   */
  const balances = useMemo(() => {
    const paid: Record<string, number> = { baton: 0, jean: 0 };
    const owed: Record<string, number> = { baton: 0, jean: 0 };
    for (const e of expenses) {
      paid[e.paidBy] += e.amount;
      if (e.split === "both") {
        owed.baton += e.amount / 2;
        owed.jean += e.amount / 2;
      } else {
        owed[e.split] += e.amount;
      }
    }
    return MEMBERS.map((m) => ({
      id: m.id,
      name: m.name,
      paid: paid[m.id],
      net: paid[m.id] - owed[m.id],
    }));
  }, [expenses]);

  // Pour deux personnes : un créditeur, un débiteur.
  const settlement = useMemo(() => {
    const creditor = balances.find((b) => b.net > 0.005);
    const debtor = balances.find((b) => b.net < -0.005);
    if (!creditor || !debtor) return null;
    return { from: debtor.name, to: creditor.name, amount: Math.abs(debtor.net) };
  }, [balances]);

  function addExpense(e: React.FormEvent) {
    e.preventDefault();
    const value = parseFloat(amount.replace(",", "."));
    if (!label.trim() || isNaN(value) || value <= 0) return;
    setExpenses((prev) => [
      {
        id: crypto.randomUUID(),
        label: label.trim(),
        amount: value,
        paidBy,
        split,
        date: new Date().toISOString().slice(0, 10),
      },
      ...prev,
    ]);
    setLabel("");
    setAmount("");
  }

  function removeExpense(id: string) {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <div className="space-y-4">
      <header className="px-1">
        <h1 className="font-display text-2xl font-bold text-ink">Budget partagé</h1>
        <p className="text-sm text-muted">
          Qui paie quoi, façon Tricount — réparti entre {memberName("baton")} &amp;{" "}
          {memberName("jean")}.
        </p>
      </header>

      {/* Qui doit quoi */}
      <section className="rounded-2xl border border-turquoise/30 bg-gradient-to-br from-sea/30 to-card p-4 shadow-card">
        <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-turquoise">
          <Scale className="h-4 w-4" aria-hidden />
          Équilibre des comptes
        </p>
        {settlement ? (
          <div className="mt-2 flex items-center justify-center gap-3 py-1">
            <span className="font-display text-lg font-bold text-ink">
              {settlement.from}
            </span>
            <span className="flex items-center gap-1 text-coral">
              <ArrowRight className="h-5 w-5" aria-hidden />
              <span className="font-bold">{formatEUR(settlement.amount)}</span>
              <ArrowRight className="h-5 w-5" aria-hidden />
            </span>
            <span className="font-display text-lg font-bold text-ink">
              {settlement.to}
            </span>
          </div>
        ) : (
          <p className="mt-2 py-1 text-center font-medium text-turquoise">
            Tout est équilibré 🤝
          </p>
        )}

        {/* Détail payé par chacun */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          {balances.map((b) => (
            <div key={b.id} className="rounded-xl bg-card/70 p-2.5 text-center">
              <p className="text-xs font-medium text-muted">{b.name} a payé</p>
              <p className="text-base font-bold text-ink">{formatEUR(b.paid)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Total + cible */}
      <section className="rounded-2xl border border-line bg-card p-4 shadow-soft">
        <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-muted">
          <span>
            Total dépensé : <span className="text-ink">{formatEUR(total)}</span>
          </span>
          <span>Cible : {formatEUR(TRIP_TARGET)}</span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-elevated">
          <div
            className={`h-full rounded-full transition-all ${
              total > TRIP_TARGET ? "bg-coral" : "bg-turquoise"
            }`}
            style={{ width: `${Math.min(100, (total / TRIP_TARGET) * 100)}%` }}
          />
        </div>
        <p className="mt-1.5 text-[11px] text-muted/70">
          Objectif {formatEUR(DAILY_TARGET_FOR_TWO)}/jour pour deux sur {days.length} jours.
        </p>
      </section>

      {/* Ajouter une dépense */}
      <form
        onSubmit={addExpense}
        className="rounded-2xl border border-line bg-card p-4 shadow-soft"
      >
        <h2 className="mb-3 font-display text-base font-semibold text-ink">
          Ajouter une dépense
        </h2>

        <div className="flex flex-col gap-2.5">
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Ex : Dîner, billets de bus…"
            className="w-full rounded-xl border border-line bg-elevated/50 px-3 py-2.5 text-sm text-ink outline-none focus:border-turquoise"
          />

          <div className="relative">
            <input
              type="number"
              inputMode="decimal"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Montant total payé"
              className="w-full rounded-xl border border-line bg-elevated/50 px-3 py-2.5 pr-8 text-sm text-ink outline-none focus:border-turquoise"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted">
              €
            </span>
          </div>

          {/* Payé par */}
          <div>
            <p className="mb-1 text-xs font-semibold text-muted">Payé par</p>
            <div className="grid grid-cols-2 gap-2">
              {MEMBERS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPaidBy(m.id)}
                  className={`rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
                    paidBy === m.id
                      ? "bg-turquoise text-night"
                      : "bg-elevated/60 text-muted hover:text-ink"
                  }`}
                >
                  {m.name}
                </button>
              ))}
            </div>
          </div>

          {/* Pour qui */}
          <div>
            <p className="mb-1 text-xs font-semibold text-muted">Pour qui</p>
            <div className="grid grid-cols-3 gap-2">
              <SplitBtn active={split === "both"} onClick={() => setSplit("both")}>
                Tous les deux
              </SplitBtn>
              {MEMBERS.map((m) => (
                <SplitBtn
                  key={m.id}
                  active={split === m.id}
                  onClick={() => setSplit(m.id)}
                >
                  {m.name}
                </SplitBtn>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="mt-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-coral px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-coral/90 active:scale-[0.99]"
          >
            <Plus className="h-4 w-4" aria-hidden />
            Ajouter la dépense
          </button>
        </div>
      </form>

      {/* Liste */}
      <section>
        <h2 className="mb-2 px-1 font-display text-base font-semibold text-ink">
          Dépenses ({expenses.length})
        </h2>
        {expenses.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-line bg-card/50 p-6 text-center text-sm text-muted">
            Aucune dépense pour l'instant. Ajoute la première ci-dessus 👆
          </p>
        ) : (
          <ul className="space-y-2">
            {expenses.map((e) => (
              <li
                key={e.id}
                className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-card p-3 shadow-soft"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-ink">{e.label}</p>
                  <p className="text-xs text-muted">
                    {memberName(e.paidBy)} a payé ·{" "}
                    {e.split === "both"
                      ? "partagé 50/50"
                      : `pour ${memberName(e.split)}`}{" "}
                    · {e.date}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-turquoise">
                    {formatEUR(e.amount)}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeExpense(e.id)}
                    className="rounded-lg p-1.5 text-muted/60 transition-colors hover:bg-coral/10 hover:text-coral"
                    aria-label={`Supprimer ${e.label}`}
                  >
                    <Trash2 className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <p className="flex items-start gap-1.5 px-1 pb-2 text-[11px] leading-relaxed text-muted/70">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
        Les dépenses sont enregistrées sur cet appareil (hors-ligne). Pour les
        synchroniser entre vos deux téléphones en temps réel, il faudrait ajouter une
        petite base de données partagée — faisable plus tard.
      </p>
    </div>
  );
}

function SplitBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl px-2 py-2 text-xs font-semibold transition-colors ${
        active ? "bg-sea text-white" : "bg-elevated/60 text-muted hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}
