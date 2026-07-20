"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form";
import { ImageUp, Loader2 } from "lucide-react";

interface ImageUploadFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
}

export function ImageUploadField<T extends FieldValues>({ control, name, label }: ImageUploadFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => <ImageUploadInner label={label} value={field.value as string} onChange={field.onChange} />}
    />
  );
}

function ImageUploadInner({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "업로드에 실패했습니다.");
        return;
      }
      onChange(data.url);
    } catch {
      setError("업로드 중 오류가 발생했습니다.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <div className="flex items-center gap-3">
        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-slate-100 ring-1 ring-slate-200">
          {value ? (
            <Image src={value} alt="" fill className="object-cover" unoptimized />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-slate-300">
              <ImageUp className="h-6 w-6" />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
          >
            {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ImageUp className="h-3.5 w-3.5" />}
            {uploading ? "업로드 중..." : "이미지 선택"}
          </button>
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}
