import type { NextRequest } from "next/server";
import { buildTripContext } from "@/lib/tripContext";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// Modèles essayés dans l'ordre (bascule si quota/absent).
const GROQ_MODELS = (
  process.env.GROQ_MODEL || "llama-3.3-70b-versatile,llama-3.1-8b-instant"
)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const GEMINI_MODELS = (
  process.env.GEMINI_MODEL ||
  "gemini-2.0-flash,gemini-2.5-flash,gemini-1.5-flash,gemini-flash-latest"
)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

export async function POST(req: NextRequest) {
  const groqKey = process.env.GROQ_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;

  if (!groqKey && !geminiKey) {
    return Response.json({
      reply:
        "Le concierge n'est pas encore activé : il manque une clé API (GROQ_API_KEY ou GEMINI_API_KEY) dans les variables d'environnement Vercel.",
    });
  }

  let body: { messages?: ChatMessage[]; today?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ reply: "Requête invalide." }, { status: 400 });
  }

  const messages = (Array.isArray(body.messages) ? body.messages : []).slice(-12);
  const today = typeof body.today === "string" ? body.today : "";

  const system = [
    "Tu es le concierge IA de l'app de voyage « Croatie 2026 ».",
    "Réponds en français, de façon chaleureuse, concise et pratique (phrases courtes, listes si utile).",
    "Base-toi en priorité sur les données du voyage ci-dessous (programme, restos, transports, hébergements).",
    "Tu peux conseiller : où manger, itinéraires, plans B météo, astuces transport, organisation d'une journée.",
    "Si on te demande un horaire/prix précis ou une info hors de tes données, dis-le honnêtement et invite à vérifier sur place ou dans l'app.",
    "Ne donne pas de fausses adresses : utilise celles listées.",
    today ? `Date du jour : ${today}.` : "",
    "\n=== DONNÉES DU VOYAGE ===",
    buildTripContext(),
  ]
    .filter(Boolean)
    .join("\n");

  // Groq prioritaire s'il est configuré (gratuit, sans facturation).
  if (groqKey) return callGroq(groqKey, system, messages);
  return callGemini(geminiKey!, system, messages);
}

/** Groq (API compatible OpenAI). */
async function callGroq(key: string, system: string, messages: ChatMessage[]) {
  const chat = [
    { role: "system", content: system },
    ...messages.map((m) => ({
      role: m.role,
      content: String(m.content || "").slice(0, 2000),
    })),
  ];

  let lastStatus = 0;
  let lastReason = "";
  try {
    for (const model of GROQ_MODELS) {
      const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          model,
          messages: chat,
          temperature: 0.7,
          max_tokens: 800,
        }),
      });

      if (r.ok) {
        const data = await r.json();
        const reply =
          data?.choices?.[0]?.message?.content?.trim() ||
          "Désolé, je n'ai pas de réponse pour le moment.";
        return Response.json({ reply });
      }

      lastStatus = r.status;
      try {
        const ej = await r.json();
        lastReason = ej?.error?.message || "";
      } catch {
        lastReason = "";
      }
      if (![429, 404, 500, 503].includes(r.status)) break;
    }

    const hint =
      lastStatus === 401 || lastStatus === 403
        ? "La clé Groq semble invalide. Regénère-en une sur console.groq.com."
        : lastStatus === 429
        ? "Limite Groq atteinte, réessaie dans un instant."
        : "Réessaie dans un instant.";
    return Response.json({
      reply: `Le concierge n'a pas pu répondre (${lastStatus}). ${hint}`,
      detail: lastReason.slice(0, 300),
    });
  } catch {
    return Response.json({
      reply: "Impossible de joindre le concierge (connexion internet nécessaire).",
    });
  }
}

/** Google Gemini. */
async function callGemini(key: string, system: string, messages: ChatMessage[]) {
  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: String(m.content || "").slice(0, 2000) }],
  }));
  const payload = JSON.stringify({
    system_instruction: { parts: [{ text: system }] },
    contents,
    generationConfig: { temperature: 0.7, maxOutputTokens: 800 },
  });

  let lastStatus = 0;
  let lastReason = "";
  try {
    for (const model of GEMINI_MODELS) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
      const r = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
      });

      if (r.ok) {
        const data = await r.json();
        const reply =
          data?.candidates?.[0]?.content?.parts
            ?.map((p: { text?: string }) => p.text || "")
            .join("")
            .trim() || "Désolé, je n'ai pas de réponse pour le moment.";
        return Response.json({ reply });
      }

      lastStatus = r.status;
      try {
        const ej = await r.json();
        lastReason = ej?.error?.message || ej?.error?.status || "";
      } catch {
        lastReason = "";
      }
      if (![429, 404, 500, 503].includes(r.status)) break;
    }

    const hint =
      lastStatus === 429
        ? "Quota Gemini épuisé (palier gratuit inactif ou crédits payants à 0). Utilise plutôt une clé Groq gratuite."
        : lastStatus === 400 || lastStatus === 403
        ? "La clé Gemini semble invalide."
        : "Réessaie dans un instant.";
    return Response.json({
      reply: `Le concierge n'a pas pu répondre (${lastStatus}). ${hint}`,
      detail: lastReason.slice(0, 300),
    });
  } catch {
    return Response.json({
      reply: "Impossible de joindre le concierge (connexion internet nécessaire).",
    });
  }
}
