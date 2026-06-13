import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  BookOpen, Trophy, Target, Clock, CheckCircle, Star,
  ArrowLeft, Users, BarChart3, Zap, Shield
} from "lucide-react";

export default function HomePage() {
  const stats = [
    { value: "+500", label: "سؤال في البنك", icon: BookOpen },
    { value: "95%", label: "معدل نجاح طلابنا", icon: Trophy },
    { value: "+200", label: "طالب مستفيد", icon: Users },
    { value: "3", label: "اختبارات سنوية محلولة", icon: Target },
  ];

  const features = [
    { icon: BookOpen, title: "بنك أسئلة شامل", desc: "أكثر من 500 سؤال مصنّف حسب الموضوع والصعوبة مع شرح تفصيلي لكل إجابة." },
    { icon: Clock, title: "محاكاة اختبار حقيقي", desc: "اختبر نفسك بظروف الاختبار الحقيقية مع مؤقت دقيقتين لكل سؤال." },
    { icon: BarChart3, title: "تتبع التقدم", desc: "لوحة تحكم ذكية تُظهر أداءك في كل موضوع وتحدد نقاط ضعفك." },
    { icon: Trophy, title: "اختبارات السنوات السابقة", desc: "حل اختبارات 2023 و2024 و2025 الحقيقية مع نموذج إجابة مفصّل." },
  ];

  const topics = [
    { emoji: "📐", label: "الهندسة" },
    { emoji: "🔢", label: "الأعداد والمعادلات" },
    { emoji: "🔣", label: "الجبر" },
    { emoji: "🔄", label: "الأنماط" },
    { emoji: "🎲", label: "الاحتمالات" },
    { emoji: "⚖️", label: "النسب والتناسب" },
  ];

  const testimonials = [
    { name: "أحمد العمري", score: "128/120", text: "بفضل المنصة حصلت على درجة ممتازة في القدرات. الأسئلة مطابقة تماماً للاختبار الحقيقي!" },
    { name: "سارة الغامدي", score: "115/120", text: "المؤقت الزمني ساعدني كثيراً على إدارة وقتي في الاختبار الحقيقي." },
    { name: "محمد القحطاني", score: "122/120", text: "شرح الحلول واضح ومفصّل، تعلمت من أخطائي بسرعة." },
  ];

  return (
    <div dir="rtl">
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 pt-16 pb-24">
        {/* Background effects */}
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-100" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-amber-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500/8 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-2 mb-8">
              <Zap size={14} className="text-amber-400" />
              <span className="text-amber-400 text-sm font-medium">منصة تحضير القدرات الأولى</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
              احصل على{" "}
              <span className="text-gradient">درجتك المثالية</span>
              <br />
              في اختبار القدرات
            </h1>

            <p className="text-xl text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto">
              منصة متخصصة تقدم لك بنك أسئلة شاملاً، محاكاة اختبار حقيقية، وتتبعاً دقيقاً لأدائك — كل ما تحتاجه لتحقيق أعلى الدرجات.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  ابدأ التعلم الآن
                  <ArrowLeft size={20} className="rotate-180" />
                </Button>
              </Link>
              <Link href="/packages">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  استعرض الباقات
                </Button>
              </Link>
            </div>
          </div>

          {/* Dashboard Preview Card */}
          <div className="mt-20 max-w-4xl mx-auto">
            <div className="rounded-2xl border border-navy-600/50 bg-navy-800/40 backdrop-blur-sm p-6 glow-amber">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-slate-500 text-sm mr-2">لوحة التحكم — قدرات</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map(({ value, label, icon: Icon }) => (
                  <div key={label} className="bg-navy-900/60 rounded-xl p-4 text-center border border-navy-700/50">
                    <Icon size={20} className="text-amber-400 mx-auto mb-2" />
                    <div className="text-2xl font-black text-white">{value}</div>
                    <div className="text-xs text-slate-400 mt-1">{label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                {topics.slice(0, 3).map(({ emoji, label }) => (
                  <div key={label} className="bg-navy-900/40 rounded-xl p-3 flex items-center gap-3 border border-navy-700/30">
                    <span className="text-2xl">{emoji}</span>
                    <div>
                      <div className="text-sm font-medium text-white">{label}</div>
                      <div className="h-1.5 w-24 bg-navy-700 rounded-full mt-1.5 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" style={{ width: `${Math.random() * 60 + 30}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-navy-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">
              لماذا تختار <span className="text-gradient">قُدرات؟</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              كل ما تحتاجه لاجتياز اختبار القدرات في مكان واحد
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <Card key={title} className="hover:border-amber-500/30 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center mb-4 group-hover:from-amber-500/30 group-hover:to-orange-500/30 transition-all">
                  <Icon size={22} className="text-amber-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="py-24 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">مواضيع القسم الكمي</h2>
            <p className="text-slate-400 text-lg">تغطية شاملة لجميع أقسام اختبار القدرات</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {topics.map(({ emoji, label }) => (
              <div key={label} className="bg-navy-800/40 border border-navy-600/50 rounded-2xl p-5 text-center hover:border-amber-500/40 hover:bg-navy-700/50 transition-all duration-300 cursor-pointer group">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{emoji}</div>
                <div className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 bg-navy-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">قصص نجاح طلابنا</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(({ name, score, text }) => (
              <Card key={name} glow className="relative">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 leading-relaxed mb-6 text-sm">&ldquo;{text}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">{name}</div>
                    <div className="text-xs text-slate-500">طالب متخرج</div>
                  </div>
                  <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-xl px-3 py-2 text-center">
                    <div className="text-amber-400 font-black text-lg">{score}</div>
                    <div className="text-slate-500 text-xs">درجة القدرات</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-navy-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <Shield size={48} className="text-amber-400 mx-auto mb-6" />
          <h2 className="text-5xl font-black text-white mb-6">
            ابدأ رحلتك نحو <span className="text-gradient">النجاح</span>
          </h2>
          <p className="text-xl text-slate-400 mb-10">
            انضم إلى مئات الطلاب الذين حققوا درجاتهم المثالية مع قُدرات
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg">
                سجّل مجاناً الآن
                <ArrowLeft size={20} className="rotate-180" />
              </Button>
            </Link>
            <Link href="/packages">
              <Button variant="secondary" size="lg">استعرض الباقات</Button>
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-slate-500">
            {["✅ إلغاء في أي وقت", "✅ دفع آمن عبر Stripe", "✅ وصول فوري"].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
