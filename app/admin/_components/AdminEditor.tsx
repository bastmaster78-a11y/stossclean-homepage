"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, ExternalLink, LogOut, Save } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteContentSchema, type SiteContent } from "@/lib/content-schema";
import { SiteInfoSection } from "@/app/admin/_components/SiteInfoSection";
import { HeroSection } from "@/app/admin/_components/HeroSection";
import { SectionHeadingsSection } from "@/app/admin/_components/SectionHeadingsSection";
import { ServicesSection } from "@/app/admin/_components/ServicesSection";
import { WhyUsSection } from "@/app/admin/_components/WhyUsSection";
import { ProcessSection } from "@/app/admin/_components/ProcessSection";
import { ServiceScopeSection } from "@/app/admin/_components/ServiceScopeSection";
import { ServiceAreaSection } from "@/app/admin/_components/ServiceAreaSection";
import { TestimonialsSection } from "@/app/admin/_components/TestimonialsSection";
import { FaqSection } from "@/app/admin/_components/FaqSection";
import { QuoteSection } from "@/app/admin/_components/QuoteSection";

const TABS = [
  { key: "site", label: "사이트 정보" },
  { key: "hero", label: "메인 화면" },
  { key: "headings", label: "섹션 제목" },
  { key: "services", label: "서비스" },
  { key: "whyUs", label: "선택 이유" },
  { key: "process", label: "작업 절차" },
  { key: "scope", label: "서비스 범위" },
  { key: "area", label: "서비스 지역" },
  { key: "testimonials", label: "고객 후기" },
  { key: "faq", label: "FAQ" },
  { key: "quote", label: "견적 폼 문구" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export function AdminEditor({ initialContent }: { initialContent: SiteContent }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>("site");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<SiteContent>({
    resolver: zodResolver(siteContentSchema),
    defaultValues: initialContent,
  });

  const onSubmit = async (data: SiteContent) => {
    setStatus("saving");
    setErrorMessage(null);
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) {
        setStatus("error");
        setErrorMessage(result.error ?? "저장에 실패했습니다.");
        return;
      }
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2500);
    } catch {
      setStatus("error");
      setErrorMessage("저장 중 오류가 발생했습니다.");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex min-h-screen flex-col bg-slate-50">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <div>
            <h1 className="text-lg font-bold text-slate-900">스토스클린 콘텐츠 관리자</h1>
            <p className="text-xs text-slate-400">저장하면 사이트에 즉시 반영됩니다.</p>
          </div>
          <div className="flex items-center gap-2">
            {status === "saved" && (
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600">
                <CheckCircle2 className="h-4 w-4" /> 저장되었습니다
              </span>
            )}
            {status === "error" && (
              <span className="text-sm font-semibold text-red-500">{errorMessage}</span>
            )}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3.5 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              <ExternalLink className="h-4 w-4" /> 사이트 보기
            </a>
            <button
              type="submit"
              disabled={status === "saving"}
              className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
            >
              <Save className="h-4 w-4" /> {status === "saving" ? "저장 중..." : "저장"}
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              aria-label="로그아웃"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-5 pb-2">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                activeTab === tab.key
                  ? "bg-brand-600 text-white"
                  : "text-slate-500 hover:bg-slate-100",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-8">
        <div className={activeTab === "site" ? "block" : "hidden"}>
          <SiteInfoSection form={form} />
        </div>
        <div className={activeTab === "hero" ? "block" : "hidden"}>
          <HeroSection form={form} />
        </div>
        <div className={activeTab === "headings" ? "block" : "hidden"}>
          <SectionHeadingsSection form={form} />
        </div>
        <div className={activeTab === "services" ? "block" : "hidden"}>
          <ServicesSection form={form} />
        </div>
        <div className={activeTab === "whyUs" ? "block" : "hidden"}>
          <WhyUsSection form={form} />
        </div>
        <div className={activeTab === "process" ? "block" : "hidden"}>
          <ProcessSection form={form} />
        </div>
        <div className={activeTab === "scope" ? "block" : "hidden"}>
          <ServiceScopeSection form={form} />
        </div>
        <div className={activeTab === "area" ? "block" : "hidden"}>
          <ServiceAreaSection form={form} />
        </div>
        <div className={activeTab === "testimonials" ? "block" : "hidden"}>
          <TestimonialsSection form={form} />
        </div>
        <div className={activeTab === "faq" ? "block" : "hidden"}>
          <FaqSection form={form} />
        </div>
        <div className={activeTab === "quote" ? "block" : "hidden"}>
          <QuoteSection form={form} />
        </div>
      </main>
    </form>
  );
}
