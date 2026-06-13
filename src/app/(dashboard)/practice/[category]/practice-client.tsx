"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { CATEGORY_LABELS } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { ArrowLeft, Home, RotateCcw, CheckCircle, XCircle, Lightbulb } from "lucide-react";

type Question = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: string;
};

interface Props {
  category: string;
  categoryLabel: string;
  questions: Question[];
}

type Phase = "question" | "answered" | "finished";

const ARABIC_OPTIONS = ["أ", "ب", "ج", "د"];
const DIFF_LABELS: Record<string, { label: string; color: string }> = {
  EASY:   { label: "سهل",   color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25" },
  MEDIUM: { label: "متوسط", color: "text-amber-400   bg-amber-500/10   border-amber-500/25"   },
  HARD:   { label: "صعب",   color: "text-red-400    bg-red-500/10    border-red-500/25"     },
};

export function PracticeClient({ category, categoryLabel, questions }: Props) {
  const router = useRouter();
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>("question");
  const [score, setScore] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const q = questions[idx];

  async function handleAnswer(optIdx: number) {
    if (phase !== "question" || submitting) return;
    setSelected(optIdx);
    setSubmitting(true);
    setPhase("answered");
    try {
      const res = await fetch("/api/questions/attempt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId: q.id, selectedAns: optIdx }),
      });
      const data = await res.json();
      if (data.isCorrect) setScore((s) => s + 1);
    } catch { /* non-critical */ }
    setSubmitting(false);
  }

  function next() {
    if (idx + 1 >= questions.length) {
      setPhase("finished");
    } else {
      setIdx((i) => i + 1);
      setSelected(null);
      setPhase("question");
    }
  }

  function restart() {
    setIdx(0);
    setSelected(null);
    setPhase("question");
    setScore(0);
  }

  /* ── Empty state ──────────────────────────────────────────────────── */
  if (questions.length === 0) {
    return (
      <div dir="rtl" className="min-h-screen bg-[#080e1a] flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <div className="text-6xl">📭</div>
          <h2 className="text-2xl font-bold text-white">لا توجد أسئلة حالياً</h2>
          <p className="text-slate-500">سيتم إضافة أسئلة قريباً</p>
          <Button onClick={() => router.push("/dashboard")} variant="secondary">
            <Home size={15} /> العودة للوحة التحكم
          </Button>
        </div>
      </div>
    );
  }

  /* ── Finished state ───────────────────────────────────────────────── */
  if (phase === "finished") {
    const pct = Math.round((score / questions.length) * 100);
    const emoji = pct >= 80 ? "🏆" : pct >= 60 ? "👍" : "📚";
    const color = pct >= 70 ? "green" : pct >= 50 ? "amber" : "red";
    return (
      <div dir="rtl" className="min-h-screen bg-[#080e1a] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#142035] to-[#0f1b30] p-8 text-center space-y-6">
            <div className="text-7xl">{emoji}</div>
            <div>
              <h2 className="text-3xl font-black text-white">انتهت الجلسة!</h2>
              <p className="text-slate-500 text-sm mt-1">{categoryLabel}</p>
            </div>
            <div>
              <div className="text-6xl font-black text-gradient mb-1">{pct}%</div>
              <div className="text-slate-400">{score} / {questions.length} سؤال صحيح</div>
            </div>
            <ProgressBar value={pct} color={color} size="md" />
            <div className="flex gap-3 pt-2">
              <Button onClick={restart} variant="secondary" className="flex-1">
                <RotateCcw size={15} /> إعادة
              </Button>
              <Button onClick={() => router.push("/dashboard")} className="flex-1">
                <Home size={15} /> لوحة التحكم
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Active question ──────────────────────────────────────────────── */
  const diff = DIFF_LABELS[q.difficulty] ?? DIFF_LABELS.MEDIUM;

  return (
    <div dir="rtl" className="min-h-screen bg-[#080e1a] py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-5">

        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-white transition-colors"
          >
            <ArrowLeft size={15} />
            العودة
          </button>
          <div className="flex items-center gap-3">
            <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full border", diff.color)}>
              {diff.label}
            </span>
            <span className="text-sm text-slate-500">
              {idx + 1} <span className="text-slate-700">/</span> {questions.length}
            </span>
          </div>
        </div>

        {/* Progress */}
        <ProgressBar value={idx + 1} max={questions.length} color="amber" size="xs" />

        {/* Question card */}
        <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#142035] to-[#0f1b30] p-6">
          <p className="text-white text-base sm:text-lg font-medium leading-relaxed mb-6">
            {q.question}
          </p>

          <div className="space-y-3">
            {q.options.map((opt, i) => {
              let style =
                "border-white/[0.08] bg-white/[0.03] hover:border-amber-500/30 hover:bg-white/[0.06] cursor-pointer";

              if (phase === "answered") {
                if (i === q.correctAnswer) {
                  style = "border-emerald-500/50 bg-emerald-500/[0.08] cursor-default";
                } else if (i === selected) {
                  style = "border-red-500/50 bg-red-500/[0.08] cursor-default";
                } else {
                  style = "border-white/[0.04] bg-white/[0.01] opacity-40 cursor-default";
                }
              }

              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={phase === "answered"}
                  className={cn(
                    "w-full text-right rounded-xl border p-4 transition-all duration-150",
                    "flex items-center gap-3",
                    style
                  )}
                >
                  <span className={cn(
                    "w-7 h-7 rounded-lg border flex items-center justify-center text-sm font-bold flex-shrink-0 transition-colors",
                    phase === "answered" && i === q.correctAnswer
                      ? "border-emerald-500 text-emerald-400"
                      : phase === "answered" && i === selected
                      ? "border-red-500 text-red-400"
                      : "border-white/20 text-slate-400"
                  )}>
                    {ARABIC_OPTIONS[i]}
                  </span>
                  <span className="text-sm text-white flex-1 text-right">{opt}</span>
                  {phase === "answered" && i === q.correctAnswer && (
                    <CheckCircle size={16} className="text-emerald-400 flex-shrink-0" />
                  )}
                  {phase === "answered" && i === selected && i !== q.correctAnswer && (
                    <XCircle size={16} className="text-red-400 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Explanation */}
        {phase === "answered" && (
          <div className="rounded-2xl border border-blue-500/20 bg-blue-500/[0.06] p-5 flex gap-3">
            <Lightbulb size={18} className="text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-blue-400 font-bold text-sm mb-1">الشرح</div>
              <p className="text-slate-300 text-sm leading-relaxed">{q.explanation}</p>
            </div>
          </div>
        )}

        {/* Next button */}
        {phase === "answered" && (
          <Button onClick={next} className="w-full" size="lg">
            {idx + 1 >= questions.length ? "عرض النتيجة النهائية" : "السؤال التالي"}
            <ArrowLeft size={17} className="rotate-180" />
          </Button>
        )}
      </div>
    </div>
  );
}
