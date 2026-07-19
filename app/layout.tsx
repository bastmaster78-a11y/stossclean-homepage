import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/constants";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/common/FloatingActions";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name}(${SITE.nameEn}) | 입주·이사·거주·사무실·준공청소 전문업체`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
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
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE.url,
    title: `${SITE.name}(${SITE.nameEn}) | 프리미엄 공간 청소 전문`,
    description: SITE.description,
    siteName: SITE.name,
    images: [
      {
        url: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: `${SITE.name} 대표 이미지`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name}(${SITE.nameEn}) | 프리미엄 공간 청소 전문`,
    description: SITE.description,
    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE.url,
  },
};

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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
