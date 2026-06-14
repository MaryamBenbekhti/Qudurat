"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, Menu, X, LogOut, Zap, Flame, CheckSquare, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "الرئيسية" },
    { href: "/packages", label: "الباقات" },
    ...(session ? [{ href: "/dashboard", label: "لوحة التحكم" }] : []),
  ];

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#070912]/90 backdrop-blur-2xl border-b border-white/[0.07] shadow-xl shadow-black/30"
          : "bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-[64px]">

          {/* Logo */}
          <div className="flex items-center gap-7">
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/35 group-hover:shadow-amber-500/50 transition-shadow duration-300">
                <BookOpen size={16} className="text-white" />
              </div>
              <div className="leading-none">
                <span className="block text-[15px] font-black text-white tracking-tight">القدرات الكمي</span>
                <span className="block text-[10px] text-amber-400/65 font-semibold mt-0.5">فكر أقل، حل أسرع</span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-0.5">
              {navLinks.map(({ href, label }) => (
                <Link key={href} href={href}
                  className="px-3.5 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/[0.05] transition-all duration-150">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-2.5">
            {session ? (
              <>
                <div className="flex items-center gap-1.5">
                  <GamChip icon={<CheckSquare size={12} className="text-emerald-400" />} value="0/0" color="emerald" />
                  <GamChip icon={<Flame size={12} className="text-orange-400" />} value="0" color="orange" />
                  <GamChip icon={<Zap size={12} className="text-amber-400" />} value="XP 0" color="amber" />
                </div>
                {session.user.isPremium && (
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400">✨ مميز</span>
                )}
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm"><LayoutDashboard size={14} /><span className="text-xs">لوحة التحكم</span></Button>
                </Link>
                <button onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors px-2 py-1.5 rounded-lg hover:bg-white/[0.05]">
                  <LogOut size={13} />خروج
                </button>
              </>
            ) : (
              <>
                <Link href="/login"><Button variant="ghost" size="sm" className="text-slate-400">تسجيل الدخول</Button></Link>
                <Link href="/register"><Button size="sm">إنشاء حساب</Button></Link>
              </>
            )}
          </div>

          <button className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.07] transition-all" onClick={() => setOpen(!open)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/[0.07] bg-[#070912]/98 backdrop-blur-2xl px-4 py-3 space-y-0.5">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href}
              className="flex items-center px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.05] transition-all text-sm font-medium"
              onClick={() => setOpen(false)}>{label}</Link>
          ))}
          <div className="pt-3 border-t border-white/[0.06] mt-2">
            {session ? (
              <button onClick={() => { signOut({ callbackUrl: "/" }); setOpen(false); }}
                className="flex items-center gap-2 px-3 py-2.5 text-sm text-slate-500 hover:text-white transition-colors w-full">
                <LogOut size={15} /> تسجيل خروج
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <Link href="/login" onClick={() => setOpen(false)}><Button variant="secondary" className="w-full" size="sm">تسجيل الدخول</Button></Link>
                <Link href="/register" onClick={() => setOpen(false)}><Button className="w-full" size="sm">إنشاء حساب</Button></Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

function GamChip({ icon, value, color }: { icon: React.ReactNode; value: string; color: string }) {
  const colors: Record<string, string> = {
    emerald: "bg-emerald-500/[0.08] border-emerald-500/[0.18] text-emerald-300",
    orange:  "bg-orange-500/[0.08] border-orange-500/[0.18] text-orange-300",
    amber:   "bg-amber-500/[0.08] border-amber-500/[0.18] text-amber-300",
  };
  return (
    <div className={cn("flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-bold", colors[color])}>
      {icon} {value}
    </div>
  );
}
