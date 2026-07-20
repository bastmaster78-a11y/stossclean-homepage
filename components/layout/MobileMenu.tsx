"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Phone, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import type { SiteInfoContent } from "@/lib/content-schema";
import Button from "@/components/ui/Button";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  site: SiteInfoContent;
}

export default function MobileMenu({ open, onClose, site }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm lg:hidden"
            aria-hidden="true"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-y-0 right-0 z-50 flex w-[82%] max-w-sm flex-col bg-white p-6 shadow-2xl lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="모바일 메뉴"
          >
            <div className="mb-8 flex items-center justify-between">
              <span className="text-lg font-bold text-brand-700">
                {site.name}
                <span className="ml-1.5 text-sm font-medium text-slate-400">
                  {site.nameEn}
                </span>
              </span>
              <button
                onClick={onClose}
                aria-label="메뉴 닫기"
                className="rounded-full p-2 text-slate-500 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="rounded-xl px-4 py-3.5 text-base font-medium text-slate-700 transition-colors hover:bg-brand-50 hover:text-brand-700"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-6">
              <a
                href={`tel:${site.phoneRaw}`}
                className="flex items-center justify-center gap-2 text-sm text-slate-500"
              >
                <Phone className="h-4 w-4" />
                {site.phone}
              </a>
              <Button href="#quote" onClick={onClose} className="w-full">
                무료 견적 신청
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
