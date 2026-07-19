import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import Hero from "@/sections/Hero";
import Services from "@/sections/Services";
import WhyUs from "@/sections/WhyUs";
import Process from "@/sections/Process";
import ServiceScope from "@/sections/ServiceScope";
import Testimonials from "@/sections/Testimonials";
import FAQ from "@/sections/FAQ";
import QuoteForm from "@/sections/QuoteForm";

export const metadata: Metadata = {
  title: `${SITE.name}(${SITE.nameEn}) | 입주·이사·거주·사무실·준공청소 전문업체`,
  description: SITE.description,
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.name,
    alternateName: SITE.nameEn,
    description: SITE.description,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address,
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
      <Hero />
      <Services />
      <WhyUs />
      <Process />
      <ServiceScope />
      <Testimonials />
      <FAQ />
      <QuoteForm />
    </>
  );
}
