"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { formatTime, cn } from "@/lib/utils";
import { Clock, Home, AlertTriangle, ChevronLeft } from "lucide-react";

const SECONDS_PER_Q = 120;
const ARABIC_OPTIONS = ["أ", "ب", "ج", "د"];

type Question = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

interface Props {
  year?: number;
  title?: string;
  userId: string;
  questions: Question[];
}

type Phase = "intro" | "exam" | "review" | "finished";

export function ExamClient({ year, title, questions }: Props) {
  const router = useRouter();
  const displayTitle = title ?? (year ? `اختبار ${year}` : "اختبار بتوقيت");
  const [phase, setPhase] = useState<Phase>("intro");
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  );
  const [timeLeft, setTimeLeft] = useState(SECONDS_PER_Q);
  const [score, setScore] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goNext = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (idx + 1 >= questions.length) {
      const correct = answers.filter((a, i) => a === questions[i].correctAnswer).length;
      setScore(correct);
      setPhase("finished");
    } else {
      setIdx((i) => i + 1);
      setTimeLeft(SECONDS_PER_Q);
    }
  }, [idx, questions, answers]);

  useEffect(() => {
    if (phase !== "exam") return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { goNext(); return SECONDS_PER_Q; }
        return t - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [phase, idx, goNext]);

  /* ── Empty ─────────────────────────────────────────────────────────── */
  if (questions.length === 0) {
    return (
      <div dir="rtl" className="min-h-screen bg-[#080e1a] flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <div className="text-6xl">📭</div>
          <h2 className="text-2xl font-bold text-white">لا توجد أسئلة لهذا الاختبار</h2>
          <Button onClick={() => router.push("/dashboard")} variant="secondary">
            <Home size={15} /> العودة
          </Button>
        </div>
      </div>
    );
  }

  /* ── Intro ──────────────────────────────────────────────────────────── */
  if (phase === "intro") {
    return (
      <div dir="rtl" className="min-h-screen bg-[#080e1a] flex items-center justify-center px-4">
        <div className="w-full max-w-lg">
          <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#142035] to-[#0f1b30] p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center mx-auto">
              <span className="text-3xl">📝</span>
            </div>
            <div>
              <h1 className="text-4xl font-black text-white">{displayTitle}</h1>
              <p className="text-slate-500 mt-1 text-sm">اختبار قياس الحقيقي</p>
            </div>

            <div className="space-y-2.5 text-right">
              {[
                `${questions.length} سؤال إجمالاً`,
                "دقيقتان لكل سؤال (120 ثانية)",
                "انتقال تلقائي عند انتهاء الوقت",
                "مراجعة مفصّلة للإجابات في النهاية",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 py-3">
                  <div className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" />
                  <span className="text-slate-300 text-sm">{item}</span>
                </div>
              ))}
            </div>

            <Button size="lg" className="w-full" onClick={() => setPhase("exam")}>
              <Clock size={17} />
              ابدأ الاختبار الآن
            </Button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Finished ───────────────────────────────────────────────────────── */
  if (phase === "finished") {
    const pct = Math.round((score / questions.length) * 100);
    const color = pct >= 70 ? "green" : pct >= 50 ? "amber" : "red";
    return (
      <div dir="rtl" className="min-h-screen bg-[#080e1a] py-12 px-4">
        <div className="max-w-lg mx-auto space-y-5">
          <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#142035] to-[#0f1b30] p-8 text-center space-y-5">
            <div className="text-7xl">{pct >= 70 ? "🏆" : pct >= 50 ? "👍" : "📚"}</div>
            <div>
              <h2 className="text-3xl font-black text-white">اختبار {year}</h2>
              <p className="text-slate-500 text-sm mt-1">انتهى الاختبار</p>
            </div>
            <div>
              <div className="text-6xl font-black text-gradient">{pct}%</div>
              <div className="text-slate-400 mt-1">{score} / {questions.length} سؤال صحيح</div>
            </div>
            <ProgressBar value={pct} color={color} size="md" />
            <div className="flex gap-3 pt-2">
              <Button variant="secondary" className="flex-1" onClick={() => router.push("/dashboard")}>
                <Home size={15} /> لوحة التحكم
              </Button>
              <Button className="flex-1" onClick={() => setPhase("review")}>
                مراجعة الإجابات
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Review ─────────────────────────────────────────────────────────── */
  if (phase === "review") {
    return (
      <div dir="rtl" className="min-h-screen bg-[#080e1a] py-8 px-4">
        <div className="max-w-2xl mx-auto space-y-5">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-black text-white">مراجعة الإجابات — {year}</h1>
            <Button variant="secondary" size="sm" onClick={() => router.push("/dashboard")}>
              <Home size={14} /> لوحة التحكم
            </Button>
          </div>

          {questions.map((q, i) => {
            const sel = answers[i];
            const correct = sel === q.correctAnswer;
            return (
              <div
                key={q.id}
                className={cn(
                  "rounded-2xl border p-5 space-y-4",
                  correct
                    ? "border-emerald-500/25 bg-emerald-500/[0.04]"
                    : "border-red-500/20 bg-red-500/[0.03]"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="text-slate-500 text-xs">سؤال {i + 1}</span>
                  <span className={cn("text-xs font-bold", correct ? "text-emerald-400" : "text-red-400")}>
                    {correct ? "✓ صحيح" : "✗ خطأ"}
                  </span>
                </div>
                <p className="text-white text-sm font-medium leading-relaxed">{q.question}</p>
                <div className="space-y-2">
                  {q.options.map((opt, j) => (
                    <div
                      key={j}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm",
                        j === q.correctAnswer
                          ? "bg-emerald-500/10 text-emerald-300"
                          : j === sel && j !== q.correctAnswer
                          ? "bg-red-500/10 text-red-300"
                          : "text-slate-600"
                      )}
                    >
                      <span className="font-bold flex-shrink-0">{ARABIC_OPTIONS[j]}.</span>
                      {opt}
                    </div>
                  ))}
                </div>
                <div className="rounded-xl border border-blue-500/15 bg-blue-500/[0.05] px-4 py-3 flex gap-2">
                  <span className="text-blue-400 text-xs font-bold flex-shrink-0 mt-0.5">💡</span>
                  <span className="text-slate-300 text-xs leading-relaxed">{q.explanation}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  /* ── Exam ────────────────────────────────────────────────────────────── */
  const q = questions[idx];
  const selectedAnswer = answers[idx];
  const timerPct = (timeLeft / SECONDS_PER_Q) * 100;
  const isUrgent = timeLeft <= 30;
  const isWarning = timeLeft <= 60 && timeLeft > 30;

  return (
    <div dir="rtl" className="min-h-screen bg-[#080e1a] py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-5">

        {/* Top bar */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-500">
            {idx + 1} <span className="text-slate-700">/</span> {questions.length}
          </div>

          {/* Timer */}
          <div className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl border font-mono font-black text-lg transition-colors",
            isUrgent  ? "border-red-500/40 bg-red-500/10 text-red-400 animate-pulse"    :
            isWarning ? "border-amber-500/40 bg-amber-500/10 text-amber-400"             :
                        "border-emerald-500/25 bg-emerald-500/[0.07] text-emerald-400"
          )}>
            <Clock size={16} />
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Timer progress */}
        <ProgressBar
          value={timerPct}
          color={isUrgent ? "red" : isWarning ? "amber" : "green"}
          size="xs"
        />

        {/* Question */}
        <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#142035] to-[#0f1b30] p-6">
          {isUrgent && (
            <div className="flex items-center gap-2 text-red-400 text-xs mb-4">
              <AlertTriangle size={13} />
              الوقت ينفد! أجب الآن
            </div>
          )}

          <p className="text-white text-base sm:text-lg font-medium leading-relaxed mb-6">
            {q.question}
          </p>

          <div className="space-y-3">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => {
                  const next = [...answers];
                  next[idx] = i;
                  setAnswers(next);
                }}
                className={cn(
                  "w-full text-right rounded-xl border p-4 transition-all duration-150 flex items-center gap-3",
                  selectedAnswer === i
                    ? "border-amber-500/60 bg-amber-500/10"
                    : "border-white/[0.08] bg-white/[0.03] hover:border-amber-500/25 hover:bg-white/[0.05]"
                )}
              >
                <span className={cn(
                  "w-7 h-7 rounded-lg border flex items-center justify-center text-sm font-bold flex-shrink-0",
                  selectedAnswer === i
                    ? "border-amber-500 text-amber-400"
                    : "border-white/20 text-slate-500"
                )}>
                  {ARABIC_OPTIONS[i]}
                </span>
                <span className="text-sm text-white flex-1 text-right">{opt}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Submit / next */}
        <Button className="w-full" size="lg" onClick={() => goNext()}>
          {idx + 1 >= questions.length ? "إنهاء الاختبار" : "السؤال التالي"}
          <ChevronLeft size={18} className="rotate-180" />
        </Button>

        {/* Progress dots */}
        <div className="flex gap-1.5 justify-center flex-wrap pt-1">
          {questions.map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                i === idx       ? "bg-amber-400"         :
                answers[i] !== null ? "bg-emerald-500/60" :
                                  "bg-white/10"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
