import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PracticeClient } from "@/app/(dashboard)/practice/[category]/practice-client";

export default async function QuickPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (!session.user.isPremium) redirect("/packages");

  const questions = await prisma.question.findMany({
    where: { category: "EXAM_QUICK" },
    take: 5,
    orderBy: { createdAt: "asc" },
  });

  return (
    <PracticeClient
      category="EXAM_QUICK"
      categoryLabel="أسئلة سريعة ذهنية"
      questions={questions.map((q: { id: any; question: any; options: string[]; correctAnswer: any; explanation: any; difficulty: any; }) => ({
        id: q.id,
        question: q.question,
        options: q.options as string[],
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        difficulty: q.difficulty,
      }))}
    />
  );
}
