import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Accents Adriatique (lumineux, fonctionnent sur fond sombre)
        sea: "#1B6CA8", // bleu mer (éclairci pour le dark)
        turquoise: "#2DD4D4", // turquoise eau claire
        sand: "#E9C98A", // sable chaud (accent doré, usage parcimonieux)
        coral: "#FF6B52", // accent corail
        // Tokens sémantiques de surface (thème sombre, pilotés par CSS vars)
        night: "rgb(var(--night) / <alpha-value>)", // fond de page profond
        card: "rgb(var(--card) / <alpha-value>)", // cartes
        elevated: "rgb(var(--elevated) / <alpha-value>)", // chips / surfaces hautes
        line: "rgb(var(--line) / <alpha-value>)", // bordures
        ink: "rgb(var(--ink) / <alpha-value>)", // texte principal
        muted: "rgb(var(--muted) / <alpha-value>)", // texte secondaire
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 12px 32px -12px rgba(0, 0, 0, 0.55)",
        soft: "0 6px 18px -10px rgba(0, 0, 0, 0.5)",
        glow: "0 0 0 1px rgba(45, 212, 212, 0.15)",
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.75rem",
      },
      maxWidth: {
        app: "480px",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        wave: {
          "0%, 60%, 100%": { transform: "rotate(0deg)" },
          "10%, 30%": { transform: "rotate(16deg)" },
          "20%, 40%": { transform: "rotate(-10deg)" },
        },
        "rise-in": {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "splash-out": {
          to: { opacity: "0", visibility: "hidden" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out",
        wave: "wave 2s ease-in-out infinite",
        "rise-in": "rise-in 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
