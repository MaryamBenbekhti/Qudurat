import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  BookOpen, Trophy, Target, Clock, CheckCircle, Star,
  ArrowLeft, Users, BarChart3, Zap, Shield, TrendingUp,
  Brain, Layers
} from "lucide-react";

/* ─── Static data ─────────────────────────────────────────────────────────── */
const stats = [
  { value: "+500",  label: "سؤال في البنك",        icon: BookOpen },
  { value: "95%",   label: "معدل نجاح الطلاب",      icon: Trophy },
  { value: "+200",  label: "طالب مستفيد",            icon: Users },
  { value: "3",     label: "اختبارات سنوية محلولة",  icon: Target },
];

const features = [
  {
    icon: BookOpen,
    title: "بنك أسئلة شامل",
    desc: "أكثر من 500 سؤال مصنّف حسب الموضوع والصعوبة، مع شرح تفصيلي لكل إجابة.",
    color: "from-amber-500/20 to-orange-500/10",
    iconColor: "text-amber-400",
    border: "border-amber-500/20",
  },
  {
    icon: Clock,
    title: "محاكاة اختبار حقيقي",
    desc: "مؤقت دقيقتين لكل سؤال مع انتقال تلقائي — تماماً كاختبار قياس الفعلي.",
    color: "from-blue-500/20 to-indigo-500/10",
    iconColor: "text-blue-400",
    border: "border-blue-500/20",
  },
  {
    icon: BarChart3,
    title: "تتبع الأداء بذكاء",
    desc: "لوحة تحكم تُظهر أداءك لكل موضوع وتحدد نقاط الضعف التي تحتاج مراجعة.",
    color: "from-emerald-500/20 to-teal-500/10",
    iconColor: "text-emerald-400",
    border: "border-emerald-500/20",
  },
  {
    icon: Trophy,
    title: "اختبارات سنوات سابقة",
    desc: "حل اختبارات 2023، 2024، و2025 الحقيقية مع نموذج إجابة مفصّل لكل سؤال.",
    color: "from-purple-500/20 to-violet-500/10",
    iconColor: "text-purple-400",
    border: "border-purple-500/20",
  },
];

const topics = [
  { emoji: "📐", label: "الهندسة",               count: "85 سؤال"  },
  { emoji: "🔢", label: "الأعداد والمعادلات",      count: "90 سؤال"  },
  { emoji: "🔣", label: "الجبر",                  count: "75 سؤال"  },
  { emoji: "🔄", label: "الأنماط",                count: "60 سؤال"  },
  { emoji: "🎲", label: "الاحتمالات",             count: "55 سؤال"  },
  { emoji: "⚖️", label: "النسب والتناسب",         count: "70 سؤال"  },
];

const testimonials = [
  {
    name: "أحمد العمري",
    score: "128",
    max: "120",
    text: "بفضل المنصة حصلت على درجة ممتازة. الأسئلة مطابقة تماماً للاختبار الحقيقي!",
    avatar: "أ",
  },
  {
    name: "سارة الغامدي",
    score: "115",
    max: "120",
    text: "المؤقت الزمني ساعدني كثيراً على إدارة الوقت. أنصح كل طالب بهذه المنصة.",
    avatar: "س",
  },
  {
    name: "محمد القحطاني",
    score: "122",
    max: "120",
    text: "شرح الحلول واضح ومفصّل، تعلمت من أخطائي بسرعة وتحسّن أدائي بشكل ملحوظ.",
    avatar: "م",
  },
];

/* ─── Page ────────────────────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <div dir="rtl" className="overflow-x-hidden">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center px-4 pt-20 pb-16 overflow-hidden">
        {/* Ambient blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/3 w-[600px] h-[600px] bg-amber-500/[0.06] rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-blue-500/[0.06] rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-dot-grid opacity-100" />
        </div>

        <div className="relative max-w-4xl w-full mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-sm font-semibold">
            <Target size={14} />
            لطلاب الثانوية — اختبار قياس
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[1.1] tracking-tight">
              تدرَّب أذكى
              <br />
              <span className="text-gradient">اجتز قياس بثقة</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
              كل سؤال مع حلّه السريعة — لأن الوقت في قياس لا يرحم
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto min-w-[180px]">
                ابدأ مجاناً الآن
                <ArrowLeft size={18} className="rotate-180" />
              </Button>
            </Link>
            <Link href="/packages">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto min-w-[180px]">
                استعرض الباقات
              </Button>
            </Link>
          </div>

          {/* Trust line */}
          <p className="text-xs text-slate-600 flex flex-wrap justify-center gap-4">
            <span>✅ لا يحتاج بطاقة ائتمان للتسجيل</span>
            <span>✅ إلغاء في أي وقت</span>
            <span>✅ وصول فوري بعد الدفع</span>
          </p>
        </div>

        {/* Stats Row — dashboard preview */}
        <div className="relative mt-16 max-w-3xl w-full mx-auto px-4">
          <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#142035]/80 to-[#0f1b30]/80 backdrop-blur-sm p-6 glow-amber">
            {/* Fake window chrome */}
            <div className="flex items-center gap-2 mb-5 pb-4 border-b border-white/[0.06]">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
              </div>
              <span className="text-xs text-slate-600 mx-auto">لوحة التحكم — القدرات الكمي</span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-3 mb-5">
              {stats.map(({ value, label, icon: Icon }) => (
                <div
                  key={label}
                  className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-3 text-center"
                >
                  <Icon size={16} className="text-amber-400 mx-auto mb-1.5" />
                  <div className="text-xl font-black text-white">{value}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5 leading-tight">{label}</div>
                </div>
              ))}
            </div>

            {/* Progress bar preview */}
            <div className="rounded-xl bg-white/[0.03] border border-white/[0.05] p-3 mb-3">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-slate-500">XP 45/100</span>
                <span className="text-amber-400 font-bold">المستوى 1</span>
              </div>
              <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                <div className="h-full w-[45%] bg-gradient-to-r from-amber-500 to-orange-400 rounded-full" />
              </div>
              <div className="flex justify-between text-[10px] text-slate-600 mt-1">
                <span>مبتدئ</span>
                <span>محترف</span>
              </div>
            </div>

            {/* Topic chips */}
            <div className="flex flex-wrap gap-2">
              {topics.slice(0, 4).map(({ emoji, label }) => (
                <span
                  key={label}
                  className="chip text-[11px] py-1 px-2.5"
                >
                  {emoji} {label}
                </span>
              ))}
              <span className="chip chip-active text-[11px] py-1 px-2.5">الكل</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section className="section px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 space-y-3">
            <p className="text-amber-400 text-sm font-semibold tracking-wide uppercase">لماذا قُدرات</p>
            <h2 className="text-4xl sm:text-5xl font-black text-white">
              كل ما تحتاجه{" "}
              <span className="text-gradient">في مكان واحد</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              منصة متكاملة صُمِّمت خصيصاً لاختبار القدرات العامة
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map(({ icon: Icon, title, desc, color, iconColor, border }) => (
              <div
                key={title}
                className={`rounded-2xl border ${border} bg-gradient-to-br ${color} p-5 space-y-4 group hover:-translate-y-0.5 transition-transform duration-200`}
              >
                <div className={`w-10 h-10 rounded-xl bg-black/20 flex items-center justify-center`}>
                  <Icon size={20} className={iconColor} />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1.5 text-[15px]">{title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Topics Grid ──────────────────────────────────────────────────── */}
      <section className="section-sm px-4 bg-gradient-to-b from-transparent to-[#0a1220]/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 space-y-2">
            <h2 className="text-4xl font-black text-white">مواضيع القسم الكمي</h2>
            <p className="text-slate-500">تغطية شاملة لكل موضوع في الاختبار</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {topics.map(({ emoji, label, count }) => (
              <div
                key={label}
                className="rounded-2xl border border-white/[0.07] bg-gradient-to-br from-[#142035] to-[#0f1b30] p-4 text-center hover:border-amber-500/25 hover:-translate-y-0.5 transition-all duration-200 cursor-default"
              >
                <span className="text-3xl block mb-2">{emoji}</span>
                <span className="text-xs font-semibold text-slate-300 block">{label}</span>
                <span className="text-[10px] text-slate-600 mt-1 block">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section className="section px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 space-y-3">
            <p className="text-amber-400 text-sm font-semibold tracking-wide uppercase">قصص نجاح</p>
            <h2 className="text-4xl sm:text-5xl font-black text-white">
              طلابنا يتحدثون
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map(({ name, score, max, text, avatar }) => (
              <div
                key={name}
                className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#142035] to-[#0f1b30] p-6 space-y-5"
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <p className="text-slate-300 text-sm leading-relaxed">&ldquo;{text}&rdquo;</p>

                <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-sm font-black text-white flex-shrink-0">
                      {avatar}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{name}</div>
                      <div className="text-[11px] text-slate-500">طالب متخرج</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-gradient">{score}</div>
                    <div className="text-[10px] text-slate-500">/ {max} درجة</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section className="section-sm px-4">
        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-500/[0.08] to-orange-500/[0.04] p-10 sm:p-14 text-center overflow-hidden">
            {/* Glow */}
            <div className="absolute inset-0 glow-amber pointer-events-none rounded-3xl" />
            <div className="relative space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mx-auto shadow-xl shadow-amber-500/30">
                <Shield size={28} className="text-white" />
              </div>
              <div>
                <h2 className="text-4xl sm:text-5xl font-black text-white mb-3">
                  ابدأ رحلتك اليوم
                </h2>
                <p className="text-slate-400 text-lg">
                  انضم إلى مئات الطلاب الذين حققوا درجاتهم المثالية
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/register">
                  <Button size="lg" className="w-full sm:w-auto">
                    سجّل مجاناً — ابدأ الآن
                    <ArrowLeft size={18} className="rotate-180" />
                  </Button>
                </Link>
                <Link href="/packages">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    عرض الأسعار
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
