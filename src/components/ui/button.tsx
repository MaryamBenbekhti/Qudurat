import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "xs" | "sm" | "md" | "lg";
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", loading, children, disabled, ...props },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 " +
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950 " +
      "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none select-none";

    const variants: Record<string, string> = {
      primary:
        "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 " +
        "active:from-amber-600 active:to-orange-600 text-white shadow-lg shadow-amber-500/20 " +
        "hover:shadow-amber-500/30 hover:-translate-y-px",
      secondary:
        "bg-navy-700/80 border border-white/10 hover:bg-navy-600/80 hover:border-white/15 " +
        "text-slate-200 hover:text-white",
      ghost:
        "bg-transparent hover:bg-white/5 text-slate-400 hover:text-slate-200 border border-transparent",
      outline:
        "bg-transparent border border-amber-500/40 text-amber-400 hover:bg-amber-500/10 hover:border-amber-500/60",
      danger:
        "bg-red-600/90 hover:bg-red-500 text-white shadow-lg shadow-red-500/20",
    };

    const sizes: Record<string, string> = {
      xs: "text-xs px-3 py-1.5 gap-1.5 rounded-lg",
      sm: "text-sm px-4 py-2 gap-1.5",
      md: "text-sm px-5 py-2.5 gap-2",
      lg: "text-base px-7 py-3.5 gap-2",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-3.5 w-3.5 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
