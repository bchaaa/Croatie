import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <Compass className="h-12 w-12 text-turquoise" aria-hidden />
      <h1 className="mt-4 font-display text-2xl font-bold text-ink">Page introuvable</h1>
      <p className="mt-2 text-sm text-muted">
        Cette page n'existe pas (ou plus). Retour au programme du jour ?
      </p>
      <Link
        href="/aujourd-hui"
        className="mt-5 rounded-full bg-turquoise px-5 py-2.5 text-sm font-bold text-night"
      >
        Aujourd'hui
      </Link>
    </div>
  );
}
