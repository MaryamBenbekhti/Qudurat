import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { DashboardClient } from "./dashboard-client";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/dashboard");

  const progress = await prisma.progress.findMany({
    where: { userId: session.user.id },
  });

  const recentSessions = await prisma.examSession.findMany({
    where: { userId: session.user.id, completed: true },
    orderBy: { completedAt: "desc" },
    take: 5,
  });

  const totalAttempts = await prisma.attempt.count({
    where: { userId: session.user.id },
  });

  return (
    <DashboardClient
      user={{ name: session.user.name, isPremium: session.user.isPremium }}
      progress={progress}
      recentSessions={recentSessions}
      totalAttempts={totalAttempts}
    />
  );
}
