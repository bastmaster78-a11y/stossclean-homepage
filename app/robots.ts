import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const content = await getContent();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${content.site.url}/sitemap.xml`,
  };
}
