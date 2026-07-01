import type { NextRequest } from "next/server";
import { buildTripContext } from "@/lib/tripContext";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Plusieurs modèles essayés dans l'ordre : si l'un n'a pas de quota gratuit
// (429) ou n'existe pas (404), on bascule sur le suivant.
const MODELS = (
  process.env.GEMINI_MODEL ||
  "gemini-2.0-flash,gemini-2.5-flash,gemini-1.5-flash,gemini-flash-latest"
)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: NextRequest) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return Response.json({
      reply:
        "Le concierge n'est pas encore activé : il manque la clé API Gemini (à ajouter dans les variables d'environnement Vercel : GEMINI_API_KEY).",
    });
  }

  let body: { messages?: ChatMessage[]; today?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ reply: "Requête invalide." }, { status: 400 });
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
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

  // Historique récent, converti au format Gemini (user / model).
  const contents = messages.slice(-12).map((m) => ({
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
    for (const model of MODELS) {
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

      // 429 (quota) / 404 (modèle absent) / 5xx : on tente le modèle suivant.
      // 400/403 (clé invalide, requête) : inutile d'insister.
      if (![429, 404, 500, 503].includes(r.status)) break;
    }

    const hint =
      lastStatus === 429
        ? "Quota Gemini atteint sur tous les modèles gratuits testés. Vérifie sur aistudio.google.com que le palier gratuit est actif pour ta clé (ou réessaie plus tard)."
        : lastStatus === 400 || lastStatus === 403
        ? "La clé API semble invalide. Regénère-en une (format AIzaSy…) sur aistudio.google.com."
        : "Réessaie dans un instant.";

    return Response.json({
      reply: `Le concierge n'a pas pu répondre (${lastStatus}). ${hint}`,
      status: lastStatus,
      detail: lastReason.slice(0, 300),
    });
  } catch {
    return Response.json({
      reply:
        "Impossible de joindre le concierge (connexion internet nécessaire).",
    });
  }
}
