import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Category } from "@prisma/client";
import { ExamClient } from "./exam-client";

export default async function ExamPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;
  const session = await auth();
  
  if (!session?.user) redirect("/login");
  if (!session.user.isPremium) redirect("/packages");

  let category: Category;
  let yearNum: number;
  let limit: number;

  // التحقق مما إذا كان المستخدم طلب "الاختبار السريع"
  if (year === "quick") {
    category = "EXAM_QUICK" as Category; 
    yearNum = 0; // رقم افتراضي لأن الاختبار السريع ليس له سنة
    limit = 5;   // سحب 5 أسئلة فقط
  } else {
    // منطق اختبارات السنوات العادية
    yearNum = parseInt(year);
    const categoryMap: Record<number, Category> = {
      2025: "EXAM_2025",
      2024: "EXAM_2024",
      2023: "EXAM_2023",
    };
    category = categoryMap[yearNum];
    limit = 10; // سحب 10 أسئلة للاختبار العادي
  }

  // إذا كان الرابط خاطئاً أو التصنيف غير موجود، أعده للوحة التحكم
  if (!category) redirect("/dashboard");

  // جلب الأسئلة من قاعدة البيانات بناءً على التصنيف والعدد المطلوب
  const questions = await prisma.question.findMany({
    where: { category },
    take: limit, // تحديد عدد الأسئلة (5 أو 10)
    orderBy: { createdAt: "asc" },
  });

  return (
    <ExamClient
      year={yearNum}
      userId={session.user.id}
      questions={questions.map((q) => ({
        id: q.id,
        question: q.question,
        options: q.options as string[],
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
      }))}
    />
  );
}
