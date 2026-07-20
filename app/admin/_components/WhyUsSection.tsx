"use client";

import { useFieldArray, type UseFormReturn } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import type { SiteContent } from "@/lib/content-schema";
import { Card, FormField, inputClass, textareaClass } from "@/app/admin/_components/FormField";
import { IconSelect } from "@/app/admin/_components/IconSelect";

export function WhyUsSection({ form }: { form: UseFormReturn<SiteContent> }) {
  const {
    register,
    control,
    formState: { errors },
  } = form;
  const { fields, append, remove } = useFieldArray({ control, name: "whyUs" });

  return (
    <Card title="왜 스토스클린인가" description="선택 이유를 보여주는 카드 목록입니다.">
      <div className="flex flex-col gap-4">
        {fields.map((field, index) => {
          const err = errors.whyUs?.[index];
          return (
            <div key={field.id} className="rounded-xl border border-slate-200 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">항목 #{index + 1}</span>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-red-500 hover:underline"
                >
                  <Trash2 className="h-3.5 w-3.5" /> 삭제
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label="제목" error={err?.title?.message}>
                  <input {...register(`whyUs.${index}.title`)} className={inputClass} />
                </FormField>
                <IconSelect control={control} name={`whyUs.${index}.icon`} />
              </div>
              <FormField label="설명" error={err?.description?.message}>
                <textarea rows={2} {...register(`whyUs.${index}.description`)} className={textareaClass} />
              </FormField>
            </div>
          );
        })}
      </div>
      <button
        type="button"
        onClick={() => append({ id: `why-${Date.now()}`, icon: "Sparkles", title: "새 항목", description: "" })}
        className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-dashed border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:border-brand-400 hover:text-brand-600"
      >
        <Plus className="h-4 w-4" /> 항목 추가
      </button>
    </Card>
  );
}
