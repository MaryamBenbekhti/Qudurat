import { PrismaClient, Category, Difficulty } from "@prisma/client";

const prisma = new PrismaClient();

const questions = [
  // GEOMETRY
  {
    category: "GEOMETRY" as Category,
    question: "ما مساحة مثلث قائم الزاوية طول ساقيه 6 سم و8 سم؟",
    options: ["24 سم²", "48 سم²", "14 سم²", "28 سم²"],
    correctAnswer: 0,
    explanation: "مساحة المثلث = (القاعدة × الارتفاع) / 2 = (6 × 8) / 2 = 24 سم²",
    difficulty: "EASY" as Difficulty,
  },
  {
    category: "GEOMETRY" as Category,
    question: "إذا كان نصف قطر الدائرة 7 سم، فما محيطها؟ (π ≈ 22/7)",
    options: ["44 سم", "154 سم", "22 سم", "88 سم"],
    correctAnswer: 0,
    explanation: "محيط الدائرة = 2πr = 2 × (22/7) × 7 = 44 سم",
    difficulty: "EASY" as Difficulty,
  },
  {
    category: "GEOMETRY" as Category,
    question: "مستطيل طوله 12 سم وعرضه 5 سم. ما طول قطره؟",
    options: ["13 سم", "17 سم", "10 سم", "11 سم"],
    correctAnswer: 0,
    explanation: "قطر المستطيل = √(12² + 5²) = √(144+25) = √169 = 13 سم",
    difficulty: "MEDIUM" as Difficulty,
  },
  // NUMBERS_EQUATIONS
  {
    category: "NUMBERS_EQUATIONS" as Category,
    question: "حل المعادلة: 3x + 7 = 22",
    options: ["x = 5", "x = 3", "x = 7", "x = 4"],
    correctAnswer: 0,
    explanation: "3x = 22 - 7 = 15، إذن x = 15/3 = 5",
    difficulty: "EASY" as Difficulty,
  },
  {
    category: "NUMBERS_EQUATIONS" as Category,
    question: "أي الأعداد التالية أكبر؟ 0.75، 3/4، 73%، 7/10",
    options: ["0.75 و 3/4 متساويان وهما الأكبر", "73%", "7/10", "0.75"],
    correctAnswer: 0,
    explanation: "0.75 = 3/4 = 75% وهي الأكبر، بينما 73% < 75% و 7/10 = 70% < 75%",
    difficulty: "MEDIUM" as Difficulty,
  },
  // ALGEBRA
  {
    category: "ALGEBRA" as Category,
    question: "بسّط: (x² - 9) / (x - 3)",
    options: ["x + 3", "x - 3", "x² + 3", "x + 9"],
    correctAnswer: 0,
    explanation: "x² - 9 = (x-3)(x+3)، بتقسيم على (x-3) تُعطي (x+3)",
    difficulty: "MEDIUM" as Difficulty,
  },
  {
    category: "ALGEBRA" as Category,
    question: "إذا كان f(x) = 2x² - 3x + 1، فما قيمة f(2)؟",
    options: ["3", "5", "7", "1"],
    correctAnswer: 0,
    explanation: "f(2) = 2(4) - 3(2) + 1 = 8 - 6 + 1 = 3",
    difficulty: "MEDIUM" as Difficulty,
  },
  // PATTERNS
  {
    category: "PATTERNS" as Category,
    question: "ما الرقم التالي في المتتالية: 2، 6، 18، 54، ...؟",
    options: ["162", "108", "72", "216"],
    correctAnswer: 0,
    explanation: "كل رقم يُضرب في 3: 2×3=6، 6×3=18، 18×3=54، 54×3=162",
    difficulty: "EASY" as Difficulty,
  },
  {
    category: "PATTERNS" as Category,
    question: "ما الحد العاشر في المتتالية الحسابية: 3، 7، 11، 15، ...؟",
    options: ["39", "43", "35", "47"],
    correctAnswer: 0,
    explanation: "الفرق المشترك = 4، الحد العاشر = 3 + (10-1)×4 = 3 + 36 = 39",
    difficulty: "MEDIUM" as Difficulty,
  },
  // PROBABILITY
  {
    category: "PROBABILITY" as Category,
    question: "كيس فيه 3 كرات حمراء و5 كرات زرقاء. ما احتمال سحب كرة حمراء؟",
    options: ["3/8", "5/8", "3/5", "1/3"],
    correctAnswer: 0,
    explanation: "الاحتمال = عدد الكرات الحمراء / إجمالي الكرات = 3/(3+5) = 3/8",
    difficulty: "EASY" as Difficulty,
  },
  {
    category: "PROBABILITY" as Category,
    question: "رُمي حجر نرد مرة واحدة. ما احتمال الحصول على عدد زوجي؟",
    options: ["1/2", "1/3", "2/3", "1/6"],
    correctAnswer: 0,
    explanation: "الأعداد الزوجية على النرد: 2، 4، 6 (3 أعداد من 6). الاحتمال = 3/6 = 1/2",
    difficulty: "EASY" as Difficulty,
  },
  // RATIO
  {
    category: "RATIO" as Category,
    question: "إذا كانت نسبة الذكور إلى الإناث في الفصل 3:2 وعدد الطلاب 30، كم عدد الذكور؟",
    options: ["18", "12", "15", "20"],
    correctAnswer: 0,
    explanation: "المجموع = 3+2 = 5 أجزاء. كل جزء = 30/5 = 6. الذكور = 3×6 = 18",
    difficulty: "EASY" as Difficulty,
  },
  {
    category: "RATIO" as Category,
    question: "إذا كان ثمن 5 أقلام 15 ريالاً، فكم تكلفة 8 أقلام؟",
    options: ["24 ريالاً", "20 ريالاً", "40 ريالاً", "30 ريالاً"],
    correctAnswer: 0,
    explanation: "سعر القلم الواحد = 15/5 = 3 ريال. ثمن 8 أقلام = 8×3 = 24 ريال",
    difficulty: "EASY" as Difficulty,
  },
  // EXAM_2024 sample
  {
    category: "EXAM_2024" as Category,
    examYear: 2024,
    question: "إذا كان مجموع زوايا مضلع n منتظم يساوي 1080°، فكم عدد أضلاعه؟",
    options: ["8", "6", "9", "10"],
    correctAnswer: 0,
    explanation: "مجموع زوايا مضلع = (n-2)×180. إذن (n-2)×180 = 1080، n-2 = 6، n = 8",
    difficulty: "HARD" as Difficulty,
  },
  {
    category: "EXAM_2024" as Category,
    examYear: 2024,
    question: "في متتالية هندسية: الحد الأول = 4، والحد الرابع = 108. ما الأساس؟",
    options: ["3", "2", "4", "27"],
    correctAnswer: 0,
    explanation: "الحد الرابع = 4 × r³ = 108. r³ = 27. r = 3",
    difficulty: "HARD" as Difficulty,
  },
  // EXAM_2023 sample
  {
    category: "EXAM_2023" as Category,
    examYear: 2023,
    question: "ما قيمة: (2³ × 2⁴) ÷ 2⁵ ؟",
    options: ["4", "8", "16", "2"],
    correctAnswer: 0,
    explanation: "2³ × 2⁴ = 2^(3+4) = 2⁷. ثم 2⁷ ÷ 2⁵ = 2^(7-5) = 2² = 4",
    difficulty: "MEDIUM" as Difficulty,
  },
  // EXAM_2025 sample
  {
    category: "EXAM_2025" as Category,
    examYear: 2025,
    question: "إذا كان x + y = 10 و xy = 21، فما قيمة x² + y²؟",
    options: ["58", "100", "42", "79"],
    correctAnswer: 0,
    explanation: "x² + y² = (x+y)² - 2xy = 100 - 42 = 58",
    difficulty: "HARD" as Difficulty,
  },
];

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.question.deleteMany();

  for (const q of questions) {
    await prisma.question.create({ data: q });
  }

  console.log(`✅ Created ${questions.length} questions`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
