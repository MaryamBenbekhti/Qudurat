import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ExamClient } from "@/app/(dashboard)/exam/[year]/exam-client";

export default async function TimedPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (!session.user.isPremium) redirect("/packages");

  const questions = await prisma.question.findMany({
    where: { category: "EXAM_2025" },
    take: 10,
    orderBy: { createdAt: "asc" },
  });

  return (
    <ExamClient
      year={2025}
      userId={session.user.id}
      questions={questions.map((q: { id: any; question: any; options: string[]; correctAnswer: any; explanation: any; }) => ({
        id: q.id,
        question: q.question,
        options: q.options as string[],
        correctAnswer: q.correctAnswer,
        explanation: q.explanation ?? "",
      }))}
    />
  );
}
