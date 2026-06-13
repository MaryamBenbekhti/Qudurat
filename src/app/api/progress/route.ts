import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const progress = await prisma.progress.findMany({
    where: { userId: session.user.id },
  });

  const examSessions = await prisma.examSession.findMany({
    where: { userId: session.user.id, completed: true },
    orderBy: { completedAt: "desc" },
    take: 10,
  });

  return NextResponse.json({ progress, examSessions });
}
