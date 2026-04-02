import { cn } from "@/lib/utils";

export function PillButton({
  className,
  children,
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
}) {
  return (
    <button
      className={cn(
        "inline-flex min-h-12 items-center justify-center rounded-full px-5 text-sm font-semibold transition duration-200",
        variant === "primary"
          ? "bg-[var(--mood-gradient)] text-slate-950 shadow-[0_0_30px_var(--mood-glow)]"
          : "border border-white/10 bg-white/8 text-white",
        "disabled:cursor-not-allowed disabled:opacity-45",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
