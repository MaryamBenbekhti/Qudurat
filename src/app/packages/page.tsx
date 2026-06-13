"use client";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  CheckCircle, Zap, BookOpen, Clock, Trophy,
  BarChart3, Lock, ArrowLeft
} from "lucide-react";

const features = [
  { icon: BookOpen,  text: "+500 سؤال في بنك الأسئلة مصنّفة حسب الموضوع" },
  { icon: Clock,     text: "محاكاة اختبار حقيقية بمؤقت دقيقتين لكل سؤال" },
  { icon: Trophy,    text: "اختبارات السنوات السابقة: 2023، 2024، 2025" },
  { icon: BarChart3, text: "لوحة تحكم لتتبع التقدم ونقاط الضعف لكل موضوع" },
  { icon: CheckCircle, text: "شرح مفصّل لكل إجابة مع الأسلوب الأمثل للحل" },
  { icon: Zap,       text: "وصول فوري فور إتمام الدفع بدون أي انتظار" },
];

const included = [
  {
    emoji: "📐",
    title: "القسم الكمي الشامل",
    desc: "الهندسة، الأعداد، الجبر، الأنماط، الاحتمالات، النسب والتناسب",
  },
  {
    emoji: "📝",
    title: "اختبارات حقيقية",
    desc: "اختبارات قياس 2023 و2024 و2025 مع نموذج الإجابة الكاملة",
  },
  {
    emoji: "⏱️",
    title: "محاكاة الاختبار",
    desc: "مؤقت دقيقتين لكل سؤال، انتقال تلقائي، تقييم شامل في النهاية",
  },
  {
    emoji: "📊",
    title: "تتبع الأداء",
    desc: "إحصاءات تفصيلية لكل موضوع، نقاط القوة والضعف، تاريخ الأداء",
  },
];

function PackagesContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const canceled = searchParams.get("canceled");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubscribe() {
    if (!session) {
      router.push("/register?redirect=/packages");
      return;
    }
    if (session.user.isPremium) {
      router.push("/dashboard");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/stripe/create-checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError("حدث خطأ أثناء إنشاء جلسة الدفع");
      }
    } catch {
      setError("حدث خطأ، يرجى المحاولة مرة أخرى");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div dir="rtl" className="min-h-screen bg-[#080e1a] py-20 px-4">
      <div className="max-w-5xl mx-auto">

        {canceled && (
          <div className="mb-8 rounded-xl border border-red-500/25 bg-red-500/[0.08] p-4 text-red-400 text-sm text-center">
            تم إلغاء عملية الدفع. يمكنك المحاولة مرة أخرى في أي وقت.
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-sm font-semibold">
            <Zap size={14} />
            باقة واحدة شاملة — كل ما تحتاجه
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-white leading-tight">
            باقة{" "}
            <span className="text-gradient">قُدرات الشاملة</span>
          </h1>
          <p className="text-slate-400 text-lg">استثمر في تعليمك واحصل على أعلى الدرجات</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">

          {/* Price Card */}
          <div className="lg:col-span-2">
            <div className="relative">
              {/* Ambient glow */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-amber-500/30 to-orange-500/20 blur-xl opacity-60 pointer-events-none" />

              <div className="relative rounded-2xl border border-amber-500/30 bg-gradient-to-br from-[#1a2840] to-[#0f1b30] p-7">
                {/* Popular badge */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-black px-5 py-1.5 rounded-full shadow-lg shadow-amber-500/30 whitespace-nowrap">
                    ⭐ الأكثر اختياراً
                  </div>
                </div>

                {/* Price */}
                <div className="text-center pt-2 mb-7">
                  <div className="flex items-end justify-center gap-1 mb-1">
                    <span className="text-6xl font-black text-white leading-none">99</span>
                    <span className="text-xl text-slate-400 mb-2">ر.س</span>
                  </div>
                  <div className="text-sm text-slate-500">شهرياً · إلغاء في أي وقت</div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-7">
                  {features.map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle size={11} className="text-amber-400" />
                      </div>
                      <span className="text-slate-300 text-xs leading-relaxed">{text}</span>
                    </li>
                  ))}
                </ul>

                {error && (
                  <div className="mb-4 rounded-xl border border-red-500/25 bg-red-500/[0.08] p-3 text-red-400 text-xs text-center">
                    {error}
                  </div>
                )}

                {session?.user.isPremium ? (
                  <Button className="w-full" size="lg" onClick={() => router.push("/dashboard")}>
                    الذهاب للوحة التحكم ✨
                  </Button>
                ) : (
                  <Button className="w-full" size="lg" loading={loading} onClick={handleSubscribe}>
                    {status === "unauthenticated" ? (
                      <><Lock size={16} />سجّل وابدأ الآن</>
                    ) : (
                      "اشترك الآن — 99 ر.س/شهر"
                    )}
                  </Button>
                )}

                <div className="mt-5 flex flex-wrap justify-center gap-3 text-[11px] text-slate-600">
                  <span>🔒 دفع آمن عبر Stripe</span>
                  <span>✅ إلغاء فوري</span>
                </div>
              </div>
            </div>
          </div>

          {/* Included detail */}
          <div className="lg:col-span-3 space-y-4">
            <h2 className="text-2xl font-black text-white mb-6">ماذا يشمل الاشتراك؟</h2>
            {included.map(({ emoji, title, desc }) => (
              <div
                key={title}
                className="flex gap-4 items-start rounded-2xl border border-white/[0.07] bg-gradient-to-br from-[#142035] to-[#0f1b30] p-5 hover:border-amber-500/20 transition-colors"
              >
                <span className="text-3xl flex-shrink-0">{emoji}</span>
                <div>
                  <h3 className="font-bold text-white mb-1">{title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}

            {/* Secondary CTA */}
            {!session && (
              <div className="mt-6 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 flex items-center justify-between gap-4">
                <div>
                  <div className="font-bold text-white text-sm">ليس لديك حساب؟</div>
                  <div className="text-slate-500 text-xs mt-0.5">سجّل مجاناً وابدأ في ثوانٍ</div>
                </div>
                <Button variant="outline" size="sm" onClick={() => router.push("/register")}>
                  إنشاء حساب
                  <ArrowLeft size={14} className="rotate-180" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PackagesPage() {
  return (
    <Suspense>
      <PackagesContent />
    </Suspense>
  );
}
