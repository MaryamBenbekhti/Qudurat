import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [totalUsers, premiumUsers, totalQuestions, totalAttempts] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { isPremium: true } }),
    prisma.question.count(),
    prisma.attempt.count(),
  ]);

  const stats = [
    { label: "إجمالي المستخدمين", value: totalUsers, href: "/admin/users", color: "bg-blue-500" },
    { label: "المشتركون المدفوعون", value: premiumUsers, href: "/admin/users?filter=premium", color: "bg-green-500" },
    { label: "إجمالي الأسئلة", value: totalQuestions, href: "/admin/questions", color: "bg-purple-500" },
    { label: "إجمالي المحاولات", value: totalAttempts, href: "/admin/users", color: "bg-orange-500" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">نظرة عامة</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="bg-white rounded-xl shadow p-5 hover:shadow-md transition">
            <div className={`w-10 h-10 ${s.color} rounded-lg mb-3`} />
            <div className="text-3xl font-bold text-gray-800">{s.value}</div>
            <div className="text-sm text-gray-500 mt-1">{s.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
