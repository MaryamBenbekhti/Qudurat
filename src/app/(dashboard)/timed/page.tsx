import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Category } from "@prisma/client";
import { ExamClient } from "@/app/(dashboard)/exam/[year]/exam-client";

const FALLBACK_TIMED_QUESTIONS = [
  {
    id: "timed-1",
    question: "حل المعادلة: \( ٢(٣س - ٤) = ٤(س + ١) \)",
    options: ["\( ٥ \)", "\( ٤ \)", "\( ٧ \)", "\( ٦ \)"],
    correctAnswer: 3,
    explanation: "نفتح الأقواس: \( ٦س - ٨ = ٤س + ٤ \leftarrow ٢س = ١٢ \leftarrow س = ٦ \).",
  },
  {
    id: "timed-2",
    question: "ارتفع سعر السلعة من \( ٨٠ \) إلى \( ١٠٠ \) ريال. ما نسبة الزيادة؟",
    options: ["\( ٢٠\text{٪} \)", "\( ١٥\text{٪} \)", "\( ٢٥\text{٪} \)", "\( ٣٠\text{٪} \)"],
    correctAnswer: 2,
    explanation: "الزيادة = \( ٢٠ \)، نسبة الزيادة = \( \frac{٢٠}{٨٠} \times ١٠٠ = ٢٥\text{٪} \).",
  },
  {
    id: "timed-3",
    question: "في مثلث قائم الزاوية، طول الساقين \( ٣ \) سم و\( ٤ \) سم. ما طول الوتر؟",
    options: ["\( ٥ \)", "\( ٦ \)", "\( ٧ \)", "\( ٨ \)"],
    correctAnswer: 0,
    explanation: "حسب نظرية فيثاغورس: الوتر = \( \sqrt{٣^{٢} + ٤^{٢}} = \sqrt{٩ + ١٦} = \sqrt{٢٥} = ٥ \) سم.",
  },
  {
    id: "timed-4",
    question: "ثلاثة أعداد متتالية مجموعها \( ٩٣ \). ما أكبرها؟",
    options: ["\( ٣٠ \)", "\( ٣١ \)", "\( ٣٢ \)", "\( ٣٣ \)"],
    correctAnswer: 2,
    explanation: "\( س + (س+١) + (س+٢) = ٩٣ \leftarrow ٣س = ٩٠ \leftarrow س = ٣٠ \). الأكبر هو \( س + ٢ = ٣٢ \).",
  },
  {
    id: "timed-5",
    question: "خصم \( ١٥\text{٪} \) من سعر \( ٤٠٠ \) ريال. ما السعر الجديد؟",
    options: ["\( ٣٤٠ \)", "\( ٣٦٠ \)", "\( ٣٨٠ \)", "\( ٣٢٠ \)"],
    correctAnswer: 0,
    explanation: "السعر الجديد = \( ٤٠٠ \times (١ - ٠.١٥) = ٤٠٠ \times ٠.٨٥ = ٣٤٠ \) ريالاً.",
  },
  {
    id: "timed-6",
    question: "مكعب طول ضلعه \( ٤ \) سم. ما حجمه؟",
    options: ["\( ٣٢ \)", "\( ٤٨ \)", "\( ٦٤ \)", "\( ٢٤ \)"],
    correctAnswer: 2,
    explanation: "الحجم = طول الضلع\( ^{٣} \) = \( ٤ \times ٤ \times ٤ = ٦٤ \) سم\( ^{٣} \).",
  },
  {
    id: "timed-7",
    question: "حل المتباينة: \( ٣س + ٥ > ١٤ \)",
    options: ["\( س < ٣ \)", "\( س > ٢ \)", "\( س > ٤ \)", "\( س > ٣ \)"],
    correctAnswer: 3,
    explanation: "بنقل الحدود: \( ٣س > ١٤ - ٥ \leftarrow ٣س > ٩ \leftarrow س > ٣ \).",
  },
  {
    id: "timed-8",
    question: "عمر أحمد بعد \( ٨ \) سنوات يساوي ضعف عمره قبل \( ٤ \) سنوات. كم عمره الآن؟",
    options: ["\( ١٨ \)", "\( ٢٠ \)", "\( ١٤ \)", "\( ١٦ \)"],
    correctAnswer: 3,
    explanation: "\( أ + ٨ = ٢(أ - ٤) \leftarrow أ + ٨ = ٢أ - ٨ \leftarrow أ = ١٦ \).",
  },
  {
    id: "timed-9",
    question: "دائرة نصف قطرها \( ٧ \) سم. ما تقريب محيطها؟ \( (\pi \approx ٣.١٤) \)",
    options: ["\( ٤٥.٧٨ \)", "\( ٤٤.٧٥ \)", "\( ٤٣.٩٦ \)", "\( ٤٠ \)"],
    correctAnswer: 2,
    explanation: "المحيط = \( ٢ \times \pi \times \text{نق} = ٢ \times ٣.١٤ \times ٧ = ٤٣.٩٦ \) سم.",
  },
  {
    id: "timed-10",
    question: "إذا كان \( س+ص=٧ \) و \( س-ص=٣ \)، فما قيمة \( س \times ص \)؟",
    options: ["\( ٨ \)", "\( ١٠ \)", "\( ١٢ \)", "\( ١٦ \)"],
    correctAnswer: 1,
    explanation: "بالجمع: \( ٢س = ١٠ \leftarrow س = ٥ \). بالطرح: \( ٢ص = ٤ \leftarrow ص = ٢ \). إذن \( س \times ص = ١٠ \).",
  },
];

export default async function TimedPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (!session.user.isPremium) redirect("/packages");

  let questions = await prisma.question.findMany({
    where: { category: Category.EXAM_TIMED },
    take: 10,
    orderBy: { createdAt: "asc" },
  });

  const formattedQuestions = questions.length > 0
    ? questions.map((q) => ({
      id: q.id,
      question: q.question,
      options: q.options as string[],
      correctAnswer: q.correctAnswer,
      explanation: q.explanation ?? "",
    }))
    : FALLBACK_TIMED_QUESTIONS;

  return (
    <ExamClient
      title="أسئلة بتوقيت"
      userId={session.user.id}
      questions={formattedQuestions}
    />
  );
}

