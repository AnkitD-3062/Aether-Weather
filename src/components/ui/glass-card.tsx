import { cn } from "@/lib/utils";

export function GlassCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-[28px] border border-white/10 bg-white/6 p-5 shadow-[0_24px_80px_rgba(3,7,18,0.38)] backdrop-blur-xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
