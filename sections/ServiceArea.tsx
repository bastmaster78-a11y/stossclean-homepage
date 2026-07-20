import type { SectionHeadingContent } from "@/lib/content-schema";
import { KoreaMap } from "@/components/common/KoreaMap";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/common/SectionHeading";

interface ServiceAreaProps {
  serviceAreas: string[];
  heading: SectionHeadingContent;
}

export default function ServiceArea({ serviceAreas, heading }: ServiceAreaProps) {
  return (
    <section id="service-area" className="bg-slate-50 py-20 lg:py-28">
      <Container className="max-w-md">
        <SectionHeading
          eyebrow={heading.eyebrow}
          title={heading.title}
          description={heading.description}
        />

        <div className="mt-12 flex flex-col items-center gap-5">
          <KoreaMap selected={serviceAreas} className="w-full max-w-xs" />
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span className="h-3 w-3 rounded-sm bg-brand-600" />
            서비스 가능지역
          </div>
        </div>
      </Container>
    </section>
  );
}
