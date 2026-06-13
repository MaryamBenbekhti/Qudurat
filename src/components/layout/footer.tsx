import Link from "next/link";
import { BookOpen } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.07] bg-[#080e1a]" dir="rtl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/25">
                <BookOpen size={16} className="text-white" />
              </div>
              <div className="leading-none">
                <span className="block text-base font-black text-white">القدرات الكمي</span>
                <span className="block text-[10px] text-amber-400/60">فكر أقل، حل أسرع</span>
              </div>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              منصة متخصصة في تحضير اختبار القدرات العامة بأساليب تعليمية حديثة وفعّالة.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm">روابط سريعة</h4>
            <ul className="space-y-2.5">
              {[
                { href: "/", label: "الرئيسية" },
                { href: "/packages", label: "الباقات والأسعار" },
                { href: "/dashboard", label: "لوحة التحكم" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-slate-500 hover:text-amber-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm">الحساب</h4>
            <ul className="space-y-2.5">
              {[
                { href: "/login",    label: "تسجيل الدخول" },
                { href: "/register", label: "إنشاء حساب جديد" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-slate-500 hover:text-amber-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} القدرات الكمي — جميع الحقوق محفوظة
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-600">
            <span>🔒 دفع آمن</span>
            <span>✅ إلغاء فوري</span>
            <span>⚡ وصول فوري</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
