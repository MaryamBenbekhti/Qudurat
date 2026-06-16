"use client";

export default function DeleteButton({ id }: { id: string }) {
  async function handleDelete() {
    if (!confirm("هل أنت متأكد من حذف هذا السؤال؟")) return;
    await fetch(`/api/admin/questions/${id}`, { method: "DELETE" });
    window.location.reload();
  }

  return (
    <button onClick={handleDelete} className="text-red-500 hover:underline text-xs">
      حذف
    </button>
  );
}
