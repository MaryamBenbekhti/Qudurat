import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div dir="rtl" className="min-h-screen bg-navy-950 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl font-black text-gradient mb-4">404</div>
        <h1 className="text-3xl font-black text-white mb-4">الصفحة غير موجودة</h1>
        <p className="text-slate-400 mb-8">عذراً، الصفحة التي تبحث عنها غير موجودة.</p>
        <Link href="/">
          <Button>
            <Home size={18} />
            الصفحة الرئيسية
          </Button>
        </Link>
      </div>
    </div>
  );
}
