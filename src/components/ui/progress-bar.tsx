"use client";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
  label?: string;
  color?: "amber" | "green" | "blue" | "red" | "purple";
  size?: "xs" | "sm" | "md";
}

export function ProgressBar({
  value,
  max = 100,
  className,
  showLabel,
  label,
  color = "amber",
  size = "sm",
}: ProgressBarProps) {
  const pct = Math.min(Math.max((value / max) * 100, 0), 100);

  const gradients: Record<string, string> = {
    amber:  "from-amber-500 to-orange-400",
    green:  "from-emerald-500 to-teal-400",
    blue:   "from-blue-500 to-indigo-400",
    red:    "from-red-500 to-rose-400",
    purple: "from-purple-500 to-violet-400",
  };

  const heights: Record<string, string> = {
    xs: "h-1",
    sm: "h-2",
    md: "h-3",
  };

  return (
    <div className={cn("space-y-1.5", className)}>
      {(showLabel || label) && (
        <div className="flex items-center justify-between text-xs text-slate-400">
          {label && <span>{label}</span>}
          {showLabel && <span className="font-semibold text-slate-300">{Math.round(pct)}%</span>}
        </div>
      )}
      <div className={cn("w-full rounded-full bg-white/[0.06] overflow-hidden", heights[size])}>
        <div
          className={cn(
            "h-full rounded-full bg-gradient-to-r transition-all duration-700 ease-out",
            gradients[color]
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
