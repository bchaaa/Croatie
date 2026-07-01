"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles, X, Send, Loader2 } from "lucide-react";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

const GREETING: Msg = {
  role: "assistant",
  content:
    "Salut ! 🏖️ Je suis votre concierge pour la Croatie. Demandez-moi un resto près de vous, le plan d'une journée, un plan B s'il pleut, comment aller quelque part…",
};

const SUGGESTIONS = [
  "On mange où ce soir ?",
  "C'est quoi le plan aujourd'hui ?",
  "Un plan B s'il pleut ?",
];

export default function ConciergeChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, loading]);

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

  async function send(text: string) {
    const q = text.trim();
    if (!q || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: q }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next,
          today: new Date().toISOString().slice(0, 10),
        }),
      });
      const data = await r.json();
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.reply || "…" },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: "Oups, connexion impossible — le concierge a besoin d'internet.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Bouton flottant */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Ouvrir le concierge IA"
          className="fixed bottom-24 right-4 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-sea to-turquoise text-white shadow-card ring-1 ring-white/20 transition-transform active:scale-95"
          style={{ marginBottom: "env(safe-area-inset-bottom)" }}
        >
          <Sparkles className="h-6 w-6" aria-hidden />
        </button>
      )}

      {/* Panneau de conversation */}
      {open && (
        <div className="fixed inset-0 z-[70] flex justify-center bg-night/70 backdrop-blur-sm">
          <div className="flex h-full w-full max-w-app flex-col bg-night">
            {/* En-tête */}
            <header className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-sea to-turquoise text-white">
                  <Sparkles className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="font-display text-base font-bold leading-tight text-ink">
                    Concierge
                  </p>
                  <p className="text-[11px] text-muted">Votre assistant Croatie</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fermer"
                className="rounded-full bg-elevated p-2 text-ink transition-colors hover:bg-elevated/70"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </header>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
                >
                  <div
                    className={
                      m.role === "user"
                        ? "max-w-[82%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-turquoise px-3.5 py-2.5 text-sm text-night"
                        : "max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-bl-md border border-line bg-card px-3.5 py-2.5 text-sm text-ink"
                    }
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="inline-flex items-center gap-2 rounded-2xl rounded-bl-md border border-line bg-card px-3.5 py-2.5 text-sm text-muted">
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    Le concierge réfléchit…
                  </div>
                </div>
              )}

              {/* Suggestions au premier écran */}
              {messages.length === 1 && !loading && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="rounded-full border border-turquoise/40 px-3 py-1.5 text-xs font-medium text-turquoise transition-colors hover:bg-turquoise/10"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Saisie */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-line px-3 py-3"
              style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Écrire au concierge…"
                className="flex-1 rounded-full border border-line bg-elevated/50 px-4 py-2.5 text-sm text-ink outline-none focus:border-turquoise"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Envoyer"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-turquoise text-night transition-colors disabled:opacity-40"
              >
                <Send className="h-4 w-4" aria-hidden />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
