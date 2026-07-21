import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ExamClient } from "@/app/(dashboard)/exam/[year]/exam-client";

const FALLBACK_TIMED_QUESTIONS = [
  {
    id: "timed-1",
    question: "حل المعادلة: ٢(٣س − ٤) = ٤(س + ١)",
    options: ["٥", "٤", "٧", "٦"],
    correctAnswer: 3,
    explanation: "نفتح الأقواس: ٦س − ٨ = ٤س + ٤ ← ٢س = ١٢ ← س = ٦.",
  },
  {
    id: "timed-2",
    question: "ارتفع سعر السلعة من ٨٠ إلى ١٠٠ ريال. ما نسبة الزيادة؟",
    options: ["٢٠٪", "١٥٪", "٢٥٪", "٣٠٪"],
    correctAnswer: 2,
    explanation: "الزيادة = ٢٠، نسبة الزيادة = (٢٠ ÷ ٨٠) × ١٠٠ = ٢٥٪.",
  },
  {
    id: "timed-3",
    question: "في مثلث قائم الزاوية، طول الساقين ٣ سم و٤ سم. ما طول الوتر؟",
    options: ["٥", "٦", "٧", "٨"],
    correctAnswer: 0,
    explanation: "حسب نظرية فيثاغورس: الوتر = √(٣² + ٤²) = √(٩ + ١٦) = √٢٥ = ٥ سم.",
  },
  {
    id: "timed-4",
    question: "ثلاثة أعداد متتالية مجموعها ٩٣. ما أكبرها؟",
    options: ["٣٠", "٣١", "٣٢", "٣٣"],
    correctAnswer: 2,
    explanation: "س + (س+١) + (س+٢) = ٩٣ ← ٣س = ٩٠ ← س = ٣٠. الأكبر هو س + ٢ = ٣٢.",
  },
  {
    id: "timed-5",
    question: "خصم ١٥٪ من سعر ٤٠٠ ريال. ما السعر الجديد؟",
    options: ["٣٤٠", "٣٦٠", "٣٨٠", "٣٢٠"],
    correctAnswer: 0,
    explanation: "السعر الجديد = ٤٠٠ × (١ − ٠.١٥) = ٤٠٠ × ٠.٨٥ = ٣٤٠ ريالاً.",
  },
  {
    id: "timed-6",
    question: "مكعب طول ضلعه ٤ سم. ما حجمه؟",
    options: ["٣٢", "٤٨", "٦٤", "٢٤"],
    correctAnswer: 2,
    explanation: "الحجم = طول الضلع³ = ٤ × ٤ × ٤ = ٦٤ سم³.",
  },
  {
    id: "timed-7",
    question: "حل المتباينة: ٣س + ٥ > ١٤",
    options: ["س < ٣", "س > ٢", "س > ٤", "س > ٣"],
    correctAnswer: 3,
    explanation: "بنقل الحدود: ٣س > ١٤ − ٥ ← ٣س > ٩ ← س > ٣.",
  },
  {
    id: "timed-8",
    question: "عمر أحمد بعد ٨ سنوات يساوي ضعف عمره قبل ٤ سنوات. كم عمره الآن؟",
    options: ["١٨", "٢٠", "١٤", "١٦"],
    correctAnswer: 3,
    explanation: "أ + ٨ = ٢(أ − ٤) ← أ + ٨ = ٢أ − ٨ ← أ = ١٦.",
  },
  {
    id: "timed-9",
    question: "دائرة نصف قطرها ٧ سم. ما تقريب محيطها؟ (π ≈ ٣.١٤)",
    options: ["٤٥.٧٨", "٤٤.٧٥", "٤٣.٩٦", "٤٠"],
    correctAnswer: 2,
    explanation: "المحيط = ٢ × π × نق = ٢ × ٣.١٤ × ٧ = ٤٣.٩٦ سم.",
  },
  {
    id: "timed-10",
    question: "إذا كان س+ص=٧ و س−ص=٣، فما قيمة س × ص؟",
    options: ["٨", "١٠", "١٢", "١٦"],
    correctAnswer: 1,
    explanation: "بالجمع: ٢س = ١٠ ← س = ٥. بالطرح: ٢ص = ٤ ← ص = ٢. إذن س × ص = ١٠.",
  },
];

export default async function TimedPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (!session.user.isPremium) redirect("/packages");

  let questions = await prisma.question.findMany({
    where: { category: "EXAM_2025" },
    take: 10,
    orderBy: { createdAt: "asc" },
  });

  if (!questions || questions.length === 0) {
    const fallbackDb = await prisma.question.findMany({
      take: 10,
      orderBy: { createdAt: "asc" },
    });
    if (fallbackDb.length > 0) {
      questions = fallbackDb;
    }
  }

  const formattedQuestions = questions.length > 0
    ? questions.map((q: { id: any; question: any; options: string[]; correctAnswer: any; explanation: any; }) => ({
      id: q.id,
      question: q.question,
      options: q.options as string[],
      correctAnswer: q.correctAnswer,
      explanation: q.explanation ?? "",
    }))
    : FALLBACK_TIMED_QUESTIONS;

  return (
    <ExamClient
      year={2025}
      userId={session.user.id}
      questions={formattedQuestions}
    />
  );
}

