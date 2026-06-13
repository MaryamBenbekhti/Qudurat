"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, BookOpen, LogOut, User, LayoutDashboard } from "lucide-react";

export function Navbar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-navy-700/50 bg-navy-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/25 group-hover:shadow-amber-500/40 transition-shadow">
              <BookOpen size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold text-white" dir="rtl">
              قُدرات
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">
              الرئيسية
            </Link>
            <Link href="/packages" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">
              الباقات
            </Link>
            {session && (
              <Link href="/dashboard" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">
                لوحة التحكم
              </Link>
            )}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <div className="flex items-center gap-3">
                {session.user.isPremium && (
                  <span className="text-xs bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded-full font-medium">
                    Premium ✨
                  </span>
                )}
                <span className="text-sm text-slate-400">{session.user.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="gap-1.5"
                >
                  <LogOut size={15} />
                  خروج
                </Button>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">تسجيل الدخول</Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">إنشاء حساب</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-slate-300 hover:text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-navy-700 bg-navy-900/95 backdrop-blur-md px-4 py-4 space-y-3">
          <Link href="/" className="block text-slate-300 hover:text-white py-2" onClick={() => setOpen(false)}>الرئيسية</Link>
          <Link href="/packages" className="block text-slate-300 hover:text-white py-2" onClick={() => setOpen(false)}>الباقات</Link>
          {session && (
            <Link href="/dashboard" className="flex items-center gap-2 text-slate-300 hover:text-white py-2" onClick={() => setOpen(false)}>
              <LayoutDashboard size={16} /> لوحة التحكم
            </Link>
          )}
          <div className="pt-2 border-t border-navy-700">
            {session ? (
              <button
                onClick={() => { signOut({ callbackUrl: "/" }); setOpen(false); }}
                className="flex items-center gap-2 text-slate-400 hover:text-white py-2"
              >
                <LogOut size={16} /> تسجيل خروج
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <Link href="/login" onClick={() => setOpen(false)}><Button variant="secondary" className="w-full">تسجيل الدخول</Button></Link>
                <Link href="/register" onClick={() => setOpen(false)}><Button className="w-full">إنشاء حساب</Button></Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
