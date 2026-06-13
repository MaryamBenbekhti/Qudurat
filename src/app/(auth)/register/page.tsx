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
import { BookOpen } from "lucide-react";

const schema = z
  .object({
    name: z.string().min(2, "الاسم مطلوب"),
    email: z.string().email("بريد إلكتروني غير صحيح"),
    password: z.string().min(6, "كلمة المرور 6 أحرف على الأقل"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "كلمات المرور غير متطابقة",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.name, email: data.email, password: data.password }),
      });
      const result = await res.json();
      if (!res.ok) {
        setError(result.error ?? "حدث خطأ");
        setLoading(false);
        return;
      }
      const signInRes = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      router.push(signInRes?.ok ? "/packages" : "/login");
    } catch {
      setError("حدث خطأ، يرجى المحاولة مرة أخرى");
      setLoading(false);
    }
  }

  return (
    <div dir="rtl" className="min-h-screen bg-[#080e1a] flex items-center justify-center px-4 py-16 relative">
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-500/[0.05] rounded-full blur-[80px]" />
        <div className="absolute inset-0 bg-dot-grid" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8 space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-xl shadow-amber-500/30 mx-auto">
            <BookOpen size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white">إنشاء حساب جديد</h1>
            <p className="text-slate-500 text-sm mt-1">انضم إلى مئات الطلاب الناجحين</p>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#142035] to-[#0f1b30] p-7">
          {error && (
            <div className="mb-5 rounded-xl border border-red-500/25 bg-red-500/[0.08] px-4 py-3 text-sm text-red-400 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              id="name"
              type="text"
              label="الاسم الكامل"
              placeholder="اسمك"
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
              hint="6 أحرف على الأقل"
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

            <Button type="submit" className="w-full mt-2" size="lg" loading={loading}>
              إنشاء الحساب
            </Button>
          </form>

          <p className="text-center text-slate-500 text-sm mt-6">
            لديك حساب بالفعل؟{" "}
            <Link href="/login" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors">
              سجّل الدخول
            </Link>
          </p>
        </div>

        <div className="text-center mt-5">
          <Link href="/" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
            → العودة للصفحة الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}
