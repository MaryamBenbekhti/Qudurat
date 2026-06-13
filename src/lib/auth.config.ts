import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;

      const PROTECTED = ["/dashboard", "/practice", "/exam"];
      const AUTH_ROUTES = ["/login", "/register"];

      const isProtected = PROTECTED.some((p) => pathname.startsWith(p));
      const isAuthRoute = AUTH_ROUTES.some((p) => pathname.startsWith(p));

      if (isProtected && !isLoggedIn) {
        const callbackUrl = encodeURIComponent(pathname);
        return Response.redirect(new URL(`/login?callbackUrl=${callbackUrl}`, nextUrl));
      }

      if (isAuthRoute && isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      return true;
    },
  },
};
