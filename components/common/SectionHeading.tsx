"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold tracking-wide",
            light ? "bg-white/15 text-white" : "bg-brand-50 text-brand-600",
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.75rem]",
          light ? "text-white" : "text-slate-900",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed sm:text-lg",
            light ? "text-white/80" : "text-slate-500",
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
