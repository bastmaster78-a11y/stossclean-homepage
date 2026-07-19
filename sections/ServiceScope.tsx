"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SERVICE_SCOPE } from "@/lib/constants";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/common/SectionHeading";

export default function ServiceScope() {
  return (
    <section id="scope" className="bg-white py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="SERVICE SCOPE"
          title="공간 구석구석, 놓치는 곳 없이"
          description="주방부터 현관까지, 생활 공간 전체를 세심한 기준으로 관리합니다."
        />

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-xl shadow-slate-900/10"
          >
            <Image
              src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80"
              alt="깨끗하게 정돈된 주방 공간"
              fill
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-2">
            {SERVICE_SCOPE.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: (index % 3) * 0.08, ease: "easeOut" }}
                className="flex flex-col gap-3 rounded-2xl border border-slate-100 p-5 transition-colors hover:border-brand-200 hover:bg-brand-50/50"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <item.icon className="h-5 w-5" />
                </span>
                <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
