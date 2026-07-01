"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Map, Luggage, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/aujourd-hui", label: "Aujourd'hui", Icon: CalendarDays },
  { href: "/programme", label: "Programme", Icon: Map },
  { href: "/prepa", label: "Prépa", Icon: Luggage },
  { href: "/infos", label: "Infos", Icon: Info },
] as const;

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-1/2 z-50 w-full max-w-app -translate-x-1/2 border-t border-line bg-card/90 backdrop-blur-md"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Navigation principale"
    >
      <ul className="grid grid-cols-4">
        {items.map(({ href, label, Icon }) => {
          const active =
            pathname === href ||
            (href === "/aujourd-hui" && pathname === "/") ||
            (href === "/programme" && pathname.startsWith("/jour"));
          return (
            <li key={href}>
              <Link
                href={href}
                // min-h 56px : cible tactile confortable (≥ 44pt recommandé).
                className={cn(
                  "group flex min-h-[56px] flex-col items-center justify-center gap-1 rounded-xl py-2 text-[11px] font-medium outline-none transition-colors",
                  "focus-visible:ring-2 focus-visible:ring-turquoise focus-visible:ring-offset-0",
                  active ? "text-turquoise" : "text-muted"
                )}
                aria-current={active ? "page" : undefined}
              >
                {/* Pastille active : repère visuel clair « vous êtes ici »,
                    au-delà de la seule couleur (accessibilité daltonisme). */}
                <span
                  className={cn(
                    "flex h-8 w-14 items-center justify-center rounded-full transition-all duration-200",
                    active
                      ? "bg-turquoise/15"
                      : "bg-transparent group-hover:bg-elevated/60"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5 transition-transform",
                      active ? "scale-110 stroke-[2.5]" : "group-hover:text-turquoise"
                    )}
                    aria-hidden
                  />
                </span>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
