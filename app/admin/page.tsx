import type { Metadata } from "next";
import { getContent } from "@/lib/content-store";
import { AdminEditor } from "@/app/admin/_components/AdminEditor";

export const metadata: Metadata = {
  title: "관리자",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const content = await getContent();
  return <AdminEditor initialContent={content} />;
}
