import { z } from "zod";

export const SERVICE_TYPE_OPTIONS = [
  { value: "move-in", label: "입주청소" },
  { value: "move-out", label: "이사청소" },
  { value: "residential", label: "거주청소" },
  { value: "office", label: "사무실청소" },
  { value: "post-construction", label: "준공청소" },
  { value: "etc", label: "기타 문의" },
] as const;

const phoneRegex = /^01[0-9]-?\d{3,4}-?\d{4}$/;

export const quoteFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "이름은 2자 이상 입력해주세요.")
    .max(20, "이름은 20자 이내로 입력해주세요."),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, "올바른 휴대폰 번호 형식으로 입력해주세요. (예: 010-1234-5678)"),
  serviceType: z.enum(
    ["move-in", "move-out", "residential", "office", "post-construction", "etc"],
    { message: "서비스 종류를 선택해주세요." },
  ),
  area: z
    .string()
    .trim()
    .min(1, "평수를 입력해주세요.")
    .max(20, "평수는 20자 이내로 입력해주세요."),
  address: z
    .string()
    .trim()
    .min(5, "주소를 정확히 입력해주세요.")
    .max(100, "주소는 100자 이내로 입력해주세요."),
  message: z
    .string()
    .trim()
    .max(500, "문의내용은 500자 이내로 입력해주세요.")
    .optional()
    .or(z.literal("")),
  privacyAgree: z.literal(true, {
    message: "개인정보 수집 및 이용에 동의해주세요.",
  }),
});

export type QuoteFormSchema = z.infer<typeof quoteFormSchema>;
