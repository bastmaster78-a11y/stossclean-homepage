import { SearchX } from "lucide-react";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-5 px-6 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
        <SearchX className="h-8 w-8" />
      </span>
      <h1 className="text-2xl font-bold text-slate-900">페이지를 찾을 수 없습니다</h1>
      <p className="max-w-sm text-sm leading-relaxed text-slate-500">
        요청하신 페이지가 삭제되었거나 주소가 변경되었을 수 있습니다. 아래 버튼을 눌러
        메인 화면으로 이동해주세요.
      </p>
      <Button href="/">메인으로 돌아가기</Button>
    </div>
  );
}
