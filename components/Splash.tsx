"use client";

import { useEffect, useRef, useState } from "react";

const SESSION_KEY = "croatie-2026-splash-seen";

/**
 * Écran d'accueil animé « Salut Bâton & Jean » affiché une fois par ouverture
 * de l'app (par session). Disparaît tout seul après ~2,7 s.
 *
 * Le garde `startedRef` (+ absence de cleanup qui annule les minuteurs) rend le
 * comportement stable malgré le double-rendu des effets en mode dev (Strict Mode).
 * Le passage « leaving » → « hidden » se fait à la fin de la transition CSS, avec
 * un minuteur de secours si la transition est désactivée.
 */
export default function Splash() {
  const [phase, setPhase] = useState<"hidden" | "shown" | "leaving">("hidden");
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    // Une seule fois par session (≈ par lancement de la PWA).
    if (sessionStorage.getItem(SESSION_KEY)) return;
    startedRef.current = true;
    sessionStorage.setItem(SESSION_KEY, "1");
    setPhase("shown");

    setTimeout(() => setPhase("leaving"), 2200);
    // Secours : si la transition CSS ne se déclenche pas (reduced motion…).
    setTimeout(() => setPhase("hidden"), 3200);
  }, []);

  if (phase === "hidden") return null;

  return (
    <div
      onTransitionEnd={() => {
        if (phase === "leaving") setPhase("hidden");
      }}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-night via-sea/30 to-night transition-opacity duration-500 ${
        phase === "leaving" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden
    >
      {/* Vagues décoratives */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 opacity-30">
        <svg viewBox="0 0 480 120" className="h-full w-full" preserveAspectRatio="none">
          <path
            d="M0 60 q60 -40 120 0 t120 0 t120 0 t120 0 V120 H0 Z"
            fill="rgb(45 212 212)"
            opacity="0.5"
          />
          <path
            d="M0 80 q60 -40 120 0 t120 0 t120 0 t120 0 V120 H0 Z"
            fill="rgb(27 108 168)"
            opacity="0.6"
          />
        </svg>
      </div>

      <div className="relative flex flex-col items-center text-center">
        <span
          className="animate-wave text-6xl"
          style={{ transformOrigin: "70% 70%" }}
        >
          👋
        </span>
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
