import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

const MAX_BYTES = 8 * 1024 * 1024;

export async function POST(request: NextRequest) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "파일이 없습니다." }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "이미지 파일만 업로드할 수 있습니다." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "이미지 용량은 8MB 이하로 업로드해주세요." }, { status: 400 });
  }

  const ext = file.name.includes(".") ? file.name.split(".").pop() : "jpg";
  const pathname = `images/${crypto.randomUUID()}.${ext}`;

  try {
    const blob = await put(pathname, file, {
      access: "public",
      contentType: file.type,
    });
    return NextResponse.json({ url: blob.url });
  } catch {
    return NextResponse.json(
      { error: "업로드에 실패했습니다. Blob 스토리지 연결 상태를 확인해주세요." },
      { status: 500 },
    );
  }
}
