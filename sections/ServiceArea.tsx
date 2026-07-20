import type { SectionHeadingContent } from "@/lib/content-schema";
import { KOREA_REGIONS } from "@/lib/korea-regions";
import { areaKey } from "@/components/common/ServiceAreaList";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/common/SectionHeading";

interface ServiceAreaProps {
  serviceAreas: string[];
  heading: SectionHeadingContent;
}

export default function ServiceArea({ serviceAreas, heading }: ServiceAreaProps) {
  const grouped = KOREA_REGIONS.map((region) => ({
    name: region.name,
    districts: region.districts.filter((district) =>
      serviceAreas.includes(areaKey(region.name, district)),
    ),
  })).filter((region) => region.districts.length > 0);

  return (
    <section id="service-area" className="bg-slate-50 py-20 lg:py-28">
      <Container className="max-w-4xl">
        <SectionHeading
          eyebrow={heading.eyebrow}
          title={heading.title}
          description={heading.description}
        />

        {grouped.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {grouped.map((region) => (
              <div
                key={region.name}
                className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
              >
                <p className="text-sm font-bold text-slate-900">{region.name}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {region.districts.map((district) => (
                    <span
                      key={district}
                      className="rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white"
                    >
                      {district}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-12 text-center text-sm text-slate-400">
            등록된 서비스 가능 지역이 없습니다.
          </p>
        )}
      </Container>
    </section>
  );
}
