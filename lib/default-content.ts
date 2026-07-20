import type { SiteContent } from "@/lib/content-schema";

// 관리자 화면에서 아직 저장된 콘텐츠가 없을 때 사용하는 초기값(시드 데이터).
// 기존 lib/constants.ts와 각 섹션에 하드코딩되어 있던 값을 그대로 옮긴 것입니다.
export const DEFAULT_CONTENT: SiteContent = {
  site: {
    name: "스토스클린",
    nameEn: "STOSS CLEAN",
    slogan: "청소는 기술입니다, 신뢰는 기본입니다",
    description:
      "입주청소부터 준공청소까지, 스토스클린의 전문 인력이 정찰제 가격으로 책임지고 완성합니다.",
    url: "https://www.stoss-clean.co.kr",
    phone: "1588-0000",
    phoneRaw: "15880000",
    email: "contact@stoss-clean.co.kr",
    address: "서울특별시 강남구 테헤란로 123, 4층",
    businessNumber: "123-45-67890",
    mailOrderNumber: "제2026-서울강남-01234호",
    ceo: "김스토",
    kakaoUrl: "https://pf.kakao.com/_stossclean",
  },

  hero: {
    eyebrow: "프리미엄 공간 청소 전문",
    headlineLine1: "청소는 기술입니다,",
    headlineLine2: "신뢰는 스토스클린의 기본입니다.",
    headlineHighlight: "신뢰",
    paragraph:
      "입주청소부터 준공청소까지, 검증된 전문 인력과 정찰제 가격으로 공간의 첫인상과 일상의 쾌적함을 완성해드립니다.",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
    stats: [
      { label: "누적 시공 건수", value: "12,000+" },
      { label: "고객 재이용율", value: "94%" },
      { label: "평균 만족도", value: "4.9 / 5.0" },
    ],
    insuranceBadgeTitle: "배상책임보험 가입",
    insuranceBadgeSubtitle: "안심하고 맡기는 책임 시공",
    ratingBadgeText: "4.9점 고객 만족",
  },

  sectionHeadings: {
    services: {
      eyebrow: "SERVICES",
      title: "공간의 상황에 맞춘 5가지 청소 서비스",
      description: "입주부터 준공까지, 스토스클린이 목적에 맞는 전문 청소 솔루션을 제공합니다.",
    },
    whyUs: {
      eyebrow: "WHY STOSS CLEAN",
      title: "스토스클린을 선택해야 하는 이유",
      description: "원칙을 지키는 청소, 그 결과가 만족도로 증명됩니다.",
    },
    process: {
      eyebrow: "PROCESS",
      title: "상담부터 완료까지, 6단계 작업 프로세스",
      description: "투명하고 체계적인 절차로 처음부터 끝까지 안심하고 맡기실 수 있습니다.",
    },
    serviceScope: {
      eyebrow: "SERVICE SCOPE",
      title: "공간 구석구석, 놓치는 곳 없이",
      description: "주방부터 현관까지, 생활 공간 전체를 세심한 기준으로 관리합니다.",
    },
    serviceArea: {
      eyebrow: "SERVICE AREA",
      title: "서비스 가능 지역",
      description: "파란색으로 표시된 지역에서 스토스클린 서비스를 이용하실 수 있습니다.",
    },
    testimonials: {
      eyebrow: "TESTIMONIALS",
      title: "스토스클린을 경험한 고객의 이야기",
      description: "실제 이용 고객님들이 남겨주신 생생한 후기입니다.",
    },
    faq: {
      eyebrow: "FAQ",
      title: "자주 묻는 질문",
      description: "궁금하신 점을 먼저 확인해보세요. 원하는 답변이 없다면 언제든 문의해주세요.",
    },
    quote: {
      eyebrow: "FREE QUOTE",
      title: "무료 견적 문의",
      description: "아래 정보를 남겨주시면 담당 매니저가 빠르게 맞춤 견적을 안내해드립니다.",
    },
  },

  quote: {
    heading: "빠른 상담이 필요하신가요?",
    paragraph:
      "전화 상담으로 더 빠르게 견적을 받아보실 수 있습니다. 평일 오전 9시부터 오후 6시까지 상담 가능합니다.",
    benefits: ["24시간 이내 견적 회신", "방문 상담 무료 제공", "숨겨진 추가 비용 없음"],
  },

  services: [
    {
      id: "move-in",
      title: "입주청소",
      description: "새 보금자리의 첫인상을 완벽하게, 입주 전 구석구석 새집처럼 만들어드립니다.",
      icon: "Sparkles",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      features: ["새시·마루 코팅 보호", "몰딩·타일 줄눈 클리닝", "베란다·창틀 미세먼지 제거"],
    },
    {
      id: "move-out",
      title: "이사청소",
      description: "짐이 빠진 빈 공간을 다음 입주자를 위해, 혹은 새 시작을 위해 말끔히 정리합니다.",
      icon: "Truck",
      image:
        "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?auto=format&fit=crop&w=1200&q=80",
      features: ["이사 전·후 일정 맞춤 진행", "빌트인 가전 내부 세척", "잔여물·라벨 제거"],
    },
    {
      id: "residential",
      title: "거주청소",
      description: "지금 살고 계신 공간을 정기적으로, 혹은 한 번에 리프레시해드립니다.",
      icon: "Home",
      image:
        "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80",
      features: ["정기·1회성 선택 가능", "생활 동선 고려 맞춤 청소", "반려동물 가정 케어"],
    },
    {
      id: "office",
      title: "사무실청소",
      description: "업무 효율을 높이는 쾌적한 공간, 임직원과 고객을 위한 청결한 사무 환경을 만듭니다.",
      icon: "Building2",
      image:
        "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
      features: ["업무 외 시간대 진행 가능", "회의실·탕비실 집중 관리", "정기 계약 할인"],
    },
    {
      id: "post-construction",
      title: "준공청소",
      description: "인테리어·건축 공사 후 남은 분진과 잔해까지, 준공 검사에 대비한 완벽 마감청소.",
      icon: "HardHat",
      image:
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
      features: ["공사 분진·시멘트 자국 제거", "대형 현장 팀 단위 투입", "준공검사 일정 맞춤"],
      featured: true,
    },
  ],

  whyUs: [
    {
      id: "w1",
      icon: "Users",
      title: "전문 인력",
      description: "체계적인 교육을 수료한 숙련 인력이 표준화된 매뉴얼에 따라 작업합니다.",
    },
    {
      id: "w2",
      icon: "Leaf",
      title: "친환경 세제",
      description: "인체와 반려동물에 안전한 친환경 세제만을 사용해 안심하고 맡길 수 있습니다.",
    },
    {
      id: "w3",
      icon: "ShieldCheck",
      title: "책임 시공",
      description: "작업 전 과정에 배상책임보험이 적용되어 만일의 상황도 든든하게 보장합니다.",
    },
    {
      id: "w4",
      icon: "Headset",
      title: "AS 보장",
      description: "청소 완료 후 아쉬운 부분이 있다면 약속된 기간 내 무상으로 재작업해드립니다.",
    },
    {
      id: "w5",
      icon: "Tag",
      title: "정찰제 가격",
      description: "숨겨진 추가 비용 없이 견적 그대로, 투명한 정찰제 요금을 약속드립니다.",
    },
    {
      id: "w6",
      icon: "Star",
      title: "후기 만족도",
      description: "수많은 고객의 실제 후기로 검증된 만족도 높은 서비스를 경험해보세요.",
    },
  ],

  process: [
    { id: "p1", step: 1, icon: "PhoneCall", title: "상담", description: "전화 또는 온라인으로 원하시는 청소 서비스를 편하게 상담받으세요." },
    { id: "p2", step: 2, icon: "FileText", title: "견적", description: "공간 정보를 바탕으로 투명한 정찰제 견적을 안내해드립니다." },
    { id: "p3", step: 3, icon: "CalendarCheck", title: "방문", description: "예약된 일정에 맞춰 전문 인력이 정확한 시간에 방문합니다." },
    { id: "p4", step: 4, icon: "Sparkles", title: "청소", description: "표준 매뉴얼과 전용 장비로 구석구석 꼼꼼하게 작업합니다." },
    { id: "p5", step: 5, icon: "Search", title: "검수", description: "작업 완료 후 담당자가 체크리스트에 따라 꼼꼼히 검수합니다." },
    { id: "p6", step: 6, icon: "PartyPopper", title: "완료", description: "고객님의 확인과 만족으로 모든 서비스가 마무리됩니다." },
  ],

  serviceScope: {
    image:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
    items: [
      { id: "s1", icon: "UtensilsCrossed", title: "주방", description: "후드·인덕션·싱크대 기름때와 냄새까지 완전히 제거합니다." },
      { id: "s2", icon: "Bath", title: "욕실", description: "곰팡이와 물때, 배수구까지 위생적으로 새것처럼 관리합니다." },
      { id: "s3", icon: "Sofa", title: "거실", description: "바닥 코팅부터 몰딩 먼지까지 생활 공간을 쾌적하게 만듭니다." },
      { id: "s4", icon: "BedDouble", title: "방", description: "수납장 내부와 창틀까지 세심하게 살펴 깨끗하게 정리합니다." },
      { id: "s5", icon: "TreePine", title: "베란다", description: "묵은 먼지와 배수구 이물질을 제거해 환기가 잘 되게 합니다." },
      { id: "s6", icon: "DoorOpen", title: "현관", description: "신발장 내부와 바닥 타일까지 첫인상부터 깔끔하게 완성합니다." },
    ],
  },

  serviceAreas: [
    "서울특별시 강남구",
    "서울특별시 서초구",
    "서울특별시 송파구",
    "경기도 수원시",
    "경기도 성남시",
    "인천광역시 연수구",
  ],

  testimonials: [
    {
      id: "t1",
      name: "박○○ 고객님",
      service: "입주청소",
      area: "서울 송파구 · 34평",
      rating: 5,
      content:
        "새 아파트 입주 전에 맡겼는데 새시 사이 먼지까지 다 잡아주셔서 놀랐어요. 덕분에 이사 첫날부터 기분 좋게 시작했습니다.",
    },
    {
      id: "t2",
      name: "이○○ 고객님",
      service: "이사청소",
      area: "경기 성남시 · 24평",
      rating: 5,
      content:
        "전세 만기로 나가기 전 청소였는데 예상보다 훨씬 꼼꼼해서 임대인분도 만족하셨습니다. 다음 이사 때도 스토스클린 이용할게요.",
    },
    {
      id: "t3",
      name: "최○○ 대표님",
      service: "사무실청소",
      area: "서울 강남구 · 사무실 80평",
      rating: 5,
      content:
        "매달 정기적으로 이용 중인데 항상 같은 퀄리티를 유지해주셔서 믿음이 갑니다. 직원들 만족도도 확실히 올라갔어요.",
    },
    {
      id: "t4",
      name: "정○○ 고객님",
      service: "준공청소",
      area: "인천 연수구 · 상가 120평",
      rating: 5,
      content:
        "인테리어 공사 후 분진이 정말 심했는데 준공검사 일정에 딱 맞춰 완벽하게 마무리해주셨습니다. 팀 규모도 크고 전문적이었어요.",
    },
    {
      id: "t5",
      name: "한○○ 고객님",
      service: "거주청소",
      area: "서울 마포구 · 28평",
      rating: 4,
      content:
        "반려동물을 키우는데 친환경 세제를 사용해주셔서 안심이 됐습니다. 정기적으로 이용하려고 예약 문의드렸어요.",
    },
  ],

  faqs: [
    {
      id: "f1",
      question: "견적은 어떻게 산정되나요?",
      answer:
        "평수, 서비스 종류, 오염도, 옵션 작업 유무에 따라 정찰제 기준표로 산정됩니다. 방문 전 온라인·전화 상담으로 예상 견적을 안내해드리며, 현장에서 추가 비용이 발생하지 않도록 사전에 투명하게 고지합니다.",
    },
    {
      id: "f2",
      question: "청소 당일 준비해야 할 것이 있나요?",
      answer:
        "귀중품이나 파손 위험이 있는 소품은 미리 안전한 곳에 보관해주시면 좋습니다. 그 외 청소 장비와 세제는 저희가 모두 준비해서 방문하므로 별도로 준비하실 것은 없습니다.",
    },
    {
      id: "f3",
      question: "작업 시간은 얼마나 걸리나요?",
      answer:
        "평형과 서비스 종류에 따라 다르지만, 일반적으로 20평형 기준 입주청소는 4~6시간, 거주청소는 2~4시간 정도 소요됩니다. 정확한 소요 시간은 견적 상담 시 안내해드립니다.",
    },
    {
      id: "f4",
      question: "당일 예약도 가능한가요?",
      answer:
        "인력 및 일정 여유가 있는 경우 당일 예약도 가능합니다. 다만 원활한 일정 배정을 위해 최소 1~2일 전 예약을 권장드리며, 성수기에는 예약이 조기 마감될 수 있습니다.",
    },
    {
      id: "f5",
      question: "청소 후 마음에 들지 않으면 어떻게 하나요?",
      answer:
        "작업 완료 후 7일 이내에 미흡한 부분을 말씀해주시면 해당 구역에 한해 무상으로 재방문 후 재작업해드립니다. 고객 만족을 최우선으로 책임지고 관리합니다.",
    },
    {
      id: "f6",
      question: "사용하는 세제는 안전한가요?",
      answer:
        "네, 모든 작업에는 인증받은 친환경 세제를 사용하고 있어 아이와 반려동물이 있는 가정에서도 안심하고 이용하실 수 있습니다.",
    },
  ],
};
