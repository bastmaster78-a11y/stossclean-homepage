"use client";

import { motion } from "framer-motion";
import type { ProcessStepContent, SectionHeadingContent } from "@/lib/content-schema";
import { getIcon } from "@/lib/icons";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/common/SectionHeading";

interface ProcessProps {
  steps: ProcessStepContent[];
  heading: SectionHeadingContent;
}

export default function Process({ steps, heading }: ProcessProps) {
  return (
    <section id="process" className="bg-slate-50 py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow={heading.eyebrow}
          title={heading.title}
          description={heading.description}
        />

        <div className="relative mt-16">
          <div
            aria-hidden="true"
            className="absolute left-6 top-6 hidden h-px w-[calc(100%-3rem)] bg-slate-200 lg:block"
          />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
            {steps.map((step, index) => {
              const Icon = getIcon(step.icon);
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                  className="relative flex flex-col items-start gap-3 lg:items-center lg:text-center"
                >
                  <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white shadow-md shadow-brand-600/30">
                    <Icon className="h-[22px] w-[22px]" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-brand-500">STEP {step.step}</p>
                    <h3 className="mt-1 text-base font-bold text-slate-900">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
