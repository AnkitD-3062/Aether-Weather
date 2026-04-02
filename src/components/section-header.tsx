import { ChevronRight } from "lucide-react";

export function SectionHeader({
  title,
  action,
}: {
  title: string;
  action?: string;
}) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      {action ? (
        <button className="inline-flex items-center gap-1 text-sm text-white/60 transition hover:text-white">
          {action}
          <ChevronRight className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
}
