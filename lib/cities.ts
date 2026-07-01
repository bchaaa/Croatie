/**
 * Dégradé d'accent par ville étape, pour donner une identité visuelle
 * cohérente aux médaillons/étiquettes dans les listes (Programme, Aperçu).
 * Split = bleu Adriatique · Makarska = turquoise/vert eau · Dubrovnik =
 * corail/sable (toits de terre cuite de la vieille ville).
 */
export function cityGradient(city: string): string {
  const c = city.toLowerCase();
  if (c.includes("makarska")) return "from-teal-500 to-turquoise";
  if (c.includes("dubrovnik")) return "from-coral to-sand";
  return "from-sea to-turquoise"; // Split & défaut
}

/** Couleur d'accent (hex) par ville, pour les marqueurs de carte. */
export function cityHex(city: string): string {
  const c = city.toLowerCase();
  if (c.includes("makarska")) return "#14b8a6"; // teal
  if (c.includes("dubrovnik")) return "#FF6B52"; // corail
  return "#2DD4D4"; // turquoise (Split & défaut)
}
