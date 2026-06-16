import pg from "pg";

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

type Q = { question: string; options: string[]; correctAnswer: number; explanation: string; category: string; difficulty?: string };

const algebraQuestions: Q[] = [
  { question: "حل: ٤س − ٩ = ٣س + ٥", options: ["١٣", "١٤", "١١", "١٢"], correctAnswer: 1, explanation: "ننقل الحدود: ٤س − ٣س = ٥ + ٩ ← س = ١٤.", category: "ALGEBRA" },
  { question: "حل: ٢(٣س − ٤) = ٤(س + ١)", options: ["٥", "٤", "٧", "٦"], correctAnswer: 3, explanation: "نفتح الأقواس: ٦س − ٨ = ٤س + ٤ ← ٢س = ١٢ ← س = ٦.", category: "ALGEBRA" },
  { question: "حل المعادلة: ٤(س + ٥) = ٣(س − ٣)", options: ["٢١", "١٩", "٢٥", "٢٣"], correctAnswer: 3, explanation: "بفك الأقواس وتبسيط الحدود المتشابهة: ٤س + ٢٠ = ٣س − ٣ ← س = −٢٣. القيمة المطلقة للناتج هي ٢٣.", category: "ALGEBRA" },
  { question: "إذا كان ٥س + ٣ = ٢س + ١٨، فما قيمة ٣س − ٢؟", options: ["١٣", "١١", "١٠", "١٢"], correctAnswer: 0, explanation: "أولاً نجد س: ٣س = ١٥ ← س = ٥. ثم نحسب المطلوب: ٣ × ٥ − ٢ = ١٣.", category: "ALGEBRA" },
  { question: "حل: ٠.٥س − ١.٥ = ٠.٢٥س + ٠.٧٥", options: ["٩", "٨", "١١", "١٠"], correctAnswer: 0, explanation: "بطرح الحدود المتشابهة: ٠.٢٥س = ٢.٢٥ ← س = ٩.", category: "ALGEBRA" },
  { question: "عدد يزيد ضعفه عن ثلثه بـ ٢٠. ما العدد؟", options: ["٢٨", "٢٠", "٣٠", "١٢"], correctAnswer: 3, explanation: "ليكن العدد س: ٢س − س/٣ = ٢٠ ← ٥س/٣ = ٢٠ ← ٥س = ٦٠ ← س = ١٢.", category: "ALGEBRA" },
  { question: "ثلاثة أعداد متتالية مجموعها ٩٣. ما أكبرها؟", options: ["٣٠", "٣١", "٣٢", "٣٣"], correctAnswer: 2, explanation: "ليكن أصغرها س: س + (س+١) + (س+٢) = ٩٣ ← ٣س = ٩٠ ← س = ٣٠. العدد الأكبر هو س + ٢ = ٣٢.", category: "ALGEBRA" },
  { question: "عمر أحمد بعد ٨ سنوات يساوي ضعف عمره قبل ٤ سنوات. كم عمره الآن؟", options: ["١٨", "٢٠", "١٤", "١٦"], correctAnswer: 3, explanation: "أ + ٨ = ٢(أ − ٤) ← أ + ٨ = ٢أ − ٨ ← أ = ١٦.", category: "ALGEBRA" },
  { question: "مبلغ وُزّع على أخوين. الأول أخذ الثلث زائد ٢٠٠، والثاني أخذ الثلثين ناقص ٢٠٠. ما المبلغ الكلي إذا كان نصيب الثاني ١٤٠٠؟", options: ["٢٨٠٠", "٢٤٠٠", "٣٢٠٠", "٣٠٠٠"], correctAnswer: 1, explanation: "نصيب الثاني = ٢م/٣ − ٢٠٠ = ١٤٠٠ ← ٢م/٣ = ١٦٠٠ ← م = ٢٤٠٠.", category: "ALGEBRA" },
  { question: "سيارتان تسيران باتجاهين متعاكسين. الأولى بـ ٨٠ كم/س والثانية بـ ٦٠ كم/س. بعد كم ساعة تكون المسافة بينهما ٤٢٠ كم؟", options: ["٥", "٣", "٢", "٤"], correctAnswer: 1, explanation: "المسافة الكلية = مجموع السرعتين × الزمن: (٨٠+٦٠) × ز = ٤٢٠ ← ١٤٠ز = ٤٢٠ ← ز = ٣.", category: "ALGEBRA" },
  { question: "حل: س² − ٧س + ١٢ = ٠", options: ["−١٢، −١", "١٢، ١", "٤، ٣", "−٤، −٣"], correctAnswer: 2, explanation: "نحلل العبارة التربيعية: (س−٣)(س−٤) = ٠ ← س = ٣ أو س = ٤.", category: "ALGEBRA" },
  { question: "حل: س² − ٢٥ = ٠", options: ["٦±", "±٣", "±٥", "±٤"], correctAnswer: 2, explanation: "بأخذ الجذر التربيعي للطرفين: س² = ٢٥ ← س = ±٥.", category: "ALGEBRA" },
  { question: "ما مجموع جذري: ٣س² − ٩س + ٦ = ٠؟", options: ["٣", "٤", "١", "٢"], correctAnswer: 0, explanation: "قانون مجموع الجذرين = −ب/أ = −(−٩)/٣ = ٩/٣ = ٣.", category: "ALGEBRA" },
  { question: "ما حاصل ضرب جذري: ٢س² + ٥س − ١٢ = ٠؟", options: ["٦", "٥", "−٦", "−٥"], correctAnswer: 2, explanation: "قانون حاصل ضرب الجذرين = ج/أ = −١٢/٢ = −٦.", category: "ALGEBRA" },
  { question: "إذا كان أحد جذري س² − كس + ٨ = ٠ هو ٢، فما قيمة ك؟", options: ["٨", "٦", "٤", "٥"], correctAnswer: 1, explanation: "حاصل ضرب الجذرين = ٨، والجذر الأول = ٢، إذن الجذر الثاني = ٨÷٢ = ٤. القيمة ك تمثل مجموع الجذرين = ٢ + ٤ = ٦.", category: "ALGEBRA" },
  { question: "حل بالتحليل: ٢س² − ٣س − ٢ = ٠", options: ["−٢، ١/٢", "٢، −١/٢", "−٢، ١", "٢، −١"], correctAnswer: 1, explanation: "نحلل العبارة: (٢س+١)(س−٢) = ٠ ← س = −١/٢ أو س = ٢.", category: "ALGEBRA" },
  { question: "مستطيل طوله يزيد عرضه بـ ٥. مساحته ٣٦. ما أبعاده؟", options: ["١٢ × ٣", "٣ × ٩", "٤ × ٩", "٦ × ٦"], correctAnswer: 2, explanation: "ع(ع+٥) = ٣٦ ← ع² + ٥ع − ٣٦ = ٠ ← (ع+٩)(ع−٤) = ٠ ← ع = ٤. إذن الأبعاد هي ٤ × ٩.", category: "ALGEBRA" },
  { question: "عدد موجب تربيعه أكبر من ثلاثة أمثاله بـ ١٨. ما العدد؟", options: ["٤", "٦", "٥", "٧"], correctAnswer: 1, explanation: "س² = ٣س + ١٨ ← س² − ٣س − ١٨ = ٠ ← (س−٦)(س+٣) = ٠ ← س = ٦ لأنه حدد عدداً موجباً.", category: "ALGEBRA" },
  { question: "حل: س+ص=٧ و س−ص=٣. ما قيمة س×ص؟", options: ["٨", "١٠", "١٢", "١٦"], correctAnswer: 1, explanation: "بالجمع: ٢س = ١٠ ← س = ٥. بالطرح: ٢ص = ٤ ← ص = ٢. إذن س×ص = ١٠.", category: "ALGEBRA" },
  { question: "حل: ٢س+٣ص=١٢ و ٣س−ص=٧. ما قيمة س+ص؟", options: ["٥", "٤", "٧", "٦"], correctAnswer: 0, explanation: "من الثانية: ص = ٣س−٧. بتعويضها في الأولى: ٢س+٣(٣س−٧) = ١٢ ← ١١س = ٣٣ ← س = ٣، ص = ٢. إذن س+ص = ٥.", category: "ALGEBRA" },
  { question: "تفاحتان وثلاث برتقالات بـ ١٤ ريالاً. ثلاث تفاحات وبرتقالة بـ ١٣ ريالاً. ما سعر التفاحة؟", options: ["٣.٥", "٣", "٤.٥", "٤"], correctAnswer: 3, explanation: "٢ت+٣ب=١٤ و ٣ت+ب=١٣. من الثانية: ب=١٣−٣ت. بالتعويض: ٢ت+٣(١٣−٣ت)=١٤ ← −٧ت=−٢٨ ← ت=٤.", category: "ALGEBRA" },
  { question: "حل: س+ص+ز=١٠ و س+ص=٧ و ص+ز=٦. ما قيمة س؟", options: ["٤", "٦", "٥", "٧"], correctAnswer: 0, explanation: "من الأولى والثانية نجد ز = ١٠−٧ = ٣. من الثالثة: ص = ٦−٣ = ٣. من الثانية: س = ٧−٣ = ٤.", category: "ALGEBRA" },
  { question: "نقطة تقاطع المستقيمين: س+٢ص=٨ و ٢س−ص=٦", options: ["(٢، ٤)", "(٥، ١.٥)", "(٤، ٢)", "(٣، ١.٥)"], correctAnswer: 2, explanation: "من الأولى: س = ٨−٢ص. بالتعويض في الثانية: ٢(٨−٢ص)−ص = ٦ ← ١٦−٥ص = ٦ ← ص = ٢، س = ٤. النقطة هي (٤، ٢).", category: "ALGEBRA" },
  { question: "حلّل: س² − ٩", options: ["(س−٣)(س+٣)", "س(س−٩)", "(س−٩)²", "(س+٣)²"], correctAnswer: 0, explanation: "تحليل فرق بين مربعين: أ²−ب² = (أ+ب)(أ−ب)، إذن س²−٩ = (س+٣)(س−٣).", category: "ALGEBRA" },
  { question: "حلّل: س² + ٥س + ٦", options: ["(س+٢)(س+٣)", "س(س+٥)", "(س+٦)²", "(س−٢)(س−٣)"], correctAnswer: 0, explanation: "نبحث عن عددين مجموعهما ٥ وحاصل ضربهما ٦ وهما ٢ و ٣. إذن التحليل هو (س+٢)(س+٣).", category: "ALGEBRA" },
  { question: "حلّل: ٢س² + ٨س", options: ["٢س(س+٤)", "٢(س²+٤س)", "٢س(س−٤)", "٢(س²−٤س)"], correctAnswer: 0, explanation: "باستخراج العامل المشترك الأكبر ٢س خارج القوس: ٢س² + ٨س = ٢س(س+٤).", category: "ALGEBRA" },
  { question: "ما قيمة (س+ص)³ إذا كان س+ص=٢ وس ص=−٣؟", options: ["٨-", "٨", "−٢", "٢"], correctAnswer: 1, explanation: "المطلوب هو (س+ص)³ والمقدار س+ص معطى مباشرة ويساوي ٢، إذن ٢³ = ٨.", category: "ALGEBRA" },
  { question: "ما قيمة س³+ص³ إذا كان س+ص=٤ وسص=٣؟", options: ["٢٤", "٣٠", "٣٢", "٢٨"], correctAnswer: 3, explanation: "أولاً: س²+ص² = (س+ص)² − ٢سص = ١٦ − ٦ = ١٠. ثانياً: س³+ص³ = (س+ص)(س² − سص + ص²) = ٤ × (١٠ − ٣) = ٢٨.", category: "ALGEBRA" },
  { question: "بسّط: (س²−٤)/(س+٢)", options: ["س+٢", "س−٢", "٢س", "٣−س"], correctAnswer: 1, explanation: "بتحليل البسط كفرق مربعين: (س−٢)(س+٢) / (س+٢) = س−٢.", category: "ALGEBRA" },
  { question: "إذا كان س−١/س=٣، فما قيمة س²+١/س²؟", options: ["١١", "٩", "١٢", "١٠"], correctAnswer: 0, explanation: "بتربيع الطرفين: (س−١/س)² = ٩ ← س² − ٢ + ١/س² = ٩ ← س² + ١/س² = ١١.", category: "ALGEBRA" },
  { question: "إذا كانت ف(س)=٣س+١، فما ف⁻¹(١٠)؟", options: ["٢", "٣", "٥", "٤"], correctAnswer: 1, explanation: "الدالة العكسية ف⁻¹(١٠) تعني إيجاد قيمة س عندما ف(س)=١٠: ٣س+١ = ١٠ ← ٣س = ٩ ← س = ٣.", category: "ALGEBRA" },
  { question: "إذا كانت ف(س)=س²+٢ وج(س)=√س، فما ف(ج(٤))؟", options: ["٧", "٤", "٥", "٦"], correctAnswer: 3, explanation: "أولاً نوجد الدالة الداخلية: ج(٤) = √٤ = ٢. ثم الدالة الخارجية: ف(٢) = ٢² + ٢ = ٦.", category: "ALGEBRA" },
  { question: "الدالة ف(س)=٢س−٤. ما قيمة س عندما ف(س)=٠؟", options: ["٤", "٩", "٢", "١٠"], correctAnswer: 2, explanation: "نساوي الدالة بالصفر: ٢س − ٤ = ٠ ← ٢س = ٤ ← س = ٢.", category: "ALGEBRA" },
  { question: "إذا كانت ف(س+٢)=٣س−١، فما ف(٧)؟", options: ["١٣", "١٢", "١٥", "١٤"], correctAnswer: 3, explanation: "نضع س + ٢ = ٧ ← س = ٥. بتعويض قيمة س في الطرف الآخر: ف(٧) = ٣ × ٥ − ١ = ١٤.", category: "ALGEBRA" },
  { question: "ف(س)=أس+ب، ف(٢)=٧ وف(−١)=١. ما قيمة أ+ب؟", options: ["٧", "٥", "٤", "٦"], correctAnswer: 1, explanation: "نعوض بالنقاط: ٢أ+ب=٧ و −أ+ب=١. بطرح المعادلتين: ٣أ=٦ ← أ=٢، ومنها ب=٣. إذن أ+ب = ٥.", category: "ALGEBRA" },
  { question: "حل المتباينة: ٣س + ٥ > ١٤", options: ["س < ٣", "س > ٢", "س > ٤", "س > ٣"], correctAnswer: 3, explanation: "بنقل الحدود الثابتة: ٣س > ١٤ − ٥ ← ٣س > ٩ ← س > ٣.", category: "ALGEBRA" },
  { question: "حل المتباينة: −٢س + ٦ ≥ ٢", options: ["س ≤ ٢", "س ≥ ٢", "س ≤ ٤", "س ≥ ٤"], correctAnswer: 0, explanation: "−٢س ≥ ٢ − ٦ ← −٢س ≥ −٤ ← س ≤ ٢ (تنقلب إشارة المتباينة عند القسمة على عدد سالب).", category: "ALGEBRA" },
  { question: "حل: |٢س − ٣| ≤ ٧", options: ["س ≤ ٥", "س ≥ −٢", "−٢ ≤ س ≤ ٥", "س < −٢ أو س > ٥"], correctAnswer: 2, explanation: "بفك المتباينة المطلقة: −٧ ≤ ٢س − ٣ ≤ ٧ ← −٤ ≤ ٢س ≤ ١٠ ← −٢ ≤ س ≤ ٥.", category: "ALGEBRA" },
  { question: "كم وحدة يجب إنتاجها على الأقل لتحقيق ربح إذا كان الربح = ٥س − ٢٠٠ وأردنا الربح > ٣٠٠؟", options: ["١١٠", "٩٩", "١٠٠", "١٠١"], correctAnswer: 3, explanation: "٥س − ٢٠٠ > ٣٠٠ ← ٥س > ٥٠٠ ← س > ١٠٠. إذن أقل عدد صحيح تالي يحقق الشرط هو ١٠١.", category: "ALGEBRA" },
  { question: "مزارع يريد تسوير حقل مستطيل محيطه على الأكثر ١٠٠م وطوله ٣٠م. ما أقصى عرض؟", options: ["٢٠", "١٥", "٣٠", "٢٥"], correctAnswer: 0, explanation: "٢(٣٠ + ع) ≤ ١٠٠ ← ٣٠ + ع ≤ ٥٠ ← ع ≤ ٢٠. أقصى عرض هو ٢٠م.", category: "ALGEBRA" },
  { question: "رسوم نادٍ: اشتراك ٢٠٠ ريال + ٣٠ لكل زيارة. نادٍ آخر: ٥٠ لكل زيارة بلا اشتراك. ابتداءً من كم زيارة يصبح النادي الأول أوفر؟", options: ["١١", "٩", "١٢", "١٠"], correctAnswer: 0, explanation: "يكون النادي الأول أوفر عندما: ٢٠٠ + ٣٠ز < ٥٠ز ← ٢٠٠ < ٢٠ز ← ز > ١٠. إذن يصبح أوفر ابتداءً من الزيارة ١١.", category: "ALGEBRA" },
];

const geometryQuestions: Q[] = [
  { question: "مستطيل طوله ٨ سم وعرضه ٥ سم. ما مساحته؟", options: ["٢٦", "٣٠", "٤٥", "٤٠"], correctAnswer: 3, explanation: "المساحة = الطول × العرض = ٨ × ٥ = ٤٠ سم².", category: "GEOMETRY" },
  { question: "مربع طول ضلعه ٦ سم. ما محيطه؟", options: ["٢٤", "٣٠", "٤٥", "٤٠"], correctAnswer: 0, explanation: "المحيط = ٤ × طول الضلع = ٤ × ٦ = ٢٤ سم.", category: "GEOMETRY" },
  { question: "مثلث قاعدته ١٠ سم وارتفاعه ٦ سم. ما مساحته؟", options: ["٢٦", "٣٠", "٤٥", "٤٠"], correctAnswer: 1, explanation: "المساحة = ½ × القاعدة × الارتفاع = ½ × ١٠ × ٦ = ٣٠ سم².", category: "GEOMETRY" },
  { question: "دائرة نصف قطرها ٧ سم. ما تقريب محيطها؟ (π≈٣.١٤)", options: ["٤٥.٧٨", "٤٤.٧٥", "٤٣.٩٦", "٤٠"], correctAnswer: 2, explanation: "المحيط = ٢ × π × نق = ٢ × ٣.١٤ × ٧ = ٤٣.٩٦ سم.", category: "GEOMETRY" },
  { question: "دائرة نصف قطرها ٥ سم. ما مساحتها؟ (π≈٣.١٤)", options: ["٢٦", "٣١.٤", "٥٠", "٧٨.٥"], correctAnswer: 3, explanation: "المساحة = π × نق² = ٣.١٤ × ٢٥ = ٧٨.٥ سم².", category: "GEOMETRY" },
  { question: "متوازي أضلاع قاعدته ١٢ سم وارتفاعه ٧ سم. ما مساحته؟", options: ["٩٦", "٣٠", "٨٤", "٧٦"], correctAnswer: 2, explanation: "المساحة = القاعدة × الارتفاع = ١٢ × ٧ = ٨٤ سم².", category: "GEOMETRY" },
  { question: "شبه منحرف قاعدتاه ٨ و١٢ وارتفاعه ٥. ما مساحته؟", options: ["٢٦", "٣٠", "٤٥", "٥٠"], correctAnswer: 3, explanation: "المساحة = ½ × (القاعدة الأولى + القاعدة الثانية) × الارتفاع = ½ × (٨+١٢) × ٥ = ٥٠ سم².", category: "GEOMETRY" },
  { question: "مربع مساحته ٦٤ سم². ما طول ضلعه؟", options: ["٨", "١٦", "٣٢", "٤"], correctAnswer: 0, explanation: "طول الضلع = √٦٤ = ٨ سم، لأن ٨ × ٨ = ٦٤.", category: "GEOMETRY" },
  { question: "مستطيل محيطه ٣٦ سم وطوله ١٢ سم. ما عرضه؟", options: ["٨", "٦", "١٠", "١٢"], correctAnswer: 1, explanation: "نصف المحيط = ١٨ سم. بما أن الطول = ١٢ سم، إذن العرض = ١٨ − ١٢ = ٦ سم.", category: "GEOMETRY" },
  { question: "دائرة قطرها ١٠ سم. ما مساحتها؟ (π≈٣.١٤)", options: ["١٥٧", "٣١٤", "٣١.٤", "٧٨.٥"], correctAnswer: 3, explanation: "نصف القطر = ٥ سم، المساحة = ٣.١٤ × ٥² = ٣.١٤ × ٢٥ = ٧٨.٥ سم².", category: "GEOMETRY" },
  { question: "مجموع زوايا المثلث يساوي:", options: ["١٨٠ درجة", "٣٦٠ درجة", "٩٠ درجة", "٢٧٠ درجة"], correctAnswer: 0, explanation: "مجموع قياسات الزوايا الداخلية لأي مثلث يساوي دائماً ١٨٠ درجة.", category: "GEOMETRY" },
  { question: "في مثلث زاويتان ٦٠° و٧٠°. ما قياس الزاوية الثالثة؟", options: ["٧٠°", "٦٠°", "٥٠°", "٨٠°"], correctAnswer: 2, explanation: "الزاوية الثالثة = ١٨٠° − (٦٠° + ٧٠°) = ٥٠°.", category: "GEOMETRY" },
  { question: "الزاوية المجاورة لزاوية ٦٥° على خط مستقيم تساوي:", options: ["١١٠°", "١١٥°", "٨٥°", "١٠٥°"], correctAnswer: 1, explanation: "الزاويتان المتجاورتان على خط مستقيم متكاملتان (مجموعهما ١٨٠°): ١٨٠° − ٦٥° = ١١٥°.", category: "GEOMETRY" },
  { question: "مجموع زوايا المربع الداخلية يساوي:", options: ["٥٤٠°", "٢٧٠°", "١٨٠°", "٣٦٠°"], correctAnswer: 3, explanation: "المربع شكل رباعي، ومجموع الزوايا الداخلية لأي شكل رباعي يساوي ٣٦٠°.", category: "GEOMETRY" },
  { question: "المضلع السداسي المنتظم، ما قياس كل زاوية داخلية له؟", options: ["١٢٠°", "١٠٨°", "١٥٠°", "١٣٥°"], correctAnswer: 0, explanation: "قياس الزاوية الداخلية = (ن−٢) × ١٨٠° ÷ ن = (٦−٢) × ١٨٠° ÷ ٦ = ٧٢٠° ÷ ٦ = ١٢٠°.", category: "GEOMETRY" },
  { question: "مثلث متساوي الساقين زاوية رأسه ٤٠°. ما قياس كل زاوية من زوايا القاعدة؟", options: ["٢٦°", "٣٠°", "٤٥°", "٧٠°"], correctAnswer: 3, explanation: "زوايا القاعدة متطابقة: (١٨٠° − ٤٠°) ÷ ٢ = ١٤٠° ÷ ٢ = ٧٠°.", category: "GEOMETRY" },
  { question: "مجموع زوايا مضلع عدد أضلاعه ٨ يساوي:", options: ["١٢٦٠°", "٧٢٠°", "٩٠٠°", "١٠٨٠°"], correctAnswer: 3, explanation: "مجموع الزوايا = (ن−٢) × ١٨٠° = (٨−٢) × ١٨٠° = ٦ × ١٨٠° = ١٠٨٠°.", category: "GEOMETRY" },
  { question: "في مثلث قائم الزاوية، طول الساقين ٣سم و٤سم. ما طول الوتر؟", options: ["٥", "٦", "٧", "٨"], correctAnswer: 0, explanation: "حسب نظرية فيثاغورس: الوتر = √(٣² + ٤²) = √(٩ + ١٦) = √٢٥ = ٥ سم.", category: "GEOMETRY" },
  { question: "مكعب طول ضلعه ٤ سم. ما حجمه؟", options: ["٣٢", "٤٨", "٦٤", "٢٤"], correctAnswer: 2, explanation: "الحجم = طول الضلع³ = ٤ × ٤ × ٤ = ٦٤ سم³.", category: "GEOMETRY" },
  { question: "متوازي مستطيلات أبعاد أضلاعه ٣ × ٤ × ٥ سم. ما حجمه؟", options: ["٢٦", "٣٠", "٤٥", "٦٠"], correctAnswer: 3, explanation: "الحجم = الطول × العرض × الارتفاع = ٣ × ٤ × ٥ = ٦٠ سم³.", category: "GEOMETRY" },
  { question: "أريد تبليط غرفة أبعادها ٦م × ٥م ببلاط مربع حجمه ٥٠سم × ٥٠سم. كم بلاطة أحتاج؟", options: ["٩٠", "٢٤٠", "٦٠", "١٢٠"], correctAnswer: 3, explanation: "مساحة الغرفة = ٣٠م² = ٣٠٠,٠٠٠ سم²، ومساحة البلاطة = ٢,٥٠٠ سم². عدد البلاط = ٣٠٠,٠٠٠ ÷ ٢,٥٠٠ = ١٢٠ بلاطة.", category: "GEOMETRY" },
  { question: "أسطوانة نصف قطرها ٣ سم وارتفاعها ١٠ سم. ما حجمها؟ (π≈٣.١٤)", options: ["١٨٨.٤", "٣٧٦.٨", "٢٨٢.٦", "٩٤.٢"], correctAnswer: 2, explanation: "الحجم = π × نق² × ع = ٣.١٤ × ٩ × ١٠ = ٢٨٢.٦ سم³.", category: "GEOMETRY" },
  { question: "معين طول قطريه ٨ سم و٦ سم. ما مساحته؟", options: ["٢٦", "٢٤", "٤٥", "٤٠"], correctAnswer: 1, explanation: "مساحة المعين = (القطر الأول × القطر الثاني) ÷ ٢ = (٨ × ٦) ÷ ٢ = ٢٤ سم².", category: "GEOMETRY" },
  { question: "دائرة مساحتها ١٥٤ سم². ما طول نصف قطرها؟ (π≈٢٢/٧)", options: ["٧", "١٤", "٢١", "٢٨"], correctAnswer: 0, explanation: "١٥٤ = (٢٢/٧) × نق² ← نق² = ١٥٤ × (٧/٢٢) = ٤٩ ← نق = ٧ سم.", category: "GEOMETRY" },
  { question: "المسافة بين نقطة الأصل (٠,٠) والنقطة (٣,٤) تساوي:", options: ["٤", "٣", "٧", "٥"], correctAnswer: 3, explanation: "المسافة = √(٣² + ٤²) = √(٩ + ١٦) = √٢٥ = ٥.", category: "GEOMETRY" },
  { question: "إحداثيات نقطة منتصف القطعة المستقيمة الواصلة بين (٢,٤) و(٦,٨) هي:", options: ["(٤,٦)", "(٣,٥)", "(٥,٧)", "(٤,٥)"], correctAnswer: 0, explanation: "نقطة المنتصف = ((٢+٦)/٢ , (٤+٨)/٢) = (٤ , ٦).", category: "GEOMETRY" },
  { question: "المسافة بين النقطتين (١,٢) و(٤,٦) تساوي:", options: ["٦", "٥", "٤٥", "٤٠"], correctAnswer: 1, explanation: "المسافة = √((٤−١)² + (٦−٢)²) = √(٣² + ٤²) = √٢٥ = ٥.", category: "GEOMETRY" },
  { question: "النقطة (−٣، ٢) تقع في الربع الإحداثي:", options: ["الرابع", "الثالث", "الأول", "الثاني"], correctAnswer: 3, explanation: "الإحداثي السيني سالب والصادي موجب، وهذا يقع في الربع الثاني.", category: "GEOMETRY" },
  { question: "مثلثان متشابهان، أضلاع أحدهما ٣، ٤، ٥ سم ونسبة التشابه لهما ٢. ما طول أطول ضلع في المثلث الثاني؟", options: ["٩", "٨", "١٠", "١٢"], correctAnswer: 2, explanation: "أطول ضلع في المثلث الأصلي هو ٥ سم، نضربه في معامل التشابه: ٥ × ٢ = ١٠ سم.", category: "GEOMETRY" },
  { question: "مثلثان متشابهان، نسبة الأضلاع المتناظرة لهما ٣:٥. ما هي نسبة مساحتيهما؟", options: ["٩:٢٥", "٣:٥", "٢٦:٥", "٢٤:٥"], correctAnswer: 0, explanation: "نسبة المساحات تساوي مربع نسبة الأضلاع المتناظرة: (٣/٥)² = ٩:٢٥.", category: "GEOMETRY" },
  { question: "في مثلث قائم الزاوية طول الوتر ١٣ سم وإحدى الساقين ٥ سم. ما طول الساق الأخرى؟", options: ["١٢", "١٠", "٨", "١١"], correctAnswer: 0, explanation: "طول الساق الأخرى = √(١٣² − ٥²) = √(١٦٩ − ٢٥) = √١٤٤ = ١٢ سم.", category: "GEOMETRY" },
  { question: "مستطيل مساحته ٦٠ سم² وطوله ١٢ سم. ما محيطه؟", options: ["٢٦", "٣٤", "٤٥", "٤٠"], correctAnswer: 1, explanation: "العرض = المساحة ÷ الطول = ٦٠ ÷ ١٢ = ٥ سم. المحيط = ٢ × (١٢ + ٥) = ٣٤ سم.", category: "GEOMETRY" },
  { question: "مربع طول قطره ٨√٢ سم. ما طول ضلعه؟", options: ["٤", "٨", "٦", "١٠"], correctAnswer: 1, explanation: "قطر المربع = طول الضلع × √٢. بالتالي طول الضلع = ٨√٢ ÷ √٢ = ٨ سم.", category: "GEOMETRY" },
  { question: "أريد طلاء جدار أبعاده ٥م × ٣م، ويحتوي على باب بمساحة ١م × ٢م ونافذة بمساحة ١م × ١م. ما صافي المساحة المطلوب طلاؤها؟", options: ["١٢", "٢٢", "٥٠", "٤٤"], correctAnswer: 0, explanation: "مساحة الجدار الكلية = ١٥م². مساحة الباب = ٢م²، مساحة النافذة = ١م². المساحة الصافية المتبقية للطلاء = ١٥ − (٢ + ١) = ١٢ م².", category: "GEOMETRY" },
];

const numbersQuestions: Q[] = [
  { question: "ما نسبة ١٥ إلى ٦٠ بأبسط صورة؟", options: ["١:٤", "١:٣", "١:٢", "٢:٣"], correctAnswer: 0, explanation: "نقسم كليهما على ق.م.أ=١٥: ١٥÷١٥=١، ٦٠÷١٥=٤، إذن ١:٤.", category: "NUMBERS_EQUATIONS" },
  { question: "نسبة الطلاب الذكور إلى الإناث ٣:٢، عدد الذكور ٦٠. كم عدد الإناث؟", options: ["٤٥", "٤٠", "٥٠", "٣٠"], correctAnswer: 1, explanation: "الإناث = ٦٠ × (٢/٣) = ٤٠.", category: "NUMBERS_EQUATIONS" },
  { question: "إذا كان س/٤ = ١٢/١٦، فما قيمة س؟", options: ["٣", "٦", "٨", "٤"], correctAnswer: 0, explanation: "تضريب متقاطع: ١٦س = ٤٨ ← س = ٣.", category: "NUMBERS_EQUATIONS" },
  { question: "سيارة تقطع ٢٤٠ كم في ٣ ساعات. كم تقطع في ٥ ساعات؟", options: ["٣٠٠", "٤٥٠", "٥٠٠", "٤٠٠"], correctAnswer: 3, explanation: "السرعة = ٢٤٠ ÷ ٣ = ٨٠ كم/س، إذن ٨٠ × ٥ = ٤٠٠ كم.", category: "NUMBERS_EQUATIONS" },
  { question: "أ:ب = ٢:٣ و ب:ج = ٣:٤. ما أ:ج؟", options: ["١:٤", "٢:٣", "١:٢", "٣:٤"], correctAnswer: 2, explanation: "أ:ب:ج = ٢:٣:٤ ← أ:ج = ٢:٤ = ١:٢.", category: "NUMBERS_EQUATIONS" },
  { question: "قسّم ١٢٠ ريالاً بنسبة ٣:٥. ما نصيب الأول؟", options: ["٤٥", "٤٠", "٥٠", "٣٠"], correctAnswer: 0, explanation: "نصيب الأول = ١٢٠ × (٣/٨) = ٤٥ ريالاً.", category: "NUMBERS_EQUATIONS" },
  { question: "ما قيمة ٤٠٪ من ٢٥٠؟", options: ["١٠٠", "٩٠", "٨٠", "١٢٠"], correctAnswer: 0, explanation: "٢٥٠ × ٠.٤ = ١٠٠.", category: "NUMBERS_EQUATIONS" },
  { question: "ارتفع سعر السلعة من ٨٠ إلى ١٠٠. ما نسبة الزيادة؟", options: ["٢٠٪", "١٥٪", "٢٥٪", "٣٠٪"], correctAnswer: 2, explanation: "الزيادة = ٢٠، نسبة الزيادة = ٢٠ ÷ ٨٠ × ١٠٠ = ٢٥٪.", category: "NUMBERS_EQUATIONS" },
  { question: "خصم ١٥٪ من سعر ٤٠٠ ريال. ما السعر الجديد؟", options: ["٣٤٠", "٣٦٠", "٣٨٠", "٣٢٠"], correctAnswer: 0, explanation: "٤٠٠ × ٠.٨٥ = ٣٤٠ ريالاً.", category: "NUMBERS_EQUATIONS" },
  { question: "٣٠٪ من عدد = ٩٠. ما ٥٠٪ من نفس العدد؟", options: ["١٣٠", "١٢٠", "١٨٠", "١٥٠"], correctAnswer: 3, explanation: "العدد = ٩٠ ÷ ٠.٣ = ٣٠٠، إذن ٥٠٪ منه = ٣٠٠ × ٠.٥ = ١٥٠.", category: "NUMBERS_EQUATIONS" },
  { question: "أ يُنجز عملاً في ٦ أيام، ب في ١٢ يوماً. كم يحتاجان معاً؟", options: ["٤", "٦", "٥", "٣"], correctAnswer: 0, explanation: "في اليوم: ١/٦ + ١/١٢ = ٣/١٢ = ١/٤، إذن يحتاجان ٤ أيام.", category: "NUMBERS_EQUATIONS" },
  { question: "أُضيف ٢٠٪ ثم خُفّض ٢٠٪. ما نسبة التغيير الإجمالية؟", options: ["٠٪", "−٢٪", "−٤٪", "٤٪"], correctAnswer: 2, explanation: "١.٢ × ٠.٨ = ٠.٩٦ ← خسارة ٤٪.", category: "NUMBERS_EQUATIONS" },
  { question: "ربح ٢٥٪ على تكلفة ٢٠٠ ريال. ما سعر البيع؟", options: ["٢٢٥", "٢٤٠", "٢٢٠", "٢٥٠"], correctAnswer: 3, explanation: "٢٠٠ × ١.٢٥ = ٢٥٠ ريالاً.", category: "NUMBERS_EQUATIONS" },
  { question: "٨ عمال ينهون عملاً في ٦ أيام. كم يوماً لـ ١٢ عاملاً؟", options: ["٣", "٤", "٦", "٥"], correctAnswer: 1, explanation: "تناسب عكسي: ٨ × ٦ = ١٢ × أيام ← أيام = ٤.", category: "NUMBERS_EQUATIONS" },
  { question: "ما قيمة: ٣ + ٤ × ٢ ؟", options: ["١١", "١٤", "١٠", "٩"], correctAnswer: 0, explanation: "الضرب أولاً: ٤ × ٢ = ٨، ثم ٣ + ٨ = ١١.", category: "NUMBERS_EQUATIONS" },
  { question: "ما قيمة: (٦ + ٢) × ٣ − ٤ ؟", options: ["٢٢", "٢٠", "١٢", "١٦"], correctAnswer: 1, explanation: "القوس أولاً: (٦+٢) = ٨، ثم ٨ × ٣ = ٢٤، ثم ٢٤ − ٤ = ٢٠.", category: "NUMBERS_EQUATIONS" },
  { question: "ما قيمة: ٢٠ ÷ ٤ + ٣ × ٢ − ١ ؟", options: ["١٢", "٩", "١٥", "١٠"], correctAnswer: 3, explanation: "٢٠ ÷ ٤ = ٥، و ٣ × ٢ = ٦، إذن ٥ + ٦ − ١ = ١٠.", category: "NUMBERS_EQUATIONS" },
  { question: "ما ناتج: ½ + ¼ ؟", options: ["١/٤", "٢/٤", "٣/٤", "٤/٤"], correctAnswer: 2, explanation: "مقام مشترك = ٤: ٢/٤ + ١/٤ = ٣/٤.", category: "NUMBERS_EQUATIONS" },
  { question: "ما ناتج: ٢/٣ × ٣/٤ ؟", options: ["٧/١٢", "٣/٥", "٢/٣", "١/٢"], correctAnswer: 3, explanation: "٢/٣ × ٣/٤ = ٦/١٢ = ١/٢.", category: "NUMBERS_EQUATIONS" },
  { question: "ما ناتج: ٣/٤ ÷ ٣/٨ ؟", options: ["١½", "٩/٣٢", "٢", "٣"], correctAnswer: 2, explanation: "اقلب المقسوم عليه واضرب: ٣/٤ × ٨/٣ = ٢٤/١٢ = ٢.", category: "NUMBERS_EQUATIONS" },
  { question: "٣/٥ من عدد = ٢٤. ما العدد؟", options: ["٣٢", "٣٦", "٤٠", "٤٨"], correctAnswer: 2, explanation: "العدد = ٢٤ ÷ (٣/٥) = ٢٤ × ٥/٣ = ٤٠.", category: "NUMBERS_EQUATIONS" },
  { question: "ما ناتج: ٠.٧ + ٠.٣٨ ؟", options: ["١.٠٨", "١.١٨", "١.٢٨", "١.٣٨"], correctAnswer: 0, explanation: "٠.٧٠ + ٠.٣٨ = ١.٠٨.", category: "NUMBERS_EQUATIONS" },
  { question: "ما ناتج: ٣.٦ × ٠.٥ ؟", options: ["٣.١", "١.٨", "٢.٢", "٢.٤"], correctAnswer: 1, explanation: "الضرب في ٠.٥ = نصف العدد: ٣.٦ ÷ ٢ = ١.٨.", category: "NUMBERS_EQUATIONS" },
  { question: "ما ناتج: ٢.٤ ÷ ٠.٠٦ ؟", options: ["٠.٤", "٤٠٠", "٤٠", "٠.٠٠٤"], correctAnswer: 2, explanation: "اضرب كليهما في ١٠٠: ٢٤٠ ÷ ٦ = ٤٠.", category: "NUMBERS_EQUATIONS" },
  { question: "ما قيمة: ٢⁵ ؟", options: ["٣٢", "٦٤", "١٢٨", "٢٥٦"], correctAnswer: 0, explanation: "٢⁵ = ٢ × ٢ × ٢ × ٢ × ٢ = ٣٢.", category: "NUMBERS_EQUATIONS" },
  { question: "ما قيمة: ٣⁴ ÷ ٣² ؟", options: ["٩", "٢٧", "٨١", "٢٤٣"], correctAnswer: 0, explanation: "٣⁴ ÷ ٣² = ٣^(٤−٢) = ٣² = ٩.", category: "NUMBERS_EQUATIONS" },
  { question: "ما قيمة: (٢³)² ؟", options: ["١٦", "٣٢", "١٢٨", "٦٤"], correctAnswer: 3, explanation: "قوة على قوة: ٢^(٣×٢) = ٢⁶ = ٦٤.", category: "NUMBERS_EQUATIONS" },
  { question: "ما قيمة: ٥⁰ + ٤¹ + ٢⁻¹ ؟", options: ["٥.٥", "٦", "٧", "٤.٥"], correctAnswer: 0, explanation: "٥⁰ = ١، ٤¹ = ٤، ٢⁻¹ = ٠.٥. المجموع = ١ + ٤ + ٠.٥ = ٥.٥.", category: "NUMBERS_EQUATIONS" },
  { question: "ما قيمة: √١٤٤ ؟", options: ["١٢", "١٣", "١٤", "١١"], correctAnswer: 0, explanation: "١٢ × ١٢ = ١٤٤، إذن √١٤٤ = ١٢.", category: "NUMBERS_EQUATIONS" },
  { question: "ما قيمة: √٧٢ بأبسط صورة؟", options: ["٢√٦", "٣√٨", "٣√٢", "٦√٢"], correctAnswer: 3, explanation: "٧٢ = ٣٦ × ٢، إذن √٧٢ = √٣٦ × √٢ = ٦√٢.", category: "NUMBERS_EQUATIONS" },
  { question: "ما قيمة: √٣ × √١٢ ؟", options: ["٤√٣", "٢√٣", "٦", "√٥"], correctAnswer: 2, explanation: "√٣ × √١٢ = √٣٦ = ٦.", category: "NUMBERS_EQUATIONS" },
];

const probabilityQuestions: Q[] = [
  { question: "كيس فيه ٤ كرات حمراء و٦ زرقاء. ما احتمال سحب كرة حمراء؟", options: ["٢/٥", "٣/٥", "٢/٣", "١/٢"], correctAnswer: 0, explanation: "عدد الكرات الحمراء = ٤، الإجمالي = ١٠. الاحتمال = ٤/١٠ = ٢/٥.", category: "PROBABILITY" },
  { question: "رُمي حجر نرد. ما احتمال ظهور عدد أقل من ٤؟", options: ["١/٣", "١/٢", "٢/٣", "٥/٦"], correctAnswer: 1, explanation: "الأعداد الأقل من ٤ هي: ١، ٢، ٣ (وهي ٣ أعداد من أصل ٦). الاحتمال = ٣/٦ = ١/٢.", category: "PROBABILITY" },
  { question: "رُميت قطعة نقود مرتين. ما احتمال ظهور صورتين؟", options: ["١/٢", "١/٣", "١/٤", "١/٨"], correctAnswer: 2, explanation: "احتمال الصورة في كل رمية = ١/٢. الاحتمال المشترك للحدثين المستقلين = ١/٢ × ١/٢ = ١/٤.", category: "PROBABILITY" },
  { question: "كم طريقة لترتيب ٥ كتب مختلفة على رف؟", options: ["٢٠", "٦٠", "١٢٠", "٢٤٠"], correctAnswer: 2, explanation: "عدد التراتيب هو مضروب العدد: ٥! = ٥ × ٤ × ٣ × ٢ × ١ = ١٢٠.", category: "PROBABILITY" },
  { question: "كم طريقة لاختيار ٢ طلاب من ٦ لتمثيل الفصل؟", options: ["١٢", "١٥", "٢٠", "٣٠"], correctAnswer: 1, explanation: "باستخدام التوافيق: ٦! ÷ (٢! × ٤!) = (٦ × ٥) ÷ ٢ = ١٥.", category: "PROBABILITY" },
  { question: "حدثان مستقلان احتمال أ=٠.٥ واحتمال ب=٠.٦. ما احتمال وقوع كليهما؟", options: ["٠.٣", "٠.٤", "٠.٥", "١.١"], correctAnswer: 0, explanation: "في الأحداث المستقلة نضرب الاحتمالين معاً: ٠.٥ × ٠.٦ = ٠.٣.", category: "PROBABILITY" },
  { question: "صندوق فيه ١٠ كرات: ٣ خضراء و٧ غير خضراء. ما احتمال عدم سحب كرة خضراء؟", options: ["٣/١٠", "٧/١٠", "١/٣", "١/٢"], correctAnswer: 1, explanation: "عدد الكرات غير الخضراء = ٧ من أصل ١٠. الاحتمال = ٧/١٠.", category: "PROBABILITY" },
  { question: "في فصل ٢٥ طالباً، ١٥ يحبون كرة القدم. اختُير طالب عشوائياً. ما احتمال أنه يحب كرة القدم؟", options: ["٢/٥", "٣/٥", "١/٢", "٧/١٠"], correctAnswer: 1, explanation: "الاحتمال = ١٥/٢٥ = ٣/٥.", category: "PROBABILITY" },
  { question: "عند رمي قطعة نقدية ٤ مرات، ما احتمال أن تظهر الكتابة في الأربع مرات معاً؟", options: ["١/١٦", "١/١٢", "١/٨", "٣/٤"], correctAnswer: 0, explanation: "احتمال ظهور الكتابة في الرمية الواحدة هو ١/٢. بما أن الرميات مستقلة: (١/٢)⁴ = ١/١٦.", category: "PROBABILITY" },
];

const patternsQuestions: Q[] = [
  { question: "متتالية حسابية أول حدودها ٤ وفرقها ٥. ما الحد الثامن؟", options: ["٣٤", "٣٧", "٣٩", "٤٤"], correctAnswer: 2, explanation: "الحد الثامن = أ + (ن−١)×د = ٤ + (٧ × ٥) = ٤ + ٣٥ = ٣٩.", category: "PATTERNS" },
  { question: "متتالية هندسية أول حدودها ٣ ونسبتها ٢. ما الحد السادس؟", options: ["٤٨", "٦٤", "٩٦", "١٢٨"], correctAnswer: 2, explanation: "الحد السادس = أ × ر⁵ = ٣ × ٢⁵ = ٣ × ٣٢ = ٩٦.", category: "PATTERNS" },
  { question: "ما الحد التالي في النمط: ٣، ٧، ١٢، ١٨، ٢٥، ؟", options: ["٣٢", "٣٣", "٣٤", "٣٥"], correctAnswer: 1, explanation: "الفروق المتتالية هي: +٤، +٥، +٦، +٧، والمقبل +٨. إذن ٢٥ + ٨ = ٣٣.", category: "PATTERNS" },
  { question: "ما مجموع أول ١٥ عدداً طبيعياً؟", options: ["١٠٥", "١١٠", "١١٥", "١٢٠"], correctAnswer: 3, explanation: "قانون المجموع للمتتالية = ن(ن+١) ÷ ٢ = ١٥ × ١٦ ÷ ٢ = ١٢٠.", category: "PATTERNS" },
  { question: "متتالية: ١، ٤، ٩، ١٦، ٢٥، ؟ ما الحد التالي؟", options: ["٣٠", "٣٢", "٣٤", "٣٦"], correctAnswer: 3, explanation: "الحدود تمثل مربعات الأعداد: ١²، ٢²، ٣²، ٤²، ٥². الحد التالي = ٦² = ٣٦.", category: "PATTERNS" },
];

const ratioQuestions: Q[] = [
  { question: "نسبة ٤٨ إلى ٦٤ بأبسط صورة:", options: ["٣:٤", "٤:٥", "٢:٣", "٥:٦"], correctAnswer: 0, explanation: "نقسم كليهما على ق.م.أ=١٦: ٤٨÷١٦=٣، ٦٤÷١٦=٤، إذن النسبة ٣:٤.", category: "RATIO" },
  { question: "قُسّمت ٤٥٠ ريالاً بنسبة ٢:٧. ما نصيب الأقل؟", options: ["٨٠", "٩٠", "١٠٠", "١١٠"], correctAnswer: 2, explanation: "المجموع ٩ وحدات. نصيب الأقل = ٤٥٠ × ٢/٩ = ١٠٠ ريال.", category: "RATIO" },
  { question: "سيارة تقطع ٢١٠ كم بـ ١٤ لتراً. كم تقطع بـ ٢٠ لتراً؟", options: ["٢٧٠", "٢٨٠", "٣٠٠", "٣٢٠"], correctAnswer: 2, explanation: "معدل الاستهلاك = ٢١٠÷١٤ = ١٥ كم/لتر. إذن ١٥×٢٠ = ٣٠٠ كم.", category: "RATIO" },
  { question: "٦ عمال ينجزون عملاً في ١٢ يوماً. كم يوماً يحتاج ٨ عمال؟", options: ["٧", "٨", "٩", "١٠"], correctAnswer: 2, explanation: "تناسب عكسي: ٦×١٢ = ٨×أيام ← أيام = ٧٢÷٨ = ٩.", category: "RATIO" },
  { question: "أ:ب = ٣:٥ و ب:ج = ٥:٨. ما أ:ج؟", options: ["٣:٨", "٣:١٣", "٨:٣", "٥:٨"], correctAnswer: 0, explanation: "نوحّد ب: أ:ب=٣:٥، ب:ج=٥:٨. القيمة المشتركة لـ ب هي ٥، إذن أ:ج = ٣:٨ مباشرة.", category: "RATIO" },
  { question: "نسبة طلاب أ إلى ب هي ٣:٤. إذا كان مجموعهم ١٤٠، فما عدد طلاب ب؟", options: ["٦٠", "٧٠", "٨٠", "٩٠"], correctAnswer: 2, explanation: "المجموع ٧ وحدات، قيمة الوحدة = ٢٠. ب = ٤ × ٢٠ = ٨٠ طالباً.", category: "RATIO" },
  { question: "إذا كان ٥/٨ من عدد = ٤٠، فما العدد؟", options: ["٥٠", "٥٦", "٦٤", "٧٢"], correctAnswer: 2, explanation: "العدد = ٤٠ ÷ ٥/٨ = ٤٠ × ٨/٥ = ٦٤.", category: "RATIO" },
  { question: "ما قيمة ٤٥٪ من ٣٢٠؟", options: ["١٢٤", "١٣٢", "١٤٤", "١٥٠"], correctAnswer: 2, explanation: "٣٢٠ × ٠.٤٥ = ١٤٤.", category: "RATIO" },
  { question: "بعد خصم ٢٠٪ أصبح سعر منتج ٤٨٠ ريالاً. ما سعره الأصلي؟", options: ["٥٤٠", "٥٧٦", "٦٠٠", "٦٢٤"], correctAnswer: 2, explanation: "السعر الأصلي = ٤٨٠ ÷ ٠.٨ = ٦٠٠ ريال.", category: "RATIO" },
  { question: "حصل طالب على ٦٨ من ٨٠. ما نسبته المئوية؟", options: ["٧٥٪", "٨٠٪", "٨٥٪", "٩٠٪"], correctAnswer: 2, explanation: "٦٨ ÷ ٨٠ × ١٠٠ = ٨٥٪.", category: "RATIO" },
  { question: "اشترى تاجر بضاعة بـ ٩٠٠ ريال وباعها بـ ١١٢٥ ريالاً. ما نسبة الربح؟", options: ["٢٠٪", "٢٢٪", "٢٥٪", "٣٠٪"], correctAnswer: 2, explanation: "الربح = ٢٢٥. النسبة = ٢٢٥ ÷ ٩٠٠ × ١٠٠ = ٢٥٪.", category: "RATIO" },
  { question: "ما العدد الذي ٣٠٪ منه يساوي ٦٠؟", options: ["١٨٠", "٢٠٠", "٢١٠", "٢٢٠"], correctAnswer: 1, explanation: "٠.٣ × س = ٦٠ ← س = ٦٠ ÷ ٠.٣ = ٢٠٠.", category: "RATIO" },
  { question: "راتب موظف ٥٠٠٠. زاد ١٠٪ ثم نزل ١٠٪. ما الراتب النهائي؟", options: ["٤٩٥٠", "٥٠٠٠", "٥٠٥٠", "٥١٠٠"], correctAnswer: 0, explanation: "٥٠٠٠ × ١.١ × ٠.٩ = ٥٥٠٠ × ٠.٩ = ٤٩٥٠.", category: "RATIO" },
  { question: "بضاعة بيعت بـ ٦٩٠ ريالاً بعد إضافة ضريبة ١٥٪. ما ثمنها قبل الضريبة؟", options: ["٥٧٥", "٥٨٥", "٦٠٠", "٦١٥"], correctAnswer: 2, explanation: "الثمن × ١.١٥ = ٦٩٠ ← الثمن = ٦٩٠ ÷ ١.١٥ = ٦٠٠ ريال.", category: "RATIO" },
  { question: "أ:ب:ج = ١:٢:٣ ومجموعهم ١٢٠. ما قيمة ب؟", options: ["٣٠", "٢٠", "٥٠", "٤٠"], correctAnswer: 3, explanation: "١٢٠ × (٢/٦) = ٤٠.", category: "RATIO" },
];

const exam2025Questions: Q[] = [
  { question: "نقاط في المستوى الأحداثي (م ، ن ، ج ، ل ، ف) تمثل قرى، إذا كانت (ل) تقع شرق (م) وغرب (ن)، و (ج) تقع جنوب شرق (ن)، و (م) تقع جنوب شرق (ف)، فأي حرف يقع في أقصى الغرب؟", options: ["ف", "ج", "ن", "ل"], correctAnswer: 0, explanation: "بترتيب مواقع القرى من الشرق إلى الغرب حسب اتجاهات المعطيات، نجد أن القرية (ف) تقع في أقصى جهة الغرب.", category: "EXAM_2025" },
  { question: "قارن بين: القيمة الأولى: ٤١ | القيمة الثانية: ٤ + (٣ + ٤)² - (٤ - ٢)⁻³", options: ["القيمة الأولى أكبر", "القيمة الثانية أكبر", "القيمتان متساويتان", "المعطيات غير كافية"], correctAnswer: 1, explanation: "القيمة الثانية = ٤ + ٤٩ - ١/٨ = ٥٢.٨٧٥. وهي أكبر من القيمة الأولى (٤١).", category: "EXAM_2025" },
  { question: "إذا كان ١ دولار = ٣ ليرات، ١٠ دولار = ٨ جنيهات، فإن ١٥ ليرة تساوي ...... جنيه؟", options: ["٤", "٣", "٦", "٨"], correctAnswer: 0, explanation: "٥ دولار = ١٥ ليرة، و٥ دولار = ٤ جنيهات. إذن ١٥ ليرة = ٤ جنيهات.", category: "EXAM_2025" },
  { question: "ما رقم آحاد ناتج ضرب أول ١٠٠ عدد أولي؟", options: ["٠", "٢", "٣", "٥"], correctAnswer: 0, explanation: "أول الأعداد الأولية تشمل ٢ و٥. عند ضرب ٢ × ٥ = ١٠، وأي عدد يُضرب في ١٠ رقم آحاده صفر.", category: "EXAM_2025" },
  { question: "قارن بين: القيمة الأولى: ٤⁵ | القيمة الثانية: ٤ × ٤ × ٤ × ٤ × ٤", options: ["القيمة الأولى أكبر", "القيمة الثانية أكبر", "القيمتان متساويتان", "المعطيات غير كافية"], correctAnswer: 2, explanation: "المقدار (٤ × ٤ × ٤ × ٤ × ٤) يساوي تماماً ٤⁵، فالقيمتان متساويتان.", category: "EXAM_2025" },
  { question: "نادي به ٥٠ مشترك، ٣٠ منهم مشتركين في كرة القدم و٢٦ مشتركين في السباحة و٦ غير مشتركين في أي منهما، كم عدد المشتركين في كليهما معاً؟", options: ["٠", "٦", "١٢", "٤"], correctAnswer: 2, explanation: "عدد المشتركين في أي منهما = ٥٠ - ٦ = ٤٤. مجموع المشتركين = ٣٠ + ٢٦ = ٥٦. التقاطع = ٥٦ - ٤٤ = ١٢.", category: "EXAM_2025" },
  { question: "مجموع ثلاثة أعداد يساوي ٩٦، والأكبر ثلاثة أضعاف الصغير والأوسط ثلثا الكبير. ما الصغير؟", options: ["١٦", "١٢", "١٤", "١٨"], correctAnswer: 0, explanation: "نفرض الصغير س، الأكبر ٣س، الأوسط ٢س. مجموعهم: ٦س = ٩٦ ← س = ١٦.", category: "EXAM_2025" },
  { question: "ما العدد الذي سدسه يساوي ٢٥/٣؟", options: ["٣٠", "٤٠", "٥٠", "٦٠"], correctAnswer: 2, explanation: "(١/٦) × س = ٢٥/٣ ← س = (٢٥ × ٦) / ٣ = ٥٠.", category: "EXAM_2025" },
  { question: "كم كلمة يمكن أن نكوّنها من حروف اسم (خالد)؟", options: ["٤", "٨", "٢٤", "٣٢"], correctAnswer: 2, explanation: "اسم (خالد) يتكون من ٤ حروف مختلفة. عدد الترتيبات = ٤! = ٢٤ كلمة.", category: "EXAM_2025" },
  { question: "إذا كان مصاريف مدرسة ١٠٠٠٠ ريال وزادت ٢٠% ويوجد خصم ٥% للطلاب الأخوة، كم المصاريف التي يدفعها أب لولدين؟", options: ["٢٤٠٠٠", "٢٢٨٠٠", "٢٣٠٠٠", "٢٢٧٥٠"], correctAnswer: 1, explanation: "المصاريف بعد الزيادة = ١٢٠٠٠. للولدين = ٢٤٠٠٠. الخصم ٥% = ١٢٠٠. المبلغ = ٢٤٠٠٠ - ١٢٠٠ = ٢٢٨٠٠.", category: "EXAM_2025" },
  { question: "دفع أحمد ٤٥% من تكلفة بناء مسجد وفهد دفع ٢٥% وتبقى ٣٦٠٠٠٠. ما تكلفة المسجد كاملة؟", options: ["١٢٠٠٠٠٠", "٣٦٠٠٠٠", "٢٤٠٠٠٠", "١٠٠٠٠٠٠"], correctAnswer: 0, explanation: "المدفوع = ٧٠%، المتبقي = ٣٠% = ٣٦٠٠٠٠. إذن التكلفة = ٣٦٠٠٠٠ × ١٠٠/٣٠ = ١٢٠٠٠٠٠ ريال.", category: "EXAM_2025" },
  { question: "إذا كان طول أحمد ١٢٠ سم وهو أقصر من أخيه محمد بـ ٢٠ سم وأقصر من أخته سعاد بـ ٥ سم، فما مجموع أطوال الثلاثة؟", options: ["٢٥٠", "٣٥٨", "٢٧٠", "٣٨٥"], correctAnswer: 3, explanation: "طول أحمد = ١٢٠، محمد = ١٤٠، سعاد = ١٢٥. المجموع = ١٢٠ + ١٤٠ + ١٢٥ = ٣٨٥ سم.", category: "EXAM_2025" },
  { question: "يبيع تاجر سلعة بربح يساوي نصف مبلغ الشراء. ما أقصى نسبة تخفيض تضمن له عدم الخسارة؟", options: ["٣٣%", "٥٠%", "٦٦%", "٧٠%"], correctAnswer: 0, explanation: "بفرض الشراء ١٠٠، البيع = ١٥٠. الحد الأقصى للتخفيض = ٥٠/١٥٠ × ١٠٠ = ٣٣.٣%.", category: "EXAM_2025" },
  { question: "اشترى شخص عصيراً بـ ٦ ريالات وهي تمثل ٢٠% مما معه. كم كان معه؟", options: ["٢٠", "٢٥", "٣٠", "٣٥"], correctAnswer: 2, explanation: "٢٠% = ١/٥. المبلغ الإجمالي = ٦ × ٥ = ٣٠ ريال.", category: "EXAM_2025" },
  { question: "أحمد وخالد مجموع كتبهم ٨٥٠ وخالد يزيد عن أحمد بمقدار ١٥٠. كم عدد كتب أحمد؟", options: ["١٠٠", "٢٥٠", "٣٥٠", "٤٠٠"], correctAnswer: 2, explanation: "نطرح الزيادة: ٨٥٠ - ١٥٠ = ٧٠٠. نصيب أحمد = ٧٠٠ ÷ ٢ = ٣٥٠ كتاباً.", category: "EXAM_2025" },
  { question: "وُزّعت ٦٤ طابعة و٤٨ حاسبة على غرف بالتساوي. ما أكبر عدد طابعات وحاسبات في كل غرفة؟", options: ["٨", "١٢", "١٦", "٢٤"], correctAnswer: 2, explanation: "القاسم المشترك الأكبر للعددين ٦٤ و٤٨ هو ١٦.", category: "EXAM_2025" },
  { question: "تحرك شخص ٩٠م شرقاً ثم ١٢٠م جنوباً. ما المسافة المستقيمة بين نقطة البداية والنهاية؟", options: ["١٠٠", "١٢٠", "١٥٠", "١٨٠"], correctAnswer: 2, explanation: "بنظرية فيثاغورس: √(٩٠² + ١٢٠²) = √(٨١٠٠ + ١٤٤٠٠) = √٢٢٥٠٠ = ١٥٠ م.", category: "EXAM_2025" },
  { question: "إذا كان متوسط درجات فصل ٨٥ قبل اختبار طالب غائب، وبعد اختباره حصل على ٣٠ وأصبح المتوسط ٨٠، فما عدد الطلاب؟", options: ["٩", "١٠", "١١", "١٢"], correctAnswer: 2, explanation: "الفارق في المتوسط = ٥ درجات. الفارق الكلي بسبب الطالب = ٨٥ - ٣٠ = ٥٥. عدد الطلاب = ٥٥ ÷ ٥ = ١١ طالباً.", category: "EXAM_2025" },
];

async function main() {
  console.log("🌱 Seeding questions...");

  await pool.query(`DELETE FROM "Attempt"`);
  await pool.query(`DELETE FROM "Question"`);

  const all = [
    ...algebraQuestions,
    ...geometryQuestions,
    ...numbersQuestions,
    ...probabilityQuestions,
    ...patternsQuestions,
    ...ratioQuestions,
    ...exam2025Questions,
  ];

  for (const q of all) {
    await pool.query(
      `INSERT INTO "Question" (id, category, question, options, "correctAnswer", explanation, difficulty, "createdAt")
       VALUES (gen_random_uuid(), $1, $2, $3::jsonb, $4, $5, $6, NOW())`,
      [q.category, q.question, JSON.stringify(q.options), q.correctAnswer, q.explanation, q.difficulty ?? "MEDIUM"]
    );
  }

  // Set admin user
  await pool.query(
    `UPDATE "User" SET "isAdmin" = true WHERE email = $1`,
    ["marie.benbekhti@gmail.com"]
  );
  console.log("✅ Admin user set.");

  console.log(`✅ Seeded ${all.length} questions successfully!`);
  await pool.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
