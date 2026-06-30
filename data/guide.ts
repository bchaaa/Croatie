// Données statiques (offline) : mini-guide de croate.

export interface Phrase {
  fr: string;
  hr: string; // croate
  say: string; // prononciation approx
}

export const PHRASES: Phrase[] = [
  { fr: "Bonjour", hr: "Dobar dan", say: "dobar dann" },
  { fr: "Salut", hr: "Bok", say: "bok" },
  { fr: "Merci", hr: "Hvala", say: "rvala" },
  { fr: "S'il vous plaît", hr: "Molim", say: "molim" },
  { fr: "Oui / Non", hr: "Da / Ne", say: "da / né" },
  { fr: "Excusez-moi", hr: "Oprostite", say: "oprostité" },
  { fr: "L'addition, svp", hr: "Račun, molim", say: "ratchoune molim" },
  { fr: "Santé !", hr: "Živjeli!", say: "jiv-yéli" },
  { fr: "Combien ça coûte ?", hr: "Koliko košta?", say: "koliko kochta" },
  { fr: "Une bière", hr: "Jedno pivo", say: "yédno pivo" },
  { fr: "Où est… ?", hr: "Gdje je…?", say: "gdyé yé" },
  { fr: "La plage", hr: "Plaža", say: "plaja" },
  { fr: "Au revoir", hr: "Doviđenja", say: "dovidjégna" },
];
