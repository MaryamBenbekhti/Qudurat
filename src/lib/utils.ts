import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CATEGORY_LABELS: Record<string, string> = {
  GEOMETRY: "الهندسة",
  NUMBERS_EQUATIONS: "الأعداد والمعادلات",
  ALGEBRA: "الجبر",
  PATTERNS: "الأنماط",
  PROBABILITY: "الاحتمالات",
  RATIO: "النسب والتناسب",
  EXAM_2025: "اختبار 2025",
  EXAM_2024: "اختبار 2024",
  EXAM_2023: "اختبار 2023",
};

export const CATEGORY_ICONS: Record<string, string> = {
  GEOMETRY: "📐",
  NUMBERS_EQUATIONS: "🔢",
  ALGEBRA: "🔣",
  PATTERNS: "🔄",
  PROBABILITY: "🎲",
  RATIO: "⚖️",
  EXAM_2025: "📝",
  EXAM_2024: "📝",
  EXAM_2023: "📝",
};

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
