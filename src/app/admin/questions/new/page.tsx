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

export default function NewQuestionPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    explanation: "",
    category: "ALGEBRA",
    difficulty: "MEDIUM",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/questions", {
      method: "POST",
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

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">إضافة سؤال جديد</h1>
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
          {form.options.map((opt, i) => (
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
                placeholder={`الخيار ${i + 1}`}
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
            {saving ? "جاري الحفظ..." : "حفظ السؤال"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/questions")}
            className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg text-sm hover:bg-gray-200"
          >
            إلغاء
          </button>
        </div>
      </form>
    </div>
  );
}
