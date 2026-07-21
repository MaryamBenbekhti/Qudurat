import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PracticeClient } from "@/app/(dashboard)/practice/[category]/practice-client";

const FALLBACK_QUICK_QUESTIONS = [
  {
    id: "quick-1",
    question: "حل المعادلة: ٤س − ٩ = ٣س + ٥",
    options: ["١١", "١٤", "١٣", "١٢"],
    correctAnswer: 1,
    explanation: "ننقل الحدود: ٤س − ٣س = ٥ + ٩ ← س = ١٤.",
    difficulty: "EASY",
  },
  {
    id: "quick-2",
    question: "ما قيمة ٤٠٪ من ٢٥٠؟",
    options: ["١٠٠", "٩٠", "٨٠", "١٢٠"],
    correctAnswer: 0,
    explanation: "٢٥٠ × ٠.٤ = ١٠٠.",
    difficulty: "EASY",
  },
  {
    id: "quick-3",
    question: "مستطيل طوله ٨ سم وعرضه ٥ سم. ما مساحته؟",
    options: ["٢٦", "٣٠", "٤٥", "٤٠"],
    correctAnswer: 3,
    explanation: "المساحة = الطول × العرض = ٨ × ٥ = ٤٠ سم².",
    difficulty: "MEDIUM",
  },
  {
    id: "quick-4",
    question: "سيارة تقطع ٢٤٠ كم في ٣ ساعات. كم تقطع في ٥ ساعات؟",
    options: ["٣٠٠", "٤٥٠", "٥٠٠", "٤٠٠"],
    correctAnswer: 3,
    explanation: "السرعة = ٢٤٠ ÷ ٣ = ٨٠ كم/س، إذن المسافة = ٨٠ × ٥ = ٤٠٠ كم.",
    difficulty: "MEDIUM",
  },
  {
    id: "quick-5",
    question: "في مثلث زاويتان ٦٠° و٧٠°. ما قياس الزاوية الثالثة؟",
    options: ["٧٠°", "٦٠°", "٥٠°", "٨٠°"],
    correctAnswer: 2,
    explanation: "الزاوية الثالثة = ١٨٠° − (٦٠° + ٧٠°) = ٥٠°.",
    difficulty: "EASY",
  },
];

export default async function QuickPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (!session.user.isPremium) redirect("/packages");

  let questions = await prisma.question.findMany({
    where: { category: "EXAM_QUICK" },
    take: 5,
    orderBy: { createdAt: "asc" },
  });

  if (!questions || questions.length === 0) {
    const fallbackDb = await prisma.question.findMany({
      take: 5,
      orderBy: { createdAt: "asc" },
    });
    if (fallbackDb.length > 0) {
      questions = fallbackDb;
    }
  }

  const formattedQuestions = questions.length > 0
    ? questions.map((q) => ({
      id: q.id,
      question: q.question,
      options: q.options as string[],
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      difficulty: q.difficulty,
    }))
    : FALLBACK_QUICK_QUESTIONS;

  return (
    <PracticeClient
      category="EXAM_QUICK"
      categoryLabel="أسئلة سريعة ذهنية"
      questions={formattedQuestions}
    />
  );
}

