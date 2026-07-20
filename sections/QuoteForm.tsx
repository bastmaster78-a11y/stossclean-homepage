"use client";

import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Phone, Send } from "lucide-react";
import { quoteFormSchema, ROOM_COUNT_SERVICE_IDS, type QuoteFormSchema } from "@/lib/validations";
import type { QuoteContent, SectionHeadingContent, ServiceContent } from "@/lib/content-schema";
import { KOREA_REGIONS } from "@/lib/korea-regions";
import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/common/SectionHeading";
import Button from "@/components/ui/Button";

interface QuoteFormProps {
  services: ServiceContent[];
  quote: QuoteContent;
  heading: SectionHeadingContent;
  phone: string;
  phoneRaw: string;
}

const AREA_OPTIONS = Array.from({ length: 300 }, (_, i) => `${i + 1}평`);
const ROOM_COUNT_OPTIONS = Array.from({ length: 11 }, (_, i) => `${i}개`);

export default function QuoteForm({ services, quote, heading, phone, phoneRaw }: QuoteFormProps) {
  const [submitState, setSubmitState] = useState<"idle" | "success">("idle");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormSchema>({
    resolver: zodResolver(quoteFormSchema),
  });

  const serviceType = watch("serviceType");
  const showRoomCount = ROOM_COUNT_SERVICE_IDS.includes(serviceType);

  const onSubmit = async (data: QuoteFormSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 900));
    console.log("quote request", data);
    setSubmitState("success");
    reset();
    setProvince("");
    setDistrict("");
  };

  const districtOptions = KOREA_REGIONS.find((region) => region.name === province)?.districts ?? [];

  const handleProvinceChange = (value: string) => {
    setProvince(value);
    setDistrict("");
    setValue("address", "", { shouldValidate: false });
  };

  const handleDistrictChange = (value: string) => {
    setDistrict(value);
    setValue("address", `${province} ${value}`.trim(), { shouldValidate: true });
  };

  const serviceOptions = [
    ...services.map((service) => ({ value: service.id, label: service.title })),
    { value: "etc", label: "기타 문의" },
  ];

  return (
    <section id="quote" className="bg-slate-50 py-20 lg:py-28">
      <Container className="max-w-4xl">
        <SectionHeading
          eyebrow={heading.eyebrow}
          title={heading.title}
          description={heading.description}
        />

        <div className="mt-12 overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-900/5 ring-1 ring-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="flex flex-col justify-between gap-8 bg-brand-600 p-8 text-white lg:col-span-2 lg:p-10">
              <div>
                <h3 className="text-xl font-bold">{quote.heading}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/80">{quote.paragraph}</p>
              </div>
              <a
                href={`tel:${phoneRaw}`}
                className="flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-4 backdrop-blur-sm transition-colors hover:bg-white/15"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-brand-600">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs text-white/70">전화 상담</p>
                  <p className="text-lg font-bold">{phone}</p>
                </div>
              </a>
              <ul className="flex flex-col gap-2.5 text-sm text-white/80">
                {quote.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-white" /> {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 lg:col-span-3 lg:p-10">
              {submitState === "success" ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex h-full flex-col items-center justify-center gap-4 py-16 text-center"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                    <CheckCircle2 className="h-8 w-8" />
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">문의가 접수되었습니다</h3>
                  <p className="max-w-xs text-sm text-slate-500">
                    빠른 시일 내에 담당 매니저가 입력하신 연락처로 안내드리겠습니다.
                  </p>
                  <button
                    onClick={() => setSubmitState("idle")}
                    className="mt-2 text-sm font-semibold text-brand-600 hover:underline"
                  >
                    새 문의 작성하기
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field label="이름" error={errors.name?.message}>
                      <input
                        {...register("name")}
                        type="text"
                        placeholder="홍길동"
                        className={inputClass(!!errors.name)}
                      />
                    </Field>
                    <Field label="연락처" error={errors.phone?.message}>
                      <input
                        {...register("phone")}
                        type="tel"
                        placeholder="010-1234-5678"
                        className={inputClass(!!errors.phone)}
                      />
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field label="서비스 종류" error={errors.serviceType?.message}>
                      <select
                        {...register("serviceType", {
                          onChange: (e) => {
                            if (!ROOM_COUNT_SERVICE_IDS.includes(e.target.value)) {
                              setValue("roomCount", "");
                            }
                          },
                        })}
                        defaultValue=""
                        className={inputClass(!!errors.serviceType)}
                      >
                        <option value="" disabled>
                          선택해주세요
                        </option>
                        {serviceOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="평수" error={errors.area?.message}>
                      <select
                        {...register("area")}
                        defaultValue=""
                        className={inputClass(!!errors.area)}
                      >
                        <option value="" disabled>
                          선택해주세요
                        </option>
                        {AREA_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  {showRoomCount && (
                    <Field label="방 개수" error={errors.roomCount?.message}>
                      <select
                        {...register("roomCount")}
                        defaultValue=""
                        className={inputClass(!!errors.roomCount)}
                      >
                        <option value="" disabled>
                          선택해주세요
                        </option>
                        {ROOM_COUNT_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </Field>
                  )}

                  <Field label="주소" error={errors.address?.message}>
                    <div className="grid grid-cols-2 gap-3">
                      <select
                        value={province}
                        onChange={(e) => handleProvinceChange(e.target.value)}
                        className={inputClass(!!errors.address)}
                      >
                        <option value="" disabled>
                          시/도 선택
                        </option>
                        {KOREA_REGIONS.map((region) => (
                          <option key={region.name} value={region.name}>
                            {region.name}
                          </option>
                        ))}
                      </select>
                      <select
                        value={district}
                        onChange={(e) => handleDistrictChange(e.target.value)}
                        disabled={!province}
                        className={cn(inputClass(!!errors.address), "disabled:cursor-not-allowed disabled:opacity-60")}
                      >
                        <option value="" disabled>
                          시/군/구 선택
                        </option>
                        {districtOptions.map((name) => (
                          <option key={name} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <input type="hidden" {...register("address")} />
                  </Field>

                  <Field label="문의내용" error={errors.message?.message}>
                    <textarea
                      {...register("message")}
                      rows={4}
                      placeholder="희망 방문일, 요청사항 등을 자유롭게 남겨주세요."
                      className={cn(inputClass(!!errors.message), "resize-none")}
                    />
                  </Field>

                  <div>
                    <label className="flex items-start gap-2.5 text-sm text-slate-600">
                      <input
                        {...register("privacyAgree")}
                        type="checkbox"
                        className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                      />
                      <span>
                        개인정보 수집 및 이용에 동의합니다. (
                        <a href="/privacy" className="underline hover:text-brand-600">
                          개인정보처리방침 보기
                        </a>
                        )
                      </span>
                    </label>
                    {errors.privacyAgree && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {errors.privacyAgree.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    icon={
                      isSubmitting ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Send className="h-5 w-5" />
                      )
                    }
                    className="mt-1 w-full disabled:opacity-70"
                  >
                    {isSubmitting ? "전송 중..." : "무료 견적 신청하기"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400",
    "focus:border-brand-500 focus:ring-2 focus:ring-brand-100",
    hasError ? "border-red-300" : "border-slate-200",
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
