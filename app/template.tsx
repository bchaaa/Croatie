/**
 * Template ré-monté à chaque navigation (contrairement au layout) : permet une
 * transition d'entrée douce du contenu à chaque changement d'onglet.
 * Désactivée si l'utilisateur préfère moins d'animations (accessibilité).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="motion-safe:animate-fade-in">{children}</div>;
}
