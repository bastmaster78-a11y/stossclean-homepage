"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, MessageCircle, Phone } from "lucide-react";
import { useScrolled } from "@/hooks/useScrolled";
import { SITE } from "@/lib/constants";

export default function FloatingActions() {
  const visible = useScrolled(400);

  return (
    <div className="fixed bottom-6 right-5 z-30 flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
      <AnimatePresence>
        {visible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 10 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="맨 위로 이동"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-600 shadow-lg shadow-slate-900/10 ring-1 ring-slate-200 transition-colors hover:text-brand-600"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <a
        href={SITE.kakaoUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="카카오톡 상담"
        className="flex items-center justify-center rounded-full bg-[#FEE500] text-slate-900 shadow-lg shadow-slate-900/15 transition-transform hover:scale-105"
        style={{ height: "3.25rem", width: "3.25rem" }}
      >
        <MessageCircle className="h-6 w-6" fill="currentColor" strokeWidth={0} />
      </a>

      <a
        href={`tel:${SITE.phoneRaw}`}
        aria-label="전화 문의"
        className="relative flex items-center justify-center rounded-full bg-brand-600 text-white shadow-lg shadow-brand-600/30 transition-transform hover:scale-105"
        style={{ height: "3.25rem", width: "3.25rem" }}
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-brand-500/50" />
        <Phone className="relative h-6 w-6" fill="currentColor" strokeWidth={0} />
      </a>
    </div>
  );
}
