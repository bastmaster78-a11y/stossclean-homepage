import { z } from "zod";

const iconSchema = z.string().min(1, "아이콘을 선택해주세요.");
const requiredText = (message: string) => z.string().trim().min(1, message);

export const siteSchema = z.object({
  name: requiredText("업체명을 입력해주세요."),
  nameEn: requiredText("영문명을 입력해주세요."),
  slogan: requiredText("슬로건을 입력해주세요."),
  description: requiredText("소개 문구를 입력해주세요."),
  url: requiredText("사이트 주소를 입력해주세요."),
  phone: requiredText("대표 전화번호를 입력해주세요."),
  phoneRaw: requiredText("전화번호(숫자만)를 입력해주세요."),
  email: requiredText("이메일을 입력해주세요."),
  address: requiredText("주소를 입력해주세요."),
  businessNumber: requiredText("사업자등록번호를 입력해주세요."),
  mailOrderNumber: requiredText("통신판매업신고번호를 입력해주세요."),
  ceo: requiredText("대표자명을 입력해주세요."),
  kakaoUrl: requiredText("카카오채널 링크를 입력해주세요."),
});

export const heroStatSchema = z.object({
  label: requiredText("항목명을 입력해주세요."),
  value: requiredText("값을 입력해주세요."),
});

export const heroSchema = z.object({
  eyebrow: requiredText("상단 배지 문구를 입력해주세요."),
  headlineLine1: requiredText("헤드라인 첫째 줄을 입력해주세요."),
  headlineLine2: requiredText("헤드라인 둘째 줄을 입력해주세요."),
  headlineHighlight: z.string().trim(),
  paragraph: requiredText("소개 문단을 입력해주세요."),
  image: requiredText("대표 이미지를 등록해주세요."),
  stats: z.array(heroStatSchema).min(1, "통계 항목을 1개 이상 입력해주세요."),
  insuranceBadgeTitle: requiredText("배지 제목을 입력해주세요."),
  insuranceBadgeSubtitle: requiredText("배지 설명을 입력해주세요."),
  ratingBadgeText: requiredText("평점 배지 문구를 입력해주세요."),
});

export const sectionHeadingSchema = z.object({
  eyebrow: requiredText("섹션 상단 라벨을 입력해주세요."),
  title: requiredText("섹션 제목을 입력해주세요."),
  description: requiredText("섹션 설명을 입력해주세요."),
});

export const sectionHeadingsSchema = z.object({
  services: sectionHeadingSchema,
  whyUs: sectionHeadingSchema,
  process: sectionHeadingSchema,
  serviceScope: sectionHeadingSchema,
  serviceArea: sectionHeadingSchema,
  testimonials: sectionHeadingSchema,
  faq: sectionHeadingSchema,
  quote: sectionHeadingSchema,
});

export const quoteContentSchema = z.object({
  heading: requiredText("패널 제목을 입력해주세요."),
  paragraph: requiredText("패널 설명을 입력해주세요."),
  benefits: z.array(requiredText("항목을 입력해주세요.")).min(1, "혜택 항목을 1개 이상 입력해주세요."),
});

export const serviceSchema = z.object({
  id: requiredText("서비스 ID가 필요합니다."),
  title: requiredText("서비스명을 입력해주세요."),
  description: requiredText("서비스 설명을 입력해주세요."),
  icon: iconSchema,
  image: requiredText("서비스 이미지를 등록해주세요."),
  features: z.array(requiredText("특징을 입력해주세요.")).min(1, "특징을 1개 이상 입력해주세요."),
  featured: z.boolean().optional(),
});

export const whyUsItemSchema = z.object({
  id: requiredText("ID가 필요합니다."),
  icon: iconSchema,
  title: requiredText("제목을 입력해주세요."),
  description: requiredText("설명을 입력해주세요."),
});

export const processStepSchema = z.object({
  id: requiredText("ID가 필요합니다."),
  step: z.number().int().min(1),
  icon: iconSchema,
  title: requiredText("제목을 입력해주세요."),
  description: requiredText("설명을 입력해주세요."),
});

export const scopeItemSchema = z.object({
  id: requiredText("ID가 필요합니다."),
  icon: iconSchema,
  title: requiredText("제목을 입력해주세요."),
  description: requiredText("설명을 입력해주세요."),
});

export const serviceScopeSchema = z.object({
  image: requiredText("대표 이미지를 등록해주세요."),
  items: z.array(scopeItemSchema).min(1, "항목을 1개 이상 입력해주세요."),
});

export const testimonialSchema = z.object({
  id: requiredText("ID가 필요합니다."),
  name: requiredText("고객명을 입력해주세요."),
  service: requiredText("이용 서비스를 입력해주세요."),
  area: requiredText("지역/평수를 입력해주세요."),
  rating: z.number().int().min(1).max(5),
  content: requiredText("후기 내용을 입력해주세요."),
});

export const faqItemSchema = z.object({
  id: requiredText("ID가 필요합니다."),
  question: requiredText("질문을 입력해주세요."),
  answer: requiredText("답변을 입력해주세요."),
});

export const siteContentSchema = z.object({
  site: siteSchema,
  hero: heroSchema,
  sectionHeadings: sectionHeadingsSchema,
  quote: quoteContentSchema,
  services: z.array(serviceSchema).min(1, "서비스를 1개 이상 입력해주세요."),
  whyUs: z.array(whyUsItemSchema).min(1, "항목을 1개 이상 입력해주세요."),
  process: z.array(processStepSchema).min(1, "단계를 1개 이상 입력해주세요."),
  serviceScope: serviceScopeSchema,
  serviceAreas: z.array(z.string()),
  testimonials: z.array(testimonialSchema).min(1, "후기를 1개 이상 입력해주세요."),
  faqs: z.array(faqItemSchema).min(1, "질문을 1개 이상 입력해주세요."),
});

export type SiteContent = z.infer<typeof siteContentSchema>;
export type SiteInfoContent = z.infer<typeof siteSchema>;
export type HeroContent = z.infer<typeof heroSchema>;
export type HeroStatContent = z.infer<typeof heroStatSchema>;
export type SectionHeadingContent = z.infer<typeof sectionHeadingSchema>;
export type QuoteContent = z.infer<typeof quoteContentSchema>;
export type ServiceContent = z.infer<typeof serviceSchema>;
export type WhyUsContent = z.infer<typeof whyUsItemSchema>;
export type ProcessStepContent = z.infer<typeof processStepSchema>;
export type ScopeItemContent = z.infer<typeof scopeItemSchema>;
export type ServiceScopeContent = z.infer<typeof serviceScopeSchema>;
export type TestimonialContent = z.infer<typeof testimonialSchema>;
export type FaqItemContent = z.infer<typeof faqItemSchema>;
