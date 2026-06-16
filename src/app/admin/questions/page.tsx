import { prisma } from "@/lib/prisma";
import Link from "next/link";
import DeleteButton from "./delete-button";

export const dynamic = "force-dynamic";

const CATEGORY_LABELS: Record<string, string> = {
  ALGEBRA: "الجبر",
  GEOMETRY: "الهندسة",
  NUMBERS_EQUATIONS: "الأعداد والمعادلات",
  PATTERNS: "الأنماط",
  PROBABILITY: "الاحتمالات",
  RATIO: "النسب والتناسب",
  EXAM_2025: "اختبار 2025",
  EXAM_2024: "اختبار 2024",
  EXAM_2023: "اختبار 2023",
};

export default async function AdminQuestionsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const { category, page } = await searchParams;
  const pageNum = parseInt(page ?? "1");
  const perPage = 20;
  const where = category ? { category: category as never } : {};

  const [questions, total] = await Promise.all([
    prisma.question.findMany({
      where,
      orderBy: { createdAt: "asc" },
      skip: (pageNum - 1) * perPage,
      take: perPage,
    }),
    prisma.question.count({ where }),
  ]);

  const counts = await prisma.question.groupBy({
    by: ["category"],
    _count: true,
  });

  const totalPages = Math.ceil(total / perPage);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          الأسئلة <span className="text-base font-normal text-gray-500">({total})</span>
        </h1>
        <Link
          href="/admin/questions/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
        >
          + إضافة سؤال
        </Link>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        <a
          href="/admin/questions"
          className={`px-3 py-1 rounded text-sm ${!category ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
        >
          الكل ({counts.reduce((s, c) => s + c._count, 0)})
        </a>
        {counts.map((c) => (
          <a
            key={c.category}
            href={`/admin/questions?category=${c.category}`}
            className={`px-3 py-1 rounded text-sm ${category === c.category ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
          >
            {CATEGORY_LABELS[c.category] ?? c.category} ({c._count})
          </a>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-right p-3 text-gray-600 w-8">#</th>
              <th className="text-right p-3 text-gray-600">السؤال</th>
              <th className="text-right p-3 text-gray-600">التصنيف</th>
              <th className="text-right p-3 text-gray-600">الصعوبة</th>
              <th className="text-right p-3 text-gray-600">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {questions.map((q, i) => (
              <tr key={q.id} className="hover:bg-gray-50">
                <td className="p-3 text-gray-400 text-xs">{(pageNum - 1) * perPage + i + 1}</td>
                <td className="p-3 text-gray-800 max-w-md">
                  <div className="truncate">{q.question}</div>
                </td>
                <td className="p-3">
                  <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs">
                    {CATEGORY_LABELS[q.category] ?? q.category}
                  </span>
                </td>
                <td className="p-3 text-xs text-gray-500">{q.difficulty}</td>
                <td className="p-3 flex gap-2">
                  <Link
                    href={`/admin/questions/${q.id}`}
                    className="text-blue-600 hover:underline text-xs"
                  >
                    تعديل
                  </Link>
                  <DeleteButton id={q.id} />
                </td>
              </tr>
            ))}
            {questions.length === 0 && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-400">لا توجد أسئلة</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex gap-2 mt-4 justify-center">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <a
              key={p}
              href={`/admin/questions?${category ? `category=${category}&` : ""}page=${p}`}
              className={`w-8 h-8 flex items-center justify-center rounded text-sm ${p === pageNum ? "bg-blue-600 text-white" : "bg-white border hover:bg-gray-50"}`}
            >
              {p}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

