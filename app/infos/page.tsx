import {
  Phone,
  Siren,
  Building2,
  Coins,
  Plug,
  Signal,
  Lightbulb,
  BedDouble,
  MessageCircle,
} from "lucide-react";
import { accommodations } from "@/data/accommodations";
import { PHRASES } from "@/data/guide";
import { emergencyNumbers, practicalTips as tips } from "@/data/infos";
import { MapsButton } from "@/components/ui";

export const metadata = {
  title: "Infos utiles — Croatie 2026",
};

export default function InfosPage() {
  return (
    <div className="space-y-4">
      <header className="px-1">
        <h1 className="font-display text-2xl font-bold text-ink">Infos utiles</h1>
        <p className="text-sm text-muted">Urgences, pratique &amp; bons réflexes</p>
      </header>

      {/* Urgences */}
      <Section icon={<Siren className="h-5 w-5" />} title="Numéros d'urgence" accent="coral">
        <ul className="divide-y divide-line">
          {emergencyNumbers.map((n) => (
            <li key={n.number} className="flex items-center justify-between py-2.5">
              <span className="text-sm text-muted">{n.label}</span>
              <a
                href={`tel:${n.number}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-coral/10 px-3 py-1 text-sm font-bold text-coral"
              >
                <Phone className="h-3.5 w-3.5" aria-hidden />
                {n.number}
              </a>
            </li>
          ))}
        </ul>
      </Section>

      {/* Ambassade */}
      <Section icon={<Building2 className="h-5 w-5" />} title="Ambassade de France">
        <p className="text-sm text-muted">Ambassade de France en Croatie (Zagreb)</p>
        <a
          href="tel:+38514893600"
          className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-sea px-3 py-1.5 text-sm font-semibold text-white"
        >
          <Phone className="h-3.5 w-3.5" aria-hidden />
          +385 1 489 3600
        </a>
      </Section>

      {/* Pratique */}
      <Section icon={<Coins className="h-5 w-5" />} title="Infos pratiques">
        <ul className="space-y-3 text-sm text-muted">
          <InfoRow icon={<Coins className="h-4 w-4" />} title="Monnaie">
            Euro (€) depuis 2023 — pas de change à prévoir.
          </InfoRow>
          <InfoRow icon={<Plug className="h-4 w-4" />} title="Prise électrique">
            Type F (standard européen) — pas d'adaptateur nécessaire.
          </InfoRow>
          <InfoRow icon={<Signal className="h-4 w-4" />} title="Réseau / Internet">
            Roaming UE inclus (même forfait qu'en France). Sinon SIM locale A1 Croatia ou
            Hrvatski Telekom (HT).
          </InfoRow>
        </ul>
      </Section>

      {/* Tips généraux */}
      <Section icon={<Lightbulb className="h-5 w-5" />} title="Bons réflexes" accent="turquoise">
        <ul className="space-y-2.5">
          {tips.map((t, i) => (
            <li key={i} className="flex gap-2 text-sm text-muted">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-turquoise" aria-hidden />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Mini-guide croate */}
      <Section
        icon={<MessageCircle className="h-5 w-5" />}
        title="Quelques mots de croate"
        accent="turquoise"
      >
        <ul className="divide-y divide-line">
          {PHRASES.map((p) => (
            <li key={p.hr} className="flex items-center justify-between gap-3 py-2">
              <span className="text-sm text-muted">{p.fr}</span>
              <span className="text-right">
                <span className="text-sm font-semibold text-ink">{p.hr}</span>{" "}
                <span className="text-xs text-muted/70">[{p.say}]</span>
              </span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Hébergements */}
      <Section icon={<BedDouble className="h-5 w-5" />} title="Nos hébergements">
        <ul className="space-y-3">
          {accommodations.map((a) => (
            <li key={a.id} className="rounded-xl bg-elevated/50 p-3">
              <p className="font-semibold text-ink">{a.name}</p>
              <p className="text-xs text-muted">{a.address}</p>
              <p className="mt-0.5 text-xs text-muted/70">
                {a.checkin} → {a.checkout} · {a.nights} nuit{a.nights > 1 ? "s" : ""}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <MapsButton url={a.mapsUrl} />
                {a.phone && (
                  <a
                    href={`tel:${a.phone}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-turquoise/30 px-3 py-1.5 text-xs font-semibold text-turquoise"
                  >
                    <Phone className="h-3.5 w-3.5" aria-hidden />
                    {a.phone}
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <p className="pb-2 text-center text-xs text-muted/70">
        Croatie 2026 · Bâton &amp; Jean · 1-8 juillet 🇭🇷
      </p>
    </div>
  );
}

function Section({
  icon,
  title,
  accent = "sea",
  children,
}: {
  icon: React.ReactNode;
  title: string;
  accent?: "sea" | "coral" | "turquoise";
  children: React.ReactNode;
}) {
  const accentColor =
    accent === "coral" ? "text-coral" : accent === "turquoise" ? "text-turquoise" : "text-turquoise";
  return (
    <section className="rounded-2xl border border-line bg-card p-4 shadow-soft">
      <h2 className={`mb-3 flex items-center gap-2 font-display text-base font-semibold ${accentColor}`}>
        {icon}
        {title}
      </h2>
      {children}
    </section>
  );
}

function InfoRow({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-3">
      <span className="mt-0.5 text-turquoise" aria-hidden>
        {icon}
      </span>
      <div>
        <p className="font-semibold text-ink">{title}</p>
        <p className="text-muted">{children}</p>
      </div>
    </li>
  );
}
