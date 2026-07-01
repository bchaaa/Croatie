/**
 * Décor réutilisable pour les en-têtes en dégradé (soleil diffus + vagues
 * superposées). Reprend l'esthétique de l'écran de démarrage pour une identité
 * visuelle cohérente d'un bout à l'autre de l'app. Purement décoratif.
 */
export default function HeroWave() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Soleil diffus en haut à droite */}
      <div className="absolute -right-6 -top-8 h-28 w-28 rounded-full bg-white/20 blur-2xl" />
      {/* Vagues en bas */}
      <svg
        viewBox="0 0 480 120"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-16 w-full"
      >
        <path
          d="M0 70 q60 -34 120 0 t120 0 t120 0 t120 0 V120 H0 Z"
          fill="white"
          opacity="0.10"
        />
        <path
          d="M0 88 q60 -30 120 0 t120 0 t120 0 t120 0 V120 H0 Z"
          fill="white"
          opacity="0.08"
        />
      </svg>
    </div>
  );
}
