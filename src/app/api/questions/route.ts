import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Category } from "@prisma/client";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }
  if (!session.user.isPremium) {
    return NextResponse.json({ error: "يتطلب اشتراكاً" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") as Category | null;
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "20"), 50);

  const where = category ? { category } : {};

  const questions = await prisma.question.findMany({
    where,
    take: limit,
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      category: true,
      question: true,
      options: true,
      correctAnswer: true,
      explanation: true,
      difficulty: true,
      examYear: true,
    },
  });

  return NextResponse.json({ questions });
}
