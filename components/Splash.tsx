"use client";

import { useEffect, useRef, useState } from "react";

const SESSION_KEY = "croatie-2026-splash-seen";
const SHOW_MS = 2200;
const HIDE_FALLBACK_MS = 3200;

/**
 * Écran d'accueil animé « Salut Bâton & Jean » affiché une fois par ouverture
 * de l'app (par session). Disparaît tout seul après ~2,7 s.
 *
 * Affiché par défaut (y compris côté serveur) pour éviter tout flash du
 * contenu de la page en dessous avant que React n'ait hydraté le composant.
 * Sur un rechargement dans la même session, le script inline de layout.tsx
 * (exécuté avant l'hydratation) masque déjà le splash via la classe CSS
 * `splash-skip` ; l'effet ci-dessous ne fait alors qu'aligner l'état React.
 *
 * Le garde `startedRef` (+ absence de cleanup qui annule les minuteurs) rend le
 * comportement stable malgré le double-rendu des effets en mode dev (Strict Mode).
 * Le passage « leaving » → « hidden » se fait à la fin de la transition CSS, avec
 * un minuteur de secours si la transition est désactivée.
 */
export default function Splash() {
  const [phase, setPhase] = useState<"hidden" | "shown" | "leaving">("shown");
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    // Déjà vu dans cette session : ne pas rejouer l'animation.
    if (sessionStorage.getItem(SESSION_KEY)) {
      setPhase("hidden");
      return;
    }
    sessionStorage.setItem(SESSION_KEY, "1");

    setTimeout(() => setPhase("leaving"), SHOW_MS);
    // Secours : si la transition CSS ne se déclenche pas (reduced motion…).
    setTimeout(() => setPhase("hidden"), HIDE_FALLBACK_MS);
  }, []);

  if (phase === "hidden") return null;

  return (
    <div
      id="app-splash"
      onTransitionEnd={() => {
        if (phase === "leaving") setPhase("hidden");
      }}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-night transition-opacity duration-500 ${
        phase === "leaving" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      role="status"
      aria-label="Chargement de l'application"
    >
      {/* Lueurs d'ambiance, cohérentes avec le fond du reste de l'app. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(1200px 600px at 50% -10%, rgba(45, 212, 212, 0.16), transparent 70%), radial-gradient(900px 500px at 90% 10%, rgba(27, 108, 168, 0.18), transparent 70%)",
        }}
      />

      {/* Vagues décoratives, avec un léger mouvement de dérive. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 opacity-30">
        <svg viewBox="0 0 480 120" className="h-full w-[calc(100%+120px)]" preserveAspectRatio="none">
          <path
            className="motion-safe:animate-drift-slow"
            d="M0 60 q60 -40 120 0 t120 0 t120 0 t120 0 t120 0 t120 0 V120 H0 Z"
            fill="rgb(45 212 212)"
            opacity="0.5"
          />
          <path
            className="motion-safe:animate-drift"
            d="M0 80 q60 -40 120 0 t120 0 t120 0 t120 0 t120 0 t120 0 V120 H0 Z"
            fill="rgb(27 108 168)"
            opacity="0.6"
          />
        </svg>
      </div>

      <div className="relative flex flex-col items-center text-center">
        <div className="relative flex h-24 w-24 items-center justify-center">
          <span className="absolute h-full w-full rounded-full bg-turquoise/40 blur-xl motion-safe:animate-glow" />
          {/* Anneau de chargement circulaire. */}
          <span
            className="absolute h-full w-full rounded-full border-2 border-turquoise/20 border-t-turquoise motion-safe:animate-spin"
            style={{ animationDuration: "1.4s" }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icon.svg"
            alt=""
            width={64}
            height={64}
            className="relative h-16 w-16 rounded-full shadow-card motion-safe:animate-logo-in"
          />
          <span
            className="absolute -bottom-1 -right-1 text-2xl motion-safe:animate-wave"
            style={{ transformOrigin: "70% 70%" }}
          >
            👋
          </span>
        </div>
        <p
          className="mt-6 animate-rise-in font-sans text-sm font-medium uppercase tracking-[0.3em] text-turquoise"
          style={{ animationDelay: "0.15s" }}
        >
          Salut
        </p>
        <h1
          className="mt-1 animate-rise-in font-display text-4xl font-bold text-ink"
          style={{ animationDelay: "0.35s" }}
        >
          Bâton &amp; Jean
        </h1>
        <p
          className="mt-3 animate-rise-in text-sm text-muted"
          style={{ animationDelay: "0.6s" }}
        >
          Direction la Croatie — 1 au 8 juillet 2026
        </p>
      </div>
    </div>
  );
}
