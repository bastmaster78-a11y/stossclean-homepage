"use client";

import { useFieldArray, type UseFormReturn } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import type { SiteContent } from "@/lib/content-schema";
import { Card, FormField, inputClass, textareaClass } from "@/app/admin/_components/FormField";

export function FaqSection({ form }: { form: UseFormReturn<SiteContent> }) {
  const {
    register,
    control,
    formState: { errors },
  } = form;
  const { fields, append, remove } = useFieldArray({ control, name: "faqs" });

  return (
    <Card title="자주 묻는 질문" description="질문/답변 목록입니다.">
      <div className="flex flex-col gap-4">
        {fields.map((field, index) => {
          const err = errors.faqs?.[index];
          return (
            <div key={field.id} className="rounded-xl border border-slate-200 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">질문 #{index + 1}</span>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-red-500 hover:underline"
                >
                  <Trash2 className="h-3.5 w-3.5" /> 삭제
                </button>
              </div>
              <FormField label="질문" error={err?.question?.message}>
                <input {...register(`faqs.${index}.question`)} className={inputClass} />
              </FormField>
              <FormField label="답변" error={err?.answer?.message}>
                <textarea rows={3} {...register(`faqs.${index}.answer`)} className={textareaClass} />
              </FormField>
            </div>
          );
        })}
      </div>
      <button
        type="button"
        onClick={() => append({ id: `faq-${Date.now()}`, question: "새 질문", answer: "" })}
        className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-dashed border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:border-brand-400 hover:text-brand-600"
      >
        <Plus className="h-4 w-4" /> 질문 추가
      </button>
    </Card>
  );
}
