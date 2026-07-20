"use client";

import { useFieldArray, type UseFormReturn } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import type { SiteContent } from "@/lib/content-schema";
import { Card, FormField, inputClass, textareaClass } from "@/app/admin/_components/FormField";
import { ImageUploadField } from "@/app/admin/_components/ImageUploadField";
import { IconSelect } from "@/app/admin/_components/IconSelect";
import { TextListField } from "@/app/admin/_components/TextListField";

export function ServicesSection({ form }: { form: UseFormReturn<SiteContent> }) {
  const {
    register,
    control,
    formState: { errors },
  } = form;
  const { fields, append, remove } = useFieldArray({ control, name: "services" });

  return (
    <Card title="서비스 목록" description="카드 형태로 노출되는 청소 서비스 목록입니다.">
      <div className="flex flex-col gap-5">
        {fields.map((field, index) => {
          const err = errors.services?.[index];
          return (
            <div key={field.id} className="rounded-xl border border-slate-200 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">서비스 #{index + 1}</span>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-red-500 hover:underline"
                >
                  <Trash2 className="h-3.5 w-3.5" /> 삭제
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label="서비스명" error={err?.title?.message}>
                  <input {...register(`services.${index}.title`)} className={inputClass} />
                </FormField>
                <IconSelect control={control} name={`services.${index}.icon`} />
              </div>

              <FormField label="설명" error={err?.description?.message}>
                <textarea rows={2} {...register(`services.${index}.description`)} className={textareaClass} />
              </FormField>

              <ImageUploadField control={control} name={`services.${index}.image`} label="카드 이미지" />

              <TextListField
                control={control}
                name={`services.${index}.features`}
                label="특징 (한 줄에 하나씩)"
                rows={3}
                error={err?.features?.message}
              />

              <label className="mt-1 flex items-center gap-2 text-sm text-slate-600">
                <input type="checkbox" {...register(`services.${index}.featured`)} className="h-4 w-4 rounded border-slate-300" />
                넓은 카드로 강조 표시
              </label>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() =>
          append({
            id: `service-${Date.now()}`,
            title: "새 서비스",
            description: "",
            icon: "Sparkles",
            image: "",
            features: ["특징을 입력해주세요"],
          })
        }
        className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-dashed border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:border-brand-400 hover:text-brand-600"
      >
        <Plus className="h-4 w-4" /> 서비스 추가
      </button>
    </Card>
  );
}
