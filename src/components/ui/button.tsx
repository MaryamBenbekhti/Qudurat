"use client";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "xs" | "sm" | "md" | "lg";
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, children, disabled, ...props }, ref) => {
    const base =
      "relative inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 " +
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070912] " +
      "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none select-none overflow-hidden";

    const variants: Record<string, string> = {
      primary:
        "bg-gradient-to-r from-amber-500 via-orange-500 to-orange-500 text-white " +
        "shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:shadow-xl " +
        "hover:from-amber-400 hover:via-orange-400 hover:to-orange-400 " +
        "active:scale-[0.98] hover:-translate-y-0.5",
      secondary:
        "bg-white/[0.06] border border-white/[0.1] hover:bg-white/[0.1] hover:border-white/[0.18] " +
        "text-slate-200 hover:text-white active:scale-[0.98]",
      ghost:
        "bg-transparent hover:bg-white/[0.06] text-slate-400 hover:text-slate-200 " +
        "border border-transparent hover:border-white/[0.08] active:scale-[0.98]",
      outline:
        "bg-transparent border border-amber-500/35 text-amber-400 " +
        "hover:bg-amber-500/[0.08] hover:border-amber-500/60 active:scale-[0.98]",
      danger:
        "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-500/20 " +
        "hover:from-red-500 hover:to-rose-500 active:scale-[0.98]",
    };

    const sizes: Record<string, string> = {
      xs: "text-xs px-3 py-1.5 gap-1.5 rounded-lg",
      sm: "text-sm px-4 py-2 gap-1.5 rounded-xl",
      md: "text-sm px-5 py-2.5 gap-2 rounded-xl",
      lg: "text-[15px] px-7 py-3.5 gap-2 rounded-xl",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {/* Shimmer overlay on hover for primary */}
        {variant === "primary" && (
          <span className="absolute inset-0 -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] bg-white/10 transition-transform duration-700 pointer-events-none" />
        )}
        {loading && (
          <svg className="animate-spin h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
