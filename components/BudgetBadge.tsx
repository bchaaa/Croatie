import { Wallet } from "lucide-react";
import { formatEUR } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { DAILY_TARGET_FOR_TWO } from "@/lib/budget";

/**
 * Badge affichant le budget estimé du jour pour deux, comparé à la cible.
 */
export default function BudgetBadge({
  estimatedForTwo,
  className,
}: {
  estimatedForTwo: number;
  className?: string;
}) {
  const overTarget = estimatedForTwo > DAILY_TARGET_FOR_TWO;
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-xl border px-3 py-2",
        overTarget
          ? "border-coral/40 bg-coral/10 text-coral"
          : "border-turquoise/40 bg-turquoise/10 text-turquoise",
        className
      )}
    >
      <Wallet className="h-4 w-4" aria-hidden />
      <div className="leading-tight">
        <p className="text-[11px] font-semibold uppercase tracking-wide opacity-70">
          Estimé du jour (×2)
        </p>
        <p className="text-sm font-bold">
          {formatEUR(estimatedForTwo)}{" "}
          <span className="text-[11px] font-medium opacity-60">
            / cible {formatEUR(DAILY_TARGET_FOR_TWO)}
          </span>
        </p>
      </div>
    </div>
  );
}
