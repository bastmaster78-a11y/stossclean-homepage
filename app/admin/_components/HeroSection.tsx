"use client";

import { useFieldArray, type UseFormReturn } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import type { SiteContent } from "@/lib/content-schema";
import { Card, FormField, inputClass, textareaClass } from "@/app/admin/_components/FormField";
import { ImageUploadField } from "@/app/admin/_components/ImageUploadField";

export function HeroSection({ form }: { form: UseFormReturn<SiteContent> }) {
  const {
    register,
    control,
    formState: { errors },
  } = form;
  const e = errors.hero;

  const { fields, append, remove } = useFieldArray({ control, name: "hero.stats" });

  return (
    <Card title="메인 화면(Hero)" description="첫 화면에 보이는 큰 문구, 이미지, 통계 숫자입니다.">
      <FormField label="상단 배지 문구" error={e?.eyebrow?.message}>
        <input {...register("hero.eyebrow")} className={inputClass} />
      </FormField>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="헤드라인 첫째 줄" error={e?.headlineLine1?.message}>
          <input {...register("hero.headlineLine1")} className={inputClass} />
        </FormField>
        <FormField label="헤드라인 둘째 줄" error={e?.headlineLine2?.message}>
          <input {...register("hero.headlineLine2")} className={inputClass} />
        </FormField>
      </div>
      <FormField
        label="둘째 줄 중 강조할 단어 (색상 강조, 비워두면 강조 없음)"
        error={e?.headlineHighlight?.message}
      >
        <input {...register("hero.headlineHighlight")} className={inputClass} placeholder="예: 신뢰" />
      </FormField>
      <FormField label="소개 문단" error={e?.paragraph?.message}>
        <textarea rows={3} {...register("hero.paragraph")} className={textareaClass} />
      </FormField>

      <ImageUploadField control={control} name="hero.image" label="대표 이미지" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="보험 배지 제목" error={e?.insuranceBadgeTitle?.message}>
          <input {...register("hero.insuranceBadgeTitle")} className={inputClass} />
        </FormField>
        <FormField label="보험 배지 설명" error={e?.insuranceBadgeSubtitle?.message}>
          <input {...register("hero.insuranceBadgeSubtitle")} className={inputClass} />
        </FormField>
      </div>
      <FormField label="평점 배지 문구" error={e?.ratingBadgeText?.message}>
        <input {...register("hero.ratingBadgeText")} className={inputClass} />
      </FormField>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700">통계 항목</span>
          <button
            type="button"
            onClick={() => append({ label: "", value: "" })}
            className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:underline"
          >
            <Plus className="h-3.5 w-3.5" /> 항목 추가
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-start gap-2">
              <input
                {...register(`hero.stats.${index}.value` as const)}
                placeholder="값 (예: 12,000+)"
                className={inputClass}
              />
              <input
                {...register(`hero.stats.${index}.label` as const)}
                placeholder="라벨 (예: 누적 시공 건수)"
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="shrink-0 rounded-lg p-2.5 text-slate-400 hover:bg-red-50 hover:text-red-500"
                aria-label="항목 삭제"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
