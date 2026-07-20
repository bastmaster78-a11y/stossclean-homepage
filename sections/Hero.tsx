"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Phone, ShieldCheck, Sparkles, Star } from "lucide-react";
import type { HeroContent } from "@/lib/content-schema";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

interface HeroProps {
  hero: HeroContent;
  phoneRaw: string;
}

function renderHeadline(line: string, highlight: string) {
  if (!highlight || !line.includes(highlight)) return line;
  const index = line.indexOf(highlight);
  return (
    <>
      {line.slice(0, index)}
      <span className="text-brand-600">{highlight}</span>
      {line.slice(index + highlight.length)}
    </>
  );
}

export default function Hero({ hero, phoneRaw }: HeroProps) {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white pb-20 pt-28 lg:pb-28 lg:pt-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -left-32 h-72 w-72 rounded-full bg-brand-100/60 blur-3xl"
      />

      <Container className="relative grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-start gap-6"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-700">
            <Sparkles className="h-3.5 w-3.5" />
            {hero.eyebrow}
          </span>

          <h1 className="text-4xl font-extrabold leading-[1.2] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem]">
            {hero.headlineLine1}
            <br />
            {renderHeadline(hero.headlineLine2, hero.headlineHighlight)}
          </h1>

          <p className="max-w-lg text-base leading-relaxed text-slate-500 sm:text-lg">
            {hero.paragraph}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href={`tel:${phoneRaw}`} size="lg" icon={<Phone className="h-5 w-5" />}>
              전화 문의하기
            </Button>
            <Button
              href="#quote"
              size="lg"
              variant="secondary"
              icon={<ArrowRight className="h-5 w-5" />}
              iconPosition="right"
            >
              무료 견적 받기
            </Button>
          </div>

          <div className="mt-4 grid w-full grid-cols-3 gap-4 border-t border-slate-200 pt-6">
            {hero.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-xl font-bold text-slate-900 sm:text-2xl">
                  {stat.value}
                </span>
                <span className="text-xs text-slate-500 sm:text-sm">{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="relative"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-2xl shadow-brand-900/20 sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src={hero.image}
              alt="스토스클린 전문 인력이 밝은 거실 공간을 청소하는 모습"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute -bottom-6 -left-4 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-xl shadow-slate-900/10 sm:-left-8 sm:p-5"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-bold text-slate-900">{hero.insuranceBadgeTitle}</p>
              <p className="text-xs text-slate-500">{hero.insuranceBadgeSubtitle}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="absolute -top-5 -right-2 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-xl shadow-slate-900/10 sm:-right-6"
          >
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5" fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <span className="text-xs font-semibold text-slate-700">{hero.ratingBadgeText}</span>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
