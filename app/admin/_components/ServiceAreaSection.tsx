"use client";

import { Controller, type UseFormReturn } from "react-hook-form";
import type { SiteContent } from "@/lib/content-schema";
import { Card } from "@/app/admin/_components/FormField";
import { ServiceAreaList } from "@/components/common/ServiceAreaList";

export function ServiceAreaSection({ form }: { form: UseFormReturn<SiteContent> }) {
  const { control } = form;

  return (
    <Card
      title="서비스 가능 지역"
      description="서비스 가능한 시/군/구를 클릭해서 켜고 끄세요. 파란색으로 켠 지역이 사이트에 노출됩니다."
    >
      <Controller
        control={control}
        name="serviceAreas"
        render={({ field }) => {
          const selected: string[] = Array.isArray(field.value) ? field.value : [];
          const toggle = (key: string) => {
            field.onChange(
              selected.includes(key) ? selected.filter((k) => k !== key) : [...selected, key],
            );
          };
          return <ServiceAreaList selected={selected} onToggle={toggle} />;
        }}
      />
    </Card>
  );
}
