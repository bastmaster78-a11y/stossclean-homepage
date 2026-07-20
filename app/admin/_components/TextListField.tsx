"use client";

import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form";
import { textareaClass } from "@/app/admin/_components/FormField";

interface TextListFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  rows?: number;
  error?: string;
}

export function TextListField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  rows = 4,
  error,
}: TextListFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const value: string[] = Array.isArray(field.value) ? field.value : [];
        return (
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">{label}</label>
            <textarea
              rows={rows}
              value={value.join("\n")}
              onChange={(e) => field.onChange(e.target.value.split("\n"))}
              onBlur={() => {
                const cleaned = value.map((v) => v.trim()).filter((v) => v.length > 0);
                field.onChange(cleaned);
                field.onBlur();
              }}
              placeholder={placeholder}
              className={textareaClass}
            />
            <p className="text-xs text-slate-400">한 줄에 하나씩 입력하세요.</p>
            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>
        );
      }}
    />
  );
}
