"use client";

import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form";
import { getIcon, ICON_NAMES } from "@/lib/icons";
import { inputClass } from "@/app/admin/_components/FormField";

interface IconSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
}

export function IconSelect<T extends FieldValues>({ control, name, label = "아이콘" }: IconSelectProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const Icon = getIcon(field.value as string);
        return (
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">{label}</label>
            <div className="flex items-center gap-2">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <Icon className="h-5 w-5" />
              </span>
              <select
                value={field.value as string}
                onChange={(e) => field.onChange(e.target.value)}
                onBlur={field.onBlur}
                className={inputClass}
              >
                {ICON_NAMES.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        );
      }}
    />
  );
}
