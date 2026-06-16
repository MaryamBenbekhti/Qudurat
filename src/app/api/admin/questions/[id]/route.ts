import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.isAdmin) return null;
  return session;
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const body = await req.json();
  const question = await prisma.question.update({
    where: { id },
    data: {
      question: body.question,
      options: body.options,
      correctAnswer: body.correctAnswer,
      explanation: body.explanation,
      category: body.category,
      difficulty: body.difficulty,
    },
  });
  return NextResponse.json(question);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  await prisma.attempt.deleteMany({ where: { questionId: id } });
  await prisma.question.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
