"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, UserPlus } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "الاسم مطلوب"),
  email: z.string().email("بريد إلكتروني غير صحيح"),
  password: z.string().min(6, "كلمة المرور 6 أحرف على الأقل"),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "كلمات المرور غير متطابقة",
  path: ["confirmPassword"],
});
type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });
      const result = await res.json();
      if (!res.ok) {
        setError(result.error ?? "حدث خطأ");
        setLoading(false);
        return;
      }

      // Auto-login after register
      const signInRes = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (signInRes?.ok) {
        router.push("/packages");
      } else {
        router.push("/login");
      }
    } catch {
      setError("حدث خطأ، يرجى المحاولة مرة أخرى");
      setLoading(false);
    }
  }

  return (
    <div dir="rtl" className="min-h-screen bg-navy-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-xl shadow-amber-500/30 mx-auto mb-4">
            <BookOpen size={26} className="text-white" />
          </div>
          <h1 className="text-3xl font-black text-white">إنشاء حساب جديد</h1>
          <p className="text-slate-400 mt-2">انضم إلى مئات الطلاب الناجحين</p>
        </div>

        <div className="bg-navy-800/60 border border-navy-600/50 rounded-2xl p-8 backdrop-blur-sm">
          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              id="name"
              type="text"
              label="الاسم"
              placeholder="اسمك الكامل"
              error={errors.name?.message}
              {...register("name")}
            />
            <Input
              id="email"
              type="email"
              label="البريد الإلكتروني"
              placeholder="your@email.com"
              error={errors.email?.message}
              {...register("email")}
            />
            <Input
              id="password"
              type="password"
              label="كلمة المرور"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register("password")}
            />
            <Input
              id="confirmPassword"
              type="password"
              label="تأكيد كلمة المرور"
              placeholder="••••••••"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />

            <Button type="submit" className="w-full" size="lg" loading={loading}>
              <UserPlus size={18} />
              إنشاء الحساب
            </Button>
          </form>

          <p className="text-center text-slate-400 text-sm mt-6">
            لديك حساب بالفعل؟{" "}
            <Link href="/login" className="text-amber-400 hover:text-amber-300 font-medium transition-colors">
              سجّل الدخول
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
