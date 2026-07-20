"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import Button from "@/components/ui/Button";
import { DEFAULT_CONTENT } from "@/lib/default-content";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-5 px-6 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
        <AlertTriangle className="h-8 w-8" />
      </span>
      <h1 className="text-2xl font-bold text-slate-900">문제가 발생했습니다</h1>
      <p className="max-w-sm text-sm leading-relaxed text-slate-500">
        페이지를 불러오는 중 오류가 발생했습니다. 다시 시도하시거나 계속 문제가 발생하면
        고객센터({DEFAULT_CONTENT.site.phone})로 문의해주세요.
      </p>
      <Button onClick={reset} icon={<RotateCcw className="h-4 w-4" />}>
        다시 시도하기
      </Button>
    </div>
  );
}
