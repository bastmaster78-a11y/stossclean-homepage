import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getContent, saveContent } from "@/lib/content-store";
import { siteContentSchema } from "@/lib/content-schema";

export async function GET() {
  const content = await getContent();
  return NextResponse.json(content);
}

export async function PUT(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const parsed = siteContentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "입력값이 올바르지 않습니다.", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  try {
    await saveContent(parsed.data);
  } catch {
    return NextResponse.json(
      { error: "저장에 실패했습니다. Blob 스토리지 연결 상태를 확인해주세요." },
      { status: 500 },
    );
  }

  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
