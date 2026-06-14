import Link from "next/link";
import { BookOpen, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#070912]" dir="rtl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/25">
                <BookOpen size={17} className="text-white" />
              </div>
              <div className="leading-none">
                <span className="block text-base font-black text-white">القدرات الكمي</span>
                <span className="block text-[10px] text-amber-400/60 mt-0.5">فكر أقل، حل أسرع</span>
              </div>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              منصة متخصصة في تحضير اختبار القدرات العامة بأساليب ذكية وسريعة.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2 mt-5">
              {["🔒 دفع آمن", "✅ إلغاء فوري", "⚡ وصول فوري"].map((t) => (
                <span key={t} className="text-[11px] text-slate-600 px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06]">{t}</span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm tracking-wide">روابط سريعة</h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "الرئيسية" },
                { href: "/packages", label: "الباقات والأسعار" },
                { href: "/dashboard", label: "لوحة التحكم" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-slate-500 hover:text-amber-400 transition-colors duration-150 flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-slate-700 group-hover:bg-amber-500 transition-colors" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm tracking-wide">الحساب</h4>
            <ul className="space-y-3">
              {[
                { href: "/login",    label: "تسجيل الدخول" },
                { href: "/register", label: "إنشاء حساب جديد" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-slate-500 hover:text-amber-400 transition-colors duration-150 flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-slate-700 group-hover:bg-amber-500 transition-colors" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-700 text-xs flex items-center gap-1.5">
            © {new Date().getFullYear()} القدرات الكمي — صُنع بـ<Heart size={11} className="text-red-500/70 fill-red-500/70" />في المملكة العربية السعودية
          </p>
          <p className="text-slate-700 text-xs">جميع الحقوق محفوظة</p>
        </div>
      </div>
    </footer>
  );
}
