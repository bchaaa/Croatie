// Types partagés pour toutes les données du voyage.

export type ActivityType =
  | "gratuit"
  | "payant"
  | "transport"
  | "repas"
  | "optionnel";

/**
 * Une offre de réservation pour une activité (un prestataire = une option).
 * Permet de comparer plusieurs plateformes (GetYourGuide, Viator, site
 * officiel…) et de choisir selon le prix, la durée, le lieu ou les avis.
 */
export interface BookingOption {
  id: string;
  /** Nom du prestataire / plateforme (ex : « GetYourGuide », « Site officiel »). */
  provider: string;
  url: string;
  /** Prix par personne en euros. */
  pricePerPerson: number;
  priceNote?: string;
  /** Note moyenne /5 (avis). */
  rating?: number;
  /** Nombre d'avis (indicatif). */
  reviews?: number;
  durationLabel?: string;
  /** Point de départ / lieu de l'activité. */
  location?: string;
  /** Ce qui distingue cette option (inclus, langue, annulation…). */
  highlight?: string;
  /** Meilleure option (mise en avant par défaut). */
  best?: boolean;
}

export interface Activity {
  id: string;
  name: string;
  type: ActivityType;
  /** Prix par personne en euros (0 si gratuit). */
  pricePerPerson: number;
  /** Texte si le prix est approximatif ou variable. */
  priceNote?: string;
  durationMinutes?: number;
  description?: string;
  address?: string;
  mapsUrl?: string;
  /** Lien de réservation unique (cas simple, sans comparaison). */
  bookingUrl?: string | null;
  /**
   * Offres de réservation comparables. Si présent, l'app affiche un bouton ⓘ
   * pour comparer prix / durée / lieu / avis entre les options.
   */
  bookingOptions?: BookingOption[];
  tips?: string;
  /** Activité incontournable. */
  mustDo?: boolean;
  /** Réservation obligatoire à l'avance → badge rouge. */
  mustBook?: boolean;
  /** Réduction étudiante applicable (carte étudiante / IUT). */
  studentDiscount?: boolean;
  /** Alternatives proposées si on veut remplacer/compléter cette activité. */
  alternatives?: AlternativeActivity[];
}

/** Version allégée d'une activité, utilisée comme alternative. */
export interface AlternativeActivity {
  id: string;
  name: string;
  type: ActivityType;
  pricePerPerson: number;
  priceNote?: string;
  description?: string;
  mapsUrl?: string;
}

export interface Transport {
  from: string;
  fromMapsUrl?: string;
  to: string;
  toMapsUrl?: string;
  mode: string;
  recommendedTime?: string;
  durationLabel: string;
  /** Prix par personne en euros. */
  pricePerPerson: number;
  priceNote?: string;
  bookingUrl?: string | null;
  notes?: string;
}

export interface Accommodation {
  id: string;
  name: string;
  address: string;
  checkin: string; // ISO
  checkout: string; // ISO
  mapsUrl: string;
  nights: number;
  phone?: string;
}

export interface Day {
  id: string;
  date: string; // ISO
  dayNumber: number; // 1..8
  city: string;
  title: string;
  emoji: string;
  /** Déplacement principal du jour (optionnel). */
  transport?: Transport;
  /** Id de l'hébergement du soir (référence accommodations). */
  accommodationId?: string;
  /** Plan de base recommandé pour la journée. */
  activities: Activity[];
  /**
   * Activités supplémentaires / loisirs proposés en plus du plan de base
   * (prix et types variés, à piocher selon l'envie et le budget).
   */
  extras?: Activity[];
  /** Budget indicatif pour deux (texte). */
  budgetEstimate: string;
}
