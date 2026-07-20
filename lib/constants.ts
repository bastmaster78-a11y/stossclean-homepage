import type { NavLink } from "@/types";

// 메뉴 구조는 페이지 앵커(#services 등)와 직접 연결되어 있어 관리자 화면에서 편집하지 않고
// 코드에서 관리합니다. 텍스트/이미지 콘텐츠는 lib/default-content.ts + lib/content-store.ts를 참고하세요.
export const NAV_LINKS: NavLink[] = [
  { label: "서비스 소개", href: "#services" },
  { label: "왜 스토스클린", href: "#why-us" },
  { label: "작업 프로세스", href: "#process" },
  { label: "서비스 범위", href: "#scope" },
  { label: "서비스 지역", href: "#service-area" },
  { label: "고객 후기", href: "#testimonials" },
  { label: "자주 묻는 질문", href: "#faq" },
  { label: "무료 견적", href: "#quote" },
];
