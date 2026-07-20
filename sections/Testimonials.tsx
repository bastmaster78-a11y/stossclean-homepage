"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import type { SectionHeadingContent, TestimonialContent } from "@/lib/content-schema";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/common/SectionHeading";

interface TestimonialsProps {
  testimonials: TestimonialContent[];
  heading: SectionHeadingContent;
}

export default function Testimonials({ testimonials, heading }: TestimonialsProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = (card?.offsetWidth ?? 320) + 20;
    el.scrollBy({ left: amount * direction, behavior: "smooth" });
  };

  return (
    <section id="testimonials" className="bg-slate-50 py-20 lg:py-28">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow={heading.eyebrow}
            title={heading.title}
            description={heading.description}
            align="left"
            className="sm:items-start sm:text-left"
          />
          <div className="hidden shrink-0 gap-2 sm:flex">
            <button
              onClick={() => scrollByCard(-1)}
              aria-label="이전 후기"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-brand-300 hover:text-brand-600"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scrollByCard(1)}
              aria-label="다음 후기"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-brand-300 hover:text-brand-600"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <motion.div
          ref={scrollerRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="scrollbar-none mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4"
        >
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              data-card
              className="flex w-[85%] shrink-0 snap-start flex-col gap-4 rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-100 sm:w-[46%] lg:w-[31%]"
            >
              <Quote className="h-8 w-8 text-brand-200" fill="currentColor" strokeWidth={0} />
              <div className="flex text-amber-400">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4" fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="flex-1 text-sm leading-relaxed text-slate-600">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div className="border-t border-slate-100 pt-4">
                <p className="text-sm font-bold text-slate-900">{testimonial.name}</p>
                <p className="mt-0.5 text-xs text-slate-400">
                  {testimonial.service} · {testimonial.area}
                </p>
              </div>
            </article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
