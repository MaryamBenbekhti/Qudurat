import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user?.isAdmin) redirect("/");

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <nav className="bg-gray-900 text-white px-6 py-4 flex items-center gap-6">
        <span className="font-bold text-lg">لوحة الإدارة</span>
        <Link href="/admin" className="hover:text-blue-300 text-sm">الرئيسية</Link>
        <Link href="/admin/users" className="hover:text-blue-300 text-sm">المستخدمون</Link>
        <Link href="/admin/questions" className="hover:text-blue-300 text-sm">الأسئلة</Link>
        <Link href="/" className="mr-auto hover:text-blue-300 text-sm">← الموقع</Link>
      </nav>
      <main className="p-6">{children}</main>
    </div>
  );
}
