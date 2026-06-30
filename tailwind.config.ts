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
        drift: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-120px)" },
        },
        "logo-in": {
          from: { opacity: "0", transform: "scale(0.8)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        glow: {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.08)" },
        },
        progress: {
          from: { width: "0%" },
          to: { width: "100%" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out",
        wave: "wave 2s ease-in-out infinite",
        "rise-in": "rise-in 0.6s ease-out both",
        drift: "drift 7s linear infinite",
        "drift-slow": "drift 11s linear infinite reverse",
        "logo-in": "logo-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both",
        glow: "glow 2.4s ease-in-out infinite",
        progress: "progress 2.2s linear forwards",
      },
    },
  },
  plugins: [],
};

export default config;
