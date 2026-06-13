"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, Menu, X, LogOut, LayoutDashboard, Zap, Flame, CheckSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/[0.07] glass-strong">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-[60px]">

          {/* Logo — right side in RTL */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:shadow-amber-500/40 transition-shadow">
                <BookOpen size={15} className="text-white" />
              </div>
              <div className="leading-none">
                <span className="text-base font-black text-white tracking-tight" dir="rtl">القدرات الكمي</span>
                <span className="block text-[10px] text-amber-400/70 font-medium">فكر أقل، حل أسرع</span>
              </div>
            </Link>

            {/* Desktop nav links */}
            <nav className="hidden md:flex items-center gap-1">
              {[
                { href: "/", label: "الرئيسية" },
                { href: "/packages", label: "الباقات" },
                ...(session ? [{ href: "/dashboard", label: "لوحة التحكم" }] : []),
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="px-3 py-1.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/[0.05] transition-all"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right side — gamification + auth */}
          <div className="hidden md:flex items-center gap-2">
            {session ? (
              <>
                {/* Gamification indicators — matching reference design */}
                <div className="flex items-center gap-1.5 mr-1">
                  <GamificationChip
                    icon={<CheckSquare size={13} className="text-emerald-400" />}
                    value="0/0"
                    color="emerald"
                  />
                  <GamificationChip
                    icon={<Flame size={13} className="text-orange-400" />}
                    value="0"
                    color="orange"
                  />
                  <GamificationChip
                    icon={<Zap size={13} className="text-amber-400" />}
                    value="XP 0"
                    color="amber"
                  />
                </div>

                {session.user.isPremium && (
                  <span className="text-[11px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/25 px-2.5 py-1 rounded-full">
                    ✨ مميز
                  </span>
                )}
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors px-2 py-1.5 rounded-lg hover:bg-white/5"
                >
                  <LogOut size={13} />
                  خروج
                </button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="text-slate-400">تسجيل الدخول</Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">إنشاء حساب</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
            onClick={() => setOpen(!open)}
            aria-label="القائمة"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/[0.07] bg-[#080e1a]/95 backdrop-blur-xl px-4 py-4 space-y-1">
          {[
            { href: "/", label: "الرئيسية" },
            { href: "/packages", label: "الباقات" },
            ...(session ? [{ href: "/dashboard", label: "لوحة التحكم" }] : []),
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-all text-sm"
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <div className="pt-2 border-t border-white/[0.07] mt-2">
            {session ? (
              <button
                onClick={() => { signOut({ callbackUrl: "/" }); setOpen(false); }}
                className="flex items-center gap-2 px-3 py-2.5 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <LogOut size={15} /> تسجيل خروج
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <Link href="/login" onClick={() => setOpen(false)}>
                  <Button variant="secondary" className="w-full" size="sm">تسجيل الدخول</Button>
                </Link>
                <Link href="/register" onClick={() => setOpen(false)}>
                  <Button className="w-full" size="sm">إنشاء حساب</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

function GamificationChip({
  icon,
  value,
  color,
}: {
  icon: React.ReactNode;
  value: string;
  color: "emerald" | "orange" | "amber";
}) {
  const colors: Record<string, string> = {
    emerald: "bg-emerald-500/10 border-emerald-500/20 text-emerald-300",
    orange:  "bg-orange-500/10 border-orange-500/20 text-orange-300",
    amber:   "bg-amber-500/10 border-amber-500/20 text-amber-300",
  };
  return (
    <div className={cn("flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-bold", colors[color])}>
      {icon}
      {value}
    </div>
  );
}
