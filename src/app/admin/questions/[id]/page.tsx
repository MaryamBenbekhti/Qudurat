import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditQuestionForm from "./edit-form";

export const dynamic = "force-dynamic";

export default async function EditQuestionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const question = await prisma.question.findUnique({ where: { id } });
  if (!question) notFound();

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">تعديل السؤال</h1>
      <EditQuestionForm question={question} />
    </div>
  );
}
