"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { formatTime } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Clock, Home, RotateCcw, AlertCircle } from "lucide-react";

const SECONDS_PER_QUESTION = 120;

type Question = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

interface Props {
  year: number;
  userId: string;
  questions: Question[];
}

type Phase = "intro" | "exam" | "review" | "finished";

export function ExamClient({ year, questions }: Props) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("intro");
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(SECONDS_PER_QUESTION);
  const [score, setScore] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goNext = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (idx + 1 >= questions.length) {
      const correct = answers.filter((a, i) => a === questions[i].correctAnswer).length;
      setScore(correct);
      setPhase("finished");
    } else {
      setIdx((i) => i + 1);
      setTimeLeft(SECONDS_PER_QUESTION);
    }
  }, [idx, questions, answers]);

  useEffect(() => {
    if (phase !== "exam") return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          goNext();
          return SECONDS_PER_QUESTION;
        }
        return t - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [phase, idx, goNext]);

  function handleAnswer(optIdx: number) {
    setAnswers((prev) => {
      const next = [...prev];
      next[idx] = optIdx;
      return next;
    });
  }

  function submitAnswer() {
    goNext();
  }

  const timerPct = (timeLeft / SECONDS_PER_QUESTION) * 100;
  const timerColor = timeLeft > 60 ? "green" : timeLeft > 30 ? "amber" : "red";

  if (questions.length === 0) {
    return (
      <div dir="rtl" className="min-h-screen bg-navy-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📭</div>
          <h2 className="text-2xl font-bold text-white mb-4">لا توجد أسئلة لهذا الاختبار حالياً</h2>
          <Button onClick={() => router.push("/dashboard")}><Home size={16} />العودة</Button>
        </div>
      </div>
    );
  }

  if (phase === "intro") {
    return (
      <div dir="rtl" className="min-h-screen bg-navy-950 flex items-center justify-center px-4">
        <Card glow className="max-w-lg w-full text-center p-10">
          <div className="text-6xl mb-6">📝</div>
          <h1 className="text-4xl font-black text-white mb-2">اختبار {year}</h1>
          <p className="text-slate-400 mb-8">اختبار قياس الحقيقي</p>

          <div className="space-y-4 mb-10 text-right">
            {[
              `${questions.length} سؤال إجمالاً`,
              "دقيقتان لكل سؤال",
              "انتقال تلقائي عند انتهاء الوقت",
              "عرض النتيجة في النهاية",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 bg-navy-800/40 rounded-xl px-4 py-3">
                <div className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
                <span className="text-slate-300 text-sm">{item}</span>
              </div>
            ))}
          </div>

          <Button size="lg" className="w-full" onClick={() => setPhase("exam")}>
            <Clock size={18} />
            ابدأ الاختبار الآن
          </Button>
        </Card>
      </div>
    );
  }

  if (phase === "finished") {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div dir="rtl" className="min-h-screen bg-navy-950 py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <Card glow className="text-center p-10 mb-8">
            <div className="text-7xl mb-6">{pct >= 70 ? "🏆" : pct >= 50 ? "👍" : "📚"}</div>
            <h2 className="text-4xl font-black text-white mb-2">اختبار {year}</h2>
            <p className="text-slate-400 mb-8">انتهى الاختبار!</p>
            <div className="text-7xl font-black text-gradient mb-2">{pct}%</div>
            <div className="text-slate-400 mb-8 text-lg">{score} / {questions.length} سؤال صحيح</div>
            <ProgressBar value={pct} color={pct >= 70 ? "green" : pct >= 50 ? "amber" : "red"} className="mb-8" />
            <div className="flex gap-3">
              <Button variant="secondary" className="flex-1" onClick={() => router.push("/dashboard")}>
                <Home size={16} />
                لوحة التحكم
              </Button>
              <Button className="flex-1" onClick={() => setPhase("review")}>
                مراجعة الإجابات
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (phase === "review") {
    return (
      <div dir="rtl" className="min-h-screen bg-navy-950 py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-black text-white">مراجعة الإجابات — اختبار {year}</h1>
            <Button variant="secondary" size="sm" onClick={() => router.push("/dashboard")}>
              <Home size={14} />
              لوحة التحكم
            </Button>
          </div>

          <div className="space-y-6">
            {questions.map((q, i) => {
              const selected = answers[i];
              const isCorrect = selected === q.correctAnswer;

              return (
                <Card key={q.id} className={cn(
                  "border-2",
                  isCorrect ? "border-emerald-500/40" : "border-red-500/30"
                )}>
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-slate-400 text-sm">سؤال {i + 1}</span>
                    {isCorrect
                      ? <span className="text-emerald-400 text-sm font-medium">✓ صحيح</span>
                      : <span className="text-red-400 text-sm font-medium">✗ خطأ</span>
                    }
                  </div>
                  <p className="text-white font-medium mb-4">{q.question}</p>
                  <div className="space-y-2">
                    {q.options.map((opt, j) => (
                      <div key={j} className={cn(
                        "rounded-lg px-4 py-2.5 text-sm flex items-center gap-3",
                        j === q.correctAnswer && "bg-emerald-500/15 text-emerald-300",
                        j === selected && j !== q.correctAnswer && "bg-red-500/15 text-red-300",
                        j !== q.correctAnswer && j !== selected && "text-slate-500"
                      )}>
                        <span className="font-medium">{["أ", "ب", "ج", "د"][j]}.</span>
                        {opt}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 bg-blue-500/10 border border-blue-500/20 rounded-lg px-4 py-3">
                    <span className="text-blue-400 text-xs font-medium">💡 الشرح: </span>
                    <span className="text-slate-300 text-xs">{q.explanation}</span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // EXAM phase
  const q = questions[idx];
  const selectedAnswer = answers[idx];

  return (
    <div dir="rtl" className="min-h-screen bg-navy-950 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Timer Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span>{idx + 1} / {questions.length}</span>
          </div>
          <div className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl border font-mono font-bold text-lg",
            timeLeft > 60 ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" :
            timeLeft > 30 ? "bg-amber-500/10 border-amber-500/30 text-amber-400" :
            "bg-red-500/10 border-red-500/30 text-red-400 animate-pulse"
          )}>
            <Clock size={18} />
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Timer bar */}
        <ProgressBar value={timerPct} color={timerColor} className="mb-6" />

        {/* Question */}
        <Card className="mb-6">
          <div className="flex items-center gap-2 mb-4 text-amber-400">
            <AlertCircle size={16} />
            <span className="text-xs">الوقت يمر! أجب قبل انتهاء المؤقت</span>
          </div>
          <p className="text-white text-lg font-medium leading-relaxed mb-6">
            {q.question}
          </p>

          <div className="space-y-3">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className={cn(
                  "w-full text-right rounded-xl border p-4 transition-all duration-200 flex items-center gap-3",
                  selectedAnswer === i
                    ? "border-amber-500 bg-amber-500/15"
                    : "border-navy-600/50 bg-navy-800/30 hover:border-amber-500/40 hover:bg-navy-700/50"
                )}
              >
                <span className={cn(
                  "w-7 h-7 rounded-lg border flex items-center justify-center text-sm font-bold flex-shrink-0",
                  selectedAnswer === i ? "border-amber-500 text-amber-400" : "border-current text-slate-400"
                )}>
                  {["أ", "ب", "ج", "د"][i]}
                </span>
                <span className="text-white text-sm">{opt}</span>
              </button>
            ))}
          </div>
        </Card>

        <Button
          className="w-full"
          size="lg"
          onClick={submitAnswer}
        >
          {idx + 1 >= questions.length ? "إنهاء الاختبار" : "السؤال التالي"}
        </Button>
      </div>
    </div>
  );
}
