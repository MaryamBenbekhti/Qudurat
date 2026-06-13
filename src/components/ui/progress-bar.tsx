"use client";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
  color?: "amber" | "green" | "blue" | "red";
}

export function ProgressBar({
  value,
  max = 100,
  className,
  showLabel,
  color = "amber",
}: ProgressBarProps) {
  const pct = Math.min((value / max) * 100, 100);

  const colors = {
    amber: "from-amber-500 to-orange-500",
    green: "from-emerald-500 to-teal-500",
    blue: "from-blue-500 to-indigo-500",
    red: "from-red-500 to-rose-500",
  };

  return (
    <div className={cn("space-y-1", className)}>
      {showLabel && (
        <span className="text-sm text-slate-400">{Math.round(pct)}%</span>
      )}
      <div className="h-2.5 w-full rounded-full bg-navy-700/80 overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full bg-gradient-to-r transition-all duration-500",
            colors[color]
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
