import { Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
      <span className="flex h-14 w-14 animate-pulse items-center justify-center rounded-2xl bg-brand-600 text-white">
        <Sparkles className="h-7 w-7" />
      </span>
      <div className="h-1.5 w-40 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full w-1/2 animate-[loading_1.2s_ease-in-out_infinite] rounded-full bg-brand-600" />
      </div>
      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
}
