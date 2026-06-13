"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { CheckCircle, XCircle, ArrowLeft, Home, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

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

type State = "question" | "answered" | "finished";

export function PracticeClient({ categoryLabel, questions }: Props) {
  const router = useRouter();
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [state, setState] = useState<State>("question");
  const [score, setScore] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const q = questions[idx];

  async function handleAnswer(optIdx: number) {
    if (state !== "question" || submitting) return;
    setSelected(optIdx);
    setSubmitting(true);
    setState("answered");

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
      setState("finished");
    } else {
      setIdx((i) => i + 1);
      setSelected(null);
      setState("question");
    }
  }

  function restart() {
    setIdx(0);
    setSelected(null);
    setState("question");
    setScore(0);
  }

  const difficultyColors: Record<string, string> = {
    EASY: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    MEDIUM: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    HARD: "text-red-400 bg-red-500/10 border-red-500/30",
  };
  const difficultyLabels: Record<string, string> = {
    EASY: "سهل",
    MEDIUM: "متوسط",
    HARD: "صعب",
  };

  if (questions.length === 0) {
    return (
      <div dir="rtl" className="min-h-screen bg-navy-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📭</div>
          <h2 className="text-2xl font-bold text-white mb-2">لا توجد أسئلة حالياً</h2>
          <p className="text-slate-400 mb-6">سيتم إضافة أسئلة قريباً</p>
          <Button onClick={() => router.push("/dashboard")}>
            <Home size={16} />
            العودة للوحة التحكم
          </Button>
        </div>
      </div>
    );
  }

  if (state === "finished") {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div dir="rtl" className="min-h-screen bg-navy-950 flex items-center justify-center px-4">
        <Card glow className="max-w-md w-full text-center p-10">
          <div className="text-7xl mb-6">{pct >= 70 ? "🏆" : pct >= 50 ? "👍" : "📚"}</div>
          <h2 className="text-3xl font-black text-white mb-2">انتهت الجلسة!</h2>
          <p className="text-slate-400 mb-8">{categoryLabel}</p>

          <div className="text-6xl font-black text-gradient mb-2">{pct}%</div>
          <div className="text-slate-400 mb-8">{score} / {questions.length} سؤال صحيح</div>

          <ProgressBar value={pct} color={pct >= 70 ? "green" : pct >= 50 ? "amber" : "red"} className="mb-8" />

          <div className="flex gap-3">
            <Button onClick={restart} variant="secondary" className="flex-1">
              <RotateCcw size={16} />
              إعادة
            </Button>
            <Button onClick={() => router.push("/dashboard")} className="flex-1">
              <Home size={16} />
              لوحة التحكم
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-navy-950 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            العودة
          </button>
          <div className="text-sm text-slate-400">
            {idx + 1} / {questions.length}
          </div>
        </div>

        <ProgressBar value={idx + 1} max={questions.length} className="mb-8" />

        <Card className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className={cn("text-xs font-medium px-2.5 py-1 rounded-full border", difficultyColors[q.difficulty])}>
              {difficultyLabels[q.difficulty]}
            </span>
            <span className="text-xs text-slate-500">سؤال {idx + 1}</span>
          </div>

          <p className="text-white text-lg font-medium leading-relaxed mb-6">
            {q.question}
          </p>

          <div className="space-y-3">
            {q.options.map((opt, i) => {
              let style = "border-navy-600/50 bg-navy-800/30 hover:border-amber-500/40 hover:bg-navy-700/50 cursor-pointer";

              if (state === "answered") {
                if (i === q.correctAnswer) {
                  style = "border-emerald-500 bg-emerald-500/10 cursor-default";
                } else if (i === selected && i !== q.correctAnswer) {
                  style = "border-red-500 bg-red-500/10 cursor-default";
                } else {
                  style = "border-navy-600/30 bg-navy-800/20 opacity-50 cursor-default";
                }
              }

              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className={cn(
                    "w-full text-right rounded-xl border p-4 transition-all duration-200 flex items-center gap-3",
                    style
                  )}
                  disabled={state === "answered"}
                >
                  <span className="w-7 h-7 rounded-lg border border-current flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {["أ", "ب", "ج", "د"][i]}
                  </span>
                  <span className="text-white text-sm">{opt}</span>
                  {state === "answered" && i === q.correctAnswer && (
                    <CheckCircle size={18} className="text-emerald-400 mr-auto" />
                  )}
                  {state === "answered" && i === selected && i !== q.correctAnswer && (
                    <XCircle size={18} className="text-red-400 mr-auto" />
                  )}
                </button>
              );
            })}
          </div>
        </Card>

        {/* Explanation */}
        {state === "answered" && (
          <div className="mb-6 bg-blue-500/10 border border-blue-500/30 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-blue-400 font-bold text-sm">💡 الشرح</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">{q.explanation}</p>
          </div>
        )}

        {state === "answered" && (
          <Button onClick={next} className="w-full" size="lg">
            {idx + 1 >= questions.length ? "عرض النتيجة" : "السؤال التالي"}
            <ArrowLeft size={18} className="rotate-180" />
          </Button>
        )}
      </div>
    </div>
  );
}
