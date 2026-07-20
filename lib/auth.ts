import crypto from "crypto";

export const SESSION_COOKIE_NAME = "admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7일

function timingSafeEqualStrings(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export function verifyPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return timingSafeEqualStrings(password, expected);
}

function expectedSessionValue(): string | null {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return null;
  return crypto.createHmac("sha256", secret).update("stoss-clean-admin-session").digest("hex");
}

export function createSessionCookie() {
  const value = expectedSessionValue();
  if (!value) {
    throw new Error("ADMIN_SESSION_SECRET 환경변수가 설정되지 않았습니다.");
  }
  return {
    name: SESSION_COOKIE_NAME,
    value,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE,
  };
}

export function isValidSession(cookieValue: string | undefined): boolean {
  if (!cookieValue) return false;
  const expected = expectedSessionValue();
  if (!expected) return false;
  return timingSafeEqualStrings(cookieValue, expected);
}
