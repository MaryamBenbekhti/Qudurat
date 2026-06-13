"use client";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Zap, BookOpen, Clock, Trophy, BarChart3, Lock } from "lucide-react";

const features = [
  { icon: BookOpen, text: "+500 سؤال في بنك الأسئلة مصنّفة حسب الموضوع" },
  { icon: Clock, text: "محاكاة اختبار حقيقية بمؤقت دقيقتين لكل سؤال" },
  { icon: Trophy, text: "اختبارات السنوات السابقة: 2023، 2024، 2025" },
  { icon: BarChart3, text: "لوحة تحكم لتتبع التقدم ونقاط الضعف" },
  { icon: CheckCircle, text: "شرح مفصّل لكل إجابة" },
  { icon: Zap, text: "وصول فوري فور إتمام الدفع" },
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
    <div dir="rtl" className="min-h-screen bg-navy-950 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {canceled && (
          <div className="mb-8 bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-center">
            تم إلغاء عملية الدفع. يمكنك المحاولة مرة أخرى في أي وقت.
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-2 mb-6">
            <Zap size={14} className="text-amber-400" />
            <span className="text-amber-400 text-sm font-medium">باقة واحدة شاملة</span>
          </div>
          <h1 className="text-5xl font-black text-white mb-4">
            اشترك في باقة <span className="text-gradient">قُدرات الشاملة</span>
          </h1>
          <p className="text-slate-400 text-xl">كل ما تحتاجه للنجاح في اختبار القدرات</p>
        </div>

        {/* Price Card */}
        <div className="relative max-w-lg mx-auto">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-3xl blur-xl" />

          <Card glow className="relative border-amber-500/40 bg-navy-800/80 rounded-3xl p-8">
            {/* Popular badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold px-6 py-1.5 rounded-full shadow-lg shadow-amber-500/40">
                ⭐ الأكثر اختياراً
              </div>
            </div>

            <div className="text-center mb-8 pt-2">
              <div className="text-6xl font-black text-white mb-1">
                99<span className="text-2xl text-slate-400">ر.س</span>
              </div>
              <div className="text-slate-400 text-sm">/ شهرياً • إلغاء في أي وقت</div>
            </div>

            <ul className="space-y-4 mb-8">
              {features.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle size={12} className="text-amber-400" />
                  </div>
                  <span className="text-slate-300 text-sm leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>

            {error && (
              <div className="mb-4 bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            {session?.user.isPremium ? (
              <Button className="w-full" size="lg" onClick={() => router.push("/dashboard")}>
                الذهاب للوحة التحكم ✨
              </Button>
            ) : (
              <Button
                className="w-full"
                size="lg"
                loading={loading}
                onClick={handleSubscribe}
              >
                {status === "unauthenticated" ? (
                  <>
                    <Lock size={18} />
                    سجّل وابدأ الآن
                  </>
                ) : (
                  "اشترك الآن — 99 ر.س/شهر"
                )}
              </Button>
            )}

            <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-slate-500">
              <span>🔒 دفع آمن عبر Stripe</span>
              <span>✅ إلغاء فوري</span>
              <span>⚡ وصول فوري</span>
            </div>
          </Card>
        </div>

        {/* What's included detail */}
        <div className="mt-20">
          <h2 className="text-3xl font-black text-white text-center mb-12">
            ماذا يشمل الاشتراك؟
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "القسم الكمي الشامل",
                desc: "الهندسة، الأعداد والمعادلات، الجبر، الأنماط، الاحتمالات، النسب والتناسب",
                icon: "📐",
              },
              {
                title: "اختبارات حقيقية",
                desc: "اختبارات قياس من سنوات 2023 و2024 و2025 مع نموذج الإجابة الكاملة",
                icon: "📝",
              },
              {
                title: "محاكاة الاختبار الحقيقي",
                desc: "مؤقت دقيقتين لكل سؤال، انتقال تلقائي، تقييم الأداء في النهاية",
                icon: "⏱️",
              },
              {
                title: "تتبع الأداء",
                desc: "إحصاءات تفصيلية لكل موضوع، نقاط القوة والضعف، تاريخ الأداء",
                icon: "📊",
              },
            ].map(({ title, desc, icon }) => (
              <Card key={title} className="flex gap-4 items-start">
                <span className="text-3xl">{icon}</span>
                <div>
                  <h3 className="font-bold text-white mb-1">{title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </Card>
            ))}
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
