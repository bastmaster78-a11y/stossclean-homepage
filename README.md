# 스토스클린 (STOSS CLEAN) 홈페이지

입주·이사·거주·사무실·준공청소를 소개하는 프리미엄 청소 서비스 랜딩 페이지 + 관리자 콘텐츠 편집 시스템(CMS).

- **GitHub**: https://github.com/bastmaster78-a11y/stossclean-homepage
- **배포 주소(Production)**: https://stoss-clean.vercel.app
- **관리자 화면**: https://stoss-clean.vercel.app/admin (비밀번호는 Vercel 환경변수 `ADMIN_PASSWORD` 참고 — 아래 "환경변수" 항목 참고)
- **Vercel 프로젝트**: https://vercel.com/okdax/stoss-clean

`main` 브랜치에 push 하면 Vercel이 자동으로 빌드·배포합니다 (Git 연동 완료 상태).

---

## 기술 스택

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS 4
- Framer Motion (스크롤/등장 애니메이션)
- React Hook Form + Zod (견적 폼 · 관리자 폼 검증)
- Lucide React (아이콘)
- **Vercel Blob** — 사이트 콘텐츠(JSON 1개) + 관리자가 업로드하는 이미지 저장
- 이미지: Unsplash 원격 링크(초기 시드 데이터) + Vercel Blob 업로드 이미지 (`next.config.ts`의 `images.remotePatterns`로 둘 다 허용)

## ⭐ 관리자 콘텐츠 편집 시스템 (핵심 기능)

사이트의 거의 모든 텍스트/이미지는 더 이상 코드에 하드코딩되어 있지 않습니다. `/admin`에서 비밀번호로 로그인하면 웹 화면에서 직접 수정하고, **저장 즉시(재배포 없이)** 실제 사이트에 반영됩니다.

### 아키텍처

- **콘텐츠 저장**: 사이트 전체 텍스트를 JSON 1개(`content/site-content.json`)로 Vercel Blob에 저장. `lib/content-store.ts`의 `getContent()`가 매 요청마다 `cache: "no-store"`로 읽어옴 → 실시간 반영. Blob에 아직 아무것도 저장 안 된 상태(최초 배포 직후)에는 `lib/default-content.ts`의 시드 데이터를 그대로 보여줌(사이트가 깨지지 않음).
- **이미지 업로드**: 관리자 화면에서 파일 선택 → `POST /api/admin/upload` → Vercel Blob에 저장 → URL을 콘텐츠 JSON에 기록.
- **인증**: DB 없는 단일 관리자 로그인. `ADMIN_PASSWORD` 대조 후 `ADMIN_SESSION_SECRET`으로 HMAC 서명한 httpOnly 쿠키 발급(7일). `middleware.ts`가 `/admin/*`, `/api/admin/*`를 보호.
- **라우트 구조**: 공개 페이지는 `app/(site)/` 라우트 그룹 아래(Header/Footer/FloatingActions 포함하는 자체 레이아웃), 관리자 화면(`app/admin/`)은 루트 레이아웃만 써서 공개 사이트 헤더/푸터가 섞여 나오지 않도록 분리.

### 관리자 화면에서 편집 가능한 항목 (`/admin`, 탭별)

| 탭 | 내용 |
|---|---|
| 사이트 정보 | 업체명, 전화번호, 이메일, 주소, 사업자번호, 통신판매업신고번호, 대표자명, 카카오채널 링크 |
| 메인 화면 | Hero 문구, 대표 이미지, 통계 숫자, 배지 문구 |
| 섹션 제목 | 각 섹션 상단 라벨/제목/설명 (서비스·선택이유·프로세스·서비스범위·서비스지역·후기·FAQ·견적) |
| 서비스 | 서비스 카드 추가/삭제, 제목/설명/이미지/아이콘/특징, "넓은 카드로 강조" 체크 |
| 선택 이유 / 작업 절차 / 서비스 범위 | 항목 추가/삭제, 아이콘 선택(`lib/icons.ts`의 허용 목록 중), 텍스트 |
| **서비스 지역** | 전국 시/군/구 단위 목록(`lib/korea-regions.ts`)에서 서비스 가능 지역을 클릭으로 켜고 끄기. 켠 지역만 파란 배지로 공개 사이트에 노출 |
| 고객 후기 / FAQ | 항목 추가/삭제 |
| 견적 폼 문구 | 견적 섹션 왼쪽 안내 패널 텍스트(입력 필드 자체는 코드 관리) |

**관리자 화면에서 다루지 않는 것(의도적으로 코드에 남겨둠)**: 헤더/푸터 메뉴 구조·버튼 라벨(`lib/constants.ts`의 `NAV_LINKS`), 개인정보처리방침 본문(`app/(site)/privacy/page.tsx`, 법률 문서라 리치텍스트 편집 없이는 위험), 견적 문의 접수함(현재 실제 저장/알림 로직 없음 — 아래 "다음 작업" 참고).

## 폴더 구조

```
app/
  layout.tsx              루트 레이아웃 (html/body/폰트/메타데이터만, Header/Footer 없음)
  (site)/                 공개 사이트 라우트 그룹
    layout.tsx             Header/Footer/FloatingActions 포함하는 사이트 전용 레이아웃
    page.tsx                홈페이지 (섹션 조립 + JSON-LD, getContent() 사용)
    privacy/page.tsx        개인정보처리방침 (사이트 정보만 동적, 본문은 고정)
  admin/
    page.tsx                관리자 편집기 진입점 (서버 컴포넌트, getContent()로 초기값 전달)
    login/page.tsx           비밀번호 로그인 폼
    _components/             AdminEditor + 탭별 섹션 폼 컴포넌트, ImageUploadField, IconSelect, TextListField
  api/admin/
    login/route.ts, logout/route.ts   세션 쿠키 발급/제거
    content/route.ts                   GET(현재 콘텐츠) / PUT(zod 검증 후 저장 + revalidatePath)
    upload/route.ts                    이미지 업로드 → Blob URL 반환
  loading.tsx / error.tsx / not-found.tsx / icon.tsx / apple-icon.tsx / sitemap.ts / robots.ts

components/
  layout/                Header, Footer, MobileMenu (모두 site 콘텐츠를 props로 받음)
  ui/                     Button, Container
  common/                 SectionHeading, FloatingActions, ServiceAreaList(서비스 지역 선택 목록 — admin/공개 공용)

sections/                 홈페이지를 구성하는 9개 섹션 (Hero, Services, WhyUs, Process,
                          ServiceScope, ServiceArea, Testimonials, FAQ, QuoteForm)
                          — 전부 lib/constants.ts가 아니라 콘텐츠 props를 받도록 리팩터링됨

lib/
  content-schema.ts        SiteContent zod 스키마 + 타입 (콘텐츠 전체 데이터 모델의 단일 소스)
  default-content.ts        Blob이 비어있을 때 쓰는 시드 데이터
  content-store.ts          getContent() / saveContent() — Vercel Blob 읽기/쓰기
  auth.ts                   비밀번호 검증 + 세션 쿠키 HMAC 생성/검증
  icons.ts                  아이콘 이름(문자열) ↔ lucide 컴포넌트 매핑(관리자 드롭다운용)
  korea-regions.ts           전국 시/도 + 시/군/구 목록, areaKey() 헬퍼
  constants.ts               NAV_LINKS만 남음 (메뉴 구조는 코드 관리)
  validations.ts             견적 폼 zod 스키마 (ROOM_COUNT_SERVICE_IDS 포함)
  utils.ts                   cn() 클래스 병합 유틸

middleware.ts             /admin, /api/admin 보호 (세션 쿠키 검증)
hooks/useScrolled.ts       스크롤 여부 감지 훅
types/index.ts             NavLink, QuoteFormValues 타입
```

## 로컬 실행

```bash
npm install
npm run dev       # http://localhost:3000
```

```bash
npm run build     # 프로덕션 빌드 (타입체크 + ESLint 포함)
npm run start     # 빌드 결과 로컬 실행 — "use client" 파일에서 export한 함수를
                   # 서버 컴포넌트가 직접 호출하는 실수 등은 npm run dev에서는
                   # 안 걸리고 build+start(또는 실제 배포)에서만 드러날 수 있으니,
                   # 섹션/페이지를 고친 뒤에는 가능하면 build+start로도 확인할 것.
```

환경변수 없이 `npm run dev`만 실행해도 `lib/default-content.ts` 시드 데이터로 정상 동작합니다. 관리자 로그인·저장·이미지 업로드까지 테스트하려면 아래 환경변수가 로컬에 있어야 합니다(`vercel env pull .env.local`로 받아옴, 이미 설정 완료 — 아래 참고).

## 환경변수 (Vercel 프로젝트에 이미 설정 완료)

| 변수 | 용도 | 상태 |
|---|---|---|
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob 스토어(`stoss-clean-content`, public) 접근 | ✅ 스토어 생성 + 프로젝트 연결 완료 |
| `ADMIN_PASSWORD` | 관리자 로그인 비밀번호 | ✅ Production/Preview/Development 전부 설정 완료 |
| `ADMIN_SESSION_SECRET` | 세션 쿠키 서명용 랜덤 시크릿 | ✅ Production/Preview/Development 전부 설정 완료 |
| `VERCEL_OIDC_TOKEN` | Vercel CLI가 자동 관리 | ✅ 자동 |

로컬에 새로 pull 받으려면: `vercel env pull .env.local`

## 배포

Git 연동이 되어 있어 아래처럼 push만 하면 자동 배포됩니다.

```bash
git add .
git commit -m "설명"
git push
```

수동으로 배포하려면:

```bash
vercel          # 프리뷰 배포
vercel --prod    # 프로덕션 강제 배포
```

배포 후 확인용 CLI 명령:

```bash
vercel ls                       # 최근 배포 목록/상태
vercel inspect <배포 URL>        # 특정 배포 상세 상태
vercel logs https://stoss-clean.vercel.app   # 최근 런타임 로그(에러 확인용)
```

---

## ⚠️ 실제 오픈 전 확인할 항목

이제 대부분은 코드가 아니라 **`/admin`에서 직접 수정**하면 됩니다 (전화번호, 이메일, 주소, 사업자등록번호, 통신판매업신고번호, 대표자명, 카카오채널 링크, 고객 후기, 서비스 가능 지역 등 — "사이트 정보" / "고객 후기" / "서비스 지역" 탭).

코드에만 남아있어서 확인이 필요한 것:
- `app/(site)/privacy/page.tsx` — 개인정보처리방침 본문(회사명 등 일부만 동적, 나머지는 실제 법무 검토 필요한 고정 텍스트)
- `lib/constants.ts`의 `NAV_LINKS` — 메뉴 라벨/앵커(구조 변경 시에만 코드 수정 필요)

## 최근 변경 이력

- **2026-07-19**: 초기 구축 (Hero~QuoteForm 전 섹션, SEO, Vercel 배포, GitHub 연동)
- **2026-07-19**: 모바일 햄버거 메뉴가 배경 화면과 겹쳐 보이던 문제 수정
- **2026-07-20**: 관리자 콘텐츠 편집 시스템(CMS) 구축
  - Vercel Blob 기반 콘텐츠 저장/이미지 업로드, 비밀번호 로그인, `/admin` 탭 편집기
  - `app/(site)` 라우트 그룹으로 분리해서 관리자 화면에 공개 사이트 헤더/푸터가 섞이지 않게 수정
  - 견적 폼: 서비스 종류 목록을 서비스 데이터에서 동적 생성(기존 이중 관리 버그 제거), 평수·주소를 드롭다운으로 변경(주소는 시/도→시/군/구 2단계, `lib/korea-regions.ts`), 방 개수(0~10개, 입주/거주/이사청소일 때만 노출) 추가
  - "서비스 가능 지역" 기능 추가: 처음엔 지도 타일(블록맵)로 만들었다가, 사용자 요청으로 시/군/구 단위 체크리스트(`ServiceAreaList`)로 교체
  - **배포 후 발견한 버그**: `sections/ServiceArea.tsx`(서버 컴포넌트)가 `"use client"` 파일에서 export한 `areaKey()` 함수를 직접 호출해서 프로덕션 빌드에서만 크래시(→ `npm run dev`에서는 안 잡히고 `next start`에서만 재현됨). `areaKey()`를 순수 데이터 모듈(`lib/korea-regions.ts`)로 옮겨서 해결. **교훈: 섹션/페이지를 고친 뒤엔 `npm run dev`뿐 아니라 `npm run build && npm run start`로도 한 번 더 확인할 것.**
  - 세종특별자치시는 하위 구역이 없어서 목록에 이름이 중복 표시되던 것을 `districts: ["전체"]`로 수정

## 🔜 다음에 이어서 할 수 있는 작업 (미완료/보류)

- **견적 문의 알림을 카카오톡으로 받고 싶다는 요청이 있었으나 방식을 결정하지 못하고 중단됨.** 검토했던 옵션:
  1. 카카오 "나에게 보내기" API — 무료, 사업자 인증 불필요, 관리자가 카카오 개발자 계정 만들고 1회 로그인 인증만 하면 됨 (추천, 하지만 계정 설정은 사용자가 직접 해야 함)
  2. 카카오 알림톡(비즈메시지) — 고객에게도 발송 가능한 정식 방식이지만 사업자 인증 + 템플릿 심사 + 발송 비용 필요
  3. 이메일로 대체 — 가장 간단하지만 카카오톡이 아님
  - **현재 `sections/QuoteForm.tsx`의 제출 핸들러는 그냥 `console.log` + 가짜 딜레이인 스텁 상태** — 실제로 어디에도 저장/발송되지 않음. 다음에 이어서 하려면 이 알림 연동과 함께 "제출된 문의를 어디에 저장/조회할지"도 같이 정해야 함.
- 개인정보처리방침 본문을 관리자 화면에서 편집 가능하게 할지 (현재는 의도적으로 제외)
- 로그인 시도 횟수 제한 등 관리자 로그인 보안 강화 (현재 없음, 필요성 낮다고 판단해 1차 범위에서 제외)

## 참고 — Git 커밋 계정

- 로컬 git `user.name`은 임시로 이메일 앞부분(`bastmaster78`)으로 설정되어 있음 (GitHub 계정 아이디 `bastmaster78-a11y`와 다른 값). 필요시 아래로 변경:
  ```bash
  git config user.name "원하는이름"
  ```
