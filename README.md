# 스토스클린 (STOSS CLEAN) 홈페이지

입주·이사·거주·사무실·준공청소를 소개하는 프리미엄 청소 서비스 랜딩 페이지.

- **GitHub**: https://github.com/bastmaster78-a11y/stossclean-homepage
- **배포 주소(Production)**: https://stoss-clean.vercel.app
- **Vercel 프로젝트**: https://vercel.com/okdax/stoss-clean

`main` 브랜치에 push 하면 Vercel이 자동으로 빌드·배포합니다 (Git 연동 완료 상태).

---

## 기술 스택

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS 4
- Framer Motion (스크롤/등장 애니메이션)
- React Hook Form + Zod (`무료 견적 문의` 폼 검증)
- Lucide React (아이콘)
- 이미지: Unsplash 원격 링크 (`next.config.ts`의 `images.remotePatterns`로 허용)

## 폴더 구조

```
app/                  라우트, 레이아웃, 메타데이터, sitemap/robots, 아이콘
  layout.tsx           전역 레이아웃 (Header/Footer/FloatingActions 포함, SEO 메타데이터)
  page.tsx             홈페이지 (섹션 조립 + JSON-LD)
  privacy/page.tsx      개인정보처리방침
  loading.tsx / error.tsx / not-found.tsx
  icon.tsx / apple-icon.tsx   동적 생성 favicon
  sitemap.ts / robots.ts

components/
  layout/               Header, Footer, MobileMenu
  ui/                    Button, Container 등 재사용 UI
  common/                SectionHeading, FloatingActions(전화/카카오/맨위로)

sections/               홈페이지를 구성하는 8개 섹션 (Hero, Services, WhyUs, Process,
                        ServiceScope, Testimonials, FAQ, QuoteForm)

lib/
  constants.ts           사이트 전역 정보 + 각 섹션 콘텐츠 데이터 (여기만 고치면 카피 전체 반영)
  validations.ts          견적 폼 Zod 스키마
  utils.ts                cn() 클래스 병합 유틸

hooks/useScrolled.ts     스크롤 여부 감지 훅 (헤더 그림자, Floating 버튼 표시)
types/index.ts            공용 타입 정의
```

## 로컬 실행

```bash
npm install
npm run dev       # http://localhost:3000
```

```bash
npm run build     # 프로덕션 빌드 (타입체크 + ESLint 포함)
npm run start     # 빌드 결과 로컬 실행
```

## 배포

Git 연동이 되어 있어 아래처럼 push만 하면 자동 배포됩니다.

```bash
git add .
git commit -m "설명"
git push
```

수동으로 배포하려면:

```bash
npx vercel          # 프리뷰/프로덕션 배포 (연결된 프로젝트로)
npx vercel --prod    # 프로덕션 강제 배포
```

---

## ⚠️ 실제 오픈 전 반드시 교체해야 할 항목 (전부 가상의 예시 값)

`lib/constants.ts`의 `SITE` 객체에 몰려 있습니다.

| 항목 | 현재 값(예시) | 비고 |
|---|---|---|
| 대표 전화번호 | `1588-0000` | `SITE.phone`, `SITE.phoneRaw` |
| 이메일 | `contact@stoss-clean.co.kr` | `SITE.email` |
| 주소 | `서울특별시 강남구 테헤란로 123, 4층` | `SITE.address` |
| 사업자등록번호 | `123-45-67890` | `SITE.businessNumber` |
| 통신판매업신고번호 | `제2026-서울강남-01234호` | `SITE.mailOrderNumber` |
| 대표자명 | `김스토` | `SITE.ceo` |
| 카카오채널 링크 | `pf.kakao.com/_stossclean` | `SITE.kakaoUrl`, Floating 버튼에서 사용 |
| 배포 도메인(SEO용) | `https://www.stoss-clean.co.kr` | `SITE.url` — 실제 도메인 연결 전까지 `sitemap.ts`/OG 태그가 이 값을 씀 |

고객 후기(`TESTIMONIALS`)도 전부 가상의 예시 후기이므로 실제 후기로 교체 권장.

## 최근 변경 이력

- **2026-07-19**: 초기 구축 (Hero~QuoteForm 전 섹션, SEO, Vercel 배포, GitHub 연동)
- **2026-07-19**: 모바일 햄버거 메뉴가 배경 화면과 겹쳐 보이던 문제 수정
  - 메뉴 열림 중 `body` 스크롤 잠금 추가
  - 메뉴 열림 중 헤더 배경을 완전 불투명으로 강제 전환 (`components/layout/Header.tsx`)

## 참고 — Git 커밋 계정

- 로컬 git `user.name`은 임시로 이메일 앞부분(`bastmaster78`)으로 설정되어 있음 (GitHub 계정 아이디 `bastmaster78-a11y`와 다른 값). 필요시 아래로 변경:
  ```bash
  git config user.name "원하는이름"
  ```
