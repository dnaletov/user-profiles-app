import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const isAuth = !!token;

  const isLoginPage = req.nextUrl.pathname === "/login";
  const isRegisterPage = req.nextUrl.pathname === "/register";

  if (!isAuth) {
    if (isLoginPage || isRegisterPage) return NextResponse.next();

    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isLoginPage || isRegisterPage) {
    return NextResponse.redirect(new URL("/profiles", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profiles/:path*", "/"],
};
