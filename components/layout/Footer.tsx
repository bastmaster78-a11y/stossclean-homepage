import Link from "next/link";
import { Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { SITE, SERVICES } from "@/lib/constants";
import Container from "@/components/ui/Container";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400">
      <Container className="py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="#top" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
                <Sparkles className="h-5 w-5" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-base font-extrabold text-white">{SITE.name}</span>
                <span className="text-[11px] font-medium tracking-wider text-brand-400">
                  {SITE.nameEn}
                </span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              {SITE.description}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">서비스</h3>
            <ul className="space-y-2.5 text-sm">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link href="#services" className="transition-colors hover:text-brand-400">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">바로가기</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="#why-us" className="transition-colors hover:text-brand-400">
                  왜 스토스클린인가
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="transition-colors hover:text-brand-400">
                  고객 후기
                </Link>
              </li>
              <li>
                <Link href="#faq" className="transition-colors hover:text-brand-400">
                  자주 묻는 질문
                </Link>
              </li>
              <li>
                <Link href="#quote" className="transition-colors hover:text-brand-400">
                  무료 견적 문의
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="transition-colors hover:text-brand-400">
                  개인정보처리방침
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">고객센터</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                <a href={`tel:${SITE.phoneRaw}`} className="hover:text-brand-400">
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                <a href={`mailto:${SITE.email}`} className="hover:text-brand-400">
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                <span>{SITE.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-2 text-xs leading-relaxed text-slate-500">
            <p>
              상호명: {SITE.name}({SITE.nameEn}) &nbsp;|&nbsp; 대표: {SITE.ceo} &nbsp;|&nbsp;
              사업자등록번호: {SITE.businessNumber}
            </p>
            <p>
              통신판매업신고번호: {SITE.mailOrderNumber} &nbsp;|&nbsp; 주소: {SITE.address}
            </p>
            <p>
              &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
