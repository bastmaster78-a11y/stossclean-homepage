import type { Metadata } from "next";
import { getContent } from "@/lib/content-store";
import Hero from "@/sections/Hero";
import Services from "@/sections/Services";
import WhyUs from "@/sections/WhyUs";
import Process from "@/sections/Process";
import ServiceScope from "@/sections/ServiceScope";
import Testimonials from "@/sections/Testimonials";
import FAQ from "@/sections/FAQ";
import QuoteForm from "@/sections/QuoteForm";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  return {
    title: `${content.site.name}(${content.site.nameEn}) | 입주·이사·거주·사무실·준공청소 전문업체`,
    description: content.site.description,
  };
}

export default async function Home() {
  const content = await getContent();
  const { site, hero, sectionHeadings, quote, services, whyUs, process, serviceScope, testimonials, faqs } =
    content;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    alternateName: site.nameEn,
    description: site.description,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressCountry: "KR",
    },
    priceRange: "정찰제",
    areaServed: "KR",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero hero={hero} phoneRaw={site.phoneRaw} />
      <Services services={services} heading={sectionHeadings.services} />
      <WhyUs items={whyUs} heading={sectionHeadings.whyUs} />
      <Process steps={process} heading={sectionHeadings.process} />
      <ServiceScope scope={serviceScope} heading={sectionHeadings.serviceScope} />
      <Testimonials testimonials={testimonials} heading={sectionHeadings.testimonials} />
      <FAQ faqs={faqs} heading={sectionHeadings.faq} />
      <QuoteForm
        services={services}
        quote={quote}
        heading={sectionHeadings.quote}
        phone={site.phone}
        phoneRaw={site.phoneRaw}
      />
    </>
  );
}
