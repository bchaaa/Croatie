/**
 * Transforme un lien Google Maps « simple » (maps.google.com/?q=…) en lien
 * universel `?api=1` qui ouvre directement l'application Google Maps installée
 * sur iOS et Android (et bascule sur le navigateur si l'app est absente).
 *
 * Doc Google : https://developers.google.com/maps/documentation/urls/get-started
 */
export function toMapsAppUrl(url: string): string {
  try {
    const u = new URL(url);
    const q = u.searchParams.get("q");
    if (q) {
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
    }
    // Déjà au bon format ou format inconnu : on renvoie tel quel.
    return url;
  } catch {
    return url;
  }
}
