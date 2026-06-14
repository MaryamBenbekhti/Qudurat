import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  questionId: z.string(),
  selectedAns: z.number().int().min(0).max(3),
  timeSpent: z.number().int().optional(),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "بيانات غير صحيحة" }, { status: 400 });
  }

  const { questionId, selectedAns, timeSpent } = parsed.data;

  const question = await prisma.question.findUnique({
    where: { id: questionId },
  });
  if (!question) {
    return NextResponse.json({ error: "السؤال غير موجود" }, { status: 404 });
  }

  const isCorrect = question.correctAnswer === selectedAns;

  await prisma.attempt.create({
    data: {
      userId: session.user.id,
      questionId,
      selectedAns,
      isCorrect,
      timeSpent,
    },
  });

  // Update progress
  await prisma.progress.upsert({
    where: { userId_category: { userId: session.user.id, category: question.category } },
    update: {
      total: { increment: 1 },
      correct: isCorrect ? { increment: 1 } : undefined,
    },
    create: {
      userId: session.user.id,
      category: question.category,
      total: 1,
      correct: isCorrect ? 1 : 0,
    },
  });

  return NextResponse.json({ isCorrect, correctAnswer: question.correctAnswer });
}
