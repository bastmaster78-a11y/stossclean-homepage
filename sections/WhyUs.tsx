"use client";

import { motion } from "framer-motion";
import type { SectionHeadingContent, WhyUsContent } from "@/lib/content-schema";
import { getIcon } from "@/lib/icons";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/common/SectionHeading";

interface WhyUsProps {
  items: WhyUsContent[];
  heading: SectionHeadingContent;
}

export default function WhyUs({ items, heading }: WhyUsProps) {
  return (
    <section id="why-us" className="relative overflow-hidden bg-brand-950 py-20 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-700/30 blur-3xl"
      />

      <Container className="relative">
        <SectionHeading
          eyebrow={heading.eyebrow}
          title={heading.title}
          description={heading.description}
          light
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            const Icon = getIcon(item.icon);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: "easeOut" }}
                className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:bg-white/10"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/20 text-brand-300">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-white/70">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
