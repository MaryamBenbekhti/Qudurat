"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Button } from "@/components/ui/button";
import { CATEGORY_LABELS, CATEGORY_ICONS } from "@/lib/utils";
import {
  Trophy, BookOpen, Lock, CheckCircle, Zap, ArrowLeft,
  Clock, Target
} from "lucide-react";

type Progress = {
  category: string;
  total: number;
  correct: number;
};

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

const QUANTITATIVE_CATEGORIES = ["GEOMETRY", "NUMBERS_EQUATIONS", "ALGEBRA", "PATTERNS", "PROBABILITY", "RATIO"];
const EXAM_CATEGORIES = ["EXAM_2025", "EXAM_2024", "EXAM_2023"];

function SuccessNotice() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  if (!success) return null;
  return (
    <div className="mb-8 bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 text-emerald-400 text-center">
      🎉 تم الاشتراك بنجاح! يمكنك الآن الوصول إلى جميع الأسئلة والاختبارات.
    </div>
  );
}

export function DashboardClient({ user, progress, recentSessions, totalAttempts }: Props) {
  const progressMap = Object.fromEntries(
    progress.map((p) => [p.category, p])
  );

  const totalCorrect = progress.reduce((acc, p) => acc + p.correct, 0);
  const overallPct = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;

  return (
    <div dir="rtl" className="min-h-screen bg-navy-950 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <Suspense>
          <SuccessNotice />
        </Suspense>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-black text-white">
              مرحباً، {user.name ?? "طالب"} 👋
            </h1>
            <p className="text-slate-400 mt-1">
              {user.isPremium
                ? "اشتراكك نشط — استمر في التعلم!"
                : "قم بالاشتراك للوصول إلى جميع الأسئلة"}
            </p>
          </div>
          {user.isPremium && (
            <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-2">
              <Zap size={16} className="text-amber-400" />
              <span className="text-amber-400 font-semibold text-sm">Premium ✨</span>
            </div>
          )}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "إجمالي الأسئلة", value: totalAttempts, icon: BookOpen, color: "text-blue-400" },
            { label: "الإجابات الصحيحة", value: totalCorrect, icon: CheckCircle, color: "text-emerald-400" },
            { label: "معدل الصحة", value: `${overallPct}%`, icon: Target, color: "text-amber-400" },
            { label: "الجلسات المكتملة", value: recentSessions.length, icon: Trophy, color: "text-purple-400" },
          ].map(({ label, value, icon: Icon, color }) => (
            <Card key={label} className="text-center">
              <Icon size={24} className={`${color} mx-auto mb-2`} />
              <div className="text-2xl font-black text-white">{value}</div>
              <div className="text-xs text-slate-400 mt-1">{label}</div>
            </Card>
          ))}
        </div>

        {/* Upsell Banner */}
        {!user.isPremium && (
          <div className="mb-10 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Lock size={32} className="text-amber-400 flex-shrink-0" />
              <div>
                <div className="font-bold text-white text-lg">افتح الوصول الكامل</div>
                <div className="text-slate-400 text-sm">اشترك الآن للوصول إلى +500 سؤال ومحاكاة الاختبار الحقيقي</div>
              </div>
            </div>
            <Link href="/packages">
              <Button>اشترك — 99 ر.س/شهر</Button>
            </Link>
          </div>
        )}

        {/* Quantitative Topics */}
        <div className="mb-10">
          <h2 className="text-2xl font-black text-white mb-6">📊 القسم الكمي</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {QUANTITATIVE_CATEGORIES.map((cat) => {
              const prog = progressMap[cat];
              const pct = prog?.total ? Math.round((prog.correct / prog.total) * 100) : 0;

              return (
                <Card key={cat} className="hover:border-amber-500/30 transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{CATEGORY_ICONS[cat]}</span>
                      <div>
                        <div className="font-bold text-white text-sm">{CATEGORY_LABELS[cat]}</div>
                        <div className="text-xs text-slate-500">
                          {prog ? `${prog.correct}/${prog.total} صحيح` : "لم تبدأ بعد"}
                        </div>
                      </div>
                    </div>
                    <span className="text-lg font-black text-amber-400">{pct}%</span>
                  </div>
                  <ProgressBar value={pct} className="mb-4" />
                  {user.isPremium ? (
                    <Link href={`/practice/${cat.toLowerCase()}`}>
                      <Button variant="secondary" size="sm" className="w-full">
                        تدرّب الآن
                        <ArrowLeft size={14} className="rotate-180" />
                      </Button>
                    </Link>
                  ) : (
                    <Button variant="secondary" size="sm" className="w-full opacity-50 cursor-not-allowed" disabled>
                      <Lock size={14} />
                      يتطلب اشتراكاً
                    </Button>
                  )}
                </Card>
              );
            })}
          </div>
        </div>

        {/* Past Exams */}
        <div className="mb-10">
          <h2 className="text-2xl font-black text-white mb-6">📝 اختبارات السنوات السابقة</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {EXAM_CATEGORIES.map((cat) => {
              const year = cat.split("_")[1];
              const prog = progressMap[cat];
              const pct = prog?.total ? Math.round((prog.correct / prog.total) * 100) : 0;

              return (
                <Card key={cat} glow className="hover:border-amber-500/30 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">📝</span>
                    <div>
                      <div className="font-black text-white text-lg">اختبار {year}</div>
                      <div className="text-xs text-slate-500">
                        {prog ? `${prog.correct}/${prog.total} صحيح` : "لم تبدأ بعد"}
                      </div>
                    </div>
                  </div>
                  {prog && <ProgressBar value={pct} className="mb-4" color="green" />}
                  {user.isPremium ? (
                    <Link href={`/exam/${year}`}>
                      <Button size="sm" className="w-full">
                        <Clock size={14} />
                        ابدأ الاختبار المحدود بالوقت
                      </Button>
                    </Link>
                  ) : (
                    <Button size="sm" className="w-full opacity-50 cursor-not-allowed" disabled>
                      <Lock size={14} />
                      يتطلب اشتراكاً
                    </Button>
                  )}
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Sessions */}
        {recentSessions.length > 0 && (
          <div>
            <h2 className="text-2xl font-black text-white mb-6">🏆 آخر الجلسات</h2>
            <div className="space-y-3">
              {recentSessions.map((s) => (
                <div key={s.id} className="flex items-center justify-between bg-navy-800/40 border border-navy-600/40 rounded-xl px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{s.examYear ? "📝" : "📊"}</span>
                    <div>
                      <div className="font-medium text-white text-sm">
                        {s.examYear ? `اختبار ${s.examYear}` : (s.category ? CATEGORY_LABELS[s.category] : "تدريب")}
                      </div>
                      <div className="text-xs text-slate-500">
                        {s.completedAt ? new Date(s.completedAt).toLocaleDateString("ar-SA") : ""}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-xl text-amber-400">{Math.round(s.score)}%</div>
                    <div className="text-xs text-slate-500">{s.correctQ}/{s.totalQ} صحيح</div>
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
