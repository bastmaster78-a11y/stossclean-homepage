"use client";

import { areaKey, KOREA_REGIONS } from "@/lib/korea-regions";
import { cn } from "@/lib/utils";

interface ServiceAreaListProps {
  selected: string[];
  onToggle?: (key: string) => void;
  className?: string;
}

export function ServiceAreaList({ selected, onToggle, className }: ServiceAreaListProps) {
  const interactive = !!onToggle;

  return (
    <div className={cn("flex flex-col gap-5", className)}>
      {KOREA_REGIONS.map((region) => (
        <div key={region.name}>
          <p className="mb-2 text-xs font-bold text-slate-500">{region.name}</p>
          <div className="flex flex-wrap gap-1.5">
            {region.districts.map((district) => {
              const key = areaKey(region.name, district);
              const active = selected.includes(key);
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => onToggle?.(key)}
                  aria-pressed={active}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                    active
                      ? "border-brand-600 bg-brand-600 text-white"
                      : "border-slate-200 bg-white text-slate-500",
                    interactive && "cursor-pointer hover:border-brand-400",
                    !interactive && "cursor-default",
                  )}
                >
                  {district}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
