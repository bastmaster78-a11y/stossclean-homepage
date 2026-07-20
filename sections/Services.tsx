"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import type { SectionHeadingContent, ServiceContent } from "@/lib/content-schema";
import { getIcon } from "@/lib/icons";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/common/SectionHeading";

interface ServicesProps {
  services: ServiceContent[];
  heading: SectionHeadingContent;
}

export default function Services({ services, heading }: ServicesProps) {
  return (
    <section id="services" className="bg-white py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow={heading.eyebrow}
          title={heading.title}
          description={heading.description}
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = getIcon(service.icon);
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: (index % 3) * 0.1, ease: "easeOut" }}
                className={service.featured ? "sm:col-span-2 lg:col-span-1" : ""}
              >
                <Link
                  href="#quote"
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-900/10"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={service.image}
                      alt={`${service.title} 서비스 예시 이미지`}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/0 to-transparent" />
                    <span className="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/90 text-brand-600 backdrop-blur-sm">
                      <Icon className="h-[22px] w-[22px]" />
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-bold text-slate-900">{service.title}</h3>
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-slate-300 transition-all group-hover:text-brand-600" />
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                      {service.description}
                    </p>
                    <ul className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-4">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-xs text-slate-600">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
