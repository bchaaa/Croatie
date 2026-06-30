"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Map, Wallet, Luggage, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/aujourd-hui", label: "Aujourd'hui", Icon: CalendarDays },
  { href: "/programme", label: "Programme", Icon: Map },
  { href: "/budget", label: "Budget", Icon: Wallet },
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
      <ul className="grid grid-cols-5">
        {items.map(({ href, label, Icon }) => {
          const active =
            pathname === href ||
            (href === "/aujourd-hui" && pathname === "/") ||
            (href === "/programme" && pathname.startsWith("/jour"));
          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium transition-colors",
                  active ? "text-turquoise" : "text-muted hover:text-turquoise"
                )}
                aria-current={active ? "page" : undefined}
              >
                <Icon
                  className={cn("h-5 w-5", active && "stroke-[2.5]")}
                  aria-hidden
                />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
