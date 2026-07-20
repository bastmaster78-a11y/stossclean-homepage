import { list, put } from "@vercel/blob";
import { DEFAULT_CONTENT } from "@/lib/default-content";
import { siteContentSchema, type SiteContent } from "@/lib/content-schema";

const CONTENT_PATHNAME = "content/site-content.json";

let cachedUrl: string | null = null;

async function resolveContentUrl(): Promise<string | null> {
  if (cachedUrl) return cachedUrl;
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;

  try {
    const { blobs } = await list({ prefix: CONTENT_PATHNAME, limit: 1 });
    const match = blobs.find((blob) => blob.pathname === CONTENT_PATHNAME);
    if (match) cachedUrl = match.url;
    return cachedUrl;
  } catch {
    return null;
  }
}

// 저장된 콘텐츠가 없거나(최초 상태) Blob 연결 전이면 기본값을 그대로 사용합니다.
export async function getContent(): Promise<SiteContent> {
  const url = await resolveContentUrl();
  if (!url) return DEFAULT_CONTENT;

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return DEFAULT_CONTENT;
    const data = await res.json();
    const parsed = siteContentSchema.safeParse(data);
    return parsed.success ? parsed.data : DEFAULT_CONTENT;
  } catch {
    return DEFAULT_CONTENT;
  }
}

export async function saveContent(content: SiteContent): Promise<void> {
  const blob = await put(CONTENT_PATHNAME, JSON.stringify(content, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
  cachedUrl = blob.url;
}
