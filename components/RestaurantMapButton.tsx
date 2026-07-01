"use client";

import { useEffect, useState } from "react";
import { Map, X, ExternalLink } from "lucide-react";

/**
 * Bouton « Carte » ouvrant une vue Google Maps plein écran (iframe) centrée
 * sur le resto. Google géocode la requête → position exacte, sans clé API.
 */
export default function RestaurantMapButton({
  name,
  embedUrl,
  directUrl,
}: {
  name: string;
  embedUrl: string;
  directUrl: string;
}) {
  const [open, setOpen] = useState(false);

  // Bloque le défilement de la page quand la carte plein écran est ouverte.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-full border border-turquoise/40 px-3 py-1.5 text-xs font-semibold text-turquoise transition-colors hover:bg-turquoise/10 active:scale-[0.98]"
      >
        <Map className="h-3.5 w-3.5" aria-hidden />
        Carte
      </button>

      {open && (
        <div className="fixed inset-0 z-[200] flex flex-col bg-night/95 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <h3 className="truncate font-display text-lg font-semibold text-ink">
              {name}
            </h3>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fermer la carte"
              className="rounded-full bg-elevated p-2 text-ink transition-colors hover:bg-elevated/70"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>

          <div className="relative flex-1">
            <iframe
              title={`Carte — ${name}`}
              src={embedUrl}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="px-4 py-3">
            <a
              href={directUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-xl bg-turquoise px-4 py-2.5 text-sm font-bold text-night transition-colors hover:bg-turquoise/90"
            >
              <ExternalLink className="h-4 w-4" aria-hidden />
              Ouvrir dans Google Maps
            </a>
          </div>
        </div>
      )}
    </>
  );
}
