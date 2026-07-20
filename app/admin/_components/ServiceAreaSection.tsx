"use client";

import { Controller, type UseFormReturn } from "react-hook-form";
import type { SiteContent } from "@/lib/content-schema";
import { Card } from "@/app/admin/_components/FormField";
import { KoreaMap } from "@/components/common/KoreaMap";

export function ServiceAreaSection({ form }: { form: UseFormReturn<SiteContent> }) {
  const { control } = form;

  return (
    <Card
      title="서비스 가능 지역"
      description="지도의 시/도를 클릭해서 켜고 끄세요. 파란색으로 표시된 지역이 사이트에 '서비스 가능지역'으로 노출됩니다."
    >
      <Controller
        control={control}
        name="serviceAreas"
        render={({ field }) => {
          const selected: string[] = Array.isArray(field.value) ? field.value : [];
          const toggle = (name: string) => {
            field.onChange(
              selected.includes(name) ? selected.filter((n) => n !== name) : [...selected, name],
            );
          };
          return <KoreaMap selected={selected} onToggle={toggle} className="max-w-xs" />;
        }}
      />
    </Card>
  );
}
