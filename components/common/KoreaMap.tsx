"use client";

import { cn } from "@/lib/utils";

// 실제 지리적 경계가 아닌, 시/도를 동일 크기 타일로 배치한 블록맵입니다.
// (뉴스사 선거 결과 지도 등에서 흔히 쓰는 방식 — 작은 화면에서도 모든 지역이
// 균등하게 보이고 클릭하기 쉽습니다.)
const MAP_LAYOUT: { name: string; shortName: string; col: number; row: number }[] = [
  { name: "강원특별자치도", shortName: "강원", col: 4, row: 1 },
  { name: "경기도", shortName: "경기", col: 2, row: 2 },
  { name: "인천광역시", shortName: "인천", col: 1, row: 3 },
  { name: "서울특별시", shortName: "서울", col: 2, row: 3 },
  { name: "충청북도", shortName: "충북", col: 3, row: 3 },
  { name: "경상북도", shortName: "경북", col: 4, row: 3 },
  { name: "세종특별자치시", shortName: "세종", col: 2, row: 4 },
  { name: "대전광역시", shortName: "대전", col: 3, row: 4 },
  { name: "대구광역시", shortName: "대구", col: 4, row: 4 },
  { name: "충청남도", shortName: "충남", col: 1, row: 5 },
  { name: "경상남도", shortName: "경남", col: 4, row: 5 },
  { name: "울산광역시", shortName: "울산", col: 5, row: 5 },
  { name: "전북특별자치도", shortName: "전북", col: 1, row: 6 },
  { name: "부산광역시", shortName: "부산", col: 5, row: 6 },
  { name: "전라남도", shortName: "전남", col: 1, row: 7 },
  { name: "광주광역시", shortName: "광주", col: 2, row: 7 },
  { name: "제주특별자치도", shortName: "제주", col: 3, row: 8 },
];

interface KoreaMapProps {
  selected: string[];
  onToggle?: (name: string) => void;
  className?: string;
}

export function KoreaMap({ selected, onToggle, className }: KoreaMapProps) {
  return (
    <div
      className={cn("grid gap-1.5 sm:gap-2", className)}
      style={{ gridTemplateColumns: "repeat(5, minmax(0, 1fr))", gridTemplateRows: "repeat(8, minmax(0, 1fr))" }}
    >
      {MAP_LAYOUT.map((region) => {
        const active = selected.includes(region.name);
        const interactive = !!onToggle;
        return (
          <button
            key={region.name}
            type="button"
            onClick={() => onToggle?.(region.name)}
            aria-pressed={active}
            title={region.name}
            style={{ gridColumn: region.col, gridRow: region.row }}
            className={cn(
              "flex aspect-square items-center justify-center rounded-lg border p-1 text-center text-[10px] font-bold leading-tight transition-colors sm:text-xs",
              active
                ? "border-brand-600 bg-brand-600 text-white"
                : "border-slate-200 bg-slate-100 text-slate-400",
              interactive && "cursor-pointer hover:border-brand-400",
              !interactive && "cursor-default",
            )}
          >
            {region.shortName}
          </button>
        );
      })}
    </div>
  );
}
