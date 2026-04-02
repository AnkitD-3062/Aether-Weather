"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Home, Music4, Sparkles, User2 } from "lucide-react";

import { cn } from "@/lib/utils";

const items = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/player", label: "Player", icon: Music4 },
  { href: "/history", label: "History", icon: Sparkles },
  { href: "/profile", label: "Profile", icon: User2 },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed inset-x-4 bottom-4 z-40 mx-auto max-w-xl rounded-full border border-white/10 bg-slate-950/85 p-2 backdrop-blur-2xl">
      <div className="grid grid-cols-5 gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 rounded-full px-2 py-2 text-[11px] text-white/45 transition",
                active && "bg-white/8 text-white shadow-[0_0_24px_var(--mood-glow)]",
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
