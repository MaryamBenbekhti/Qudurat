import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Category } from "@prisma/client";
import { CATEGORY_LABELS } from "@/lib/utils";
import { PracticeClient } from "./practice-client";

function toCategoryEnum(slug: string): Category | null {
  const map: Record<string, Category> = {
    geometry: "GEOMETRY",
    numbers_equations: "NUMBERS_EQUATIONS",
    "numbers-equations": "NUMBERS_EQUATIONS",
    algebra: "ALGEBRA",
    patterns: "PATTERNS",
    probability: "PROBABILITY",
    ratio: "RATIO",
  };
  return map[slug.toLowerCase()] ?? null;
}

export default async function PracticePage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (!session.user.isPremium) redirect("/packages");

  const category = toCategoryEnum(slug);
  if (!category) redirect("/dashboard");

  const questions = await prisma.question.findMany({
    where: { category },
    orderBy: { createdAt: "asc" },
  });

  return (
    <PracticeClient
      category={category}
      categoryLabel={CATEGORY_LABELS[category]}
      questions={questions.map((q) => ({
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
