import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.isAdmin) return null;
  return session;
}

export async function POST(req: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const question = await prisma.question.create({
    data: {
      question: body.question,
      options: body.options,
      correctAnswer: body.correctAnswer,
      explanation: body.explanation,
      category: body.category,
      difficulty: body.difficulty ?? "MEDIUM",
    },
  });
  return NextResponse.json(question);
}
