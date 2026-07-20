"use client";

import { useFieldArray, type UseFormReturn } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import type { SiteContent } from "@/lib/content-schema";
import { Card, FormField, inputClass, textareaClass } from "@/app/admin/_components/FormField";

export function TestimonialsSection({ form }: { form: UseFormReturn<SiteContent> }) {
  const {
    register,
    control,
    formState: { errors },
  } = form;
  const { fields, append, remove } = useFieldArray({ control, name: "testimonials" });

  return (
    <Card title="고객 후기" description="실제 이용 고객님들의 후기 카드입니다.">
      <div className="flex flex-col gap-4">
        {fields.map((field, index) => {
          const err = errors.testimonials?.[index];
          return (
            <div key={field.id} className="rounded-xl border border-slate-200 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">후기 #{index + 1}</span>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-red-500 hover:underline"
                >
                  <Trash2 className="h-3.5 w-3.5" /> 삭제
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label="고객명" error={err?.name?.message}>
                  <input {...register(`testimonials.${index}.name`)} className={inputClass} />
                </FormField>
                <FormField label="이용 서비스" error={err?.service?.message}>
                  <input {...register(`testimonials.${index}.service`)} className={inputClass} />
                </FormField>
                <FormField label="지역/평수" error={err?.area?.message}>
                  <input {...register(`testimonials.${index}.area`)} className={inputClass} />
                </FormField>
                <FormField label="평점 (1~5)" error={err?.rating?.message}>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    {...register(`testimonials.${index}.rating`, { valueAsNumber: true })}
                    className={inputClass}
                  />
                </FormField>
              </div>
              <FormField label="후기 내용" error={err?.content?.message}>
                <textarea rows={3} {...register(`testimonials.${index}.content`)} className={textareaClass} />
              </FormField>
            </div>
          );
        })}
      </div>
      <button
        type="button"
        onClick={() =>
          append({
            id: `t-${Date.now()}`,
            name: "고객님",
            service: "입주청소",
            area: "",
            rating: 5,
            content: "",
          })
        }
        className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-dashed border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:border-brand-400 hover:text-brand-600"
      >
        <Plus className="h-4 w-4" /> 후기 추가
      </button>
    </Card>
  );
}
