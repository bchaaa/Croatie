import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { days, getDay } from "@/data/days";
import DayTimeline from "@/components/DayTimeline";

// Pré-génère les 8 pages au build (offline-ready, pas de fetch).
export function generateStaticParams() {
  return days.map((d) => ({ id: d.id }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const day = getDay(params.id);
  return {
    title: day ? `Jour ${day.dayNumber} — ${day.title}` : "Jour introuvable",
  };
}

export default function JourPage({ params }: { params: { id: string } }) {
  const day = getDay(params.id);
  if (!day) notFound();

  return (
    <div className="space-y-4">
      <Link
        href="/programme"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-turquoise"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Programme
      </Link>
      <DayTimeline day={day} />
    </div>
  );
}
