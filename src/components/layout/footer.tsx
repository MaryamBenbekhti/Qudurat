import Link from "next/link";
import { BookOpen } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-navy-700/50 bg-navy-900/50 mt-auto" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <BookOpen size={18} className="text-white" />
              </div>
              <span className="text-xl font-bold text-white">قُدرات</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              منصة متخصصة في تحضير اختبار القدرات العامة بأساليب تعليمية حديثة وفعّالة.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">روابط سريعة</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-slate-400 hover:text-amber-400 transition-colors">الرئيسية</Link></li>
              <li><Link href="/packages" className="text-slate-400 hover:text-amber-400 transition-colors">الباقات</Link></li>
              <li><Link href="/dashboard" className="text-slate-400 hover:text-amber-400 transition-colors">لوحة التحكم</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">الحساب</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/login" className="text-slate-400 hover:text-amber-400 transition-colors">تسجيل الدخول</Link></li>
              <li><Link href="/register" className="text-slate-400 hover:text-amber-400 transition-colors">إنشاء حساب</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-navy-700/50 text-center text-slate-500 text-sm">
          © {new Date().getFullYear()} قدرات — جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  );
}
