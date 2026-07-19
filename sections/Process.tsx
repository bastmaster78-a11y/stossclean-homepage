"use client";

import { motion } from "framer-motion";
import { PROCESS_STEPS } from "@/lib/constants";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/common/SectionHeading";

export default function Process() {
  return (
    <section id="process" className="bg-slate-50 py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="PROCESS"
          title="상담부터 완료까지, 6단계 작업 프로세스"
          description="투명하고 체계적인 절차로 처음부터 끝까지 안심하고 맡기실 수 있습니다."
        />

        <div className="relative mt-16">
          <div
            aria-hidden="true"
            className="absolute left-6 top-6 hidden h-px w-[calc(100%-3rem)] bg-slate-200 lg:block"
          />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
            {PROCESS_STEPS.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                className="relative flex flex-col items-start gap-3 lg:items-center lg:text-center"
              >
                <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white shadow-md shadow-brand-600/30">
                  <step.icon className="h-[22px] w-[22px]" />
                </span>
                <div>
                  <p className="text-xs font-semibold text-brand-500">STEP {step.step}</p>
                  <h3 className="mt-1 text-base font-bold text-slate-900">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
