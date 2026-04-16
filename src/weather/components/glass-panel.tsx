import { cn } from "@/lib/utils";

export function GlassPanel({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("glass-panel rounded-[32px]", className)}>{children}</div>;
}
