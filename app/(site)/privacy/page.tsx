import type { Metadata } from "next";
import { getContent } from "@/lib/content-store";
import Container from "@/components/ui/Container";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  return {
    title: "개인정보처리방침",
    description: `${content.site.name} 개인정보처리방침 안내 페이지입니다.`,
    robots: { index: false, follow: true },
  };
}

function buildSections(email: string, phone: string) {
  return [
    {
      title: "1. 수집하는 개인정보 항목",
      content:
        "스토스클린(이하 '회사')은 견적 상담 및 서비스 제공을 위해 이름, 연락처, 주소, 서비스 종류, 평수, 문의내용을 수집합니다.",
    },
    {
      title: "2. 개인정보의 수집 및 이용 목적",
      content:
        "수집된 정보는 견적 상담, 서비스 예약 및 제공, 고객 문의 응대, 서비스 품질 관리 목적으로만 이용되며 목적 외 용도로 사용되지 않습니다.",
    },
    {
      title: "3. 개인정보의 보유 및 이용 기간",
      content:
        "회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관계 법령에 의해 보존할 필요가 있는 경우 일정 기간 보관합니다.",
    },
    {
      title: "4. 개인정보의 제3자 제공",
      content:
        "회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않으며, 이용자의 사전 동의 없이 제3자에게 제공하지 않습니다.",
    },
    {
      title: "5. 개인정보 처리 위탁",
      content:
        "회사는 서비스 향상을 위해 필요한 경우 개인정보 처리 업무를 외부에 위탁할 수 있으며, 위탁 시 관계 법령에 따라 위탁 계약을 통해 개인정보가 안전하게 관리되도록 조치합니다.",
    },
    {
      title: "6. 이용자의 권리와 행사 방법",
      content:
        "이용자는 언제든지 등록되어 있는 자신의 개인정보를 조회, 수정, 삭제 요청할 수 있으며 개인정보 수집 및 이용에 대한 동의를 철회할 수 있습니다.",
    },
    {
      title: "7. 개인정보 보호책임자",
      content: `개인정보 관련 문의는 아래 연락처로 접수해주시기 바랍니다. 이메일: ${email} / 전화: ${phone}`,
    },
  ];
}

export default async function PrivacyPage() {
  const content = await getContent();
  const sections = buildSections(content.site.email, content.site.phone);

  return (
    <section className="py-24">
      <Container className="max-w-3xl">
        <h1 className="text-3xl font-bold text-slate-900">개인정보처리방침</h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-500">
          {content.site.name}({content.site.nameEn})은(는) 이용자의 개인정보를 소중히 다루며,
          관련 법령을 준수하기 위해 다음과 같이 개인정보처리방침을 수립·공개합니다.
        </p>

        <div className="mt-10 flex flex-col gap-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-lg font-bold text-slate-900">{section.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{section.content}</p>
            </div>
          ))}
        </div>

        <p className="mt-12 text-xs text-slate-400">본 방침은 2026년 1월 1일부터 적용됩니다.</p>
      </Container>
    </section>
  );
}
