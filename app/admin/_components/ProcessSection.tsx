"use client";

import { useFieldArray, type UseFormReturn } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import type { SiteContent } from "@/lib/content-schema";
import { Card, FormField, inputClass, textareaClass } from "@/app/admin/_components/FormField";
import { IconSelect } from "@/app/admin/_components/IconSelect";

export function ProcessSection({ form }: { form: UseFormReturn<SiteContent> }) {
  const {
    register,
    control,
    formState: { errors },
  } = form;
  const { fields, append, remove } = useFieldArray({ control, name: "process" });

  return (
    <Card title="작업 프로세스" description="상담부터 완료까지의 단계별 안내입니다.">
      <div className="flex flex-col gap-4">
        {fields.map((field, index) => {
          const err = errors.process?.[index];
          return (
            <div key={field.id} className="rounded-xl border border-slate-200 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">단계 #{index + 1}</span>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-red-500 hover:underline"
                >
                  <Trash2 className="h-3.5 w-3.5" /> 삭제
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <FormField label="단계 번호" error={err?.step?.message}>
                  <input
                    type="number"
                    {...register(`process.${index}.step`, { valueAsNumber: true })}
                    className={inputClass}
                  />
                </FormField>
                <FormField label="제목" error={err?.title?.message}>
                  <input {...register(`process.${index}.title`)} className={inputClass} />
                </FormField>
                <IconSelect control={control} name={`process.${index}.icon`} />
              </div>
              <FormField label="설명" error={err?.description?.message}>
                <textarea rows={2} {...register(`process.${index}.description`)} className={textareaClass} />
              </FormField>
            </div>
          );
        })}
      </div>
      <button
        type="button"
        onClick={() =>
          append({
            id: `step-${Date.now()}`,
            step: fields.length + 1,
            icon: "Sparkles",
            title: "새 단계",
            description: "",
          })
        }
        className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-dashed border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:border-brand-400 hover:text-brand-600"
      >
        <Plus className="h-4 w-4" /> 단계 추가
      </button>
    </Card>
  );
}
