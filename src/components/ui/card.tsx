import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
  hover?: boolean;
  variant?: "default" | "flat" | "outlined";
}

export function Card({
  className,
  glow,
  hover,
  variant = "default",
  children,
  ...props
}: CardProps) {
  const variants: Record<string, string> = {
    default: "bg-gradient-to-br from-[#142035] to-[#0f1b30] border border-white/[0.07]",
    flat:    "bg-[#0f1b30] border border-white/[0.06]",
    outlined:"bg-transparent border border-white/[0.1]",
  };

  return (
    <div
      className={cn(
        "rounded-2xl p-5",
        variants[variant],
        glow && "shadow-xl shadow-amber-500/[0.06] border-amber-500/[0.15]",
        hover && "transition-all duration-200 hover:border-amber-500/25 hover:shadow-lg hover:shadow-amber-500/[0.08] hover:-translate-y-0.5 cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mb-4", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-lg font-bold text-white leading-snug", className)} {...props}>
      {children}
    </h3>
  );
}
