import { NextRequest, NextResponse } from "next/server";
import { createSessionCookie, verifyPassword } from "@/lib/auth";

export async function POST(request: NextRequest) {
  let password: unknown;
  try {
    const body = await request.json();
    password = body?.password;
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  if (typeof password !== "string" || !verifyPassword(password)) {
    return NextResponse.json({ error: "비밀번호가 올바르지 않습니다." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(createSessionCookie());
  return response;
}
