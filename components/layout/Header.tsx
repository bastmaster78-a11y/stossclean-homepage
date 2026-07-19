"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Phone, Sparkles } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import MobileMenu from "@/components/layout/MobileMenu";

export default function Header() {
  const scrolled = useScrolled(10);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        menuOpen
          ? "bg-white shadow-sm shadow-slate-900/5"
          : scrolled
            ? "bg-white/90 shadow-sm shadow-slate-900/5 backdrop-blur-md"
            : "bg-white/60 backdrop-blur-sm",
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between lg:h-20">
          <Link href="#top" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
              <Sparkles className="h-5 w-5" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-lg font-extrabold text-slate-900">{SITE.name}</span>
              <span className="text-[11px] font-medium tracking-wider text-brand-500">
                {SITE.nameEn}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 transition-colors hover:text-brand-600"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={`tel:${SITE.phoneRaw}`}
              className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-brand-600"
            >
              <Phone className="h-4 w-4 text-brand-600" />
              {SITE.phone}
            </a>
            <Button href="#quote" size="sm">
              무료 견적 문의
            </Button>
          </div>

          <button
            onClick={() => setMenuOpen(true)}
            aria-label="메뉴 열기"
            className="rounded-lg p-2 text-slate-700 lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </Container>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
