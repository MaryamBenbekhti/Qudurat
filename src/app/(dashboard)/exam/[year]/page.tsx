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

  const yearNum = parseInt(year);
  const categoryMap: Record<number, Category> = {
    2025: "EXAM_2025",
    2024: "EXAM_2024",
    2023: "EXAM_2023",
  };
  const category = categoryMap[yearNum];
  if (!category) redirect("/dashboard");

  const questions = await prisma.question.findMany({
    where: { category },
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
