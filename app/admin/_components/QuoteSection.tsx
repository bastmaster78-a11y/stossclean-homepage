"use client";

import type { UseFormReturn } from "react-hook-form";
import type { SiteContent } from "@/lib/content-schema";
import { Card, FormField, inputClass, textareaClass } from "@/app/admin/_components/FormField";
import { TextListField } from "@/app/admin/_components/TextListField";

export function QuoteSection({ form }: { form: UseFormReturn<SiteContent> }) {
  const {
    register,
    control,
    formState: { errors },
  } = form;
  const e = errors.quote;

  return (
    <Card title="무료 견적 폼" description="견적 문의 섹션 왼쪽 안내 패널 문구입니다. (입력 필드 자체는 코드에서 관리)">
      <FormField label="패널 제목" error={e?.heading?.message}>
        <input {...register("quote.heading")} className={inputClass} />
      </FormField>
      <FormField label="패널 설명" error={e?.paragraph?.message}>
        <textarea rows={3} {...register("quote.paragraph")} className={textareaClass} />
      </FormField>
      <TextListField
        control={control}
        name="quote.benefits"
        label="혜택 목록 (한 줄에 하나씩)"
        rows={3}
        error={e?.benefits?.message}
      />
    </Card>
  );
}
