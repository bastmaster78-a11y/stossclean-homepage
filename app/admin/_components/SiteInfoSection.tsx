"use client";

import type { UseFormReturn } from "react-hook-form";
import type { SiteContent } from "@/lib/content-schema";
import { Card, FormField, inputClass, textareaClass } from "@/app/admin/_components/FormField";

export function SiteInfoSection({ form }: { form: UseFormReturn<SiteContent> }) {
  const {
    register,
    formState: { errors },
  } = form;
  const e = errors.site;

  return (
    <Card title="사이트 기본 정보" description="전화번호, 이메일, 주소 등 사이트 전체에서 사용되는 정보입니다.">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="업체명(국문)" error={e?.name?.message}>
          <input {...register("site.name")} className={inputClass} />
        </FormField>
        <FormField label="업체명(영문)" error={e?.nameEn?.message}>
          <input {...register("site.nameEn")} className={inputClass} />
        </FormField>
        <FormField label="대표 전화번호(표시용)" error={e?.phone?.message}>
          <input {...register("site.phone")} placeholder="1588-0000" className={inputClass} />
        </FormField>
        <FormField label="대표 전화번호(숫자만, 전화걸기용)" error={e?.phoneRaw?.message}>
          <input {...register("site.phoneRaw")} placeholder="15880000" className={inputClass} />
        </FormField>
        <FormField label="이메일" error={e?.email?.message}>
          <input {...register("site.email")} className={inputClass} />
        </FormField>
        <FormField label="카카오채널 링크" error={e?.kakaoUrl?.message}>
          <input {...register("site.kakaoUrl")} className={inputClass} />
        </FormField>
        <FormField label="대표자명" error={e?.ceo?.message}>
          <input {...register("site.ceo")} className={inputClass} />
        </FormField>
        <FormField label="사업자등록번호" error={e?.businessNumber?.message}>
          <input {...register("site.businessNumber")} className={inputClass} />
        </FormField>
        <FormField label="통신판매업신고번호" error={e?.mailOrderNumber?.message}>
          <input {...register("site.mailOrderNumber")} className={inputClass} />
        </FormField>
        <FormField label="사이트 주소(URL)" error={e?.url?.message}>
          <input {...register("site.url")} className={inputClass} />
        </FormField>
      </div>
      <FormField label="주소" error={e?.address?.message}>
        <input {...register("site.address")} className={inputClass} />
      </FormField>
      <FormField label="슬로건" error={e?.slogan?.message}>
        <input {...register("site.slogan")} className={inputClass} />
      </FormField>
      <FormField label="사이트 소개 문구 (검색엔진 노출용)" error={e?.description?.message}>
        <textarea rows={3} {...register("site.description")} className={textareaClass} />
      </FormField>
    </Card>
  );
}
