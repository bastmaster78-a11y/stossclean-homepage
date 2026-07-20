import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, isValidSession } from "@/lib/auth";

export const runtime = "nodejs";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isLoginPage = pathname === "/admin/login";
  const isLoginApi = pathname === "/api/admin/login";

  if (isLoginPage || isLoginApi) {
    return NextResponse.next();
  }

  const session = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (!isValidSession(session)) {
    if (pathname.startsWith("/api/admin")) {
      return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
    }
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
