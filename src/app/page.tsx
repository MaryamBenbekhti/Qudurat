import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  BookOpen, Trophy, Target, Clock, CheckCircle, Star,
  ArrowLeft, Users, BarChart3, Zap, Shield, GraduationCap,
  Award, Lock, TrendingUp, Sparkles
} from "lucide-react";

const topics = [
  { emoji: "📐", label: "الهندسة",            count: "85+" },
  { emoji: "🔢", label: "الأعداد والمعادلات", count: "90+" },
  { emoji: "🔣", label: "الجبر",              count: "75+" },
  { emoji: "🔄", label: "الأنماط",            count: "60+" },
  { emoji: "🎲", label: "الاحتمالات",         count: "55+" },
  { emoji: "⚖️", label: "النسب والتناسب",    count: "70+" },
];

const features = [
  {
    icon: BookOpen, title: "بنك أسئلة شامل",
    desc: "أكثر من 500 سؤال مصنّف حسب الموضوع والصعوبة مع شرح تفصيلي لكل إجابة.",
    color: "from-amber-500/15 to-orange-500/5", iconColor: "text-amber-400", border: "border-amber-500/15",
  },
  {
    icon: Clock, title: "محاكاة حقيقية",
    desc: "مؤقت دقيقتين لكل سؤال مع انتقال تلقائي — تماماً كاختبار قياس الفعلي.",
    color: "from-blue-500/15 to-indigo-500/5", iconColor: "text-blue-400", border: "border-blue-500/15",
  },
  {
    icon: BarChart3, title: "تتبع الأداء",
    desc: "لوحة تحكم تُظهر أداءك لكل موضوع وتحدد نقاط الضعف التي تحتاج مراجعة.",
    color: "from-emerald-500/15 to-teal-500/5", iconColor: "text-emerald-400", border: "border-emerald-500/15",
  },
  {
    icon: Trophy, title: "اختبارات سابقة",
    desc: "حل اختبارات 2023 و2024 و2025 الحقيقية مع نموذج إجابة مفصّل لكل سؤال.",
    color: "from-purple-500/15 to-violet-500/5", iconColor: "text-purple-400", border: "border-purple-500/15",
  },
];

const testimonials = [
  { name: "أحمد العمري",    score: "128", text: "الأسئلة مطابقة تماماً للاختبار الحقيقي! حصلت على درجة ممتازة.", avatar: "أ" },
  { name: "سارة الغامدي",   score: "115", text: "المؤقت الزمني ساعدني كثيراً على إدارة الوقت في الاختبار.", avatar: "س" },
  { name: "محمد القحطاني",  score: "122", text: "شرح الحلول واضح ومفصّل، تعلمت من أخطائي بشكل ملحوظ.", avatar: "م" },
];

const packageIncludes = [
  { emoji: "📐", title: "6 مواضيع كمية شاملة", desc: "الهندسة، الأعداد، الجبر، الأنماط، الاحتمالات، النسب" },
  { emoji: "📝", title: "3 اختبارات حقيقية",   desc: "اختبارات قياس 2023 و2024 و2025 مع نماذج الإجابة الكاملة" },
  { emoji: "⏱️", title: "محاكاة بالوقت",       desc: "مؤقت دقيقتين لكل سؤال، انتقال تلقائي، تقييم شامل" },
  { emoji: "📊", title: "لوحة تحكم ذكية",       desc: "إحصاءات تفصيلية وتتبع التقدم لكل موضوع" },
];

export default function HomePage() {
  return (
    <div dir="rtl" className="overflow-x-hidden bg-[#070912]">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-20 overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-dot-grid opacity-60" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-amber-500/[0.04] rounded-full blur-[120px]" />
          <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-orange-500/[0.03] rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 left-0 w-[350px] h-[350px] bg-indigo-500/[0.03] rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-4xl w-full mx-auto text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/[0.08] border border-amber-500/20 text-amber-400/90 text-sm font-semibold mb-8">
            <Sparkles size={13} className="text-amber-400" />
            لطلاب الثانوية — اختبار قياس
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] tracking-tight mb-6">
            تدرَّب أذكى
            <br />
            <span className="text-gradient">اجتز قياس بثقة</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10">
            كل سؤال مع حلّه السريع — لأن الوقت في قياس لا يرحم
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto min-w-[200px] group">
                ابدأ الآن مجاناً
                <ArrowLeft size={17} className="rotate-180 group-hover:-translate-x-0.5 transition-transform" />
              </Button>
            </Link>
            <Link href="/packages">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto min-w-[200px]">
                استعرض الباقات
              </Button>
            </Link>
          </div>

          <p className="text-xs text-slate-600 flex flex-wrap justify-center gap-5">
            <span>✅ إنشاء الحساب مجاني</span>
            <span>✅ إلغاء في أي وقت</span>
            <span>✅ وصول فوري بعد الاشتراك</span>
          </p>
        </div>

        {/* Stats row */}
        <div className="relative mt-20 max-w-3xl w-full mx-auto px-4">
          <div className="card p-6 glow-amber-sm">
            {/* Window chrome */}
            <div className="flex items-center gap-2 mb-5 pb-4 border-b border-white/[0.06]">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/60" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/60" />
              </div>
              <span className="text-xs text-slate-600 mx-auto font-medium">القدرات الكمي — لوحة التحكم</span>
            </div>

            <div className="grid grid-cols-4 gap-3 mb-5">
              {[
                { v: "+500", l: "سؤال في البنك",        icon: <BookOpen size={15} className="text-amber-400" /> },
                { v: "95%",  l: "معدل نجاح الطلاب",     icon: <Trophy size={15} className="text-purple-400" /> },
                { v: "+200", l: "طالب مستفيد",           icon: <Users size={15} className="text-blue-400" /> },
                { v: "3",    l: "اختبارات سنوية",        icon: <Target size={15} className="text-emerald-400" /> },
              ].map(({ v, l, icon }) => (
                <div key={l} className="rounded-xl bg-white/[0.03] border border-white/[0.05] p-3 text-center">
                  <div className="flex justify-center mb-1.5">{icon}</div>
                  <div className="text-xl font-black text-white">{v}</div>
                  <div className="text-[10px] text-slate-600 mt-0.5 leading-tight">{l}</div>
                </div>
              ))}
            </div>

            <div className="rounded-xl bg-white/[0.025] border border-white/[0.045] p-3.5 mb-3">
              <div className="flex justify-between text-xs mb-2.5">
                <span className="text-slate-600">XP 45/100</span>
                <span className="text-amber-400 font-bold">المستوى 1</span>
              </div>
              <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                <div className="h-full w-[45%] bg-gradient-to-r from-amber-500 to-orange-400 rounded-full" />
              </div>
              <div className="flex justify-between text-[10px] text-slate-700 mt-1.5">
                <span>مبتدئ</span><span>محترف</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {topics.slice(0, 4).map(({ emoji, label }) => (
                <span key={label} className="chip text-[11px] py-1 px-2.5">{emoji} {label}</span>
              ))}
              <span className="chip chip-active text-[11px] py-1 px-2.5">الكل</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── About Me ─────────────────────────────────────────────────────── */}
      <section className="section px-4">
        <div className="max-w-5xl mx-auto">
          <div className="card overflow-hidden">
            <div className="grid md:grid-cols-5">

              {/* Left — avatar */}
              <div className="md:col-span-2 p-8 flex flex-col items-center text-center border-b md:border-b-0 md:border-l border-white/[0.06] bg-white/[0.015]">
                <div className="relative mb-6">
                  <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-4xl font-black text-white shadow-xl shadow-amber-500/25">
                    م
                  </div>
                  <div className="absolute -bottom-2 -left-2 w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                    <GraduationCap size={14} className="text-white" />
                  </div>
                </div>

                <h3 className="text-xl font-black text-white mb-1">محمد صالح</h3>
                <p className="text-amber-400 text-sm font-semibold mb-6">مختص في القدرات والرياضيات</p>

                <div className="flex flex-col gap-2.5 w-full">
                  {[
                    { icon: Award,       label: "خبرة 20 سنة في التدريس" },
                    { icon: Users,       label: "+200 طالب استفادوا من المنصة" },
                    { icon: TrendingUp,  label: "95% نسبة نجاح الطلاب" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] px-3 py-2.5 text-right">
                      <Icon size={13} className="text-amber-400 flex-shrink-0" />
                      <span className="text-xs text-slate-300">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — bio */}
              <div className="md:col-span-3 p-8 flex flex-col justify-center">
                <div className="badge badge-amber mb-5 w-fit">
                  <Target size={10} />
                  عن المدرّس
                </div>

                <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-5">
                  فكر أقل،{" "}
                  <span className="text-gradient">حل أسرع</span>
                </h2>

                <div className="space-y-3.5 text-slate-400 text-sm leading-relaxed">
                  <p>أنا محمد صالح، مختص في القدرات والرياضيات بخبرة 20 سنة في التدريس. أساعد طلاب الثانوية على إتقان المفاهيم الرياضية بطريقة ذكية وسريعة تناسب ضغط الوقت في الاختبار الحقيقي.</p>
                  <p>منهجيتي تعتمد على الأساليب المختصرة وحيل الحل السريع — لأن الدقيقتين لكل سؤال تحتاج تفكيراً مختلفاً. صممت هذه المنصة لتكون رفيقك الذكي في رحلة التحضير.</p>
                </div>

                <div className="mt-7 grid grid-cols-3 gap-3">
                  {[
                    { value: "6",    label: "مواضيع شاملة" },
                    { value: "3",    label: "اختبارات حقيقية" },
                    { value: "+500", label: "سؤال تدريبي" },
                  ].map(({ value, label }) => (
                    <div key={label} className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-3.5 text-center">
                      <div className="text-2xl font-black text-gradient">{value}</div>
                      <div className="text-[11px] text-slate-500 mt-1">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section className="section px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="badge badge-amber mx-auto mb-4">لماذا قُدرات</div>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              كل ما تحتاجه{" "}
              <span className="text-gradient">في مكان واحد</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              منصة متكاملة صُمِّمت خصيصاً لاختبار القدرات العامة
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map(({ icon: Icon, title, desc, color, iconColor, border }) => (
              <div key={title}
                className={`rounded-2xl border ${border} bg-gradient-to-br ${color} p-6 space-y-4 card-hover cursor-default`}
              >
                <div className="w-10 h-10 rounded-xl bg-black/20 flex items-center justify-center">
                  <Icon size={19} className={iconColor} />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2 text-[15px]">{title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Topics ───────────────────────────────────────────────────────── */}
      <section className="section-sm px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-3">مواضيع القسم الكمي</h2>
            <p className="text-slate-500">تغطية شاملة لكل موضوع في الاختبار</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
            {topics.map(({ emoji, label, count }) => (
              <div key={label}
                className="card card-hover p-4 text-center cursor-default"
              >
                <span className="text-3xl block mb-2.5">{emoji}</span>
                <span className="text-xs font-bold text-slate-200 block">{label}</span>
                <span className="text-[11px] text-amber-500/70 mt-1 block font-semibold">{count} سؤال</span>
              </div>
            ))}
          </div>

          {/* Past exams */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[2025, 2024, 2023].map((year) => (
              <div key={year}
                className="card card-hover p-5 flex items-center justify-between cursor-default"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📝</span>
                  <div>
                    <div className="font-bold text-white text-sm">اختبار {year}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">اختبار قياس حقيقي محلول</div>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-lg bg-amber-500/8 border border-amber-500/18 flex items-center justify-center flex-shrink-0">
                  <Lock size={13} className="text-amber-500/70" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Package ──────────────────────────────────────────────────────── */}
      <section className="section px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="badge badge-amber mx-auto mb-4">الاشتراك</div>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              باقة <span className="text-gradient">واحدة شاملة</span>
            </h2>
            <p className="text-slate-500 text-lg">كل ما تحتاجه للنجاح في مكان واحد</p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 items-start">

            {/* Price card */}
            <div className="lg:col-span-2">
              <div className="relative">
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-amber-500/30 to-orange-500/15 blur-2xl opacity-70 pointer-events-none" />
                <div className="relative card-premium rounded-2xl p-7">
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-black px-5 py-1.5 rounded-full shadow-lg shadow-amber-500/35">
                      ⭐ الأكثر اختياراً
                    </div>
                  </div>

                  <div className="text-center pt-3 mb-7">
                    <div className="flex items-end justify-center gap-1 mb-1">
                      <span className="text-6xl font-black text-white leading-none">99</span>
                      <span className="text-xl text-slate-400 mb-2">ر.س</span>
                    </div>
                    <div className="text-sm text-slate-500">شهرياً · إلغاء في أي وقت</div>
                  </div>

                  <ul className="space-y-3 mb-7">
                    {[
                      "+500 سؤال مصنّف حسب الموضوع والصعوبة",
                      "محاكاة اختبار بمؤقت دقيقتين لكل سؤال",
                      "اختبارات السنوات السابقة 2023 و2024 و2025",
                      "لوحة تحكم لتتبع التقدم ونقاط الضعف",
                      "شرح مفصّل لكل إجابة بأسرع الأساليب",
                      "وصول فوري فور إتمام الدفع",
                    ].map((text) => (
                      <li key={text} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-amber-500/15 border border-amber-500/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle size={10} className="text-amber-400" />
                        </div>
                        <span className="text-slate-300 text-xs leading-relaxed">{text}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/register">
                    <Button className="w-full" size="lg">
                      سجّل وابدأ الآن
                      <ArrowLeft size={16} className="rotate-180" />
                    </Button>
                  </Link>

                  <div className="mt-4 flex justify-center gap-4 text-[11px] text-slate-600">
                    <span>🔒 دفع آمن</span>
                    <span>✅ إلغاء فوري</span>
                  </div>
                </div>
              </div>
            </div>

            {/* What's included */}
            <div className="lg:col-span-3 space-y-3.5">
              <h3 className="text-xl font-black text-white mb-6">ماذا يشمل الاشتراك؟</h3>
              {packageIncludes.map(({ emoji, title, desc }) => (
                <div key={title}
                  className="card card-hover flex gap-4 items-start p-5"
                >
                  <span className="text-2xl flex-shrink-0 mt-0.5">{emoji}</span>
                  <div>
                    <h4 className="font-bold text-white text-sm mb-1">{title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section className="section px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="badge badge-amber mx-auto mb-4">قصص نجاح</div>
            <h2 className="text-4xl sm:text-5xl font-black text-white">طلابنا يتحدثون</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map(({ name, score, text, avatar }) => (
              <div key={name} className="card p-6 flex flex-col gap-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed flex-1">&ldquo;{text}&rdquo;</p>
                <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-sm font-black text-white flex-shrink-0">
                      {avatar}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{name}</div>
                      <div className="text-[11px] text-slate-600">طالب متخرج</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-gradient">{score}</div>
                    <div className="text-[10px] text-slate-600">درجة</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section className="section-sm px-4 pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-3xl border border-amber-500/15 bg-gradient-to-br from-amber-500/[0.07] to-orange-500/[0.03] p-10 sm:p-14 text-center overflow-hidden">
            <div className="absolute inset-0 bg-dot-grid opacity-40 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-amber-500/[0.08] rounded-full blur-[80px] pointer-events-none" />
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-amber-500/30">
                <Shield size={26} className="text-white" />
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-3">ابدأ رحلتك اليوم</h2>
              <p className="text-slate-400 text-lg mb-8">
                انضم إلى مئات الطلاب الذين حققوا درجاتهم المثالية
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/register">
                  <Button size="lg" className="w-full sm:w-auto group">
                    سجّل مجاناً — ابدأ الآن
                    <ArrowLeft size={17} className="rotate-180 group-hover:-translate-x-0.5 transition-transform" />
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
