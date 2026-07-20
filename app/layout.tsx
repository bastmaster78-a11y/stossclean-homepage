import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { getContent } from "@/lib/content-store";

export const dynamic = "force-dynamic";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const { site, hero } = await getContent();

  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name}(${site.nameEn}) | 입주·이사·거주·사무실·준공청소 전문업체`,
      template: `%s | ${site.name}`,
    },
    description: site.description,
    keywords: [
      "스토스클린",
      "STOSS CLEAN",
      "입주청소",
      "이사청소",
      "거주청소",
      "사무실청소",
      "준공청소",
      "청소업체",
      "입주청소 비용",
      "청소 정찰제",
    ],
    authors: [{ name: site.name }],
    creator: site.name,
    openGraph: {
      type: "website",
      locale: "ko_KR",
      url: site.url,
      title: `${site.name}(${site.nameEn}) | 프리미엄 공간 청소 전문`,
      description: site.description,
      siteName: site.name,
      images: [
        {
          url: hero.image,
          width: 1200,
          height: 630,
          alt: `${site.name} 대표 이미지`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${site.name}(${site.nameEn}) | 프리미엄 공간 청소 전문`,
      description: site.description,
      images: [hero.image],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: site.url,
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563eb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white font-sans text-slate-900">
        {children}
      </body>
    </html>
  );
}
