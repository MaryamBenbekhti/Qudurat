import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter } = await searchParams;
  const where = filter === "premium" ? { isPremium: true } : {};

  const users = await prisma.user.findMany({
    where,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      isPremium: true,
      isAdmin: true,
      subStatus: true,
      subCurrentPeriodEnd: true,
      createdAt: true,
      _count: { select: { attempts: true } },
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        المستخدمون{" "}
        <span className="text-base font-normal text-gray-500">({users.length})</span>
      </h1>

      <div className="flex gap-3 mb-4">
        <a href="/admin/users" className="px-3 py-1 rounded bg-gray-200 text-sm hover:bg-gray-300">الكل</a>
        <a href="/admin/users?filter=premium" className="px-3 py-1 rounded bg-green-100 text-sm hover:bg-green-200">المشتركون</a>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-right p-3 text-gray-600">الاسم</th>
              <th className="text-right p-3 text-gray-600">البريد الإلكتروني</th>
              <th className="text-right p-3 text-gray-600">الاشتراك</th>
              <th className="text-right p-3 text-gray-600">انتهاء الاشتراك</th>
              <th className="text-right p-3 text-gray-600">المحاولات</th>
              <th className="text-right p-3 text-gray-600">تاريخ التسجيل</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="p-3 font-medium text-gray-800">
                  {u.name ?? "—"}
                  {u.isAdmin && (
                    <span className="mr-2 text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">admin</span>
                  )}
                </td>
                <td className="p-3 text-gray-600">{u.email}</td>
                <td className="p-3">
                  {u.isPremium ? (
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium">مشترك</span>
                  ) : (
                    <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-xs">مجاني</span>
                  )}
                </td>
                <td className="p-3 text-gray-500 text-xs">
                  {u.subCurrentPeriodEnd
                    ? new Date(u.subCurrentPeriodEnd).toLocaleDateString("ar-SA")
                    : "—"}
                </td>
                <td className="p-3 text-gray-600">{u._count.attempts}</td>
                <td className="p-3 text-gray-500 text-xs">
                  {new Date(u.createdAt).toLocaleDateString("ar-SA")}
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-400">لا يوجد مستخدمون</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
