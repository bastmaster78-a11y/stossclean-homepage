"use client";

import type { UseFormReturn } from "react-hook-form";
import type { SiteContent } from "@/lib/content-schema";
import { Card, FormField, inputClass, textareaClass } from "@/app/admin/_components/FormField";

const GROUPS: { key: keyof SiteContent["sectionHeadings"]; label: string }[] = [
  { key: "services", label: "서비스 소개 섹션" },
  { key: "whyUs", label: "왜 스토스클린 섹션" },
  { key: "process", label: "작업 프로세스 섹션" },
  { key: "serviceScope", label: "서비스 범위 섹션" },
  { key: "testimonials", label: "고객 후기 섹션" },
  { key: "faq", label: "자주 묻는 질문 섹션" },
  { key: "quote", label: "무료 견적 섹션" },
];

export function SectionHeadingsSection({ form }: { form: UseFormReturn<SiteContent> }) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <Card title="섹션별 제목/설명" description="각 섹션 상단에 나오는 라벨·제목·설명 문구입니다.">
      {GROUPS.map((group) => {
        const groupErrors = errors.sectionHeadings?.[group.key];
        return (
          <div key={group.key} className="rounded-xl border border-slate-100 p-4">
            <p className="mb-3 text-xs font-semibold text-brand-600">{group.label}</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <FormField label="상단 라벨" error={groupErrors?.eyebrow?.message}>
                <input {...register(`sectionHeadings.${group.key}.eyebrow`)} className={inputClass} />
              </FormField>
              <FormField label="제목" error={groupErrors?.title?.message}>
                <input {...register(`sectionHeadings.${group.key}.title`)} className={inputClass} />
              </FormField>
            </div>
            <FormField label="설명" error={groupErrors?.description?.message}>
              <textarea
                rows={2}
                {...register(`sectionHeadings.${group.key}.description`)}
                className={textareaClass}
              />
            </FormField>
          </div>
        );
      })}
    </Card>
  );
}
