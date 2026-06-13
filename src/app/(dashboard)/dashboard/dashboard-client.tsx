"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Button } from "@/components/ui/button";
import { CATEGORY_LABELS, CATEGORY_ICONS } from "@/lib/utils";
import {
  Lock, CheckSquare, Flame, Zap, Clock, ArrowLeft,
  BarChart2, Target, Trophy, BookOpen
} from "lucide-react";

/* ─── Types ────────────────────────────────────────────────────────────────── */
type Progress = { category: string; total: number; correct: number };
type ExamSession = {
  id: string;
  examYear: number | null;
  category: string | null;
  score: number;
  completedAt: Date | null;
  totalQ: number;
  correctQ: number;
};

interface Props {
  user: { name?: string | null; isPremium: boolean };
  progress: Progress[];
  recentSessions: ExamSession[];
  totalAttempts: number;
}

/* ─── Constants ─────────────────────────────────────────────────────────────── */
const QUANT_CATS = [
  "GEOMETRY","NUMBERS_EQUATIONS","ALGEBRA","PATTERNS","PROBABILITY","RATIO",
] as const;
const EXAM_CATS = ["EXAM_2025","EXAM_2024","EXAM_2023"] as const;

const TOPIC_FILTERS = [
  { key: "ALL",                label: "الكل" },
  { key: "GEOMETRY",           label: "هندسة" },
  { key: "NUMBERS_EQUATIONS",  label: "أعداد وعمليات" },
  { key: "ALGEBRA",            label: "جبر ومعادلات" },
  { key: "PATTERNS",           label: "تسلسل وأنماط" },
  { key: "PROBABILITY",        label: "احتمالات" },
  { key: "RATIO",              label: "نسب وتناسب" },
];
const DIFF_FILTERS = [
  { key: "ALL",    label: "الكل"   },
  { key: "EASY",   label: "سهل"   },
  { key: "MEDIUM", label: "متوسط" },
  { key: "HARD",   label: "صعب"   },
];

/* ─── Success notice ────────────────────────────────────────────────────────── */
function SuccessNotice() {
  const sp = useSearchParams();
  if (!sp.get("success")) return null;
  return (
    <div className="mb-6 rounded-xl border border-emerald-500/25 bg-emerald-500/[0.08] px-5 py-3 text-emerald-400 text-sm text-center">
      🎉 تم الاشتراك بنجاح! يمكنك الآن الوصول إلى جميع الأسئلة والاختبارات.
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────────────────────── */
export function DashboardClient({
  user,
  progress,
  recentSessions,
  totalAttempts,
}: Props) {
  const [topicFilter, setTopicFilter] = useState("ALL");

  const progressMap = Object.fromEntries(progress.map((p) => [p.category, p]));
  const totalCorrect = progress.reduce((a, p) => a + p.correct, 0);
  const overallPct = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;

  // XP simulation (replace with real XP from DB when added)
  const xp = totalCorrect * 5;
  const xpLevel = Math.floor(xp / 100) + 1;
  const xpProgress = xp % 100;

  const visibleCats =
    topicFilter === "ALL"
      ? QUANT_CATS
      : QUANT_CATS.filter((c) => c === topicFilter);

  return (
    <div dir="rtl" className="min-h-screen bg-[#080e1a] py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-6">

        <Suspense><SuccessNotice /></Suspense>

        {/* ── Hero header ───────────────────────────────────────────────── */}
        <div className="rounded-2xl border border-white/[0.07] bg-gradient-to-br from-[#142035] to-[#0f1b30] p-6 sm:p-8">

          {/* Top row */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-semibold mb-3">
                <Target size={12} />
                لطلاب الثانوية — اختبار قياس
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                تدرَّب أذكى
                <br />
                <span className="text-gradient">اجتز قياس بثقة</span>
              </h1>
              <p className="text-slate-500 text-sm mt-2">
                كل سؤال مع حلّه السريعة — لأن الوقت في قياس لا يرحم
              </p>
            </div>

            {user.isPremium && (
              <div className="flex-shrink-0">
                <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-400 text-sm font-bold">
                  <Zap size={14} />
                  مشترك مميز
                </div>
              </div>
            )}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            {[
              { label: "نقاط XP",  value: xp,           icon: <Zap size={15} className="text-amber-400" /> },
              { label: "مستواك",   value: `${xpLevel}`,  icon: <Trophy size={15} className="text-purple-400" /> },
              { label: "موضوع",    value: QUANT_CATS.length, icon: <BookOpen size={15} className="text-blue-400" /> },
              { label: "سؤال",     value: totalAttempts, icon: <CheckSquare size={15} className="text-emerald-400" /> },
            ].map(({ label, value, icon }) => (
              <div
                key={label}
                className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-3 text-center"
              >
                <div className="flex justify-center mb-1.5">{icon}</div>
                <div className="text-xl font-black text-white">{value}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{label}</div>
              </div>
            ))}
          </div>

          {/* XP Progress bar */}
          <div className="rounded-xl bg-white/[0.04] border border-white/[0.05] p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-500">XP {xpProgress}/100</span>
              <span className="text-xs font-bold text-amber-400">المستوى {xpLevel}</span>
            </div>
            <ProgressBar value={xpProgress} max={100} color="amber" size="md" />
            <div className="flex justify-between text-[10px] text-slate-600 mt-1.5">
              <span>مبتدئ</span>
              <span>محترف</span>
            </div>
          </div>
        </div>

        {/* ── Upsell banner ────────────────────────────────────────────── */}
        {!user.isPremium && (
          <div className="rounded-2xl border border-amber-500/25 bg-gradient-to-r from-amber-500/[0.08] to-orange-500/[0.04] p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <Lock size={18} className="text-amber-400" />
              </div>
              <div>
                <div className="font-bold text-white">افتح الوصول الكامل</div>
                <div className="text-slate-500 text-sm mt-0.5">
                  اشترك للوصول إلى +500 سؤال ومحاكاة الاختبار الحقيقي
                </div>
              </div>
            </div>
            <Link href="/packages" className="flex-shrink-0">
              <Button size="sm">اشترك — 99 ر.س/شهر</Button>
            </Link>
          </div>
        )}

        {/* ── Overall progress ────────────────────────────────────────── */}
        {totalAttempts > 0 && (
          <div className="rounded-2xl border border-white/[0.07] bg-gradient-to-br from-[#142035] to-[#0f1b30] p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-white text-sm">التقدم الكلي</h2>
              <span className="text-xl font-black text-amber-400">{overallPct}%</span>
            </div>
            <ProgressBar
              value={overallPct}
              color={overallPct >= 70 ? "green" : overallPct >= 50 ? "amber" : "blue"}
              size="md"
              label={`${totalCorrect} / ${totalAttempts} إجابة صحيحة`}
            />
          </div>
        )}

        {/* ── Timed-exam quick-launch ──────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              href: "/exam/2025",
              label: "10 أسئلة بتوقيت",
              sub: "محاكاة اختبار قياس",
              icon: "⏱️",
              color: "from-amber-500/10 to-orange-500/5 border-amber-500/20",
            },
            {
              href: "/exam/2025",
              label: "5 أسئلة سريعة",
              sub: "تدريب خفيف ومركّز",
              icon: "⚡",
              color: "from-blue-500/10 to-indigo-500/5 border-blue-500/20",
            },
          ].map(({ href, label, sub, icon, color }) =>
            user.isPremium ? (
              <Link key={label} href={href}>
                <div className={`rounded-2xl border bg-gradient-to-br ${color} p-5 flex items-center justify-between hover:-translate-y-0.5 transition-transform cursor-pointer`}>
                  <div>
                    <div className="font-bold text-white">{label}</div>
                    <div className="text-slate-500 text-xs mt-0.5">{sub}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{icon}</span>
                    <ArrowLeft size={16} className="text-slate-500 rotate-180" />
                  </div>
                </div>
              </Link>
            ) : (
              <div key={label} className={`rounded-2xl border bg-gradient-to-br ${color} p-5 flex items-center justify-between opacity-50 cursor-not-allowed`}>
                <div>
                  <div className="font-bold text-white">{label}</div>
                  <div className="text-slate-500 text-xs mt-0.5">{sub}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Lock size={16} className="text-slate-500" />
                </div>
              </div>
            )
          )}
        </div>

        {/* ── Topic filter chips ───────────────────────────────────────── */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black text-white">تدريب حسب الموضوع</h2>
          </div>

          <div className="flex gap-2 flex-wrap mb-5">
            {TOPIC_FILTERS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setTopicFilter(key)}
                className={`chip ${topicFilter === key ? "chip-active" : ""}`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Topic cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {(visibleCats as readonly string[]).map((cat) => {
              const prog = progressMap[cat];
              const pct = prog?.total ? Math.round((prog.correct / prog.total) * 100) : 0;

              return (
                <div
                  key={cat}
                  className="rounded-2xl border border-white/[0.07] bg-gradient-to-br from-[#142035] to-[#0f1b30] p-5 flex flex-col gap-4 hover:border-amber-500/20 transition-colors"
                >
                  {/* Header */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center text-xl flex-shrink-0">
                      {CATEGORY_ICONS[cat]}
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-white text-sm truncate">{CATEGORY_LABELS[cat]}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {prog ? `${prog.correct}/${prog.total} صحيح` : "لم تبدأ بعد"}
                      </div>
                    </div>
                    <span className="font-black text-amber-400 text-lg mr-auto">{pct}%</span>
                  </div>

                  <ProgressBar value={pct} color="amber" size="xs" />

                  {user.isPremium ? (
                    <Link href={`/practice/${cat.toLowerCase()}`}>
                      <Button variant="secondary" size="sm" className="w-full text-xs">
                        تدرّب الآن
                        <ArrowLeft size={12} className="rotate-180" />
                      </Button>
                    </Link>
                  ) : (
                    <Button variant="secondary" size="sm" className="w-full text-xs" disabled>
                      <Lock size={12} />
                      يتطلب اشتراكاً
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Past exams ──────────────────────────────────────────────── */}
        <div>
          <h2 className="text-lg font-black text-white mb-4">اختبارات السنوات السابقة</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(EXAM_CATS as readonly string[]).map((cat) => {
              const year = cat.split("_")[1];
              const prog = progressMap[cat];
              const pct = prog?.total ? Math.round((prog.correct / prog.total) * 100) : 0;

              return (
                <div
                  key={cat}
                  className="rounded-2xl border border-white/[0.07] bg-gradient-to-br from-[#142035] to-[#0f1b30] p-5 flex flex-col gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center text-xl flex-shrink-0">
                      📝
                    </div>
                    <div>
                      <div className="font-bold text-white">اختبار {year}</div>
                      <div className="text-[11px] text-slate-500">
                        {prog ? `${prog.correct}/${prog.total} صحيح` : "لم تبدأ بعد"}
                      </div>
                    </div>
                    {prog && <span className="font-black text-emerald-400 text-lg mr-auto">{pct}%</span>}
                  </div>

                  {prog && <ProgressBar value={pct} color="green" size="xs" />}

                  {user.isPremium ? (
                    <Link href={`/exam/${year}`}>
                      <Button size="sm" className="w-full text-xs">
                        <Clock size={12} />
                        ابدأ الاختبار المحدود بالوقت
                      </Button>
                    </Link>
                  ) : (
                    <Button size="sm" className="w-full text-xs" disabled>
                      <Lock size={12} />
                      يتطلب اشتراكاً
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Recent sessions ─────────────────────────────────────────── */}
        {recentSessions.length > 0 && (
          <div>
            <h2 className="text-lg font-black text-white mb-4">آخر الجلسات</h2>
            <div className="rounded-2xl border border-white/[0.07] bg-gradient-to-br from-[#142035] to-[#0f1b30] divide-y divide-white/[0.05] overflow-hidden">
              {recentSessions.map((s) => (
                <div key={s.id} className="flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{s.examYear ? "📝" : "📊"}</span>
                    <div>
                      <div className="text-sm font-semibold text-white">
                        {s.examYear
                          ? `اختبار ${s.examYear}`
                          : s.category
                          ? CATEGORY_LABELS[s.category]
                          : "تدريب"}
                      </div>
                      <div className="text-xs text-slate-600">
                        {s.completedAt
                          ? new Date(s.completedAt).toLocaleDateString("ar-SA")
                          : ""}
                      </div>
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="font-black text-lg text-amber-400">{Math.round(s.score)}%</div>
                    <div className="text-xs text-slate-600">{s.correctQ}/{s.totalQ}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
