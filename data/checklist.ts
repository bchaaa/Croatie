export interface ChecklistItem {
  id: string;
  label: string;
}

/** À emporter dans la valise. */
export const PACKING: ChecklistItem[] = [
  { id: "pack-passeport", label: "Passeport / carte d'identité (les deux)" },
  { id: "pack-carte-etudiant", label: "Cartes étudiantes (réducs Krka, plongée…)" },
  { id: "pack-cb", label: "Cartes bancaires + un peu d'espèces (€)" },
  { id: "pack-resas", label: "Captures écran des réservations (offline)" },
  { id: "pack-chaussures-eau", label: "Chaussures aquatiques (plages de galets)" },
  { id: "pack-creme", label: "Crème solaire waterproof + après-soleil" },
  { id: "pack-chapeau", label: "Chapeau / casquette + lunettes de soleil" },
  { id: "pack-maillots", label: "Maillots de bain (×2 chacun)" },
  { id: "pack-serviette", label: "Serviette microfibre" },
  { id: "pack-coupe-vent", label: "Coupe-vent léger (Biokovo / bateau)" },
  { id: "pack-chargeur", label: "Chargeurs + batterie externe" },
  { id: "pack-gourde", label: "Gourde (eau du robinet potable)" },
  { id: "pack-trousse", label: "Trousse de toilette + médocs de base" },
  { id: "pack-sac-jour", label: "Petit sac à dos pour les journées" },
];

/** À faire avant de partir. */
export const DEPARTURE: ChecklistItem[] = [
  { id: "dep-plongee", label: "Réserver la plongée (J2)" },
  { id: "dep-remparts", label: "Réserver les remparts de Dubrovnik (J6, 8h)" },
  { id: "dep-krka", label: "Réserver l'entrée du Parc Krka (J7)" },
  { id: "dep-bus", label: "Repérer les horaires de bus (Split↔Makarska↔Dubrovnik)" },
  { id: "dep-checkin", label: "Check-in en ligne du vol + bagages" },
  { id: "dep-roaming", label: "Vérifier le forfait (roaming UE inclus ?)" },
  { id: "dep-banque", label: "Prévenir la banque / vérifier plafond CB" },
  { id: "dep-offline", label: "Télécharger cartes Google Maps hors-ligne" },
  { id: "dep-app", label: "Installer cette app sur les deux téléphones 😉" },
];
