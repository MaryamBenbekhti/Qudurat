"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CATEGORIES = [
  { value: "ALGEBRA", label: "الجبر" },
  { value: "GEOMETRY", label: "الهندسة" },
  { value: "NUMBERS_EQUATIONS", label: "الأعداد والمعادلات" },
  { value: "PATTERNS", label: "الأنماط" },
  { value: "PROBABILITY", label: "الاحتمالات" },
  { value: "RATIO", label: "النسب والتناسب" },
  { value: "EXAM_2025", label: "اختبار 2025" },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function EditQuestionForm({ question }: { question: any }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [form, setForm] = useState({
    question: question.question,
    options: question.options as string[],
    correctAnswer: question.correctAnswer,
    explanation: question.explanation,
    category: question.category,
    difficulty: question.difficulty,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch(`/api/admin/questions/${question.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      router.push("/admin/questions");
    } else {
      alert("حدث خطأ");
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm("هل أنت متأكد من حذف هذا السؤال؟")) return;
    setDeleting(true);
    await fetch(`/api/admin/questions/${question.id}`, { method: "DELETE" });
    router.push("/admin/questions");
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">نص السؤال</label>
        <textarea
          required
          rows={3}
          className="w-full border rounded-lg p-2 text-sm"
          value={form.question}
          onChange={(e) => setForm({ ...form, question: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">الخيارات</label>
        {form.options.map((opt: string, i: number) => (
          <div key={i} className="flex items-center gap-2 mb-2">
            <input
              type="radio"
              name="correct"
              checked={form.correctAnswer === i}
              onChange={() => setForm({ ...form, correctAnswer: i })}
            />
            <span className="text-xs text-gray-400 w-4">{i + 1}</span>
            <input
              required
              className="flex-1 border rounded-lg p-2 text-sm"
              value={opt}
              onChange={(e) => {
                const opts = [...form.options];
                opts[i] = e.target.value;
                setForm({ ...form, options: opts });
              }}
            />
          </div>
        ))}
        <p className="text-xs text-gray-400">اختر الزر المجاور للإجابة الصحيحة</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">الشرح</label>
        <textarea
          required
          rows={2}
          className="w-full border rounded-lg p-2 text-sm"
          value={form.explanation}
          onChange={(e) => setForm({ ...form, explanation: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">التصنيف</label>
          <select
            className="w-full border rounded-lg p-2 text-sm"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">الصعوبة</label>
          <select
            className="w-full border rounded-lg p-2 text-sm"
            value={form.difficulty}
            onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
          >
            <option value="EASY">سهل</option>
            <option value="MEDIUM">متوسط</option>
            <option value="HARD">صعب</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? "جاري الحفظ..." : "حفظ التعديلات"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/questions")}
          className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg text-sm hover:bg-gray-200"
        >
          إلغاء
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="mr-auto bg-red-50 text-red-600 px-6 py-2 rounded-lg text-sm hover:bg-red-100 disabled:opacity-50"
        >
          {deleting ? "جاري الحذف..." : "حذف السؤال"}
        </button>
      </div>
    </form>
  );
}
