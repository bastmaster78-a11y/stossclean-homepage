"use client";

import { motion } from "framer-motion";
import { WHY_US } from "@/lib/constants";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/common/SectionHeading";

export default function WhyUs() {
  return (
    <section id="why-us" className="relative overflow-hidden bg-brand-950 py-20 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-700/30 blur-3xl"
      />

      <Container className="relative">
        <SectionHeading
          eyebrow="WHY STOSS CLEAN"
          title="스토스클린을 선택해야 하는 이유"
          description="원칙을 지키는 청소, 그 결과가 만족도로 증명됩니다."
          light
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_US.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: "easeOut" }}
              className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/20 text-brand-300">
                <item.icon className="h-6 w-6" />
              </span>
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="text-sm leading-relaxed text-white/70">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
